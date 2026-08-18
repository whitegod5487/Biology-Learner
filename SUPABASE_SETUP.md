# 生物溫習程式 — Supabase 設定指南（zh-HK）

呢個程式已經由「瀏覽器端 localStorage 登入」遷移到 **Supabase（BaaS）** 後端：
- 密碼由 Supabase 喺伺服器端用 **bcrypt** 雜湊及驗證（唔會再喺瀏覽器儲存任何明文密碼或帳戶清單）。
- 每用戶嘅錯題儲存喺 `wrong_questions` 資料表，由 **Row Level Security（RLS）** 保護。
- 用戶用**真實電郵 + 密碼**註冊／登入；另外填寫「用戶名稱／顯示名稱」，程式會自動由顯示名稱產生一個唯一嘅**用戶代碼**（`user_code`）。

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
- `public.profiles`（`id`、`username`（unique）、`user_code`（unique）、`created_at`）
- `public.wrong_questions`（`id`、`user_id`、`question_json`、`wrong_index`、`created_at`）＋ `user_id` index
- 觸發函式 `handle_new_user()` 同觸發器 `on_auth_user_created`（註冊時自動由 `raw_user_meta_data` 建立 profiles）
- 兩個表嘅 RLS 同政策（profiles 公開可讀；wrong_questions 只限本人）

> 因為 SQL 已經做 idempotent 處理，之後想重新執行一次都冇問題。

## 第 4 步（可選）：調整 Auth 設定

1. 去 **Authentication → Providers → Email**，確定 Email provider 已開啟（預設開啟）。
2. **電郵驗證（Confirm email）設定**：去 **Authentication → Settings → Email** 調整「Confirm email」選項：
   - **建議關閉**：用戶註冊即會直接建立 session（即時登入），**唔使去電郵收件匣撳確認連結**，最適合想註冊後即刻用嘅情況。
   - **保持開啟**：適合想驗證電郵真確性嘅情況；但注意用戶註冊後必須先去電郵收件匣撳確認連結，**先可以第一次登入**。

## 第 5 步：本地測試同部署到 GitHub Pages

1. **本地測試**：直接用瀏覽器打開 `index.html`（或喺 VS Code 用 Live Server）。
   - 註冊新帳戶 → 見到用戶代碼 → 前往登入 → 登入成功進入主頁。
   - 做一題錯題，去「錯題重溫」頁確認有記錄；重新開頁再登入，錯題仍然存在。
   - 登出後，另一個用戶登入，應該睇唔到之前用戶嘅錯題。
2. **部署到 GitHub Pages**：
   - 將 `Bio Prog/00 Apps/` 入面嘅全部檔案（`index.html`、`app.js`、`supabaseConfig.js`、`supabase/`、`topics.js`、`questionBank*.js`、`frontierTech.js` 等）上傳到 GitHub repo。
   - 喺 repo 嘅 **Settings → Pages**，揀分支同資料夾（例如 `/root`），儲存後即可用 `https://<username>.github.io/<repo>/` 存取。
   - 由於一切仍係純靜態檔案（Supabase SDK 用 CDN、憑證喺 config 檔），GitHub Pages 唔需要任何伺服器設定。

---

## 補充說明

### 登入／註冊方式
- **註冊欄位**：電郵地址、用戶名稱／顯示名稱、密碼、確認密碼。
- **登入欄位**：電郵地址、密碼。
- 用戶代碼（`user_code`）由舊有字典（`USER_CODE_DICT`）根據「用戶名稱／顯示名稱」自動產生，並保證喺所有用戶之間唯一（例如顯示名稱「小明」會對應一個固定嘅用戶代碼；若同另一個用戶撞碼，會自動加上 `-01`、`-02` 等後綴）。

### 電郵驗證建議
- 若關閉「Confirm email」（建議）：用戶註冊後即時登入，唔使去電郵收件匣撳確認連結。
- 若開啟「Confirm email」：用戶必須先去電郵收件匣點擊確認連結，**先可以第一次登入**。

### 限制
- 用戶要自己記住電郵同密碼；暫時冇「忘記密碼」流程，若唔記得密碼可喺 Supabase 後台手動處理。
- 主題設定（`bioAppTheme`）仍然儲存喺瀏覽器 localStorage（全局設定，屬預期行為）。
