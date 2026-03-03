interface IngredientImageCarouselProps {
  images: string[];
}

export default function IngredientImageCarousel({
  images,
}: IngredientImageCarouselProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mb-10 w-full flex items-center overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className="w-[150px] h-[150px] object-contain flex-shrink-0 -ml-[90px] first:ml-[-30px]"
        />
      ))}
    </div>
  );
}
