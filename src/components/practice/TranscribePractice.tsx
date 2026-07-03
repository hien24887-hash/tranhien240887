import { useMemo, useRef, useState, type FormEvent } from "react";
import { wordBank, type Difficulty, type PracticeWord } from "../../data/words";
import { findRuleById } from "../../data/rules";
import { compareIpa } from "../../lib/ipaCompare";
import { awardStars, recordWordAttempt, type AwardResult } from "../../lib/progress";
import { useWallet } from "../../lib/useWallet";
import { speak } from "../../lib/speech";
import IpaKeyboard from "../rules/IpaKeyboard";
import RewardPopup from "../mascot/RewardPopup";
import WordFeedback from "./WordFeedback";

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: "Cấp 1 — Dễ nhất",
  2: "Cấp 2 — Dễ",
  3: "Cấp 3 — Trung bình",
  4: "Cấp 4 — Khó",
  5: "Cấp 5 — Khó nhất",
};
const ALL_DIFFICULTIES: (Difficulty | "all")[] = ["all", 1, 2, 3, 4, 5];

function poolFor(difficulty: Difficulty | "all", ruleId: string): PracticeWord[] {
  return wordBank.filter(
    (w) => (difficulty === "all" || w.difficulty === difficulty) && (ruleId === "all" || w.ruleId === ruleId)
  );
}

function pickRandomWord(pool: PracticeWord[], excludeWord?: string): PracticeWord {
  const candidates = pool.length > 1 ? pool.filter((w) => w.word !== excludeWord) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export default function TranscribePractice() {
  const wallet = useWallet();
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");
  const [ruleFilter, setRuleFilter] = useState<string>("all");

  const ruleOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const w of wordBank) {
      if (difficultyFilter !== "all" && w.difficulty !== difficultyFilter) continue;
      if (!seen.has(w.ruleId)) {
        const rule = findRuleById(w.ruleId);
        seen.set(w.ruleId, rule ? `${rule.label} ${rule.resultIpa ?? ""}`.trim() : "Sight words / bất quy tắc");
      }
    }
    return Array.from(seen.entries());
  }, [difficultyFilter]);

  const [currentWord, setCurrentWord] = useState<PracticeWord>(() => pickRandomWord(wordBank));
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [starsGained, setStarsGained] = useState(0);
  const [rewardPopup, setRewardPopup] = useState<AwardResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function refreshWord(nextDifficulty: Difficulty | "all", nextRule: string) {
    const pool = poolFor(nextDifficulty, nextRule);
    setCurrentWord(pickRandomWord(pool.length > 0 ? pool : wordBank));
    setAnswer("");
    setSubmitted(false);
  }

  function handleSelectDifficulty(d: Difficulty | "all") {
    setDifficultyFilter(d);
    setRuleFilter("all");
    refreshWord(d, "all");
  }

  function handleSelectRule(id: string) {
    setRuleFilter(id);
    refreshWord(difficultyFilter, id);
  }

  function handleInsert(symbol: string) {
    const input = inputRef.current;
    if (!input) {
      setAnswer((prev) => prev + symbol);
      return;
    }
    const start = input.selectionStart ?? answer.length;
    const end = input.selectionEnd ?? answer.length;
    const next = answer.slice(0, start) + symbol + answer.slice(end);
    setAnswer(next);
    requestAnimationFrame(() => {
      input.focus();
      const caret = start + symbol.length;
      input.setSelectionRange(caret, caret);
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitted || !answer.trim()) return;
    const correct = compareIpa(answer, currentWord.ipa);
    setIsCorrect(correct);
    setSubmitted(true);
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    recordWordAttempt(currentWord.word, correct);
    if (correct) {
      setStarsGained(1);
      const result = awardStars(1);
      if (result.newTrophies > 0 || result.newMoneyVnd > 0) setRewardPopup(result);
    } else {
      setStarsGained(0);
    }
  }

  function handleNext() {
    const pool = poolFor(difficultyFilter, ruleFilter);
    setCurrentWord(pickRandomWord(pool.length > 0 ? pool : wordBank, currentWord.word));
    setAnswer("");
    setSubmitted(false);
  }

  return (
    <div>
      <div className="rule-picker">
        {ALL_DIFFICULTIES.map((d) => (
          <button
            key={d}
            type="button"
            className={"tab" + (difficultyFilter === d ? " active" : "")}
            onClick={() => handleSelectDifficulty(d)}
          >
            {d === "all" ? "Tất cả cấp độ" : DIFFICULTY_LABELS[d]}
          </button>
        ))}
      </div>

      <div className="rule-picker">
        <button
          type="button"
          className={"btn" + (ruleFilter === "all" ? " btn-primary" : "")}
          onClick={() => handleSelectRule("all")}
        >
          Ôn tập ngẫu nhiên (trong cấp độ này)
        </button>
        {ruleOptions.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={"btn" + (ruleFilter === id ? " btn-primary" : "")}
            onClick={() => handleSelectRule(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="score-line">
        Điểm: {score.correct}/{score.total}
      </p>

      <div className="practice-card">
        <p className="practice-word">{currentWord.word}</p>
        <p className="practice-rule-label">
          Cấp {currentWord.difficulty} — Hãy gõ phiên âm IPA của từ này
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="answer-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="/.../"
            disabled={submitted}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <IpaKeyboard onInsert={handleInsert} />

          <div className="btn-row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn btn-ghost" onClick={() => speak(currentWord.word)}>
              🔊 Nghe từ
            </button>
            {!submitted ? (
              <button type="submit" className="btn btn-primary">
                Kiểm tra
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Từ tiếp theo →
              </button>
            )}
          </div>
        </form>

        {submitted && (
          <WordFeedback word={currentWord} correct={isCorrect} starsGained={starsGained} />
        )}
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
