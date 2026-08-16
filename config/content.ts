/**
 * All page copy in Romanian.
 *
 * Kept out of the components so a second language only means a second file of
 * this exact shape (see config/i18n.ts). Nothing here should be edited inside
 * a component.
 */

export const home = {
  hero: {
    eyebrow: "Agenție de software · Moldova",
    headline: "Software care rezolvă probleme reale.",
    subheadline:
      "Construim website-uri, aplicații, automatizări și software personalizat pentru business-uri care vor să lucreze mai simplu și mai eficient.",
    /** Short capability strip under the hero — factual, no claims. */
    capabilities: [
      "Website-uri",
      "Aplicații web",
      "Automatizări",
      "Software custom",
      "AI aplicat",
      "Integrări",
    ],
  },

  positioning: {
    eyebrow: "Poziționare",
    headline: "Nu suntem o agenție simplă.",
    body: "Nu vindem doar site-uri sau aplicații. Înțelegem problema, proiectăm soluția și construim software-ul de care business-ul tău are nevoie.",
  },

  services: {
    eyebrow: "Servicii",
    headline: "Ce construim?",
    description:
      "Patru direcții, aceeași abordare: pornim de la problema ta de business și livrăm software care o rezolvă.",
  },

  problems: {
    eyebrow: "Probleme",
    headline: "Ai o problemă. Construim soluția.",
    description:
      "Situațiile de mai jos apar în aproape orice business care crește. Fiecare are o soluție tehnică concretă.",
    items: [
      {
        problem: "Prea multe procese manuale",
        solution: "Automatizăm fluxul.",
        detail:
          "Identificăm pașii repetitivi și îi mutăm în automatizări care rulează singure, fără intervenție zilnică.",
        service: "automatizari",
      },
      {
        problem: "Date împrăștiate în mai multe sisteme",
        solution: "Construim o platformă centralizată.",
        detail:
          "Aducem informația din fișiere, tabele și aplicații separate într-un singur loc, cu o singură versiune corectă a datelor.",
        service: "aplicatii-web",
      },
      {
        problem: "Ai nevoie de un sistem intern",
        solution: "Dezvoltăm software custom.",
        detail:
          "Construim aplicația după procesul tău real, nu invers, și o integrăm cu instrumentele pe care le folosești deja.",
        service: "software-custom",
      },
      {
        problem: "Website-ul nu aduce clienți",
        solution: "Reproiectăm experiența și fluxul de conversie.",
        detail:
          "Analizăm unde se pierd vizitatorii, rescriem structura și mesajul și scurtăm drumul până la o cerere reală.",
        service: "website-uri",
      },
    ],
  },

  process: {
    eyebrow: "Proces",
    headline: "Cum lucrăm",
    description:
      "Patru etape, fără surprize. Știi în orice moment la ce lucrăm și ce urmează.",
    steps: [
      {
        number: "01",
        title: "Descoperim",
        description: "Înțelegem business-ul, problema și obiectivul.",
      },
      {
        number: "02",
        title: "Proiectăm",
        description: "Definim soluția, structura și experiența utilizatorului.",
      },
      {
        number: "03",
        title: "Construim",
        description: "Dezvoltăm, testăm și iterăm.",
      },
      {
        number: "04",
        title: "Lansăm",
        description: "Punem soluția online și ne asigurăm că funcționează corect.",
      },
    ],
  },

  why: {
    eyebrow: "De ce noi",
    headline: "De ce Karter Labs?",
    items: [
      {
        title: "Soluții potrivite",
        description:
          "Nu construim funcționalități inutile doar pentru a mări proiectul.",
      },
      {
        title: "Comunicare clară",
        description: "Știi ce construim, cât durează și ce primești.",
      },
      {
        title: "Software modern",
        description:
          "Folosim tehnologii moderne și arhitecturi potrivite proiectului.",
      },
      {
        title: "Gândim business",
        description:
          "Nu ne concentrăm doar pe cod. Ne concentrăm pe rezultatul soluției.",
      },
    ],
  },

  work: {
    eyebrow: "Proiecte",
    headline: "Proiecte selectate",
    description:
      "Proiecte-concept construite intern, care arată cum abordăm o problemă de business. Sunt marcate ca demo: nu prezentăm clienți sau rezultate pe care nu le avem.",
  },

  pricing: {
    eyebrow: "Estimare",
    headline: "Fiecare proiect este diferit.",
    body: "Nu folosim pachete artificiale pentru proiecte care au cerințe diferite. După ce înțelegem proiectul, îți oferim o estimare clară.",
  },

  faq: {
    eyebrow: "Întrebări",
    headline: "Întrebări frecvente",
  },

  finalCta: {
    headline: "Ai o idee?",
    subheadline: "Noi știm cum să o construim.",
  },
} as const;

export const about = {
  eyebrow: "Despre noi",
  headline: "Un studio de software, nu o fabrică de site-uri.",
  intro:
    "Karter Labs este o agenție de software din Republica Moldova. Construim website-uri, aplicații web, automatizări și software personalizat pentru business-uri care vor să lucreze mai simplu.",
  body: [
    "Cele mai multe probleme pe care le întâlnim nu sunt tehnice la origine. Sunt date ținute în cinci fișiere diferite, comenzi preluate manual din trei canale, rapoarte care iau o zi pe lună. Software-ul este doar instrumentul prin care le rezolvăm.",
    "De aceea începem întotdeauna cu procesul, nu cu tehnologia. Întrebăm cum lucrați azi, unde se pierde timpul și ce s-ar schimba dacă pasul acela ar dispărea. Abia apoi propunem o soluție — uneori mai mică decât se aștepta clientul, pentru că atât era nevoie.",
    "Lucrăm cu tehnologii moderne pentru că ele reduc costul de întreținere pe termen lung, nu pentru că sună bine într-o ofertă. Codul, conturile și infrastructura rămân ale clientului.",
  ],
  principles: {
    eyebrow: "Principii",
    headline: "Cum gândim",
    items: [
      {
        title: "Întâi problema",
        description:
          "Nu propunem o soluție înainte de a înțelege ce se întâmplă acum și de ce.",
      },
      {
        title: "Scop clar",
        description:
          "Stabilim de la început ce intră în proiect și ce nu. Modificările se discută, nu apar pe factură.",
      },
      {
        title: "Livrare pe etape",
        description:
          "Vezi rezultate din primele săptămâni, nu doar la final. Corecțiile costă mai puțin devreme.",
      },
      {
        title: "Fără dependență",
        description:
          "Primești codul, accesurile și documentația. Poți continua cu noi pentru că vrei, nu pentru că ești blocat.",
      },
    ],
  },
  market: {
    eyebrow: "Piață",
    headline: "Construit pentru business-urile de aici",
    body: "Piața noastră principală este Republica Moldova. Înțelegem cum lucrează companiile de aici: echipe mici, bugete atente, procese crescute organic în timp. Lucrăm și la distanță, cu clienți din alte țări, în română, rusă sau engleză.",
  },
} as const;

export const contactPage = {
  eyebrow: "Contact",
  headline: "Spune-ne despre proiect.",
  intro:
    "Descrie pe scurt situația actuală și ce ai vrea să se schimbe. Nu ai nevoie de o specificație tehnică — de asta ne ocupăm noi.",
  formTitle: "Detalii proiect",
  directTitle: "Direct",
  directBody: "Preferi să scrii direct? Alege canalul care îți convine.",
  whatHappensTitle: "Ce urmează după ce trimiți",
  whatHappensSteps: [
    "Citim mesajul și revenim cu întrebările care lipsesc.",
    "Stabilim o discuție scurtă, online sau la telefon.",
    "Primești o estimare scrisă, cu scop, preț și termen.",
  ],
} as const;
