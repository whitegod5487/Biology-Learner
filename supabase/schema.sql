-- ============================================================
-- 生物溫習程式 — Supabase Schema
-- 喺 Supabase Dashboard → SQL Editor 執行呢段 SQL。
--
-- 用途：
--   1) 建立 profiles 表（每位用戶嘅公開資料：username + email）
--   2) 建立 wrong_questions 表（每用戶錯題，RLS 保護）
--   3) 建立自動觸發器：註冊時由 auth.users 建立對應 profiles 記錄
--   4) 啟用 RLS 並建立存取政策
--
-- 本 SQL 已經做 idempotent 處理（create if not exists / drop ... if exists /
-- create or replace），可以放心重複執行。
-- ============================================================

-- ---------- 1) profiles：每位用戶嘅公開資料 ----------
-- username / email 均為 unique，防止重複。
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text,
  created_at timestamptz default now()
);

-- ---------- 1a) 遷移（v0.6.7）：移除 user_code、加入 email ----------
-- 對已存在嘅資料庫做遷移（idempotent，可放心重跑）：
--   - 刪除 user_code 欄
--   - 新增 email 欄，並以 auth.users 嘅電郵補填現有記錄
--   - 為 email 建立唯一約束（電郵喺 auth.users 本身已唯一）
alter table public.profiles drop column if exists user_code;
alter table public.profiles add column if not exists email text;

update public.profiles p
set email = u.email
from auth.users u
where u.id = p.id and (p.email is null or p.email = '');

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_email_unique'
  ) then
    alter table public.profiles add constraint profiles_email_unique unique (email);
  end if;
end $$;

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
-- 讀取 auth.users.raw_user_meta_data 入面嘅 username，以及 auth.users.email；
-- 電郵由 auth.users 帶入 profiles.email（唔再產生 user_code）。
-- security definer 令函式可以喺 RLS 之外寫入 profiles。

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text;
begin
  v_username := coalesce(new.raw_user_meta_data ->> 'username', '');
  insert into public.profiles (id, username, email)
  values (new.id, v_username, coalesce(new.email, ''));
  return new;
end;
$$;

-- v0.6.7：移除舊版用戶代碼函式（已唔再使用）
drop function if exists public.utf8_codepoint(text);
drop function if exists public.generate_user_code(text);

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
-- 注意：新記錄一律由觸發器建立，唔開放公開 insert/delete；
--       update 只開放俾本人（設定頁「更改名稱」會更新 profiles.username，
--       排行榜讀取 profiles.username 顯示，因此必須容許本人更新自己嘅名稱）。
drop policy if exists "profiles_select_all" on public.profiles;
create policy "profiles_select_all"
  on public.profiles for select
  using (true);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

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
--     任何登入用戶都可以讀取排行榜所需嘅 username / points（email 唔會喺排行榜顯示）。

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

-- ============================================================
-- 連續登入（LOGIN STREAK）新增內容
--
--   1) profiles 加 last_login_date 與 login_streak 欄
--   2) 建立 RPC 函式：update_login_streak()
--
-- 規則：
--   - 未登入 → 回傳 0
--   - 今日已經登入過 → 連續天數不變，回傳目前天數
--   - 昨日有登入（last_login_date = 今日減一日）→ 連續天數 +1
--   - 否則（第一次登入或中間斷咗）→ 連續天數重設為 1
--   - 更新 last_login_date 為今日，並回傳目前連續天數
--
-- 全部使用 idempotent 寫法（add column if not exists / create or replace），
-- 可以放心重複執行。
-- ============================================================

-- ---------- 15) profiles 加連續登入欄位 ----------
alter table public.profiles
  add column if not exists last_login_date date;

alter table public.profiles
  add column if not exists login_streak integer not null default 0;

-- ---------- 16) RPC：更新並回傳連續登入天數 ----------
create or replace function public.update_login_streak()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_today date := current_date;
  v_last date;
  v_streak integer;
begin
  -- 未登入 → 回傳 0
  if v_uid is null then
    return 0;
  end if;

  -- 讀取現有記錄（首次登入時欄位為 NULL）
  select last_login_date, coalesce(login_streak, 0)
    into v_last, v_streak
    from public.profiles
   where id = v_uid;

  -- 今日已經登入過 → 連續天數不變
  if v_last = v_today then
    return v_streak;
  end if;

  -- 昨日有登入 → +1；否則重設為 1
  if v_last = v_today - 1 then
    v_streak := v_streak + 1;
  else
    v_streak := 1;
  end if;

  update public.profiles
     set last_login_date = v_today,
         login_streak = v_streak
   where id = v_uid;

  return v_streak;
exception
  when others then
    return 0; -- 防禦：任何錯誤都回 0，唔會令前端失敗
end;
$$;

-- ============================================================
-- Bug 回報（BUG REPORT）新增內容
--
--   1) bug_report_statuses：狀態定義（可在資料庫設定／管理）
--      - 開發者／管理員可直接喺 Supabase Dashboard 或 SQL 增刪改狀態，
--        前端會自動讀取並顯示（狀態並非寫死喺程式碼）。
--      - 預設狀態：new / assigned / fixed / pending / close / reopen / rejected
--   2) bug_reports：使用者提交嘅 bug 回報
--      - user_id / username 記錄提交者
--      - status_code 指向 bug_report_statuses.code
--   3) RLS：狀態表開放登入用戶讀取；回報表用戶可提交同讀取自己嘅回報。
--      （狀態變更由管理員喺資料庫進行，前端只讀取顯示。）
--
-- 全部使用 idempotent 寫法，可以放心重複執行。
-- ============================================================

-- ---------- 17) bug_report_statuses：狀態定義（資料庫可設定） ----------
create table if not exists public.bug_report_statuses (
  id bigint generated by default as identity primary key,
  code text unique not null,
  label_zh text not null,
  label_en text not null,
  color text default '#6b7280',
  sort_order int default 0,
  is_active boolean default true
);

-- 預設狀態種子（idempotent：code 已有就更新標籤／顏色／排序）
insert into public.bug_report_statuses (code, label_zh, label_en, color, sort_order)
values
  ('new', '新回報', 'New', '#ef4444', 1),
  ('assigned', '已分派', 'Assigned', '#f59e0b', 2),
  ('fixed', '已修復', 'Fixed', '#10b981', 3),
  ('pending', '待處理', 'Pending', '#3b82f6', 4),
  ('close', '已關閉', 'Close', '#6b7280', 5),
  ('reopen', '重新開啟', 'Reopen', '#8b5cf6', 6),
  ('rejected', '已拒絕', 'Rejected', '#dc2626', 7)
on conflict (code) do update set
  label_zh = excluded.label_zh,
  label_en = excluded.label_en,
  color = excluded.color,
  sort_order = excluded.sort_order;

-- ---------- 18) bug_reports：使用者提交嘅 bug 回報 ----------
create table if not exists public.bug_reports (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  username text,
  title text not null,
  category text not null default 'other',
  description text not null,
  steps text,
  status_code text not null default 'new' references public.bug_report_statuses(code),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists bug_reports_user_id_idx
  on public.bug_reports (user_id);

-- ---------- 19) RLS ----------
alter table public.bug_report_statuses enable row level security;
alter table public.bug_reports enable row level security;

-- 狀態表：所有人可讀取（顯示狀態標籤／顏色；非敏感資料）
drop policy if exists "bug_report_statuses_select_all" on public.bug_report_statuses;
create policy "bug_report_statuses_select_all"
  on public.bug_report_statuses for select
  using (true);

-- 回報表：用戶可提交自己嘅回報（RLS 保證 user_id = 自己），並讀取自己嘅回報
drop policy if exists "bug_reports_insert_own" on public.bug_reports;
create policy "bug_reports_insert_own"
  on public.bug_reports for insert
  with check (auth.uid() = user_id);

drop policy if exists "bug_reports_select_own" on public.bug_reports;
create policy "bug_reports_select_own"
  on public.bug_reports for select
  using (auth.uid() = user_id);
