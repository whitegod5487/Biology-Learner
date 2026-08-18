// app.js
// 生物溫習程式 — 應用程式邏輯（頁面切換、練習模式、挑戰模式、分析頁、前沿科技渲染）

'use strict';

// ---------- 安全合併題庫（檔案缺失時不報錯） ----------
const ALL_QUESTIONS = [...(typeof QB1 !== 'undefined' ? QB1 : []), ...(typeof QB2 !== 'undefined' ? QB2 : []), ...(typeof QB3 !== 'undefined' ? QB3 : [])];

const FRONTIER = typeof FRONTIER_TECH !== 'undefined' ? FRONTIER_TECH : [];
const TOPIC_LIST = typeof TOPICS !== 'undefined' ? TOPICS : [];

// ---------- 狀態變數 ----------
let practiceQuestions = [];
let practiceIndex = 0;
let practiceCorrectCount = 0;
let practiceTopicNo = null;

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

function reasonOf(q, index) {
  if (!q || !Array.isArray(q.reasons)) return '';
  return q.reasons[index] || '';
}

// ---------- 頁面切換 ----------
const PAGE_IDS = [
  'homePage',
  'mcPage',
  'practiceListPage',
  'practiceQuizPage',
  'practiceAnalysisPage',
  'challengePage',
  'challengeAnalysisPage',
  'techPage'
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
  stopChallenge();
  showPage('homePage');
}

function goToMCPage() {
  stopChallenge();
  showPage('mcPage');
}

function goToPracticeMode() {
  stopChallenge();
  renderPracticeTopicList();
  showPage('practiceListPage');
}

function goToChallengeMode() {
  startChallenge();
}

function goToTechPage() {
  stopChallenge();
  renderTechPage();
  showPage('techPage');
}

function exitChallenge() {
  stopChallenge();
  showPage('mcPage');
}

// ---------- 練習模式 ----------
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
  practiceQuestions = qs.slice(0, 20);
  practiceIndex = 0;
  practiceCorrectCount = 0;

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

  meta.textContent = '課題 ' + practiceTopicNo + '　' + topicName(practiceTopicNo) +
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

function answerPractice(selected, opts) {
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
  } else {
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
  line1.textContent = '課題 ' + practiceTopicNo + '　' + topicName(practiceTopicNo);

  const line2 = document.createElement('p');
  line2.className = 'score';
  line2.textContent = '命中率：' + correct + ' / ' + total;

  const line3 = document.createElement('p');
  line3.className = 'score';
  line3.textContent = pct + '%';

  content.appendChild(line1);
  content.appendChild(line2);
  content.appendChild(line3);

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

function finishChallenge() {
  stopChallenge();
  renderChallengeAnalysis();
  showPage('challengeAnalysisPage');
}

function renderChallengeAnalysis() {
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

// ---------- 初始化 ----------
showPage('homePage');
