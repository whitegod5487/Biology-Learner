-- ============================================================
-- 生物溫習程式 — Supabase Schema
-- 喺 Supabase Dashboard → SQL Editor 執行呢段 SQL。
--
-- 用途：
--   1) 建立 profiles 表（每位用戶嘅公開資料：username + user_code）
--   2) 建立 wrong_questions 表（每用戶錯題，RLS 保護）
--   3) 建立自動觸發器：註冊時由 auth.users 建立對應 profiles 記錄
--   4) 啟用 RLS 並建立存取政策
--
-- 本 SQL 已經做 idempotent 處理（create if not exists / drop ... if exists /
-- create or replace），可以放心重複執行。
-- ============================================================

-- ---------- 1) profiles：每位用戶嘅公開資料 ----------
-- username / user_code 均為 unique，防止重複。
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  user_code text unique not null,
  created_at timestamptz default now()
);

-- ---------- 2) wrong_questions：每用戶嘅錯題 ----------
create table if not exists public.wrong_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_json jsonb not null,
  wrong_index int,
  created_at timestamptz default now()
);

create index if not exists wrong_questions_user_id_idx
  on public.wrong_questions (user_id);

-- ---------- 3) 觸發函式：註冊時建立 profiles ----------
-- 讀取 auth.users.raw_user_meta_data 入面嘅 username / user_code。
-- security definer 令函式可以喺 RLS 之外寫入 profiles。
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, user_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', ''),
    coalesce(new.raw_user_meta_data ->> 'user_code', '')
  );
  return new;
end;
$$;

-- ---------- 4) 觸發器：auth.users 新增後自動建立 profiles ----------
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- 5) 啟用 RLS ----------
alter table public.profiles enable row level security;
alter table public.wrong_questions enable row level security;

-- ---------- 6) 存取政策（Policies） ----------

-- profiles：所有人可讀（容許註冊前檢查 username / user_code 是否已被使用）
-- 注意：唔開放公開 insert/update/delete —— 新記錄一律由觸發器建立。
drop policy if exists "profiles_select_all" on public.profiles;
create policy "profiles_select_all"
  on public.profiles for select
  using (true);

-- wrong_questions：每位用戶只可以存取自己嘅錯題
drop policy if exists "wrong_questions_select_own" on public.wrong_questions;
create policy "wrong_questions_select_own"
  on public.wrong_questions for select
  using (auth.uid() = user_id);

drop policy if exists "wrong_questions_insert_own" on public.wrong_questions;
create policy "wrong_questions_insert_own"
  on public.wrong_questions for insert
  with check (auth.uid() = user_id);

drop policy if exists "wrong_questions_update_own" on public.wrong_questions;
create policy "wrong_questions_update_own"
  on public.wrong_questions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "wrong_questions_delete_own" on public.wrong_questions;
create policy "wrong_questions_delete_own"
  on public.wrong_questions for delete
  using (auth.uid() = user_id);
