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
-- 讀取 auth.users.raw_user_meta_data 入面嘅 username；
-- user_code 由後端自動產生（唔會喺前端產生或顯示）。
-- security definer 令函式可以喺 RLS 之外寫入 profiles。

-- 回傳單一字元嘅 Unicode code point（支援 UTF-8 多位元組，例如中文字）
create or replace function public.utf8_codepoint(ch text)
returns integer
language sql
immutable
as $$
  select case octet_length(ch)
    when 1 then ascii(ch)
    when 2 then
      (get_byte(convert_to(ch, 'UTF8'), 0) & 31) * 64 +
      (get_byte(convert_to(ch, 'UTF8'), 1) & 63)
    when 3 then
      (get_byte(convert_to(ch, 'UTF8'), 0) & 15) * 4096 +
      (get_byte(convert_to(ch, 'UTF8'), 1) & 63) * 64 +
      (get_byte(convert_to(ch, 'UTF8'), 2) & 63)
    else 0
  end;
$$;

-- 由顯示名稱產生基底用戶代碼（與舊字典規則一致）：
--   英文字母（不分大小寫）A-Z / a-z → '01'–'26'
--   數字 0-9 → '27'–'36'
--   中文字 → (字元碼 - 0x4E00) + 100
--   空格與不支援嘅字元略過
create or replace function public.generate_user_code(p_username text)
returns text
language plpgsql
immutable
as $$
declare
  v_code text := '';
  v_char text;
  v_cp integer;
begin
  for v_char in select regexp_split_to_table(coalesce(p_username, ''), '') loop
    if v_char ~ '[A-Za-z]' then
      v_code := v_code || lpad((ascii(upper(v_char)) - 64)::text, 2, '0');
    elsif v_char ~ '[0-9]' then
      v_code := v_code || lpad((ascii(v_char) - 48 + 27)::text, 2, '0');
    else
      v_cp := public.utf8_codepoint(v_char);
      if v_cp between 0x4E00 and 0x9FFF then
        v_code := v_code || ((v_cp - 0x4E00) + 100)::text;
      end if;
    end if;
  end loop;
  return v_code;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text;
  v_base text;
  v_code text;
  v_i integer := 0;
begin
  v_username := coalesce(new.raw_user_meta_data ->> 'username', '');
  v_base := public.generate_user_code(v_username);
  -- 若無任何可映射字元，用 user id 首段作後備，保證非空且唯一
  if v_base = '' then
    v_base := 'u' || replace(substring(new.id::text from 1 for 8), '-', '');
  end if;
  v_code := v_base;
  -- 確保 user_code 唯一：若撞碼，追加 '-01'、'-02'... 直到唯一
  while exists (select 1 from public.profiles where user_code = v_code) loop
    v_i := v_i + 1;
    v_code := v_base || '-' || lpad(v_i::text, 2, '0');
  end loop;
  insert into public.profiles (id, username, user_code)
  values (new.id, v_username, v_code);
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

-- profiles：所有人可讀（排行榜顯示 username / points；容許註冊前檢查 username 是否已被使用）
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

-- ============================================================
-- 積分與排行榜（每用戶 POINTS & RANKING）新增內容
--
--   1) profiles 加 points 欄（預設 0）
--   2) 建立 points_log 表（每日一次積分記錄，DB 層防重複）
--   3) 建立 RPC 函式：award_daily_login / award_challenge_test
--   4) points_log 啟用 RLS 並加入本人讀寫政策
--
-- 全部使用 idempotent 寫法（add column if not exists / create if not exists /
-- create or replace / drop policy if exists），可以放心重複執行。
-- ============================================================

-- ---------- 7) profiles 加 points 欄 ----------
alter table public.profiles
  add column if not exists points integer not null default 0;

-- ---------- 8) points_log：每用戶每日積分記錄 ----------
-- (user_id, event_type, event_date) unique → 每日每種事件只可以記一次
create table if not exists public.points_log (
  id bigint generated by default as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null check (event_type in ('daily_login', 'challenge_test')),
  points integer not null,
  event_date date not null default current_date,
  created_at timestamptz default now(),
  constraint points_log_user_event_date_unique unique (user_id, event_type, event_date)
);

create index if not exists points_log_user_id_idx
  on public.points_log (user_id);

alter table public.points_log enable row level security;

-- ---------- 9) RPC：每日登入積分（+10，每日一次） ----------
create or replace function public.award_daily_login()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  -- 未登入 → 唔加分
  if v_uid is null then
    return 0;
  end if;

  -- 今日已經領取過 → 唔重複加分
  if exists (
    select 1 from public.points_log
    where user_id = v_uid
      and event_type = 'daily_login'
      and event_date = current_date
  ) then
    return 0;
  end if;

  insert into public.points_log (user_id, event_type, points, event_date)
  values (v_uid, 'daily_login', 10, current_date);

  update public.profiles
  set points = points + 10
  where id = v_uid;

  return 10;
exception
  when others then
    return 0; -- 防禦：任何錯誤都回 0，唔會令前端失敗
end;
$$;

-- ---------- 10) RPC：每日第一次挑戰測試積分 ----------
-- 每答對一題 +1（最多 36），全對再 +4；每日只計第一次測試
create or replace function public.award_challenge_test(p_correct integer, p_total integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_earned integer;
begin
  -- 未登入 → 唔加分
  if v_uid is null then
    return 0;
  end if;

  -- 今日已經計過分 → 唔重複計
  if exists (
    select 1 from public.points_log
    where user_id = v_uid
      and event_type = 'challenge_test'
      and event_date = current_date
  ) then
    return 0;
  end if;

  -- 每答對一題 +1，最多 36 分
  v_earned := least(greatest(coalesce(p_correct, 0), 0), 36);

  -- 全對（p_total > 0 且 p_correct >= p_total）→ 額外 +4
  if p_total > 0 and p_correct >= p_total then
    v_earned := v_earned + 4;
  end if;

  insert into public.points_log (user_id, event_type, points, event_date)
  values (v_uid, 'challenge_test', v_earned, current_date);

  update public.profiles
  set points = points + v_earned
  where id = v_uid;

  return v_earned;
exception
  when others then
    return 0; -- 防禦：任何錯誤都回 0，唔會令前端失敗
end;
$$;

-- ---------- 11) points_log 存取政策（本人先可以讀／寫） ----------
-- 註：RPC 函式係 security definer，本身已可喺 RLS 之外寫入；
--     加入以下政策只係為咗雙重保險同允許前端讀取自己嘅積分記錄。
drop policy if exists "points_log_select_own" on public.points_log;
create policy "points_log_select_own"
  on public.points_log for select
  using (auth.uid() = user_id);

drop policy if exists "points_log_insert_own" on public.points_log;
create policy "points_log_insert_own"
  on public.points_log for insert
  with check (auth.uid() = user_id);

-- 註：profiles 嘅公開讀取政策（profiles_select_all）維持不變，
--     任何登入用戶都可以讀取排行榜所需嘅 username / points（user_code 已唔再顯示）。

-- ============================================================
-- 任務線（QUEST LINE）新增內容
--
--   1) 建立 quest_completions 表（每用戶每課題只可完成一次）
--   2) 建立 RPC 函式：award_quest_completion（完成一課題全對 +25）
--   3) quest_completions 啟用 RLS 並加入本人讀寫政策
--
-- 規則：完成該課題嘅練習（20 題）並全部答對 → ✓ + 25 分；
--     每帳戶每課題只可以領取一次（unique(user_id, topic_no) 保證）。
--
-- 全部使用 idempotent 寫法，可以放心重複執行。
-- ============================================================

-- ---------- 12) quest_completions：每用戶已完成嘅課題 ----------
create table if not exists public.quest_completions (
  id bigint generated by default as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_no integer not null,
  points integer not null default 25,
  completed_at timestamptz default now(),
  constraint quest_completions_user_topic_unique unique (user_id, topic_no)
);

create index if not exists quest_completions_user_id_idx
  on public.quest_completions (user_id);

alter table public.quest_completions enable row level security;

-- ---------- 13) RPC：任務線完成課題（+25，每課題一次） ----------
-- 回傳實際獲得嘅積分（首次完成 25；未登入／已完成／錯誤 → 0）。
create or replace function public.award_quest_completion(p_topic_no integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  -- 未登入 → 唔加分
  if v_uid is null then
    return 0;
  end if;

  -- 課題編號無效 → 唔加分
  if p_topic_no is null or p_topic_no < 1 or p_topic_no > 37 then
    return 0;
  end if;

  -- 已經完成過呢個課題 → 唔重複加分（每帳戶每課題一次）
  if exists (
    select 1 from public.quest_completions
    where user_id = v_uid and topic_no = p_topic_no
  ) then
    return 0;
  end if;

  insert into public.quest_completions (user_id, topic_no, points)
  values (v_uid, p_topic_no, 25);

  update public.profiles
  set points = points + 25
  where id = v_uid;

  return 25;
exception
  when others then
    return 0; -- 防禦：任何錯誤都回 0，唔會令前端失敗
end;
$$;

-- ---------- 14) quest_completions 存取政策（本人先可以讀／寫） ----------
-- 註：RPC 函式係 security definer，本身已可喺 RLS 之外寫入；
--     加入以下政策只係為咗雙重保險同允許前端讀取自己嘅完成記錄。
drop policy if exists "quest_completions_select_own" on public.quest_completions;
create policy "quest_completions_select_own"
  on public.quest_completions for select
  using (auth.uid() = user_id);

drop policy if exists "quest_completions_insert_own" on public.quest_completions;
create policy "quest_completions_insert_own"
  on public.quest_completions for insert
  with check (auth.uid() = user_id);

drop policy if exists "quest_completions_delete_own" on public.quest_completions;
create policy "quest_completions_delete_own"
  on public.quest_completions for delete
  using (auth.uid() = user_id);

-- ============================================================
-- 設定頁：刪除帳戶（DELETE ACCOUNT）新增內容
--
--   RPC：public.delete_account()
--   由設定頁「危險區域」呼叫。前端 anon key 冇權限刪除 auth.users，
--   故以 SECURITY DEFINER 函式（由 postgres 擁有）執行：
--     1) 刪除 auth.identities（登入身份）
--     2) 刪除 auth.users → profiles / wrong_questions / points_log /
--        quest_completions 會因 on delete cascade 自動刪除
--   只允許刪除自己（以 auth.uid() 驗證）。
-- ============================================================

create or replace function public.delete_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  -- 刪除登入身份（電郵密碼 / OAuth）
  delete from auth.identities where user_id = v_uid;

  -- 刪除 auth user（子表因 on delete cascade 自動移除）
  delete from auth.users where id = v_uid;
end;
$$;
