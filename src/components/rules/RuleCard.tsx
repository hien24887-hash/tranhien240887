import type { RuleNode } from "../../data/rules";
import { speak } from "../../lib/speech";

interface RuleCardProps {
  rule: RuleNode;
}

export default function RuleCard({ rule }: RuleCardProps) {
  const style = { "--rule-color": rule.color } as React.CSSProperties;

  return (
    <article className="rule-card" style={style}>
      <div className="rule-card__header">
        <span>{rule.label}</span>
        {rule.resultIpa && <span className="rule-card__ipa">{rule.resultIpa}</span>}
      </div>
      <div className="rule-card__body">
        <p className="rule-card__howto">👄 {rule.howTo}</p>

        {rule.variants && (
          <div>
            {rule.variants.map((variant) => (
              <div className="variant-block" key={variant.condition} style={style}>
                <div className="variant-block__condition">{variant.condition}</div>
                <div className="variant-block__ipa">{variant.ipa}</div>
                {variant.examples.length > 0 && (
                  <ul className="rule-card__examples">
                    {variant.examples.map((ex) => (
                      <li key={ex.word}>
                        <button
                          type="button"
                          className="rule-card__word"
                          onClick={() => speak(ex.word)}
                          title="Nghe cách đọc"
                        >
                          🔊 {ex.word}
                        </button>
                        <span className="rule-card__word-ipa">{ex.ipa}</span>
                        <span className="rule-card__word-meaning">{ex.meaning}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {rule.examples && (
          <ul className="rule-card__examples">
            {rule.examples.map((ex) => (
              <li key={ex.word}>
                <button
                  type="button"
                  className="rule-card__word"
                  onClick={() => speak(ex.word)}
                  title="Nghe cách đọc"
                >
                  🔊 {ex.word}
                </button>
                <span className="rule-card__word-ipa">{ex.ipa}</span>
                <span className="rule-card__word-meaning">{ex.meaning}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
