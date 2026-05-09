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
      className={`${typography.h2} hover:${colors.text.active} transition-colors group`}
    >
      <span className="relative inline-block">
        <img
          src="/chef-hat.webp"
          alt=""
          aria-hidden="true"
          className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block"
        />
        {title}
      </span>
    </Link>
  );
}
