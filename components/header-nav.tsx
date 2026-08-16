"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { mainNav, cta } from "@/config/navigation";
import { contactChannels } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav() {
  const pathname = usePathname();

  /**
   * The panel is open only while we are still on the route it was opened from,
   * so navigating closes it without an effect that re-renders on every route
   * change.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  const panelRef = useRef<HTMLDivElement>(null);

  // While the panel is open: lock the page behind it and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenedOn(null);
    };
    document.addEventListener("keydown", onKeyDown);

    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* Desktop */}
      <nav aria-label="Navigare principală" className="hidden items-center gap-9 md:flex">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            className={cn(
              "relative py-1 text-sm transition-colors hover:text-ink",
              isActive(pathname, item.href) ? "text-ink" : "text-muted",
            )}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300",
                isActive(pathname, item.href) && "scale-x-100",
              )}
            />
          </Link>
        ))}
      </nav>

      <div className="hidden md:block">
        <Link
          href={cta.primary.href}
          onClick={() => track("cta_clicked", { label: cta.primary.label, location: "header" })}
          className={buttonVariants({ size: "sm" })}
        >
          {cta.primary.label}
        </Link>
      </div>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Închide meniul" : "Deschide meniul"}
        className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto border-t border-line bg-paper md:hidden"
      >
        <nav aria-label="Navigare mobilă" className="flex flex-col px-5 sm:px-8">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "border-b border-line py-5 text-2xl font-medium tracking-tight transition-colors",
                isActive(pathname, item.href) ? "text-ink" : "text-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 px-5 py-8 sm:px-8">
          <Link
            href={cta.primary.href}
            onClick={() =>
              track("cta_clicked", { label: cta.primary.label, location: "mobile-menu" })
            }
            className={buttonVariants({ size: "lg", className: "w-full" })}
          >
            {cta.primary.label}
          </Link>

          {contactChannels.length > 0 ? (
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-label uppercase text-muted">
              {contactChannels.map((channel) => (
                <li key={channel.key}>
                  <a href={channel.href} className="transition-colors hover:text-ink">
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
}
