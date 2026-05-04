import Image from "next/image";
import { Author } from "@/lib/types";

interface FooterProps {
  author?: Author;
}

export default function Footer({ author }: FooterProps) {
  return (
    <footer className="py-7 px-5 md:max-w-[720px] md:mx-auto md:px-0 md:text-left text-center">
      <div className="flex items-center gap-2 font-young-serif font-medium text-sm tracking-tight text-neutral-400 md:justify-start justify-center">
        {author && (
          <>
            <Image
              src={author.avatar}
              alt={author.name}
              width={28}
              height={28}
              className="rounded-full object-cover"
            />
            <span>Recipe by {author.name}</span>
            <span aria-hidden="true">·</span>
          </>
        )}
        <a
          href="https://danielchung.design"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors group"
        >
          Made by <span className="group-hover:text-neutral-800 transition-colors">Daniel Chung</span>
        </a>
      </div>
    </footer>
  );
}
