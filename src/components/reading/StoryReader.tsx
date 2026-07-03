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

interface StoryReaderProps {
  story: Story;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const micSupported = useMemo(() => isSpeechRecognitionSupported(), []);
  const wallet = useWallet();
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [resultsBySentence, setResultsBySentence] = useState<(WordMatchResult[] | null)[]>(() =>
    story.sentences.map(() => null)
  );
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [finished, setFinished] = useState(false);
  const [rewardPopup, setRewardPopup] = useState<AwardResult | null>(null);
  const recognitionRef = useRef<RecognitionHandle | null>(null);
  // Theo dõi transcript mới nhất + đã chấm điểm chưa bằng ref (không phải
  // state) để tránh đọc giá trị cũ (stale closure) trong các callback bất
  // đồng bộ của SpeechRecognition (onresult/onend/onerror).
  const transcriptRef = useRef("");
  const finalizedRef = useRef(false);
  const sentenceIdxRef = useRef(sentenceIdx);
  sentenceIdxRef.current = sentenceIdx;

  const currentSentence = story.sentences[sentenceIdx];
  const currentResults = resultsBySentence[sentenceIdx];

  // Nếu người dùng rời trang/đổi truyện giữa lúc đang ghi âm, phải dừng
  // micro thật sự — nếu không mic vẫn nghe ngầm dù giao diện đã tắt đi.
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  function statusFor(index: number): ChipStatus {
    const found = currentResults?.find((r) => r.index === index);
    return found ? found.status : "neutral";
  }

  function finalizeSentence(transcript: string) {
    if (finalizedRef.current) return;
    finalizedRef.current = true;
    const targetIdx = sentenceIdxRef.current;
    const expectedWords = story.sentences[targetIdx].map((t) => t.text);
    const heardWords = transcript.split(/\s+/).filter(Boolean);
    const results = alignTranscript(expectedWords, heardWords);
    setResultsBySentence((prev) => {
      const next = [...prev];
      next[targetIdx] = results;
      return next;
    });
  }

  function beginRecording() {
    if (!micSupported) return;

    transcriptRef.current = "";
    finalizedRef.current = false;
    setLiveTranscript("");
    setIsRecording(true);

    // Không đặt giới hạn thời gian ghi âm — bé tự đọc theo tốc độ riêng,
    // đọc xong tự bấm "Dừng đọc" chứ không bị cắt ngang giữa chừng.
    recognitionRef.current = startRecognition({
      continuous: true,
      onResult: (transcript) => {
        transcriptRef.current = transcript;
        setLiveTranscript(transcript);
      },
      onEnd: () => {
        setIsRecording(false);
        finalizeSentence(transcriptRef.current);
      },
      onError: () => {
        setIsRecording(false);
        finalizeSentence(transcriptRef.current);
      },
    });
  }

  function handleToggleRecording() {
    if (isRecording) {
      // Dừng thủ công: onend sẽ tự chấm điểm với transcript đã có.
      recognitionRef.current?.stop();
      return;
    }
    beginRecording();
  }

  function handleRetrySentence() {
    recognitionRef.current?.stop();
    setResultsBySentence((prev) => {
      const next = [...prev];
      next[sentenceIdx] = null;
      return next;
    });
    setLiveTranscript("");
  }

  function handleWordClick(index: number) {
    if (isRecording) return; // tránh mic tự nghe lại tiếng loa phát ra
    speak(currentSentence[index].text);
  }

  function handleListenSentence() {
    if (isRecording) return;
    speak(currentSentence.map((t) => t.text).join(" "));
  }

  function handleAdvance() {
    recognitionRef.current?.stop();
    if (sentenceIdx < story.sentences.length - 1) {
      setSentenceIdx((i) => i + 1);
      setLiveTranscript("");
      return;
    }
    const totalWords = story.sentences.reduce((sum, s) => sum + s.length, 0);
    const correctWords = resultsBySentence.reduce(
      (sum, results) => sum + (results?.filter((r) => r.status === "correct").length ?? 0),
      0
    );
    recordStoryScore(story.id, correctWords, totalWords);
    const result = awardStars(1);
    if (result.newTrophies > 0 || result.newMoneyVnd > 0) setRewardPopup(result);
    setFinished(true);
  }

  function handleRestart() {
    recognitionRef.current?.stop();
    setSentenceIdx(0);
    setResultsBySentence(story.sentences.map(() => null));
    setLiveTranscript("");
    setFinished(false);
  }

  if (finished) {
    const totalWords = story.sentences.reduce((sum, s) => sum + s.length, 0);
    const correctWords = resultsBySentence.reduce(
      (sum, results) => sum + (results?.filter((r) => r.status === "correct").length ?? 0),
      0
    );
    return (
      <div className="story-reader">
        <div className="mascot-row">
          <Mascot pose="cheer" size={90} equippedBySlot={wallet.equippedBySlot} />
        </div>
        <h3>🎉 Hoàn thành bài "{story.title}"!</h3>
        <p className="final-score">
          Đọc đúng {correctWords}/{totalWords} từ — <span className="star-gain">+1 ⭐</span>
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

  const incorrectTokens: { token: StoryToken; index: number }[] = currentResults
    ? currentResults
        .filter((r) => r.status === "incorrect")
        .map((r) => ({ token: currentSentence[r.index], index: r.index }))
    : [];
  const correctCount = currentResults ? currentResults.length - incorrectTokens.length : 0;

  return (
    <div className="story-reader">
      <p className="score-line">
        Câu {sentenceIdx + 1}/{story.sentences.length}
      </p>

      <div className="sentence-row">
        {currentSentence.map((token, idx) => (
          <WordChip
            key={idx}
            text={token.text + (token.punct ?? "")}
            ipa={token.ipa}
            status={statusFor(idx)}
            onClick={() => handleWordClick(idx)}
          />
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
          🎙 Đang nghe, con cứ đọc từ từ... {liveTranscript}
          <br />
          Đọc xong thì bấm "Dừng đọc".
        </p>
      )}

      <div className="btn-row" style={{ marginTop: "1rem" }}>
        <button type="button" className="btn btn-ghost" onClick={handleListenSentence} disabled={isRecording}>
          🔊 Nghe mẫu cả câu
        </button>
        <MicButton recording={isRecording} supported={micSupported} onClick={handleToggleRecording} />
        {currentResults && (
          <button type="button" className="btn btn-ghost" onClick={handleRetrySentence} disabled={isRecording}>
            🔁 Đọc lại câu này
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAdvance}
          disabled={!currentResults || isRecording}
        >
          {sentenceIdx < story.sentences.length - 1 ? "Câu tiếp theo →" : "Xem kết quả 🏁"}
        </button>
      </div>

      {currentResults && (
        <>
          <p className="score-line">
            Câu này: {correctCount}/{currentResults.length} từ đúng
          </p>
          {incorrectTokens.length === 0 ? (
            <div className="feedback-banner correct">🎉 Con đọc đúng hết cả câu này rồi!</div>
          ) : (
            <div className="error-tip-panel">
              <h4>📌 Sửa lỗi đọc — các từ cần luyện lại</h4>
              <ul className="error-tip-list">
                {incorrectTokens.map(({ token, index }) => {
                  const rule = token.ruleId ? findRuleById(token.ruleId) : undefined;
                  return (
                    <li key={index}>
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
