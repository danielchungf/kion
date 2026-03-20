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
          className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] object-contain flex-shrink-0 -ml-[66px] first:ml-[-22px] md:-ml-[80px] md:first:ml-[-30px]"
        />
      ))}
    </div>
  );
}
