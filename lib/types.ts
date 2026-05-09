export type Language = "en" | "es";

export interface RecipeFrontmatter {
  title: string;
  titleEn?: string;
  titleEs?: string;
  slug: string;
  id: string;
  category: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  ingredientImages: string[];
  author?: string;
  originalLanguage?: Language;
}

export type RecipeBlock =
  | { kind: "subheading"; text: string }
  | { kind: "item"; text: string };

export interface RecipeContent {
  ingredients: RecipeBlock[];
  instructions: RecipeBlock[];
}

export interface Recipe {
  frontmatter: RecipeFrontmatter;
  ingredients: RecipeBlock[];
  instructions: RecipeBlock[];
  content: { en: RecipeContent; es: RecipeContent };
}

export interface Ingredient {
  id: string;
  name: string;
  nameEs: string;
  category: string;
  image?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
}
