interface StepListProps {
  steps: string[];
}

export default function StepList({ steps }: StepListProps) {
  return (
    <div className="space-y-5">
      {steps.map((step, index) => (
        <p
          key={index}
          className="font-source-serif text-neutral-700 text-[16px] tracking-tight leading-relaxed"
        >
          {step}
        </p>
      ))}
    </div>
  );
}
