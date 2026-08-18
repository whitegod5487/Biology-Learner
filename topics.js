// topics.js
// HKDSE 生物科 — 37 課題清單（來源：content-spec.md 第 2 節）
// 每項結構：{ no: 課題編號, name: 課題名稱（繁體中文，與 content-spec.md 完全一致） }

const TOPICS = [
  { no: 1, name: "生物學入門" },
  { no: 2, name: "生命分子" },
  { no: 3, name: "細胞組織" },
  { no: 4, name: "物質穿越細胞膜的活動" },
  { no: 5, name: "新陳代謝與酶" },
  { no: 6, name: "食物與人類" },
  { no: 7, name: "人的營養" },
  { no: 8, name: "人體的氣體交換" },
  { no: 9, name: "人體內物質的轉運" },
  { no: 10, name: "植物的營養與氣體交換" },
  { no: 11, name: "植物的蒸騰、轉運與支持" },
  { no: 12, name: "細胞週期與細胞分裂" },
  { no: 13, name: "有花植物的生殖" },
  { no: 14, name: "人的生殖" },
  { no: 15, name: "生長與發育" },
  { no: 16, name: "刺激、感受器與反應" },
  { no: 17, name: "人體的協調" },
  { no: 18, name: "人體的運動" },
  { no: 19, name: "體內平衡" },
  { no: 20, name: "生態系" },
  { no: 21, name: "光合作用" },
  { no: 22, name: "呼吸作用" },
  { no: 23, name: "個人健康與傳染病" },
  { no: 24, name: "非傳染病與疾病的預防" },
  { no: 25, name: "身體的防禦機制" },
  { no: 26, name: "基礎遺傳學" },
  { no: 27, name: "分子遺傳學" },
  { no: 28, name: "生物工程" },
  { no: 29, name: "生物多樣性" },
  { no: 30, name: "生命的起源與進化的證據" },
  { no: 31, name: "進化的機制與物種形成" },
  { no: 32, name: "體温調節" },
  { no: 33, name: "水份調節" },
  { no: 34, name: "血液內氣體成分的調節" },
  { no: 35, name: "生殖週期的激素控制" },
  { no: 36, name: "人類對環境的影響" },
  { no: 37, name: "污染控制與保育" }
];

// ---------- 課本分冊（BOOKS） ----------
// 每項結構：{ id: 分冊編號, name: 顯示名稱, chapters: 涵蓋課題編號陣列, range: 章節範圍（顯示用） }
const BOOKS = [
  { id: "1A", name: "課本 1A", chapters: [1, 2, 3, 4, 5], range: "第 01–05 章" },
  { id: "1B", name: "課本 1B", chapters: [6, 7, 8, 9], range: "第 06–09 章" },
  { id: "2A", name: "課本 2A", chapters: [10, 11, 12, 13, 14, 15], range: "第 10–15 章" },
  { id: "2B", name: "課本 2B", chapters: [16, 17, 18, 19], range: "第 16–19 章" },
  { id: "2C", name: "課本 2C", chapters: [20, 21, 22], range: "第 20–22 章" },
  { id: "3", name: "課本 3", chapters: [23, 24, 25], range: "第 23–25 章" },
  { id: "4", name: "課本 4", chapters: [26, 27, 28, 29, 30, 31], range: "第 26–31 章" },
  { id: "5", name: "課本 5", chapters: [32, 33, 34], range: "第 32–34 章" },
  { id: "6", name: "課本 6", chapters: [35, 36, 37], range: "第 35–37 章" }
];
