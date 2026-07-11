import { useEffect, useState } from "react";
import PageShell from "../components/layout/PageShell";
import {
  getPreferredVoiceURI,
  isSpeechSynthesisSupported,
  listEnglishVoices,
  previewVoice,
  setPreferredVoiceURI,
} from "../lib/speech";

const SAMPLE_TEXT = "The cat sat on the mat. She likes to ride her bike in the park.";

export default function VoiceSettings() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedURI, setSelectedURI] = useState<string | null>(() => getPreferredVoiceURI());

  useEffect(() => {
    if (!isSpeechSynthesisSupported()) return;
    setVoices(listEnglishVoices());
    const handleChange = () => setVoices(listEnglishVoices());
    window.speechSynthesis.onvoiceschanged = handleChange;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  function handleChoose(voice: SpeechSynthesisVoice) {
    setPreferredVoiceURI(voice.voiceURI);
    setSelectedURI(voice.voiceURI);
  }

  function handleReset() {
    setPreferredVoiceURI(null);
    setSelectedURI(null);
  }

  return (
    <PageShell
      title="Giọng đọc"
      subtitle="Mỗi điện thoại/máy tính có sẵn các giọng đọc khác nhau — bấm nghe thử rồi chọn giọng nào con nghe rõ nhất"
    >
      {!isSpeechSynthesisSupported() && (
        <p className="unsupported-note">⚠️ Trình duyệt này không hỗ trợ đọc mẫu bằng giọng nói.</p>
      )}

      {isSpeechSynthesisSupported() && voices.length === 0 && (
        <p className="unsupported-note">
          Máy này chưa có giọng đọc tiếng Anh nào được cài, hoặc trình duyệt chưa nạp xong danh sách — thử tải
          lại trang.
        </p>
      )}

      <div className="btn-row" style={{ marginBottom: "1.2rem" }}>
        <button type="button" className={"btn" + (selectedURI === null ? " btn-primary" : "")} onClick={handleReset}>
          {selectedURI === null ? "✅ Đang dùng: Tự động chọn" : "Dùng mặc định (tự động chọn)"}
        </button>
      </div>

      <div className="wardrobe-grid">
        {voices.map((voice) => {
          const chosen = selectedURI === voice.voiceURI;
          return (
            <div key={voice.voiceURI} className={"wardrobe-card" + (chosen ? " equipped" : "")}>
              <div className="wardrobe-card__name">{voice.name}</div>
              <div className="story-card__level">{voice.lang}</div>
              <div className="btn-row" style={{ justifyContent: "center", flexWrap: "wrap" }}>
                <button type="button" className="btn btn-ghost" onClick={() => previewVoice(voice, SAMPLE_TEXT)}>
                  🔊 Nghe thử
                </button>
                <button
                  type="button"
                  className={"btn" + (chosen ? " btn-primary" : "")}
                  onClick={() => handleChoose(voice)}
                >
                  {chosen ? "Đang chọn ✅" : "Chọn giọng này"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
