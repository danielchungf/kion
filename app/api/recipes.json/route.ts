import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { RecipeFrontmatter } from "@/lib/types";

export const dynamic = "force-static";
export const revalidate = 300;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kion.recipes";
const recipesDirectory = path.join(process.cwd(), "content/recipes");

interface RecipeRecord {
  id: string;
  title: string;
  url: string;
  slug: string;
  updatedAt: string;
  tags?: string[];
}

export function GET() {
  const records: RecipeRecord[] = fs.existsSync(recipesDirectory)
    ? fs
        .readdirSync(recipesDirectory)
        .filter((f) => f.endsWith(".md"))
        .map((fileName) => {
          const filePath = path.join(recipesDirectory, fileName);
          const fileContents = fs.readFileSync(filePath, "utf8");
          const { data } = matter(fileContents);
          const fm = data as RecipeFrontmatter;
          const stat = fs.statSync(filePath);
          const id = fm.id || fm.slug;
          const tags = fm.category ? [fm.category] : undefined;
          return {
            id,
            title: fm.title,
            url: `${SITE_URL}/recipes/${fm.slug}`,
            slug: fm.slug,
            updatedAt: stat.mtime.toISOString(),
            ...(tags ? { tags } : {}),
          };
        })
        .sort((a, b) => a.title.localeCompare(b.title))
    : [];

  return NextResponse.json(records, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
