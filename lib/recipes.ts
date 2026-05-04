import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Language, Recipe, RecipeContent, RecipeFrontmatter } from "./types";

const recipesDirectory = path.join(process.cwd(), "content/recipes");

function parseIngredients(body: string): string[] {
  return body
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}

function parseSteps(body: string): string[] {
  return body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function parseRecipeBody(content: string): {
  en: RecipeContent;
  es: RecipeContent;
} {
  const sections = content.split(/^## /m).filter(Boolean);
  const buckets: Record<string, string> = {};

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const heading = lines[0].trim().toLowerCase();
    const body = lines.slice(1).join("\n").trim();
    buckets[heading] = body;
  }

  function pickIngredients(lang: Language): string[] {
    const langKey = `ingredients (${lang})`;
    const fallback = "ingredients";
    const raw = buckets[langKey] ?? buckets[fallback] ?? "";
    return parseIngredients(raw);
  }

  function pickSteps(lang: Language): string[] {
    const langKey = `steps (${lang})`;
    const fallback = "steps";
    const raw = buckets[langKey] ?? buckets[fallback] ?? "";
    return parseSteps(raw);
  }

  return {
    en: { ingredients: pickIngredients("en"), instructions: pickSteps("en") },
    es: { ingredients: pickIngredients("es"), instructions: pickSteps("es") },
  };
}

export function getAllRecipes(language: Language = "en"): Recipe[] {
  if (!fs.existsSync(recipesDirectory)) return [];

  const fileNames = fs
    .readdirSync(recipesDirectory)
    .filter((f) => f.endsWith(".md"));

  return fileNames.map((fileName) => {
    const filePath = path.join(recipesDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as RecipeFrontmatter;
    const parsed = parseRecipeBody(content);
    const active = parsed[language];

    return {
      frontmatter,
      ingredients: active.ingredients,
      instructions: active.instructions,
      content: parsed,
    };
  });
}

export function getRecipeBySlug(
  slug: string,
  language: Language = "en"
): Recipe | undefined {
  const all = getAllRecipes(language);
  return all.find((r) => r.frontmatter.slug === slug);
}
