import type { RuleNode } from "../../data/rules";
import RuleCard from "./RuleCard";

interface RuleTreeProps {
  title: string;
  rules: RuleNode[];
}

export default function RuleTree({ title, rules }: RuleTreeProps) {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      <div className="rule-grid">
        {rules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>
    </section>
  );
}
