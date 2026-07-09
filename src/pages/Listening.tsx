import { useMemo, useState } from "react";
import PageShell from "../components/layout/PageShell";
import ListeningLesson from "../components/listening/ListeningLesson";
import { listeningLessons, type ListeningLesson as ListeningLessonData } from "../data/listening";
import { getListeningScores } from "../lib/progress";

export default function Listening() {
  const [selected, setSelected] = useState<ListeningLessonData | null>(null);
  const scores = useMemo(() => getListeningScores(), [selected]);
  const completedCount = listeningLessons.filter((l) => scores[l.id]).length;

  return (
    <PageShell
      title="Nghe hiểu"
      subtitle={`Nghe app đọc bài rồi trả lời câu hỏi bên dưới — đã hoàn thành ${completedCount}/${listeningLessons.length} bài`}
    >
      {!selected ? (
        <div className="story-grid">
          {listeningLessons.map((lesson) => {
            const done = Boolean(scores[lesson.id]);
            return (
              <button
                key={lesson.id}
                type="button"
                className={"story-card" + (done ? " completed" : "")}
                onClick={() => setSelected(lesson)}
              >
                <div className="story-card__title">
                  {done && "✅ "}
                  {lesson.title}
                </div>
                <div className="story-card__level">{lesson.level}</div>
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="btn-row" style={{ marginBottom: "1rem" }}>
            <button type="button" className="btn btn-ghost" onClick={() => setSelected(null)}>
              ← Chọn bài khác
            </button>
          </div>
          <ListeningLesson key={selected.id} lesson={selected} />
        </div>
      )}
    </PageShell>
  );
}
