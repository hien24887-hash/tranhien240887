// Ngân hàng từ luyện viết phiên âm — số hoá từ các bảng ví dụ trong ảnh gốc,
// mở rộng thêm nhiều nhóm từ để đủ độ đa dạng, xếp theo 5 cấp độ dễ → khó:
//   Cấp 1: nguyên âm ngắn CVC (cat, hen, sit...) + sight words cơ bản
//   Cấp 2: nguyên âm dài "phụ âm + e câm" (bike, name, home, cube...)
//   Cấp 3: âm r-hoá (ar/er/ir/or/ur/are) + ow/oa + o trước -ld/-st
//   Cấp 4: tổ hợp phụ âm (ch/sh/th/ph/wh/qu...) + cụm phụ âm đầu (bl/br/st...)
//   Cấp 5: từ nhiều âm tiết / bất quy tắc cần học thuộc
// Mỗi từ gắn với 1 ruleId (xem rules.ts) để khi trả lời sai app có thể
// nhắc lại đúng quy tắc + giải thích kiểu Feynman ("vì sao đọc vậy").

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface PracticeWord {
  word: string;
  ipa: string;
  meaning: string;
  ruleId: string;
  difficulty: Difficulty;
  note?: string;
}

type Row = readonly [word: string, ipa: string, meaning: string];

function group(ruleId: string, difficulty: Difficulty, list: readonly Row[]): PracticeWord[] {
  return list.map(([word, ipa, meaning]) => ({ word, ipa, meaning, ruleId, difficulty }));
}

// ---------------------------------------------------------------------------
// Cấp 1 — nguyên âm ngắn CVC + sight words cơ bản
// ---------------------------------------------------------------------------
const level1: PracticeWord[] = [
  ...group("a-cons", 1, [
    ["cat", "/kæt/", "con mèo"],
    ["hat", "/hæt/", "cái mũ"],
    ["bat", "/bæt/", "con dơi"],
    ["mat", "/mæt/", "tấm thảm"],
    ["rat", "/ræt/", "con chuột"],
    ["sat", "/sæt/", "đã ngồi"],
    ["fat", "/fæt/", "béo"],
    ["pat", "/pæt/", "vỗ nhẹ"],
  ]),
  ...group("e-cons", 1, [
    ["hen", "/hen/", "gà mái"],
    ["pen", "/pen/", "cây bút"],
    ["ten", "/ten/", "số mười"],
    ["men", "/men/", "những người đàn ông"],
    ["den", "/den/", "hang thú"],
    ["bed", "/bed/", "cái giường"],
    ["red", "/red/", "màu đỏ"],
    ["leg", "/leg/", "cái chân"],
    ["nest", "/nest/", "cái tổ"],
    ["wet", "/wet/", "ướt"],
  ]),
  ...group("i-cons", 1, [
    ["sit", "/sɪt/", "ngồi"],
    ["hit", "/hɪt/", "đánh"],
    ["bit", "/bɪt/", "một miếng nhỏ"],
    ["fit", "/fɪt/", "vừa vặn"],
    ["pit", "/pɪt/", "cái hố"],
    ["big", "/bɪg/", "to"],
    ["pig", "/pɪg/", "con lợn"],
    ["dig", "/dɪg/", "đào"],
    ["six", "/sɪks/", "số sáu"],
  ]),
  ...group("o-cons", 1, [
    ["hot", "/hɒt/", "nóng"],
    ["pot", "/pɒt/", "cái nồi"],
    ["dot", "/dɒt/", "chấm"],
    ["lot", "/lɒt/", "nhiều"],
    ["cot", "/kɒt/", "giường xếp nhỏ"],
    ["dog", "/dɒg/", "con chó"],
    ["log", "/lɒg/", "khúc gỗ"],
    ["jog", "/dʒɒg/", "chạy bộ"],
    ["not", "/nɒt/", "không"],
  ]),
  ...group("u-cons", 1, [
    ["but", "/bʌt/", "nhưng"],
    ["cut", "/kʌt/", "cắt"],
    ["hut", "/hʌt/", "túp lều"],
    ["nut", "/nʌt/", "hạt"],
    ["gut", "/gʌt/", "ruột"],
    ["sun", "/sʌn/", "mặt trời"],
    ["run", "/rʌn/", "chạy"],
    ["fun", "/fʌn/", "vui"],
  ]),
  ...group("a-cons", 1, [["man", "/mæn/", "người đàn ông"]]),
  ...group("sight", 1, [
    ["the", "/ðə/", "(mạo từ)"],
    ["a", "/ə/", "(mạo từ)"],
    ["his", "/hɪz/", "của anh ấy"],
    ["has", "/hæz/", "có (số ít)"],
    ["have", "/hæv/", "có"],
    ["was", "/wɒz/", "đã là (số ít)"],
    ["us", "/əs/", "chúng tôi (tân ngữ)"],
    ["of", "/əv/", "của"],
  ]),
  {
    word: "will",
    ipa: "/wɪl/",
    meaning: "sẽ",
    ruleId: "i-cons",
    difficulty: 1,
    note: "l đứng cuối đọc cong lưỡi nhẹ, hơi ngả về âm \"ơ\".",
  },
];

// ---------------------------------------------------------------------------
// Cấp 2 — nguyên âm dài "phụ âm + e câm"
// ---------------------------------------------------------------------------
const level2: PracticeWord[] = [
  ...group("i-cons-e", 2, [
    ["bike", "/baɪk/", "xe đạp"],
    ["kite", "/kaɪt/", "con diều"],
    ["like", "/laɪk/", "thích"],
    ["mike", "/maɪk/", "micro"],
    ["ride", "/raɪd/", "cưỡi, đi"],
    ["time", "/taɪm/", "thời gian"],
    ["fine", "/faɪn/", "tốt, khỏe"],
    ["nine", "/naɪn/", "số chín"],
    ["five", "/faɪv/", "số năm"],
    ["drive", "/draɪv/", "lái xe"],
    ["mine", "/maɪn/", "của tôi"],
    ["shine", "/ʃaɪn/", "tỏa sáng"],
    ["white", "/waɪt/", "màu trắng"],
    ["write", "/raɪt/", "viết"],
    ["bite", "/baɪt/", "cắn"],
    ["life", "/laɪf/", "cuộc sống"],
    ["wife", "/waɪf/", "vợ"],
    ["pipe", "/paɪp/", "ống"],
    ["hide", "/haɪd/", "trốn, giấu"],
    ["side", "/saɪd/", "bên cạnh"],
  ]),
  ...group("a-cons-e", 2, [
    ["name", "/neɪm/", "tên"],
    ["game", "/geɪm/", "trò chơi"],
    ["same", "/seɪm/", "giống nhau"],
    ["blame", "/bleɪm/", "đổ lỗi"],
    ["date", "/deɪt/", "ngày tháng, hẹn hò"],
    ["gate", "/geɪt/", "cổng"],
    ["late", "/leɪt/", "trễ"],
    ["rate", "/reɪt/", "tỷ lệ, mức"],
    ["mate", "/meɪt/", "bạn, đồng đội"],
    ["safe", "/seɪf/", "an toàn"],
    ["cave", "/keɪv/", "hang động"],
    ["save", "/seɪv/", "cứu, tiết kiệm"],
    ["wave", "/weɪv/", "sóng, vẫy tay"],
    ["brave", "/breɪv/", "dũng cảm"],
    ["shade", "/ʃeɪd/", "bóng râm"],
    ["trade", "/treɪd/", "buôn bán, thương mại"],
    ["grade", "/greɪd/", "cấp độ, điểm số"],
    ["place", "/pleɪs/", "nơi, chỗ"],
    ["space", "/speɪs/", "không gian"],
    ["make", "/meɪk/", "làm, tạo ra"],
  ]),
  ...group("e-cons-e", 2, [
    ["these", "/ðiːz/", "những cái này"],
    ["scene", "/siːn/", "cảnh"],
    ["Pete", "/piːt/", "tên riêng Pete"],
    ["theme", "/θiːm/", "chủ đề"],
    ["eve", "/iːv/", "đêm trước (một ngày lễ)"],
    ["me", "/miː/", "tôi (tân ngữ)"],
  ]),
  ...group("o-cons-e", 2, [
    ["home", "/həʊm/", "nhà"],
    ["nose", "/nəʊz/", "mũi"],
    ["rope", "/rəʊp/", "sợi dây thừng"],
    ["hole", "/həʊl/", "cái lỗ"],
    ["joke", "/dʒəʊk/", "câu đùa"],
    ["note", "/nəʊt/", "ghi chú"],
    ["bone", "/bəʊn/", "xương"],
    ["hope", "/həʊp/", "hy vọng"],
    ["rode", "/rəʊd/", "đã cưỡi/đi"],
    ["code", "/kəʊd/", "mã"],
  ]),
  ...group("u-cons-e", 2, [
    ["cube", "/kjuːb/", "khối lập phương"],
    ["cute", "/kjuːt/", "dễ thương"],
    ["huge", "/hjuːdʒ/", "khổng lồ"],
    ["June", "/dʒuːn/", "tháng Sáu"],
    ["flute", "/fluːt/", "cây sáo"],
    ["tune", "/tuːn/", "giai điệu"],
    ["rule", "/ruːl/", "quy tắc"],
    ["tube", "/tuːb/", "cái ống"],
    ["mule", "/mjuːl/", "con la"],
    ["use", "/juːz/", "sử dụng"],
  ]),
];

// ---------------------------------------------------------------------------
// Cấp 3 — âm r-hoá (ar/er/ir/or/ur/are) + ow/oa + o trước -ld/-st
// ---------------------------------------------------------------------------
const level3: PracticeWord[] = [
  ...group("a-r", 3, [
    ["car", "/kɑː/", "xe hơi"],
    ["star", "/stɑː/", "ngôi sao"],
    ["farm", "/fɑːm/", "trang trại"],
    ["dark", "/dɑːk/", "tối"],
    ["park", "/pɑːk/", "công viên"],
    ["arm", "/ɑːm/", "cánh tay"],
    ["shark", "/ʃɑːk/", "cá mập"],
    ["spark", "/spɑːk/", "tia lửa"],
    ["are", "/ɑː/", "thì, là, ở (động từ)"],
    ["far", "/fɑː/", "xa"],
  ]),
  ...group("o-r", 3, [
    ["fork", "/fɔːk/", "cái nĩa"],
    ["short", "/ʃɔːt/", "ngắn"],
    ["horse", "/hɔːs/", "con ngựa"],
    ["corn", "/kɔːn/", "ngô"],
    ["sport", "/spɔːt/", "thể thao"],
    ["storm", "/stɔːm/", "cơn bão"],
    ["born", "/bɔːn/", "được sinh ra"],
    ["north", "/nɔːθ/", "phía bắc"],
  ]),
  ...group("e-r", 3, [
    ["her", "/hɜː/", "của cô ấy"],
    ["term", "/tɜːm/", "học kỳ"],
    ["fern", "/fɜːn/", "cây dương xỉ"],
    ["verb", "/vɜːb/", "động từ"],
    ["herd", "/hɜːd/", "đàn (gia súc)"],
  ]),
  ...group("i-r", 3, [
    ["bird", "/bɜːd/", "con chim"],
    ["shirt", "/ʃɜːt/", "áo sơ mi"],
    ["girl", "/gɜːl/", "cô gái"],
    ["first", "/fɜːst/", "đầu tiên"],
    ["third", "/θɜːd/", "thứ ba"],
    ["dirt", "/dɜːt/", "đất bẩn"],
  ]),
  ...group("u-r", 3, [
    ["turn", "/tɜːn/", "quay"],
    ["burn", "/bɜːn/", "cháy"],
    ["nurse", "/nɜːs/", "y tá"],
    ["hurt", "/hɜːt/", "làm đau"],
    ["curl", "/kɜːl/", "xoăn"],
    ["surf", "/sɜːf/", "lướt sóng"],
  ]),
  ...group("are", 3, [
    ["care", "/keə/", "quan tâm, chăm sóc"],
    ["fare", "/feə/", "giá vé"],
    ["share", "/ʃeə/", "chia sẻ"],
    ["dare", "/deə/", "dám"],
  ]),
  ...group("ow-oa", 3, [
    ["slow", "/sləʊ/", "chậm"],
    ["show", "/ʃəʊ/", "trình diễn"],
    ["boat", "/bəʊt/", "thuyền"],
    ["coat", "/kəʊt/", "áo khoác"],
  ]),
  ...group("o-ld-st", 3, [
    ["old", "/əʊld/", "già, cũ"],
    ["cold", "/kəʊld/", "lạnh"],
    ["gold", "/gəʊld/", "vàng (kim loại)"],
    ["told", "/təʊld/", "đã kể"],
    ["most", "/məʊst/", "nhiều nhất"],
    ["ghost", "/gəʊst/", "con ma"],
    ["posts", "/pəʊsts/", "bài đăng, cột"],
  ]),
];

// ---------------------------------------------------------------------------
// Cấp 4 — tổ hợp phụ âm cố định/biến đổi + cụm phụ âm đầu (blends)
// ---------------------------------------------------------------------------
const level4: PracticeWord[] = [
  ...group("cons-ch", 4, [
    ["chip", "/tʃɪp/", "miếng khoai chiên"],
    ["chat", "/tʃæt/", "trò chuyện"],
    ["much", "/mʌtʃ/", "nhiều"],
    ["rich", "/rɪtʃ/", "giàu"],
    ["chest", "/tʃest/", "cái rương, lồng ngực"],
  ]),
  ...group("cons-sh", 4, [
    ["shop", "/ʃɒp/", "cửa hàng"],
    ["fish", "/fɪʃ/", "con cá"],
    ["wish", "/wɪʃ/", "ước"],
    ["shut", "/ʃʌt/", "đóng"],
    ["shed", "/ʃed/", "nhà kho nhỏ"],
    ["ship", "/ʃɪp/", "tàu thuỷ"],
  ]),
  ...group("cons-th", 4, [
    ["thin", "/θɪn/", "gầy, mỏng"],
    ["that", "/ðæt/", "cái đó"],
    ["than", "/ðæn/", "hơn"],
    ["math", "/mæθ/", "môn toán"],
    ["thud", "/θʌd/", "tiếng thịch"],
    ["think", "/θɪŋk/", "suy nghĩ"],
  ]),
  ...group("cons-ph", 4, [
    ["phone", "/fəʊn/", "điện thoại"],
    ["graph", "/grɑːf/", "biểu đồ"],
  ]),
  ...group("cons-wh", 4, [
    ["when", "/wen/", "khi nào"],
    ["which", "/wɪtʃ/", "cái nào"],
    ["whip", "/wɪp/", "cái roi"],
    ["wheel", "/wiːl/", "bánh xe"],
    ["what", "/wɒt/", "cái gì"],
  ]),
  ...group("cons-qu", 4, [
    ["quiz", "/kwɪz/", "bài kiểm tra nhanh"],
    ["quit", "/kwɪt/", "bỏ, dừng"],
    ["quack", "/kwæk/", "tiếng vịt kêu"],
    ["quilt", "/kwɪlt/", "chăn bông"],
    ["queen", "/kwiːn/", "nữ hoàng"],
  ]),
  ...group("cons-j", 4, [
    ["jet", "/dʒet/", "máy bay phản lực"],
    ["jug", "/dʒʌg/", "bình đựng nước"],
  ]),
  ...group("cons-y", 4, [
    ["yak", "/jæk/", "bò Tây Tạng"],
    ["yam", "/jæm/", "khoai lang"],
  ]),
  ...group("cons-c", 4, [
    ["cell", "/sel/", "tế bào"],
    ["cent", "/sent/", "xu"],
    ["cab", "/kæb/", "xe taxi"],
  ]),
  ...group("cons-x", 4, [
    ["fix", "/fɪks/", "sửa"],
    ["mix", "/mɪks/", "trộn"],
    ["tax", "/tæks/", "thuế"],
    ["fox", "/fɒks/", "con cáo"],
    ["box", "/bɒks/", "cái hộp"],
  ]),
  ...group("cons-ng", 4, [
    ["sing", "/sɪŋ/", "hát"],
    ["ring", "/rɪŋ/", "nhẫn"],
    ["pink", "/pɪŋk/", "màu hồng"],
    ["sink", "/sɪŋk/", "bồn rửa"],
    ["bring", "/brɪŋ/", "mang đến"],
  ]),
  ...group("cons-s", 4, [
    ["rose", "/rəʊz/", "bông hồng"],
    ["eggs", "/egz/", "những quả trứng"],
  ]),
  // Cụm phụ âm đầu (blends) — vẫn theo đúng quy tắc nguyên âm đã học, chỉ
  // thêm 1 phụ âm đứng trước nên khó phát âm/nghe hơn.
  ...group("o-cons", 4, [
    ["stop", "/stɒp/", "dừng lại"],
    ["spot", "/spɒt/", "đốm, chỗ"],
    ["block", "/blɒk/", "khối, dãy nhà"],
    ["drop", "/drɒp/", "làm rơi"],
    ["frog", "/frɒg/", "con ếch"],
  ]),
  ...group("e-cons", 4, [
    ["step", "/step/", "bước chân"],
  ]),
  ...group("a-cons", 4, [
    ["stamp", "/stæmp/", "tem, con dấu"],
    ["snap", "/snæp/", "búng tay, chụp ảnh"],
    ["plan", "/plæn/", "kế hoạch"],
    ["black", "/blæk/", "màu đen"],
    ["clap", "/klæp/", "vỗ tay"],
    ["crab", "/kræb/", "con cua"],
    ["glad", "/glæd/", "vui mừng"],
    ["trap", "/træp/", "cái bẫy"],
  ]),
  ...group("i-cons", 4, [
    ["spin", "/spɪn/", "quay tròn"],
    ["swim", "/swɪm/", "bơi"],
    ["brick", "/brɪk/", "viên gạch"],
    ["trip", "/trɪp/", "chuyến đi"],
  ]),
  ...group("u-cons", 4, [
    ["plum", "/plʌm/", "quả mận"],
    ["drum", "/drʌm/", "cái trống"],
  ]),
];

// ---------------------------------------------------------------------------
// Cấp 5 — từ nhiều âm tiết / bất quy tắc cần học thuộc
// ---------------------------------------------------------------------------
const level5: PracticeWord[] = [
  {
    word: "I",
    ipa: "/aɪ/",
    meaning: "tôi",
    ruleId: "i-cons-e",
    difficulty: 5,
    note: "Chữ \"I\" đứng một mình luôn đọc là /aɪ/, không theo quy tắc thông thường.",
  },
  {
    word: "know",
    ipa: "/nəʊ/",
    meaning: "biết",
    ruleId: "ow-oa",
    difficulty: 5,
    note: "k đứng trước phụ âm n ở đầu từ thì k câm, không đọc.",
  },
  {
    word: "yellow",
    ipa: "/ˈjeləʊ/",
    meaning: "màu vàng",
    ruleId: "ow-oa",
    difficulty: 5,
    note: "Từ 2 âm tiết, trọng âm rơi vào âm tiết đầu: YÉ-lâu.",
  },
  {
    word: "tomorrow",
    ipa: "/təˈmɒrəʊ/",
    meaning: "ngày mai",
    ruleId: "ow-oa",
    difficulty: 5,
    note: "Từ 3 âm tiết, trọng âm rơi vào âm tiết thứ hai: thờ-MO-râu.",
  },
  {
    word: "apple",
    ipa: "/ˈæpəl/",
    meaning: "quả táo",
    ruleId: "cons-double",
    difficulty: 5,
    note: "2 chữ p giống nhau đứng liền nhau chỉ đọc 1 âm /p/; -le cuối đọc nhẹ thành /əl/.",
  },
  {
    word: "rabbit",
    ipa: "/ˈræbɪt/",
    meaning: "con thỏ",
    ruleId: "cons-double",
    difficulty: 5,
    note: "2 chữ b giống nhau đứng liền nhau chỉ đọc 1 âm /b/.",
  },
  {
    word: "under",
    ipa: "/ˈʌndə/",
    meaning: "ở dưới",
    ruleId: "u-cons",
    difficulty: 5,
    note: "Âm tiết đầu \"un\" theo quy tắc u + phụ âm → /ʌ/; -er cuối không nhấn trọng âm đọc nhẹ thành /ə/.",
  },
  {
    word: "over",
    ipa: "/ˈəʊvə/",
    meaning: "ở trên, qua",
    ruleId: "o-cons-e",
    difficulty: 5,
    note: "Âm tiết mở \"o\" đứng 1 mình đọc thành /əʊ/ giống quy tắc o + phụ âm + e; -er cuối không nhấn trọng âm đọc nhẹ thành /ə/.",
  },
  {
    word: "about",
    ipa: "/əˈbaʊt/",
    meaning: "khoảng, về việc",
    difficulty: 5,
    ruleId: "",
    note: "\"ou\" ở đây là 1 quy tắc khác (chưa học ở các bài trước), đọc là /aʊ/ — khác với \"ow\" trong slow/show đọc là /əʊ/.",
  },
  {
    word: "father",
    ipa: "/ˈfɑːðə/",
    meaning: "bố",
    ruleId: "a-r",
    difficulty: 5,
    note: "-er cuối từ không nhấn trọng âm chỉ đọc nhẹ thành /ə/, khác với \"er\" được nhấn trọng âm đọc là /ɜː/ như trong \"her\".",
  },
  {
    word: "mother",
    ipa: "/ˈmʌðə/",
    meaning: "mẹ",
    difficulty: 5,
    ruleId: "",
    note: "-er cuối từ không nhấn trọng âm chỉ đọc nhẹ thành /ə/.",
  },
  {
    word: "sister",
    ipa: "/ˈsɪstə/",
    meaning: "chị/em gái",
    difficulty: 5,
    ruleId: "",
    note: "-er cuối từ không nhấn trọng âm chỉ đọc nhẹ thành /ə/.",
  },
  {
    word: "water",
    ipa: "/ˈwɔːtə/",
    meaning: "nước",
    difficulty: 5,
    ruleId: "",
    note: "-er cuối từ không nhấn trọng âm chỉ đọc nhẹ thành /ə/.",
  },
  {
    word: "children",
    ipa: "/ˈtʃɪldrən/",
    meaning: "trẻ em (số nhiều)",
    difficulty: 5,
    ruleId: "",
    note: "Cụm phụ âm \"ldr\" ở giữa từ, đọc tách bạch từng âm, không nối liền như phụ âm đôi.",
  },
  {
    word: "animal",
    ipa: "/ˈænɪməl/",
    meaning: "động vật",
    difficulty: 5,
    ruleId: "",
    note: "Từ 3 âm tiết, trọng âm rơi vào âm tiết đầu.",
  },
  {
    word: "elephant",
    ipa: "/ˈelɪfənt/",
    meaning: "con voi",
    ruleId: "cons-ph",
    difficulty: 5,
    note: "Từ 3 âm tiết, trọng âm rơi vào âm tiết đầu; ph vẫn luôn đọc là /f/.",
  },
  {
    word: "together",
    ipa: "/təˈgeðə/",
    meaning: "cùng nhau",
    difficulty: 5,
    ruleId: "",
    note: "Từ 3 âm tiết, trọng âm rơi vào âm tiết thứ hai.",
  },
  {
    word: "yesterday",
    ipa: "/ˈjestədeɪ/",
    meaning: "hôm qua",
    difficulty: 5,
    ruleId: "",
    note: "Từ 3 âm tiết, trọng âm rơi vào âm tiết đầu; \"day\" ở cuối vẫn đọc là /deɪ/ như quy tắc a + phụ âm + e.",
  },
  {
    word: "morning",
    ipa: "/ˈmɔːnɪŋ/",
    meaning: "buổi sáng",
    ruleId: "o-r",
    difficulty: 5,
    note: "\"mor\" theo đúng quy tắc or → /ɔː/; \"ing\" cuối đọc là /ɪŋ/.",
  },
  {
    word: "evening",
    ipa: "/ˈiːvnɪŋ/",
    meaning: "buổi tối",
    difficulty: 5,
    ruleId: "",
    note: "e câm ở giữa từ vẫn làm nguyên âm trước đó đọc dài /iː/, dù không phải ở cuối từ.",
  },
  {
    word: "breakfast",
    ipa: "/ˈbrekfəst/",
    meaning: "bữa sáng",
    difficulty: 5,
    ruleId: "",
    note: "\"ea\" ở đây đọc là /e/ ngắn (một ngoại lệ chưa học ở các bài trước).",
  },
  {
    word: "birthday",
    ipa: "/ˈbɜːθdeɪ/",
    meaning: "sinh nhật",
    ruleId: "i-r",
    difficulty: 5,
    note: "\"bir\" theo đúng quy tắc ir → /ɜː/; \"day\" đọc là /deɪ/ như quy tắc a + phụ âm + e.",
  },
  {
    word: "weekend",
    ipa: "/ˈwiːkend/",
    meaning: "cuối tuần",
    difficulty: 5,
    ruleId: "",
    note: "\"ee\" đọc là /iː/ kéo dài (một quy tắc khác chưa học ở các bài trước).",
  },
  {
    word: "everyone",
    ipa: "/ˈevriwʌn/",
    meaning: "mọi người",
    difficulty: 5,
    ruleId: "",
    note: "Từ ghép 3 âm tiết, trọng âm rơi vào âm tiết đầu.",
  },
  {
    word: "something",
    ipa: "/ˈsʌmθɪŋ/",
    meaning: "điều gì đó",
    difficulty: 5,
    ruleId: "",
    note: "\"some\" tuy có dạng o + phụ âm + e nhưng lại là ngoại lệ, đọc là /sʌm/ chứ không đọc /səʊm/ như quy tắc thông thường.",
  },
  {
    word: "nothing",
    ipa: "/ˈnʌθɪŋ/",
    meaning: "không có gì",
    difficulty: 5,
    ruleId: "",
    note: "Âm tiết đầu là ngoại lệ, đọc là /nʌ/ chứ không đọc /nəʊ/ như trong \"no\".",
  },
];

export const wordBank: PracticeWord[] = [...level1, ...level2, ...level3, ...level4, ...level5];

export function wordsForRule(ruleId: string): PracticeWord[] {
  return wordBank.filter((w) => w.ruleId === ruleId);
}

export function wordsForDifficulty(difficulty: Difficulty): PracticeWord[] {
  return wordBank.filter((w) => w.difficulty === difficulty);
}

export function randomWords(count: number): PracticeWord[] {
  const shuffled = [...wordBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
