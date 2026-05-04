export interface RecipeFrontmatter {
  title: string;
  slug: string;
  id: string;
  category: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  ingredientImages: string[];
  author?: string;
}

export interface Recipe {
  frontmatter: RecipeFrontmatter;
  ingredients: string[];
  instructions: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  image?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
}
