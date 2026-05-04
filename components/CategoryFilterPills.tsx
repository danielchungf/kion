"use client";

import { typography, colors } from "@/lib/tokens";

interface CategoryOption {
  value: string;
  label: string;
}

interface CategoryFilterPillsProps {
  categories: CategoryOption[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilterPills({
  categories,
  selected,
  onSelect,
}: CategoryFilterPillsProps) {
  return (
    <div className="flex items-start gap-7 overflow-x-auto whitespace-nowrap no-scrollbar">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelect(category.value)}
          className={`${typography.h3} ${
            selected === category.value
              ? `${colors.text.active} border-b-2 border-neutral-800 pb-1`
              : `${colors.text.muted} hover:text-neutral-800 transition-colors pb-1 border-b-2 border-transparent`
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
