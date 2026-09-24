import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { PageHero, meta } from "@/components/site/PageHero";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galeria")({
  head: () => meta("Galeria — ONG CES-MT", "Registros das ações sociais, oficinas e eventos comunitários da ONG Cristo é o Salvador."),
  component: Galeria,
});

const CATS = ["Todas", "Ações Sociais", "Oficinas", "Eventos Comunitários"] as const;
type Cat = (typeof CATS)[number];
const ITEMS: { title: string; cat: Exclude<Cat, "Todas"> }[] = [
  { title: "Entrega de cestas", cat: "Ações Sociais" }, { title: "Oficina de artes", cat: "Oficinas" },
  { title: "Festa das crianças", cat: "Eventos Comunitários" }, { title: "Campanha do agasalho", cat: "Ações Sociais" },
  { title: "Curso de informática", cat: "Oficinas" }, { title: "Natal solidário", cat: "Eventos Comunitários" },
];

function Galeria() {
  const [cat, setCat] = useState<Cat>("Todas");
  const shown = cat === "Todas" ? ITEMS : ITEMS.filter((i) => i.cat === cat);
  return (
    <>
      <PageHero eyebrow="Galeria" title="Registros de quem faz acontecer.">As fotos oficiais das ações serão publicadas aqui.</PageHero>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition-colors", cat === c ? "border-navy bg-navy text-primary-foreground" : "border-border hover:border-navy")}>{c}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((i) => (
            <figure key={i.title}>
              <div className="grid aspect-[4/3] place-items-center rounded-lg border border-dashed border-border bg-surface text-muted-foreground">
                <ImageIcon className="h-10 w-10" aria-hidden /><span className="sr-only">Foto a ser adicionada</span>
              </div>
              <figcaption className="mt-3"><p className="font-semibold text-navy">{i.title}</p><p className="text-xs uppercase tracking-widest text-cta">{i.cat}</p></figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
