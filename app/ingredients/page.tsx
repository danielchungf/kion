import PageLayout from "@/components/PageLayout";
import IngredientsBrowser from "@/components/IngredientsBrowser";
import { typography, spacing } from "@/lib/tokens";
import { getLanguage } from "@/lib/language";
import { t } from "@/lib/strings";

export default function IngredientsPage() {
  const language = getLanguage();

  return (
    <PageLayout activePage="ingredients">
      <div className="max-w-[720px] mx-auto">
        <h1 className={`${typography.h1} ${spacing.headingMb}`}>
          {t("ingredients", language)}
        </h1>

        <IngredientsBrowser language={language} />
      </div>
    </PageLayout>
  );
}
