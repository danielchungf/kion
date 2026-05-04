import { cookies } from "next/headers";
import { Language } from "./types";

const COOKIE_NAME = "lang";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function getLanguage(): Language {
  const value = cookies().get(COOKIE_NAME)?.value;
  return value === "es" ? "es" : "en";
}

export const LANGUAGE_COOKIE = COOKIE_NAME;
export const LANGUAGE_COOKIE_MAX_AGE = ONE_YEAR_SECONDS;
