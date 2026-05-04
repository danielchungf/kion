import type { Metadata } from "next";
import { getRecipeBySlug } from "@/lib/recipes";
import { getAuthorById } from "@/lib/authors";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import IngredientImageCarousel from "@/components/IngredientImageCarousel";
import StepList from "@/components/StepList";
import { typography, spacing } from "@/lib/tokens";
import { getLanguage } from "@/lib/language";
import { t } from "@/lib/strings";

interface RecipePageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: RecipePageProps): Metadata {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return {};
  return {
    title: `${recipe.frontmatter.title} — Kion`,
    openGraph: {
      title: recipe.frontmatter.title,
    },
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const language = getLanguage();
  const recipe = getRecipeBySlug(params.slug, language);

  if (!recipe) {
    notFound();
  }

  const author = recipe.frontmatter.author
    ? getAuthorById(recipe.frontmatter.author)
    : undefined;

  return (
    <PageLayout author={author}>
      <div className="max-w-[720px] mx-auto">
        <h1 className={`${typography.h1} mb-5`}>
          {recipe.frontmatter.title}
        </h1>

        <IngredientImageCarousel
          images={recipe.frontmatter.ingredientImages || []}
        />

        <div className={`grid grid-cols-1 md:grid-cols-[2fr_3fr] ${spacing.twoColumnGap}`}>
          <section>
            <h2 className={`${typography.h2} mb-5`}>
              {t("ingredients", language)}
            </h2>
            <ul className={`space-y-1 ${typography.body}`}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={`${typography.h2} mb-5`}>
              {t("preparation", language)}
            </h2>
            <StepList steps={recipe.instructions} />
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
