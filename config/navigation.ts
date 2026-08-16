/** Navigation is derived from this file only — header, footer and sitemap all read it. */

export type NavItem = {
  href: string;
  label: string;
};

export const mainNav: NavItem[] = [
  { href: "/servicii", label: "Servicii" },
  { href: "/proiecte", label: "Proiecte" },
  { href: "/despre", label: "Despre noi" },
  { href: "/contact", label: "Contact" },
];

export const cta = {
  primary: { href: "/contact", label: "Începe un proiect" },
  secondary: { href: "/servicii", label: "Vezi serviciile" },
  hero: { href: "/contact", label: "Spune-ne despre proiect" },
  estimate: { href: "/contact", label: "Cere o estimare" },
  write: { href: "/contact", label: "Scrie-ne" },
} as const;
