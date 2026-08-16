/**
 * Single source of truth for company, contact and social data.
 *
 * Everything that changes when the business changes lives here. Values that
 * differ per environment are read from env vars with safe fallbacks — see
 * `.env.example`. Channels left empty are simply not rendered anywhere on the
 * site, so the build never ships a dead link or an invented phone number.
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://karterlabs.md";

/** Normalised absolute origin, no trailing slash. */
export const siteUrl = rawUrl.replace(/\/+$/, "");

export type ContactChannel = {
  /** Machine key, also used as the analytics label. */
  key: "email" | "phone" | "telegram" | "whatsapp" | "instagram";
  /** Visible label in Romanian. */
  label: string;
  /** Value shown to the user (address, handle, number). Empty = not configured. */
  value: string;
  /** Fully-qualified href. Empty = not configured. */
  href: string;
};

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@karterlabs.md";
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "";
const telegram = process.env.NEXT_PUBLIC_TELEGRAM?.trim() || "";
const instagram = process.env.NEXT_PUBLIC_INSTAGRAM?.trim() || "";
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP?.trim() || "";

/** `+373 60 123 456` -> `+37360123456` (tel: and wa.me want no spaces). */
const compactPhone = (value: string) => value.replace(/[^\d+]/g, "");

export const site = {
  name: "Karter Labs",
  /** Used in <title> templates and the OG site name. */
  shortName: "Karter Labs",
  url: siteUrl,
  lang: "ro",
  locale: "ro_MD",
  country: "MD",
  tagline: "Software pentru business-uri care vor să evolueze.",
  positioning:
    "Nu construim doar website-uri. Construim software care rezolvă probleme reale de business.",
  description:
    "Karter Labs construiește website-uri, aplicații, automatizări și software personalizat pentru business-uri din Moldova.",
  /** Year shown in the footer copyright. */
  copyrightYear: 2026,
} as const;

export const contact = {
  email,
  phone,
  telegram,
  instagram,
  whatsapp,
  /** Response-time promise shown on /contact. Kept vague on purpose — it is a commitment. */
  responseTime: "De obicei răspundem în aceeași zi lucrătoare.",
} as const;

/** Ordered list of every configured channel. Unconfigured channels are dropped. */
export const contactChannels: ContactChannel[] = (
  [
    {
      key: "email",
      label: "Email",
      value: email,
      href: email ? `mailto:${email}` : "",
    },
    {
      key: "phone",
      label: "Telefon",
      value: phone,
      href: phone ? `tel:${compactPhone(phone)}` : "",
    },
    {
      key: "telegram",
      label: "Telegram",
      value: telegram ? `@${telegram.replace(/^@/, "")}` : "",
      href: telegram ? `https://t.me/${telegram.replace(/^@/, "")}` : "",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      value: whatsapp,
      href: whatsapp ? `https://wa.me/${compactPhone(whatsapp).replace(/^\+/, "")}` : "",
    },
    {
      key: "instagram",
      label: "Instagram",
      value: instagram ? `@${instagram.replace(/^@/, "")}` : "",
      href: instagram ? `https://instagram.com/${instagram.replace(/^@/, "")}` : "",
    },
  ] satisfies ContactChannel[]
).filter((channel) => channel.href !== "");

/** Social channels only — used by the footer and the header. */
export const socialChannels = contactChannels.filter((channel) =>
  ["telegram", "instagram", "whatsapp"].includes(channel.key),
);
