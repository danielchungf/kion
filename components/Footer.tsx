import Image from "next/image";
import { Author } from "@/lib/types";
import { getLanguage } from "@/lib/language";
import { t } from "@/lib/strings";
import LanguageToggle from "./LanguageToggle";

interface FooterProps {
  authors?: Author[];
}

function joinNames(names: string[], language: "en" | "es"): string {
  if (names.length <= 1) return names[0] ?? "";
  const conj = language === "es" ? "y" : "&";
  return `${names.slice(0, -1).join(", ")} ${conj} ${names[names.length - 1]}`;
}

export default function Footer({ authors }: FooterProps) {
  const language = getLanguage();
  const hasAuthors = authors && authors.length > 0;
  return (
    <footer className="py-7 px-5 md:max-w-[720px] md:mx-auto md:px-0 md:text-left text-center">
      <div className="flex items-center gap-2 font-young-serif font-medium text-sm tracking-tight text-neutral-400 md:justify-start justify-center">
        {hasAuthors && (
          <>
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
              {t("recipeBy", language)} {joinNames(authors.map((a) => a.name), language)}
            </span>
            <span aria-hidden="true">·</span>
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
        <span aria-hidden="true">·</span>
        <LanguageToggle current={language} />
      </div>
    </footer>
  );
}
