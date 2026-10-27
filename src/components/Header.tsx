"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-ground">
      <div className="mx-auto flex h-18 w-full max-w-[1800px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="font-display text-h3 font-semibold leading-none text-ink" aria-label={`${SITE.name}, на главную`}>
          {SITE.name}
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {SITE.nav.map((link) => (
            <Link key={link.href} href={link.href} className="text-body font-medium text-ink transition duration-200 hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href={SITE.cta.href}
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-2 text-body font-medium text-accent-ink transition duration-200 hover:-translate-y-0.5 hover:bg-accent-strong active:translate-y-0 active:scale-[0.97]"
          >
            {SITE.cta.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="grid h-11 w-11 place-items-center rounded-full bg-surface-2 text-ink transition active:scale-95 lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 block h-0.5 w-5 rounded bg-current transition duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-18 z-40 h-[calc(100dvh-4.5rem)] bg-ground transition duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav aria-label="Мобильное меню" className="flex h-full flex-col gap-1 overflow-y-auto px-5 py-6" data-lenis-prevent>
          {SITE.nav.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-full px-4 py-3 font-display text-3xl text-ink transition hover:bg-surface">
              {link.label}
            </Link>
          ))}
          <Link
            href={SITE.cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-6 py-4 font-display text-2xl text-accent-ink"
          >
            {SITE.cta.label}
          </Link>
          <p className="mt-auto text-body text-muted">
            {SITE.address}
            <br />
            {SITE.hours}
          </p>
          <a href={SITE.phoneHref} className="font-display text-2xl text-ink">
            {SITE.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
