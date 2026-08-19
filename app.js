// app.js
// 生物溫習程式 — 應用程式邏輯（頁面切換、練習模式、挑戰模式、分析頁、前沿科技渲染）

'use strict';

// ---------- 安全合併題庫（檔案缺失時不報錯） ----------
// 依語言選擇內容庫（v0.5.1 起支援英文）：
//   - 中文（香港）（zh-HK）→ 載入原本的 *.js（QB1 / QB2 / QB3 / FRONTIER_TECH / TOPICS / BOOKS）
//   - English (UK)（en）→ 載入英文版 *.en.js（QB1_EN / QB2_EN / QB3_EN / FRONTIER_TECH_EN / TOPICS_EN / BOOKS_EN）
// 語言在載入時由 localStorage（bioAppLanguage）決定（切換語言會重新載入頁面）。
const IS_EN_BANK = getAppLanguage() === 'en';

const ALL_QUESTIONS = IS_EN_BANK
  ? [...(typeof QB1_EN !== 'undefined' ? QB1_EN : []), ...(typeof QB2_EN !== 'undefined' ? QB2_EN : []), ...(typeof QB3_EN !== 'undefined' ? QB3_EN : [])]
  : [...(typeof QB1 !== 'undefined' ? QB1 : []), ...(typeof QB2 !== 'undefined' ? QB2 : []), ...(typeof QB3 !== 'undefined' ? QB3 : [])];

const FRONTIER = IS_EN_BANK
  ? (typeof FRONTIER_TECH_EN !== 'undefined' ? FRONTIER_TECH_EN : [])
  : (typeof FRONTIER_TECH !== 'undefined' ? FRONTIER_TECH : []);

const TOPIC_LIST = IS_EN_BANK
  ? (typeof TOPICS_EN !== 'undefined' ? TOPICS_EN : [])
  : (typeof TOPICS !== 'undefined' ? TOPICS : []);

const BOOK_LIST = IS_EN_BANK
  ? (typeof BOOKS_EN !== 'undefined' ? BOOKS_EN : [])
  : (typeof BOOKS !== 'undefined' ? BOOKS : []);

const NOTE_LIST = IS_EN_BANK
  ? (typeof NOTES_EN !== 'undefined' ? NOTES_EN : [])
  : (typeof NOTES !== 'undefined' ? NOTES : []);

// ---------- 長題目內容庫（按語言選用） ----------
// 中文（香港）→ LQ1 / LQ2 / LQ3 / LQ_BOOKS；English (UK) → LQ1_EN / LQ2_EN / LQ3_EN / LQ_BOOKS_EN
const LQ_BY_TOPIC = IS_EN_BANK
  ? [...(typeof LQ1_EN !== 'undefined' ? LQ1_EN : []), ...(typeof LQ2_EN !== 'undefined' ? LQ2_EN : []), ...(typeof LQ3_EN !== 'undefined' ? LQ3_EN : [])]
  : [...(typeof LQ1 !== 'undefined' ? LQ1 : []), ...(typeof LQ2 !== 'undefined' ? LQ2 : []), ...(typeof LQ3 !== 'undefined' ? LQ3 : [])];

const LQ_BY_BOOK = IS_EN_BANK
  ? (typeof LQ_BOOKS_EN !== 'undefined' ? LQ_BOOKS_EN : [])
  : (typeof LQ_BOOKS !== 'undefined' ? LQ_BOOKS : []);

// ---------- 版本（更新時記得同步 CHANGELOG.md） ----------
// 每次更新後：1) 修改下方 APP_VERSION；2) 在 CHANGELOG.md 加入對應的版本記錄（見檔案末尾提醒）。
const APP_VERSION = 'v0.9.9';

function updateVersionLabel() {
  const el = document.getElementById('appVersionLabel');
  if (el) el.textContent = APP_VERSION;
}

// 渲染 2027 生物科 DSE 倒數（目標：2027 年 4 月 19 日，香港時間 UTC+8）
function renderCountdown() {
  const daysEl = document.getElementById('dseCountdownDays');
  const unitEl = document.getElementById('dseCountdownUnit');
  if (!daysEl) return;

  // 以香港時間（UTC+8）計算「今天」的日期（避免瀏覽器時區差異）
  const now = new Date();
  const nowHk = new Date(now.getTime() + 8 * 3600 * 1000);
  const startOfTodayHk = Date.UTC(nowHk.getUTCFullYear(), nowHk.getUTCMonth(), nowHk.getUTCDate());

  // 目標：2027-04-19 00:00 UTC（即香港時間 2027-04-19 08:00）
  const targetHk = Date.UTC(2027, 3, 19);

  let days = Math.ceil((targetHk - startOfTodayHk) / (24 * 3600 * 1000));
  if (days < 0) days = 0; // 已過期則顯示 0

  daysEl.textContent = String(days);
  if (unitEl) unitEl.textContent = (days === 1) ? t('countdown.daysOne') : t('countdown.days');
}

// ---------- 狀態變數 ----------
let practiceQuestions = [];
let practiceIndex = 0;
let practiceCorrectCount = 0;
let practiceTopicNo = null;
let practiceBookId = null; // 課本練習模式：目前練習的課本 id（null 表示按課題或錯題重溫）
let wrongQuizActive = false; // 錯題重溫（重溫作答）模式旗標
let practiceListMode = 'topic'; // 練習列表切換：'topic' 按課題 / 'book' 按課本
let isGuestMode = false; // 訪客模式：無需登入、不儲存資料、停用排行榜與錯題重溫
let homeNoticeTimer = null; // 主頁提示訊息自動隱藏計時器

let challengeQuestions = [];
let challengeIndex = 0;
let challengeAnswers = [];
let challengeTimerSeconds = 40 * 60;
let challengeTimerInterval = null;

// ---------- 工具函式 ----------
function letter(i) {
  return String.fromCharCode(65 + i);
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function topicName(no) {
  const topic = TOPIC_LIST.find(function (x) { return x.no === no; });
  return topic ? topic.name : t('topic.label', { no: no });
}

function getQuestionsByTopic(no) {
  return ALL_QUESTIONS.filter(function (q) { return q && q.topicNo === no; });
}

function getBookById(bookId) {
  return BOOK_LIST.find(function (b) { return b.id === bookId; });
}

function getQuestionsByBook(bookId) {
  const book = getBookById(bookId);
  if (!book) return [];
  return ALL_QUESTIONS.filter(function (q) {
    return q && book.chapters.indexOf(q.topicNo) !== -1;
  });
}

function reasonOf(q, index) {
  if (!q || !Array.isArray(q.reasons)) return '';
  return q.reasons[index] || '';
}

// ---------- 頁面切換 ----------
const PAGE_IDS = [
  'loginPage',
  'registerPage',
  'homePage',
  'mcPage',
  'practiceListPage',
  'practiceQuizPage',
  'practiceAnalysisPage',
  'challengePage',
  'challengeAnalysisPage',
  'wrongPage',
  'techPage',
  'faqPage',
  'bugPage',
  'notesPage',
  'longQPage',
  'rankingPage',
  'scorePage',
  'settingsPage',
  'dsePage'
];

function showPage(pageId) {
  PAGE_IDS.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById(pageId);
  if (target) target.classList.remove('hidden');
  window.scrollTo(0, 0);
}

function goHome() {
  if (!requireAuth()) return;
  stopChallenge();
  stopDseTimer();
  goToNotesList();
  goToLongQList();
  showPage('homePage');
}

function goToMCPage() {
  if (!requireAuth()) return;
  stopChallenge();
  showPage('mcPage');
}

function goToPracticeMode() {
  if (!requireAuth()) return;
  stopChallenge();
  renderPracticeList();
  showPage('practiceListPage');
}

function goToChallengeMode() {
  if (!requireAuth()) return;
  startChallenge();
}

function goToTechPage() {
  if (!requireAuth()) return;
  stopChallenge();
  renderTechPage();
  showPage('techPage');
}

// ---------- 常見問題 FAQ ----------
function goToFaqPage() {
  if (!requireAuth()) return;
  stopChallenge();
  renderFaqPage();
  showPage('faqPage');
}

// FAQ 項目定義於 faq.js（獨立資料檔，仿照長題目資料檔）：
// const FAQ_ITEMS = [ { q: {zh,en}, a: {zh,en}, link?: {url, label:{zh,en}} } ]

function renderFaqPage() {
  const container = document.getElementById('faqContainer');
  if (!container) return;
  container.innerHTML = '';
  const items = (typeof FAQ_ITEMS !== 'undefined') ? FAQ_ITEMS : [];
  if (!items.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('faq.noContent');
    container.appendChild(p);
    return;
  }
  items.forEach(function (item, index) {
    container.appendChild(buildFaqItem(item, index));
  });
}

// 可摺疊 FAQ 項目（重用 tech-list 樣式）
function buildFaqItem(item, index) {
  const wrap = document.createElement('div');
  wrap.className = 'tech-list-item';

  const header = document.createElement('button');
  header.type = 'button';
  header.className = 'tech-list-header';
  header.setAttribute('aria-expanded', 'false');

  const headerText = document.createElement('span');
  headerText.className = 'tech-list-header-text';

  const num = document.createElement('span');
  num.className = 'tech-list-num';
  num.textContent = 'Q' + String(index + 1);

  const titleWrap = document.createElement('span');
  titleWrap.className = 'tech-list-title-wrap';

  const title = document.createElement('span');
  title.className = 'tech-list-title';
  title.textContent = pickL(item.q);

  titleWrap.appendChild(title);
  headerText.appendChild(num);
  headerText.appendChild(titleWrap);

  const arrow = document.createElement('span');
  arrow.className = 'tech-list-arrow';
  arrow.textContent = '▸';

  header.appendChild(headerText);
  header.appendChild(arrow);

  const body = document.createElement('div');
  body.className = 'tech-list-body hidden';

  const answer = document.createElement('p');
  answer.className = 'faq-answer';
  answer.textContent = pickL(item.a);
  body.appendChild(answer);

  // 可選的外部連結（如 DeepSeek 官方網站）
  if (item.link) {
    const link = document.createElement('a');
    link.className = 'btn btn-source';
    link.href = item.link.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = pickL(item.link.label);
    body.appendChild(link);
  }

  header.onclick = function () {
    const isHidden = body.classList.toggle('hidden');
    header.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
    arrow.textContent = isHidden ? '▸' : '▾';
    wrap.classList.toggle('expanded', !isHidden);
  };

  wrap.appendChild(header);
  wrap.appendChild(body);
  return wrap;
}

// ---------- Bug 回報 ----------
let bugStatuses = [];
let bugStatusMap = {};

function goToBugPage() {
  if (!requireAuth()) return;
  stopChallenge();
  stopDseTimer();
  showPage('bugPage');
  renderBugPage();
}

// 讀取資料庫可設定的狀態列表（bug_report_statuses，管理員可在資料庫增刪改）
async function loadBugStatuses() {
  if (!supabaseReady || !sb) return;
  try {
    const { data, error } = await sb
      .from('bug_report_statuses')
      .select('code, label_zh, label_en, color, sort_order, is_active')
      .order('sort_order', { ascending: true });
    if (error) return;
    bugStatuses = (data || []).filter(function (s) { return s.is_active !== false; });
    bugStatusMap = {};
    bugStatuses.forEach(function (s) { bugStatusMap[s.code] = s; });
  } catch (e) {}
}

function bugStatusLabel(statusCode) {
  const s = bugStatusMap[statusCode];
  if (!s) return statusCode || '—';
  return getAppLanguage() === 'en' ? (s.label_en || s.label_zh || statusCode) : (s.label_zh || s.label_en || statusCode);
}

function bugStatusColor(statusCode) {
  const s = bugStatusMap[statusCode];
  return (s && s.color) ? s.color : '#6b7280';
}

async function renderBugPage() {
  await loadBugStatuses();
  loadBugReports();
}

async function getCurrentUsername() {
  const user = getCurrentUser();
  if (!user || !supabaseReady || !sb) return null;
  try {
    const { data, error } = await sb
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .maybeSingle();
    if (error || !data) return null;
    return data.username || null;
  } catch (e) { return null; }
}

// 提交 Bug 回報（存到資料庫 bug_reports，狀態預設 new）
async function submitBugReport(event) {
  if (event) event.preventDefault();
  const titleEl = document.getElementById('bugTitle');
  const catEl = document.getElementById('bugCategory');
  const descEl = document.getElementById('bugDescription');
  const stepsEl = document.getElementById('bugSteps');
  const noticeEl = document.getElementById('bugFormNotice');
  const btn = document.getElementById('bugSubmitBtn');

  const user = getCurrentUser();
  if (!user || !supabaseReady || !sb) return;

  const title = ((titleEl && titleEl.value) || '').trim();
  const desc = ((descEl && descEl.value) || '').trim();
  if (!title || !desc) {
    if (noticeEl) noticeEl.textContent = t('bug.fillRequired');
    return;
  }

  if (btn) btn.disabled = true;
  try {
    const username = await getCurrentUsername();
    const { error } = await sb.from('bug_reports').insert({
      user_id: user.id,
      username: username,
      title: title,
      category: (catEl && catEl.value) || 'other',
      description: desc,
      steps: ((stepsEl && stepsEl.value.trim()) || null),
      status_code: 'new'
    });
    if (error) {
      if (noticeEl) noticeEl.textContent = t('bug.submitFailed');
      return;
    }
    if (noticeEl) noticeEl.textContent = t('bug.submitted');
    if (titleEl) titleEl.value = '';
    if (descEl) descEl.value = '';
    if (stepsEl) stepsEl.value = '';
    loadBugReports();
  } catch (e) {
    if (noticeEl) noticeEl.textContent = t('bug.submitFailed');
  } finally {
    if (btn) btn.disabled = false;
  }
}

// 讀取我的回報並顯示狀態
async function loadBugReports() {
  const container = document.getElementById('bugReportsList');
  const user = getCurrentUser();
  if (!container || !user || !supabaseReady || !sb) return;
  container.innerHTML = '<p class="meta">' + t('bug.loading') + '</p>';
  try {
    const { data, error } = await sb
      .from('bug_reports')
      .select('id, title, category, description, steps, status_code, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) {
      container.innerHTML = '<p class="notice">' + t('bug.loadFailed') + '</p>';
      return;
    }
    renderBugReports(container, data || []);
  } catch (e) {
    container.innerHTML = '<p class="notice">' + t('bug.loadFailed') + '</p>';
  }
}

function renderBugReports(container, reports) {
  container.innerHTML = '';
  if (!reports.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('bug.noReports');
    container.appendChild(p);
    return;
  }
  reports.forEach(function (r) {
    container.appendChild(buildBugReportItem(r));
  });
}

function buildBugReportItem(r) {
  const item = document.createElement('div');
  item.className = 'bug-report-item';

  const head = document.createElement('div');
  head.className = 'bug-report-head';

  const title = document.createElement('span');
  title.className = 'bug-report-title';
  title.textContent = '#' + r.id + ' ' + (r.title || t('bug.untitled'));

  const badge = document.createElement('span');
  badge.className = 'bug-status-badge';
  badge.style.backgroundColor = bugStatusColor(r.status_code);
  badge.textContent = bugStatusLabel(r.status_code);

  head.appendChild(title);
  head.appendChild(badge);

  const meta = document.createElement('p');
  meta.className = 'meta';
  meta.textContent = t('bug.category.' + (r.category || 'other')) + ' · ' + bugFormatDate(r.created_at);
  item.appendChild(head);
  item.appendChild(meta);

  const desc = document.createElement('p');
  desc.className = 'bug-report-desc';
  desc.textContent = r.description || '';
  item.appendChild(desc);

  if (r.steps) {
    const stepsLabel = document.createElement('p');
    stepsLabel.className = 'meta';
    stepsLabel.textContent = t('bug.stepsLabel');
    const steps = document.createElement('p');
    steps.className = 'bug-report-desc';
    steps.textContent = r.steps;
    item.appendChild(stepsLabel);
    item.appendChild(steps);
  }

  return item;
}

function bugFormatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

function exitChallenge() {
  if (!requireAuth()) return;
  stopChallenge();
  showPage('mcPage');
}

// ---------- 練習模式 ----------
function renderPracticeList() {
  const topicListEl = document.getElementById('practiceTopicList');
  const bookListEl = document.getElementById('practiceBookList');
  if (topicListEl) topicListEl.classList.toggle('hidden', practiceListMode !== 'topic');
  if (bookListEl) bookListEl.classList.toggle('hidden', practiceListMode !== 'book');
  syncPracticeSwitch();
  if (practiceListMode === 'book') {
    renderPracticeBookList();
  } else {
    renderPracticeTopicList();
  }
}

function setPracticeListMode(mode) {
  practiceListMode = (mode === 'book') ? 'book' : 'topic';
  renderPracticeList();
}

function syncPracticeSwitch() {
  const btns = document.querySelectorAll('#practiceSwitch .practice-switch-btn');
  btns.forEach(function (b) {
    if (b.getAttribute('data-mode') === practiceListMode) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
}

function renderPracticeBookList() {
  const listEl = document.getElementById('practiceBookList');
  const noticeEl = document.getElementById('practiceListNotice');
  if (!listEl) return;
  listEl.innerHTML = '';
  if (noticeEl) noticeEl.textContent = '';

  if (!BOOK_LIST.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('practice.noBooks');
    listEl.appendChild(p);
    return;
  }

  BOOK_LIST.forEach(function (b) {
    const row = document.createElement('div');
    row.className = 'topic-row';

    const no = document.createElement('span');
    no.className = 'topic-no';
    no.textContent = b.id;

    const name = document.createElement('span');
    name.className = 'topic-name';
    name.textContent = b.name + '　' + b.range;

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = t('btn.enter');
    btn.onclick = function () { startBookPractice(b.id); };

    row.appendChild(no);
    row.appendChild(name);
    row.appendChild(btn);
    listEl.appendChild(row);
  });
}

async function renderPracticeTopicList() {
  const listEl = document.getElementById('practiceTopicList');
  const noticeEl = document.getElementById('practiceListNotice');
  if (!listEl) return;
  listEl.innerHTML = '';
  if (noticeEl) noticeEl.textContent = '';

  await loadQuestCompletions(); // 確保任務線完成狀態已載入，先可以顯示 ✓

  if (!TOPIC_LIST.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('practice.noTopics');
    listEl.appendChild(p);
    return;
  }

  TOPIC_LIST.forEach(function (topic) {
    const row = document.createElement('div');
    row.className = 'topic-row';

    const no = document.createElement('span');
    no.className = 'topic-no';
    no.textContent = pad(topic.no);

    const name = document.createElement('span');
    name.className = 'topic-name';
    name.textContent = topic.name;

    // 任務線：該課題練習全對完成 → 名稱旁加 ✓
    if (isQuestCompleted(topic.no)) {
      const tick = document.createElement('span');
      tick.className = 'quest-tick';
      tick.textContent = '✓';
      tick.title = '任務完成（全對 +25 分，已領取）';
      name.appendChild(tick);
    }

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = t('btn.enter');
    btn.onclick = function () { startPractice(topic.no); };

    row.appendChild(no);
    row.appendChild(name);
    row.appendChild(btn);
    listEl.appendChild(row);
  });
}

function startPractice(topicNo) {
  const qs = getQuestionsByTopic(topicNo);
  const noticeEl = document.getElementById('practiceListNotice');

  if (!qs.length) {
    if (noticeEl) noticeEl.textContent = t('practice.noQuestions');
    return;
  }
  if (noticeEl) noticeEl.textContent = '';

  practiceTopicNo = topicNo;
  practiceBookId = null;
  practiceQuestions = qs.slice(0, 20);
  practiceIndex = 0;
  practiceCorrectCount = 0;
  wrongQuizActive = false;

  showPage('practiceQuizPage');
  renderPracticeQuestion();
}

function startBookPractice(bookId) {
  const qs = getQuestionsByBook(bookId);
  const noticeEl = document.getElementById('practiceListNotice');

  if (!qs.length) {
    if (noticeEl) noticeEl.textContent = t('practice.noQuestionsBook');
    return;
  }
  if (noticeEl) noticeEl.textContent = '';

  practiceTopicNo = null;
  practiceBookId = bookId;
  practiceQuestions = qs; // 整冊練習，不限 20 題
  practiceIndex = 0;
  practiceCorrectCount = 0;
  wrongQuizActive = false;

  showPage('practiceQuizPage');
  renderPracticeQuestion();
}

function renderPracticeQuestion() {
  const q = practiceQuestions[practiceIndex];
  const meta = document.getElementById('practiceMeta');
  const container = document.getElementById('practiceQuestionContainer');
  const feedback = document.getElementById('practiceFeedback');
  const nextBtn = document.getElementById('practiceNextBtn');
  const analysisBtn = document.getElementById('practiceAnalysisBtn');

  feedback.className = 'feedback';
  feedback.textContent = '';
  nextBtn.classList.add('hidden');
  analysisBtn.classList.add('hidden');
  container.innerHTML = '';

  let topicLabel;
  if (practiceBookId !== null) {
    const book = getBookById(practiceBookId);
    topicLabel = (book ? book.name : t('book.label', { id: practiceBookId })) + '　' + (book ? book.range : '');
  } else if (practiceTopicNo === null) {
    topicLabel = t('wrong.label');
  } else {
    topicLabel = t('topic.label', { no: practiceTopicNo }) + '　' + topicName(practiceTopicNo);
  }
  meta.textContent = topicLabel + t('q.meta', { cur: practiceIndex + 1, total: practiceQuestions.length });

  const qText = document.createElement('div');
  qText.className = 'question-text';
  qText.textContent = q.q;
  container.appendChild(qText);

  const opts = document.createElement('div');
  opts.className = 'options';
  q.options.forEach(function (opt, i) {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = letter(i) + '. ' + opt;
    btn.onclick = function () { answerPractice(i, opts); };
    opts.appendChild(btn);
  });
  container.appendChild(opts);
}

async function answerPractice(selected, opts) {
  const q = practiceQuestions[practiceIndex];
  const feedback = document.getElementById('practiceFeedback');
  const nextBtn = document.getElementById('practiceNextBtn');
  const analysisBtn = document.getElementById('practiceAnalysisBtn');

  opts.querySelectorAll('button').forEach(function (b) { b.disabled = true; });

  const correctText = letter(q.correct) + '. ' + q.options[q.correct];

  if (selected === q.correct) {
    practiceCorrectCount++;
    feedback.className = 'feedback correct';
    feedback.textContent = t('feedback.correct');
    if (wrongQuizActive) {
      // 錯題重溫：答對即從錯題簿移除（該題「畢業」）
      const list = await loadWrongQuestions();
      const idx = list.findIndex(function (r) { return r.q && r.q.q === q.q; });
      if (idx !== -1) await removeWrongQuestion(idx);
    }
  } else {
    await saveWrongQuestion(q, selected);
    const reason = reasonOf(q, selected);
    feedback.className = 'feedback incorrect';
    let msg = t('feedback.incorrect', { ans: correctText });
    if (reason) msg += t('feedback.reason', { reason: reason });
    feedback.textContent = msg;
  }

  if (practiceIndex < practiceQuestions.length - 1) {
    nextBtn.classList.remove('hidden');
  } else {
    analysisBtn.classList.remove('hidden');
  }
}

function nextPractice() {
  if (practiceIndex < practiceQuestions.length - 1) {
    practiceIndex++;
    renderPracticeQuestion();
  }
}

async function showPracticeAnalysis() {
  const total = practiceQuestions.length;
  const correct = practiceCorrectCount;
  const pct = total ? Math.round((correct / total) * 100) : 0;

  const content = document.getElementById('practiceAnalysisContent');
  content.innerHTML = '';

  const line1 = document.createElement('p');
  if (practiceBookId !== null) {
    const book = getBookById(practiceBookId);
    line1.textContent = (book ? book.name : t('book.label', { id: practiceBookId })) + '　' + (book ? book.range : '');
  } else if (wrongQuizActive) {
    line1.textContent = t('wrong.done');
  } else {
    line1.textContent = t('topic.label', { no: practiceTopicNo }) + '　' + topicName(practiceTopicNo);
  }

  const line2 = document.createElement('p');
  line2.className = 'score';
  line2.textContent = t('score.rate') + correct + ' / ' + total;

  const line3 = document.createElement('p');
  line3.className = 'score';
  line3.textContent = pct + '%';

  content.appendChild(line1);
  content.appendChild(line2);
  content.appendChild(line3);

  // 任務線：課題練習（非課本、非錯題重溫）全對 → 領取 +25 分（每課題一次）
  // 訪客模式不計分、不儲存資料，故不顯示任務線
  const isTopicPractice = practiceTopicNo !== null && practiceBookId === null && !wrongQuizActive && !isGuestMode;
  if (isTopicPractice && total > 0 && correct === total) {
    const questLine = document.createElement('p');
    questLine.className = 'score points-award';
    questLine.textContent = t('quest.checking');
    content.appendChild(questLine);

    const earned = await awardQuestCompletion(practiceTopicNo);
    if (earned > 0) {
      questLine.textContent = t('quest.done', { no: practiceTopicNo });
    } else if (isQuestCompleted(practiceTopicNo)) {
      questLine.textContent = t('quest.doneBefore', { no: practiceTopicNo });
    } else {
      questLine.textContent = t('quest.failed');
    }
  }

  if (wrongQuizActive) wrongQuizActive = false;

  showPage('practiceAnalysisPage');
}

// ---------- 挑戰模式 ----------
function startChallenge() {
  stopChallenge();

  const noticeEl = document.getElementById('challengeNotice');
  const container = document.getElementById('challengeQuestionContainer');
  const nextBtn = document.getElementById('challengeNextBtn');
  const prevBtn = document.getElementById('challengePrevBtn');
  const finishBtn = document.getElementById('challengeFinishBtn');
  const timerWrap = document.getElementById('challengeTimerWrap');
  if (noticeEl) noticeEl.textContent = '';

  if (!ALL_QUESTIONS.length) {
    if (container) container.innerHTML = '';
    if (nextBtn) nextBtn.classList.add('hidden');
    if (prevBtn) prevBtn.disabled = true;
    if (finishBtn) finishBtn.classList.add('hidden');
    if (timerWrap) timerWrap.classList.add('hidden');
    if (container) {
      const p = document.createElement('p');
      p.className = 'notice';
      p.textContent = t('challenge.noBank');
      container.appendChild(p);
    }
    showPage('challengePage');
    return;
  }

  if (timerWrap) timerWrap.classList.remove('hidden');

  const targetCount = Math.min(36, ALL_QUESTIONS.length);
  challengeQuestions = shuffle(ALL_QUESTIONS.slice()).slice(0, targetCount);
  challengeIndex = 0;
  challengeAnswers = new Array(challengeQuestions.length).fill(null);
  challengeTimerSeconds = 40 * 60;

  startChallengeTimer();
  showPage('challengePage');
  renderChallengeQuestion();
}

function renderChallengeQuestion() {
  const q = challengeQuestions[challengeIndex];
  const container = document.getElementById('challengeQuestionContainer');
  const nextBtn = document.getElementById('challengeNextBtn');
  const prevBtn = document.getElementById('challengePrevBtn');
  const finishBtn = document.getElementById('challengeFinishBtn');

  container.innerHTML = '';

  const isLast = challengeIndex === challengeQuestions.length - 1;
  const answered = challengeAnswers[challengeIndex] !== null;

  if (nextBtn) {
    if (!isLast && answered) {
      nextBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.add('hidden');
    }
  }

  if (finishBtn) {
    if (isLast && answered) {
      finishBtn.classList.remove('hidden');
    } else {
      finishBtn.classList.add('hidden');
    }
  }

  if (prevBtn) {
    prevBtn.disabled = challengeIndex === 0;
  }

  const qText = document.createElement('div');
  qText.className = 'question-text';
  qText.textContent = t('challenge.qTitle', { cur: challengeIndex + 1, total: challengeQuestions.length }) + q.q;
  container.appendChild(qText);

  const opts = document.createElement('div');
  opts.className = 'options';
  q.options.forEach(function (opt, i) {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    if (challengeAnswers[challengeIndex] === i) btn.classList.add('selected');
    btn.textContent = letter(i) + '. ' + opt;
    btn.onclick = function () { answerChallenge(i, opts); };
    opts.appendChild(btn);
  });
  container.appendChild(opts);
}

function answerChallenge(selected, opts) {
  challengeAnswers[challengeIndex] = selected;

  opts.querySelectorAll('button').forEach(function (b, i) {
    b.classList.toggle('selected', i === selected);
  });

  const nextBtn = document.getElementById('challengeNextBtn');
  const finishBtn = document.getElementById('challengeFinishBtn');
  const isLast = challengeIndex === challengeQuestions.length - 1;

  if (isLast) {
    if (nextBtn) nextBtn.classList.add('hidden');
    if (finishBtn) finishBtn.classList.remove('hidden');
  } else {
    if (nextBtn) nextBtn.classList.remove('hidden');
    if (finishBtn) finishBtn.classList.add('hidden');
  }
}

function nextChallenge() {
  if (challengeIndex < challengeQuestions.length - 1) {
    challengeIndex++;
    renderChallengeQuestion();
  }
}

function prevChallenge() {
  if (challengeIndex > 0) {
    challengeIndex--;
    renderChallengeQuestion();
  }
}

function startChallengeTimer() {
  stopChallengeTimer();
  updateChallengeTimer();
  challengeTimerInterval = setInterval(function () {
    challengeTimerSeconds--;
    if (challengeTimerSeconds <= 0) {
      challengeTimerSeconds = 0;
      updateChallengeTimer();
      finishChallenge();
    } else {
      updateChallengeTimer();
    }
  }, 1000);
}

function stopChallengeTimer() {
  if (challengeTimerInterval !== null) {
    clearInterval(challengeTimerInterval);
    challengeTimerInterval = null;
  }
}

function updateChallengeTimer() {
  const textEl = document.getElementById('challengeTimerText');
  const barEl = document.getElementById('challengeTimerBar');
  const mins = Math.floor(challengeTimerSeconds / 60);
  const secs = challengeTimerSeconds % 60;

  if (textEl) textEl.textContent = t('timer.left') + pad(mins) + ':' + pad(secs);
  if (barEl) {
    const ratio = challengeTimerSeconds / (40 * 60);
    barEl.style.width = (ratio * 100) + '%';
  }
}

function stopChallenge() {
  stopChallengeTimer();
}

async function finishChallenge() {
  stopChallenge();
  await renderChallengeAnalysis();
  showPage('challengeAnalysisPage');
}

async function renderChallengeAnalysis() {
  const content = document.getElementById('challengeAnalysisContent');
  content.innerHTML = '';

  const total = challengeQuestions.length;
  let correct = 0;
  challengeQuestions.forEach(function (q, idx) {
    if (challengeAnswers[idx] === q.correct) correct++;
  });
  const pct = total ? Math.round((correct / total) * 100) : 0;

  const summary = document.createElement('p');
  summary.className = 'score';
  summary.textContent = t('score.rate') + correct + ' / ' + total + '（' + pct + '%）';
  content.appendChild(summary);

  // 挑戰測試積分（每日第一次測試先計分；非同步顯示，唔阻塞分析渲染）
  // 訪客模式不計分、不儲存資料，故不顯示積分
  if (!isGuestMode) {
    const pointsLine = document.createElement('p');
    pointsLine.className = 'score points-award';
    pointsLine.textContent = t('challenge.pointsCalc');
    content.appendChild(pointsLine);

    awardChallengeTest(correct, total).then(function (earned) {
      if (earned > 0) {
        pointsLine.textContent = t('challenge.pointsEarned', { n: earned });
      } else {
        pointsLine.textContent = t('challenge.pointsNone');
      }
    });
  }

  const saves = [];

  challengeQuestions.forEach(function (q, idx) {
    const user = challengeAnswers[idx];

    const block = document.createElement('div');
    block.className = 'review-item';

    const qEl = document.createElement('p');
    qEl.className = 'review-q';
    qEl.textContent = t('review.q', { n: idx + 1 }) + q.q;
    block.appendChild(qEl);

    const correctLine = document.createElement('p');
    correctLine.textContent = t('review.correct') + letter(q.correct) + '. ' + q.options[q.correct];
    block.appendChild(correctLine);

    const userLine = document.createElement('p');
    if (user === null) {
      userLine.textContent = t('review.your') + t('review.unanswered');
    } else {
      userLine.textContent = t('review.your') + letter(user) + '. ' + q.options[user] +
        (user === q.correct ? t('review.markCorrect') : t('review.markWrong'));
    }
    block.appendChild(userLine);

    if (user !== null && user !== q.correct) {
      saves.push(saveWrongQuestion(q, user));
      const reason = reasonOf(q, user);
      if (reason) {
        const reasonLine = document.createElement('p');
        reasonLine.className = 'review-reason';
        reasonLine.textContent = t('review.reason') + reason;
        block.appendChild(reasonLine);
      }
    }

    content.appendChild(block);
  });

  // 等候所有錯題儲存完成（不影響已顯示嘅分析內容）
  await Promise.all(saves);
}

// ---------- 錯題重溫（Supabase 資料表 + 記憶體快取） ----------
// 錯題以「每用戶」儲存喺 Supabase 嘅 wrong_questions 表（RLS 保護）。
// 為咗保持介面流暢，載入後會放入記憶體快取（wrongCache），
// 只有首次載入 / 清除時先會打去伺服器。
let wrongCache = [];          // 錯題快取：[{ q, wrongIndex }]
let wrongCacheLoaded = false; // 是否已由 Supabase 載入

function clearWrongCache() {
  wrongCache = [];
  wrongCacheLoaded = false;
}

async function loadWrongQuestions() {
  const user = getCurrentUser();
  if (!user || !sb || !supabaseReady) return [];
  if (wrongCacheLoaded) return wrongCache;
  try {
    const { data, error } = await sb
      .from('wrong_questions')
      .select('*')
      .eq('user_id', user.id);
    if (error) return [];
    wrongCache = (data || []).map(function (row) {
      return { q: row.question_json, wrongIndex: row.wrong_index };
    });
    wrongCacheLoaded = true;
    return wrongCache;
  } catch (e) {
    // 讀取失敗時回傳空清單
    return [];
  }
}

// 以 delete-then-insert 方式整份取代該用戶嘅錯題（最簡單而正確）
async function saveWrongQuestionsList(list) {
  const user = getCurrentUser();
  if (!user || !sb || !supabaseReady) return;
  try {
    const { error: delErr } = await sb
      .from('wrong_questions')
      .delete()
      .eq('user_id', user.id);
    if (delErr) return;
    if (!list.length) return;
    const rows = list.map(function (r) {
      return { user_id: user.id, question_json: r.q, wrong_index: r.wrongIndex };
    });
    const { error: insErr } = await sb.from('wrong_questions').insert(rows);
    if (insErr) return;
  } catch (e) {
    // 儲存失敗時略過
  }
}

async function saveWrongQuestion(q, wrongIndex) {
  const user = getCurrentUser();
  if (!user || !sb || !supabaseReady) return;
  await loadWrongQuestions();
  const exists = wrongCache.some(function (r) { return r.q && r.q.q === q.q; });
  if (exists) return; // 去重：相同題目文字不重複儲存
  wrongCache.push({ q: q, wrongIndex: wrongIndex });
  await saveWrongQuestionsList(wrongCache);
}

async function removeWrongQuestion(recordIndex) {
  const user = getCurrentUser();
  if (!user || !sb || !supabaseReady) return;
  await loadWrongQuestions();
  if (recordIndex < 0 || recordIndex >= wrongCache.length) return;
  wrongCache.splice(recordIndex, 1);
  await saveWrongQuestionsList(wrongCache);
}

async function clearWrongQuestions() {
  clearWrongCache();
  const user = getCurrentUser();
  if (!user || !sb || !supabaseReady) return;
  try {
    await sb.from('wrong_questions').delete().eq('user_id', user.id);
  } catch (e) {
    // 清除失敗時略過
  }
}

async function goToWrongPage() {
  if (!requireAuth()) return;
  if (isGuestMode) { // 訪客模式：保留卡片，僅顯示登入提示
    showPage('homePage');
    showHomeNotice(t('guest.loginHint'));
    return;
  }
  stopChallenge();
  await renderWrongList();
  showPage('wrongPage');
}

async function renderWrongList() {
  const container = document.getElementById('wrongList');
  const noticeEl = document.getElementById('wrongNotice');
  if (!container) return;
  if (noticeEl) noticeEl.textContent = '';
  container.innerHTML = '';

  const list = await loadWrongQuestions();
  if (!list.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('wrong.empty');
    container.appendChild(p);
    return;
  }

  list.forEach(function (record, i) {
    const q = record.q;
    if (!q) return;

    const item = document.createElement('div');
    item.className = 'review-item';

    const qEl = document.createElement('p');
    qEl.className = 'review-q';
    qEl.textContent = topicName(q.topicNo) + '　' + q.q;
    item.appendChild(qEl);

    const correctLine = document.createElement('p');
    correctLine.textContent = t('review.correct') + letter(q.correct) + '. ' + q.options[q.correct];
    item.appendChild(correctLine);

    if (typeof record.wrongIndex === 'number' &&
        record.wrongIndex >= 0 &&
        record.wrongIndex !== q.correct &&
        q.options[record.wrongIndex]) {
      const userLine = document.createElement('p');
      userLine.textContent = t('wrong.yourChoice') + letter(record.wrongIndex) + '. ' + q.options[record.wrongIndex];
      item.appendChild(userLine);

      const reason = reasonOf(q, record.wrongIndex);
      if (reason && reason !== t('feedback.correct')) {
        const reasonLine = document.createElement('p');
        reasonLine.className = 'review-reason';
        reasonLine.textContent = t('review.reason') + reason;
        item.appendChild(reasonLine);
      }
    }

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-neutral';
    removeBtn.textContent = t('wrong.remove');
    removeBtn.onclick = async function () {
      await removeWrongQuestion(i);
      renderWrongList();
    };
    item.appendChild(removeBtn);

    container.appendChild(item);
  });
}

async function clearWrongList() {
  await clearWrongQuestions();
  await renderWrongList();
  const noticeEl = document.getElementById('wrongNotice');
  if (noticeEl) noticeEl.textContent = t('wrong.cleared');
}

async function startWrongQuiz() {
  const noticeEl = document.getElementById('wrongNotice');
  if (noticeEl) noticeEl.textContent = '';

  const list = await loadWrongQuestions();
  const qs = list.map(function (r) { return r.q; }).filter(Boolean);
  if (!qs.length) {
    if (noticeEl) noticeEl.textContent = t('wrong.emptyQuiz');
    return;
  }

  practiceTopicNo = null;
  practiceBookId = null;
  practiceQuestions = qs;
  practiceIndex = 0;
  practiceCorrectCount = 0;
  wrongQuizActive = true;

  showPage('practiceQuizPage');
  renderPracticeQuestion();
}

// ---------- 長題目（Long Questions） ----------
// v0.6.0 起：按課題（每課題 15 條）或按課本（每冊 5 條跨課題綜合題）瀏覽長題目，
// 只提供問題與參考答案（不作批改），答案可逐題展開／收起。
let longQListMode = 'topic'; // 'topic' 按課題 / 'book' 按課本

function goToLongQPage() {
  if (!requireAuth()) return;
  stopChallenge();
  renderLongQList();
  showPage('longQPage');
}

function goToLongQList() {
  const listEl = document.getElementById('longQTopicList');
  const bookListEl = document.getElementById('longQBookList');
  const detailEl = document.getElementById('longQDetail');
  const contentEl = document.getElementById('longQDetailContent');
  if (listEl) listEl.classList.remove('hidden');
  if (bookListEl) bookListEl.classList.remove('hidden');
  if (detailEl) detailEl.classList.add('hidden');
  // 清空已渲染的長題目內容，確保返回列表／主頁時不會殘留任何長題目文字
  if (contentEl) contentEl.innerHTML = '';
  renderLongQList();
}

function renderLongQList() {
  const topicListEl = document.getElementById('longQTopicList');
  const bookListEl = document.getElementById('longQBookList');
  const detailEl = document.getElementById('longQDetail');
  // 切換「按課題／按課本」時，先關閉已開啟的章節／課本詳情，避免殘留在列表下方
  if (detailEl) detailEl.classList.add('hidden');
  if (topicListEl) topicListEl.classList.toggle('hidden', longQListMode !== 'topic');
  if (bookListEl) bookListEl.classList.toggle('hidden', longQListMode !== 'book');
  syncLongQSwitch();
  if (longQListMode === 'book') {
    renderLongQBookList();
  } else {
    renderLongQTopicList();
  }
}

function setLongQListMode(mode) {
  longQListMode = (mode === 'book') ? 'book' : 'topic';
  renderLongQList();
}

function syncLongQSwitch() {
  const btns = document.querySelectorAll('#longQSwitch .practice-switch-btn');
  btns.forEach(function (b) {
    if (b.getAttribute('data-mode') === longQListMode) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
}

function getLongQByTopic(no) {
  return LQ_BY_TOPIC.find(function (c) { return c && c.topicNo === no; }) || null;
}

function renderLongQTopicList() {
  const listEl = document.getElementById('longQTopicList');
  const noticeEl = document.getElementById('longQNotice');
  if (!listEl) return;
  listEl.innerHTML = '';
  if (noticeEl) noticeEl.textContent = '';

  if (!LQ_BY_TOPIC.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('longq.noChapters');
    listEl.appendChild(p);
    return;
  }

  LQ_BY_TOPIC.forEach(function (ch) {
    const row = document.createElement('div');
    row.className = 'topic-row';

    const no = document.createElement('span');
    no.className = 'topic-no';
    no.textContent = pad(ch.topicNo);

    const name = document.createElement('span');
    name.className = 'topic-name';
    name.textContent = ch.name + '　' + t('longq.count', { n: ch.questions ? ch.questions.length : 0 });

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = t('btn.view');
    btn.onclick = function () { openLongQChapter(ch.topicNo); };

    row.appendChild(no);
    row.appendChild(name);
    row.appendChild(btn);
    listEl.appendChild(row);
  });
}

function renderLongQBookList() {
  const listEl = document.getElementById('longQBookList');
  const noticeEl = document.getElementById('longQNotice');
  if (!listEl) return;
  listEl.innerHTML = '';
  if (noticeEl) noticeEl.textContent = '';

  if (!LQ_BY_BOOK.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('longq.noBooks');
    listEl.appendChild(p);
    return;
  }

  LQ_BY_BOOK.forEach(function (b) {
    const row = document.createElement('div');
    row.className = 'topic-row';

    const no = document.createElement('span');
    no.className = 'topic-no';
    no.textContent = b.bookId;

    const name = document.createElement('span');
    name.className = 'topic-name';
    name.textContent = b.name + '　' + b.range + '　' + t('longq.count', { n: b.questions ? b.questions.length : 0 });

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = t('btn.view');
    btn.onclick = function () { openLongQBook(b.bookId); };

    row.appendChild(no);
    row.appendChild(name);
    row.appendChild(btn);
    listEl.appendChild(row);
  });
}

function openLongQChapter(no) {
  const listEl = document.getElementById('longQTopicList');
  const bookListEl = document.getElementById('longQBookList');
  const detailEl = document.getElementById('longQDetail');
  const content = document.getElementById('longQDetailContent');
  const ch = getLongQByTopic(no);
  if (!ch) return;
  if (listEl) listEl.classList.add('hidden');
  if (bookListEl) bookListEl.classList.add('hidden');
  if (detailEl) detailEl.classList.remove('hidden');
  if (!content) return;
  content.innerHTML = '';

  const title = document.createElement('h3');
  title.className = 'page-title';
  title.textContent = t('longq.chapterTitle', { no: pad(ch.topicNo), name: ch.name }) +
    '　' + t('longq.count', { n: ch.questions ? ch.questions.length : 0 });
  content.appendChild(title);

  (ch.questions || []).forEach(function (lq, i) {
    content.appendChild(buildLongQBlock(lq, i));
  });
}

function openLongQBook(bookId) {
  const listEl = document.getElementById('longQTopicList');
  const bookListEl = document.getElementById('longQBookList');
  const detailEl = document.getElementById('longQDetail');
  const content = document.getElementById('longQDetailContent');
  const b = LQ_BY_BOOK.find(function (x) { return x && x.bookId === bookId; });
  if (!b) return;
  if (listEl) listEl.classList.add('hidden');
  if (bookListEl) bookListEl.classList.add('hidden');
  if (detailEl) detailEl.classList.remove('hidden');
  if (!content) return;
  content.innerHTML = '';

  const title = document.createElement('h3');
  title.className = 'page-title';
  title.textContent = t('longq.bookTitle', { id: b.bookId, name: b.name }) +
    '　' + b.range + '　' + t('longq.count', { n: b.questions ? b.questions.length : 0 });
  content.appendChild(title);

  // 跨課題標籤提示
  const tag = document.createElement('p');
  tag.className = 'meta';
  tag.textContent = t('longq.bookTag');
  content.appendChild(tag);

  (b.questions || []).forEach(function (lq, i) {
    content.appendChild(buildLongQBlock(lq, i));
  });
}

function buildLongQBlock(lq, i) {
  const block = document.createElement('div');
  block.className = 'longq-section';

  const q = document.createElement('p');
  q.className = 'longq-q';
  q.textContent = t('longq.qTitle', { n: i + 1 }) + (lq.q || '');
  block.appendChild(q);

  if (lq.marks) {
    const marks = document.createElement('p');
    marks.className = 'longq-marks';
    marks.textContent = lq.marks;
    block.appendChild(marks);
  }

  const btn = document.createElement('button');
  btn.className = 'btn btn-neutral';
  btn.textContent = t('longq.showAnswer');
  btn.onclick = function () {
    const existing = block.querySelector('.longq-answer');
    if (existing) {
      existing.remove();
      btn.textContent = t('longq.showAnswer');
    } else {
      const ans = document.createElement('div');
      ans.className = 'longq-answer';
      ans.textContent = lq.answer || '';
      block.appendChild(ans);
      btn.textContent = t('longq.hideAnswer');
    }
  };
  block.appendChild(btn);

  // AI 批改（DeepSeek）區塊
  block.appendChild(buildDeepSeekBlock(lq, i));

  return block;
}

// ---------- 長題目 AI 批改（DeepSeek） ----------
// 用戶可喺設定頁填入 DeepSeek API Key（只儲存於本機瀏覽器 localStorage：bioAppDeepSeekKey），
// 然後喺長題目頁輸入自己嘅作答，交由 DeepSeek 按「題目＋參考答案＋分數」批改評分並畀建議。
function getDeepSeekKey() {
  try {
    return localStorage.getItem('bioAppDeepSeekKey') || '';
  } catch (e) {
    return '';
  }
}

function saveDeepSeekKey() {
  const inputEl = document.getElementById('settingsDeepSeekKeyInput');
  const noticeEl = document.getElementById('settingsDeepSeekNotice');
  if (!inputEl || !noticeEl) return;
  const key = inputEl.value.trim();
  try {
    if (key) {
      localStorage.setItem('bioAppDeepSeekKey', key);
    } else {
      localStorage.removeItem('bioAppDeepSeekKey');
    }
  } catch (e) {
    showAuthNotice(noticeEl, t('deepseek.saveErr'), 'error');
    return;
  }
  showAuthNotice(noticeEl, t('deepseek.saved'), 'success');
  const statusEl = document.getElementById('settingsDeepSeekStatus');
  if (statusEl) statusEl.textContent = key ? t('deepseek.statusSet') : t('deepseek.statusEmpty');
}

// 喺每題長題目下方建立 AI 批改 UI（作答輸入框 + 提交批改按鈕 + 結果顯示區）
function buildDeepSeekBlock(lq, i) {
  const wrap = document.createElement('div');
  wrap.className = 'deepseek-block';

  const title = document.createElement('p');
  title.className = 'deepseek-title';
  title.textContent = t('deepseek.title');
  wrap.appendChild(title);

  const textarea = document.createElement('textarea');
  textarea.className = 'deepseek-input';
  textarea.rows = 5;
  textarea.placeholder = t('deepseek.answerPh');
  wrap.appendChild(textarea);

  const feedback = document.createElement('p');
  feedback.className = 'feedback';
  wrap.appendChild(feedback);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-primary';
  btn.textContent = t('deepseek.checkBtn');
  btn.onclick = function () {
    correctLongAnswerWithDeepSeek(lq, textarea.value, feedback, btn);
  };
  wrap.appendChild(btn);

  return wrap;
}

// 呼叫 DeepSeek API（OpenAI 相容介面）批改長題目作答
async function correctLongAnswerWithDeepSeek(lq, userAnswer, feedbackEl, btn) {
  const key = getDeepSeekKey();
  if (!key) {
    feedbackEl.className = 'feedback incorrect';
    feedbackEl.textContent = t('deepseek.needKey');
    return;
  }
  if (!userAnswer.trim()) {
    feedbackEl.className = 'feedback incorrect';
    feedbackEl.textContent = t('deepseek.needAnswer');
    return;
  }

  btn.disabled = true;
  btn.textContent = t('deepseek.checking');
  feedbackEl.className = 'feedback';
  feedbackEl.textContent = t('deepseek.checking');

  const isEn = getAppLanguage() === 'en';
  const system = isEn
    ? 'You are a strict and professional HKDSE Biology examiner. Grade the student\'s long-answer response against the model answer and the allocated marks. Provide: (1) a score out of the allocated marks; (2) point-by-point feedback on what was correct, missed or wrong; and (3) specific, constructive suggestions for improvement.'
    : '你係一位嚴謹而專業的香港中學文憑試（HKDSE）生物科評卷員。請根據參考答案和題目分數，為學生的長題目作答評分。請提供：(1) 分數（以題目分數為滿分）；(2) 逐點評語，指出答對、遺漏或錯誤之處；(3) 具體而有建設性的改善建議。';

  const prompt = isEn
    ? 'Question:\n' + (lq.q || '') +
      '\n\nMarks: ' + (lq.marks || '') +
      '\n\nModel answer:\n' + (lq.answer || '') +
      '\n\nStudent\'s answer:\n' + userAnswer +
      '\n\nPlease grade the student\'s answer and give detailed feedback.'
    : '題目：\n' + (lq.q || '') +
      '\n\n分數：' + (lq.marks || '') +
      '\n\n參考答案：\n' + (lq.answer || '') +
      '\n\n學生的作答：\n' + userAnswer +
      '\n\n請為學生的作答評分並給予詳細評語。';

  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: prompt }
        ],
        stream: false,
        temperature: 0.3,
        max_tokens: 1200
      })
    });

    if (!res.ok) {
      let detail = '';
      try {
        const errJson = await res.json();
        detail = (errJson && errJson.error && errJson.error.message) ? errJson.error.message : '';
      } catch (e) { /* 忽略解析錯誤 */ }
      feedbackEl.className = 'feedback incorrect';
      feedbackEl.textContent = t('deepseek.error') + (detail ? ' ' + detail : '');
      return;
    }

    const data = await res.json();
    const content = (data && data.choices && data.choices[0] && data.choices[0].message)
      ? data.choices[0].message.content
      : '';

    if (!content) {
      feedbackEl.className = 'feedback incorrect';
      feedbackEl.textContent = t('deepseek.noResult');
      return;
    }

    feedbackEl.className = 'feedback correct';
    feedbackEl.textContent = content;
  } catch (e) {
    feedbackEl.className = 'feedback incorrect';
    feedbackEl.textContent = t('deepseek.netError');
  } finally {
    btn.disabled = false;
    btn.textContent = t('deepseek.checkBtn');
  }
}

// ---------- DSE 試卷（5 套；每套 = Paper 1 + Paper 2，中英雙語） ----------
// 內容來自 dsePapers.js（DSE_PAPER_SETS）。每份試卷均含中英文（zh-HK / en-UK）字串，
// 由 pickL() 按目前語言選用。
// Paper 1（必修：第 1–25 章）：甲部 MC ＋ 乙部結構式，限時 150 分鐘；
// Paper 2（選修：第 32–37 章）：全部結構式（無 MC），限時 60 分鐘。
// 批改規則：
//   - 選擇題（MC）：一律即時自動批改，無需 API Key。
//   - 結構式題目：需 DeepSeek API Key 先可以由 AI 批改；未設 Key 時只可作答、唔會批改。
let dseSet = null;            // 目前試卷套裝
let dsePaper = null;          // 目前試卷（set.papers[x]）
let dseSection = null;        // 目前分卷（section）
let dseMcAnswers = [];        // 目前 MC 分卷嘅作答（索引陣列）
let dseTimerSeconds = 0;      // 剩餘秒數
let dseTimerInterval = null;  // 計時器

function getDseSets() {
  return (typeof DSE_PAPER_SETS !== 'undefined') ? DSE_PAPER_SETS : [];
}

// 中英選用：pickL({zh, en}) 按目前語言回傳；若是普通字串則原樣回傳
function pickL(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return getAppLanguage() === 'en' ? (obj.en || obj.zh || '') : (obj.zh || obj.en || '');
}

// 前往 DSE 試卷頁（顯示套裝列表）
function goToDsePage() {
  if (!requireAuth()) return;
  stopChallenge();
  stopDseTimer();
  renderDseSetList();
  showPage('dsePage');
}

// 渲染套裝列表（每套顯示 Paper 1 / Paper 2 兩個開始按鈕）
function renderDseSetList() {
  const listEl = document.getElementById('dsePaperList');
  const bodyEl = document.getElementById('dsePaperBody');
  if (!listEl) return;
  stopDseTimer();
  listEl.innerHTML = '';
  if (bodyEl) bodyEl.classList.add('hidden');
  listEl.classList.remove('hidden');

  const sets = getDseSets();
  if (!sets.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('dse.noPapers');
    listEl.appendChild(p);
    return;
  }

  sets.forEach(function (set, si) {
    const row = document.createElement('div');
    row.className = 'topic-row';

    const no = document.createElement('span');
    no.className = 'topic-no';
    no.textContent = String(si + 1);

    const name = document.createElement('span');
    name.className = 'topic-name';
    name.textContent = pickL(set.label);

    const p1 = set.papers[0];
    const p2 = set.papers[1];

    const actions = document.createElement('span');
    actions.className = 'dse-set-actions';

    if (p1) {
      const btn1 = document.createElement('button');
      btn1.type = 'button';
      btn1.className = 'btn btn-primary';
      btn1.textContent = t('dse.paper1') + ' · ' + pickL(p1.subject) + ' · ' + pickL(p1.timeLabel);
      btn1.onclick = function () { openDsePaper(set.id, 0); };
      actions.appendChild(btn1);
    }
    if (p2) {
      const btn2 = document.createElement('button');
      btn2.type = 'button';
      btn2.className = 'btn btn-neutral';
      btn2.textContent = t('dse.paper2') + ' · ' + pickL(p2.subject) + ' · ' + pickL(p2.timeLabel);
      btn2.onclick = function () { openDsePaper(set.id, 1); };
      actions.appendChild(btn2);
    }

    row.appendChild(no);
    row.appendChild(name);
    row.appendChild(actions);
    listEl.appendChild(row);
  });
}

// 開啟試卷（paperIndex：0 = Paper 1，1 = Paper 2）並啟動計時器
function openDsePaper(setId, paperIndex) {
  const set = getDseSets().find(function (s) { return s.id === setId; });
  if (!set) return;
  const paper = set.papers[paperIndex];
  if (!paper) return;
  dseSet = set;
  dsePaper = paper;
  dseSection = paper.sections[0] || null;

  const listEl = document.getElementById('dsePaperList');
  const bodyEl = document.getElementById('dsePaperBody');
  if (listEl) listEl.classList.add('hidden');
  if (bodyEl) bodyEl.classList.remove('hidden');

  startDseTimer(paper.timeMin);
  renderDseSection();
}

// 切換分卷（Section）
function setDseSection(sectionId) {
  if (!dsePaper) return;
  const sec = dsePaper.sections.find(function (s) { return s.id === sectionId; });
  if (!sec) return;
  dseSection = sec;
  renderDseSection();
}

// ---------- DSE 計時器（Paper 1：150 分鐘；Paper 2：60 分鐘） ----------
function startDseTimer(minutes) {
  stopDseTimer();
  dseTimerSeconds = Math.max(1, Math.round(minutes * 60));
  updateDseTimer();
  dseTimerInterval = setInterval(function () {
    dseTimerSeconds--;
    if (dseTimerSeconds <= 0) {
      dseTimerSeconds = 0;
      updateDseTimer();
      stopDseTimer();
      const noticeEl = document.getElementById('dsePaperNotice');
      if (noticeEl) noticeEl.textContent = t('dse.timeUp');
      window.alert(t('dse.timeUp'));
    } else {
      updateDseTimer();
    }
  }, 1000);
}

function stopDseTimer() {
  if (dseTimerInterval !== null) {
    clearInterval(dseTimerInterval);
    dseTimerInterval = null;
  }
}

function updateDseTimer() {
  const textEl = document.getElementById('dseTimerText');
  const barEl = document.getElementById('dseTimerBar');
  const wrapEl = document.getElementById('dseTimerWrap');
  if (wrapEl) wrapEl.classList.remove('hidden');
  const total = dsePaper ? Math.max(1, dsePaper.timeMin * 60) : 1;
  const mins = Math.floor(dseTimerSeconds / 60);
  const secs = dseTimerSeconds % 60;
  if (textEl) textEl.textContent = t('timer.left') + pad(mins) + ':' + pad(secs);
  if (barEl) {
    const ratio = total ? (dseTimerSeconds / total) : 0;
    barEl.style.width = (ratio * 100) + '%';
  }
}

// 渲染目前分卷：分卷切換 + 題目
function renderDseSection() {
  const container = document.getElementById('dseQuestionContainer');
  const nav = document.getElementById('dseSectionNav');
  const titleEl = document.getElementById('dseSectionTitle');
  const noticeEl = document.getElementById('dsePaperNotice');
  if (!container) return;
  container.innerHTML = '';
  if (noticeEl) noticeEl.textContent = (dsePaper && dsePaper.id === 'p2') ? t('dse.p2Rule') : '';

  if (nav) {
    nav.innerHTML = '';
    dsePaper.sections.forEach(function (sec) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'practice-switch-btn' + (sec.id === dseSection.id ? ' active' : '');
      btn.textContent = pickL(sec.name) + '（' + sec.totalMarks + '）';
      btn.onclick = function () { setDseSection(sec.id); };
      nav.appendChild(btn);
    });
  }
  if (titleEl) {
    const paperName = dsePaper.id === 'p2' ? t('dse.paper2') : t('dse.paper1');
    titleEl.textContent = pickL(dseSet.label) + ' · ' + paperName + ' — ' + pickL(dseSection.name);
  }

  if (dseSection.type === 'mc') {
    renderDseMc(container);
  } else {
    renderDseStructured(container);
  }
}

// 渲染 MC 分卷（自動批改，無需 API Key）
function renderDseMc(container) {
  dseMcAnswers = new Array(dseSection.questions.length).fill(null);

  const intro = document.createElement('p');
  intro.className = 'meta';
  intro.textContent = t('dse.mcHint');
  container.appendChild(intro);

  dseSection.questions.forEach(function (q, qi) {
    const item = document.createElement('div');
    item.className = 'dse-mc-item';

    const qText = document.createElement('p');
    qText.className = 'longq-q';
    qText.textContent = 'Q' + q.no + '. ' + pickL(q.q);
    item.appendChild(qText);

    const opts = document.createElement('div');
    opts.className = 'options';
    (pickL(q.options) || []).forEach(function (opt, oi) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.textContent = letter(oi) + '. ' + opt;
      btn.onclick = function () {
        opts.querySelectorAll('button').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        dseMcAnswers[qi] = oi;
      };
      opts.appendChild(btn);
    });
    item.appendChild(opts);
    container.appendChild(item);
  });

  const checkBtn = document.createElement('button');
  checkBtn.type = 'button';
  checkBtn.className = 'btn btn-primary';
  checkBtn.textContent = t('dse.checkMc');
  checkBtn.onclick = function () { checkDseMcAnswers(); };
  container.appendChild(checkBtn);

  const result = document.createElement('div');
  result.id = 'dseMcResult';
  result.className = 'analysis-card hidden';
  container.appendChild(result);
}

// 核對 MC 答案（本地自動批改，無需 API Key）
function checkDseMcAnswers() {
  const result = document.getElementById('dseMcResult');
  if (!result) return;
  const total = dseSection.questions.length;
  let correct = 0;
  dseSection.questions.forEach(function (q, qi) {
    if (dseMcAnswers[qi] === q.correct) correct++;
  });
  const pct = total ? Math.round((correct / total) * 100) : 0;

  result.innerHTML = '';
  const sum = document.createElement('p');
  sum.className = 'score';
  sum.textContent = t('score.rate') + correct + ' / ' + total + '（' + pct + '%）';
  result.appendChild(sum);

  dseSection.questions.forEach(function (q, qi) {
    const row = document.createElement('div');
    row.className = 'review-item';
    const opts = pickL(q.options) || [];

    const qEl = document.createElement('p');
    qEl.className = 'review-q';
    qEl.textContent = 'Q' + q.no + '. ' + pickL(q.q);
    row.appendChild(qEl);

    const correctLine = document.createElement('p');
    correctLine.textContent = t('review.correct') + letter(q.correct) + '. ' + opts[q.correct];
    row.appendChild(correctLine);

    const userLine = document.createElement('p');
    if (dseMcAnswers[qi] === null) {
      userLine.textContent = t('review.your') + t('review.unanswered');
    } else {
      const right = dseMcAnswers[qi] === q.correct;
      userLine.textContent = t('review.your') + letter(dseMcAnswers[qi]) + '. ' +
        opts[dseMcAnswers[qi]] + (right ? t('review.markCorrect') : t('review.markWrong'));
    }
    row.appendChild(userLine);

    result.appendChild(row);
  });
  result.classList.remove('hidden');
}

// 渲染結構式題目分卷（作答＋按「提交批改」由 DeepSeek 批改）
function renderDseStructured(container) {
  const hasKey = !!getDeepSeekKey();

  const intro = document.createElement('p');
  intro.className = 'meta';
  intro.textContent = hasKey ? t('dse.aiActive') : t('dse.aiNeedsKey');
  container.appendChild(intro);

  dseSection.questions.forEach(function (q) {
    const block = document.createElement('div');
    block.className = 'longq-section';

    const qText = document.createElement('p');
    qText.className = 'longq-q';
    qText.textContent = 'Q' + q.no + '. ' + pickL(q.q);
    block.appendChild(qText);

    if (q.marks) {
      const marks = document.createElement('p');
      marks.className = 'longq-marks';
      marks.textContent = (q.type ? (t('dse.' + q.type) + ' · ') : '') + pickL(q.marks);
      block.appendChild(marks);
    }

    const textarea = document.createElement('textarea');
    textarea.className = 'deepseek-input';
    textarea.rows = 6;
    textarea.placeholder = t('dse.answerPh');
    block.appendChild(textarea);

    const feedback = document.createElement('p');
    feedback.className = 'feedback';
    block.appendChild(feedback);

    const gradeBtn = document.createElement('button');
    gradeBtn.type = 'button';
    gradeBtn.className = 'btn btn-primary';
    gradeBtn.textContent = t('deepseek.checkBtn');
    gradeBtn.onclick = function () {
      // 重用長題目嘅 DeepSeek 批改函式（傳入單語言化題目：q / marks / answer）
      const lq = {
        q: pickL(q.q),
        marks: pickL(q.marks),
        answer: pickL(q.answer)
      };
      correctLongAnswerWithDeepSeek(lq, textarea.value, feedback, gradeBtn);
    };
    block.appendChild(gradeBtn);

    container.appendChild(block);
  });
}

// ---------- 學習前沿科技 ----------
// v0.5.2 起：以「可摺疊列表」顯示（取代原本的卡片網格），25 項科技逐行列出，
// 點擊標題列展開／收起詳細內容，方便瀏覽與瀏覽大量項目。
function renderTechPage() {
  const container = document.getElementById('techContainer');
  if (!container) return;
  container.innerHTML = '';

  if (!FRONTIER.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('tech.empty');
    container.appendChild(p);
    return;
  }

  FRONTIER.forEach(function (tech, index) {
    container.appendChild(buildTechListItem(tech, index));
  });
}

function buildTechListItem(tech, index) {
  const item = document.createElement('div');
  item.className = 'tech-list-item';

  // 標題列（可點擊展開／收起）
  const header = document.createElement('button');
  header.type = 'button';
  header.className = 'tech-list-header';
  header.setAttribute('aria-expanded', 'false');

  const headerText = document.createElement('span');
  headerText.className = 'tech-list-header-text';

  const num = document.createElement('span');
  num.className = 'tech-list-num';
  num.textContent = String(index + 1);

  const titleWrap = document.createElement('span');
  titleWrap.className = 'tech-list-title-wrap';

  const title = document.createElement('span');
  title.className = 'tech-list-title';
  title.textContent = tech.title || '';

  const subtitle = document.createElement('span');
  subtitle.className = 'tech-subtitle';
  subtitle.textContent = tech.subtitle || '';

  titleWrap.appendChild(title);
  titleWrap.appendChild(subtitle);
  headerText.appendChild(num);
  headerText.appendChild(titleWrap);

  const arrow = document.createElement('span');
  arrow.className = 'tech-list-arrow';
  arrow.textContent = '▸';

  header.appendChild(headerText);
  header.appendChild(arrow);

  // 詳細內容（預設收起）
  const body = document.createElement('div');
  body.className = 'tech-list-body hidden';

  // DSE連結 + 相關課題列表
  const dse = document.createElement('div');
  dse.className = 'tech-dse';
  const dseLabel = document.createElement('span');
  dseLabel.className = 'badge';
  dseLabel.textContent = t('tech.dse');
  dse.appendChild(dseLabel);
  const relList = document.createElement('ul');
  relList.className = 'related-list';
  (tech.relatedTopics || []).forEach(function (rt) {
    const li = document.createElement('li');
    li.textContent = t('topic.label', { no: rt.no }) + '　' + rt.name;
    relList.appendChild(li);
  });
  dse.appendChild(relList);
  body.appendChild(dse);

  // 核心概念
  const conceptsTitle = document.createElement('h3');
  conceptsTitle.textContent = t('tech.core');
  body.appendChild(conceptsTitle);
  const concepts = document.createElement('ul');
  concepts.className = 'bullet-list';
  (tech.coreConcepts || []).forEach(function (c) {
    const li = document.createElement('li');
    li.textContent = c;
    concepts.appendChild(li);
  });
  body.appendChild(concepts);

  // 科技概念說明
  const conceptTitle = document.createElement('h3');
  conceptTitle.textContent = t('tech.concept');
  body.appendChild(conceptTitle);
  const concept = document.createElement('p');
  concept.className = 'tech-concept';
  concept.textContent = tech.concept || '';
  body.appendChild(concept);

  // 可靠來源（新分頁開啟）
  if (tech.sourceUrl) {
    const source = document.createElement('a');
    source.className = 'btn btn-source';
    source.href = tech.sourceUrl;
    source.target = '_blank';
    source.rel = 'noopener';
    source.textContent = t('tech.source');
    body.appendChild(source);
  }

  // 5 條相關互動 MC
  const mcqsTitle = document.createElement('h3');
  mcqsTitle.textContent = t('tech.mcqs');
  body.appendChild(mcqsTitle);
  const mcqs = tech.mcqs || [];
  if (!mcqs.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('tech.noMcq');
    body.appendChild(p);
  } else {
    mcqs.forEach(function (mcq, mi) {
      body.appendChild(buildTechMcq(mcq, mi));
    });
  }

  header.onclick = function () {
    const isHidden = body.classList.toggle('hidden');
    header.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
    arrow.textContent = isHidden ? '▸' : '▾';
    item.classList.toggle('expanded', !isHidden);
  };

  item.appendChild(header);
  item.appendChild(body);
  return item;
}

function buildTechMcq(mcq, mi) {
  const block = document.createElement('div');
  block.className = 'mcq';

  const qEl = document.createElement('p');
  qEl.className = 'mcq-q';
  qEl.textContent = t('review.q', { n: mi + 1 }) + mcq.q;
  block.appendChild(qEl);

  const opts = document.createElement('div');
  opts.className = 'options';
  const feedback = document.createElement('p');
  feedback.className = 'feedback';

  let answered = false;

  mcq.options.forEach(function (opt, oi) {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = letter(oi) + '. ' + opt;
    btn.onclick = function () {
      if (answered) return;
      answered = true;
      opts.querySelectorAll('button').forEach(function (b) { b.disabled = true; });

      if (oi === mcq.correct) {
        feedback.className = 'feedback correct';
        feedback.textContent = t('feedback.correct');
      } else {
        const reason = reasonOf(mcq, oi);
        feedback.className = 'feedback incorrect';
        let msg = t('feedback.incorrect', { ans: letter(mcq.correct) + '. ' + mcq.options[mcq.correct] });
        if (reason) msg += t('feedback.reason', { reason: reason });
        feedback.textContent = msg;
      }
    };
    opts.appendChild(btn);
  });

  block.appendChild(opts);
  block.appendChild(feedback);
  return block;
}

// ---------- 帳戶 / 登入系統（Supabase 後端） ----------
// 本程式改用 Supabase 作後端：
//   - 密碼由 Supabase 於伺服器端以 bcrypt 雜湊及驗證，絕不儲存或傳送明文密碼。
//   - 帳戶資料（profiles）與每用戶錯題（wrong_questions）均由 RLS 保護。
//   - 登入／註冊使用「真實電郵 + 密碼」；電郵由 Supabase 觸發器（handle_new_user）於伺服器端寫入 profiles.email（v0.6.7 起取代舊版 user_code）。
//   - 主題設定（bioAppTheme）維持儲存於 localStorage（全局設定，屬預期行為）。

let currentUser = null;          // 目前登入的 Supabase user 物件
let supabaseReady = false;       // Supabase SDK / 專案資料是否已就緒

// 建立 Supabase 客戶端（僅在 SDK 已載入且 supabaseConfig.js 已填上專案資料時）
let sb = null;
if (typeof supabase !== 'undefined' &&
    typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL &&
    typeof SUPABASE_ANON_KEY !== 'undefined' && SUPABASE_ANON_KEY) {
  try {
    sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    supabaseReady = true;
  } catch (e) {
    sb = null;
    supabaseReady = false;
  }
}

function getCurrentUser() {
  return currentUser;
}

function setCurrentUser(u) {
  currentUser = u || null;
  updateAuthHeader();
  renderLoginStreak(); // 同步主頁「簽到」按鈕／連續登入標籤顯示狀態
}

function clearCurrentUser() {
  currentUser = null;
  updateAuthHeader();
  renderLoginStreak(); // 同步主頁「簽到」按鈕／連續登入標籤顯示狀態
}

function showAuthNotice(el, message, type) {
  if (!el) return;
  if (type === 'error') el.className = 'auth-notice auth-error';
  else if (type === 'success') el.className = 'auth-notice auth-success';
  else el.className = 'auth-notice';
  el.textContent = message;
}

// 更新頁首的用戶名稱 / 積分 / 登出按鈕
function updateAuthHeader() {
  const userArea = document.getElementById('userArea');
  const nameEl = document.getElementById('currentUserName');
  const pointsEl = document.getElementById('currentUserPoints');
  const guestArea = document.getElementById('guestArea');
  if (!userArea || !nameEl) return;

  // 訪客模式：顯示訪客標籤，隱藏用戶區域
  if (isGuestMode) {
    cachedUserPoints = null;
    userArea.classList.add('hidden');
    nameEl.textContent = '—';
    if (pointsEl) pointsEl.textContent = '—';
    if (guestArea) guestArea.classList.remove('hidden');
    return;
  }
  if (guestArea) guestArea.classList.add('hidden');

  const user = getCurrentUser();
  if (!user) {
    cachedUserPoints = null;
    userArea.classList.add('hidden');
    nameEl.textContent = '—';
    if (pointsEl) pointsEl.textContent = '—';
    return;
  }
  const meta = user.user_metadata || {};
  userArea.classList.remove('hidden');
  nameEl.textContent = meta.username || '—';
  if (pointsEl) {
    pointsEl.textContent = (cachedUserPoints === null) ? '—' : ('★ ' + cachedUserPoints);
  }
  // 非同步刷新積分（唔阻塞頁首，失敗亦無妨）
  refreshUserPoints();
}

function showLoginPage() {
  stopChallenge();
  updateAuthHeader();
  // 重置登入頁（proceedToLogin 會喺呼叫後再填返電郵並顯示成功提示）
  const emailEl = document.getElementById('loginEmail');
  const passwordEl = document.getElementById('loginPassword');
  const loginNotice = document.getElementById('loginNotice');
  if (emailEl) emailEl.value = '';
  if (passwordEl) passwordEl.value = '';
  if (loginNotice) showAuthNotice(loginNotice, '', '');
  if (getCurrentUser()) {
    showPage('homePage');
    return;
  }
  // 若未設定 Supabase，顯示設定提示
  if (!supabaseReady && loginNotice) {
    showAuthNotice(loginNotice, t('auth.notConfigured'), 'error');
  }
  showPage('loginPage');
}

function showRegisterPage() {
  stopChallenge();
  updateAuthHeader();
  // 每次進入註冊頁都重置表單狀態（隱藏成功區、顯示表單、清空所有欄位）
  const formEl = document.getElementById('registerForm');
  const successEl = document.getElementById('registerSuccessArea');
  const noticeEl = document.getElementById('registerNotice');
  const emailEl = document.getElementById('registerEmail');
  const usernameEl = document.getElementById('registerUsername');
  const passwordEl = document.getElementById('registerPassword');
  const confirmEl = document.getElementById('registerConfirm');
  if (formEl) formEl.classList.remove('hidden');
  if (successEl) successEl.classList.add('hidden');
  if (emailEl) emailEl.value = '';
  if (usernameEl) usernameEl.value = '';
  if (passwordEl) passwordEl.value = '';
  if (confirmEl) confirmEl.value = '';
  if (noticeEl) showAuthNotice(noticeEl, '', '');
  showPage('registerPage');
}

// 登入門檻：未登入時所有頁面導覽一律導向登入頁
function requireAuth() {
  if (isGuestMode) return true; // 訪客模式：無需登入即可使用
  if (getCurrentUser()) return true;
  showLoginPage();
  return false;
}

// ---------- 訪客模式（Guest Mode） ----------
// 訪客模式：無需登入即可使用大部分功能；不儲存任何資料到資料庫。
// 「排行榜」與「錯題重溫」兩張卡片仍然保留顯示，訪客點擊時只會看到
// 「請登入使用此功能」提示，不會進入相關頁面。
function enterGuestMode() {
  stopChallenge();
  isGuestMode = true;
  currentUser = null;
  clearWrongCache();
  clearQuestCache();
  cachedUserPoints = null;
  updateAuthHeader();
  showPage('homePage');
}

function exitGuestMode() {
  stopChallenge();
  isGuestMode = false;
  currentUser = null;
  clearWrongCache();
  clearQuestCache();
  cachedUserPoints = null;
  updateAuthHeader();
  showPage('loginPage');
}

// 在主頁顯示提示訊息（數秒後自動消失），例如訪客點擊排行榜／錯題重溫時
function showHomeNotice(message) {
  const el = document.getElementById('homeNotice');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
  if (homeNoticeTimer !== null) clearTimeout(homeNoticeTimer);
  homeNoticeTimer = setTimeout(function () {
    el.classList.add('hidden');
    homeNoticeTimer = null;
  }, 6000);
}

async function handleLogin(event) {
  if (event) event.preventDefault();
  const emailEl = document.getElementById('loginEmail');
  const passwordEl = document.getElementById('loginPassword');
  const noticeEl = document.getElementById('loginNotice');
  const email = emailEl ? emailEl.value.trim() : '';
  const password = passwordEl ? passwordEl.value : '';
  if (noticeEl) showAuthNotice(noticeEl, '', '');

  if (!supabaseReady || !sb) {
    showAuthNotice(noticeEl, t('auth.notConfigured'), 'error');
    return;
  }
  if (!email || !password) {
    showAuthNotice(noticeEl, t('auth.needEmailPassword'), 'error');
    return;
  }

  const { data, error } = await sb.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error || !data.user) {
    let msg = t('auth.invalidCredentials');
    const m = (error && error.message ? error.message : '').toLowerCase();
    if (/confirm|not confirmed|email_not_confirmed|unverified|not verified/.test(m)) {
      msg = t('auth.confirmEmail');
    }
    showAuthNotice(noticeEl, msg, 'error');
    return;
  }

  setCurrentUser(data.user);
  await awardDailyLogin(); // 每日登入 +10（失敗亦唔阻塞登入）
  await updateLoginStreak(); // 更新並顯示連續登入天數
  await migrateLegacyWrongQuestionsIfAny();
  await loadQuestCompletions(); // 預先載入任務線完成記錄
  if (emailEl) emailEl.value = '';
  if (passwordEl) passwordEl.value = '';
  updateAuthHeader();
  showPage('homePage');
}

async function handleRegister(event) {
  if (event) event.preventDefault();
  const emailEl = document.getElementById('registerEmail');
  const usernameEl = document.getElementById('registerUsername');
  const passwordEl = document.getElementById('registerPassword');
  const confirmEl = document.getElementById('registerConfirm');
  const noticeEl = document.getElementById('registerNotice');
  const email = emailEl ? emailEl.value.trim() : '';
  const username = usernameEl ? usernameEl.value.trim() : '';
  const password = passwordEl ? passwordEl.value : '';
  const confirm = confirmEl ? confirmEl.value : '';
  if (noticeEl) showAuthNotice(noticeEl, '', '');

  if (!supabaseReady || !sb) {
    showAuthNotice(noticeEl, t('auth.notConfigured'), 'error');
    return;
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    showAuthNotice(noticeEl, t('auth.emailInvalid'), 'error');
    return;
  }
  if (username.length < 1 || username.length > 20) {
    showAuthNotice(noticeEl, t('auth.usernameLength'), 'error');
    return;
  }
  if (!/^[a-zA-Z0-9\u4E00-\u9FFF ]+$/.test(username)) {
    showAuthNotice(noticeEl, t('auth.usernameChars'), 'error');
    return;
  }
  if (password.length < 6) {
    showAuthNotice(noticeEl, t('auth.passwordShort'), 'error');
    return;
  }
  if (password !== confirm) {
    showAuthNotice(noticeEl, t('auth.passwordMismatch'), 'error');
    return;
  }

  // 檢查用戶名稱是否已被使用（不分大小寫）
  const { data: nameRows, error: nameErr } = await sb
    .from('profiles')
    .select('username')
    .ilike('username', username);
  if (nameErr) {
    showAuthNotice(noticeEl, t('auth.serverFail'), 'error');
    return;
  }
  if (nameRows && nameRows.length > 0) {
    showAuthNotice(noticeEl, t('auth.nameTaken'), 'error');
    return;
  }

  const { data, error } = await sb.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { username: username }
    }
  });

  if (error) {
    const m = (error.message || '').toLowerCase();
    let msg;
    if (/already registered|already been registered|already exists|user_already_exists|email.*(exist|registered)|registered.*email/.test(m)) {
      msg = '此電郵已被註冊。';
    } else if (/duplicate|conflict|unique/.test(m)) {
      msg = '資料重複或衝突，請重試。';
    } else if (/rate.?limit|too many|429/.test(m)) {
      msg = '嘗試次數過多，請稍後再試（' + (error.message || '') + '）。';
    } else {
      msg = t('auth.regFailed') + (error.message || t('auth.retry'));
    }
    showAuthNotice(noticeEl, msg, 'error');
    return;
  }

  const formEl = document.getElementById('registerForm');
  const successEl = document.getElementById('registerSuccessArea');
  if (formEl) formEl.classList.add('hidden');
  if (successEl) successEl.classList.remove('hidden');
  // 若關閉咗 email 驗證，signUp 會直接建立 session；此時視為已登入
  if (data.session && data.user) {
    setCurrentUser(data.user);
    await awardDailyLogin(); // 註冊後自動登入 → 每日登入 +10
  }
  updateAuthHeader();
}

// 註冊成功後前往登入（預填電郵 + 顯示成功提示）
function proceedToLogin() {
  const registerEmailEl = document.getElementById('registerEmail');
  const lastEmail = registerEmailEl ? registerEmailEl.value.trim() : '';
  showLoginPage();
  const emailEl = document.getElementById('loginEmail');
  if (emailEl) emailEl.value = lastEmail;
  const noticeEl = document.getElementById('loginNotice');
  if (noticeEl) showAuthNotice(noticeEl, t('auth.registerSuccess'), 'success');
}

async function logout() {
  if (isGuestMode) {
    exitGuestMode();
    return;
  }
  if (!getCurrentUser()) {
    showLoginPage();
    return;
  }
  if (!window.confirm(t('logout.confirm'))) return;
  stopChallenge();
  if (supabaseReady && sb) {
    try {
      await sb.auth.signOut();
    } catch (e) {
      // 登出失敗亦繼續本地清除
    }
  }
  clearWrongCache();
  clearQuestCache();
  clearCurrentUser();
  updateAuthHeader();
  showPage('loginPage');
}

// 首次登入後，遷移舊版 localStorage 錯題資料到 Supabase
// （主要：舊版全域 key 'bioAppWrongQuestions'；次要：每用戶 key 'bioAppWrongQuestions_<username>'）
async function migrateLegacyWrongQuestionsIfAny() {
  const user = getCurrentUser();
  if (!user || !sb || !supabaseReady) return;
  try {
    let legacyList = null;
    const raw = localStorage.getItem('bioAppWrongQuestions');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) legacyList = parsed;
    }
    if (!legacyList) {
      const username = (user.user_metadata && user.user_metadata.username) || '';
      if (username) {
        const raw2 = localStorage.getItem('bioAppWrongQuestions_' + username);
        if (raw2) {
          const parsed2 = JSON.parse(raw2);
          if (Array.isArray(parsed2) && parsed2.length) legacyList = parsed2;
        }
      }
    }
    if (!legacyList) return;

    const existing = await loadWrongQuestions();
    const existingQs = {};
    existing.forEach(function (r) { if (r.q && r.q.q) existingQs[r.q.q] = true; });
    const rows = legacyList
      .filter(function (r) { return r && r.q && r.q.q && !existingQs[r.q.q]; })
      .map(function (r) {
        return { user_id: user.id, question_json: r.q, wrong_index: r.wrongIndex };
      });
    if (rows.length) {
      const { error } = await sb.from('wrong_questions').insert(rows);
      if (error) return;
    }
    // 移除舊鍵，避免重複遷移
    localStorage.removeItem('bioAppWrongQuestions');
    const username = (user.user_metadata && user.user_metadata.username) || '';
    if (username) localStorage.removeItem('bioAppWrongQuestions_' + username);
    clearWrongCache(); // 重設快取，令下次載入包含新匯入資料
  } catch (e) {
    // 遷移失敗時略過（不影響登入）
  }
}

// 初始化登入狀態：檢查 Supabase session
async function initAuth() {
  if (!supabaseReady || !sb) {
    updateAuthHeader();
    showPage('loginPage');
    const noticeEl = document.getElementById('loginNotice');
    if (noticeEl) showAuthNotice(noticeEl, t('auth.notConfigured'), 'error');
    return;
  }
  try {
    const { data: sessionData } = await sb.auth.getSession();
    const session = sessionData && sessionData.session;
    if (session && session.user) {
      setCurrentUser(session.user);
      await loadWrongQuestions(); // 預先載入錯題快取
      await loadQuestCompletions(); // 預先載入任務線完成記錄
      await awardDailyLogin(); // 還原登入狀態 → 每日登入 +10
      await updateLoginStreak(); // 還原登入狀態 → 更新並顯示連續登入天數
      updateAuthHeader();
      showPage('homePage');
    } else {
      setCurrentUser(null);
      updateAuthHeader();
      showPage('loginPage');
    }
  } catch (e) {
    setCurrentUser(null);
    updateAuthHeader();
    showPage('loginPage');
  }
}

// ---------- 積分與排行榜（Supabase） ----------
// 積分規則：
//   - 每日登入 +10（每日一次，由 DB 端 RPC award_daily_login 保證）
//   - 每日第一次挑戰測試計分：每答對一題 +1（上限 36），全對額外 +4
//     （由 DB 端 RPC award_challenge_test 保證每日只計第一次）
//   - 排行榜頁面讀取 profiles.points 排序顯示
let cachedUserPoints = null; // 頁首積分快取（避免每次切頁都打 API）
let cachedLoginStreak = null; // 主頁連續登入天數快取

// 每日登入積分：呼叫 RPC award_daily_login，回傳實際獲得嘅積分
async function awardDailyLogin() {
  if (!supabaseReady || !sb || !getCurrentUser()) return 0;
  try {
    const { data, error } = await sb.rpc('award_daily_login');
    if (error) return 0;
    const awarded = typeof data === 'number' ? data : 0;
    if (awarded > 0) refreshUserPoints();
    return awarded;
  } catch (e) {
    // 失敗時靜默忽略，唔影響登入流程
    return 0;
  }
}

// 更新並取得連續登入天數：呼叫 RPC update_login_streak，回傳目前連續天數
// （失敗或未登入時回傳 0，並靜默略過）
async function updateLoginStreak() {
  if (!supabaseReady || !sb || !getCurrentUser()) {
    cachedLoginStreak = null;
    renderLoginStreak();
    return 0;
  }
  try {
    const { data, error } = await sb.rpc('update_login_streak');
    if (error) {
      cachedLoginStreak = null;
      renderLoginStreak();
      return 0;
    }
    cachedLoginStreak = typeof data === 'number' ? data : 0;
    renderLoginStreak();
    return cachedLoginStreak;
  } catch (e) {
    // 失敗時靜默忽略，唔影響登入流程
    cachedLoginStreak = null;
    renderLoginStreak();
    return 0;
  }
}

// 在主頁標題旁顯示「連續登入 N 天」；未登入／訪客模式／無數據時隱藏。
// 同時控制「簽到」按鈕：只有已登入（非訪客）先顯示。
function renderLoginStreak() {
  const el = document.getElementById('loginStreakLabel');
  const btn = document.getElementById('checkInBtn');
  const loggedIn = !isGuestMode && !!getCurrentUser();
  if (btn) btn.classList.toggle('hidden', !loggedIn);
  if (!el) return;
  if (!loggedIn || !cachedLoginStreak) {
    el.textContent = '';
    el.classList.add('hidden');
    return;
  }
  el.textContent = t('home.streak', { n: cachedLoginStreak });
  el.classList.remove('hidden');
}

// 簽到按鈕：唔使重新登入，即時更新連續登入天數（等同重新登入嘅效果）
async function checkInToday() {
  if (isGuestMode || !getCurrentUser()) {
    showHomeNotice(t('home.checkinNeedLogin'));
    return;
  }
  await awardDailyLogin(); // 每日登入 +10（等同重新登入，失敗亦唔阻塞）
  const streak = await updateLoginStreak(); // 更新並顯示連續登入天數
  if (streak > 0) {
    showHomeNotice(t('home.checkinSuccess', { n: streak }));
  } else {
    showHomeNotice(t('home.checkinFail'));
  }
}

// 每日第一次挑戰測試積分：呼叫 RPC award_challenge_test，回傳實際獲得嘅積分
async function awardChallengeTest(correct, total) {
  if (!supabaseReady || !sb || !getCurrentUser()) return 0;
  try {
    const { data, error } = await sb.rpc('award_challenge_test', {
      p_correct: correct,
      p_total: total
    });
    if (error) return 0;
    const earned = typeof data === 'number' ? data : 0;
    if (earned > 0) refreshUserPoints();
    return earned;
  } catch (e) {
    // 失敗時靜默忽略，唔影響分析頁渲染
    return 0;
  }
}

// 由 profiles 讀取目前用戶嘅積分並更新頁首顯示（非阻塞）
async function refreshUserPoints() {
  const user = getCurrentUser();
  const pointsEl = document.getElementById('currentUserPoints');
  if (!user || !sb || !supabaseReady) {
    cachedUserPoints = null;
    if (pointsEl) pointsEl.textContent = '—';
    return;
  }
  try {
    const { data, error } = await sb
      .from('profiles')
      .select('points')
      .eq('id', user.id)
      .maybeSingle();
    if (error || !data || typeof data.points !== 'number') return;
    cachedUserPoints = data.points;
    if (pointsEl) pointsEl.textContent = '★ ' + data.points;
  } catch (e) {
    // 讀取失敗時略過，頁首照常顯示
  }
}

// ---------- 個人分數頁（SCORE） ----------
let scoreRecordsCollapsed = false; // 分數紀錄列表摺疊狀態

// 前往個人分數頁（需要登入）
async function goToScorePage() {
  if (!requireAuth()) return;
  if (isGuestMode) { // 訪客模式：不儲存資料，無個人分數
    showPage('homePage');
    showHomeNotice(t('guest.loginHint'));
    return;
  }
  stopChallenge();
  await renderScorePage();
  showPage('scorePage');
}

// 渲染個人分數頁：總分 + 分數紀錄列表 + 獲取分數規則
async function renderScorePage() {
  const summaryEl = document.getElementById('scoreBig');
  await refreshUserPoints(); // 刷新總分
  if (summaryEl) {
    summaryEl.textContent = (cachedUserPoints === null || cachedUserPoints === undefined)
      ? '—'
      : ('★ ' + cachedUserPoints);
  }
  const records = await loadScoreRecords();
  renderScoreRecords(records);
  renderScoreRules();
  // 重設摺疊狀態為展開
  scoreRecordsCollapsed = false;
  const wrap = document.getElementById('scoreRecordsWrap');
  const icon = document.getElementById('scoreRecordsToggleIcon');
  if (wrap) wrap.classList.remove('collapsed');
  if (icon) icon.textContent = '▼';
}

// 摺疊／展開分數紀錄列表
function toggleScoreRecords() {
  scoreRecordsCollapsed = !scoreRecordsCollapsed;
  const wrap = document.getElementById('scoreRecordsWrap');
  const icon = document.getElementById('scoreRecordsToggleIcon');
  if (wrap) wrap.classList.toggle('collapsed', scoreRecordsCollapsed);
  if (icon) icon.textContent = scoreRecordsCollapsed ? '▶' : '▼';
}

// 讀取分數紀錄（points_log + quest_completions 合併，按日期由新至舊）
async function loadScoreRecords() {
  const user = getCurrentUser();
  if (!user || !sb || !supabaseReady) return [];
  const records = [];
  try {
    const { data, error } = await sb
      .from('points_log')
      .select('event_type, points, event_date')
      .eq('user_id', user.id)
      .order('event_date', { ascending: false });
    if (!error && data) {
      data.forEach(function (r) {
        records.push({
          date: r.event_date,
          label: t('score.event.' + r.event_type),
          points: r.points
        });
      });
    }
  } catch (e) { /* 忽略 */ }
  try {
    const { data, error } = await sb
      .from('quest_completions')
      .select('topic_no, points, completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });
    if (!error && data) {
      data.forEach(function (r) {
        const tpc = (typeof r.topic_no === 'number') ? topicName(r.topic_no) : '';
        records.push({
          date: (r.completed_at || '').slice(0, 10),
          label: t('score.event.quest') + (tpc ? '：' + tpc : ''),
          points: r.points
        });
      });
    }
  } catch (e) { /* 忽略 */ }
  // 排序：日期由新至舊；同一日按積分高至低
  records.sort(function (a, b) {
    if (a.date !== b.date) return String(a.date) < String(b.date) ? 1 : -1;
    return (b.points || 0) - (a.points || 0);
  });
  return records;
}

// 渲染分數紀錄列表（空時顯示提示）
function renderScoreRecords(records) {
  const container = document.getElementById('scoreRecordsList');
  if (!container) return;
  container.innerHTML = '';
  if (!records || !records.length) {
    const empty = document.createElement('div');
    empty.className = 'score-record';
    empty.innerHTML = '<span class="score-record-label">' + t('score.noRecords') + '</span>';
    container.appendChild(empty);
    return;
  }
  records.forEach(function (r) {
    const row = document.createElement('div');
    row.className = 'score-record';
    row.innerHTML =
      '<span class="score-record-label"></span>' +
      '<span class="score-record-date"></span>' +
      '<span class="score-record-points"></span>';
    row.querySelector('.score-record-label').textContent = r.label;
    row.querySelector('.score-record-date').textContent = r.date || '';
    row.querySelector('.score-record-points').textContent = '+' + r.points;
    container.appendChild(row);
  });
}

// 渲染「獲取分數規則」靜態列表
function renderScoreRules() {
  const container = document.getElementById('scoreRules');
  if (!container) return;
  const rules = [
    t('score.rule.dailyLogin'),
    t('score.rule.challenge'),
    t('score.rule.quest'),
    t('score.rule.streak')
  ];
  container.innerHTML = '';
  rules.forEach(function (text) {
    const li = document.createElement('li');
    li.textContent = text;
    container.appendChild(li);
  });
}

// 讀取排行榜：按積分由高至低排序，回傳 rows 或空陣列
async function loadRanking(limit) {
  if (!supabaseReady || !sb) return [];
  try {
    const { data, error } = await sb
      .from('profiles')
      .select('id, username, points')
      .order('points', { ascending: false })
      .limit(limit || 50);
    if (error) return [];
    return data || [];
  } catch (e) {
    return [];
  }
}

// 前往排行榜頁面（需要登入）
async function goToRankingPage() {
  if (!requireAuth()) return;
  if (isGuestMode) { // 訪客模式：保留卡片，僅顯示登入提示
    showPage('homePage');
    showHomeNotice(t('guest.loginHint'));
    return;
  }
  stopChallenge();
  await renderRanking();
  showPage('rankingPage');
}

// 渲染排行榜（每行：名次、用戶名稱、積分；標示自己）
async function renderRanking() {
  const container = document.getElementById('rankingList');
  const noticeEl = document.getElementById('rankingNotice');
  if (!container) return;
  if (noticeEl) noticeEl.textContent = '';
  container.innerHTML = '';

  const rows = await loadRanking(50);
  if (!rows.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('ranking.empty');
    container.appendChild(p);
    return;
  }

  const user = getCurrentUser();
  rows.forEach(function (row, i) {
    const item = document.createElement('div');
    item.className = 'ranking-row';
    const isMe = !!(user && row.id === user.id);
    if (isMe) item.classList.add('ranking-me');

    const rank = document.createElement('span');
    rank.className = 'ranking-rank' + (i < 3 ? ' top' : '');
    rank.textContent = String(i + 1);

    const name = document.createElement('span');
    name.className = 'ranking-name';
    name.textContent = (row.username || '—') + (isMe ? t('ranking.you') : '');

    const pts = document.createElement('span');
    pts.className = 'ranking-points';
    pts.textContent = (typeof row.points === 'number' ? row.points : 0) + t('ranking.points');

    item.appendChild(rank);
    item.appendChild(name);
    item.appendChild(pts);
    container.appendChild(item);
  });
}

// ---------- 任務線（Quest Line） ----------
// 每課題完成「課題練習」並全部答對（20/20）→ 名稱旁加 ✓，並獲得 +25 分；
// 每帳戶每課題只可獲得一次（由 Supabase 嘅 quest_completions 表 unique 約束保證）。
// 完成記錄載入後放入記憶體快取（questCache），與錯題快取做法一致。
let questCache = [];          // 已完成課題編號陣列：[topicNo, ...]
let questCacheLoaded = false; // 是否已由 Supabase 載入

function clearQuestCache() {
  questCache = [];
  questCacheLoaded = false;
}

// 由 Supabase 載入當前用戶嘅任務完成記錄
async function loadQuestCompletions() {
  const user = getCurrentUser();
  if (!user || !sb || !supabaseReady) return [];
  if (questCacheLoaded) return questCache;
  try {
    const { data, error } = await sb
      .from('quest_completions')
      .select('topic_no')
      .eq('user_id', user.id);
    if (error) return [];
    questCache = (data || []).map(function (row) { return row.topic_no; });
    questCacheLoaded = true;
    return questCache;
  } catch (e) {
    // 讀取失敗時回傳空清單
    return [];
  }
}

// 該課題是否已完成任務（全對領獎）
function isQuestCompleted(topicNo) {
  return questCache.indexOf(topicNo) !== -1;
}

// 呼叫 RPC award_quest_completion，回傳實際獲得嘅積分（首次 25，否則 0）
async function awardQuestCompletion(topicNo) {
  if (!supabaseReady || !sb || !getCurrentUser()) return 0;
  try {
    const { data, error } = await sb.rpc('award_quest_completion', {
      p_topic_no: topicNo
    });
    if (error) return 0;
    const earned = typeof data === 'number' ? data : 0;
    if (earned > 0) {
      if (questCache.indexOf(topicNo) === -1) questCache.push(topicNo);
      refreshUserPoints();
    }
    return earned;
  } catch (e) {
    // 失敗時靜默忽略，唔影響分析頁渲染
    return 0;
  }
}

// ---------- 筆記（Notes） ----------
// 內容來自 notes.js（NOTES 陣列）；按課題列出章節（headings）與兩條長題目。
function getNoteByNo(no) {
  return NOTE_LIST.find(function (n) { return n && n.no === no; }) || null;
}

function goToNotesPage() {
  if (!requireAuth()) return;
  stopChallenge();
  renderNotesChapterList();
  showPage('notesPage');
}

function goToNotesList() {
  const listEl = document.getElementById('notesChapterList');
  const detailEl = document.getElementById('notesDetail');
  if (listEl) listEl.classList.remove('hidden');
  if (detailEl) detailEl.classList.add('hidden');
}

function renderNotesChapterList() {
  const listEl = document.getElementById('notesChapterList');
  const detailEl = document.getElementById('notesDetail');
  if (!listEl) return;
  listEl.innerHTML = '';
  if (detailEl) detailEl.classList.add('hidden');

  if (!NOTE_LIST.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = t('notes.empty');
    listEl.appendChild(p);
    return;
  }

  NOTE_LIST.forEach(function (n) {
    const row = document.createElement('div');
    row.className = 'topic-row';

    const no = document.createElement('span');
    no.className = 'topic-no';
    no.textContent = pad(n.no);

    const name = document.createElement('span');
    name.className = 'topic-name';
    name.textContent = n.name;

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = t('btn.view');
    btn.onclick = function () { openNotesChapter(n.no); };

    row.appendChild(no);
    row.appendChild(name);
    row.appendChild(btn);
    listEl.appendChild(row);
  });
}

function openNotesChapter(no) {
  const listEl = document.getElementById('notesChapterList');
  const detailEl = document.getElementById('notesDetail');
  const content = document.getElementById('notesDetailContent');
  const note = getNoteByNo(no);
  if (!note) return;
  if (listEl) listEl.classList.add('hidden');
  if (detailEl) detailEl.classList.remove('hidden');
  if (!content) return;
  content.innerHTML = '';

  const title = document.createElement('h3');
  title.className = 'page-title';
  title.textContent = t('notes.topicTitle', { no: pad(note.no), name: note.name });
  content.appendChild(title);

  // 章節（headings）＋ 點列筆記
  (note.sections || []).forEach(function (sec) {
    const block = document.createElement('div');
    block.className = 'note-section';

    const h = document.createElement('h4');
    h.className = 'note-heading';
    h.textContent = sec.heading || '';
    block.appendChild(h);

    const ul = document.createElement('ul');
    ul.className = 'note-list';
    (sec.points || []).forEach(function (pt) {
      const li = document.createElement('li');
      li.textContent = pt;
      ul.appendChild(li);
    });
    block.appendChild(ul);
    content.appendChild(block);
  });

  // 長題目（每課兩條）
  (note.longQuestions || []).forEach(function (lq, i) {
    const block = document.createElement('div');
    block.className = 'note-longq';

    const q = document.createElement('p');
    q.className = 'note-q';
    q.textContent = t('notes.longQ', { n: i + 1 }) + lq.q;
    block.appendChild(q);

    const marks = document.createElement('p');
    marks.className = 'note-marks';
    marks.textContent = lq.marks || '';
    block.appendChild(marks);

    const btn = document.createElement('button');
    btn.className = 'btn btn-neutral';
    btn.textContent = t('notes.showAnswer');
    btn.onclick = function () {
      const existing = block.querySelector('.note-answer');
      if (existing) {
        existing.remove();
        btn.textContent = t('notes.showAnswer');
      } else {
        const ans = document.createElement('div');
        ans.className = 'note-answer';
        ans.textContent = lq.answer || '';
        block.appendChild(ans);
        btn.textContent = t('notes.hideAnswer');
      }
    };
    block.appendChild(btn);

    content.appendChild(block);
  });
}

// ---------- 主題切換 ----------
// 主題（淺色 / 深色 / 暖色）改為喺設定頁中選擇；偏好儲存於 localStorage（bioAppTheme）。
var THEME_META = {
  light: { icon: '☀️', title: '目前主題：淺色' },
  dark: { icon: '🌙', title: '目前主題：深色' },
  warm: { icon: '🌇', title: '目前主題：暖色' }
};

// 更新設定頁中的主題選擇按鈕（標示目前主題）
function updateThemeButton(name) {
  var active = THEME_META[name] ? name : 'light';
  document.querySelectorAll('#settingsThemeSelector .theme-select-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === active);
  });
}

function setTheme(name) {
  if (name !== 'light' && name !== 'dark' && name !== 'warm') name = 'light';

  document.documentElement.setAttribute('data-theme', name);
  updateThemeButton(name);

  try {
    localStorage.setItem('bioAppTheme', name);
  } catch (e) {
    // 儲存不可用時略過
  }
}

function initTheme() {
  let saved = 'light';
  try {
    const v = localStorage.getItem('bioAppTheme');
    if (v === 'light' || v === 'dark' || v === 'warm') saved = v;
  } catch (e) {
    // 讀取不可用時沿用預設
  }
  setTheme(saved);
}

// ---------- 語言 / 國際化（i18n） ----------
// 支援 中文（香港）（zh-HK）與 English (UK)（en）；
// 語言偏好儲存於 localStorage（bioAppLanguage）。
var I18N = {
  'zh-HK': {
    // 應用程式 / 頁首
    'app.title': '生物溫習程式',
    'btn.logout': '登出',
    'settings.btnTitle': '設定',

    // 登入
    'page.login': '登入',
    'login.subtitle': '請登入以使用生物溫習程式',
    'login.email': '電郵地址',
    'login.password': '密碼',
    'login.emailPh': '請輸入電郵地址',
    'login.passwordPh': '請輸入密碼',
    'btn.login': '登入',
    'login.switch': '還沒有帳戶？',
    'btn.register': '註冊新帳戶',
    'login.or': '—— 或 ——',
    'btn.guestMode': '以訪客模式使用',
    'guest.hint': '無需登入即可使用；不儲存任何資料，亦不提供排行榜與錯題重溫。',

    // 註冊
    'page.register': '註冊新帳戶',
    'register.email': '電郵地址',
    'register.emailPh': '請輸入電郵地址',
    'register.username': '用戶名稱／顯示名稱（1–20 字元：中文字、英文字母、數字、空格）',
    'register.usernamePh': '例如：小明 或 Bob123',
    'register.password': '密碼（至少 6 個字元）',
    'register.passwordPh': '請輸入密碼',
    'register.confirm': '確認密碼',
    'register.confirmPh': '再次輸入密碼',
    'btn.submitRegister': '註冊',
    'register.switch': '已有帳戶？',
    'btn.backLogin': '返回登入',
    'auth.registerSuccessNote': '註冊成功！請前往登入。',
    'auth.confirmHint': '注意：若已開啟電郵驗證（Confirm email），請先到電郵收件匣點擊確認連結，然後先可以登入。',
    'btn.goLogin': '前往登入',

    // 頁面標題 / 卡片
    'page.home': '主頁',
    'home.streak': '連續登入 {n} 天',
    'home.checkin': '簽到',
    'home.checkinSuccess': '✅ 簽到成功！連續登入 {n} 天',
    'home.checkinFail': '簽到失敗，請稍後再試',
    'home.checkinNeedLogin': '請先登入後再簽到',
    'page.score': '個人分數',
    'score.headerHint': '點擊查看個人分數',
    'score.totalLabel': '我的總分',
    'score.recordsTitle': '獲得分數紀錄',
    'score.rulesTitle': '獲取分數規則',
    'score.noRecords': '暫時未有分數紀錄，快啲去練習同挑戰攞分啦！',
    'score.event.daily_login': '每日登入',
    'score.event.challenge_test': '挑戰測試',
    'score.event.quest': '任務線',
    'score.rule.dailyLogin': '每日登入：+10 分（每日一次）',
    'score.rule.challenge': '挑戰模式：每日第一次測試，每答對一題 +1（上限 36），全對額外 +4',
    'score.rule.quest': '任務線：按課題完成練習並全對（20/20）：+25 分（每課題一次）',
    'score.rule.streak': '連續登入：每日登入日數會顯示喺主頁「主頁」旁',
    'countdown.label': '距離 2027 年生物科 DSE 還有',
    'countdown.days': '天',
    'countdown.daysOne': '天',
    'card.mc': '多項選擇題',
    'card.tech': '學習前沿科技',
    'card.faq': '常見問題 FAQ',
    'card.bug': 'Bug 回報',
    'card.wrong': '錯題重溫',
    'card.notes': '筆記',
    'card.ranking': '排行榜',
    'page.mc': '多項選擇題',
    'card.practice': '練習模式',
    'card.challenge': '挑戰模式',
    'btn.backHome': '返回主頁',
    'page.practice': '練習模式',
    'practice.subtitle': '按課題（每課題 20 題）或按課本（整冊）練習',
    'practice.switchTopic': '按課題',
    'practice.switchBook': '按課本',
    'btn.backMC': '返回多項選擇題',
    'btn.next': '下一題',
    'btn.analysis': '進入分析頁',
    'btn.backList': '返回課題列表',
    'page.practiceAnalysis': '練習分析',
    'page.challenge': '挑戰模式',
    'btn.prev': '上一題',
    'btn.finish': '完成',
    'btn.exitChallenge': '退出挑戰模式',
    'page.challengeAnalysis': '挑戰分析',
    'page.wrong': '錯題重溫',
    'btn.rework': '重溫作答',
    'btn.clearAll': '清空全部',
    'page.tech': '學習前沿科技',
    'page.faq': '常見問題 FAQ',
    'faq.subtitle': '點擊問題以展開答案',
    'faq.noContent': 'FAQ 內容尚未載入（faq.js 缺失）。',
    'page.bug': 'Bug 回報',
    'bug.subtitle': '發現問題？提交 Bug 回報，我們會跟進處理。',
    'bug.newReport': '提交 Bug 回報',
    'bug.title': '標題 *',
    'bug.categoryLabel': '類別',
    'bug.description': '詳細描述 *',
    'bug.steps': '重現步驟',
    'bug.submit': '提交',
    'bug.fillRequired': '請填寫標題與詳細描述。',
    'bug.submitted': '✓ 回報已提交，多謝你的回饋！',
    'bug.submitFailed': '提交失敗，請稍後再試。',
    'bug.myReports': '我的回報',
    'bug.loading': '載入中…',
    'bug.loadFailed': '載入失敗，請稍後再試。',
    'bug.noReports': '暫時沒有 Bug 回報。',
    'bug.untitled': '（無標題）',
    'bug.stepsLabel': '重現步驟：',
    'bug.category.app': '應用程式',
    'bug.category.content': '內容／題目',
    'bug.category.dse': 'DSE 試卷',
    'bug.category.other': '其他',
    'page.ranking': '排行榜',
    'page.notes': '筆記',
    'notes.subtitle': '按課題瀏覽點列式筆記，每課附兩條長題目（含參考答案）',
    'btn.backList2': '← 返回課題列表',
    'btn.enter': '進入',
    'btn.view': '查看',

    // 練習 / 挑戰 動態文字
    'topic.label': '課題 {no}',
    'book.label': '課本 {id}',
    'wrong.label': '錯題重溫',
    'wrong.done': '錯題重溫完成',
    'q.meta': '　第 {cur} / {total} 題',
    'score.rate': '命中率：',
    'feedback.correct': '正確',
    'feedback.incorrect': '錯誤\n正確答案：{ans}',
    'feedback.reason': '\n錯誤原因：{reason}',
    'practice.noBooks': '課本清單尚未載入。',
    'practice.noTopics': '課題清單尚未載入。',
    'practice.noQuestions': '此課題暫無題目（題庫尚未載入或尚未填入）。',
    'practice.noQuestionsBook': '此課本暫無題目（題庫尚未載入或尚未填入）。',
    'timer.left': '剩餘時間：',
    'challenge.noBank': '題庫尚未載入，無法開始挑戰模式。',
    'challenge.qTitle': '第 {cur} / {total} 題\n',
    'challenge.pointsCalc': '獲得積分：計算中…',
    'challenge.pointsEarned': '獲得積分：+{n}',
    'challenge.pointsNone': '今日已完成測試，不重複加分',
    'review.q': '第 {n} 題：',
    'review.correct': '正確答案：',
    'review.your': '你的作答：',
    'review.unanswered': '未作答',
    'review.markCorrect': '（正確）',
    'review.markWrong': '（錯誤）',
    'review.reason': '錯誤原因：',
    'quest.checking': '任務線：檢查中…',
    'quest.done': '任務完成！課題 {no} 全對 ✓ 獲得 25 分',
    'quest.doneBefore': '課題 {no} 已於之前完成（25 分已領取）',
    'quest.failed': '任務線加分未能完成，請稍後再試。',

    // 錯題
    'wrong.empty': '尚未儲存任何錯題。',
    'wrong.emptyQuiz': '尚未儲存任何錯題，請先作答並儲存錯題。',
    'wrong.cleared': '已清空全部錯題。',
    'wrong.yourChoice': '你的選擇：',
    'wrong.remove': '移除',

    // 前沿科技
    'tech.empty': '前沿科技內容即將推出。',
    'tech.dse': 'Dse連結',
    'tech.core': '核心概念',
    'tech.concept': '科技概念說明',
    'tech.source': '可靠來源',
    'tech.mcqs': '相關互動 MC',
    'tech.noMcq': '暫無互動 MC。',

    // 筆記
    'notes.empty': '筆記尚未載入（notes.js 缺失）。',
    'notes.topicTitle': '課題 {no}　{name}',
    'notes.longQ': '長題目 {n}：',
    'notes.showAnswer': '顯示參考答案',
    'notes.hideAnswer': '隱藏參考答案',

    // 長題目
    'card.longq': '長題目',
    'page.longq': '長題目',
    'longq.subtitle': '按課題（每課題 15 題）或按課本（每冊 5 題跨課題綜合題）瀏覽長題目，含參考答案',
    'longq.noChapters': '長題目內容尚未載入（longQuestions*.js 缺失）。',
    'longq.noBooks': '課本長題目尚未載入（bookLongQuestions.js 缺失）。',
    'longq.chapterTitle': '課題 {no}　{name}',
    'longq.bookTitle': '課本 {id}　{name}',
    'longq.bookTag': '本冊為跨課題（cross-topic）綜合長題目，需綜合運用本冊多個課題的知識。',
    'longq.qTitle': '長題目 {n}：',
    'longq.count': '（{n} 題）',
    'longq.showAnswer': '顯示參考答案',
    'longq.hideAnswer': '隱藏參考答案',

    // 長題目 AI 批改（DeepSeek）
    'deepseek.settingsTitle': 'DeepSeek AI（長題目批改）',
    'deepseek.settingsDesc': '輸入你的 DeepSeek API Key 以啟用長題目 AI 批改功能（只儲存於本機瀏覽器）',
    'deepseek.keyPh': 'sk-...（在 platform.deepseek.com 申請）',
    'deepseek.saveKey': '儲存 Key',
    'deepseek.hint': 'Key 只儲存於本機瀏覽器，不會上傳到任何伺服器。',
    'deepseek.saved': 'DeepSeek API Key 已儲存！',
    'deepseek.saveErr': '儲存失敗，請再試。',
    'deepseek.statusSet': '✅ 已設定 DeepSeek API Key',
    'deepseek.statusEmpty': '尚未設定 API Key',
    'deepseek.title': '✍️ AI 批改（DeepSeek）：輸入你的作答，交由 AI 批改評分',
    'deepseek.answerPh': '在此輸入你的長題目作答…',
    'deepseek.checkBtn': '提交批改',
    'deepseek.checking': 'AI 批改中，請稍候…',
    'deepseek.needKey': '尚未設定 DeepSeek API Key，請先到「設定」頁填入。',
    'deepseek.needAnswer': '請先輸入你的作答。',
    'deepseek.error': 'AI 批改失敗（API 回傳錯誤）：',
    'deepseek.noResult': 'AI 沒有回傳結果，請再試。',
    'deepseek.netError': '連線失敗，請檢查網絡後再試。',

    // DSE 試卷
    'page.dse': 'DSE 試卷',
    'card.dse': 'DSE 試卷',
    'dse.subtitle': '自製 5 套中英雙語模擬試卷：卷一（120 分）＋卷二（40 分），合共 160 分',
    'dse.noPapers': 'DSE 試卷內容尚未載入（dsePapers.js 缺失）。',
    'dse.paper1': 'Paper 1',
    'dse.paper2': 'Paper 2',
    'dse.short': '短答題',
    'dse.long': '長題目',
    'dse.verylong': '超長題目',
    'dse.essay': '論文',
    'dse.p2Rule': '卷二共四部分，每部分佔 20 分（各含兩條長題目）。考生可作答全部四部分，但只計算得分最高的兩部分，滿分為 40 分。',
    'dse.timeUp': '時間到！請停止作答並核對答案。',
    'dse.mcHint': '選擇答案後按「核對答案」即可自動批改（無需 API Key）。',
    'dse.checkMc': '核對答案',
    'dse.aiActive': '已設定 DeepSeek API Key：可批改全部作答（選擇題＋結構式題目）。',
    'dse.aiNeedsKey': '未設定 DeepSeek API Key：只能批改選擇題；結構式題目請先到「設定」填入 API Key 後即可由 AI 批改。',
    'dse.answerPh': '在此輸入你的作答…',
    'dse.backPapers': '← 返回試卷列表',

    // 排行榜
    'ranking.empty': '暫時未有排行榜資料。',
    'ranking.you': '（你）',
    'ranking.points': ' 分',

    // 登入／註冊 訊息
    'auth.notConfigured': '請先喺 supabaseConfig.js 填上 Supabase 專案資料。',
    'auth.needEmailPassword': '請輸入電郵和密碼。',
    'auth.invalidCredentials': '電郵或密碼錯誤。',
    'auth.confirmEmail': '請先到電郵收件匣確認電郵。',
    'auth.emailInvalid': '請輸入有效嘅電郵地址。',
    'auth.usernameLength': '用戶名稱長度須為 1–20 個字元。',
    'auth.usernameChars': '用戶名稱只能包含中文字、英文字母、數字和空格。',
    'auth.passwordShort': '密碼至少需要 6 個字元。',
    'auth.passwordMismatch': '兩次輸入的密碼不一致。',
    'auth.serverFail': '伺服器連線失敗，請稍後再試。',
    'auth.nameTaken': '用戶名稱已被使用，請換一個名稱。',
    'auth.regFailed': '註冊失敗：',
    'auth.retry': '請重試。',
    'auth.registerSuccess': '註冊成功，請使用密碼登入。',
    'logout.confirm': '確定要登出嗎？',
    'guest.badge': '訪客模式',
    'btn.exitGuest': '離開',
    'guest.settingsNotice': '你正以訪客模式使用，帳戶相關功能已停用。',
    'guest.loginHint': '此功能需要登入使用，請先登入或註冊帳戶。',

    // 設定頁
    'page.settings': '設定',
    'settings.appearance': '外觀',
    'settings.appearanceDesc': '選擇應用程式的顏色主題',
    'settings.theme.light': '淺色',
    'settings.theme.dark': '深色',
    'settings.theme.warm': '暖色',
    'settings.language': '語言',
    'settings.languageDesc': '選擇應用程式的顯示語言',
    'settings.name': '用戶名稱',
    'settings.nameDesc': '修改你的顯示名稱（1–20 字元）',
    'settings.namePh': '請輸入新名稱',
    'settings.saveName': '儲存名稱',
    'settings.email': '電郵',
    'settings.emailDesc': '你的登入電郵地址',
    'settings.danger.title': '危險區域',
    'settings.danger.desc': '刪除帳戶將永久移除所有資料，此操作無法復原。',
    'settings.deleteAccount': '刪除帳戶',
    'settings.deleteConfirmMsg': '你確定要永久刪除帳戶嗎？此操作無法復原。',
    'settings.deleteConfirmYes': '是，我確定刪除',
    'settings.deleteCancel': '取消',
    'settings.deleteErr': '刪除帳戶失敗，請稍後再試。',
    'settings.name.errNoBackend': '請先喺 supabaseConfig.js 填上 Supabase 專案資料。',
    'settings.name.errLength': '用戶名稱長度須為 1–20 個字元。',
    'settings.name.errChars': '用戶名稱只能包含中文字、英文字母、數字和空格。',
    'settings.name.errTaken': '用戶名稱已被使用，請換一個名稱。',
    'settings.name.errServer': '伺服器連線失敗，請稍後再試。',
    'settings.name.saved': '名稱已更新！'
  },
  'en': {
    // App / header
    'app.title': 'Biology Revision App',
    'btn.logout': 'Log out',
    'settings.btnTitle': 'Settings',

    // Login
    'page.login': 'Log In',
    'login.subtitle': 'Please log in to use the Biology Revision App',
    'login.email': 'Email address',
    'login.password': 'Password',
    'login.emailPh': 'Enter your email address',
    'login.passwordPh': 'Enter your password',
    'btn.login': 'Log In',
    'login.switch': 'Don\'t have an account?',
    'btn.register': 'Register',
    'login.or': '—— or ——',
    'btn.guestMode': 'Use as Guest',
    'guest.hint': 'No login required; saves no data and does not include the Leaderboard or Wrong Questions.',

    // Register
    'page.register': 'Register a new account',
    'register.email': 'Email address',
    'register.emailPh': 'Enter your email address',
    'register.username': 'Username / display name (1–20 characters: letters, numbers, spaces, Chinese)',
    'register.usernamePh': 'e.g. Bob123',
    'register.password': 'Password (at least 6 characters)',
    'register.passwordPh': 'Enter a password',
    'register.confirm': 'Confirm password',
    'register.confirmPh': 'Re-enter your password',
    'btn.submitRegister': 'Register',
    'register.switch': 'Already have an account?',
    'btn.backLogin': 'Back to Log In',
    'auth.registerSuccessNote': 'Registration successful! Please log in.',
    'auth.confirmHint': 'Note: If email confirmation is enabled, please click the confirmation link in your inbox before logging in.',
    'btn.goLogin': 'Go to Log In',

    // Page titles / cards
    'page.home': 'Home',
    'home.streak': 'Login streak: {n} day(s)',
    'home.checkin': 'Check in',
    'home.checkinSuccess': '✅ Checked in! Login streak: {n} day(s)',
    'home.checkinFail': 'Check-in failed. Please try again later.',
    'home.checkinNeedLogin': 'Please log in first to check in.',
    'page.score': 'My Score',
    'score.headerHint': 'Click to view your score',
    'score.totalLabel': 'My Total Score',
    'score.recordsTitle': 'Score History',
    'score.rulesTitle': 'How to Earn Points',
    'score.noRecords': 'No score records yet. Try practising and challenging to earn points!',
    'score.event.daily_login': 'Daily login',
    'score.event.challenge_test': 'Challenge test',
    'score.event.quest': 'Quest line',
    'score.rule.dailyLogin': 'Daily login: +10 points (once per day)',
    'score.rule.challenge': 'Challenge mode: first attempt each day, +1 per correct answer (max 36), +4 bonus for full marks',
    'score.rule.quest': 'Quest line: complete a topic practice with all correct (20/20): +25 points (once per topic)',
    'score.rule.streak': 'Login streak: your consecutive login days are shown next to the home page title',
    'countdown.label': '2027 Biology DSE is in',
    'countdown.days': 'days',
    'countdown.daysOne': 'day',
    'card.mc': 'Multiple Choice',
    'card.tech': 'Frontier Technology',
    'card.faq': 'FAQ',
    'card.bug': 'Bug Report',
    'card.wrong': 'Wrong Questions',
    'card.notes': 'Notes',
    'card.ranking': 'Leaderboard',
    'page.mc': 'Multiple Choice',
    'card.practice': 'Practice Mode',
    'card.challenge': 'Challenge Mode',
    'btn.backHome': 'Back to Home',
    'page.practice': 'Practice Mode',
    'practice.subtitle': 'Practise by topic (20 questions each) or by book (whole book)',
    'practice.switchTopic': 'By Topic',
    'practice.switchBook': 'By Book',
    'btn.backMC': 'Back to MC',
    'btn.next': 'Next',
    'btn.analysis': 'View Analysis',
    'btn.backList': 'Back to List',
    'page.practiceAnalysis': 'Practice Analysis',
    'page.challenge': 'Challenge Mode',
    'btn.prev': 'Previous',
    'btn.finish': 'Finish',
    'btn.exitChallenge': 'Exit Challenge',
    'page.challengeAnalysis': 'Challenge Analysis',
    'page.wrong': 'Wrong Questions',
    'btn.rework': 'Revise Answers',
    'btn.clearAll': 'Clear All',
    'page.tech': 'Frontier Technology',
    'page.faq': 'FAQ',
    'faq.subtitle': 'Click a question to expand its answer',
    'faq.noContent': 'FAQ content not loaded (faq.js missing).',
    'page.bug': 'Bug Report',
    'bug.subtitle': 'Found a problem? Submit a bug report and we will follow it up.',
    'bug.newReport': 'Submit a Bug Report',
    'bug.title': 'Title *',
    'bug.categoryLabel': 'Category',
    'bug.description': 'Detailed description *',
    'bug.steps': 'Steps to reproduce',
    'bug.submit': 'Submit',
    'bug.fillRequired': 'Please fill in the title and the detailed description.',
    'bug.submitted': '✓ Report submitted. Thank you for your feedback!',
    'bug.submitFailed': 'Submission failed. Please try again later.',
    'bug.myReports': 'My Reports',
    'bug.loading': 'Loading…',
    'bug.loadFailed': 'Failed to load. Please try again later.',
    'bug.noReports': 'No bug reports yet.',
    'bug.untitled': '(No title)',
    'bug.stepsLabel': 'Steps to reproduce:',
    'bug.category.app': 'App',
    'bug.category.content': 'Content / Questions',
    'bug.category.dse': 'DSE papers',
    'bug.category.other': 'Other',
    'page.ranking': 'Leaderboard',
    'page.notes': 'Notes',
    'notes.subtitle': 'Browse bullet-point notes by topic, each with two long questions (with answers)',
    'btn.backList2': '← Back to topic list',
    'btn.enter': 'Start',
    'btn.view': 'View',

    // Practice / challenge dynamic text
    'topic.label': 'Topic {no}',
    'book.label': 'Book {id}',
    'wrong.label': 'Wrong Questions Review',
    'wrong.done': 'Wrong-question review complete',
    'q.meta': '　Question {cur} / {total}',
    'score.rate': 'Accuracy: ',
    'feedback.correct': 'Correct',
    'feedback.incorrect': 'Incorrect\nCorrect answer: {ans}',
    'feedback.reason': '\nReason: {reason}',
    'practice.noBooks': 'Book list not loaded.',
    'practice.noTopics': 'Topic list not loaded.',
    'practice.noQuestions': 'No questions for this topic yet (bank not loaded or not filled in).',
    'practice.noQuestionsBook': 'No questions for this book yet (bank not loaded or not filled in).',
    'timer.left': 'Time left: ',
    'challenge.noBank': 'Question bank not loaded. Cannot start challenge mode.',
    'challenge.qTitle': 'Question {cur} / {total}\n',
    'challenge.pointsCalc': 'Points: calculating…',
    'challenge.pointsEarned': 'Points earned: +{n}',
    'challenge.pointsNone': 'Already scored today; no extra points',
    'review.q': 'Question {n}: ',
    'review.correct': 'Correct answer: ',
    'review.your': 'Your answer: ',
    'review.unanswered': 'Not answered',
    'review.markCorrect': ' (Correct)',
    'review.markWrong': ' (Incorrect)',
    'review.reason': 'Reason: ',
    'quest.checking': 'Quest line: checking…',
    'quest.done': 'Quest complete! Topic {no} all correct ✓ +25 points',
    'quest.doneBefore': 'Topic {no} completed before (25 points already claimed)',
    'quest.failed': 'Could not award quest points. Please try again.',

    // Wrong questions
    'wrong.empty': 'No wrong questions saved yet.',
    'wrong.emptyQuiz': 'No wrong questions yet. Answer questions first to save them.',
    'wrong.cleared': 'All wrong questions cleared.',
    'wrong.yourChoice': 'Your choice: ',
    'wrong.remove': 'Remove',

    // Frontier tech
    'tech.empty': 'Frontier tech content coming soon.',
    'tech.dse': 'DSE link',
    'tech.core': 'Core concepts',
    'tech.concept': 'Concept explanation',
    'tech.source': 'Source',
    'tech.mcqs': 'Related interactive MCs',
    'tech.noMcq': 'No interactive MCs yet.',

    // Notes
    'notes.empty': 'Notes not loaded (notes.js missing).',
    'notes.topicTitle': 'Topic {no}  {name}',
    'notes.longQ': 'Long question {n}: ',
    'notes.showAnswer': 'Show answer',
    'notes.hideAnswer': 'Hide answer',

    // Long questions
    'card.longq': 'Long Questions',
    'page.longq': 'Long Questions',
    'longq.subtitle': 'Browse long questions by topic (15 per chapter) or by book (5 cross-topic questions per book), with model answers',
    'longq.noChapters': 'Long question content not loaded (longQuestions*.js missing).',
    'longq.noBooks': 'Book long questions not loaded (bookLongQuestions.js missing).',
    'longq.chapterTitle': 'Topic {no}  {name}',
    'longq.bookTitle': 'Book {id}  {name}',
    'longq.bookTag': 'This volume contains cross-topic comprehensive long questions, requiring knowledge from several chapters in this book.',
    'longq.qTitle': 'Long question {n}: ',
    'longq.count': '({n} questions)',
    'longq.showAnswer': 'Show model answer',
    'longq.hideAnswer': 'Hide model answer',

    // Long-question AI grading (DeepSeek)
    'deepseek.settingsTitle': 'DeepSeek AI (Long-question grading)',
    'deepseek.settingsDesc': 'Enter your DeepSeek API Key to enable AI grading of long questions (stored only in your browser)',
    'deepseek.keyPh': 'sk-... (get one at platform.deepseek.com)',
    'deepseek.saveKey': 'Save Key',
    'deepseek.hint': 'The key is stored only in your browser and is never uploaded to any server.',
    'deepseek.saved': 'DeepSeek API Key saved!',
    'deepseek.saveErr': 'Failed to save. Please try again.',
    'deepseek.statusSet': '✅ DeepSeek API Key set',
    'deepseek.statusEmpty': 'API key not set',
    'deepseek.title': '✍️ AI grading (DeepSeek): write your answer and submit for grading',
    'deepseek.answerPh': 'Type your long-question answer here…',
    'deepseek.checkBtn': 'Submit for grading',
    'deepseek.checking': 'AI is grading, please wait…',
    'deepseek.needKey': 'DeepSeek API key not set. Please add it in Settings first.',
    'deepseek.needAnswer': 'Please write your answer first.',
    'deepseek.error': 'AI grading failed (API error): ',
    'deepseek.noResult': 'The AI returned no result. Please try again.',
    'deepseek.netError': 'Connection failed. Please check your network and try again.',

    // DSE papers
    'page.dse': 'DSE Papers',
    'card.dse': 'DSE Papers',
    'dse.subtitle': '5 bilingual mock paper sets: Paper 1 (120 marks) + Paper 2 (40 marks), total 160 marks',
    'dse.noPapers': 'DSE paper content not loaded (dsePapers.js missing).',
    'dse.paper1': 'Paper 1',
    'dse.paper2': 'Paper 2',
    'dse.short': 'Short answer',
    'dse.long': 'Long question',
    'dse.verylong': 'Very long question',
    'dse.essay': 'Essay',
    'dse.p2Rule': 'Paper 2 has four parts, each worth 20 marks (two long questions in each). Candidates may answer all four parts, but only the two highest-scoring parts are counted. Total: 40 marks.',
    'dse.timeUp': 'Time is up! Stop writing and check your answers.',
    'dse.mcHint': 'Select your answers, then press "Check answers" to auto-grade (no API key needed).',
    'dse.checkMc': 'Check answers',
    'dse.aiActive': 'DeepSeek API key set: all answers can be graded (MC + structured questions).',
    'dse.aiNeedsKey': 'DeepSeek API key not set: only multiple-choice questions can be graded. Add your API key in Settings to enable AI grading of the structured questions.',
    'dse.answerPh': 'Type your answer here…',
    'dse.backPapers': '← Back to papers',

    // Ranking
    'ranking.empty': 'No leaderboard data yet.',
    'ranking.you': ' (You)',
    'ranking.points': ' pts',

    // Auth messages
    'auth.notConfigured': 'Please set up the Supabase project details in supabaseConfig.js.',
    'auth.needEmailPassword': 'Please enter your email and password.',
    'auth.invalidCredentials': 'Incorrect email or password.',
    'auth.confirmEmail': 'Please confirm your email from the inbox first.',
    'auth.emailInvalid': 'Please enter a valid email address.',
    'auth.usernameLength': 'Username must be 1–20 characters.',
    'auth.usernameChars': 'Username can only contain letters, numbers, spaces and Chinese characters.',
    'auth.passwordShort': 'Password must be at least 6 characters.',
    'auth.passwordMismatch': 'Passwords do not match.',
    'auth.serverFail': 'Server connection failed. Please try again.',
    'auth.nameTaken': 'Username already taken. Please choose another.',
    'auth.regFailed': 'Registration failed: ',
    'auth.retry': 'Please try again.',
    'auth.registerSuccess': 'Registration successful. Please log in.',
    'logout.confirm': 'Are you sure you want to log out?',
    'guest.badge': 'Guest Mode',
    'btn.exitGuest': 'Exit',
    'guest.settingsNotice': 'You are in Guest Mode; account features are disabled.',
    'guest.loginHint': 'This feature requires logging in. Please log in or register an account.',

    // Settings page
    'page.settings': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.appearanceDesc': 'Choose the app colour theme',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.theme.warm': 'Sunset',
    'settings.language': 'Language',
    'settings.languageDesc': 'Choose the app display language',
    'settings.name': 'Username',
    'settings.nameDesc': 'Change your display name (1–20 characters)',
    'settings.namePh': 'Enter a new name',
    'settings.saveName': 'Save Name',
    'settings.email': 'Email',
    'settings.emailDesc': 'The email address you log in with',
    'settings.danger.title': 'Danger Zone',
    'settings.danger.desc': 'Deleting your account permanently removes all data. This cannot be undone.',
    'settings.deleteAccount': 'Delete Account',
    'settings.deleteConfirmMsg': 'Are you sure you want to permanently delete your account? This cannot be undone.',
    'settings.deleteConfirmYes': 'Yes, delete my account',
    'settings.deleteCancel': 'Cancel',
    'settings.deleteErr': 'Failed to delete account. Please try again.',
    'settings.name.errNoBackend': 'Please set up the Supabase project details in supabaseConfig.js.',
    'settings.name.errLength': 'Username must be 1–20 characters.',
    'settings.name.errChars': 'Username can only contain letters, numbers, spaces and Chinese characters.',
    'settings.name.errTaken': 'Username already taken. Please choose another.',
    'settings.name.errServer': 'Server connection failed. Please try again.',
    'settings.name.saved': 'Name updated!'
  }
};

function getAppLanguage() {
  var lang = 'zh-HK';
  try {
    var v = localStorage.getItem('bioAppLanguage');
    if (v === 'zh-HK' || v === 'en') lang = v;
  } catch (e) {}
  return lang;
}

function t(key, params) {
  var table = I18N[getAppLanguage()] || I18N['zh-HK'];
  var s = (key in table) ? table[key] : (I18N['zh-HK'][key] || key);
  if (params) {
    Object.keys(params).forEach(function (k) {
      s = s.split('{' + k + '}').join(params[k]);
    });
  }
  return s;
}

function setAppLanguage(lang) {
  if (lang !== 'zh-HK' && lang !== 'en') lang = 'zh-HK';
  try {
    localStorage.setItem('bioAppLanguage', lang);
  } catch (e) {}
  updateLanguageSelector();
  applyLanguage();
  window.location.reload();
}

function applyLanguage() {
  document.documentElement.setAttribute('lang', getAppLanguage() === 'en' ? 'en-GB' : 'zh-HK');
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
    el.title = t(el.getAttribute('data-i18n-title'));
  });
}

function initLanguage() {
  applyLanguage();
}

function updateLanguageSelector() {
  var lang = getAppLanguage();
  document.querySelectorAll('#settingsLangSelector .lang-select-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// ---------- 設定頁 ----------
function goToSettingsPage() {
  if (!requireAuth()) return;
  stopChallenge();
  renderSettingsPage();
  showPage('settingsPage');
}

function renderSettingsPage() {
  var user = getCurrentUser();

  // 訪客模式：只顯示外觀／語言，隱藏帳戶相關區塊
  var nameSection = document.getElementById('settingsNameSection');
  var emailSection = document.getElementById('settingsEmailSection');
  var dangerSection = document.getElementById('settingsDangerSection');
  var guestNotice = document.getElementById('settingsGuestNotice');
  var showAccount = !isGuestMode;
  if (nameSection) nameSection.classList.toggle('hidden', !showAccount);
  if (emailSection) emailSection.classList.toggle('hidden', !showAccount);
  if (dangerSection) dangerSection.classList.toggle('hidden', !showAccount);
  if (guestNotice) guestNotice.classList.toggle('hidden', !isGuestMode);

  updateLanguageSelector();
  updateThemeButton(document.documentElement.getAttribute('data-theme'));
  var nameEl = document.getElementById('settingsNameInput');
  if (nameEl && user) nameEl.value = (user.user_metadata && user.user_metadata.username) || '';
  var emailEl = document.getElementById('settingsEmailDisplay');
  if (emailEl) emailEl.textContent = (user && user.email) ? user.email : '—';
  var noticeEl = document.getElementById('settingsNameNotice');
  if (noticeEl) showAuthNotice(noticeEl, '', '');
  resetDeleteAccountPanel();

  // DeepSeek AI key 顯示（只儲存於本機瀏覽器）
  var deepSeekInput = document.getElementById('settingsDeepSeekKeyInput');
  var deepSeekStatus = document.getElementById('settingsDeepSeekStatus');
  var deepSeekNotice = document.getElementById('settingsDeepSeekNotice');
  if (deepSeekInput) deepSeekInput.value = getDeepSeekKey();
  if (deepSeekStatus) deepSeekStatus.textContent = getDeepSeekKey() ? t('deepseek.statusSet') : t('deepseek.statusEmpty');
  if (deepSeekNotice) showAuthNotice(deepSeekNotice, '', '');
}

// 儲存用戶名稱：更新 profiles 表 + auth 元數據
async function saveSettingsName() {
  if (!requireAuth()) return;
  var user = getCurrentUser();
  var noticeEl = document.getElementById('settingsNameNotice');
  var inputEl = document.getElementById('settingsNameInput');
  if (!user || !inputEl || !noticeEl) return;
  var name = inputEl.value.trim();

  if (!supabaseReady || !sb) {
    showAuthNotice(noticeEl, t('settings.name.errNoBackend'), 'error');
    return;
  }
  if (name.length < 1 || name.length > 20) {
    showAuthNotice(noticeEl, t('settings.name.errLength'), 'error');
    return;
  }
  if (!/^[a-zA-Z0-9\u4E00-\u9FFF ]+$/.test(name)) {
    showAuthNotice(noticeEl, t('settings.name.errChars'), 'error');
    return;
  }

  // 檢查名稱是否已被其他用戶使用（不分大小寫）
  const { data: nameRows, error: nameErr } = await sb
    .from('profiles')
    .select('id, username')
    .ilike('username', name);
  if (nameErr) {
    showAuthNotice(noticeEl, t('settings.name.errServer'), 'error');
    return;
  }
  var usedByOther = (nameRows || []).some(function (row) {
    return row.id !== user.id;
  });
  if (usedByOther) {
    showAuthNotice(noticeEl, t('settings.name.errTaken'), 'error');
    return;
  }

  // 更新 profiles 表
  const { error: profErr } = await sb
    .from('profiles')
    .update({ username: name })
    .eq('id', user.id);
  if (profErr) {
    showAuthNotice(noticeEl, t('settings.name.errServer'), 'error');
    return;
  }

  // 更新 auth 元數據（令 user.user_metadata 同步）
  const { data: updData, error: updErr } = await sb.auth.updateUser({
    data: { username: name }
  });
  if (updErr) {
    showAuthNotice(noticeEl, t('settings.name.errServer'), 'error');
    return;
  }
  setCurrentUser(updData.user || user);
  updateAuthHeader();
  showAuthNotice(noticeEl, t('settings.name.saved'), 'success');
}

// ---------- 刪除帳戶（雙重確認） ----------
function requestDeleteAccount() {
  var panel = document.getElementById('deleteConfirmPanel');
  var btn = document.getElementById('deleteAccountBtn');
  var noticeEl = document.getElementById('deleteAccountNotice');
  if (!panel) return;
  panel.classList.remove('hidden');
  if (btn) btn.disabled = true;
  if (noticeEl) showAuthNotice(noticeEl, '', '');
}

function cancelDeleteAccount() {
  resetDeleteAccountPanel();
}

function resetDeleteAccountPanel() {
  var panel = document.getElementById('deleteConfirmPanel');
  var btn = document.getElementById('deleteAccountBtn');
  var noticeEl = document.getElementById('deleteAccountNotice');
  var confirmBtn = document.getElementById('deleteConfirmBtn');
  if (panel) panel.classList.add('hidden');
  if (btn) btn.disabled = false;
  if (confirmBtn) confirmBtn.disabled = false;
  if (noticeEl) showAuthNotice(noticeEl, '', '');
}

async function confirmDeleteAccount() {
  var noticeEl = document.getElementById('deleteAccountNotice');
  var confirmBtn = document.getElementById('deleteConfirmBtn');
  if (confirmBtn) confirmBtn.disabled = true;

  // 呼叫後端 RPC delete_account（由 Supabase 刪除 auth user，子表因 cascade 自動清除）
  if (supabaseReady && sb && getCurrentUser()) {
    try {
      const { error } = await sb.rpc('delete_account');
      if (error) {
        showAuthNotice(noticeEl, t('settings.deleteErr'), 'error');
        if (confirmBtn) confirmBtn.disabled = false;
        return;
      }
      try { await sb.auth.signOut(); } catch (e) { /* 用戶已刪除，signOut 失敗可忽略 */ }
    } catch (e) {
      showAuthNotice(noticeEl, t('settings.deleteErr'), 'error');
      if (confirmBtn) confirmBtn.disabled = false;
      return;
    }
  }

  // 本地清除並返回登入頁
  clearWrongCache();
  clearQuestCache();
  clearCurrentUser();
  updateAuthHeader();
  showPage('loginPage');
}

// ---------- 初始化 ----------
initTheme();
initLanguage();
updateAuthHeader();
updateVersionLabel();
renderCountdown(); // 2027 生物科 DSE 倒數（顯示於程式底部）
initAuth(); // 非同步：檢查登入狀態並載入錯題快取（未設定 Supabase 時會顯示設定提示）
