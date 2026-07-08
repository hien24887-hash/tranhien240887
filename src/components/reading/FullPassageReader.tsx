import { useEffect, useMemo, useRef, useState } from "react";
import type { Story, StoryToken } from "../../data/stories";
import { findRuleById } from "../../data/rules";
import { alignTranscript, type WordMatchResult } from "../../lib/matchWords";
import { isSpeechRecognitionSupported, speak, startRecognition, type RecognitionHandle } from "../../lib/speech";
import { awardStars, recordStoryScore, type AwardResult } from "../../lib/progress";
import { useWallet } from "../../lib/useWallet";
import Mascot from "../mascot/Mascot";
import RewardPopup from "../mascot/RewardPopup";
import WordChip, { type ChipStatus } from "./WordChip";
import MicButton from "./MicButton";

interface FullPassageReaderProps {
  story: Story;
}

// Đọc xong 1 bài trong chương trình 50 ngày được tính công gấp bội (bằng 1
// buổi luyện tập trọn vẹn) so với đọc đúng 1 từ ở "Viết phiên âm" hay xong 1
// truyện ngắn ở "Đọc truyện" — vì đây là bài dài, đọc hết cả trang.
const STARS_PER_PASSAGE = 10;

export default function FullPassageReader({ story }: FullPassageReaderProps) {
  const micSupported = useMemo(() => isSpeechRecognitionSupported(), []);
  const wallet = useWallet();
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [micError, setMicError] = useState<string | null>(null);
  const [results, setResults] = useState<WordMatchResult[] | null>(null);
  const [finished, setFinished] = useState(false);
  const [rewardPopup, setRewardPopup] = useState<AwardResult | null>(null);
  const recognitionRef = useRef<RecognitionHandle | null>(null);
  const transcriptRef = useRef("");
  const finalizedRef = useRef(false);

  // Toàn bộ từ trong bài, giữ nguyên chia theo câu để hiển thị, nhưng chấm
  // điểm gộp chung 1 lượt cho cả trang (không giới hạn theo từng câu).
  const flatWords = useMemo(() => story.sentences.flatMap((s) => s.map((t) => t.text)), [story]);
  const sentenceStartOffsets = useMemo(() => {
    let offset = 0;
    return story.sentences.map((s) => {
      const start = offset;
      offset += s.length;
      return start;
    });
  }, [story]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  function statusFor(sentenceIdx: number, wordIdx: number): ChipStatus {
    if (!results) return "neutral";
    const flatIndex = sentenceStartOffsets[sentenceIdx] + wordIdx;
    const found = results.find((r) => r.index === flatIndex);
    return found ? found.status : "neutral";
  }

  function finalizeReading(transcript: string) {
    if (finalizedRef.current) return;
    finalizedRef.current = true;
    const heardWords = transcript.split(/\s+/).filter(Boolean);
    setResults(alignTranscript(flatWords, heardWords));
  }

  function beginRecording() {
    if (!micSupported) return;
    transcriptRef.current = "";
    finalizedRef.current = false;
    setLiveTranscript("");
    setMicError(null);
    setIsRecording(true);

    // Không đặt giới hạn thời gian ghi âm — bài đọc 50 ngày để bé tự đọc
    // theo tốc độ riêng, đọc xong tự bấm "Dừng đọc" chứ không bị cắt ngang.
    recognitionRef.current = startRecognition({
      continuous: true,
      onResult: (transcript) => {
        transcriptRef.current = transcript;
        setLiveTranscript(transcript);
      },
      onEnd: () => {
        setIsRecording(false);
        finalizeReading(transcriptRef.current);
      },
      onError: (error) => {
        setIsRecording(false);
        if (error === "not-allowed" || error === "service-not-allowed") {
          // Bị từ chối quyền micro — báo rõ lý do thay vì âm thầm chấm cả
          // bài là sai (transcript rỗng), khiến phụ huynh/bé tưởng app lỗi.
          setMicError(
            'Trình duyệt chưa được cấp quyền Micro. Bấm vào biểu tượng khóa 🔒 cạnh đường link, cho phép Micro rồi bấm "Bắt đầu đọc" lại.'
          );
          return;
        }
        finalizeReading(transcriptRef.current);
      },
    });
  }

  function handleToggleRecording() {
    if (isRecording) {
      recognitionRef.current?.stop();
      return;
    }
    beginRecording();
  }

  function handleRetry() {
    recognitionRef.current?.stop();
    setResults(null);
    setLiveTranscript("");
  }

  function handleWordClick(token: StoryToken) {
    if (isRecording) return;
    speak(token.text);
  }

  function handleListenAll() {
    if (isRecording) return;
    speak(story.sentences.map((s) => s.map((t) => t.text).join(" ")).join(". "));
  }

  function handleFinish() {
    if (!results) return;
    const correctWords = results.filter((r) => r.status === "correct").length;
    recordStoryScore(story.id, correctWords, flatWords.length);
    const result = awardStars(STARS_PER_PASSAGE);
    if (result.newTrophies > 0 || result.newMoneyVnd > 0) setRewardPopup(result);
    setFinished(true);
  }

  function handleRestart() {
    recognitionRef.current?.stop();
    setResults(null);
    setLiveTranscript("");
    setFinished(false);
  }

  if (finished && results) {
    const correctWords = results.filter((r) => r.status === "correct").length;
    return (
      <div className="story-reader">
        <div className="mascot-row">
          <Mascot pose="cheer" size={90} equippedBySlot={wallet.equippedBySlot} />
        </div>
        <h3>🎉 Hoàn thành bài "{story.title}"!</h3>
        <p className="final-score">
          Đọc đúng {correctWords}/{flatWords.length} từ — <span className="star-gain">+{STARS_PER_PASSAGE} ⭐</span>
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <button type="button" className="btn btn-primary" onClick={handleRestart}>
            Đọc lại từ đầu
          </button>
        </div>
        {rewardPopup && (
          <RewardPopup
            newTrophies={rewardPopup.newTrophies}
            newMoneyVnd={rewardPopup.newMoneyVnd}
            onClose={() => setRewardPopup(null)}
            equippedBySlot={wallet.equippedBySlot}
          />
        )}
      </div>
    );
  }

  const incorrectTokens: { token: StoryToken; flatIndex: number }[] = results
    ? results
        .filter((r) => r.status === "incorrect")
        .map((r) => ({ token: story.sentences.flat()[r.index], flatIndex: r.index }))
    : [];
  const correctCount = results ? results.length - incorrectTokens.length : 0;

  return (
    <div className="story-reader">
      <p className="score-line">
        Cả bài — {flatWords.length} từ, {story.sentences.length} câu
      </p>

      <div className="full-passage">
        {story.sentences.map((sentence, sIdx) => (
          <div className="sentence-row" key={sIdx}>
            {sentence.map((token, wIdx) => (
              <WordChip
                key={wIdx}
                text={token.text + (token.punct ?? "")}
                ipa={token.ipa}
                status={statusFor(sIdx, wIdx)}
                onClick={() => handleWordClick(token)}
              />
            ))}
          </div>
        ))}
      </div>

      {!micSupported && (
        <p className="unsupported-note">
          ⚠️ Trình duyệt này không hỗ trợ nhận diện giọng nói. Con vẫn có thể bấm "Nghe mẫu" và từng từ để
          luyện nghe — hãy thử mở trang bằng Google Chrome để dùng được phần chấm đọc.
        </p>
      )}

      {isRecording && (
        <p className="unsupported-note">
          🎙 Đang nghe, con cứ đọc từ từ hết cả bài... {liveTranscript}
          <br />
          Đọc xong thì bấm "Dừng đọc".
        </p>
      )}

      {micError && <p className="unsupported-note">⚠️ {micError}</p>}

      <div className="btn-row" style={{ marginTop: "1rem" }}>
        <button type="button" className="btn btn-ghost" onClick={handleListenAll} disabled={isRecording}>
          🔊 Nghe mẫu cả bài
        </button>
        <MicButton recording={isRecording} supported={micSupported} onClick={handleToggleRecording} />
        {results && (
          <button type="button" className="btn btn-ghost" onClick={handleRetry} disabled={isRecording}>
            🔁 Đọc lại từ đầu
          </button>
        )}
        <button type="button" className="btn btn-primary" onClick={handleFinish} disabled={!results || isRecording}>
          Hoàn thành 🏁
        </button>
      </div>

      {results && (
        <>
          <p className="score-line">
            Kết quả: {correctCount}/{results.length} từ đúng
          </p>
          {incorrectTokens.length === 0 ? (
            <div className="feedback-banner correct">🎉 Con đọc đúng hết cả bài rồi!</div>
          ) : (
            <div className="error-tip-panel">
              <h4>📌 Sửa lỗi đọc — các từ cần luyện lại</h4>
              <ul className="error-tip-list">
                {incorrectTokens.map(({ token, flatIndex }) => {
                  const rule = token.ruleId ? findRuleById(token.ruleId) : undefined;
                  return (
                    <li key={flatIndex}>
                      <button
                        type="button"
                        className="chip chip-error"
                        onClick={() => speak(token.text)}
                        title="Nghe lại từ này"
                      >
                        🔊 {token.text}
                      </button>
                      <span className="rule-card__word-ipa">{token.ipa}</span>
                      {rule ? (
                        <span>
                          💡 Quy tắc <strong>{rule.label}</strong> → {rule.resultIpa ?? ""}: {rule.howTo}
                        </span>
                      ) : (
                        <span>💡 Hãy nghe kỹ âm mẫu rồi đọc lại thật chậm theo phiên âm ở trên.</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
