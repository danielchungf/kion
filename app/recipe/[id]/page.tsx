import { getRecipeById } from "@/lib/recipes";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import IngredientImageCarousel from "@/components/IngredientImageCarousel";
import StepList from "@/components/StepList";
import { typography, spacing } from "@/lib/tokens";

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const recipe = getRecipeById(params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <PageLayout>
      <div className="max-w-[720px] mx-auto">
        <h1 className={`${typography.h1} mb-5`}>
          {recipe.frontmatter.title}
        </h1>

        <IngredientImageCarousel
          images={recipe.frontmatter.ingredientImages || []}
        />

        <div className={`grid grid-cols-1 md:grid-cols-[1fr_2fr] ${spacing.twoColumnGap}`}>
          <section>
            <h2 className={`${typography.h2} mb-5`}>
              Ingredients
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
              Preparation
            </h2>
            <StepList steps={recipe.instructions} />
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
