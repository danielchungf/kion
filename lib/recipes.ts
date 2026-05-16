import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Language, Recipe, RecipeBlock, RecipeContent, RecipeFrontmatter } from "./types";

const recipesDirectory = path.join(process.cwd(), "content/recipes");

const SUBHEADING_RE = /^\*\*(.+?):?\*\*:?$/;
const BULLET_RE = /^-\s+(.+)$/;

function toBlock(text: string): RecipeBlock {
  const match = text.match(SUBHEADING_RE);
  if (match) return { kind: "subheading", text: match[1].trim() };
  const bullet = text.match(BULLET_RE);
  if (bullet) return { kind: "bullet", text: bullet[1].trim() };
  return { kind: "item", text };
}

function parseIngredients(body: string): RecipeBlock[] {
  return body
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean)
    .map(toBlock);
}

function parseSteps(body: string): RecipeBlock[] {
  return body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(toBlock);
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

  function pickIngredients(lang: Language): RecipeBlock[] {
    const langKey = `ingredients (${lang})`;
    const fallback = "ingredients";
    const raw = buckets[langKey] ?? buckets[fallback] ?? "";
    return parseIngredients(raw);
  }

  function pickSteps(lang: Language): RecipeBlock[] {
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

export function getRecipeTitle(
  frontmatter: RecipeFrontmatter,
  language: Language
): string {
  if (language === "es") return frontmatter.titleEs ?? frontmatter.title;
  return frontmatter.titleEn ?? frontmatter.title;
}
