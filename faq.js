// faq.js
// 生物溫習程式 — 常見問題 FAQ（獨立資料檔，仿照長題目資料檔）
// 資料結構：const FAQ_ITEMS = [ { q: {zh,en}, a: {zh,en}, link?: {url, label:{zh,en}} } ]
// 內容中英雙語（zh-HK / en-UK），由 app.js 的 pickL() 按目前語言自動選用。

const FAQ_ITEMS = [
  {
    q: { zh: '我的資料在資料庫中安全嗎？（數據儲存風險）', en: 'Is my data safe in the database? (data storage risk)' },
    a: { zh: '本應用把你的帳戶資料（分數、錯題、學習進度等）儲存在 Supabase 雲端資料庫。\n風險與保障：\n- 網絡傳輸使用 HTTPS 加密，防止資料在傳送時被竊聽。\n- 資料庫設有存取權限規則，但沒有系統是 100% 安全的。\n- 請勿與他人共用密碼，並使用安全密碼。\n- 你的 DeepSeek API Key 只儲存在你的瀏覽器（localStorage）中，不會上傳到資料庫。\n如你擔心風險，可刪除帳戶或避免儲存敏感個人資料。', en: 'This app stores your account data (points, wrong answers, study progress, etc.) in a Supabase cloud database.\nRisks and protection:\n- Data is transmitted with HTTPS encryption to prevent it being intercepted in transit.\n- The database has access rules, but no system is 100% secure.\n- Do not share your password with others, and use a strong password.\n- Your DeepSeek API key is stored only in your browser (localStorage) and is never uploaded to the database.\nIf you are concerned, you can delete your account or avoid storing sensitive personal information.' }
  },
  {
    q: { zh: '如何使用 DeepSeek API Key？', en: 'How do I use a DeepSeek API key?' },
    a: { zh: '1. 前往 DeepSeek 官方網站註冊帳戶，並在平台建立一個 API Key。\n2. 在應用的「設定」頁面找到「DeepSeek API Key」一欄。\n3. 把你的 API Key 貼上，然後按「儲存」。\n4. 儲存後，長題目與 DSE 試卷中的結構式題目（包括超長題目與論文）提交後會由 DeepSeek 自動批改。\n5. 沒有設定 Key 時，只有選擇題可以自動批改。\n提示：DeepSeek 對 API 使用收費，詳情以官方網站為準。', en: '1. Register an account on the DeepSeek official website and create an API key on the platform.\n2. In the app\'s Settings page, find the "DeepSeek API Key" section.\n3. Paste your API key and press "Save".\n4. Once saved, long questions and the structured questions in the DSE papers (including very long questions and essays) are automatically graded by DeepSeek after submission.\n5. Without a key, only multiple-choice questions can be auto-graded.\nNote: DeepSeek charges for API usage; please refer to the official website for details.' },
    link: { url: 'https://platform.deepseek.com/', label: { zh: '🔗 前往 DeepSeek 官方網站（platform.deepseek.com）', en: '🔗 Go to the DeepSeek official website (platform.deepseek.com)' } }
  },
  {
    q: { zh: '如何獲得分數？', en: 'How do I gain marks?' },
    a: { zh: '你可以透過以下方式獲得分數：\n- 每日登入：+10 分（每日一次）。\n- 挑戰模式：每日第一次測試，每答對一題 +1 分（上限 36 分），全對再額外 +4 分。\n- 任務線：完成課題練習並全對（100/100）：+25 分（每個課題只限一次）。\n分數會記錄在你的帳戶中，並用於排行榜排名。\n注意：練習模式、錯題重溫、DSE 試卷與長題目本身不會直接加分。', en: 'You can gain marks in the following ways:\n- Daily login: +10 points (once per day).\n- Challenge mode: first attempt each day, +1 point per correct answer (max 36 points), +4 extra bonus if you get full marks.\n- Quest line: complete a topic practice with all correct (100/100): +25 points (once per topic).\nYour points are recorded in your account and used for the ranking list.\nNote: practice mode, wrong-question review, DSE papers and long questions do not add points by themselves.' }
  },
  {
    q: { zh: '如何儲存 AI API Key？', en: 'How do I save the AI API key?' },
    a: { zh: '前往「設定」頁面，在「DeepSeek API Key」一欄輸入你的 API Key，然後按「儲存」按鈕。\nAPI Key 會儲存在你瀏覽器的本機儲存（localStorage）中，只存在於這部裝置上，不會上傳到雲端資料庫。\n如要移除，清空輸入框再按「儲存」即可刪除。', en: 'Go to the Settings page, type your API key in the "DeepSeek API Key" field, then press the "Save" button.\nThe API key is stored in your browser\'s local storage (localStorage), only on this device, and is never uploaded to the cloud database.\nTo remove it, clear the input box and press "Save" again.' }
  },
  {
    q: { zh: '分數（積分）是否有用？', en: 'Is the mark (points) useful?' },
    a: { zh: '坦白說：分數（積分）沒有實際用途。❌\n分數只是用來：\n- 在排行榜上與其他使用者比較；\n- 作為學習的遊戲化獎勵，增加動力。\n分數不能兌換任何獎品，亦不代表你的真實考試成績或能力。\n真正有用的是你在練習中學到的知識！', en: 'To be honest: the marks (points) are useless. ❌\nPoints are only used to:\n- compare with other users on the ranking list;\n- act as a gamified reward to keep you motivated.\nPoints cannot be exchanged for any prize, and they do not reflect your real exam results or ability.\nWhat really matters is the knowledge you learn through practice!' }
  },
  {
    q: { zh: '這個應用程式是誰製作的？', en: 'Who made this app?' },
    a: { zh: '一個中學生透過AI協助製作，佢期望生物攞到5。\n香港製造。', en: 'Product made by a secondary student with AI, he hooked that he can get level 5 in HKDSE. \nMade in Hong Kong.' }
  }
];
