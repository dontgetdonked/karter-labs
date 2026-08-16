/**
 * The four services. Everything downstream is derived from this array:
 * the homepage cards, /servicii, the four /servicii/[slug] pages,
 * the sitemap and the service links in the footer.
 */

export type ServiceIcon = "website" | "app" | "automation" | "custom";

export type Service = {
  slug: string;
  /** Card + page title. */
  title: string;
  /** One-line card description, as approved in the brief. */
  summary: string;
  /** Mono label shown above the card title. */
  tag: string;
  icon: ServiceIcon;

  /** Service page hero. */
  headline: string;
  intro: string;

  /** "Ce construim" — concrete deliverables. */
  deliverables: { title: string; description: string }[];

  /** "Pentru cine este" — situations that map to this service. */
  fitFor: string[];

  /** "Ce primești" — what lands in the client's hands at the end. */
  outcomes: string[];

  /** Technologies, shown as a mono strip. */
  stack: string[];

  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "website-uri",
    title: "Website-uri",
    summary:
      "Website-uri de prezentare, landing pages și magazine online construite pentru performanță și conversii.",
    tag: "Web",
    icon: "website",
    headline: "Website-uri construite pentru performanță și conversii.",
    intro:
      "Un website bun nu înseamnă doar un design frumos. Înseamnă pagini care se încarcă rapid, un mesaj clar și un drum simplu de la vizitator la solicitare. Construim site-uri care fac exact asta.",
    deliverables: [
      {
        title: "Site de prezentare",
        description:
          "Structură clară, texte care explică ce faci și pagini separate pentru fiecare serviciu. Baza pentru orice business care vrea să fie găsit online.",
      },
      {
        title: "Landing page",
        description:
          "O singură pagină, un singur obiectiv. Potrivită pentru campanii, lansări de produs sau trafic din Instagram și Google Ads.",
      },
      {
        title: "Magazin online",
        description:
          "E-commerce cu catalog, coș, checkout și livrare. Integrat cu metodele de plată și curierii pe care îi folosești.",
      },
      {
        title: "Redesign",
        description:
          "Ai deja un site, dar nu aduce clienți. Analizăm ce blochează conversia și reconstruim structura, textele și fluxul.",
      },
    ],
    fitFor: [
      "Business-uri care încă nu au prezență online",
      "Companii cu un site vechi, lent sau greu de actualizat",
      "Branduri care aduc trafic din Instagram și pierd vizitatorii pe site",
      "Magazine care vând prin mesaje și vor un flux de comandă real",
    ],
    outcomes: [
      "Site responsive, testat pe mobil, tabletă și desktop",
      "Viteză de încărcare optimizată și structură SEO corectă",
      "Panou de administrare sau CMS, dacă vrei să editezi singur conținutul",
      "Formulare de contact conectate la emailul sau canalul tău preferat",
      "Instalare pe domeniul tău și predarea completă a accesurilor",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "CMS headless", "Vercel"],
    metaTitle: "Website-uri pentru business-uri",
    metaDescription:
      "Website-uri de prezentare, landing pages și magazine online construite pentru viteză, SEO și conversii. Karter Labs, Moldova.",
  },
  {
    slug: "aplicatii-web",
    title: "Aplicații web",
    summary:
      "Dashboard-uri, platforme și sisteme interne adaptate modului în care lucrează business-ul tău.",
    tag: "Product",
    icon: "app",
    headline: "Aplicații web care se potrivesc cu modul tău de lucru.",
    intro:
      "Când Excel-ul nu mai face față și fiecare angajat ține propria versiune a datelor, ai nevoie de un sistem. Construim aplicații web în care echipa lucrează pe aceleași date, cu roluri și reguli clare.",
    deliverables: [
      {
        title: "Dashboard intern",
        description:
          "Un singur loc în care vezi comenzile, clienții, stocul sau indicatorii care contează. Date în timp real, fără rapoarte făcute manual.",
      },
      {
        title: "Platformă pentru clienți",
        description:
          "Portal unde clienții tăi își văd contul, comenzile, documentele sau statusul unei cereri. Mai puține telefoane către echipă.",
      },
      {
        title: "Sistem intern de lucru",
        description:
          "Fluxuri de aprobare, sarcini, evidențe și istoric. Construite după procesul tău, nu după un template generic.",
      },
      {
        title: "Conturi și permisiuni",
        description:
          "Autentificare, roluri și drepturi de acces. Fiecare persoană vede exact ce trebuie să vadă.",
      },
    ],
    fitFor: [
      "Echipe care lucrează în zeci de fișiere Excel paralele",
      "Business-uri cu procese interne pe care niciun software gata făcut nu le acoperă",
      "Companii care plătesc licențe pentru funcții pe care nu le folosesc",
      "Startup-uri care au nevoie de o primă versiune funcțională a produsului",
    ],
    outcomes: [
      "Aplicație web accesibilă din browser, fără instalare",
      "Bază de date proiectată pentru datele tale reale",
      "Roluri, permisiuni și istoric al modificărilor",
      "Export de date și rapoarte, când sunt necesare",
      "Documentație scurtă și sesiune de instruire pentru echipă",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "API REST", "Autentificare"],
    metaTitle: "Aplicații web și sisteme interne",
    metaDescription:
      "Dashboard-uri, platforme și sisteme interne construite pe procesele reale ale business-ului tău. Karter Labs, Moldova.",
  },
  {
    slug: "automatizari",
    title: "Automatizări",
    summary:
      "Automatizăm procese repetitive și conectăm instrumentele pe care deja le folosești.",
    tag: "Ops",
    icon: "automation",
    headline: "Mai puțin lucru manual. Aceleași rezultate.",
    intro:
      "Copierea datelor dintr-un sistem în altul, facturile scrise manual, mesajele trimise unul câte unul — toate consumă ore care nu aduc nimic în plus. Analizăm fluxul și îl automatizăm.",
    deliverables: [
      {
        title: "Conectarea instrumentelor",
        description:
          "Legăm CRM-ul, contabilitatea, formularele și magazinul online între ele prin API, ca datele să circule singure.",
      },
      {
        title: "Automatizarea documentelor",
        description:
          "Facturi, oferte, contracte și rapoarte generate automat din datele pe care le ai deja.",
      },
      {
        title: "Notificări și alerte",
        description:
          "Mesaje automate pe email, Telegram sau WhatsApp când apare o comandă nouă, o plată sau o problemă în flux.",
      },
      {
        title: "Soluții AI aplicate",
        description:
          "Clasificarea mesajelor, extragerea datelor din documente sau răspunsuri asistate — folosite acolo unde chiar reduc munca, nu ca să bifăm o tehnologie.",
      },
    ],
    fitFor: [
      "Business-uri unde aceeași informație este introdusă de două-trei ori",
      "Echipe care petrec ore pe rapoarte făcute manual în Excel",
      "Companii cu instrumente bune, dar care nu comunică între ele",
      "Magazine online care procesează comenzile manual",
    ],
    outcomes: [
      "Harta procesului actual, cu punctele care consumă cel mai mult timp",
      "Automatizări funcționale, pornite și testate pe date reale",
      "Monitorizare și alerte când o automatizare eșuează",
      "Estimare a timpului economisit lunar, măsurată pe procesul tău",
    ],
    stack: ["API integrations", "Webhooks", "Node.js", "Telegram Bot API", "OpenAI API"],
    metaTitle: "Automatizări și integrări pentru business",
    metaDescription:
      "Automatizăm procese repetitive și conectăm instrumentele pe care le folosești deja: CRM, contabilitate, magazin online. Karter Labs, Moldova.",
  },
  {
    slug: "software-custom",
    title: "Software custom",
    summary: "Soluții software dezvoltate de la zero pentru cerințe specifice.",
    tag: "Custom",
    icon: "custom",
    headline: "Când nimic de pe piață nu se potrivește, construim de la zero.",
    intro:
      "Unele business-uri au un mod de lucru care nu încape într-un produs standard. În loc să îți schimbi procesul ca să se potrivească software-ului, construim software-ul care se potrivește procesului.",
    deliverables: [
      {
        title: "Analiza cerințelor",
        description:
          "Începem cu procesul, nu cu tehnologia. Documentăm ce trebuie să facă sistemul și ce nu trebuie să facă.",
      },
      {
        title: "Dezvoltare de la zero",
        description:
          "Arhitectură, bază de date și interfață construite pentru cazul tău, cu cod pe care îl deții integral.",
      },
      {
        title: "Integrări cu sisteme existente",
        description:
          "Conectăm noul software cu ce folosești deja, ca tranziția să nu oprească activitatea.",
      },
      {
        title: "Migrarea datelor",
        description:
          "Mutăm datele din fișiere sau din sistemul vechi, verificate și fără pierderi.",
      },
    ],
    fitFor: [
      "Business-uri cu un proces de lucru unic în domeniul lor",
      "Companii care au încercat produse gata făcute și le-au abandonat",
      "Organizații cu cerințe stricte de acces, evidență sau raportare",
      "Idei de produs care au nevoie de o primă versiune reală",
    ],
    outcomes: [
      "Specificație scrisă, agreată înainte de prima linie de cod",
      "Cod sursă și infrastructură pe conturile tale",
      "Livrări pe etape, ca să vezi progresul din primele săptămâni",
      "Documentație tehnică și plan de mentenanță",
    ],
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Docker", "CI/CD"],
    metaTitle: "Software custom dezvoltat de la zero",
    metaDescription:
      "Soluții software dezvoltate de la zero pentru cerințe specifice, cu cod și infrastructură care rămân ale tale. Karter Labs, Moldova.",
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
