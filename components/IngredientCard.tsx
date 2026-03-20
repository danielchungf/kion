import { typography } from "@/lib/tokens";

interface IngredientCardProps {
  name: string;
  image?: string;
}

export default function IngredientCard({ name, image }: IngredientCardProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full aspect-square rounded-lg flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full aspect-square object-cover rounded-lg"
          />
        ) : (
          <span className="text-4xl">🍽️</span>
        )}
      </div>
      <span className={`${typography.h2} text-center`}>
        {name}
      </span>
    </div>
  );
}
