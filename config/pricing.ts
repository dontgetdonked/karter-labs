/**
 * Every price in the application comes from here. Nothing is hardcoded in a
 * component. Set `showStartingPrices` to false to hide all figures at once.
 */

export const pricing = {
  currency: "€",
  /** Master switch for the "de la … €" figures across the site. */
  showStartingPrices: true,

  /**
   * Entry price per service slug. `null` means "no fixed entry price" — those
   * services render the estimate CTA instead of a number.
   */
  startingFrom: {
    "website-uri": 600,
    "aplicatii-web": 2500,
    automatizari: 400,
    "software-custom": null,
  } as Record<string, number | null>,

  /** Budget bands offered in the contact form. `value` is what gets submitted. */
  budgetOptions: [
    { value: "sub-1000", label: "Sub 1.000 €" },
    { value: "1000-3000", label: "1.000 – 3.000 €" },
    { value: "3000-7000", label: "3.000 – 7.000 €" },
    { value: "peste-7000", label: "Peste 7.000 €" },
    { value: "nedecis", label: "Încă nu știu" },
  ],
} as const;

/** `600` -> `"de la 600 €"`. Returns null when there is nothing to show. */
export function startingPriceLabel(slug: string): string | null {
  if (!pricing.showStartingPrices) return null;
  const amount = pricing.startingFrom[slug];
  if (amount == null) return null;
  return `de la ${amount.toLocaleString("ro-MD")} ${pricing.currency}`;
}
