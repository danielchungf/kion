import { typography } from "@/lib/tokens";
import { RecipeBlock } from "@/lib/types";

interface StepListProps {
  steps: RecipeBlock[];
}

export default function StepList({ steps }: StepListProps) {
  return (
    <div>
      {steps.map((step, index) => {
        const prev = steps[index - 1];
        const topGap =
          index === 0
            ? ""
            : prev?.kind === "subheading"
            ? "mt-2"
            : "mt-5";
        return step.kind === "subheading" ? (
          <h3 key={index} className={`${typography.h3} ${topGap}`}>
            {step.text}
          </h3>
        ) : (
          <p key={index} className={`${typography.body} ${topGap}`}>
            {step.text}
          </p>
        );
      })}
    </div>
  );
}
