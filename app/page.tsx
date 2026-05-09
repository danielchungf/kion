import { getAllRecipes, getRecipeTitle } from "@/lib/recipes";
import { getLanguage } from "@/lib/language";
import PageLayout from "@/components/PageLayout";
import RecipeListItem from "@/components/RecipeListItem";
import { typography, spacing } from "@/lib/tokens";

export default function Home() {
  const language = getLanguage();
  const recipes = getAllRecipes(language);
  const withTitles = recipes.map((r) => ({
    ...r,
    displayTitle: getRecipeTitle(r.frontmatter, language),
  }));
  const sortedRecipes = withTitles.sort((a, b) =>
    a.displayTitle.localeCompare(b.displayTitle, undefined, {
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
              slug={recipe.frontmatter.slug}
              title={recipe.displayTitle}
              hasContent={recipe.ingredients.length > 0}
            />
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          {secondColumn.map((recipe) => (
            <RecipeListItem
              key={recipe.frontmatter.id}
              slug={recipe.frontmatter.slug}
              title={recipe.displayTitle}
              hasContent={recipe.ingredients.length > 0}
            />
          ))}
        </div>
      </div>
      </div>
    </PageLayout>
  );
}
