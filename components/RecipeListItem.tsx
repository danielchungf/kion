import Link from "next/link";
import { typography, colors } from "@/lib/tokens";

interface RecipeListItemProps {
  id: string;
  title: string;
  hasContent?: boolean;
}

export default function RecipeListItem({ id, title, hasContent = true }: RecipeListItemProps) {
  if (!hasContent) {
    return (
      <span className={`${typography.navLink} ${colors.text.muted}`}>
        {title}
      </span>
    );
  }

  return (
    <Link
      href={`/recipe/${id}`}
      className={`${typography.h2} hover:${colors.text.active} transition-colors`}
    >
      {title}
    </Link>
  );
}
