import { cookies, headers } from "next/headers";
import { Language } from "./types";

const COOKIE_NAME = "lang";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const SPANISH_SPEAKING_COUNTRIES = new Set([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ",
  "GT", "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]);

export function getLanguage(): Language {
  const cookieValue = cookies().get(COOKIE_NAME)?.value;
  if (cookieValue === "es" || cookieValue === "en") return cookieValue;

  const country = headers().get("x-vercel-ip-country")?.toUpperCase();
  if (country && SPANISH_SPEAKING_COUNTRIES.has(country)) return "es";

  return "en";
}

export const LANGUAGE_COOKIE = COOKIE_NAME;
export const LANGUAGE_COOKIE_MAX_AGE = ONE_YEAR_SECONDS;
