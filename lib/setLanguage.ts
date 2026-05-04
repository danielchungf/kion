"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Language } from "./types";
import { LANGUAGE_COOKIE, LANGUAGE_COOKIE_MAX_AGE } from "./language";

export async function setLanguage(language: Language) {
  cookies().set(LANGUAGE_COOKIE, language, {
    path: "/",
    maxAge: LANGUAGE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}
