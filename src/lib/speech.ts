// Wrapper mỏng quanh Web Speech API: nói mẫu (TTS) + nhận diện giọng nói.
// Nhận diện giọng nói chỉ được Chrome hỗ trợ tốt nên luôn phải feature-detect
// trước khi dùng và báo cho người dùng biết nếu trình duyệt không hỗ trợ.
//
// Cả 2 phần TTS và STT bên dưới được đơn giản hoá lại theo đúng cách làm đã
// chứng minh chạy ổn định trên điện thoại thật ở 1 app khác cùng người dùng
// (D:\App Từ Mới): không tự gán 1 `SpeechSynthesisVoice` cụ thể cho TTS (chỉ
// đặt `lang` rồi để trình duyệt tự chọn giọng — gán thẳng object voice dễ bị
// "voice đã cache nhưng không còn hợp lệ" trên 1 số bản Chrome Android, gây
// im lặng hoàn toàn mà không có lỗi nào cả), và STT dùng continuous=false +
// interimResults=false, tự khởi động lại sau MỖI câu nói được nhận diện —
// đây là cách khắc phục tiêu chuẩn cho việc Android không thực sự hỗ trợ
// continuous=true dù khai báo, thay vì cố duy trì 1 phiên nghe liên tục.

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Tốc độ đọc mẫu mặc định — chậm hơn tốc độ nói bình thường (1.0) để bé
// nghe rõ từng âm, nhưng không quá chậm đến mức méo tiếng. Từ khi bỏ việc
// ép 1 giọng đọc cụ thể (xem ghi chú ở đầu file), trình duyệt tự chọn giọng
// mặc định của máy — giọng mặc định trên nhiều máy có nhịp đọc chậm hơn
// giọng cũ ở cùng 1 mức "rate", nên tăng nhẹ lên để tốc độ nghe được vẫn
// tương đương như trước.
const DEFAULT_TTS_RATE = 0.85;

// Toàn bộ quy tắc/phiên âm trong app dạy theo giọng Anh-Anh (British, non-
// rhotic): "r" đứng sau nguyên âm KHÔNG đọc (car → /kɑː/, her → /hɜː/...),
// và có âm /ɒ/ tròn môi tách biệt với /ɑː/. Nếu phát bằng giọng Mỹ (en-US),
// máy sẽ đọc rõ âm "r" và gộp /ɒ/ vào /ɑː/ — mâu thuẫn trực tiếp với quy tắc
// đang dạy. Vì vậy toàn bộ audio trong app phải dùng giọng Anh-Anh.
const DEFAULT_LANG = "en-GB";

// Nhận diện giọng nói (STT) lại là chuyện khác: bé là người Việt học tiếng
// Anh, giọng đọc chắc chắn không chuẩn bản xứ dù Anh-Anh hay Anh-Mỹ. Model
// nhận diện "en-US" của Google được huấn luyện trên lượng dữ liệu lớn hơn
// và bao dung hơn với giọng không bản xứ so với "en-GB" — dùng "en-GB" cho
// STT chỉ khiến app "nghe" sai nhiều hơn mà không giúp gì cho việc dạy
// phát âm (phần dạy phát âm British vẫn nằm ở TTS/quy tắc, không liên quan
// đến việc máy có nhận ra đúng từ bé vừa nói hay không).
const RECOGNITION_LANG = "en-US";

// Chỉ dùng danh sách giọng đọc để QUYẾT ĐỊNH CHUỖI `lang` phù hợp — không
// bao giờ gán thẳng 1 object SpeechSynthesisVoice cụ thể cho utterance (đó
// là điều gây lỗi im lặng đã sửa ở trên). Nhiều máy (đặc biệt máy Windows/
// Android ở Việt Nam) không cài giọng Anh-Anh, chỉ có Anh-Mỹ — nếu cứ ép
// "en-GB" trên máy không có giọng đó, một số máy sẽ không đọc được gì cả
// thay vì tự chọn giọng gần đúng nhất.
function resolveTtsLang(preferredLang: string): string {
  if (!isSpeechSynthesisSupported()) return preferredLang;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return preferredLang;
  const hasPreferred = voices.some((v) => v.lang.toLowerCase().startsWith(preferredLang.toLowerCase()));
  if (hasPreferred) return preferredLang;
  const anyEnglish = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
  return anyEnglish?.lang ?? preferredLang;
}

// Mỗi máy có 1 bộ giọng đọc khác nhau, không giọng nào "chuẩn" cho mọi máy
// — thay vì tự đoán, cho bé/phụ huynh tự nghe thử và chọn giọng nào rõ nhất
// trong số các giọng máy đang có, rồi ghi nhớ lựa chọn đó (localStorage).
const VOICE_PREF_KEY = "ipa-app-voice-uri";

export function getPreferredVoiceURI(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(VOICE_PREF_KEY);
}

export function setPreferredVoiceURI(voiceURI: string | null): void {
  if (typeof window === "undefined") return;
  if (voiceURI) window.localStorage.setItem(VOICE_PREF_KEY, voiceURI);
  else window.localStorage.removeItem(VOICE_PREF_KEY);
}

/** Danh sách giọng tiếng Anh máy đang có, để hiển thị cho bé/phụ huynh chọn. */
export function listEnglishVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
}

/** Nghe thử 1 giọng cụ thể (dùng ở trang chọn giọng) — KHÔNG lưu lại lựa chọn. */
export function previewVoice(voice: SpeechSynthesisVoice, sampleText: string): void {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(sampleText);
  utter.voice = voice;
  utter.lang = voice.lang;
  utter.rate = DEFAULT_TTS_RATE;
  window.speechSynthesis.speak(utter);
}

export function speak(text: string, opts?: { rate?: number; lang?: string }): void {
  if (!isSpeechSynthesisSupported() || !text) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);

  // Tra cứu LẠI (không dùng biến đã lưu từ trước) mỗi lần nói — tránh đúng
  // lỗi "voice đã cache nhưng không còn hợp lệ" đã sửa ở trên, vì lần này
  // luôn lấy object voice mới nhất ngay tại thời điểm gọi speak().
  const preferredURI = getPreferredVoiceURI();
  const preferredVoice = preferredURI
    ? window.speechSynthesis.getVoices().find((v) => v.voiceURI === preferredURI)
    : undefined;

  if (preferredVoice) {
    utter.voice = preferredVoice;
    utter.lang = preferredVoice.lang;
  } else {
    utter.lang = resolveTtsLang(opts?.lang ?? DEFAULT_LANG);
  }
  utter.rate = opts?.rate ?? DEFAULT_TTS_RATE;
  window.speechSynthesis.speak(utter);
}

export interface RecognitionHandle {
  stop: () => void;
}

export interface StartRecognitionOptions {
  lang?: string;
  onResult: (transcript: string, isFinal: boolean) => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export function startRecognition(opts: StartRecognitionOptions): RecognitionHandle | null {
  const maybeCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
  if (!maybeCtor) return null;
  const Ctor = maybeCtor;

  // Ghi âm chỉ thực sự dừng khi học sinh tự bấm "Dừng đọc" (stop()) hoặc
  // quyền micro bị từ chối — mọi lỗi/kết thúc khác đều tự khởi động lại 1
  // phiên nghe mới, không bao giờ tự bỏ cuộc vì lý do kỹ thuật.
  let stoppedByUser = false;
  // Cộng dồn các câu đã được nhận diện CHẮC CHẮN (final) qua nhiều phiên
  // nghe liên tiếp (mỗi phiên chỉ nhận diện được 1 câu rồi tự kết thúc).
  let carriedTranscript = "";
  let lang = opts.lang ?? RECOGNITION_LANG;
  let triedFallbackLang = false;
  let recognition: SpeechRecognitionLike = new Ctor();

  function attach(instance: SpeechRecognitionLike) {
    instance.lang = lang;
    // continuous=false + interimResults=false: cách khắc phục tiêu chuẩn vì
    // Android không thực sự "nghe liên tục" dù đặt continuous=true — mỗi
    // phiên chỉ nhận diện 1 câu nói trọn vẹn rồi tự kết thúc (onend), sau đó
    // attach() lại tự mở phiên mới ngay bên dưới để nghe câu tiếp theo.
    instance.continuous = false;
    instance.interimResults = false;
    instance.maxAlternatives = 1;

    instance.onresult = (event) => {
      const last = event.results[event.results.length - 1];
      const utterance = last[0].transcript.trim();
      if (!utterance) return;
      carriedTranscript = (carriedTranscript + " " + utterance).trim();
      opts.onResult(carriedTranscript, false);
    };

    instance.onerror = (event) => {
      // Một số máy Android không hỗ trợ locale "en-GB" cho nhận diện giọng
      // nói (chỉ có "en-US" cài sẵn) và báo lỗi ngay lập tức — thử lại 1 lần
      // với "en-US" trước khi báo lỗi thật sự cho người dùng.
      if (event.error === "language-not-supported" && !triedFallbackLang && lang !== "en-US") {
        triedFallbackLang = true;
        lang = "en-US";
        return; // onend sẽ tự khởi động lại phiên nghe với lang mới
      }
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        // Bị từ chối quyền micro — không có ý nghĩa để thử lại.
        stoppedByUser = true;
        opts.onError?.(event.error);
        return;
      }
      // Các lỗi khác (thường gặp nhất là "no-speech" khi bé chưa kịp nói gì,
      // hoặc khoảng lặng giữa các câu) sẽ được onend xử lý bằng cách tự mở
      // phiên nghe mới ngay bên dưới — không báo lỗi ra ngoài.
    };

    instance.onend = () => {
      if (stoppedByUser) {
        opts.onEnd?.();
        return;
      }
      restart(250);
    };

    instance.start();
  }

  // Nhiều máy Android (đặc biệt máy Xiaomi/MIUI dùng "Mi AI Speech Engine")
  // cần một khoảng nghỉ giữa 2 phiên nghe — gọi start() lại ngay dễ bị ném
  // lỗi (InvalidStateError), và khoảng nghỉ cần thiết có thể khác nhau tuỳ
  // máy. Thử lại vô thời hạn (giãn cách tăng dần rồi giữ nguyên ở mức trần)
  // thay vì bỏ cuộc sau vài lần, vì ghi âm không được phép tự dừng.
  function restart(delayMs: number) {
    window.setTimeout(() => {
      if (stoppedByUser) return;
      try {
        recognition = new Ctor();
        attach(recognition);
        recognition.start();
      } catch {
        restart(Math.min(delayMs * 2, 3000));
      }
    }, delayMs);
  }

  attach(recognition);

  return {
    stop: () => {
      if (stoppedByUser) return;
      stoppedByUser = true;
      // Một số máy Android đôi khi "kẹt" và không thực sự dừng lắng nghe dù
      // đã gọi stop() (mic phần cứng vẫn mở, onend không bao giờ bắn ra) —
      // gọi thêm abort() (dừng ngay lập tức, huỷ luôn kết quả đang xử lý,
      // mạnh tay hơn stop()) và đặt 1 mốc thời gian an toàn: nếu sau nửa
      // giây trình duyệt vẫn chưa tự báo onend, tự coi như đã dừng để giao
      // diện luôn trả lại quyền điều khiển cho học sinh, không bị treo.
      try {
        recognition.stop();
      } catch {
        // ignore — instance có thể đã ở trạng thái không cho phép stop()
      }
      window.setTimeout(() => {
        try {
          recognition.abort();
        } catch {
          // ignore
        }
      }, 150);
      window.setTimeout(() => opts.onEnd?.(), 500);
    },
  };
}
