export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Cât costă un website?",
    answer:
      "Depinde de complexitate: numărul de pagini, dacă e nevoie de panou de administrare, de magazin online sau de integrări cu alte sisteme. Un site de prezentare și un magazin online cu sute de produse sunt două proiecte diferite. După o discuție de 20–30 de minute în care înțelegem cerințele, îți trimitem o estimare scrisă, cu preț și termen.",
  },
  {
    question: "Cât durează un proiect?",
    answer:
      "Termenul vine din volumul de lucru, nu dintr-un pachet fix. Un landing page se face în una–două săptămâni, un site de prezentare în trei–cinci, iar o aplicație internă sau un software custom se măsoară în luni și se livrează pe etape. Îți dăm termenul înainte de a începe și te anunțăm imediat dacă apare ceva care îl schimbă.",
  },
  {
    question: "Lucrați doar cu firme din Moldova?",
    answer:
      "Piața noastră principală este Republica Moldova și cunoaștem contextul de aici. Lucrăm însă și la distanță, cu clienți din alte țări. Comunicarea se poate face în română, rusă sau engleză.",
  },
  {
    question: "Puteți automatiza procesele existente?",
    answer:
      "Da. Începem cu o analiză a fluxului actual: ce instrumente folosești, unde se introduc datele de mai multe ori și care pași consumă cel mai mult timp. Automatizăm doar ce are sens să fie automatizat, iar restul rămâne așa cum funcționează deja bine.",
  },
  {
    question: "Puteți construi software de la zero?",
    answer:
      "Da. Când niciun produs de pe piață nu se potrivește procesului tău, construim aplicația de la zero — de la baza de date până la interfață. Codul sursă și infrastructura rămân ale tale.",
  },
  {
    question: "Oferiți mentenanță?",
    answer:
      "Da. După lansare putem prelua mentenanța: actualizări, monitorizare, remedierea problemelor și dezvoltări noi. Se stabilește separat de proiect, ca abonament lunar sau la cerere — alegi ce ți se potrivește.",
  },
];
