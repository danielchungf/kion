"use client";

import { useTransition } from "react";
import { Language } from "@/lib/types";
import { setLanguage } from "@/lib/setLanguage";

interface LanguageToggleProps {
  current: Language;
}

export default function LanguageToggle({ current }: LanguageToggleProps) {
  const [isPending, startTransition] = useTransition();

  const select = (lang: Language) => {
    if (lang === current || isPending) return;
    startTransition(() => {
      setLanguage(lang);
    });
  };

  const options: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  return (
    <span className="inline-flex items-center gap-1">
      {options.map((opt, i) => {
        const isActive = current === opt.code;
        return (
          <span key={opt.code} className="inline-flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            <button
              type="button"
              onClick={() => select(opt.code)}
              aria-pressed={isActive}
              className={
                isActive
                  ? "text-neutral-800"
                  : "hover:text-neutral-800 transition-colors"
              }
            >
              {opt.label}
            </button>
          </span>
        );
      })}
    </span>
  );
}
