// Quy tắc phát âm số hoá từ các sơ đồ tư duy (Oxford phonics).
// Mỗi rule node mang đủ thông tin để hiển thị 1 "thẻ quy tắc" kiểu
// Oxford (khối màu, cây quy tắc) + Feynman (giải thích đơn giản "vì sao").

export type VowelKey = "a" | "e" | "i" | "o" | "u";

export interface RuleExample {
  word: string;
  ipa: string;
  meaning: string;
}

export interface RuleVariant {
  condition: string;
  ipa: string;
  examples: RuleExample[];
}

export type RuleCategory =
  | "vowel"
  | "consonant-digraph"
  | "consonant-conditional"
  | "sight";

export interface RuleNode {
  id: string;
  category: RuleCategory;
  label: string;
  resultIpa?: string;
  howTo: string;
  examples?: RuleExample[];
  variants?: RuleVariant[];
  color: string;
}

export const VOWEL_COLORS: Record<VowelKey, string> = {
  a: "#b5361f",
  e: "#7d3c98",
  i: "#1e8449",
  o: "#1f618d",
  u: "#ca6f1e",
};

// ---------------------------------------------------------------------------
// 1. Quy tắc nguyên âm — mỗi nguyên âm có 3 dạng chính + phụ lục đặc biệt
// ---------------------------------------------------------------------------
export const vowelRules: RuleNode[] = [
  // ---- A ----
  {
    id: "a-cons",
    category: "vowel",
    label: "a + phụ âm",
    resultIpa: "/æ/",
    howTo: "Há miệng rộng, đọc như âm \"a\" ngắn trong tiếng Việt.",
    color: VOWEL_COLORS.a,
    examples: [
      { word: "cat", ipa: "/kæt/", meaning: "con mèo" },
      { word: "hat", ipa: "/hæt/", meaning: "cái mũ" },
      { word: "bag", ipa: "/bæg/", meaning: "cái túi" },
    ],
  },
  {
    id: "a-cons-e",
    category: "vowel",
    label: "a + 1 phụ âm + e",
    resultIpa: "/eɪ/",
    howTo: "Há miệng đọc âm \"ê\", khép dần miệng đọc sang âm \"i\" — e câm ở cuối không đọc, chỉ làm cho a đổi âm.",
    color: VOWEL_COLORS.a,
    examples: [
      { word: "name", ipa: "/neɪm/", meaning: "tên" },
      { word: "cake", ipa: "/keɪk/", meaning: "bánh" },
      { word: "late", ipa: "/leɪt/", meaning: "muộn" },
    ],
  },
  {
    id: "a-r",
    category: "vowel",
    label: "ar",
    resultIpa: "/ɑː/",
    howTo: "Âm đặc biệt nguyên âm + r: r đứng sau nguyên âm không đọc, chỉ kéo dài âm \"a\", cong lưỡi nhẹ.",
    color: VOWEL_COLORS.a,
    examples: [
      { word: "car", ipa: "/kɑː/", meaning: "xe hơi" },
      { word: "star", ipa: "/stɑː/", meaning: "ngôi sao" },
      { word: "farm", ipa: "/fɑːm/", meaning: "trang trại" },
    ],
  },
  {
    id: "are",
    category: "vowel",
    label: "are",
    resultIpa: "/eə/",
    howTo: "Trường hợp đặc biệt của a + re: đọc từ \"ê\" lướt sang \"ơ\", không đọc âm r.",
    color: VOWEL_COLORS.a,
    examples: [
      { word: "care", ipa: "/keə/", meaning: "quan tâm, chăm sóc" },
      { word: "fare", ipa: "/feə/", meaning: "giá vé" },
    ],
  },

  // ---- E ----
  {
    id: "e-cons",
    category: "vowel",
    label: "e + phụ âm",
    resultIpa: "/e/",
    howTo: "Đọc như âm \"e\" trong tiếng Việt, ngắn và dứt khoát.",
    color: VOWEL_COLORS.e,
    examples: [
      { word: "pen", ipa: "/pen/", meaning: "cây bút" },
      { word: "bed", ipa: "/bed/", meaning: "cái giường" },
      { word: "red", ipa: "/red/", meaning: "màu đỏ" },
    ],
  },
  {
    id: "e-cons-e",
    category: "vowel",
    label: "e + 1 phụ âm + e",
    resultIpa: "/iː/",
    howTo: "Há miệng đọc âm \"e\", khép miệng đọc sang \"i\" — đọc như âm \"i\" tiếng Việt nhưng kéo dài.",
    color: VOWEL_COLORS.e,
    examples: [
      { word: "these", ipa: "/ðiːz/", meaning: "những cái này" },
      { word: "scene", ipa: "/siːn/", meaning: "cảnh" },
      { word: "Pete", ipa: "/piːt/", meaning: "tên riêng Pete" },
    ],
  },
  {
    id: "e-r",
    category: "vowel",
    label: "er",
    resultIpa: "/ɜː/",
    howTo: "Âm đặc biệt nguyên âm + r: đọc như âm \"ơ\" tiếng Việt, cong lưỡi, không đọc âm r.",
    color: VOWEL_COLORS.e,
    examples: [
      { word: "her", ipa: "/hɜː/", meaning: "của cô ấy" },
      { word: "term", ipa: "/tɜːm/", meaning: "học kỳ" },
      { word: "fern", ipa: "/fɜːn/", meaning: "cây dương xỉ" },
    ],
  },

  // ---- I ----
  {
    id: "i-cons",
    category: "vowel",
    label: "i + phụ âm",
    resultIpa: "/ɪ/",
    howTo: "Đọc như âm \"i\" trong tiếng Việt nhưng ngắn hơn, bật nhanh.",
    color: VOWEL_COLORS.i,
    examples: [
      { word: "sit", ipa: "/sɪt/", meaning: "ngồi" },
      { word: "big", ipa: "/bɪg/", meaning: "to" },
      { word: "fish", ipa: "/fɪʃ/", meaning: "con cá" },
    ],
  },
  {
    id: "i-cons-e",
    category: "vowel",
    label: "i + 1 phụ âm + e",
    resultIpa: "/aɪ/",
    howTo: "Há miệng đọc âm \"a\", khép miệng đọc sang âm \"i\" — e câm ở cuối không đọc.",
    color: VOWEL_COLORS.i,
    examples: [
      { word: "bike", ipa: "/baɪk/", meaning: "xe đạp" },
      { word: "time", ipa: "/taɪm/", meaning: "thời gian" },
      { word: "five", ipa: "/faɪv/", meaning: "số năm" },
    ],
  },
  {
    id: "i-r",
    category: "vowel",
    label: "ir",
    resultIpa: "/ɜː/",
    howTo: "Âm đặc biệt nguyên âm + r: đọc như âm \"ơ\" tiếng Việt, cong lưỡi, không đọc âm r.",
    color: VOWEL_COLORS.i,
    examples: [
      { word: "bird", ipa: "/bɜːd/", meaning: "con chim" },
      { word: "shirt", ipa: "/ʃɜːt/", meaning: "áo sơ mi" },
      { word: "girl", ipa: "/gɜːl/", meaning: "cô gái" },
    ],
  },

  // ---- O ----
  {
    id: "o-cons",
    category: "vowel",
    label: "o + phụ âm",
    resultIpa: "/ɒ/",
    howTo: "Đọc như âm \"o\" trong tiếng Việt, tròn môi, ngắn.",
    color: VOWEL_COLORS.o,
    examples: [
      { word: "hot", ipa: "/hɒt/", meaning: "nóng" },
      { word: "dog", ipa: "/dɒg/", meaning: "con chó" },
      { word: "box", ipa: "/bɒks/", meaning: "cái hộp" },
    ],
  },
  {
    id: "o-cons-e",
    category: "vowel",
    label: "o + 1 phụ âm + e",
    resultIpa: "/əʊ/",
    howTo: "Há miệng đọc âm \"ơ\", khép miệng đọc sang âm \"u\" — e câm ở cuối không đọc.",
    color: VOWEL_COLORS.o,
    examples: [
      { word: "home", ipa: "/həʊm/", meaning: "nhà" },
      { word: "nose", ipa: "/nəʊz/", meaning: "mũi" },
      { word: "rope", ipa: "/rəʊp/", meaning: "sợi dây thừng" },
    ],
  },
  {
    id: "o-r",
    category: "vowel",
    label: "or",
    resultIpa: "/ɔː/",
    howTo: "Âm đặc biệt nguyên âm + r: đọc như âm \"o\" kéo dài, tròn môi, cong lưỡi, không đọc âm r.",
    color: VOWEL_COLORS.o,
    examples: [
      { word: "fork", ipa: "/fɔːk/", meaning: "cái nĩa" },
      { word: "short", ipa: "/ʃɔːt/", meaning: "ngắn" },
      { word: "horse", ipa: "/hɔːs/", meaning: "con ngựa" },
    ],
  },
  {
    id: "ow-oa",
    category: "vowel",
    label: "ow / oa (1 âm tiết)",
    resultIpa: "/əʊ/",
    howTo: "Cách viết \"ow\" hoặc \"oa\" trong từ 1 âm tiết đọc giống hệt \"o + phụ âm + e\": há \"ơ\" khép \"u\".",
    color: VOWEL_COLORS.o,
    examples: [
      { word: "slow", ipa: "/sləʊ/", meaning: "chậm" },
      { word: "show", ipa: "/ʃəʊ/", meaning: "trình diễn" },
      { word: "boat", ipa: "/bəʊt/", meaning: "thuyền" },
    ],
  },
  {
    id: "o-ld-st",
    category: "vowel",
    label: "o đứng trước -ld / -st",
    resultIpa: "/əʊ/",
    howTo: "Khi \"o\" đứng ngay trước cụm \"-ld\" hoặc \"-st\" cuối từ, o đọc dài thành /əʊ/ dù không có e câm.",
    color: VOWEL_COLORS.o,
    examples: [
      { word: "old", ipa: "/əʊld/", meaning: "già, cũ" },
      { word: "cold", ipa: "/kəʊld/", meaning: "lạnh" },
      { word: "most", ipa: "/məʊst/", meaning: "nhiều nhất" },
      { word: "ghost", ipa: "/gəʊst/", meaning: "con ma" },
    ],
  },

  // ---- U ----
  {
    id: "u-cons",
    category: "vowel",
    label: "u + phụ âm",
    resultIpa: "/ʌ/",
    howTo: "Đọc như âm \"ă\" trong tiếng Việt, bật nhanh và ngắn.",
    color: VOWEL_COLORS.u,
    examples: [
      { word: "sun", ipa: "/sʌn/", meaning: "mặt trời" },
      { word: "bus", ipa: "/bʌs/", meaning: "xe buýt" },
      { word: "cup", ipa: "/kʌp/", meaning: "cái cốc" },
    ],
  },
  {
    id: "u-cons-e",
    category: "vowel",
    label: "u + 1 phụ âm + e",
    resultIpa: "/juː/ hoặc /uː/",
    howTo: "Nếu trước u có âm /j/ (như cube, cute) đọc lướt \"j\" sang \"u\" kéo dài: /juː/. Nếu không có /j/ (như flute, rule) chỉ đọc \"u\" kéo dài: /uː/.",
    color: VOWEL_COLORS.u,
    examples: [
      { word: "cube", ipa: "/kjuːb/", meaning: "khối lập phương" },
      { word: "June", ipa: "/dʒuːn/", meaning: "tháng Sáu" },
      { word: "flute", ipa: "/fluːt/", meaning: "cây sáo" },
    ],
  },
  {
    id: "u-r",
    category: "vowel",
    label: "ur",
    resultIpa: "/ɜː/",
    howTo: "Âm đặc biệt nguyên âm + r: đọc như âm \"ơ\" tiếng Việt, cong lưỡi, không đọc âm r.",
    color: VOWEL_COLORS.u,
    examples: [
      { word: "turn", ipa: "/tɜːn/", meaning: "quay" },
      { word: "burn", ipa: "/bɜːn/", meaning: "cháy" },
      { word: "nurse", ipa: "/nɜːs/", meaning: "y tá" },
    ],
  },
];

// ---------------------------------------------------------------------------
// 2. Phụ âm luôn giữ nguyên (mặt chữ viết thế nào thì mặt đọc như vậy)
// ---------------------------------------------------------------------------
export const alwaysSameConsonants: { letter: string; ipa: string }[] = [
  { letter: "b", ipa: "/b/" },
  { letter: "p", ipa: "/p/" },
  { letter: "m", ipa: "/m/" },
  { letter: "f", ipa: "/f/" },
  { letter: "h", ipa: "/h/" },
  { letter: "r", ipa: "/r/" },
  { letter: "k", ipa: "/k/" },
  { letter: "l", ipa: "/l/" },
  { letter: "v", ipa: "/v/" },
  { letter: "z", ipa: "/z/" },
  { letter: "w", ipa: "/w/" },
  { letter: "tr", ipa: "/tr/" },
];

// ---------------------------------------------------------------------------
// 3. Tổ hợp phụ âm có cách đọc cố định (không đổi theo ngữ cảnh)
// ---------------------------------------------------------------------------
export const digraphConsonants: RuleNode[] = [
  {
    id: "cons-j",
    category: "consonant-digraph",
    label: "j",
    resultIpa: "/dʒ/",
    howTo: "Luôn đọc là /dʒ/, giống âm \"chờ\" rung nhẹ dây thanh.",
    color: "#117864",
    examples: [{ word: "jam", ipa: "/dʒæm/", meaning: "mứt" }, { word: "joy", ipa: "/dʒɔɪ/", meaning: "niềm vui" }],
  },
  {
    id: "cons-ch",
    category: "consonant-digraph",
    label: "ch",
    resultIpa: "/tʃ/",
    howTo: "Luôn đọc là /tʃ/, giống âm \"chờ\" bật hơi, không rung dây thanh.",
    color: "#117864",
    examples: [{ word: "chair", ipa: "/tʃeə/", meaning: "cái ghế" }, { word: "church", ipa: "/tʃɜːtʃ/", meaning: "nhà thờ" }],
  },
  {
    id: "cons-sh",
    category: "consonant-digraph",
    label: "sh",
    resultIpa: "/ʃ/",
    howTo: "Luôn đọc là /ʃ/, giống âm \"suỵt\" (suỵt yên lặng).",
    color: "#117864",
    examples: [{ word: "ship", ipa: "/ʃɪp/", meaning: "tàu thuỷ" }, { word: "shoe", ipa: "/ʃuː/", meaning: "giày" }],
  },
  {
    id: "cons-ph",
    category: "consonant-digraph",
    label: "ph",
    resultIpa: "/f/",
    howTo: "Luôn đọc là /f/, giống hệt chữ f.",
    color: "#117864",
    examples: [{ word: "phone", ipa: "/fəʊn/", meaning: "điện thoại" }, { word: "photo", ipa: "/ˈfəʊtəʊ/", meaning: "ảnh" }],
  },
  {
    id: "cons-wh",
    category: "consonant-digraph",
    label: "wh",
    resultIpa: "/w/",
    howTo: "Luôn đọc là /w/, môi tròn bật hơi nhẹ như chữ w.",
    color: "#117864",
    examples: [{ word: "what", ipa: "/wɒt/", meaning: "cái gì" }, { word: "when", ipa: "/wen/", meaning: "khi nào" }],
  },
  {
    id: "cons-qu",
    category: "consonant-digraph",
    label: "qu",
    resultIpa: "/kw/",
    howTo: "Luôn đọc là /kw/, đọc \"k\" rồi lướt nhanh sang \"w\".",
    color: "#117864",
    examples: [{ word: "queen", ipa: "/kwiːn/", meaning: "nữ hoàng" }, { word: "quick", ipa: "/kwɪk/", meaning: "nhanh" }],
  },
  {
    id: "cons-y",
    category: "consonant-digraph",
    label: "y (đứng đầu từ)",
    resultIpa: "/j/",
    howTo: "Khi đứng đầu từ, y luôn đọc là /j/ (giống \"z\" nhẹ lướt).",
    color: "#117864",
    examples: [{ word: "yes", ipa: "/jes/", meaning: "vâng" }, { word: "yellow", ipa: "/ˈjeləʊ/", meaning: "màu vàng" }],
  },
  {
    id: "cons-th",
    category: "consonant-digraph",
    label: "th",
    resultIpa: "/θ/ hoặc /ð/",
    howTo: "Luôn đọc bằng cách đặt đầu lưỡi giữa hai hàm răng: /θ/ không rung dây thanh, /ð/ có rung dây thanh.",
    color: "#117864",
    examples: [{ word: "think", ipa: "/θɪŋk/", meaning: "suy nghĩ" }, { word: "this", ipa: "/ðɪs/", meaning: "cái này" }],
  },
];

// ---------------------------------------------------------------------------
// 4. Phụ âm thay đổi cách đọc theo ngữ cảnh
// ---------------------------------------------------------------------------
export const conditionalConsonants: RuleNode[] = [
  {
    id: "cons-c",
    category: "consonant-conditional",
    label: "c",
    howTo: "Nhìn chữ cái đứng ngay sau c để biết đọc /s/ hay /k/.",
    color: "#a04000",
    variants: [
      {
        condition: "khi c đứng trước e, i, y",
        ipa: "/s/",
        examples: [{ word: "city", ipa: "/ˈsɪti/", meaning: "thành phố" }, { word: "cycle", ipa: "/ˈsaɪkəl/", meaning: "chu kỳ" }],
      },
      {
        condition: "khi c không đứng trước e, i, y",
        ipa: "/k/",
        examples: [{ word: "cat", ipa: "/kæt/", meaning: "con mèo" }, { word: "cup", ipa: "/kʌp/", meaning: "cái cốc" }],
      },
    ],
  },
  {
    id: "cons-x",
    category: "consonant-conditional",
    label: "x",
    howTo: "x đứng cuối từ luôn đọc thành cụm 2 âm /ks/.",
    color: "#a04000",
    variants: [
      {
        condition: "x đứng cuối từ",
        ipa: "/ks/",
        examples: [{ word: "box", ipa: "/bɒks/", meaning: "cái hộp" }, { word: "fox", ipa: "/fɒks/", meaning: "con cáo" }],
      },
    ],
  },
  {
    id: "cons-ng",
    category: "consonant-conditional",
    label: "ng / nk",
    howTo: "n đứng trước k hoặc g thì mũi hoá thành /ŋ/, không bật hơi đầu lưỡi như /n/ thường.",
    color: "#a04000",
    variants: [
      {
        condition: "ng đứng cuối từ",
        ipa: "/ŋ/",
        examples: [{ word: "sing", ipa: "/sɪŋ/", meaning: "hát" }, { word: "long", ipa: "/lɒŋ/", meaning: "dài" }],
      },
      {
        condition: "n đứng trước k (nk)",
        ipa: "/ŋk/",
        examples: [{ word: "bank", ipa: "/bæŋk/", meaning: "ngân hàng" }, { word: "think", ipa: "/θɪŋk/", meaning: "suy nghĩ" }],
      },
      {
        condition: "n không đứng trước k, g",
        ipa: "/n/",
        examples: [{ word: "sun", ipa: "/sʌn/", meaning: "mặt trời" }],
      },
    ],
  },
  {
    id: "cons-double",
    category: "consonant-conditional",
    label: "2 phụ âm giống nhau đứng liền nhau",
    howTo: "Khi phiên âm, 2 chữ cái phụ âm giống nhau đứng cạnh nhau chỉ đọc 1 lần, không đọc lặp lại.",
    color: "#a04000",
    variants: [
      {
        condition: "letter + letter giống nhau",
        ipa: "chỉ đọc 1 âm",
        examples: [
          { word: "letter", ipa: "/ˈletə/", meaning: "lá thư (không phải /ˈlet.tə/)" },
          { word: "butter", ipa: "/ˈbʌtə/", meaning: "bơ (không phải /ˈbʌt.tə/)" },
        ],
      },
    ],
  },
  {
    id: "cons-s",
    category: "consonant-conditional",
    label: "s",
    howTo: "s đứng giữa hai nguyên âm sẽ rung dây thanh, đọc thành /z/ thay vì /s/.",
    color: "#a04000",
    variants: [
      {
        condition: "s đứng giữa 2 nguyên âm",
        ipa: "/z/",
        examples: [{ word: "easy", ipa: "/ˈiːzi/", meaning: "dễ" }, { word: "reason", ipa: "/ˈriːzn/", meaning: "lý do" }],
      },
      {
        condition: "s ở các vị trí khác",
        ipa: "/s/",
        examples: [{ word: "sun", ipa: "/sʌn/", meaning: "mặt trời" }],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 5. Sight words — từ phổ biến không theo quy tắc, phải học thuộc cách đọc
// ---------------------------------------------------------------------------
export const sightWords: { word: string; ipa: string }[] = [
  { word: "the", ipa: "/ðə/" },
  { word: "a", ipa: "/ə/" },
  { word: "his", ipa: "/hɪz/" },
  { word: "has", ipa: "/hæz/" },
  { word: "have", ipa: "/hæv/" },
  { word: "was", ipa: "/wɒz/" },
  { word: "us", ipa: "/əs/" },
  { word: "of", ipa: "/əv/" },
];

export const allVowelRules = vowelRules;
export const allDigraphRules = digraphConsonants;
export const allConditionalRules = conditionalConsonants;

export function findRuleById(id: string): RuleNode | undefined {
  return [...vowelRules, ...digraphConsonants, ...conditionalConsonants].find((r) => r.id === id);
}
