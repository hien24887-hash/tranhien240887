// Bài luyện đọc theo phiên âm IPA (module "Đọc truyện"), xếp theo 5 cấp độ
// dễ → khó giống hệt ngân hàng từ ở words.ts. Mỗi câu là 1 mảng token; mỗi
// token là 1 từ (không kèm dấu câu) để so khớp giọng nói chính xác. `punct`
// (nếu có) chỉ dùng để hiển thị dấu câu sau từ, không ảnh hưởng khi chấm đọc.
//
// 8 bài đầu tiên được viết tay đầy đủ (giữ nguyên như bản gốc). Từ đó trở đi,
// các bài được dựng từ 1 từ điển tra cứu (ghép từ words.ts + connectors.ts)
// để đảm bảo phiên âm luôn khớp chính xác với ngân hàng từ luyện viết phiên
// âm — tránh gõ tay phiên âm nhiều lần dễ sai sót khi số lượng bài lớn.

import { wordBank, type Difficulty } from "./words";
import { connectors } from "./connectors";

export interface StoryToken {
  text: string;
  ipa: string;
  ruleId?: string;
  punct?: string;
}

export interface Story {
  id: string;
  title: string;
  level: string;
  difficulty: Difficulty;
  sentences: StoryToken[][];
}

const handWritten: Story[] = [
  {
    id: "white-bike",
    title: "The White Bike",
    level: "Cấp 2 — trọng tâm quy tắc i + 1 phụ âm + e → /aɪ/",
    difficulty: 2,
    sentences: [
      [
        { text: "I", ipa: "/aɪ/" },
        { text: "have", ipa: "/hæv/" },
        { text: "a", ipa: "/ə/" },
        { text: "white", ipa: "/waɪt/", ruleId: "i-cons-e" },
        { text: "bike", ipa: "/baɪk/", ruleId: "i-cons-e", punct: "." },
      ],
      [
        { text: "I", ipa: "/aɪ/" },
        { text: "like", ipa: "/laɪk/", ruleId: "i-cons-e" },
        { text: "to", ipa: "/tə/" },
        { text: "ride", ipa: "/raɪd/", ruleId: "i-cons-e" },
        { text: "my", ipa: "/maɪ/" },
        { text: "bike", ipa: "/baɪk/", ruleId: "i-cons-e" },
        { text: "in", ipa: "/ɪn/" },
        { text: "the", ipa: "/ðə/" },
        { text: "park", ipa: "/pɑːk/", ruleId: "a-r", punct: "." },
      ],
      [
        { text: "The", ipa: "/ðə/" },
        { text: "bike", ipa: "/baɪk/", ruleId: "i-cons-e" },
        { text: "is", ipa: "/ɪz/" },
        { text: "mine", ipa: "/maɪn/", ruleId: "i-cons-e", punct: "." },
      ],
    ],
  },
  {
    id: "kate-and-jane",
    title: "Kate and Jane",
    level: "Cấp 2 — trọng tâm quy tắc a + 1 phụ âm + e → /eɪ/",
    difficulty: 2,
    sentences: [
      [
        { text: "Kate", ipa: "/keɪt/", ruleId: "a-cons-e" },
        { text: "and", ipa: "/ænd/" },
        { text: "Jane", ipa: "/dʒeɪn/", ruleId: "a-cons-e" },
        { text: "play", ipa: "/pleɪ/" },
        { text: "a", ipa: "/ə/" },
        { text: "game", ipa: "/geɪm/", ruleId: "a-cons-e", punct: "." },
      ],
      [
        { text: "They", ipa: "/ðeɪ/" },
        { text: "make", ipa: "/meɪk/", ruleId: "a-cons-e" },
        { text: "the", ipa: "/ðə/" },
        { text: "same", ipa: "/seɪm/", ruleId: "a-cons-e" },
        { text: "team", ipa: "/tiːm/", punct: "." },
      ],
      [
        { text: "Kate", ipa: "/keɪt/", ruleId: "a-cons-e" },
        { text: "is", ipa: "/ɪz/" },
        { text: "brave", ipa: "/breɪv/", ruleId: "a-cons-e" },
        { text: "and", ipa: "/ænd/" },
        { text: "Jane", ipa: "/dʒeɪn/", ruleId: "a-cons-e" },
        { text: "is", ipa: "/ɪz/" },
        { text: "safe", ipa: "/seɪf/", ruleId: "a-cons-e", punct: "." },
      ],
    ],
  },
  {
    id: "old-story",
    title: "The Old Story",
    level: "Cấp 3 — trọng tâm ow/oa và o trước -ld/-st → /əʊ/",
    difficulty: 3,
    sentences: [
      [
        { text: "The", ipa: "/ðə/" },
        { text: "old", ipa: "/əʊld/", ruleId: "o-ld-st" },
        { text: "man", ipa: "/mæn/" },
        { text: "told", ipa: "/təʊld/", ruleId: "o-ld-st" },
        { text: "me", ipa: "/miː/", ruleId: "e-cons-e" },
        { text: "a", ipa: "/ə/" },
        { text: "story", ipa: "/ˈstɔːri/", punct: "." },
      ],
      [
        { text: "He", ipa: "/hiː/" },
        { text: "was", ipa: "/wɒz/" },
        { text: "cold", ipa: "/kəʊld/", ruleId: "o-ld-st" },
        { text: "so", ipa: "/səʊ/" },
        { text: "he", ipa: "/hiː/" },
        { text: "wore", ipa: "/wɔː/", ruleId: "o-r" },
        { text: "a", ipa: "/ə/" },
        { text: "yellow", ipa: "/ˈjeləʊ/", ruleId: "ow-oa" },
        { text: "coat", ipa: "/kəʊt/", ruleId: "ow-oa", punct: "." },
      ],
      [
        { text: "Slowly", ipa: "/ˈsləʊli/", ruleId: "ow-oa" },
        { text: "he", ipa: "/hiː/" },
        { text: "showed", ipa: "/ʃəʊd/", ruleId: "ow-oa" },
        { text: "me", ipa: "/miː/", ruleId: "e-cons-e" },
        { text: "an", ipa: "/ən/" },
        { text: "old", ipa: "/əʊld/", ruleId: "o-ld-st" },
        { text: "gold", ipa: "/gəʊld/", ruleId: "o-ld-st" },
        { text: "coin", ipa: "/kɔɪn/", punct: "." },
      ],
    ],
  },
  {
    id: "big-wet-hen",
    title: "A Big Wet Hen",
    level: "Cấp 1 — trọng tâm nguyên âm ngắn a/e/i/o/u + phụ âm",
    difficulty: 1,
    sentences: [
      [
        { text: "The", ipa: "/ðə/" },
        { text: "hen", ipa: "/hen/", ruleId: "e-cons" },
        { text: "has", ipa: "/hæz/" },
        { text: "a", ipa: "/ə/" },
        { text: "big", ipa: "/bɪg/", ruleId: "i-cons" },
        { text: "nest", ipa: "/nest/", ruleId: "e-cons", punct: "." },
      ],
      [
        { text: "She", ipa: "/ʃiː/" },
        { text: "sits", ipa: "/sɪts/", ruleId: "i-cons" },
        { text: "on", ipa: "/ɒn/", ruleId: "o-cons" },
        { text: "six", ipa: "/sɪks/", ruleId: "i-cons" },
        { text: "eggs", ipa: "/egz/", ruleId: "cons-s", punct: "." },
      ],
      [
        { text: "The", ipa: "/ðə/" },
        { text: "eggs", ipa: "/egz/", ruleId: "cons-s" },
        { text: "are", ipa: "/ɑː/", ruleId: "a-r" },
        { text: "wet", ipa: "/wet/", ruleId: "e-cons" },
        { text: "but", ipa: "/bʌt/", ruleId: "u-cons" },
        { text: "not", ipa: "/nɒt/", ruleId: "o-cons" },
        { text: "hot", ipa: "/hɒt/", ruleId: "o-cons", punct: "." },
      ],
    ],
  },
  {
    id: "fox-in-a-box",
    title: "The Fox in a Box",
    level: "Cấp 4 — trọng tâm x → /ks/ và phụ âm đôi",
    difficulty: 4,
    sentences: [
      [
        { text: "A", ipa: "/ə/" },
        { text: "fox", ipa: "/fɒks/", ruleId: "cons-x" },
        { text: "sits", ipa: "/sɪts/", ruleId: "i-cons" },
        { text: "in", ipa: "/ɪn/" },
        { text: "a", ipa: "/ə/" },
        { text: "box", ipa: "/bɒks/", ruleId: "cons-x", punct: "." },
      ],
      [
        { text: "The", ipa: "/ðə/" },
        { text: "fox", ipa: "/fɒks/", ruleId: "cons-x" },
        { text: "is", ipa: "/ɪz/" },
        { text: "not", ipa: "/nɒt/", ruleId: "o-cons" },
        { text: "big", ipa: "/bɪg/", ruleId: "i-cons" },
        { text: "but", ipa: "/bʌt/", ruleId: "u-cons" },
        { text: "the", ipa: "/ðə/" },
        { text: "box", ipa: "/bɒks/", ruleId: "cons-x", punct: "." },
      ],
      [
        { text: "The", ipa: "/ðə/" },
        { text: "little", ipa: "/ˈlɪtəl/", ruleId: "cons-double" },
        { text: "fox", ipa: "/fɒks/", ruleId: "cons-x" },
        { text: "naps", ipa: "/næps/", ruleId: "a-cons" },
        { text: "in", ipa: "/ɪn/" },
        { text: "the", ipa: "/ðə/" },
        { text: "box", ipa: "/bɒks/", ruleId: "cons-x", punct: "." },
      ],
    ],
  },
  {
    id: "ships-and-chips",
    title: "Ships and Chips",
    level: "Cấp 4 — trọng tâm tổ hợp phụ âm ch/sh/th/wh/qu",
    difficulty: 4,
    sentences: [
      [
        { text: "What", ipa: "/wɒt/", ruleId: "cons-wh" },
        { text: "is", ipa: "/ɪz/" },
        { text: "this", ipa: "/ðɪs/", ruleId: "cons-th" },
        { text: "ship", ipa: "/ʃɪp/", ruleId: "cons-sh", punct: "?" },
      ],
      [
        { text: "The", ipa: "/ðə/" },
        { text: "queen", ipa: "/kwiːn/", ruleId: "cons-qu" },
        { text: "has", ipa: "/hæz/" },
        { text: "chips", ipa: "/tʃɪps/", ruleId: "cons-ch" },
        { text: "on", ipa: "/ɒn/", ruleId: "o-cons" },
        { text: "the", ipa: "/ðə/" },
        { text: "ship", ipa: "/ʃɪp/", ruleId: "cons-sh", punct: "." },
      ],
      [
        { text: "We", ipa: "/wiː/" },
        { text: "think", ipa: "/θɪŋk/", ruleId: "cons-th" },
        { text: "the", ipa: "/ðə/" },
        { text: "chips", ipa: "/tʃɪps/", ruleId: "cons-ch" },
        { text: "are", ipa: "/ɑː/", ruleId: "a-r" },
        { text: "hot", ipa: "/hɒt/", ruleId: "o-cons", punct: "." },
      ],
    ],
  },
  {
    id: "turn-bird-star",
    title: "Turn, Bird, and Star",
    level: "Cấp 3 — trọng tâm âm r-hoá ar/er/ir/or/ur",
    difficulty: 3,
    sentences: [
      [
        { text: "A", ipa: "/ə/" },
        { text: "star", ipa: "/stɑː/", ruleId: "a-r" },
        { text: "is", ipa: "/ɪz/" },
        { text: "far", ipa: "/fɑː/", ruleId: "a-r" },
        { text: "from", ipa: "/frɒm/", ruleId: "o-cons" },
        { text: "the", ipa: "/ðə/" },
        { text: "car", ipa: "/kɑː/", ruleId: "a-r", punct: "." },
      ],
      [
        { text: "The", ipa: "/ðə/" },
        { text: "bird", ipa: "/bɜːd/", ruleId: "i-r" },
        { text: "can", ipa: "/kæn/", ruleId: "a-cons" },
        { text: "turn", ipa: "/tɜːn/", ruleId: "u-r" },
        { text: "and", ipa: "/ænd/" },
        { text: "burn", ipa: "/bɜːn/", ruleId: "u-r", punct: "." },
      ],
      [
        { text: "Her", ipa: "/hɜː/", ruleId: "e-r" },
        { text: "shirt", ipa: "/ʃɜːt/", ruleId: "i-r" },
        { text: "is", ipa: "/ɪz/" },
        { text: "short", ipa: "/ʃɔːt/", ruleId: "o-r", punct: "." },
      ],
    ],
  },
  {
    id: "junes-huge-flute",
    title: "June's Huge Flute",
    level: "Cấp 2 — trọng tâm u + 1 phụ âm + e → /juː/ hoặc /uː/",
    difficulty: 2,
    sentences: [
      [
        { text: "June", ipa: "/dʒuːn/", ruleId: "u-cons-e" },
        { text: "has", ipa: "/hæz/" },
        { text: "a", ipa: "/ə/" },
        { text: "cute", ipa: "/kjuːt/", ruleId: "u-cons-e" },
        { text: "tune", ipa: "/tuːn/", ruleId: "u-cons-e", punct: "." },
      ],
      [
        { text: "She", ipa: "/ʃiː/" },
        { text: "plays", ipa: "/pleɪz/", ruleId: "a-cons-e" },
        { text: "a", ipa: "/ə/" },
        { text: "huge", ipa: "/hjuːdʒ/", ruleId: "u-cons-e" },
        { text: "flute", ipa: "/fluːt/", ruleId: "u-cons-e", punct: "." },
      ],
      [
        { text: "The", ipa: "/ðə/" },
        { text: "flute", ipa: "/fluːt/", ruleId: "u-cons-e" },
        { text: "and", ipa: "/ænd/" },
        { text: "the", ipa: "/ðə/" },
        { text: "tune", ipa: "/tuːn/", ruleId: "u-cons-e" },
        { text: "are", ipa: "/ɑː/", ruleId: "a-r" },
        { text: "cute", ipa: "/kjuːt/", ruleId: "u-cons-e", punct: "." },
      ],
    ],
  },
];

// ---------------------------------------------------------------------------
// Từ điển tra cứu phiên âm dùng để dựng hàng loạt bài đọc ngắn bên dưới —
// ghép từ ngân hàng từ luyện viết phiên âm (words.ts, có ruleId để hiện gợi ý
// sửa lỗi) và từ nối (connectors.ts, không có ruleId).
// ---------------------------------------------------------------------------
interface LookupEntry {
  ipa: string;
  ruleId?: string;
}

const lookup: Record<string, LookupEntry> = {};
for (const w of wordBank) {
  lookup[w.word.toLowerCase()] = { ipa: w.ipa, ruleId: w.ruleId || undefined };
}
for (const [word, ipa] of Object.entries(connectors)) {
  const key = word.toLowerCase();
  if (!lookup[key]) lookup[key] = { ipa };
}

function tok(rawWord: string): StoryToken {
  const match = rawWord.match(/^([A-Za-z]+)([.,!?]?)$/);
  const clean = match ? match[1] : rawWord;
  const punct = match?.[2] || undefined;
  const entry = lookup[clean.toLowerCase()];
  if (!entry) {
    // Giúp phát hiện ngay khi thiếu phiên âm cho 1 từ mới thêm vào câu.
    console.error(`[stories.ts] Thiếu phiên âm cho từ: "${rawWord}"`);
  }
  return { text: clean, ipa: entry?.ipa ?? "/?/", ruleId: entry?.ruleId, punct };
}

function sentence(text: string): StoryToken[] {
  return text.split(" ").map(tok);
}

function mini(
  id: string,
  title: string,
  level: string,
  difficulty: Difficulty,
  texts: string[]
): Story {
  return { id, title, level, difficulty, sentences: texts.map(sentence) };
}

// ---------------------------------------------------------------------------
// Cấp 1 — nguyên âm ngắn CVC (dựng từ các nhóm từ đã học ở Cấp 1)
// ---------------------------------------------------------------------------
const L1 = "Cấp 1 — nguyên âm ngắn CVC";
const level1Stories: Story[] = [
  mini("t1-fat-cat", "The Fat Cat", L1, 1, ["The fat cat sat on the mat."]),
  mini("t1-rat-bat", "A Rat and a Bat", L1, 1, ["A rat and a bat sat on a hat."]),
  mini("t1-pat-cat", "Pat the Cat", L1, 1, ["Pat can pat the cat."]),
  mini("t1-man-cat", "The Man and the Cat", L1, 1, ["The man has a fat cat."]),
  mini("t1-not-bat", "Not a Bat", L1, 1, ["It is not a bat."]),
  mini("t1-big-rat", "A Big Rat", L1, 1, ["The rat is big but fat."]),
  mini("t1-red-hen", "The Red Hen", L1, 1, ["The red hen has a nest."]),
  mini("t1-ten-men", "Ten Men", L1, 1, ["Ten men sat in the den."]),
  mini("t1-wet-bed", "The Wet Bed", L1, 1, ["The bed is wet."]),
  mini("t1-pen-nest", "A Pen in the Nest", L1, 1, ["A pen is in the nest."]),
  mini("t1-his-leg", "His Leg", L1, 1, ["His leg is red."]),
  mini("t1-hen-den", "The Hen in the Den", L1, 1, ["The red hen is in the den."]),
  mini("t1-big-pig", "The Big Pig", L1, 1, ["The big pig can sit."]),
  mini("t1-dig-pit", "Dig a Pit", L1, 1, ["The pig will dig a big pit."]),
  mini("t1-fit-not-big", "Fit but Not Big", L1, 1, ["The pig is fit but not big."]),
  mini("t1-hit-it", "I Will Hit It", L1, 1, ["I will hit it."]),
  mini("t1-sit-pit", "Sit in the Pit", L1, 1, ["The pig will sit in the pit."]),
  mini("t1-dig-pig", "Dig, Pig, Dig!", L1, 1, ["Dig, pig, dig!"]),
  mini("t1-hot-pot", "The Hot Pot", L1, 1, ["The pot is hot."]),
  mini("t1-dog-log", "A Dog on a Log", L1, 1, ["A dog sat on a log."]),
  mini("t1-jog-lot", "Jog a Lot", L1, 1, ["The dog will jog a lot."]),
  mini("t1-not-dot", "Not a Dot", L1, 1, ["It is a dot, not a lot."]),
  mini("t1-dog-cot", "The Dog in the Cot", L1, 1, ["The dog is in the cot."]),
  mini("t1-hot-dog-jog", "Hot Dog Jog", L1, 1, ["The hot dog will jog."]),
  mini("t1-fun-sun", "Fun in the Sun", L1, 1, ["We run and have fun in the sun."]),
  mini("t1-cut-nut", "Cut the Nut", L1, 1, ["I can cut the nut."]),
  mini("t1-hut-fun", "A Hut", L1, 1, ["The hut is not big but fun."]),
  mini("t1-run-sun", "Run, Run, Run!", L1, 1, ["Run, run, run in the sun!"]),
  mini("t1-nut-hut", "The Nut in the Hut", L1, 1, ["A nut is in the hut."]),
  mini("t1-sun-fun", "Fun but Not Hot", L1, 1, ["The sun is hot but the fun is not."]),
  mini("t1-lot-fun", "A Lot of Fun", L1, 1, ["He has a lot of fun."]),
  mini("t1-was-us", "It Was Us", L1, 1, ["It was us."]),
  mini("t1-his-hat", "His Hat", L1, 1, ["He has his hat."]),
  mini("t1-cat-hat", "The Cat and the Hat", L1, 1, ["The cat has the hat."]),
];

// ---------------------------------------------------------------------------
// Cấp 2 — nguyên âm dài "phụ âm + e câm"
// ---------------------------------------------------------------------------
const L2 = "Cấp 2 — nguyên âm dài phụ âm + e câm";
const level2Stories: Story[] = [
  mini("t2-nine-kites", "Nine Kites", L2, 2, ["I like to fly nine kites."]),
  mini("t2-white-bike2", "I Like My Bike", L2, 2, ["I like my bike.", "My bike is white."]),
  mini("t2-time-ride", "Time to Ride", L2, 2, ["It is time to ride my bike."]),
  mini("t2-nine-five", "Nine and Five", L2, 2, ["Nine is fine, five is fine too."]),
  mini("t2-hide-seek", "Hide and Seek", L2, 2, ["I will hide.", "Can you see me?"]),
  mini("t2-wife-ride", "My Wife and I", L2, 2, ["My wife and I ride a bike."]),
  mini("t2-write-down", "Write It Down", L2, 2, ["I will write it down."]),
  mini("t2-pipe-side", "A Pipe on the Side", L2, 2, ["The pipe is on the side."]),
  mini("t2-bite-time", "Bite Time", L2, 2, ["It is time to bite."]),
  mini("t2-same-game", "Same Game", L2, 2, ["We play the same game."]),
  mini("t2-brave-mate", "A Brave Mate", L2, 2, ["My mate is brave and safe."]),
  mini("t2-late-date", "Late for the Date", L2, 2, ["I am late for the date."]),
  mini("t2-save-cave", "The Cave", L2, 2, ["We save time in the cave."]),
  mini("t2-made-grade", "A Good Grade", L2, 2, ["I made the grade."]),
  mini("t2-space-place", "Space and Place", L2, 2, ["This place has a lot of space."]),
  mini("t2-trade-name", "Trade for a Name", L2, 2, ["We trade in this place."]),
  mini("t2-wave-shade", "Wave and Shade", L2, 2, ["She will wave from the shade."]),
  mini("t2-pete-theme", "Pete's Theme", L2, 2, ["Pete has a theme."]),
  mini("t2-these-me", "These Are for Me", L2, 2, ["These are for me."]),
  mini("t2-scene-pete", "The Scene", L2, 2, ["The scene is for Pete."]),
  mini("t2-hope-home", "Home Sweet Home", L2, 2, ["I hope to go home."]),
  mini("t2-joke-note", "A Joke and a Note", L2, 2, ["He wrote a joke in the note."]),
  mini("t2-dog-bone", "The Dog and the Bone", L2, 2, ["The dog has a bone at home."]),
  mini("t2-hole-rope", "A Hole in the Rope", L2, 2, ["There is a hole in the rope."]),
  mini("t2-rode-home", "He Rode Home", L2, 2, ["He rode home on his bike."]),
  mini("t2-code-know", "The Code", L2, 2, ["I hope to know the code."]),
  mini("t2-cute-mule", "A Cute Mule", L2, 2, ["The mule is cute."]),
  mini("t2-use-rule", "Use the Rule", L2, 2, ["We use this rule."]),
  mini("t2-huge-cube", "A Huge Cube", L2, 2, ["This cube is huge."]),
  mini("t2-june-tune", "June's Tune", L2, 2, ["June has a tune to use."]),
];

// ---------------------------------------------------------------------------
// Cấp 3 — âm r-hoá (ar/er/ir/or/ur/are) + ow/oa + o trước -ld/-st
// ---------------------------------------------------------------------------
const L3 = "Cấp 3 — âm r-hoá và ow/oa";
const level3Stories: Story[] = [
  mini("t3-dark-farm", "A Dark Farm", L3, 3, ["The farm is dark."]),
  mini("t3-star-park", "A Star in the Park", L3, 3, ["I see a star in the park."]),
  mini("t3-shark-far", "The Shark is Far", L3, 3, ["The shark is far from the car."]),
  mini("t3-spark-far", "A Spark", L3, 3, ["The spark is not far."]),
  mini("t3-arm-car", "My Arm", L3, 3, ["My arm is not far from the car."]),
  mini("t3-horse-corn", "The Horse and the Corn", L3, 3, ["The horse has corn."]),
  mini("t3-short-fork", "A Short Fork", L3, 3, ["This fork is short."]),
  mini("t3-storm-north", "A Storm up North", L3, 3, ["The storm is up north."]),
  mini("t3-born-sport", "Born for Sport", L3, 3, ["He was born for sport."]),
  mini("t3-her-fern", "Her Fern", L3, 3, ["This fern is not for her."]),
  mini("t3-herd", "A Herd", L3, 3, ["She has a herd."]),
  mini("t3-term-verb", "A New Term", L3, 3, ["This term has a verb."]),
  mini("t3-girl-bird", "The Girl and the Bird", L3, 3, ["The girl has a bird."]),
  mini("t3-shirt-dirt", "A Shirt in the Dirt", L3, 3, ["Her shirt is in the dirt."]),
  mini("t3-first-third", "First and Third", L3, 3, ["She was first, not third."]),
  mini("t3-nurse-turn", "The Nurse", L3, 3, ["The nurse can turn it."]),
  mini("t3-surf-curl", "Surf and Curl", L3, 3, ["We surf and the wave will curl."]),
  mini("t3-burn-hurt", "Do Not Burn", L3, 3, ["Do not burn it, it will hurt."]),
  mini("t3-share-care", "Share and Care", L3, 3, ["We share and we care."]),
  mini("t3-dare-share", "I Dare You", L3, 3, ["I dare you to share."]),
  mini("t3-fare", "The Fare", L3, 3, ["The fare is not much."]),
  mini("t3-old-boat", "The Old Boat", L3, 3, ["The old boat is slow."]),
  mini("t3-cold-ghost", "A Cold Ghost", L3, 3, ["The ghost told me it was cold."]),
  mini("t3-gold-coat", "Gold Coat", L3, 3, ["He has a gold coat."]),
  mini("t3-most-show", "Most of the Show", L3, 3, ["I saw most of the show."]),
  mini("t3-old-posts", "Old Posts", L3, 3, ["These are old posts."]),
];

// ---------------------------------------------------------------------------
// Cấp 4 — tổ hợp phụ âm cố định/biến đổi + cụm phụ âm đầu (blends)
// ---------------------------------------------------------------------------
const L4 = "Cấp 4 — tổ hợp phụ âm và cụm phụ âm đầu";
const level4Stories: Story[] = [
  mini("t4-chat-much", "Much Chat", L4, 4, ["We chat a lot but not much."]),
  mini("t4-rich-chip", "A Rich Chip", L4, 4, ["This chip is rich."]),
  mini("t4-fish-shop", "The Fish Shop", L4, 4, ["The shop has a fish."]),
  mini("t4-wish-shut", "Wish and Shut", L4, 4, ["I wish the shop was not shut."]),
  mini("t4-thud", "That Thud", L4, 4, ["That was a big thud."]),
  mini("t4-math-that", "More Math", L4, 4, ["I like math, not that."]),
  mini("t4-phone-graph", "Phone and Graph", L4, 4, ["I have a phone and a graph."]),
  mini("t4-which-wheel", "Which Wheel?", L4, 4, ["Which wheel do you like?"]),
  mini("t4-when-wheel", "When the Wheel Turns", L4, 4, ["When will the wheel turn?"]),
  mini("t4-quit-quiz", "Quit the Quiz", L4, 4, ["I will quit this quiz."]),
  mini("t4-quack-quilt", "A Quack and a Quilt", L4, 4, ["I have a quilt, not a quack."]),
  mini("t4-jet-jug", "The Jet and the Jug", L4, 4, ["I see a jet and a jug."]),
  mini("t4-yak-yam", "Yak and Yam", L4, 4, ["The yak has a yam."]),
  mini("t4-cell-cent-cab", "Cell, Cent, Cab", L4, 4, ["I have a cell, a cent, and a cab."]),
  mini("t4-fix-mix", "Fix and Mix", L4, 4, ["I will fix it, then mix it."]),
  mini("t4-sing-ring", "Sing and Ring", L4, 4, ["She will sing with a ring and think."]),
  mini("t4-pink-sink", "Pink Sink", L4, 4, ["The sink is pink, I think."]),
  mini("t4-rose-us", "The Rose", L4, 4, ["This rose is not for us."]),
  mini("t4-stop-spot", "Stop and Spot", L4, 4, ["Stop at the spot!"]),
  mini("t4-black-block", "Black Block", L4, 4, ["This block is black."]),
  mini("t4-drop-drum", "Drop and Drum", L4, 4, ["Do not drop the drum."]),
  mini("t4-frog-log", "Frog on a Log", L4, 4, ["The frog sat on a log."]),
  mini("t4-clap-snap", "Clap and Snap", L4, 4, ["Clap, then snap!"]),
  mini("t4-crab-trap", "The Crab Trap", L4, 4, ["The crab is not in the trap."]),
  mini("t4-glad-plan", "Glad to Plan", L4, 4, ["I am glad to plan this."]),
  mini("t4-spin-swim", "Spin and Swim", L4, 4, ["I like to spin and swim."]),
  mini("t4-trip-brick", "Trip to the Brick Place", L4, 4, ["This trip is to a brick place."]),
  mini("t4-plum-drum", "Plum and Drum", L4, 4, ["I have a plum and a drum."]),
];

// ---------------------------------------------------------------------------
// Cấp 5 — từ nhiều âm tiết / bất quy tắc cần học thuộc
// ---------------------------------------------------------------------------
const L5 = "Cấp 5 — từ nhiều âm tiết và bất quy tắc";
const level5Stories: Story[] = [
  mini("t5-rabbit-apple", "Under the Apple", L5, 5, ["The rabbit is under the apple."]),
  mini("t5-father-mother", "Father and Mother", L5, 5, ["My father and my mother are here."]),
  mini("t5-sister-water", "My Sister", L5, 5, ["My sister has water."]),
  mini("t5-animal-over", "The Animal", L5, 5, ["This animal is over there."]),
  mini("t5-elephant", "An Elephant", L5, 5, ["The elephant is a big animal."]),
  mini("t5-together", "Together", L5, 5, ["We go together."]),
  mini("t5-yesterday", "Yesterday", L5, 5, ["Yesterday was cold."]),
  mini("t5-morning-evening", "Morning and Evening", L5, 5, [
    "In the morning and in the evening, I have fun.",
  ]),
  mini("t5-breakfast", "Breakfast", L5, 5, ["I have breakfast in the morning."]),
  mini("t5-birthday", "Birthday", L5, 5, ["This is my birthday."]),
  mini("t5-weekend-farm", "Weekend at the Farm", L5, 5, ["This weekend, we go to the farm."]),
  mini("t5-everyone", "Everyone", L5, 5, ["Everyone has fun."]),
  mini("t5-something-nothing", "Something and Nothing", L5, 5, [
    "I have something, not nothing.",
  ]),
  mini("t5-i-know-yellow", "I Know", L5, 5, ["I know it is yellow."]),
  mini("t5-tomorrow", "Tomorrow", L5, 5, ["Tomorrow, I will know."]),
];

export const stories: Story[] = [
  ...handWritten,
  ...level1Stories,
  ...level2Stories,
  ...level3Stories,
  ...level4Stories,
  ...level5Stories,
];

export function findStory(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}
