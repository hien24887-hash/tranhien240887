import type { PracticeWord } from "../../data/words";
import { findRuleById } from "../../data/rules";

interface WordFeedbackProps {
  word: PracticeWord;
  correct: boolean;
  starsGained?: number;
}

export default function WordFeedback({ word, correct, starsGained = 0 }: WordFeedbackProps) {
  const rule = findRuleById(word.ruleId);

  return (
    <div className={"feedback-banner " + (correct ? "correct" : "incorrect")}>
      {correct ? (
        <p>
          ✅ Chính xác! <strong>{word.word}</strong> = {word.ipa} — {word.meaning}
          {starsGained > 0 && <span className="star-gain">+{starsGained} ⭐</span>}
        </p>
      ) : (
        <p>
          ❌ Chưa đúng. Đáp án đúng là <strong>{word.ipa}</strong> — {word.meaning}
        </p>
      )}
      {(rule || word.note) && (
        <p className="feedback-banner__rule">
          {rule && (
            <>
              💡 Vì sao? Quy tắc <strong>{rule.label}</strong> → {rule.resultIpa ?? ""}: {rule.howTo}
            </>
          )}
          {word.note && <> {word.note}</>}
        </p>
      )}
    </div>
  );
}
