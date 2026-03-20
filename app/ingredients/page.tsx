"use client";

import { useState } from "react";
import { ingredients, categories } from "@/lib/ingredients";
import PageLayout from "@/components/PageLayout";
import CategoryFilterPills from "@/components/CategoryFilterPills";
import IngredientCard from "@/components/IngredientCard";
import { typography, spacing } from "@/lib/tokens";

export default function IngredientsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIngredients =
    selectedCategory === "All"
      ? ingredients
      : ingredients.filter((ing) => ing.category === selectedCategory);

  return (
    <PageLayout activePage="ingredients">
      <h1 className={`${typography.h1} ${spacing.headingMb}`}>
        Ingredients
      </h1>

      <div className="flex items-center justify-between mb-12">
        <CategoryFilterPills
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div
        className={`grid grid-cols-3 md:grid-cols-4 ${spacing.ingredientGridGap}`}
      >
        {filteredIngredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            name={ingredient.name}
            image={ingredient.image}
          />
        ))}
      </div>
    </PageLayout>
  );
}
