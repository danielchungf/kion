"use client";

interface CategoryFilterPillsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilterPills({
  categories,
  selected,
  onSelect,
}: CategoryFilterPillsProps) {
  return (
    <div className="flex gap-7">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`font-young-serif font-medium text-lg ${
            selected === category
              ? "text-neutral-950 underline underline-offset-[8px]"
              : "text-neutral-500"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
