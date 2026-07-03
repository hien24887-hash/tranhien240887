import { useMemo, useState } from "react";
import PageShell from "../components/layout/PageShell";
import StoryReader from "../components/reading/StoryReader";
import { stories, type Story } from "../data/stories";
import type { Difficulty } from "../data/words";

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: "Cấp 1 — Dễ nhất",
  2: "Cấp 2 — Dễ",
  3: "Cấp 3 — Trung bình",
  4: "Cấp 4 — Khó",
  5: "Cấp 5 — Khó nhất",
};
const TABS: (Difficulty | "all")[] = [1, 2, 3, 4, 5, "all"];

export default function Read() {
  const [selected, setSelected] = useState<Story | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">(1);

  const filteredStories = useMemo(
    () => (difficultyFilter === "all" ? stories : stories.filter((s) => s.difficulty === difficultyFilter)),
    [difficultyFilter]
  );

  return (
    <PageShell
      title="Đọc truyện theo phiên âm IPA"
      subtitle="Đọc to theo phiên âm, app sẽ nghe và tô màu từng từ đúng/sai để sửa lỗi đọc — chọn cấp độ từ dễ đến khó"
    >
      {!selected ? (
        <div>
          <div className="tabs">
            {TABS.map((d) => {
              const count = d === "all" ? stories.length : stories.filter((s) => s.difficulty === d).length;
              const label = d === "all" ? "Tất cả cấp độ" : DIFFICULTY_LABELS[d];
              return (
                <button
                  key={d}
                  type="button"
                  className={"tab" + (difficultyFilter === d ? " active" : "")}
                  onClick={() => setDifficultyFilter(d)}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>

          <div className="story-grid">
            {filteredStories.map((story) => (
              <button key={story.id} type="button" className="story-card" onClick={() => setSelected(story)}>
                <div className="story-card__title">{story.title}</div>
                <div className="story-card__level">{story.level}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="btn-row" style={{ marginBottom: "1rem" }}>
            <button type="button" className="btn btn-ghost" onClick={() => setSelected(null)}>
              ← Chọn truyện khác
            </button>
          </div>
          <StoryReader key={selected.id} story={selected} />
        </div>
      )}
    </PageShell>
  );
}
