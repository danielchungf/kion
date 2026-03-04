export const colors = {
  text: {
    primary: "text-neutral-800",
    active: "text-neutral-950",
    body: "text-neutral-700",
    muted: "text-neutral-500",
  },
  bg: {
    page: "bg-white",
    placeholder: "bg-neutral-100",
  },
} as const;

export const typography = {
  h1: `font-young-serif font-medium text-[36px] md:text-6xl ${colors.text.primary}`,
  h2: `font-young-serif font-medium text-xl ${colors.text.primary}`,
  h3: "font-young-serif font-medium text-[18px]",
  navLink: "font-young-serif font-medium text-xl",
  body: `font-source-serif text-[16px] tracking-tight ${colors.text.body} leading-relaxed`,
  filterPill: "font-young-serif font-medium text-lg",
} as const;

export const spacing = {
  page: "px-5 py-5 md:pb-[60px]",
  navMb: "mb-10 md:mb-[100px]",
  headingMb: "mb-5 md:mb-14",
  twoColumnGap: "gap-[30px] md:gap-[120px]",
  recipeGridGap: "gap-x-12 gap-y-2",
  ingredientGridGap: "gap-y-[40px]",
} as const;
