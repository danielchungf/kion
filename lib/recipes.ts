import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Recipe, RecipeFrontmatter } from "./types";

const recipesDirectory = path.join(process.cwd(), "content/recipes");

function parseRecipeBody(content: string): {
  ingredients: string[];
  instructions: string[];
} {
  const sections = content.split(/^## /m).filter(Boolean);
  let ingredients: string[] = [];
  let instructions: string[] = [];

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const heading = lines[0].trim().toLowerCase();
    const body = lines.slice(1).join("\n").trim();

    if (heading === "ingredients") {
      ingredients = body
        .split("\n")
        .map((line) => line.replace(/^-\s*/, "").trim())
        .filter(Boolean);
    } else if (heading === "steps") {
      instructions = body
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean);
    }
  }

  return { ingredients, instructions };
}

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDirectory)) return [];

  const fileNames = fs
    .readdirSync(recipesDirectory)
    .filter((f) => f.endsWith(".md"));

  return fileNames.map((fileName) => {
    const filePath = path.join(recipesDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as RecipeFrontmatter;
    const { ingredients, instructions } = parseRecipeBody(content);

    return { frontmatter, ingredients, instructions };
  });
}

export function getRecipeById(id: string): Recipe | undefined {
  const all = getAllRecipes();
  return all.find((r) => r.frontmatter.id === id);
}
