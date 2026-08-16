import { z } from "zod";

import { pricing } from "@/config/pricing";

/** Project type options offered in the form. `value` is what gets submitted. */
export const projectTypes = [
  { value: "website", label: "Website" },
  { value: "aplicatie-web", label: "Aplicație web" },
  { value: "automatizare", label: "Automatizare" },
  { value: "software-custom", label: "Software custom" },
  { value: "ai", label: "AI" },
  { value: "altceva", label: "Altceva" },
] as const;

export const projectTypeValues = projectTypes.map((type) => type.value) as [
  string,
  ...string[],
];

export const budgetValues = pricing.budgetOptions.map((option) => option.value) as [
  string,
  ...string[],
];

/** Optional text field: empty string is allowed and normalised away later. */
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

/**
 * Shared by the client form and the API route, so a payload that passes in the
 * browser passes on the server and vice versa.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Introdu numele tău.")
    .max(80, "Numele este prea lung."),

  company: optionalText(80),

  email: z.email("Introdu o adresă de email validă."),

  phone: z
    .string()
    .trim()
    .max(30, "Numărul de telefon este prea lung.")
    .refine((value) => value === "" || /^[+\d][\d\s()./-]{5,}$/.test(value), {
      message: "Introdu un număr de telefon valid sau lasă câmpul gol.",
    })
    .optional()
    .or(z.literal("")),

  projectType: z.enum(projectTypeValues, {
    message: "Alege tipul proiectului.",
  }),

  budget: z
    .enum(budgetValues, { message: "Alege un interval de buget valid." })
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(20, "Descrie proiectul în cel puțin 20 de caractere.")
    .max(4000, "Descrierea este prea lungă (maximum 4000 de caractere)."),

  /** Honeypot. Bots fill every field; humans never see this one. */
  website: z.literal("").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

/**
 * First error message per field, in the shape the form renders.
 * Typed structurally so it accepts the error from both the input-side and the
 * output-side of the schema.
 */
export function toFieldErrors(error: {
  issues: readonly { path: readonly PropertyKey[]; message: string }[];
}): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !(field in errors)) {
      errors[field as keyof ContactInput] = issue.message;
    }
  }
  return errors;
}

/** Response contract for POST /api/contact. */
export type ContactApiResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: ContactFieldErrors };
