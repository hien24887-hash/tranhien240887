import { useState } from "react";
import PageShell from "../components/layout/PageShell";
import RuleTree from "../components/rules/RuleTree";
import {
  alwaysSameConsonants,
  digraphConsonants,
  conditionalConsonants,
  findRuleById,
  sightWords,
} from "../data/rules";
import { speak } from "../lib/speech";

const vowelGroups: { title: string; ids: string[] }[] = [
  { title: "Nguyên âm A", ids: ["a-cons", "a-cons-e", "a-r", "are"] },
  { title: "Nguyên âm E", ids: ["e-cons", "e-cons-e", "e-r"] },
  { title: "Nguyên âm I", ids: ["i-cons", "i-cons-e", "i-r"] },
  { title: "Nguyên âm O", ids: ["o-cons", "o-cons-e", "o-r", "ow-oa", "o-ld-st"] },
  { title: "Nguyên âm U", ids: ["u-cons", "u-cons-e", "u-r"] },
];

type Tab = "vowel" | "consonant" | "sight";

export default function Rules() {
  const [tab, setTab] = useState<Tab>("vowel");

  return (
    <PageShell
      title="Quy tắc đọc"
      subtitle="Mỗi thẻ quy tắc trả lời 1 câu hỏi: mặt chữ này đọc thành âm gì, và vì sao?"
    >
      <div className="tabs">
        <button type="button" className={"tab" + (tab === "vowel" ? " active" : "")} onClick={() => setTab("vowel")}>
          Nguyên âm
        </button>
        <button
          type="button"
          className={"tab" + (tab === "consonant" ? " active" : "")}
          onClick={() => setTab("consonant")}
        >
          Phụ âm
        </button>
        <button type="button" className={"tab" + (tab === "sight" ? " active" : "")} onClick={() => setTab("sight")}>
          Sight words
        </button>
      </div>

      {tab === "vowel" &&
        vowelGroups.map((group) => (
          <RuleTree
            key={group.title}
            title={group.title}
            rules={group.ids.map((id) => findRuleById(id)).filter((r): r is NonNullable<typeof r> => Boolean(r))}
          />
        ))}

      {tab === "consonant" && (
        <>
          <section>
            <h2 className="section-title">Phụ âm luôn giữ nguyên</h2>
            <p>Mặt chữ viết thế nào thì mặt đọc như vậy — bấm vào từng phụ âm để nghe.</p>
            <div className="chip-grid">
              {alwaysSameConsonants.map((c) => (
                <button key={c.letter} type="button" className="chip" onClick={() => speak(c.letter)}>
                  {c.letter} {c.ipa}
                </button>
              ))}
            </div>
          </section>

          <RuleTree title="Tổ hợp phụ âm có cách đọc cố định" rules={digraphConsonants} />
          <RuleTree title="Phụ âm thay đổi theo ngữ cảnh" rules={conditionalConsonants} />
        </>
      )}

      {tab === "sight" && (
        <section>
          <h2 className="section-title">Sight words — ngoại lệ cần học thuộc</h2>
          <p>
            Đây là những từ vựng phổ biến, lặp lại liên tục trong câu, nhưng <strong>không</strong> theo quy tắc
            phát âm thông thường — cần nghe và học thuộc trực tiếp.
          </p>
          <table className="sight-table">
            <thead>
              <tr>
                {sightWords.map((w) => (
                  <th key={w.word}>{w.word}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {sightWords.map((w) => (
                  <td key={w.word}>
                    <button type="button" className="chip" onClick={() => speak(w.word)}>
                      {w.ipa}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </section>
      )}
    </PageShell>
  );
}
