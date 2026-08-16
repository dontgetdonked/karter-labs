import {
  Boxes,
  Globe,
  LayoutDashboard,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { ServiceIcon } from "@/config/services";

/** Maps the icon key stored in config/services.ts to a Lucide component. */
export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  website: Globe,
  app: LayoutDashboard,
  automation: Workflow,
  custom: Boxes,
};

type BrandIconProps = React.SVGProps<SVGSVGElement>;

/**
 * Brand glyphs.
 *
 * lucide-react v1 removed its brand icons, so the three channels the site
 * links to are drawn here as plain single-colour outlines that inherit
 * `currentColor` and stay inside the monochrome palette.
 */

const brandBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function InstagramIcon(props: BrandIconProps) {
  return (
    <svg {...brandBase} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TelegramIcon(props: BrandIconProps) {
  return (
    <svg {...brandBase} aria-hidden="true" {...props}>
      <path d="M21 4 3 11l5.4 1.9L19 6.6l-8.2 8.1.3 5 2.6-3.4 4 3z" />
    </svg>
  );
}

export function WhatsAppIcon(props: BrandIconProps) {
  return (
    <svg {...brandBase} aria-hidden="true" {...props}>
      <path d="M3.5 20.5 5 16.4A8 8 0 1 1 8.2 19.4z" />
      <path d="M9 9.2c.2 1.2.8 2.3 1.7 3.2s2 1.5 3.2 1.7l1-1.2 1.7.9c-.3 1-1.3 1.6-2.3 1.4a8 8 0 0 1-6.4-6.4c-.2-1 .4-2 1.4-2.3l.9 1.7z" />
    </svg>
  );
}

/** Resolves a contact channel key to its glyph. */
export const brandIcons = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
} as const;
