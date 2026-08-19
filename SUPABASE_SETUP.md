# 生物溫習程式 — Supabase 設定指南（zh-HK）

呢個程式已經由「瀏覽器端 localStorage 登入」遷移到 **Supabase（BaaS）** 後端：
- 密碼由 Supabase 喺伺服器端用 **bcrypt** 雜湊及驗證（唔會再喺瀏覽器儲存任何明文密碼或帳戶清單）。
- 每用戶嘅錯題儲存喺 `wrong_questions` 資料表，由 **Row Level Security（RLS）** 保護。
- 用戶用**真實電郵 + 密碼**註冊／登入；另外填寫「用戶名稱／顯示名稱」。電郵會由 Supabase 後端觸發器自動寫入 `profiles.email`（v0.6.7 起取代舊版 `user_code`）。

跟住以下步驟即可完成設定。

---

## 第 1 步：建立免費 Supabase 專案

1. 去 <https://supabase.com> 註冊／登入。
2. 撳 **New project**，揀組織、改個專案名（例如 `bio-app`），設定 Database Password（記住佢）。
3. 揀好地區（例如 `Southeast Asia (Singapore)` 或 `Northeast Asia`，愈近用家愈好），撳 **Create new project**。
4. 等幾分鐘，等專案初始化完成。

## 第 2 步：複製 Project URL 同 anon key 落 `supabaseConfig.js`

1. 喺 Supabase Dashboard 入面，去 **Settings → API**。
2. 複製 **Project URL**（形如 `https://xxxx.supabase.co`）。
3. 複製 **anon / public** key（**唔係** `service_role` key！service_role 有最高權限，絕對唔可以放喺前端）。
4. 打開 [`supabaseConfig.js`](supabaseConfig.js)，貼入兩個常數：

```js
const SUPABASE_URL = 'https://xxxx.supabase.co';      // 你嘅 Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOi...';            // 你嘅 anon/public key
```

> 若保持空白，程式唔會當機，而係喺登入頁顯示「請先喺 supabaseConfig.js 填上 Supabase 專案資料」提示。

## 第 3 步：喺 SQL Editor 執行 `supabase/schema.sql`

1. 喺 Supabase Dashboard 揀 **SQL Editor**（左邊選單 → SQL Editor → New query）。
2. 打開 [`supabase/schema.sql`](supabase/schema.sql)，將全部內容複製貼上。
3. 撳 **Run**。

呢段 SQL 會建立：
- `public.profiles`（`id`、`username`（unique）、`email`、`created_at`）＋ `points` 積分欄（預設 0）＋ 連續登入欄 `last_login_date`（上次登入日期）同 `login_streak`（連續登入天數，預設 0）—— `email` 由後端觸發器於註冊時由 `auth.users.email` 自動寫入（v0.6.7 起取代舊版 `user_code`）；連續登入欄位由 RPC `update_login_streak()` 維護（v0.6.8 起）
- `public.wrong_questions`（`id`、`user_id`、`question_json`、`wrong_index`、`created_at`）＋ `user_id` index
  > ⚠️ `created_at` 係 `timestamptz`，Supabase 一律以 **UTC（+0）** 儲存，Supabase Studio 表格亦預設顯示 UTC；香港時間係 UTC+8，所以喺 Dashboard 睇會遲 8 小時——呢個係正常顯示差異，資料本身冇錯。想喺 Dashboard 直接睇香港時間，可喺 Studio 設定改顯示時區，或閱讀時自行 +8 小時。
- `public.points_log`（每日積分記錄，`user_id` + `event_type` + `event_date` 唯一，確保「每日一次」）＋ `user_id` index
- `public.quest_completions`（任務線完成記錄，`user_id` + `topic_no` 唯一，確保每帳戶每課題只可領取一次）＋ `user_id` index
- 觸發函式 `handle_new_user()` 同觸發器 `on_auth_user_created`（註冊時自動由 `raw_user_meta_data` 建立 profiles）
- 五個 RPC 函式：`award_daily_login()`（每日登入 +10）、`award_challenge_test(p_correct, p_total)`（每日第一次挑戰測試計分）、`award_quest_completion(p_topic_no)`（任務線完成課題 +25，每課題一次）、`update_login_streak()`（更新並回傳連續登入天數）同 `delete_account()`（設定頁刪除帳戶）
- 四個表嘅 RLS 同政策（profiles 公開可讀＋**本人可更新自己嘅記錄**（`profiles_update_own`，v0.6.6 起加入，令設定頁更改名稱能即時反映到排行榜）；wrong_questions、points_log 同 quest_completions 只限本人）

> 因為 SQL 已經做 idempotent 處理，之後想重新執行一次都冇問題；
> 已建立嘅專案想升級加積分／排行榜功能，直接再執行一次新版 `schema.sql` 就得——`ALTER TABLE ... ADD COLUMN IF NOT EXISTS` 會安全補上 `points` 欄，唔會影響現有資料。

## 第 4 步（可選）：調整 Auth 設定

1. 去 **Authentication → Providers → Email**，確定 Email provider 已開啟（預設開啟）。
2. **電郵驗證（Confirm email）設定**：去 **Authentication → Settings → Email** 調整「Confirm email」選項：
   - **建議關閉**：用戶註冊即會直接建立 session（即時登入），**唔使去電郵收件匣撳確認連結**，最適合想註冊後即刻用嘅情況。
   - **保持開啟**：適合想驗證電郵真確性嘅情況；但注意用戶註冊後必須先去電郵收件匣撳確認連結，**先可以第一次登入**。

## 第 5 步：本地測試同部署到 GitHub Pages

1. **本地測試**：直接用瀏覽器打開 `index.html`（或喺 VS Code 用 Live Server）。
   - 註冊新帳戶 → 前往登入 → 登入成功進入主頁。
   - 做一題錯題，去「錯題重溫」頁確認有記錄；重新開頁再登入，錯題仍然存在。
   - 登出後，另一個用戶登入，應該睇唔到之前用戶嘅錯題。
2. **部署到 GitHub Pages**：
   - 將 `Bio Prog/00 Apps/` 入面嘅全部檔案（`index.html`、`app.js`、`supabaseConfig.js`、`supabase/`、`topics.js`、`questionBank*.js`、`frontierTech.js` 等）上傳到 GitHub repo。
   - 喺 repo 嘅 **Settings → Pages**，揀分支同資料夾（例如 `/root`），儲存後即可用 `https://<username>.github.io/<repo>/` 存取。
   - 由於一切仍係純靜態檔案（Supabase SDK 用 CDN、憑證喺 config 檔），GitHub Pages 唔需要任何伺服器設定。

---

## 積分與排行榜（POINTS & RANKING）

程式加入咗「每用戶積分＋排行榜」功能，計分規則如下：

- **每日登入 +10 分**：每次登入（包括註冊後自動登入、重新載入頁面後還原登入）都會透過 RPC `award_daily_login()` 加分；同一日只可以領取一次，重複登入唔會重複加分。
- **每日第一次挑戰測試計分**：每日第一次完成「挑戰模式」會透過 RPC `award_challenge_test(p_correct, p_total)` 計分：
  - 每答對一題 +1 分（上限 36 分）；
  - 若全對（全部答啱）再額外 +4 分；
  - 同一日第二次或以後嘅挑戰測試唔會再加分。
- **任務線（Quest Line）+25 分**：於「練習模式」按課題完成練習並**全部答對（20/20）**後，透過 RPC `award_quest_completion(p_topic_no)` 加分：
  - 每完成一個課題（全對）獲得 **+25 分**，並喺課題名稱旁顯示 ✓；
  - 每帳戶每課題**只可以領取一次**——由 `quest_completions` 表 `unique(user_id, topic_no)` 約束保證，重複完成唔會重複加分；
  - 課本練習、錯題重溫同挑戰模式**唔會**觸發任務加分。
- **排行榜**：主頁有「🏆 排行榜」入口，按 `profiles.points` 由高至低排列，顯示名次、用戶名稱同積分；自己嗰行會特別標示（藍色框＋「（你）」）。頁首亦會顯示你嘅目前積分。

---

## 個人分數（SCORE）頁面

- **入口**（v0.7.0 起）：點擊頁首用戶名旁的積分（`★ N`）即進入「個人分數」獨立頁面。
- **個人總分**：頁面頂部顯示目前總分（讀取 `profiles.points`）。
- **獲得分數紀錄**：以列表顯示每筆得分紀錄（日期、事件、得分），列表可點擊摺疊／展開；資料來源為 `points_log`（每日登入＋10、挑戰測試計分）與 `quest_completions`（任務線完成課題＋25）合併，按日期由新至舊排列。前端以本人 RLS 政策（`points_log_select_own`、`quest_completions_select_own`）讀取自己嘅紀錄，無需新增 RPC。
- **獲取分數規則**：列表下方列出獲得積分嘅規則（每日登入、挑戰模式、任務線、連續登入）。

---

## 連續登入（LOGIN STREAK）

主頁標題「主頁」二字旁會顯示**連續登入天數**（例如「連續登入 3 天」），鼓勵每日溫習：

- **規則**：每次登入（包括重新載入頁面後還原登入）都會透過 RPC `update_login_streak()` 更新：
  - 今日已經登入過 → 連續天數**不變**，回傳目前天數；
  - 昨日有登入（`last_login_date` = 昨日）→ 連續天數 **+1**；
  - 否則（第一次登入或中間斷咗）→ 連續天數**重設為 1**。
- **儲存**：天數同上次登入日期儲存喺 `profiles` 表（`login_streak`、`last_login_date`），由 RPC `update_login_streak()`（SECURITY DEFINER）維護。
- **顯示**：[`app.js`](app.js) 喺登入／還原登入後呼叫 `updateLoginStreak()`，並喺主頁標題旁顯示；**訪客模式**或**未登入**時會自動隱藏（訪客不儲存資料，故不顯示連續登入）。
- **「簽到」按鈕**（v0.6.9 起）：主頁標題「主頁」最右方設有「簽到」按鈕，點擊後呼叫 `awardDailyLogin()` 同 `updateLoginStreak()`，即時更新連續登入天數及每日登入積分——唔使重新登入即可簽到；訪客模式／未登入時按鈕會自動隱藏。
- 相關 i18n 字串：`home.streak`（中：「連續登入 {n} 天」／英：「Login streak: {n} day(s)」）、`home.checkin`／`home.checkinSuccess`／`home.checkinFail`／`home.checkinNeedLogin`。

> 所有加分操作都喺資料庫端（SECURITY DEFINER RPC）執行，並受 `points_log` 唯一約束保護，即使多人同時操作都唔會重複加分；若 RPC 失敗會安全回傳 0，唔會影響正常登入／答題。

---

## 設定頁（SETTINGS）

程式加入「⚙️ 設定」頁（頁首右上角齒輪圖示），內容包括：

- **外觀**：選擇顏色主題（☀️ 淺色 / 🌙 深色 / 🌇 暖色）。偏好儲存於瀏覽器 localStorage（`bioAppTheme`），與舊版一致；原頁首循環切換按鈕已移除。
- **語言**：切換 **中文（香港）** 或 **English (UK)**。偏好儲存於 localStorage（`bioAppLanguage`）；切換後會自動重新載入頁面。
- **用戶名稱**：修改顯示名稱（1–20 字元）。會更新 `profiles.username` 並同步 auth 元數據（`user_metadata.username`），頁首名稱即時更新。
- **電郵**：顯示目前登入所使用的電郵地址（唯讀）。
- **危險區域**：刪除帳戶。採用**雙重確認**（先按「刪除帳戶」→ 再按「是，我確定刪除」），經 RPC `delete_account()` 喺伺服器端刪除用戶；`profiles`、`wrong_questions`、`points_log`、`quest_completions` 會因外鍵 `on delete cascade` 自動一併刪除。

> 注意：刪除帳戶係不可逆操作。RPC `delete_account()` 只會刪除自己（以 `auth.uid()` 驗證），由設定頁呼叫；執行 `schema.sql` 後方可用。

---

## Bug 回報（BUG REPORT）

程式加入「🐞 Bug 回報」頁面（v0.9.9 起），讓用戶提交 Bug 回報並查看狀態：

- **回報儲存**：回報會存入 `public.bug_reports` 表（`user_id`、`username`、`title`、`category`、`description`、`steps`、`status_code`、`created_at`）。用戶只可以提交自己嘅回報（RLS 保證 `user_id = auth.uid()`），亦只可以讀取自己嘅回報。
- **狀態可喺資料庫設定**：狀態定義存於 `public.bug_report_statuses` 表（`code`、`label_zh`、`label_en`、`color`、`sort_order`、`is_active`）。**狀態並非寫死喺程式碼**——前端會讀取呢張表嚟顯示狀態徽章（標籤＋顏色），開發者／管理員可直接喺 Supabase Dashboard（Table Editor）或 SQL 增刪改狀態、修改標籤、顏色或排序，前端會自動反映。
- **預設狀態**（`schema.sql` 種子資料）：
  - `new`（新回報，紅色）
  - `assigned`（已分派，橙色）
  - `fixed`（已修復，綠色）
  - `pending`（待處理，藍色）
  - `close`（已關閉，灰色）
  - `reopen`（重新開啟，紫色）
  - `rejected`（已拒絕，深紅）
- **狀態變更**：由管理員喺資料庫直接更新 `bug_reports.status_code`（前端只讀取顯示）；用戶喺「Bug 回報」頁面可提交新回報及查看自己回報嘅狀態。
- **RLS**：`bug_report_statuses` 開放所有人讀取（非敏感資料）；`bug_reports` 只限本人讀取／提交。

> 升級現有專案：直接重新執行新版 `schema.sql` 即可（idempotent），會安全建立兩張新表、種子狀態與政策，唔會影響現有資料。

---

## 補充說明

### 筆記語言
- **筆記（Notes）**：中文（香港）版本喺 `notes.js`（`NOTES`），English (UK) 版本喺 `notes.en.js`（`NOTES_EN`）；[`app.js`](app.js) 按語言自動選用（v0.7.1 起）。全部 37 個課題均備中英對應版本。

### 登入／註冊方式
- **註冊欄位**：電郵地址、用戶名稱／顯示名稱、密碼、確認密碼。
- **登入欄位**：電郵地址、密碼。
- 電郵（`email`）由 Supabase 後端觸發器（`handle_new_user`）喺註冊時由 `auth.users.email` 自動寫入 `profiles.email`（v0.6.7 起取代舊版 `user_code`）；`profiles.email` 唔會喺排行榜或任何前端公開顯示，只用於資料庫記錄。

### 電郵驗證建議
- 若關閉「Confirm email」（建議）：用戶註冊後即時登入，唔使去電郵收件匣撳確認連結。
- 若開啟「Confirm email」：用戶必須先去電郵收件匣點擊確認連結，**先可以第一次登入**。

### 限制
- 用戶要自己記住電郵同密碼；暫時冇「忘記密碼」流程，若唔記得密碼可喺 Supabase 後台手動處理。
- 主題設定（`bioAppTheme`）仍然儲存喺瀏覽器 localStorage（全局設定，屬預期行為）。
