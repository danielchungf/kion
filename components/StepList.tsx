import { typography } from "@/lib/tokens";

interface StepListProps {
  steps: string[];
}

export default function StepList({ steps }: StepListProps) {
  return (
    <div className="space-y-5">
      {steps.map((step, index) => (
        <p
          key={index}
          className={typography.body}
        >
          {step}
        </p>
      ))}
    </div>
  );
}
