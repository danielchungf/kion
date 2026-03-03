import { getRecipeById } from "@/lib/recipes";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import IngredientImageCarousel from "@/components/IngredientImageCarousel";
import StepList from "@/components/StepList";

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
        <h1 className="font-young-serif font-medium text-neutral-800 mb-10 text-[36px] md:text-6xl">
          {recipe.frontmatter.title}
        </h1>

        <IngredientImageCarousel
          images={recipe.frontmatter.ingredientImages || []}
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-[30px] md:gap-[120px]">
          <section>
            <h2 className="font-young-serif font-medium text-neutral-800 mb-5 text-xl">
              Ingredients
            </h2>
            <ul className="space-y-1 font-source-serif text-[16px] tracking-tight text-neutral-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-young-serif font-medium text-neutral-800 mb-5 text-xl">
              Preparation
            </h2>
            <StepList steps={recipe.instructions} />
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
