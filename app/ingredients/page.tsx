"use client";

import { useState } from "react";
import { ingredients, categories } from "@/lib/ingredients";
import PageLayout from "@/components/PageLayout";
import CategoryFilterPills from "@/components/CategoryFilterPills";
import IngredientCard from "@/components/IngredientCard";

export default function IngredientsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIngredients =
    selectedCategory === "All"
      ? ingredients
      : ingredients.filter((ing) => ing.category === selectedCategory);

  return (
    <PageLayout activePage="ingredients">
      <h1 className="font-young-serif font-medium text-neutral-800 mb-14 text-[36px] md:text-6xl">
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
        className="grid justify-between gap-y-[40px] -mx-[35px]"
        style={{ gridTemplateColumns: "repeat(auto-fill, 175px)" }}
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
