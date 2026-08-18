// app.js
// 生物溫習程式 — 應用程式邏輯（頁面切換、練習模式、挑戰模式、分析頁、前沿科技渲染）

'use strict';

// ---------- 安全合併題庫（檔案缺失時不報錯） ----------
const ALL_QUESTIONS = [...(typeof QB1 !== 'undefined' ? QB1 : []), ...(typeof QB2 !== 'undefined' ? QB2 : []), ...(typeof QB3 !== 'undefined' ? QB3 : [])];

const FRONTIER = typeof FRONTIER_TECH !== 'undefined' ? FRONTIER_TECH : [];
const TOPIC_LIST = typeof TOPICS !== 'undefined' ? TOPICS : [];
const BOOK_LIST = typeof BOOKS !== 'undefined' ? BOOKS : [];

// ---------- 狀態變數 ----------
let practiceQuestions = [];
let practiceIndex = 0;
let practiceCorrectCount = 0;
let practiceTopicNo = null;
let practiceBookId = null; // 課本練習模式：目前練習的課本 id（null 表示按課題或錯題重溫）
let wrongQuizActive = false; // 錯題重溫（重溫作答）模式旗標
let practiceListMode = 'topic'; // 練習列表切換：'topic' 按課題 / 'book' 按課本

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
  const t = TOPIC_LIST.find(function (x) { return x.no === no; });
  return t ? t.name : ('課題 ' + no);
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
  'rankingPage'
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
    p.textContent = '課本清單尚未載入。';
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
    btn.textContent = '進入';
    btn.onclick = function () { startBookPractice(b.id); };

    row.appendChild(no);
    row.appendChild(name);
    row.appendChild(btn);
    listEl.appendChild(row);
  });
}

function renderPracticeTopicList() {
  const listEl = document.getElementById('practiceTopicList');
  const noticeEl = document.getElementById('practiceListNotice');
  if (!listEl) return;
  listEl.innerHTML = '';
  if (noticeEl) noticeEl.textContent = '';

  if (!TOPIC_LIST.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = '課題清單尚未載入。';
    listEl.appendChild(p);
    return;
  }

  TOPIC_LIST.forEach(function (t) {
    const row = document.createElement('div');
    row.className = 'topic-row';

    const no = document.createElement('span');
    no.className = 'topic-no';
    no.textContent = pad(t.no);

    const name = document.createElement('span');
    name.className = 'topic-name';
    name.textContent = t.name;

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = '進入';
    btn.onclick = function () { startPractice(t.no); };

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
    if (noticeEl) noticeEl.textContent = '此課題暫無題目（題庫尚未載入或尚未填入）。';
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
    if (noticeEl) noticeEl.textContent = '此課本暫無題目（題庫尚未載入或尚未填入）。';
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
    topicLabel = (book ? book.name : '課本 ' + practiceBookId) + '　' + (book ? book.range : '');
  } else if (practiceTopicNo === null) {
    topicLabel = '錯題重溫';
  } else {
    topicLabel = '課題 ' + practiceTopicNo + '　' + topicName(practiceTopicNo);
  }
  meta.textContent = topicLabel +
    '　第 ' + (practiceIndex + 1) + ' / ' + practiceQuestions.length + ' 題';

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
    feedback.textContent = '正確';
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
    let msg = '錯誤\n正確答案：' + correctText;
    if (reason) msg += '\n錯誤原因：' + reason;
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

function showPracticeAnalysis() {
  const total = practiceQuestions.length;
  const correct = practiceCorrectCount;
  const pct = total ? Math.round((correct / total) * 100) : 0;

  const content = document.getElementById('practiceAnalysisContent');
  content.innerHTML = '';

  const line1 = document.createElement('p');
  if (practiceBookId !== null) {
    const book = getBookById(practiceBookId);
    line1.textContent = (book ? book.name : '課本 ' + practiceBookId) + '　' + (book ? book.range : '');
  } else if (wrongQuizActive) {
    line1.textContent = '錯題重溫完成';
  } else {
    line1.textContent = '課題 ' + practiceTopicNo + '　' + topicName(practiceTopicNo);
  }

  const line2 = document.createElement('p');
  line2.className = 'score';
  line2.textContent = '命中率：' + correct + ' / ' + total;

  const line3 = document.createElement('p');
  line3.className = 'score';
  line3.textContent = pct + '%';

  content.appendChild(line1);
  content.appendChild(line2);
  content.appendChild(line3);

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
      p.textContent = '題庫尚未載入，無法開始挑戰模式。';
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
  qText.textContent = '第 ' + (challengeIndex + 1) + ' / ' + challengeQuestions.length + ' 題\n' + q.q;
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

  if (textEl) textEl.textContent = '剩餘時間：' + pad(mins) + ':' + pad(secs);
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
  summary.textContent = '命中率：' + correct + ' / ' + total + '（' + pct + '%）';
  content.appendChild(summary);

  // 挑戰測試積分（每日第一次測試先計分；非同步顯示，唔阻塞分析渲染）
  const pointsLine = document.createElement('p');
  pointsLine.className = 'score points-award';
  pointsLine.textContent = '獲得積分：計算中…';
  content.appendChild(pointsLine);

  awardChallengeTest(correct, total).then(function (earned) {
    if (earned > 0) {
      pointsLine.textContent = '獲得積分：+' + earned;
    } else {
      pointsLine.textContent = '今日已完成測試，不重複加分';
    }
  });

  const saves = [];

  challengeQuestions.forEach(function (q, idx) {
    const user = challengeAnswers[idx];

    const block = document.createElement('div');
    block.className = 'review-item';

    const qEl = document.createElement('p');
    qEl.className = 'review-q';
    qEl.textContent = '第 ' + (idx + 1) + ' 題：' + q.q;
    block.appendChild(qEl);

    const correctLine = document.createElement('p');
    correctLine.textContent = '正確答案：' + letter(q.correct) + '. ' + q.options[q.correct];
    block.appendChild(correctLine);

    const userLine = document.createElement('p');
    if (user === null) {
      userLine.textContent = '你的作答：未作答';
    } else {
      userLine.textContent = '你的作答：' + letter(user) + '. ' + q.options[user] +
        (user === q.correct ? '（正確）' : '（錯誤）');
    }
    block.appendChild(userLine);

    if (user !== null && user !== q.correct) {
      saves.push(saveWrongQuestion(q, user));
      const reason = reasonOf(q, user);
      if (reason) {
        const reasonLine = document.createElement('p');
        reasonLine.className = 'review-reason';
        reasonLine.textContent = '錯誤原因：' + reason;
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
    p.textContent = '尚未儲存任何錯題。';
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
    correctLine.textContent = '正確答案：' + letter(q.correct) + '. ' + q.options[q.correct];
    item.appendChild(correctLine);

    if (typeof record.wrongIndex === 'number' &&
        record.wrongIndex >= 0 &&
        record.wrongIndex !== q.correct &&
        q.options[record.wrongIndex]) {
      const userLine = document.createElement('p');
      userLine.textContent = '你的選擇：' + letter(record.wrongIndex) + '. ' + q.options[record.wrongIndex];
      item.appendChild(userLine);

      const reason = reasonOf(q, record.wrongIndex);
      if (reason && reason !== '正確答案') {
        const reasonLine = document.createElement('p');
        reasonLine.className = 'review-reason';
        reasonLine.textContent = '錯誤原因：' + reason;
        item.appendChild(reasonLine);
      }
    }

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-neutral';
    removeBtn.textContent = '移除';
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
  if (noticeEl) noticeEl.textContent = '已清空全部錯題。';
}

async function startWrongQuiz() {
  const noticeEl = document.getElementById('wrongNotice');
  if (noticeEl) noticeEl.textContent = '';

  const list = await loadWrongQuestions();
  const qs = list.map(function (r) { return r.q; }).filter(Boolean);
  if (!qs.length) {
    if (noticeEl) noticeEl.textContent = '尚未儲存任何錯題，請先作答並儲存錯題。';
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

// ---------- 學習前沿科技 ----------
function renderTechPage() {
  const container = document.getElementById('techContainer');
  if (!container) return;
  container.innerHTML = '';

  if (!FRONTIER.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = '前沿科技內容即將推出。';
    container.appendChild(p);
    return;
  }

  FRONTIER.forEach(function (tech) {
    container.appendChild(buildTechCard(tech));
  });
}

function buildTechCard(tech) {
  const card = document.createElement('article');
  card.className = 'tech-card';

  const title = document.createElement('h2');
  title.textContent = tech.title || '';
  card.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'tech-subtitle';
  subtitle.textContent = tech.subtitle || '';
  card.appendChild(subtitle);

  // Dse連結 + 相關課題列表
  const dse = document.createElement('div');
  dse.className = 'tech-dse';
  const dseLabel = document.createElement('span');
  dseLabel.className = 'badge';
  dseLabel.textContent = 'Dse連結';
  dse.appendChild(dseLabel);
  const relList = document.createElement('ul');
  relList.className = 'related-list';
  (tech.relatedTopics || []).forEach(function (rt) {
    const li = document.createElement('li');
    li.textContent = '課題 ' + rt.no + '　' + rt.name;
    relList.appendChild(li);
  });
  dse.appendChild(relList);
  card.appendChild(dse);

  // 核心概念
  const conceptsTitle = document.createElement('h3');
  conceptsTitle.textContent = '核心概念';
  card.appendChild(conceptsTitle);
  const concepts = document.createElement('ul');
  concepts.className = 'bullet-list';
  (tech.coreConcepts || []).forEach(function (c) {
    const li = document.createElement('li');
    li.textContent = c;
    concepts.appendChild(li);
  });
  card.appendChild(concepts);

  // 科技概念說明
  const conceptTitle = document.createElement('h3');
  conceptTitle.textContent = '科技概念說明';
  card.appendChild(conceptTitle);
  const concept = document.createElement('p');
  concept.className = 'tech-concept';
  concept.textContent = tech.concept || '';
  card.appendChild(concept);

  // 可靠來源（新分頁開啟）
  if (tech.sourceUrl) {
    const source = document.createElement('a');
    source.className = 'btn btn-source';
    source.href = tech.sourceUrl;
    source.target = '_blank';
    source.rel = 'noopener';
    source.textContent = '可靠來源';
    card.appendChild(source);
  }

  // 5 條相關互動 MC
  const mcqsTitle = document.createElement('h3');
  mcqsTitle.textContent = '相關互動 MC';
  card.appendChild(mcqsTitle);
  const mcqs = tech.mcqs || [];
  if (!mcqs.length) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = '暫無互動 MC。';
    card.appendChild(p);
  } else {
    mcqs.forEach(function (mcq, mi) {
      card.appendChild(buildTechMcq(mcq, mi));
    });
  }

  return card;
}

function buildTechMcq(mcq, mi) {
  const block = document.createElement('div');
  block.className = 'mcq';

  const qEl = document.createElement('p');
  qEl.className = 'mcq-q';
  qEl.textContent = '第 ' + (mi + 1) + ' 題：' + mcq.q;
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
        feedback.textContent = '正確';
      } else {
        const reason = reasonOf(mcq, oi);
        feedback.className = 'feedback incorrect';
        let msg = '錯誤\n正確答案：' + letter(mcq.correct) + '. ' + mcq.options[mcq.correct];
        if (reason) msg += '\n錯誤原因：' + reason;
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
//   - 登入／註冊使用「真實電郵 + 密碼」；「用戶名稱／顯示名稱」仍會經字典（USER_CODE_DICT）自動產生用戶代碼。
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
}

function clearCurrentUser() {
  currentUser = null;
  updateAuthHeader();
}

// ---------- 用戶代碼字典（generateUserCode 用） ----------
// 英文字母（不分大小寫）：A/a → '01'、B/b → '02' ... Z/z → '26'（字母序 + 1，補零 2 位）
// 數字：0 → '27'、1 → '28' ... 9 → '36'（數字 + 27，補零 2 位）
// 中文字（\u4E00–\u9FFF）：以「字典延伸」方式產生：(字元碼 - 0x4E00) + 100
// 空格與不支援的字元會被略過。
const USER_CODE_DICT = (function () {
  const dict = {};
  for (let i = 0; i < 26; i++) {
    const code = pad(i + 1); // '01' ... '26'
    dict[String.fromCharCode(65 + i)] = code; // A-Z
    dict[String.fromCharCode(97 + i)] = code; // a-z
  }
  for (let d = 0; d <= 9; d++) {
    dict[String(d)] = pad(d + 27); // '27' ... '36'
  }
  return dict;
})();

function isZhChar(ch) {
  const c = ch.charCodeAt(0);
  return c >= 0x4E00 && c <= 0x9FFF;
}

function generateUserCode(username) {
  let code = '';
  for (const ch of String(username)) {
    if (USER_CODE_DICT[ch]) {
      code += USER_CODE_DICT[ch];
    } else if (isZhChar(ch)) {
      // 字典延伸：以 (charCode - 0x4E00) + 100 表示中文字
      code += String((ch.charCodeAt(0) - 0x4E00) + 100);
    }
    // 其餘字元（含空格）略過
  }
  return code;
}

// 確保 userCode 唯一：若基底碼已被使用，追加 '-01'、'-02'... 直到唯一
// existingCodes 可為字串陣列（Supabase profiles 嘅 user_code），或含 userCode 之物件陣列
function makeUniqueUserCode(baseCode, existingCodes) {
  const taken = (existingCodes || []).map(function (u) {
    return (typeof u === 'string') ? u : (u && u.userCode);
  }).filter(Boolean);
  if (taken.indexOf(baseCode) === -1) return baseCode;
  for (let i = 1; i <= 999; i++) {
    const candidate = baseCode + '-' + pad(i);
    if (taken.indexOf(candidate) === -1) return candidate;
  }
  // 理論上不會走到這裡，保險起見追加隨機兩位數字
  for (let i = 0; i < 100; i++) {
    const n = Math.floor(Math.random() * 100);
    const candidate = baseCode + '-' + pad(n);
    if (taken.indexOf(candidate) === -1) return candidate;
  }
  return baseCode + '-' + Date.now().toString().slice(-4);
}

function showAuthNotice(el, message, type) {
  if (!el) return;
  if (type === 'error') el.className = 'auth-notice auth-error';
  else if (type === 'success') el.className = 'auth-notice auth-success';
  else el.className = 'auth-notice';
  el.textContent = message;
}

// 更新頁首的用戶名稱 / 用戶代碼 / 積分 / 登出按鈕
function updateAuthHeader() {
  const userArea = document.getElementById('userArea');
  const nameEl = document.getElementById('currentUserName');
  const codeEl = document.getElementById('currentUserCode');
  const pointsEl = document.getElementById('currentUserPoints');
  if (!userArea || !nameEl || !codeEl) return;
  const user = getCurrentUser();
  if (!user) {
    cachedUserPoints = null;
    userArea.classList.add('hidden');
    nameEl.textContent = '—';
    codeEl.textContent = '—';
    if (pointsEl) pointsEl.textContent = '—';
    return;
  }
  const meta = user.user_metadata || {};
  userArea.classList.remove('hidden');
  nameEl.textContent = meta.username || '—';
  codeEl.textContent = meta.user_code || '—';
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
    showAuthNotice(loginNotice, '請先喺 supabaseConfig.js 填上 Supabase 專案資料。', 'error');
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
  if (getCurrentUser()) return true;
  showLoginPage();
  return false;
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
    showAuthNotice(noticeEl, '請先喺 supabaseConfig.js 填上 Supabase 專案資料。', 'error');
    return;
  }
  if (!email || !password) {
    showAuthNotice(noticeEl, '請輸入電郵和密碼。', 'error');
    return;
  }

  const { data, error } = await sb.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error || !data.user) {
    let msg = '電郵或密碼錯誤。';
    const m = (error && error.message ? error.message : '').toLowerCase();
    if (/confirm|not confirmed|email_not_confirmed|unverified|not verified/.test(m)) {
      msg = '請先到電郵收件匣確認電郵。';
    }
    showAuthNotice(noticeEl, msg, 'error');
    return;
  }

  setCurrentUser(data.user);
  await awardDailyLogin(); // 每日登入 +10（失敗亦唔阻塞登入）
  await migrateLegacyWrongQuestionsIfAny();
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
    showAuthNotice(noticeEl, '請先喺 supabaseConfig.js 填上 Supabase 專案資料。', 'error');
    return;
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    showAuthNotice(noticeEl, '請輸入有效嘅電郵地址。', 'error');
    return;
  }
  if (username.length < 1 || username.length > 20) {
    showAuthNotice(noticeEl, '用戶名稱長度須為 1–20 個字元。', 'error');
    return;
  }
  if (!/^[a-zA-Z0-9\u4E00-\u9FFF ]+$/.test(username)) {
    showAuthNotice(noticeEl, '用戶名稱只能包含中文字、英文字母、數字和空格。', 'error');
    return;
  }
  if (password.length < 6) {
    showAuthNotice(noticeEl, '密碼至少需要 6 個字元。', 'error');
    return;
  }
  if (password !== confirm) {
    showAuthNotice(noticeEl, '兩次輸入的密碼不一致。', 'error');
    return;
  }

  // 檢查用戶名稱是否已被使用（不分大小寫）
  const { data: nameRows, error: nameErr } = await sb
    .from('profiles')
    .select('username')
    .ilike('username', username);
  if (nameErr) {
    showAuthNotice(noticeEl, '伺服器連線失敗，請稍後再試。', 'error');
    return;
  }
  if (nameRows && nameRows.length > 0) {
    showAuthNotice(noticeEl, '用戶名稱已被使用，請換一個名稱。', 'error');
    return;
  }

  // 取得現有 user_code 清單，避免用戶編碼衝突
  const { data: codeRows, error: codeErr } = await sb.from('profiles').select('user_code');
  if (codeErr) {
    showAuthNotice(noticeEl, '伺服器連線失敗，請稍後再試。', 'error');
    return;
  }
  const takenCodes = (codeRows || []).map(function (r) { return r.user_code; });
  const baseCode = generateUserCode(username);
  const userCode = makeUniqueUserCode(baseCode, takenCodes);

  const { data, error } = await sb.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { username: username, user_code: userCode }
    }
  });

  if (error) {
    const m = (error.message || '').toLowerCase();
    let msg;
    if (/already registered|already been registered|already exists|user_already_exists|email.*(exist|registered)|registered.*email/.test(m)) {
      msg = '此電郵已被註冊。';
    } else if (/duplicate|conflict|unique|user_code/.test(m)) {
      msg = '用戶編碼衝突，請重試。';
    } else if (/rate.?limit|too many|429/.test(m)) {
      msg = '嘗試次數過多，請稍後再試（' + (error.message || '') + '）。';
    } else {
      msg = '註冊失敗：' + (error.message || '請重試。');
    }
    showAuthNotice(noticeEl, msg, 'error');
    return;
  }

  // 顯示生成的用戶代碼（清楚標示）
  const codeEl = document.getElementById('registerUserCode');
  if (codeEl) codeEl.textContent = userCode;
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
  if (noticeEl) showAuthNotice(noticeEl, '註冊成功，請使用密碼登入。', 'success');
}

async function logout() {
  if (!getCurrentUser()) {
    showLoginPage();
    return;
  }
  if (!window.confirm('確定要登出嗎？')) return;
  stopChallenge();
  if (supabaseReady && sb) {
    try {
      await sb.auth.signOut();
    } catch (e) {
      // 登出失敗亦繼續本地清除
    }
  }
  clearWrongCache();
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
    if (noticeEl) showAuthNotice(noticeEl, '請先喺 supabaseConfig.js 填上 Supabase 專案資料。', 'error');
    return;
  }
  try {
    const { data: sessionData } = await sb.auth.getSession();
    const session = sessionData && sessionData.session;
    if (session && session.user) {
      setCurrentUser(session.user);
      await loadWrongQuestions(); // 預先載入錯題快取
      await awardDailyLogin(); // 還原登入狀態 → 每日登入 +10
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

// 讀取排行榜：按積分由高至低排序，回傳 rows 或空陣列
async function loadRanking(limit) {
  if (!supabaseReady || !sb) return [];
  try {
    const { data, error } = await sb
      .from('profiles')
      .select('id, username, user_code, points')
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
  stopChallenge();
  await renderRanking();
  showPage('rankingPage');
}

// 渲染排行榜（每行：名次、用戶名稱、用戶代碼、積分；標示自己）
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
    p.textContent = '暫時未有排行榜資料。';
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
    name.textContent = (row.username || '—') + (isMe ? '（你）' : '');

    const code = document.createElement('span');
    code.className = 'ranking-code';
    code.textContent = row.user_code || '—';

    const pts = document.createElement('span');
    pts.className = 'ranking-points';
    pts.textContent = (typeof row.points === 'number' ? row.points : 0) + ' 分';

    item.appendChild(rank);
    item.appendChild(name);
    item.appendChild(code);
    item.appendChild(pts);
    container.appendChild(item);
  });
}

// ---------- 主題切換 ----------
// 各主題對應的按鈕圖示與提示文字
var THEME_META = {
  light: { icon: '☀️', title: '目前主題：淺色（點擊切換）' },
  dark: { icon: '🌙', title: '目前主題：深色（點擊切換）' },
  warm: { icon: '🌇', title: '目前主題：暖色（點擊切換）' }
};

// 更新單一主題按鈕的圖示與提示文字
function updateThemeButton(name) {
  var btn = document.getElementById('themeCycleBtn');
  if (!btn) return;
  var meta = THEME_META[name] || THEME_META.light;
  btn.textContent = meta.icon;
  btn.title = meta.title;
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

// 依順序循環切換主題：淺色 → 深色 → 暖色 → 淺色
function cycleTheme() {
  var current = document.documentElement.getAttribute('data-theme');
  var next = 'light';
  if (current === 'light') next = 'dark';
  else if (current === 'dark') next = 'warm';
  else if (current === 'warm') next = 'light';
  setTheme(next);
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

// ---------- 初始化 ----------
initTheme();
updateAuthHeader();
initAuth(); // 非同步：檢查登入狀態並載入錯題快取（未設定 Supabase 時會顯示設定提示）
