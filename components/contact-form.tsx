"use client";

import { useId, useState } from "react";
import { CircleCheck, Loader } from "lucide-react";

import { track } from "@/lib/analytics";
import {
  contactSchema,
  projectTypes,
  toFieldErrors,
  type ContactApiResponse,
  type ContactFieldErrors,
} from "@/lib/contact-schema";
import { pricing } from "@/config/pricing";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";

type Status = "idle" | "submitting" | "success" | "error";

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const fieldId = (name: string) => `${formId}-${name}`;

  const update = (name: keyof typeof emptyForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
    setErrors((current) => {
      if (!current[name as keyof ContactFieldErrors]) return current;
      const next = { ...current };
      delete next[name as keyof ContactFieldErrors];
      return next;
    });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus("error");
      track("contact_form_failed", { reason: "validation" });

      // Move focus to the first field that needs fixing.
      const firstField = Object.keys(fieldErrors)[0];
      if (firstField) document.getElementById(fieldId(firstField))?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result: ContactApiResponse = await response.json();

      if (!response.ok || !result.ok) {
        setStatus("error");
        setServerError(
          ("error" in result && result.error) ||
            "Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-ne direct.",
        );
        if ("fieldErrors" in result && result.fieldErrors) setErrors(result.fieldErrors);
        track("contact_form_failed", { reason: "server" });
        return;
      }

      setStatus("success");
      track("contact_form_submitted", {
        projectType: parsed.data.projectType,
        hasBudget: Boolean(parsed.data.budget),
      });
    } catch {
      setStatus("error");
      setServerError(
        "Nu am putut trimite mesajul. Verifică conexiunea la internet și încearcă din nou.",
      );
      track("contact_form_failed", { reason: "network" });
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start border border-line bg-surface p-8 sm:p-10"
      >
        <CircleCheck className="h-7 w-7 text-ink" strokeWidth={1.25} aria-hidden="true" />
        <h2 className="mt-6 text-h2 font-semibold tracking-tight">Mesajul a fost trimis.</h2>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
          Îți mulțumim. Am primit cererea și revenim cu un răspuns pe email. Dacă între timp
          apare ceva de adăugat, scrie-ne direct pe unul dintre canalele de alături.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setValues(emptyForm);
            setStatus("idle");
          }}
        >
          Trimite altă cerere
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot: hidden from users and from assistive technology. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update("website")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("name")} label="Nume" error={errors.name}>
          <Input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
            placeholder="Numele tău"
          />
        </Field>

        <Field id={fieldId("company")} label="Companie" optional error={errors.company}>
          <Input
            id={fieldId("company")}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={update("company")}
            aria-invalid={Boolean(errors.company)}
            placeholder="Numele business-ului"
          />
        </Field>

        <Field id={fieldId("email")} label="Email" error={errors.email}>
          <Input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
            placeholder="nume@companie.md"
          />
        </Field>

        <Field id={fieldId("phone")} label="Telefon" optional error={errors.phone}>
          <Input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${fieldId("phone")}-error` : undefined}
            placeholder="+373 ..."
          />
        </Field>

        <Field id={fieldId("projectType")} label="Tip proiect" error={errors.projectType}>
          <Select
            id={fieldId("projectType")}
            name="projectType"
            required
            value={values.projectType}
            onChange={update("projectType")}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? `${fieldId("projectType")}-error` : undefined}
          >
            <option value="">Alege tipul proiectului</option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field id={fieldId("budget")} label="Buget estimativ" optional error={errors.budget}>
          <Select
            id={fieldId("budget")}
            name="budget"
            value={values.budget}
            onChange={update("budget")}
            aria-invalid={Boolean(errors.budget)}
          >
            <option value="">Nu este obligatoriu</option>
            {pricing.budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        id={fieldId("message")}
        label="Descriere proiect"
        error={errors.message}
        hint="Ce faceți acum, ce nu funcționează și ce ați vrea să obțineți. Câteva propoziții sunt suficiente."
      >
        <Textarea
          id={fieldId("message")}
          name="message"
          required
          minLength={20}
          maxLength={4000}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${fieldId("message")}-error` : `${fieldId("message")}-hint`
          }
          placeholder="Descrie pe scurt situația actuală și obiectivul..."
        />
      </Field>

      <div aria-live="polite" className="min-h-0">
        {serverError ? (
          <p className="border border-ink bg-surface px-4 py-3 text-[0.9375rem] text-ink">
            {serverError}
          </p>
        ) : null}
        {!serverError && status === "error" && Object.keys(errors).length > 0 ? (
          <p className="text-[0.9375rem] text-ink">
            Verifică câmpurile marcate mai sus și trimite din nou.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
              Se trimite...
            </>
          ) : (
            "Trimite cererea"
          )}
        </Button>

        <p className="max-w-xs text-xs leading-relaxed text-faint">
          Datele din formular sunt folosite exclusiv pentru a răspunde la cererea ta.
        </p>
      </div>
    </form>
  );
}
