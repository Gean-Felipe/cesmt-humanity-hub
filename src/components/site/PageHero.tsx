import type { ReactNode } from "react";

interface PageHeroProps { eyebrow: string; title: string; children?: ReactNode }

/** Cabeçalho editorial das páginas internas. */
export function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <section className="border-b-4 border-cta bg-navy text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cta">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed opacity-85">{children}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, className }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-cta">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-navy md:text-4xl">{title}</h2>
    </div>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
  };
}
