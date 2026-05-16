import { typography } from "@/lib/tokens";
import { RecipeBlock } from "@/lib/types";

interface StepListProps {
  steps: RecipeBlock[];
}

function topGapFor(prev: RecipeBlock | undefined): string {
  if (!prev) return "";
  return prev.kind === "subheading" ? "mt-2" : "mt-5";
}

export default function StepList({ steps }: StepListProps) {
  const nodes: React.ReactNode[] = [];

  for (let index = 0; index < steps.length; index++) {
    const step = steps[index];
    const topGap = index === 0 ? "" : topGapFor(steps[index - 1]);

    if (step.kind === "subheading") {
      nodes.push(
        <h3 key={index} className={`${typography.h3} ${topGap}`}>
          {step.text}
        </h3>
      );
    } else if (step.kind === "bullet") {
      const items: { text: string; key: number }[] = [];
      const start = index;
      while (index < steps.length && steps[index].kind === "bullet") {
        items.push({ text: steps[index].text, key: index });
        index++;
      }
      index--;
      const listGap = start === 0 ? "" : topGapFor(steps[start - 1]);
      nodes.push(
        <ul
          key={start}
          className={`${typography.body} list-disc pl-5 space-y-1 ${listGap}`}
        >
          {items.map((item) => (
            <li key={item.key}>{item.text}</li>
          ))}
        </ul>
      );
    } else {
      nodes.push(
        <p key={index} className={`${typography.body} ${topGap}`}>
          {step.text}
        </p>
      );
    }
  }

  return <div>{nodes}</div>;
}
