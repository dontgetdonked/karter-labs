import { cn } from "@/lib/utils";

/** Shared control styling for input, textarea and select. */
export const controlClass =
  "w-full border border-line bg-paper px-4 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-faint hover:border-line-strong focus:border-ink focus:outline-none disabled:opacity-60 aria-[invalid=true]:border-ink";

export function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline justify-between gap-3 font-mono text-label uppercase text-muted"
    >
      <span>{children}</span>
      {optional ? <span className="normal-case tracking-normal text-faint">opțional</span> : null}
    </label>
  );
}

/**
 * Label + control + error message, wired together with the ids that screen
 * readers need (`aria-describedby`, `aria-invalid`).
 */
export function Field({
  id,
  label,
  error,
  optional,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-xs text-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(controlClass, "min-h-40 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlClass,
          "appearance-none pr-11",
          props.value === "" && "text-faint",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
