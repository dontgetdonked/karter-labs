/**
 * i18n readiness.
 *
 * The site ships in Romanian only. Every user-facing string lives in
 * `config/content.ts`, `config/services.ts`, `config/projects.ts` and
 * `config/faq.ts` — no copy is written inside a component.
 *
 * To add a second language later:
 *   1. Duplicate those files under `config/<locale>/`.
 *   2. Add the locale below.
 *   3. Add the `app/[locale]` segment and read the dictionary through
 *      `getDictionary(locale)` instead of importing the modules directly.
 *
 * Nothing else in the codebase needs to change.
 */

export const locales = ["ro"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ro";

/** BCP-47 tags used in <html lang> and in Open Graph metadata. */
export const localeTags: Record<Locale, { html: string; openGraph: string }> = {
  ro: { html: "ro", openGraph: "ro_MD" },
};
