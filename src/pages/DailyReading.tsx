import { useState } from "react";
import PageShell from "../components/layout/PageShell";
import FullPassageReader from "../components/reading/FullPassageReader";
import { dailyReadingDays } from "../data/dailyReading";
import { getStoryScores } from "../lib/progress";
import type { Story } from "../data/stories";

export default function DailyReading() {
  const [selected, setSelected] = useState<Story | null>(null);
  const scores = getStoryScores();
  const completedCount = dailyReadingDays.filter((d) => scores[d.id]).length;

  return (
    <PageShell
      title="Luyện đọc 50 ngày"
      subtitle={`Mỗi ngày 1 bài đọc hoàn chỉnh kèm phiên âm IPA — đã hoàn thành ${completedCount}/${dailyReadingDays.length} ngày (chương trình đủ 50 ngày sẽ được bổ sung thêm dần)`}
    >
      {!selected ? (
        <div className="story-grid">
          {dailyReadingDays.map((d) => {
            const done = Boolean(scores[d.id]);
            return (
              <button
                key={d.id}
                type="button"
                className={"story-card" + (done ? " completed" : "")}
                onClick={() => setSelected(d)}
              >
                <div className="story-card__title">
                  {done && "✅ "}
                  {d.title}
                </div>
                <div className="story-card__level">{d.level}</div>
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="btn-row" style={{ marginBottom: "1rem" }}>
            <button type="button" className="btn btn-ghost" onClick={() => setSelected(null)}>
              ← Chọn ngày khác
            </button>
          </div>
          <FullPassageReader key={selected.id} story={selected} />
        </div>
      )}
    </PageShell>
  );
}
