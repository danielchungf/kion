import Image from "next/image";
import { Author } from "@/lib/types";
import { getLanguage } from "@/lib/language";
import { t } from "@/lib/strings";
import LanguageToggle from "./LanguageToggle";

interface FooterProps {
  authors?: Author[];
  sourceUrl?: string;
  centered?: boolean;
}

function joinNames(names: string[], language: "en" | "es"): string {
  if (names.length <= 1) return names[0] ?? "";
  const conj = language === "es" ? "y" : "&";
  return `${names.slice(0, -1).join(", ")} ${conj} ${names[names.length - 1]}`;
}

export default function Footer({ authors, sourceUrl, centered = false }: FooterProps) {
  const language = getLanguage();
  const hasAuthors = authors && authors.length > 0;
  const recipeByPhrase = t("recipeBy", language);
  const [recipeWord, ...recipeByRest] = recipeByPhrase.split(" ");
  const recipeBySuffix = recipeByRest.join(" ");
  return (
    <footer className={`py-7 px-5 md:max-w-[720px] md:mx-auto md:px-0 ${centered ? "text-center" : "text-left"}`}>
      <div className={`flex flex-col gap-2 font-young-serif font-medium text-sm tracking-tight text-neutral-400 md:flex-row md:items-center ${centered ? "items-center md:justify-center" : "items-start md:justify-start"}`}>
        {hasAuthors && (
          <>
            <div className="flex items-center gap-2">
              <div className="flex">
                {authors.map((author, i) => (
                  <div
                    key={author.id}
                    style={{ zIndex: i + 1 }}
                    className={`relative w-7 h-7 rounded-full ring-2 ring-[#FBFAF5] overflow-hidden hover:!z-30 ${
                      i === 0 ? "" : "-ml-2"
                    }`}
                  >
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span>
                {sourceUrl ? (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-800 transition-colors"
                  >
                    {recipeWord}
                  </a>
                ) : (
                  recipeWord
                )}
                {recipeBySuffix && ` ${recipeBySuffix}`} {joinNames(authors.map((a) => a.name), language)}
              </span>
            </div>
            <span aria-hidden="true" className="hidden md:inline">·</span>
          </>
        )}
        <a
          href="https://danielchung.design"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors group"
        >
          {t("madeBy", language)} <span className="group-hover:text-neutral-800 transition-colors">Daniel Chung</span>
        </a>
        <span aria-hidden="true" className="hidden md:inline">·</span>
        <LanguageToggle current={language} />
      </div>
    </footer>
  );
}
