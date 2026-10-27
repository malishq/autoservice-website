import Link from "next/link";
import { CREDITS } from "@/lib/photos";
import { SITE } from "@/lib/site";

type Block = { char: string; fill: string; top: number; size: number };

function Mark({ width, height, baseline, blocks, className }: { width: number; height: number; baseline: number; blocks: Block[]; className: string }) {
  const gap = 6;
  const bw = (width - gap * (blocks.length - 1)) / blocks.length;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
      {blocks.map((b, i) => (
        <g key={b.char}>
          <rect x={i * (bw + gap)} y={b.top} width={bw} height={height - b.top} fill={b.fill} />
          <text
            x={i * (bw + gap) + bw / 2}
            y={baseline}
            textAnchor="middle"
            className="font-display"
            fontSize={b.size}
            fontWeight={500}
            fill="var(--ground)"
          >
            {b.char}
          </text>
        </g>
      ))}
    </svg>
  );
}

const wide: Block[] = [
  { char: "О", fill: "var(--accent)", top: 0, size: 380 },
  { char: "с", fill: "var(--surface-3)", top: 80, size: 420 },
  { char: "ь", fill: "var(--surface-2)", top: 96, size: 420 },
];

const tall: Block[] = [
  { char: "О", fill: "var(--accent)", top: 0, size: 512 },
  { char: "с", fill: "var(--surface-3)", top: 108, size: 560 },
  { char: "ь", fill: "var(--surface-2)", top: 130, size: 560 },
];

export function Footer() {
  return (
    <footer className="bg-ground">
      <div className="mx-auto w-full max-w-[1800px] px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
        <div role="img" aria-label="Ось">
          <Mark width={1200} height={540} baseline={480} blocks={tall} className="block w-full sm:hidden" />
          <Mark width={1800} height={400} baseline={356} blocks={wide} className="hidden w-full sm:block" />
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
