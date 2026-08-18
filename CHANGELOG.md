# CHANGELOG — 生物溫習程式 更新紀錄

本檔案記錄程式的每次更新。每次更新後必須完成以下步驟，否則該次更新視為未完成：

1. 在 [`app.js`](app.js) 更新 `APP_VERSION`（例如 `v0.3.0` → `v0.3.1`）。
2. 在本檔案最上方加入一條新記錄（版本、日期、更新主題、內容）。
3. 若改動涉及 Supabase，同步更新 `supabase/schema.sql` 與 `SUPABASE_SETUP.md`。

---

## v0.7.2（2026-08-19）
**更新主題**：程式底部新增「2027 生物科 DSE 倒數」文字

- **新增倒數計時器**：程式底部（所有頁面下方）以純文字顯示距離 **2027 年 4 月 19 日**生物科 DSE 嘅剩餘日數（例如「距離 2027 年生物科 DSE 還有 243 天」），以香港時間（UTC+8）計算，每日自動更新。
- **純文字顯示（無外框）**：倒數以普通文字顯示，不設卡片外框／底色，與其他頁面內容融為一體。
- [`index.html`](index.html) 底部新增 `.dse-countdown` 區塊（`#dseCountdownDays`／`#dseCountdownUnit`）及樣式。
- [`app.js`](app.js) 新增 `renderCountdown()`：以香港時間計算今日日期並對比目標日期 2027-04-19，顯示剩餘日數；已過期則顯示 0。初始化時呼叫一次。新增中英 i18n 字串（`countdown.label`、`countdown.days`、`countdown.daysOne`，英文區分單數/複數）。
- 版本更新為 `v0.7.2`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.7.2` cache-busting 參數。

## v0.7.1（2026-08-19）
**更新主題**：筆記新增英文（English UK）版本

- **筆記英文版**：新增 [`notes.en.js`](notes.en.js)（`NOTES_EN`），將全部 37 個課題嘅筆記（章節標題、點列重點、兩條長題目及其參考答案）翻譯成英文（English UK），結構與 [`notes.js`](notes.js) 完全一致。
- [`app.js`](app.js) 嘅 `NOTE_LIST` 改為按語言選用：English (UK) 時載入 `NOTES_EN`，中文（香港）時載入 `NOTES`，與其餘內容庫（課題／題目／前沿科技／長題目）嘅做法一致。
- [`index.html`](index.html) 新增載入 `notes.en.js` 嘅 `<script>` 標籤。
- 版本更新為 `v0.7.1`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.7.1` cache-busting 參數。

## v0.7.0（2026-08-19）
**更新主題**：新增「個人分數」獨立頁面（點擊頁首用戶名旁的分數進入）

- **新增「個人分數」頁面**：點擊頁首用戶名旁的積分（`★ N`）即進入獨立分數頁面，顯示：
  - **個人總分**：頁面頂部以大字顯示目前總分。
  - **獲得分數紀錄**：以列表顯示每筆得分紀錄（日期、事件、得分），列表可點擊摺疊／展開；資料來源為 `points_log`（每日登入＋10、挑戰測試計分）與 `quest_completions`（任務線完成課題＋25）合併，按日期由新至舊排列。
  - **獲取分數規則**：列表下方列出獲得積分嘅規則（每日登入、挑戰模式、任務線、連續登入）。
- [`index.html`](index.html) 新增 `scorePage` 區段（總分、可摺疊紀錄列表、規則）及 `.score-summary`／`.score-record*`／`.score-rules` 等樣式；頁首積分 chip（`#currentUserPoints`）改為可點擊並加入 hover 效果。
- [`app.js`](app.js) 新增 `goToScorePage()`、`renderScorePage()`、`toggleScoreRecords()`、`loadScoreRecords()`、`renderScoreRecords()`、`renderScoreRules()`，並將 `scorePage` 加入 `PAGE_IDS`；新增中英 i18n 字串（`page.score`、`score.*`）。
- 版本更新為 `v0.7.0`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.7.0` cache-busting 參數。

## v0.6.9（2026-08-19）
**更新主題**：主頁「主頁」標題最右方新增「簽到」按鈕，無需重新登入即可更新連續登入天數

- **新增「簽到」按鈕**：主頁標題「主頁」最右方加入「簽到」按鈕，點擊後即時更新連續登入天數及每日登入積分（等同重新登入嘅效果），唔使登出再登入。
- **為何需要**：連續登入天數本來只喺登入／重新載入頁面還原登入時更新；新增按鈕後，已登入用戶可直接在主頁簽到。
- [`app.js`](app.js) 新增 `checkInToday()`（呼叫 `awardDailyLogin()` 同 `updateLoginStreak()`，並以主頁提示顯示簽到結果），`renderLoginStreak()` 同步控制「簽到」按鈕顯示（訪客模式／未登入時隱藏）；新增中英 i18n 字串（`home.checkin`、`home.checkinSuccess`、`home.checkinFail`、`home.checkinNeedLogin`）。
- [`index.html`](index.html) 主頁標題改為 flex 排版（`.home-title`），並新增「簽到」按鈕（`.check-in-btn`，置於標題最右方）及樣式。
- 版本更新為 `v0.6.9`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.6.9` cache-busting 參數。

## v0.6.8（2026-08-19）
**更新主題**：主頁「主頁」二字旁新增「連續登入 N 天」顯示

- **新增連續登入天數（Login Streak）**：主頁標題「主頁」二字旁顯示連續登入天數（例如「連續登入 3 天」），每日首次登入／還原登入時更新。
- [`supabase/schema.sql`](supabase/schema.sql) 的 `profiles` 表新增 `last_login_date`（上次登入日期）與 `login_streak`（連續登入天數，預設 0）欄位，並新增 RPC `update_login_streak()`：今日已登入則天數不變、昨日有登入則 +1、否則重設為 1，回傳目前連續天數（idempotent，可放心重跑）。
- [`app.js`](app.js) 登入／還原登入時呼叫 `updateLoginStreak()` 更新天數，並以 `renderLoginStreak()` 於主頁標題旁顯示；訪客模式／未登入／無數據時自動隱藏。新增中英 i18n 字串（`home.streak`）。
- [`index.html`](index.html) 主頁標題改為「主頁 + 連續登入標籤」結構（標籤為獨立 `<span>`，避免被語言切換覆寫），並新增 `.login-streak` 樣式。
- 版本更新為 `v0.6.8`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.6.8` cache-busting 參數。

## v0.6.7（2026-08-19）
**更新主題**：移除用戶代碼（user_code），改為在資料庫儲存電郵（email）

- **移除用戶代碼（user_code）**：`profiles` 表刪除 `user_code` 欄，並移除後端 `utf8_codepoint()`／`generate_user_code()` 函式及相關唯一性邏輯。
- **改為儲存電郵（email）**：`profiles` 表新增 `email` 欄，由 Supabase 觸發器（`handle_new_user`）在註冊時自動寫入 `auth.users.email`；已存在的記錄會以 `auth.users.email` 補填，並為 `email` 建立唯一約束。
- [`supabase/schema.sql`](supabase/schema.sql) 以 idempotent 方式加入遷移（`drop column if exists user_code`、`add column if not exists email`、`drop function if exists`），可放心在 SQL Editor 重跑。
- [`app.js`](app.js) 更新註冊錯誤訊息（移除「用戶編碼衝突」提示）及相關註解。
- 版本更新為 `v0.6.7`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.6.7` cache-busting 參數。

## v0.6.6（2026-08-19）
**更新主題**：修復更改帳戶名稱後排行榜名稱不改變的問題

- 修復在設定頁更改「用戶名稱」後，排行榜仍顯示舊名稱的問題。
- **根本原因**：排行榜讀取 `profiles.username`（[`app.js`](app.js) 的 `loadRanking()`／`renderRanking()`），而更改名稱會更新 `profiles.username`；但 `profiles` 表啟用了 RLS 且**只有 SELECT 政策、沒有 UPDATE 政策**，令用戶無法更新自己記錄的 `username`，因此排行榜名稱不會更新（頁首名稱因讀取 auth 元數據而能正常更新）。
- [`supabase/schema.sql`](supabase/schema.sql) 新增 `profiles_update_own` 政策（`using`/`with check (auth.uid() = id)`），允許用戶更新自己的記錄；部署時需在 SQL Editor 重新執行 `schema.sql`（idempotent，安全）。
- 版本更新為 `v0.6.6`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.6.6` cache-busting 參數。

## v0.6.5（2026-08-19）
**更新主題**：新增「訪客模式」（Guest Mode）

- 登入頁新增「以訪客模式使用」按鈕，**無需登入**即可使用大部分功能（練習、挑戰、長題目、筆記、前沿科技等）。
- 訪客模式**不儲存任何資料到資料庫**：錯題、任務線完成記錄、積分等一律不會寫入 Supabase（相關 RPC 因沒有登入用戶而自動跳過）。
- 訪客模式**不能使用「排行榜」與「錯題重溫」**：
  - 主頁的「🏆 排行榜」與「📚 錯題重溫」兩張卡片**仍然保留顯示**；
  - 訪客點擊時只會在主頁看到「此功能需要登入使用，請先登入或註冊帳戶」提示（數秒後自動消失），不會進入相關頁面。
- 頁首顯示「訪客模式」標籤及「離開」按鈕，可隨時返回登入頁；設定頁在訪客模式下只顯示外觀與語言，隱藏用戶名稱／電郵／刪除帳戶等帳戶區塊。
- 練習分析頁的任務線加分、挑戰分析頁的積分顯示，在訪客模式下不會出現（訪客不計分、不儲存資料）。
- [`app.js`](app.js) 新增 `isGuestMode` 狀態與 `enterGuestMode()`、`exitGuestMode()`、`showHomeNotice()` 函式，並調整 `requireAuth()`、`updateAuthHeader()`、`goHome()`、`renderSettingsPage()`、`goToRankingPage()`、`goToWrongPage()` 等；[`index.html`](index.html) 新增訪客按鈕、頁首訪客標籤、主頁提示區及中英 i18n 字串。
- 版本更新為 `v0.6.5`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.6.5` cache-busting 參數。

## v0.6.4（2026-08-19）
**更新主題**：主頁交換「學習前沿科技」與「長題目」卡片位置（移除 v0.6.3 滑動橫幅）

- 依用戶意見，移除主頁 v0.6.3 新增的滑動橫幅（Swipe Carousel）及相關樣式與 i18n 字串。
- 改為在**主頁卡片網格**直接交換「📝 長題目」與「🔬 學習前沿科技」兩張卡片的位置：
  - 「長題目」移至第 2 位（多項選擇題之後）。
  - 「學習前沿科技」移至最後一位（排行榜之後）。
- [`index.html`](index.html) 移除 `.home-carousel` 樣式與結構；[`app.js`](app.js) 移除 `home.swipeHint`、`home.techSub`、`home.longqSub` i18n 字串。
- 版本更新為 `v0.6.4`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.6.4` cache-busting 參數。

## v0.6.3（2026-08-19）
**更新主題**：主頁新增「學習前沿科技」與「長題目」可滑動（Swipe）橫幅

- 主頁新增**滑動橫幅（Swipe Carousel）**，將「🔬 學習前沿科技」與「📝 長題目」兩個快速入口放在同一橫幅內，支援手指左右滑動（touch swipe）及鼠標水平捲動（`scroll-snap`），並加入滑動提示文字。
- 主頁下方的卡片網格保留其餘入口（多項選擇題、錯題重溫、筆記、排行榜）。
- [`index.html`](index.html) 新增 `.home-carousel`／`.home-carousel-card` 樣式與結構；[`app.js`](app.js) 新增中英 i18n 字串（`home.swipeHint`、`home.techSub`、`home.longqSub`）。
- 版本更新為 `v0.6.3`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.6.3` cache-busting 參數。

## v0.6.2（2026-08-19）
**更新主題**：修復長題目在章節詳情頁切換「按課本」時，詳情內容殘留在列表下方的問題

- 修復在長題目頁先開啟某課題詳情（如 CH01）後，直接切換「按課本（By Book）」時，原本的課題詳情內容沒有關閉，導致課本列表顯示在殘留詳情下方的問題。
- [`app.js`](app.js) 的 `renderLongQList()` 在每次切換「按課題／按課本」時，會先關閉（加入 `hidden`）已開啟的 `#longQDetail` 詳情，再顯示對應列表，確保切換模式後只顯示對應的列表內容。
- 版本更新為 `v0.6.2`（`APP_VERSION`），並同步更新 [`index.html`](index.html) 的 `?v=0.6.2` cache-busting 參數。

## v0.6.1（2026-08-19）
**更新主題**：修復「長題目」頁面返回主頁時內容殘留顯示在主頁下方的問題

- 修復長題目（`longQPage`）返回主頁（或返回課題列表）時，長題目內容仍殘留在主頁下方的問題。
- [`app.js`](app.js) 的 `goToLongQList()` 現在會在返回列表時一併清空已渲染的 `#longQDetailContent`，確保離開長題目頁後不會殘留任何長題目文字。
- 確認 `longQPage` 已納入 `PAGE_IDS`，`goHome()` 返回主頁時會先重置長題目頁狀態再顯示主頁。
- [`index.html`](index.html) 所有本機 `<script>` 加入 `?v=0.6.1` 版本參數（cache-busting），避免瀏覽器沿用舊快取而看不到修正。
- 版本更新為 `v0.6.1`（`APP_VERSION`）。

## v0.6.0（2026-08-19）
**更新主題**：新增「長題目」功能（To do：長題目）

- 新增**長題目**（Long Questions）功能，主頁新增「📝 長題目」入口，新增 [`longQuestions1.js`](longQuestions1.js)、[`longQuestions2.js`](longQuestions2.js)、[`longQuestions3.js`](longQuestions3.js)、[`bookLongQuestions.js`](bookLongQuestions.js)（中文）及對應英文版本 `*.en.js`。
- 長題目**只提供問題與參考答案**（不作批改），答案可逐題展開／收起，方便研習與溫習。
- 長題目內容按「課題」與「課本」兩大模式瀏覽（與練習模式相同的切換方式）：
  - **按課題**：37 個課題，每課題 **15 條**長題目（含分數標記與參考答案）。
  - **按課本**：9 個課本分冊（1A–6），每冊 **5 條跨課題（cross-topic）綜合長題目**，綜合運用該冊多個課題的知識。
- 內容來源：`Bio Prog/01 Data Base` 的 E-book 課本課後評估「長問題／論述題」、DSE 結構式題目，並配合 [`notes.js`](notes.js) 的長題目內容整理而成。
- 新增頁面 [`index.html`](index.html)（`longQPage`）＋ [`app.js`](app.js) 渲染邏輯（`goToLongQPage()`、`renderLongQList()`、`openLongQChapter()`、`openLongQBook()` 等），並加入中英 i18n 字串。
- 版本更新為 `v0.6.0`（`APP_VERSION`）。

## v0.5.2（2026-08-19）
**更新主題**：學習前沿科技內容擴充至 25 項 ＋ 顯示改為列表

- 學習前沿科技由 5 項擴充至 **25 項**，並提供**中文（香港）**與 **English (UK)** 兩個版本：
  - [`frontierTech.js`](frontierTech.js)（`FRONTIER_TECH`，zh-HK）：新增 20 項——基因治療、合成生物學、人工智能與生物學、單細胞測序技術、精準醫學與基因組學、組織工程與人工器官、納米醫學、生物感測器、人體微生物組與益生菌、器官晶片、生物燃料、植物組織培養與微繁殖、RNA 干擾與基因沉默、3D 生物列印、液體活檢、免疫檢查點抑制劑、基因資料庫與私隱、生物修復技術、輔助生殖技術與試管嬰兒、端粒與衰老研究。
  - [`frontierTech.en.js`](frontierTech.en.js)（`FRONTIER_TECH_EN`，en-UK）：以上 20 項的英文版本，與中文一一對應。
  - 每項均含標題、副標題、相關課題、核心概念、科技概念說明、可靠來源連結及 5 條互動 MC。
- 「學習前沿科技」頁面由**卡片網格**改為**可摺疊列表**（[`app.js`](app.js)＋[`index.html`](index.html)）：
  - 25 項科技以列表形式逐行列出（編號＋標題＋副標題），點擊標題列即可展開／收起詳細內容，方便瀏覽大量項目。
  - 取代原 `.tech-grid`／`.tech-card` 樣式，新增 `.tech-list*` 樣式（深色／暖色主題同步生效）。
- 版本更新為 `v0.5.2`（`APP_VERSION`）。

## v0.5.1（2026-08-19）
**更新主題**：新增 English (UK) 內容庫（配合 v0.5.0 的語言切換功能）

- 新增 English (UK) 版本的題庫與前沿科技內容，全部與原有中文內容一一對應（37 課題 × 每課題 20 題，共 740 題）：
  - [`topics.en.js`](topics.en.js)：37 課題英文名稱（`TOPICS_EN`）＋課本分冊清單（`BOOKS_EN`）。
  - [`questionBank1.en.js`](questionBank1.en.js)：課題 01–13 英文題庫（`QB1_EN`，260 題）。
  - [`questionBank2.en.js`](questionBank2.en.js)：課題 14–25 英文題庫（`QB2_EN`，240 題）。
  - [`questionBank3.en.js`](questionBank3.en.js)：課題 26–37 英文題庫（`QB3_EN`，240 題）。
  - [`frontierTech.en.js`](frontierTech.en.js)：5 種前沿科技英文內容（`FRONTIER_TECH_EN`，含相關課題與互動 MC）。
- [`app.js`](app.js) 依語言（localStorage `bioAppLanguage`）選擇內容庫：English (UK) 載入 `*_EN` 版本，中文（香港）沿用原本 `*` 版本；切換語言並重新載入頁面後即自動套用。
- [`index.html`](index.html) 加入載入英文內容庫的 `<script>` 標籤。
- 版本更新為 `v0.5.1`（`APP_VERSION`）。

## v0.5.0（2026-08-19）
**更新主題**：新增「設定」頁（To do #14）

- 頁首原「主題切換」按鈕改為**設定齒輪圖示（⚙️）**，點擊進入「設定」頁。
- 新增「設定」頁（[`index.html`](index.html)＋[`app.js`](app.js)），分區列出各項設定並附標題：
  - **外觀**：選擇顏色主題（☀️ 淺色 / 🌙 深色 / 🌇 暖色），取代原頁首循環切換按鈕；偏好仍儲存於 localStorage（`bioAppTheme`）。
  - **語言**：可切換 **中文（香港）** 與 **English (UK)**；偏好儲存於 localStorage（`bioAppLanguage`）。加入 i18n 系統（`t()`／`applyLanguage()`），翻譯頁首、頁面標題、卡片、按鈕、設定頁及主要動態文字。
  - **用戶名稱**：可修改顯示名稱（1–20 字元，檢查重複）；更新 `profiles.username` 並同步 auth 元數據。
  - **電郵**：顯示目前登入所使用的電郵地址（唯讀）。
  - **危險區域（紅色）**：刪除帳戶按鈕，設**雙重確認**（先按「刪除帳戶」→ 再按「是，我確定刪除」），透過 RPC `delete_account` 於後端刪除用戶（`profiles`／`wrong_questions`／`points_log`／`quest_completions` 因 `on delete cascade` 自動清除）。
- 新增後端（[`supabase/schema.sql`](supabase/schema.sql)）：`delete_account()` RPC 函式（SECURITY DEFINER，只允許刪除自己）。
- 用戶代碼（`user_code`）**不會**出現在設定頁或任何前端位置（延續 v0.2.1 的做法）。

## v0.4.0（2026-08-18）
**更新主題**：新增「任務線」功能（To do #12）

- 新增「任務線」：於「練習模式」按課題列表顯示，每個課題完成練習並**全部答對（20/20）**後，課題名稱旁會顯示 ✓，並獲得 **25 分**；每帳戶每課題只可獲得一次（由 `quest_completions` 表 `unique(user_id, topic_no)` 約束保證，重複完成不會重複加分）。
- 新增後端（[`supabase/schema.sql`](supabase/schema.sql)）：`quest_completions` 表（RLS 保護，只限本人讀寫）＋ `award_quest_completion(p_topic_no)` RPC 函式（首次 +25，否則回傳 0）。
- 新增前端邏輯（[`app.js`](app.js)）：`loadQuestCompletions()`、`clearQuestCache()`、`isQuestCompleted()`、`awardQuestCompletion()`；練習分析頁全對時顯示任務完成訊息；課本練習／錯題重溫／挑戰模式**不會**觸發任務加分。
- 任務線只對登入用戶生效（沿用 `requireAuth` 機制）；登入時預先載入完成記錄、登出時清除快取。

## v0.3.1（2026-08-18）
**更新主題**：UI／導航修正

- 修復筆記頁在返回主頁時仍顯示在主頁下方：`notesPage` 加入 `PAGE_IDS`，返回主頁時重置為課題列表。
- 錯題重溫頁按鈕移至錯題列表上方。

## v0.3.0（2026-08-18）
**更新主題**：新增「筆記」功能（To do #3）

- 新增 [`notes.js`](notes.js)：為全部 37 個課題建立**點列式筆記**＋每課**兩條長題目**（含參考答案），內容以 `Bio Prog/01 Data Base/E-notes`（課堂筆記）及課本為基礎，課題編號與 `topics.js` 一致。
- 新增「筆記」頁面（[`index.html`](index.html)）：首頁新增「📖 筆記」入口；筆記頁以列表形式列出 37 個課題，點入後按章節（headings）瀏覽點列筆記，長題目答案可摺疊顯示。
- 新增筆記頁邏輯（[`app.js`](app.js)）：`goToNotesPage()`、`renderNotesChapterList()`、`openNotesChapter()`、`getNoteByNo()` 等。
- 新增版本機制：`APP_VERSION` 常數＋頁首版本標示。

## v0.2.1（2026-08-18）
**更新主題**：隱藏用戶代碼（user_code）於前端

- 用戶代碼改由 Supabase 後端觸發器（`handle_new_user`）自動產生（[`supabase/schema.sql`](supabase/schema.sql)）。
- 移除前端用戶代碼產生函數及所有顯示位置（頁首、排行榜、註冊流程）。
- 更新 [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) 說明。

---

## ⚠️ 更新提醒（記住！）

**每次修改程式後，都必須：**

1. 更新 [`app.js`](app.js) 中的 `APP_VERSION`。
2. 在本檔案**頂部**新增一條版本記錄（格式：`## vX.Y.Z（日期）`＋「更新主題」＋內容點列）。
3. 若涉及後端／資料庫，同步更新 `supabase/schema.sql` 與 `SUPABASE_SETUP.md`。

> 若你完成了程式改動但沒有更新本檔案，代表該次更新仍未完成——請立即補上。
