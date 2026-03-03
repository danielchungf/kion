import Link from "next/link";

interface RecipeListItemProps {
  id: string;
  title: string;
}

export default function RecipeListItem({ id, title }: RecipeListItemProps) {
  return (
    <Link
      href={`/recipe/${id}`}
      className="font-young-serif font-medium text-xl text-neutral-800 hover:text-neutral-950 transition-colors"
    >
      {title}
    </Link>
  );
}
