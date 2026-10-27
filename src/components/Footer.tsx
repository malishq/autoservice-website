import Link from "next/link";
import { CREDITS } from "@/lib/photos";
import { SITE } from "@/lib/site";

const letters = [
  { char: "О", tone: "bg-accent", height: "100%" },
  { char: "с", tone: "bg-surface-3", height: "80%" },
  { char: "ь", tone: "bg-surface-2", height: "64%" },
];

export function Footer() {
  return (
    <footer className="bg-ground">
      <div className="mx-auto w-full max-w-[1800px] px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
        <div className="flex h-[22svh] min-h-[160px] items-end gap-1 lg:h-[34svh] lg:min-h-[240px]" role="img" aria-label="Ось">
          {letters.map((l) => (
            <span
              key={l.char}
              aria-hidden
              className={`${l.tone} grid flex-1 place-items-center overflow-hidden font-display text-[min(26vw,20svh)] leading-none font-medium text-ground lg:text-[min(18vw,30svh)]`}
              style={{ height: l.height }}
            >
              {l.char}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <nav aria-label="Ссылки в подвале" className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:col-span-8">
            {[...SITE.nav, SITE.cta].map((link) => (
              <Link key={link.href} href={link.href} className="text-body text-ink transition duration-200 hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-body text-ink lg:col-span-4">
            <p>
              {SITE.address}
              <br />
              {SITE.district}
            </p>
            <p className="mt-3">{SITE.hours}</p>
            <a href={SITE.phoneHref} className="mt-3 block font-display text-h3 text-ink transition duration-200 hover:text-accent">
              {SITE.phone}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <p className="text-body text-ink">© {new Date().getFullYear()} {SITE.name}</p>
          <Link
            href={SITE.cta.href}
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-body font-medium text-accent-ink transition duration-200 hover:-translate-y-0.5 hover:bg-accent-strong active:translate-y-0 active:scale-[0.97]"
          >
            {SITE.cta.label}
          </Link>
        </div>

        <p className="mt-10 max-w-[80ch] text-small text-ink">
          Фотографии:{" "}
          {CREDITS.map((c, i) => (
            <span key={c.page}>
              <a href={c.page} className="underline decoration-muted underline-offset-4 transition duration-200 hover:text-accent">
                «{c.title}»
              </a>{" "}
              ({c.author},{" "}
              <a href={c.licenceUrl} className="underline decoration-muted underline-offset-4 transition duration-200 hover:text-accent">
                {c.licence}
              </a>
              ){i < CREDITS.length - 1 ? "; " : ""}
            </span>
          ))}{" "}
          через Wikimedia Commons.
        </p>
      </div>
    </footer>
  );
}
