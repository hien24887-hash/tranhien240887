// Mục "Luyện đọc 50 ngày" — dựng từ các bài đọc có tranh minh hoạ + phiên âm
// IPA do người dùng cung cấp (2 file PDF = 2 bài đọc hoàn chỉnh). Giữ đúng
// phiên âm gốc được cung cấp (chỉ chuẩn hoá dấu ":" thành ký hiệu kéo dài
// IPA chuẩn "ː").
//
// `dayDefs` bên dưới chia theo từng đoạn nhỏ (mỗi từ mới/đoạn ôn tập) chỉ để
// dễ đối chiếu với bố cục gốc của file PDF — khi xuất ra `dailyReadingDays`,
// các đoạn thuộc cùng 1 file PDF được GỘP LẠI thành đúng 1 bài đọc hoàn
// chỉnh (không tách thành nhiều ngày/nhiều câu riêng lẻ).
//
// Hiện có đủ nội dung cho NGÀY 1–2 (ứng với 2 file PDF); khung sườn hỗ trợ
// tới 50 ngày, sẽ bổ sung thêm khi có thêm bài đọc mới.

import type { Story } from "./stories";

interface DayToken {
  text: string;
  ipa: string;
  punct?: string;
}

function cleanIpaWord(raw: string): string {
  return raw
    .replace(/[.,!?]+$/, "")
    .replace(/:/g, "ː")
    .replace(/^\/+|\/+$/g, "");
}

// Ghép 1 dòng tiếng Anh với dòng phiên âm IPA tương ứng (đúng thứ tự từ) —
// tách dấu câu cuối từ ra field `punct` riêng để không ảnh hưởng khi chấm
// đọc bằng giọng nói.
function zip(englishLine: string, ipaLine: string): DayToken[] {
  const engWords = englishLine.trim().split(/\s+/).filter(Boolean);
  const ipaWords = ipaLine.trim().split(/\s+/).filter(Boolean);
  const tokens: DayToken[] = [];
  const n = Math.max(engWords.length, ipaWords.length);
  for (let i = 0; i < n; i++) {
    const engRaw = engWords[i] ?? "";
    const match = engRaw.match(/^([A-Za-z']+)([.,!?]*)$/);
    const text = match ? match[1] : engRaw.replace(/[.,!?]+$/, "");
    const punct = match?.[2] || undefined;
    if (!text) continue;
    const ipaClean = cleanIpaWord(ipaWords[i] ?? "");
    tokens.push({ text, ipa: ipaClean ? `/${ipaClean}/` : "/?/", punct });
  }
  return tokens;
}

interface DayDef {
  day: number;
  title: string;
  lines: [string, string][]; // [câu tiếng Anh, câu phiên âm IPA]
}

const dayDefs: DayDef[] = [
  {
    day: 1,
    title: "Apple",
    lines: [
      ["What's this? Apple.", "wɒts ðɪs? ˈæpəl."],
      ["This is an apple.", "ðɪs ɪz ən ˈæpəl."],
      ["We eat apples.", "wiː iːt ˈæpəlz."],
    ],
  },
  {
    day: 2,
    title: "Bird",
    lines: [
      ["What's this? Bird.", "wɒts ðɪs? bɜːd."],
      ["This is a little bird and it's sitting on a fence.", "ðɪs ɪz ə ˈlɪtəl bɜːd ænd ɪts ˈsɪtɪŋ ɒn ə fens."],
      ["Bird.", "bɜːd."],
    ],
  },
  {
    day: 3,
    title: "Hat",
    lines: [
      ["What's this? Hat.", "wɒts ðɪs? hæt."],
      ["The hat sits on our head.", "ðə hæt sɪts ɒn ˈaʊə hed."],
      ["Hat.", "hæt."],
    ],
  },
  {
    day: 4,
    title: "Book",
    lines: [
      ["What's this? Book.", "wɒts ðɪs? bʊk."],
      ["This is a book.", "ðɪs ɪz ə bʊk."],
      ["And has pages that turn.", "ænd hæz ˈpeɪʤəz ðæt tɜːn."],
      ["Book.", "bʊk."],
    ],
  },
  {
    day: 5,
    title: "Car",
    lines: [
      ["What's this? Car?", "wɒts ðɪs? kɑː?"],
      ["The car drives on the road.", "ðə kɑː draɪvz ɒn ðə rəʊd."],
      ["This is a car.", "ðɪs ɪz ə kɑː."],
    ],
  },
  {
    day: 6,
    title: "Balloon",
    lines: [
      ["What's this? Balloon.", "wɒts ðɪs? bəˈluːn."],
      ["There are several balloons here.", "ðeə ɑː ˈsevrəl bəˈluːnz hiə."],
      ["And they're very pretty colours.", "ænd ðeə ˈveri ˈprɪti ˈkʌlərz."],
      ["I like balloons.", "aɪ laɪk bəˈluːnz."],
    ],
  },
  {
    day: 7,
    title: "Baby",
    lines: [
      ["What's this? Baby?", "wɒts ðɪs? ˈbeɪbi?"],
      ["This is a baby and he's sitting on the ground.", "ðɪs ɪz ə ˈbeɪbi ænd hiz ˈsɪtɪŋ ɒn ðə ɡraʊnd."],
    ],
  },
  {
    day: 8,
    title: "Cake",
    lines: [
      ["What's this? Cake.", "wɒts ðɪs? keɪk."],
      ["I like to eat cake.", "aɪ laɪk tuː iːt keɪk."],
      ["Cake.", "keɪk."],
    ],
  },
  {
    day: 9,
    title: "Leaf",
    lines: [
      ["What's this? Leaf?", "wɒts ðɪs? liːf?"],
      ["Leafs are in trees.", "liːfs ɑː ɪn triːz."],
      ["This one has fallen to the ground.", "ðɪs wʌn hæz ˈfɔːlən tuː ðə ɡraʊnd."],
      ["Leaf.", "liːf."],
    ],
  },
  {
    day: 10,
    title: "Cat",
    lines: [
      ["What's this? Cat.", "wɒts ðɪs? kæt."],
      ["Cats have whiskers on their nose.", "kæts hæv ˈwɪskəz ɒn ðeə nəʊz."],
      ["This is a black cat.", "ðɪs ɪz ə blæk kæt."],
      ["Cat.", "kæt."],
    ],
  },
  {
    day: 11,
    title: "Ôn tập: Apple & Bird",
    lines: [
      ["Apples. Green apples are my favorite.", "ˈæpəlz. ɡriːn ˈæpəlz ɑː maɪ ˈfeɪvərɪt."],
      ["This one is a big green apple.", "ðɪs wʌn ɪz ə bɪɡ ɡriːn ˈæpəl."],
      ["And here we have a little bird. Birds sing.", "ænd hiə wiː hæv ə ˈlɪtəl bɜːd. bɜːdz sɪŋ."],
      ["Apples taste delicious. Would you like an apple?", "ˈæpəlz teɪst dɪˈlɪʃəs. wʊd juː laɪk ən ˈæpəl?"],
    ],
  },
  {
    day: 12,
    title: "Ôn tập: Hat & Book",
    lines: [
      ["Hat. I have no hat.", "hæt. aɪ hæv nəʊ hæt."],
      ["This man is wearing a nice black hat.", "ðɪs mæn ɪz ˈweərɪŋ ə naɪs blæk hæt."],
      ["And here is a book.", "ænd hiə ɪz ə bʊk."],
      ["When you read a book, don't wear your hat.", "wen juː riːd ə bʊk dəʊnt weə jɔː hæt."],
      ["This is my book. Do you have a book?", "ðɪs ɪz maɪ bʊk. duː juː hæv ə bʊk?"],
    ],
  },
  {
    day: 13,
    title: "Ôn tập: Car",
    lines: [
      ["This is not my car.", "ðɪs ɪz nɒt maɪ kɑː."],
      ["I wish it was my car.", "aɪ wɪʃ ɪt wɒz maɪ kɑː."],
      ["This is a cute yellow car.", "ðɪs ɪz ə kjuːt ˈjeləʊ kɑː."],
    ],
  },
  {
    day: 14,
    title: "Ôn tập: Balloon, Baby, Cake",
    lines: [
      ["And balloons. Yellow car. Yellow balloons.", "ænd bəˈluːnz. ˈjeləʊ kɑː. ˈjeləʊ bəˈluːnz."],
      ["We can have a celebration with balloons.", "wiː kæn hæv ə ˌseləˈbreɪʃən wɪð bəˈluːnz."],
      [
        "We can celebrate a birthday with balloons and a birthday cake.",
        "wiː kæn ˈseləˌbreɪt ə ˈbɜːθˌdeɪ wɪð bəˈluːnz ænd ə ˈbɜːθˌdeɪ keɪk.",
      ],
      ["We can celebrate getting good grades with a cake.", "wiː kæn ˈseləˌbreɪt ˈɡetɪŋ ɡʊd ɡreɪdz wɪð ə keɪk."],
      ["Baby. What a cute baby.", "ˈbeɪbi. wɒt ə kjuːt ˈbeɪbi."],
    ],
  },
  {
    day: 15,
    title: "Ôn tập: Leaf & Cat",
    lines: [
      ["Leaf. This leaf is green and orange and yellow.", "liːf. ðɪs liːf ɪz ɡriːn ænd ˈɔːrənʤ ænd ˈjeləʊ."],
      ["This is an autumn leaf. Cat. Black cats. Cat.", "ðɪs ɪz ən ˈɔːtəm liːf. kæt. blæk kæts. kæt."],
      ["This cat does not eat leaves.", "ðɪs kæt dʌz nɒt iːt liːvz."],
      ["Do you have a cat?", "duː juː hæv ə kæt?"],
    ],
  },
  {
    day: 16,
    title: "Bug",
    lines: [
      ["What's this? Bug.", "wɒts ðɪs? bʌɡ."],
      ["Bugs can be kind of creepy.", "bʌɡz kæn biː kaɪnd ɒv ˈkriːpi."],
      ["They have legs and they're small.", "ðeɪ hæv leɡz ænd ðeə smɔːl."],
      ["Bug.", "bʌɡ."],
    ],
  },
  {
    day: 17,
    title: "Dog",
    lines: [
      ["What's this? Dog.", "wɒts ðɪs? dɒɡ."],
      ["Dogs have long ears and they're really soft to pet.", "dɒɡz hæv lɒŋ ɪəz ænd ðeə ˈrɪəli sɒft tuː pet."],
      ["Dog.", "dɒɡ."],
    ],
  },
  {
    day: 18,
    title: "Berry",
    lines: [
      ["What's this? Berry.", "wɒts ðɪs? ˈberi."],
      ["Berries are.", "ˈberiz ɑː."],
      ["They're good to eat.", "ðeə ɡʊd tuː iːt."],
      ["Berry.", "ˈberi."],
    ],
  },
  {
    day: 19,
    title: "Moon",
    lines: [
      ["What's this? The moon.", "wɒts ðɪs? ðə muːn."],
      ["Moon is in the sky at night.", "muːn ɪz ɪn ðə skaɪ æt naɪt."],
      ["Moon.", "muːn."],
    ],
  },
  {
    day: 20,
    title: "Horse",
    lines: [
      ["What's this? Horse.", "wɒts ðɪs? hɔːs."],
      ["Horses are fun to ride on the back of.", "ˈhɔːsɪz ɑː fʌn tuː raɪd ɒn ðə bæk ɒv."],
      ["This is a brown horse.", "ðɪs ɪz ə braʊn hɔːs."],
      ["Horse.", "hɔːs."],
    ],
  },
  {
    day: 21,
    title: "Pen",
    lines: [
      ["What's this? Pen.", "wɒts ðɪs? pen."],
      ["We use pens to write on paper.", "wiː juːz penz tuː raɪt ɒn ˈpeɪpə."],
      ["Pen.", "pen."],
    ],
  },
  {
    day: 22,
    title: "Shoes",
    lines: [
      ["What's this? Shoes.", "wɒts ðɪs? ʃuːz."],
      ["Shoes? Go on our feet.", "ʃuːz? ɡəʊ ɒn ˈaʊə fiːt."],
      ["These are shoes.", "ðiːz ɑː ʃuːz."],
    ],
  },
  {
    day: 23,
    title: "House",
    lines: [
      ["What's this? House.", "wɒts ðɪs? haʊs."],
      [
        "We live in houses and there are doors and windows.",
        "wiː lɪv ɪn ˈhaʊzɪz ænd ðeər ɑː dɔːz ænd ˈwɪndəʊz.",
      ],
      ["This is a house.", "ðɪs ɪz ə haʊs."],
    ],
  },
  {
    day: 24,
    title: "Pig",
    lines: [
      ["What's this? Pig.", "wɒts ðɪs? pɪɡ."],
      ["Pigs are pink and have big noses.", "pɪɡz ɑː pɪŋk ænd hæv bɪɡ ˈnəʊzɪz."],
      ["Nose.", "nəʊz."],
      ["This is a pig.", "ðɪs ɪz ə pɪɡ."],
    ],
  },
  {
    day: 25,
    title: "Tree",
    lines: [
      ["What's this? Tree?", "wɒts ðɪs? triː?"],
      ["The tree has green leaves and is very tall.", "ðə triː hæz ɡriːn liːvz ænd ɪz ˈveri tɔːl."],
    ],
  },
  {
    day: 26,
    title: "Ôn tập: Tree, Dog, Bug, Moon",
    lines: [
      ["This is a tree.", "ðɪs ɪz ə triː."],
      ["I like dogs. Dogs are nice pets.", "aɪ laɪk dɒɡz. dɒɡz ɑː naɪs pets."],
      ["Bugs. I don't like bugs that much.", "bʌɡz. aɪ dəʊnt laɪk bʌɡz ðæt mʌtʃ."],
      ["You don't want to pet a bug, but you can pet your dog.", "juː dəʊnt wɒnt tuː pet ə bʌɡ bʌt juː kæn pet jɔː dɒɡ."],
      ["Dogs make nice pets. Watch out for bugs.", "dɒɡz meɪk naɪs pets. wɒtʃ aʊt fɔː bʌɡz."],
      ["What's next?", "wɒts nekst?"],
      ["Some nights the moon is full and beautiful.", "sʌm naɪts ðə muːn ɪz fʊl ænd ˈbjuːtɪfəl."],
      ["This is a full moon.", "ðɪs ɪz ə fʊl muːn."],
    ],
  },
  {
    day: 27,
    title: "Ôn tập: Moon & Horse",
    lines: [
      ["On a night with a full moon.", "ɒn ə naɪt wɪð ə fʊl muːn."],
      [
        "Take some berries outside and eat your berries under the moon.",
        "teɪk sʌm ˈberiz ˌaʊtˈsaɪd ænd iːt jɔː ˈberiz ˈʌndə ðə muːn.",
      ],
      ["Berries and moon. They kind of go together.", "ˈberiz ænd muːn. ðeɪ kaɪnd ɒv ɡəʊ təˈɡeðə."],
      ["Now what?", "naʊ wɒt?"],
      ["I have a horse. This is my horse.", "aɪ hæv ə hɔːs. ðɪs ɪz maɪ hɔːs."],
    ],
  },
  {
    day: 28,
    title: "Ôn tập: Horse & Pen",
    lines: [
      [
        "My horse is brown and he has white on his head and on his feet.",
        "maɪ hɔːs ɪz braʊn ænd hiː hæz waɪt ɒn hɪz hed ænd ɒn hɪz fiːt.",
      ],
      ["I like to ride my horse.", "aɪ laɪk tuː raɪd maɪ hɔːs."],
      ["I also have a pen.", "aɪ ˈɔːlsəʊ hæv ə pen."],
      ["I don't ride my pen. I write with my pen.", "aɪ dəʊnt raɪd maɪ pen. aɪ raɪt wɪð maɪ pen."],
      ["I write with my pen on this paper.", "aɪ raɪt wɪð maɪ pen ɒn ðɪs ˈpeɪpə."],
      ["Brown horse. Red pen.", "braʊn hɔːs. red pen."],
      ["Don't forget. Ride the horse right. With the pen.", "dəʊnt fəˈɡet. raɪd ðə hɔːs raɪt. wɪð ðə pen."],
    ],
  },
  {
    day: 29,
    title: "Ôn tập: Shoes & House",
    lines: [
      ["Do you wear shoes in the house?", "duː juː weə ʃuːz ɪn ðə haʊs?"],
      [
        "If you wear shoes in the house, make sure they have no dirt on them.",
        "ɪf juː weə ʃuːz ɪn ðə haʊs meɪk ʃʊə ðeɪ hæv nəʊ dɜːt ɒn ðem.",
      ],
      ["Do you like these shoes?", "duː juː laɪk ðiːz ʃuːz?"],
      ["Yellow and white and yellow house.", "ˈjeləʊ ænd waɪt ænd ˈjeləʊ haʊs."],
    ],
  },
  {
    day: 30,
    title: "Ôn tập: Pig & Tree",
    lines: [
      ["They kind of match.", "ðeɪ kaɪnd ɒv mætʃ."],
      ["Just be careful about shoes in the house.", "dʒʌst biː ˈkeəfəl əˈbaʊt ʃuːz ɪn ðə haʊs."],
      ["Pigs are pink and they like to sleep.", "pɪɡz ɑː pɪŋk ænd ðeɪ laɪk tuː sliːp."],
      ["Sometimes they sleep under a tree.", "ˈsʌmtaɪmz ðeɪ sliːp ˈʌndər ə triː."],
      [
        "Trees are green and make lots of shade so the pigs can sleep under the trees.",
        "triːz ɑː ɡriːn ænd meɪk lɒts ɒv ʃeɪd səʊ ðə pɪɡz kæn sliːp ˈʌndə ðə triːz.",
      ],
      ["Make sure you don't sleep under the tree.", "meɪk ʃʊə juː dəʊnt sliːp ˈʌndə ðə triː."],
    ],
  },
];

// Bài đọc 3 (dk-3-ipa.pdf) — Spoon, Stars, Tissue, Toilet, Train, Trumpet,
// Wallet, Watch, Yarn, Zipper.
const passage3Lines: [string, string][] = [
  ["You.", "juː."],
  ["What's this? Spoon?", "wɒts ðɪs? spuːn?"],
  ["We eat with the spoon.", "wiː iːt wɪð ðə spuːn."],
  ["Spoon.", "spuːn."],
  ["What's this? Stars.", "wɒts ðɪs? stɑːz."],
  ["There are stars up in the sky.", "ðeər ɑː stɑːz ʌp ɪn ðə skaɪ."],
  ["You can look at the stars.", "juː kæn lʊk æt ðə stɑːz."],
  ["You.", "juː."],
  ["What's this? Tissue.", "wɒts ðɪs? ˈtɪʃuː."],
  ["You can use tissue to wipe your nose.", "juː kæn juːz ˈtɪʃuː tuː waɪp jɔː nəʊz."],
  ["Tissue.", "ˈtɪʃuː."],
  ["What's this? Toilet.", "wɒts ðɪs? ˈtɔɪlət."],
  ["We all know what the toilet is.", "wiː ɔːl nəʊ wɒt ðə ˈtɔɪlət ɪz."],
  ["Toilet.", "ˈtɔɪlət."],
  ["What's this? Train.", "wɒts ðɪs? treɪn."],
  [
    "The train pulls the cars at the back and goes along on the track.",
    "ðə treɪn pʊlz ðə kɑːz æt ðə bæk ænd ɡəʊz əˈlɒŋ ɒn ðə træk.",
  ],
  ["Train.", "treɪn."],
  ["What's this? Trumpet.", "wɒts ðɪs? ˈtrʌmpɪt."],
  ["Trumpet is an instrument that you play.", "ˈtrʌmpɪt ɪz ən ˈɪnstrəmənt ðæt juː pleɪ."],
  ["It's a trumpet.", "ɪts ə ˈtrʌmpɪt."],
  ["What's this? Wallet.", "wɒts ðɪs? ˈwɒlɪt."],
  ["The wallet goes in your pocket and it has money.", "ðə ˈwɒlɪt ɡəʊz ɪn jɔː ˈpɒkɪt ænd ɪt hæz ˈmʌni."],
  ["Money inside the wallet.", "ˈmʌni ɪnˈsaɪd ðə ˈwɒlɪt."],
  ["What's this? Watch.", "wɒts ðɪs? wɒʧ."],
  [
    "The watch goes on your wrist and you can tell the time on the watch.",
    "ðə wɒʧ ɡəʊz ɒn jɔː rɪst ænd juː kæn tel ðə taɪm ɒn ðə wɒʧ.",
  ],
  ["What's this? Yarn?", "wɒts ðɪs? jɑːn?"],
  ["Yarn is long string and it's different colors.", "jɑːn ɪz lɒŋ strɪŋ ænd ɪts ˈdɪfərənt ˈkʌləz."],
  ["Yarn.", "jɑːn."],
  ["What's this? Zipper.", "wɒts ðɪs? ˈzɪpə."],
  [
    "The zipper goes zip up your clothes to keep them closed or to open them.",
    "ðə ˈzɪpə ɡəʊz zɪp ʌp jɔː kləʊðz tuː kiːp ðem kləʊzd ɔː tuː ˈəʊpən ðem.",
  ],
  ["Zipper.", "ˈzɪpə."],
  ["Let me show you my spoon.", "let miː ʃəʊ juː maɪ spuːn."],
  ["My spoon is silver.", "maɪ spuːn ɪz ˈsɪlvə."],
  ["I eat my food with my spoon.", "aɪ iːt maɪ fuːd wɪð maɪ spuːn."],
  ["The stars sometimes look silver.", "ðə stɑːz ˈsʌmtaɪmz lʊk ˈsɪlvə."],
  ["There is only one spoon, but there are many stars.", "ðeər ɪz ˈəʊnli wʌn spuːn bʌt ðeər ɑː ˈmeni stɑːz."],
  ["Do not eat the stars with your spoon.", "duː nɒt iːt ðə stɑːz wɪð jɔː spuːn."],
  ["Eat food with your spoon and gaze at the stars.", "iːt fuːd wɪð jɔː spuːn ænd ɡeɪz æt ðə stɑːz."],
  ["What's next?", "wɒts nekst?"],
  [
    "Two things you need when you have a cold, use a tissue and you know when to use the toilet.",
    "tuː θɪŋz juː niːd wen juː hæv ə kəʊld juːz ə ˈtɪʃuː ænd juː nəʊ wen tuː juːz ðə ˈtɔɪlət.",
  ],
  ["Two things you need.", "tuː θɪŋz juː niːd."],
  ["Tissues and toilet.", "ˈtɪʃuːz ænd ˈtɔɪlət."],
  ["Trains.", "treɪnz."],
  ["Have you ever ridden on a train?", "hæv juː ˈevə ˈrɪdən ɒn ə treɪn?"],
  ["They are really fun.", "ðeɪ ɑː ˈrɪəli fʌn."],
  ["Trains make a sound that goes toot toot.", "treɪnz meɪk ə saʊnd ðæt ɡəʊz tuːt tuːt."],
  ["And so does a trumpet.", "ænd səʊ dʌz ə ˈtrʌmpɪt."],
  ["A trumpet is an instrument that makes a sound.", "ə ˈtrʌmpɪt ɪz ən ˈɪnstrəmənt ðæt meɪks ə saʊnd."],
  ["Kind of like a train.", "kaɪnd ɒv laɪk ə treɪn."],
  ["Sometimes you ride on a train, you play a trumpet.", "ˈsʌmtaɪmz juː raɪd ɒn ə treɪn juː pleɪ ə ˈtrʌmpɪt."],
  ["Don't forget trains and trumpets.", "dəʊnt fəˈɡet treɪnz ænd ˈtrʌmpɪts."],
  ["Wallet.", "ˈwɒlɪt."],
  ["A wallet is something you keep money in.", "ə ˈwɒlɪt ɪz ˈsʌmθɪŋ juː kiːp ˈmʌni ɪn."],
  ["I keep money in my wallet when I have money.", "aɪ kiːp ˈmʌni ɪn maɪ ˈwɒlɪt wen aɪ hæv ˈmʌni."],
  ["And a watch is something that tells you what time.", "ænd ə wɒʧ ɪz ˈsʌmθɪŋ ðæt telz juː wɒt taɪm."],
  ["Don't put your watch in your wallet.", "dəʊnt pʊt jɔː wɒʧ ɪn jɔː ˈwɒlɪt."],
  ["Put your money in your wallet.", "pʊt jɔː ˈmʌni ɪn jɔː ˈwɒlɪt."],
  ["Yarn.", "jɑːn."],
  ["We can make things with yarn.", "wiː kæn meɪk θɪŋz wɪð jɑːn."],
  ["Yarn is something that you knit with.", "jɑːn ɪz ˈsʌmθɪŋ ðæt juː nɪt wɪð."],
  ["You could make a jacket or a sweater with yarn.", "juː kʊd meɪk ə ˈʤækɪt ɔːr ə ˈswetə wɪð jɑːn."],
  ["This sweater is made out of yarn.", "ðɪs ˈswetər ɪz meɪd aʊt ɒv jɑːn."],
  ["This yarn is red and green.", "ðɪs jɑːn ɪz red ænd ɡriːn."],
  ["The yarn in this sweater is brown.", "ðə jɑːn ɪn ðɪs ˈswetər ɪz braʊn."],
  [
    "After you make a jacket out of yarn, put in a zipper.",
    "ˈɑːftə juː meɪk ə ˈʤækɪt aʊt ɒv jɑːn pʊt ɪn ə ˈzɪpə.",
  ],
  ["Zip it closed with your zipper.", "zɪp ɪt kləʊzd wɪð jɔː ˈzɪpə."],
  ["So make it from yarn and then put in a zipper.", "səʊ meɪk ɪt frɒm jɑːn ænd ðen pʊt ɪn ə ˈzɪpə."],
];

// Bài đọc 4 (dk-4-ipa.pdf) — Colors (red, orange, yellow, green, blue,
// purple, black, pink, brown, white).
const passage4Lines: [string, string][] = [
  ["You.", "juː."],
  ["What's this? These are colors.", "wɒts ðɪs? ðiːz ɑː ˈkʌləz."],
  ["There are lots of different colors.", "ðeər ɑː lɒts ɒv ˈdɪfərənt ˈkʌləz."],
  ["Let's talk about some.", "lets tɔːk əˈbaʊt sʌm."],
  ["What's this color? Red.", "wɒts ðɪs ˈkʌlə? red."],
  ["This is the color, Red.", "ðɪs ɪz ðə ˈkʌlə red."],
  ["What's this color? Orange.", "wɒts ðɪs ˈkʌlə? ˈɒrɪnʤ."],
  ["This color is orange.", "ðɪs ˈkʌlər ɪz ˈɒrɪnʤ."],
  ["What's this color? Yellow.", "wɒts ðɪs ˈkʌlə? ˈjeləʊ."],
  ["This is the color. Yellow.", "ðɪs ɪz ðə ˈkʌlə. ˈjeləʊ."],
  ["What's this color? Green.", "wɒts ðɪs ˈkʌlə? ɡriːn."],
  ["This is the color of green.", "ðɪs ɪz ðə ˈkʌlər ɒv ɡriːn."],
  ["The grass is green.", "ðə ɡrɑːs ɪz ɡriːn."],
  ["Green.", "ɡriːn."],
  ["What's this color? Blue.", "wɒts ðɪs ˈkʌlə? bluː."],
  ["The sky is blue and other things are blue.", "ðə skaɪ ɪz bluː ænd ˈʌðə θɪŋz ɑː bluː."],
  ["What's this color?", "wɒts ðɪs ˈkʌlə?"],
  ["This is the color of purple.", "ðɪs ɪz ðə ˈkʌlər ɒv ˈpɜːpəl."],
  ["I like purple.", "aɪ laɪk ˈpɜːpəl."],
  ["What's this color?", "wɒts ðɪs ˈkʌlə?"],
  ["This color is black.", "ðɪs ˈkʌlər ɪz blæk."],
  ["Remember the cat we saw was black.", "rɪˈmembə ðə kæt wiː sɔː wɒz blæk."],
  ["This is black.", "ðɪs ɪz blæk."],
  ["What's this color? Pink.", "wɒts ðɪs ˈkʌlə? pɪŋk."],
  ["This is the color of pink.", "ðɪs ɪz ðə ˈkʌlər ɒv pɪŋk."],
  ["I have some pink on my shirt.", "aɪ hæv sʌm pɪŋk ɒn maɪ ʃɜːt."],
  ["This is pink.", "ðɪs ɪz pɪŋk."],
  ["What color is this? Brown.", "wɒt ˈkʌlər ɪz ðɪs? braʊn."],
  ["This color is brown.", "ðɪs ˈkʌlər ɪz braʊn."],
  ["What's this color? White.", "wɒts ðɪs ˈkʌlə? waɪt."],
  ["This is the color of white.", "ðɪs ɪz ðə ˈkʌlər ɒv waɪt."],
  ["Our world is filled with colors.", "ˈaʊə wɜːld ɪz fɪld wɪð ˈkʌləz."],
  ["In fact, colors make our world beautiful.", "ɪn fækt ˈkʌləz meɪk ˈaʊə wɜːld ˈbjuːtɪfəl."],
  ["What colors do you know?", "wɒt ˈkʌləz duː juː nəʊ?"],
  ["What colors do you like?", "wɒt ˈkʌləz duː juː laɪk?"],
  ["What about red?", "wɒt əˈbaʊt red?"],
  ["Do you like red?", "duː juː laɪk red?"],
  ["Red is a strong color.", "red ɪz ə strɒŋ ˈkʌlə."],
  ["What about orange?", "wɒt əˈbaʊt ˈɒrɪnʤ?"],
  ["Orange is a nice color.", "ˈɒrɪnʤ ɪz ə naɪs ˈkʌlə."],
  ["The color of the sunset.", "ðə ˈkʌlər ɒv ðə ˈsʌnset."],
  ["Orange.", "ˈɒrɪnʤ."],
  ["Do you like yellow?", "duː juː laɪk ˈjeləʊ?"],
  ["Yellow is the color of the sun.", "ˈjeləʊ ɪz ðə ˈkʌlər ɒv ðə sʌn."],
  ["Yellow.", "ˈjeləʊ."],
  ["Some people have yellow hair.", "sʌm ˈpiːpəl hæv ˈjeləʊ heə."],
  ["My hair is not yellow.", "maɪ heər ɪz nɒt ˈjeləʊ."],
  ["Green.", "ɡriːn."],
  ["The trees are green.", "ðə triːz ɑː ɡriːn."],
  ["The grass is green.", "ðə ɡrɑːs ɪz ɡriːn."],
  ["Green.", "ɡriːn."],
  ["A very nice color.", "ə ˈveri naɪs ˈkʌlə."],
  ["What about blue?", "wɒt əˈbaʊt bluː?"],
  ["Is blue your favorite color?", "ɪz bluː jɔː ˈfeɪvərɪt ˈkʌlə?"],
  ["The sky is blue.", "ðə skaɪ ɪz bluː."],
  ["Hopefully.", "ˈhəʊpfəli."],
  ["What about purple?", "wɒt əˈbaʊt ˈpɜːpəl?"],
  ["Purple is a beautiful color.", "ˈpɜːpəl ɪz ə ˈbjuːtɪfəl ˈkʌlə."],
  ["We have purple here.", "wiː hæv ˈpɜːpəl hɪə."],
  ["Is that your favorite color?", "ɪz ðæt jɔː ˈfeɪvərɪt ˈkʌlə?"],
  ["Ah, here's pink.", "ɑː hɪəz pɪŋk."],
  ["Maybe pink is your favorite color.", "ˈmeɪbi pɪŋk ɪz jɔː ˈfeɪvərɪt ˈkʌlə."],
  ["Black.", "blæk."],
  ["Black is the color of the night.", "blæk ɪz ðə ˈkʌlər ɒv ðə naɪt."],
  ["A dark night.", "ə dɑːk naɪt."],
  ["Some people have black hair.", "sʌm ˈpiːpəl hæv blæk heə."],
  ["White is the color of my house.", "waɪt ɪz ðə ˈkʌlər ɒv maɪ haʊs."],
  ["My house is white.", "maɪ haʊs ɪz waɪt."],
  ["Are your teeth white?", "ɑː jɔː tiːθ waɪt?"],
  ["Better brush them brown.", "ˈbetə brʌʃ ðem braʊn."],
  ["Brown is the color that I am wearing today.", "braʊn ɪz ðə ˈkʌlə ðæt aɪ æm ˈweərɪŋ təˈdeɪ."],
  ["Is brown your favorite color?", "ɪz braʊn jɔː ˈfeɪvərɪt ˈkʌlə?"],
  ["What is your favorite color?", "wɒt ɪz jɔː ˈfeɪvərɪt ˈkʌlə?"],
  ["It.", "ɪt."],
];

// Bài đọc 5 (dk-5-ipa.pdf) — Airplane, Ice cream, Lamp, Milk, Pills,
// Crayons, Coffee, Chair, Fish, Fork.
const passage5Lines: [string, string][] = [
  ["You.", "juː."],
  ["What's this? Airplane.", "wɒts ðɪs? ˈeəpleɪn."],
  ["This airplane is big and it flies in the sky.", "ðɪs ˈeəpleɪn ɪz bɪɡ ænd ɪt flaɪz ɪn ðə skaɪ."],
  ["Airplane.", "ˈeəpleɪn."],
  ["What's this? Ice cream.", "wɒts ðɪs? aɪs kriːm."],
  ["I like ice cream.", "aɪ laɪk aɪs kriːm."],
  ["We can eat ice cream.", "wiː kæn iːt aɪs kriːm."],
  ["You.", "juː."],
  ["What's this? Lamp.", "wɒts ðɪs? læmp."],
  [
    "We use lamps to light up the room and to read beneath a lamp.",
    "wiː juːz læmps tuː laɪt ʌp ðə ruːm ænd tuː riːd bɪˈniːθ ə læmp.",
  ],
  ["What's this? Milk.", "wɒts ðɪs? mɪlk."],
  ["I like to drink milk and milk is white.", "aɪ laɪk tuː drɪŋk mɪlk ænd mɪlk ɪz waɪt."],
  ["Milk.", "mɪlk."],
  ["What are these? Pills.", "wɒt ɑː ðiːz? pɪlz."],
  ["These are pills.", "ðiːz ɑː pɪlz."],
  ["We can take pills when our head hurts.", "wiː kæn teɪk pɪlz wen ˈaʊə hed hɜːts."],
  ["We can use pills to help make us feel better.", "wiː kæn juːz pɪlz tuː help meɪk ʌs fiːl ˈbetə."],
  ["Pills.", "pɪlz."],
  ["What are these? Crayons.", "wɒt ɑː ðiːz? ˈkreɪɒnz."],
  ["There are many different colors of crayons.", "ðeər ɑː ˈmeni ˈdɪfərənt ˈkʌləz ɒv ˈkreɪɒnz."],
  ["And you use them to color with crayons.", "ænd juː juːz ðem tuː ˈkʌlə wɪð ˈkreɪɒnz."],
  ["What's this? Coffee.", "wɒts ðɪs? ˈkɒfi."],
  ["We can drink coffee.", "wiː kæn drɪŋk ˈkɒfi."],
  ["Coffee.", "ˈkɒfi."],
  ["What's this? Chair.", "wɒts ðɪs? ʧeə."],
  ["We sit on chairs to rest our feet.", "wiː sɪt ɒn ʧeəz tuː rest ˈaʊə fiːt."],
  ["Chair.", "ʧeə."],
  ["What's this? Fish.", "wɒts ðɪs? fɪʃ."],
  [
    "This is a little yellow fish and it swims in the water.",
    "ðɪs ɪz ə ˈlɪtəl ˈjeləʊ fɪʃ ænd ɪt swɪmz ɪn ðə ˈwɔːtə.",
  ],
  ["Fish.", "fɪʃ."],
  ["What's this? Fork.", "wɒts ðɪs? fɔːk."],
  ["You can use the fork to eat your food with.", "juː kæn juːz ðə fɔːk tuː iːt jɔː fuːd wɪð."],
  ["Fork.", "fɔːk."],
  ["Oh, let's go on a trip.", "əʊ lets ɡəʊ ɒn ə trɪp."],
  ["Let's go on an airplane.", "lets ɡəʊ ɒn ən ˈeəpleɪn."],
  ["I love to fly in an airplane.", "aɪ lʌv tuː flaɪ ɪn ən ˈeəpleɪn."],
  ["Have you flown in an airplane?", "hæv juː fləʊn ɪn ən ˈeəpleɪn?"],
  ["Ice cream is one of my favorite foods.", "aɪs kriːm ɪz wʌn ɒv maɪ ˈfeɪvərɪt fuːdz."],
  ["Ice cream is cold and delicious.", "aɪs kriːm ɪz kəʊld ænd dɪˈlɪʃəs."],
  ["Do not take your ice cream on the airplane.", "duː nɒt teɪk jɔːr aɪs kriːm ɒn ði ˈeəpleɪn."],
  ["Fly on the airplane and then get some ice cream.", "flaɪ ɒn ði ˈeəpleɪn ænd ðen ɡet sʌm aɪs kriːm."],
  ["Lamp.", "læmp."],
  [
    "Turn on the lamp when it is dark and have a glass of milk.",
    "tɜːn ɒn ðə læmp wen ɪt ɪz dɑːk ænd hæv ə ɡlɑːs ɒv mɪlk.",
  ],
  [
    "Maybe you will read your book under the lamp while you drink your milk.",
    "ˈmeɪbi juː wɪl riːd jɔː bʊk ˈʌndə ðə læmp waɪl juː drɪŋk jɔː mɪlk.",
  ],
  ["Nice cozy nighttime lamp.", "naɪs ˈkəʊzi ˈnaɪttaɪm læmp."],
  ["Milk and reading.", "mɪlk ænd ˈriːdɪŋ."],
  [
    "If you have a headache, you may need to take some pills.",
    "ɪf juː hæv ə ˈhedeɪk juː meɪ niːd tuː teɪk sʌm pɪlz.",
  ],
  ["The pills can help you with your headache.", "ðə pɪlz kæn help juː wɪð jɔː ˈhedeɪk."],
  ["Then you will feel like coloring with crayons.", "ðen juː wɪl fiːl laɪk ˈkʌlərɪŋ wɪð ˈkreɪɒnz."],
  ["Crayons are in many colors.", "ˈkreɪɒnz ɑːr ɪn ˈmeni ˈkʌləz."],
  ["Green, blue, pink, brown, black, orange.", "ɡriːn bluː pɪŋk braʊn blæk ˈɒrɪnʤ."],
  ["Pick your favorite color and color with your crayons.", "pɪk jɔː ˈfeɪvərɪt ˈkʌlər ænd ˈkʌlə wɪð jɔː ˈkreɪɒnz."],
  ["What's next? Coffee.", "wɒts nekst? ˈkɒfi."],
  ["The morning.", "ðə ˈmɔːnɪŋ."],
  ["Wake up if you feel tired in the morning.", "weɪk ʌp ɪf juː fiːl taɪəd ɪn ðə ˈmɔːnɪŋ."],
  [
    "If you have a little headache, coffee is the thing for you.",
    "ɪf juː hæv ə ˈlɪtəl ˈhedeɪk ˈkɒfi ɪz ðə θɪŋ fɔː juː.",
  ],
  ["Have a little drink in the morning.", "hæv ə ˈlɪtəl drɪŋk ɪn ðə ˈmɔːnɪŋ."],
  ["Chair.", "ʧeə."],
  ["When you're tired, you may sit in your chair.", "wen jɔː taɪəd juː meɪ sɪt ɪn jɔː ʧeə."],
  ["Your desk will have a chair.", "jɔː desk wɪl hæv ə ʧeə."],
  ["And I am going to stand because I have no chair.", "ænd aɪ æm ˈɡəʊɪŋ tuː stænd bɪˈkɒz aɪ hæv nəʊ ʧeə."],
  ["Chair.", "ʧeə."],
  ["Some people have fish for a pet.", "sʌm ˈpiːpəl hæv fɪʃ fɔːr ə pet."],
  [
    "They put the fish in an aquarium and the fish is their special friend.",
    "ðeɪ pʊt ðə fɪʃ ɪn ən əˈkweəriəm ænd ðə fɪʃ ɪz ðeə ˈspeʃəl frend.",
  ],
  ["Their special pet.", "ðeə ˈspeʃəl pet."],
  ["This fish is yellow.", "ðɪs fɪʃ ɪz ˈjeləʊ."],
  ["It's beautiful.", "ɪts ˈbjuːtɪfəl."],
  ["Fish.", "fɪʃ."],
  ["Fork.", "fɔːk."],
  ["When you eat your food, be sure to use your fork.", "wen juː iːt jɔː fuːd biː ʃʊə tuː juːz jɔː fɔːk."],
  ["Do not use your fingers.", "duː nɒt juːz jɔː ˈfɪŋɡəz."],
  ["Use your fork.", "juːz jɔː fɔːk."],
];

export const TOTAL_PROGRAM_DAYS = 50;

// dayDefs[0..14] (Ngày 1-15 cũ) đến từ file PDF thứ nhất, dayDefs[15..29]
// (Ngày 16-30 cũ) đến từ file PDF thứ hai — gộp mỗi file thành đúng 1 bài
// đọc hoàn chỉnh thay vì tách theo từng đoạn nhỏ.
const PASSAGE_SPLIT_INDEX = 15;

function combineLines(defs: DayDef[]): [string, string][] {
  return defs.flatMap((d) => d.lines);
}

const passage1 = dayDefs.slice(0, PASSAGE_SPLIT_INDEX);
const passage2 = dayDefs.slice(PASSAGE_SPLIT_INDEX);

// Chỉ lấy các từ mới giới thiệu (bỏ các đoạn "Ôn tập: ...") để tiêu đề gọn.
const newWordTitles = (defs: DayDef[]) => defs.filter((d) => !d.title.startsWith("Ôn tập")).map((d) => d.title);

export const dailyReadingDays: (Story & { day: number })[] = [
  {
    id: "day-01",
    day: 1,
    title: "Ngày 1: Bài đọc 1",
    level: `Bài đọc 1/${TOTAL_PROGRAM_DAYS} — từ vựng: ${newWordTitles(passage1).join(", ")}`,
    difficulty: 1,
    sentences: combineLines(passage1).map(([eng, ipa]) => zip(eng, ipa)),
  },
  {
    id: "day-02",
    day: 2,
    title: "Ngày 2: Bài đọc 2",
    level: `Bài đọc 2/${TOTAL_PROGRAM_DAYS} — từ vựng: ${newWordTitles(passage2).join(", ")}`,
    difficulty: 1,
    sentences: combineLines(passage2).map(([eng, ipa]) => zip(eng, ipa)),
  },
  {
    id: "day-03",
    day: 3,
    title: "Ngày 3: Bài đọc 3",
    level: `Bài đọc 3/${TOTAL_PROGRAM_DAYS} — từ vựng: Spoon, Stars, Tissue, Toilet, Train, Trumpet, Wallet, Watch, Yarn, Zipper`,
    difficulty: 1,
    sentences: passage3Lines.map(([eng, ipa]) => zip(eng, ipa)),
  },
  {
    id: "day-04",
    day: 4,
    title: "Ngày 4: Bài đọc 4",
    level: `Bài đọc 4/${TOTAL_PROGRAM_DAYS} — từ vựng: Red, Orange, Yellow, Green, Blue, Purple, Black, Pink, Brown, White`,
    difficulty: 1,
    sentences: passage4Lines.map(([eng, ipa]) => zip(eng, ipa)),
  },
  {
    id: "day-05",
    day: 5,
    title: "Ngày 5: Bài đọc 5",
    level: `Bài đọc 5/${TOTAL_PROGRAM_DAYS} — từ vựng: Airplane, Ice cream, Lamp, Milk, Pills, Crayons, Coffee, Chair, Fish, Fork`,
    difficulty: 1,
    sentences: passage5Lines.map(([eng, ipa]) => zip(eng, ipa)),
  },
];

export function findDay(id: string) {
  return dailyReadingDays.find((d) => d.id === id);
}
