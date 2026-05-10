import { Language } from "./types";

type StringKey =
  | "navIngredients"
  | "recipeBy"
  | "madeBy"
  | "ingredients"
  | "preparation"
  | "categoryAll"
  | "categoryFruits"
  | "categoryVegetables"
  | "categoryAromatics"
  | "categoryProteins"
  | "categoryDairy"
  | "categoryGrains"
  | "categoryPantry";

const strings: Record<StringKey, Record<Language, string>> = {
  navIngredients: { en: "Ingredients", es: "Ingredientes" },
  recipeBy: { en: "Recipe by", es: "Receta de" },
  madeBy: { en: "Site made by", es: "Sitio web hecho por" },
  ingredients: { en: "Ingredients", es: "Ingredientes" },
  preparation: { en: "Preparation", es: "Preparación" },
  categoryAll: { en: "All", es: "Todos" },
  categoryFruits: { en: "Fruits", es: "Frutas" },
  categoryVegetables: { en: "Vegetables", es: "Verduras" },
  categoryAromatics: { en: "Aromatics", es: "Aromáticos" },
  categoryProteins: { en: "Proteins", es: "Proteínas" },
  categoryDairy: { en: "Dairy", es: "Lácteos" },
  categoryGrains: { en: "Grains", es: "Granos" },
  categoryPantry: { en: "Pantry", es: "Despensa" },
};

export function t(key: StringKey, language: Language): string {
  return strings[key][language];
}

const categoryKeyMap: Record<string, StringKey> = {
  All: "categoryAll",
  Fruits: "categoryFruits",
  Vegetables: "categoryVegetables",
  Aromatics: "categoryAromatics",
  Proteins: "categoryProteins",
  Dairy: "categoryDairy",
  Grains: "categoryGrains",
  Pantry: "categoryPantry",
};

export function tCategory(category: string, language: Language): string {
  const key = categoryKeyMap[category];
  return key ? strings[key][language] : category;
}
