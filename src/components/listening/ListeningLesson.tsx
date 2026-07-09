import { useState } from "react";
import type { ListeningLesson as ListeningLessonData } from "../../data/listening";
import { speak } from "../../lib/speech";
import { awardStars, recordListeningScore, type AwardResult } from "../../lib/progress";
import { useWallet } from "../../lib/useWallet";
import Mascot from "../mascot/Mascot";
import RewardPopup from "../mascot/RewardPopup";

interface ListeningLessonProps {
  lesson: ListeningLessonData;
}

const STARS_PER_LESSON = 1;

export default function ListeningLesson({ lesson }: ListeningLessonProps) {
  const wallet = useWallet();
  const [answers, setAnswers] = useState<(number | null)[]>(() => lesson.questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [rewardPopup, setRewardPopup] = useState<AwardResult | null>(null);

  const allAnswered = answers.every((a) => a !== null);
  const correctCount = submitted
    ? answers.filter((a, i) => a === lesson.questions[i].correctIndex).length
    : 0;

  function handleListen() {
    speak(lesson.passage, { rate: 0.85 });
  }

  function handleSelect(qIndex: number, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optionIndex;
      return next;
    });
  }

  function handleSubmit() {
    if (!allAnswered || submitted) return;
    const correct = answers.filter((a, i) => a === lesson.questions[i].correctIndex).length;
    recordListeningScore(lesson.id, correct, lesson.questions.length);
    const result = awardStars(STARS_PER_LESSON);
    if (result.newTrophies > 0 || result.newMoneyVnd > 0) setRewardPopup(result);
    setSubmitted(true);
  }

  function handleRetry() {
    setAnswers(lesson.questions.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className="story-reader">
      <p className="score-line">{lesson.questions.length} câu hỏi — nghe kỹ rồi chọn đáp án đúng</p>

      <div className="btn-row" style={{ justifyContent: "center", marginBottom: "1.4rem" }}>
        <button type="button" className="btn btn-primary" onClick={handleListen}>
          🔊 Nghe bài
        </button>
      </div>

      {lesson.questions.map((q, qIndex) => {
        const selected = answers[qIndex];
        return (
          <div key={qIndex} className="listening-question">
            <p className="listening-question__text">
              {qIndex + 1}. {q.question}
            </p>
            <div className="listening-options">
              {q.options.map((option, optionIndex) => {
                let statusClass = "";
                if (submitted) {
                  if (optionIndex === q.correctIndex) statusClass = " correct";
                  else if (optionIndex === selected) statusClass = " incorrect";
                } else if (optionIndex === selected) {
                  statusClass = " selected";
                }
                return (
                  <button
                    key={optionIndex}
                    type="button"
                    className={"option-btn" + statusClass}
                    onClick={() => handleSelect(qIndex, optionIndex)}
                    disabled={submitted}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="btn-row" style={{ justifyContent: "center", marginTop: "1.2rem" }}>
        {!submitted ? (
          <button type="button" className="btn btn-primary" disabled={!allAnswered} onClick={handleSubmit}>
            Nộp bài 🏁
          </button>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={handleRetry}>
            🔁 Làm lại
          </button>
        )}
      </div>

      {submitted && (
        <>
          <div className="mascot-row">
            <Mascot pose={correctCount === lesson.questions.length ? "cheer" : "idle"} size={80} equippedBySlot={wallet.equippedBySlot} />
          </div>
          <p className="final-score">
            Đúng {correctCount}/{lesson.questions.length} câu — <span className="star-gain">+{STARS_PER_LESSON} ⭐</span>
          </p>
          <div className="unsupported-note">
            📄 <strong>Bài nghe:</strong> {lesson.passage}
          </div>
        </>
      )}

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
