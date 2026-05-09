"use client";

import { useState } from "react";
import { ingredients, categories } from "@/lib/ingredients";
import { Language } from "@/lib/types";
import { tCategory } from "@/lib/strings";
import CategoryFilterPills from "@/components/CategoryFilterPills";
import IngredientCard from "@/components/IngredientCard";
import { spacing } from "@/lib/tokens";

interface IngredientsBrowserProps {
  language: Language;
}

export default function IngredientsBrowser({ language }: IngredientsBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIngredients = (
    selectedCategory === "All"
      ? ingredients
      : ingredients.filter((ing) => ing.category === selectedCategory)
  )
    .map((ing) => ({ ...ing, displayName: language === "es" ? ing.nameEs : ing.name }))
    .toSorted((a, b) => a.displayName.localeCompare(b.displayName));

  const localizedCategories = categories.map((c) => ({
    value: c,
    label: tCategory(c, language),
  }));

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <CategoryFilterPills
          categories={localizedCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div
        className={`grid grid-cols-3 md:grid-cols-4 ${spacing.ingredientGridGap} md:-ml-[30px]`}
      >
        {filteredIngredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            name={ingredient.displayName}
            image={ingredient.image}
          />
        ))}
      </div>
    </>
  );
}
