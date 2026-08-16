/**
 * Selected work.
 *
 * IMPORTANT: every entry here is a *concept* built in-house to show how we
 * approach a problem. There are no client names, no revenue figures and no
 * testimonials — nothing on this site claims a project we have not done.
 * The `demo: true` flag drives the visible "Demo project" badge; it must stay
 * true until an entry is replaced by a real, delivered project.
 */

export type Project = {
  slug: string;
  name: string;
  /** Card one-liner. */
  summary: string;
  category: string;
  /** Related service slug, used to cross-link. */
  service: string;
  /** Renders the "Demo project" badge. Never set to false for a concept. */
  demo: boolean;
  problem: string;
  solution: string;
  /** Capability list — what the concept covers. Not results, not metrics. */
  scope: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "stockflow",
    name: "StockFlow",
    summary: "Platformă internă de gestiune a stocurilor pentru depozite mici și medii.",
    category: "Aplicație web internă",
    service: "aplicatii-web",
    demo: true,
    problem:
      "Stocul este ținut în Excel, pe mai multe fișiere și mai mulți oameni. Nimeni nu știe cifra reală în timp real, iar comenzile se blochează când un produs apare disponibil în fișier, dar lipsește din depozit.",
    solution:
      "O aplicație web unde intrările, ieșirile și inventarul trăiesc într-o singură bază de date. Fiecare mișcare are autor și oră, stocul minim declanșează o alertă, iar rapoartele se generează din date, nu manual.",
    scope: [
      "Evidență intrări, ieșiri și transferuri între gestiuni",
      "Alerte automate la atingerea stocului minim",
      "Roluri separate pentru depozit, vânzări și administrare",
      "Istoric complet al mișcărilor, cu autor și dată",
      "Export în Excel pentru contabilitate",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
  {
    slug: "autolead",
    name: "AutoLead",
    summary: "Sistem de gestiune și automatizare a lead-urilor pentru echipe de vânzări.",
    category: "Automatizare & CRM",
    service: "automatizari",
    demo: true,
    problem:
      "Cererile vin din Instagram, de pe site, prin WhatsApp și pe telefon. Nu există un loc unde să fie toate, răspunsul întârzie ore bune și nimeni nu poate spune câte oferte au rămas fără urmare.",
    solution:
      "Toate canalele intră într-un singur flux. Lead-ul este creat automat, primește un responsabil și o etapă, iar echipa este notificată instant pe Telegram. Cererile fără răspuns ies în evidență de la sine.",
    scope: [
      "Colectare centralizată a lead-urilor din formular, Instagram și WhatsApp",
      "Atribuire automată către responsabil și etape de vânzare",
      "Notificări instant pe Telegram la fiecare cerere nouă",
      "Remindere pentru lead-urile fără răspuns",
      "Panou cu starea pipeline-ului pe echipă",
    ],
    stack: ["Next.js", "Node.js", "Telegram Bot API", "Webhooks", "PostgreSQL"],
  },
  {
    slug: "nova-commerce",
    name: "Nova Commerce",
    summary: "Magazin online modern, construit pentru viteză pe mobil și pentru conversie.",
    category: "E-commerce",
    service: "website-uri",
    demo: true,
    problem:
      "Traficul vine aproape integral din Instagram, de pe telefon. Magazinul se încarcă greu, checkout-ul are prea mulți pași, iar clienții abandonează coșul înainte de a finaliza comanda.",
    solution:
      "Un magazin construit mobile-first, cu pagini de produs rapide și checkout scurt. Catalogul, comenzile și livrarea sunt administrate dintr-un singur panou, fără intervenție tehnică.",
    scope: [
      "Catalog cu categorii, filtre și căutare",
      "Pagini de produs optimizate pentru încărcare rapidă pe mobil",
      "Checkout scurt, cu livrare și metode de plată locale",
      "Panou de administrare pentru produse și comenzi",
      "Structură SEO și date pentru integrarea cu analytics",
    ],
    stack: ["Next.js", "TypeScript", "Stripe", "CMS headless", "Vercel"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
