import { getAllRecipes } from "@/lib/recipes";
import PageLayout from "@/components/PageLayout";
import RecipeListItem from "@/components/RecipeListItem";
import { typography, spacing } from "@/lib/tokens";

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
      <div className="max-w-[720px] mx-auto">
      <h1 className={`${typography.h1} ${spacing.headingMb} hidden md:block`}>
        Index
      </h1>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${spacing.recipeGridGap} text-center md:text-left`}>
        <div className="flex flex-col gap-y-2">
          {firstColumn.map((recipe) => (
            <RecipeListItem
              key={recipe.frontmatter.id}
              id={recipe.frontmatter.id}
              title={recipe.frontmatter.title}
              hasContent={recipe.ingredients.length > 0}
            />
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          {secondColumn.map((recipe) => (
            <RecipeListItem
              key={recipe.frontmatter.id}
              id={recipe.frontmatter.id}
              title={recipe.frontmatter.title}
              hasContent={recipe.ingredients.length > 0}
            />
          ))}
        </div>
      </div>
      </div>
    </PageLayout>
  );
}
