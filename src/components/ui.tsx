import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-body font-medium transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  ghost: "bg-surface-2 text-ink hover:bg-surface-3",
  dark: "bg-ground text-ink hover:bg-surface",
};

type Variant = keyof typeof variants;

export function ButtonLink({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1800px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({ id, children, className = "", full = false }: { id?: string; children: ReactNode; className?: string; full?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-18 py-20 sm:py-28 ${className}`}>
      {full ? children : <Container>{children}</Container>}
    </section>
  );
}
