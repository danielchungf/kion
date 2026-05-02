import Link from "next/link";
import { typography, colors } from "@/lib/tokens";

interface RecipeListItemProps {
  slug: string;
  title: string;
  hasContent?: boolean;
}

export default function RecipeListItem({ slug, title, hasContent = true }: RecipeListItemProps) {
  if (!hasContent) {
    return (
      <span className={`${typography.navLink} ${colors.text.muted}`}>
        {title}
      </span>
    );
  }

  return (
    <Link
      href={`/recipes/${slug}`}
      className={`${typography.h2} hover:${colors.text.active} transition-colors`}
    >
      {title}
    </Link>
  );
}
