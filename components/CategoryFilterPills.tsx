"use client";

import { typography, colors } from "@/lib/tokens";

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
    <div className="flex gap-7 overflow-x-auto whitespace-nowrap no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`${typography.h3} ${
            selected === category
              ? `${colors.text.active} underline underline-offset-[8px]`
              : colors.text.muted
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
