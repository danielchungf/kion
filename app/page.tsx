import { getAllRecipes } from "@/lib/recipes";
import PageLayout from "@/components/PageLayout";
import RecipeListItem from "@/components/RecipeListItem";

export default function Home() {
  const recipes = getAllRecipes();
  const sortedRecipes = [...recipes].sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title, undefined, {
      sensitivity: "base",
    })
  );

  const midpoint = Math.ceil(sortedRecipes.length / 2);
  const firstColumn = sortedRecipes.slice(0, midpoint);
  const secondColumn = sortedRecipes.slice(midpoint);

  return (
    <PageLayout activePage="index">
      <h1 className="font-young-serif font-medium text-neutral-800 mb-14 text-[36px] md:text-6xl">
        Index
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        <div className="flex flex-col gap-y-2">
          {firstColumn.map((recipe) => (
            <RecipeListItem
              key={recipe.frontmatter.id}
              id={recipe.frontmatter.id}
              title={recipe.frontmatter.title}
            />
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          {secondColumn.map((recipe) => (
            <RecipeListItem
              key={recipe.frontmatter.id}
              id={recipe.frontmatter.id}
              title={recipe.frontmatter.title}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
