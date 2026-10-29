import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero, meta } from "@/components/site/PageHero";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galeria")({
  head: () => meta("Galeria — ONG CES-MT", "Registros das ações sociais, oficinas e eventos comunitários da ONG Cristo é o Salvador."),
  component: Galeria,
});

const CATS = ["Todas", "Ações Sociais", "Oficinas", "Eventos Comunitários"] as const;
type Cat = (typeof CATS)[number];

const ITEMS: { id: number; title: string; cat: Exclude<Cat, "Todas">; imageUrl: string; description: string }[] = [
  {
    id: 1,
    title: "Entrega de cestas",
    cat: "Ações Sociais",
    imageUrl: "/images/galeria/acao-comunitaria-01.jpg",
    description: "Atendimento direto e entrega de cestas de alimentos às famílias cadastradas pela ONG CES-MT.",
  },
  {
    id: 2,
    title: "Oficina de artes",
    cat: "Oficinas",
    imageUrl: "/images/galeria/acao-comunitaria-02.jpg",
    description: "Atividades socioeducativas e oficinas comunitárias promovidas com as famílias atendidas.",
  },
  {
    id: 3,
    title: "Festa das crianças",
    cat: "Eventos Comunitários",
    imageUrl: "/images/galeria/acao-comunitaria-03.jpg",
    description: "Momento de convivência, recreação e acolhimento comunitário com crianças e famílias.",
  },
  {
    id: 4,
    title: "Campanha do agasalho",
    cat: "Ações Sociais",
    imageUrl: "/images/galeria/acao-comunitaria-04.jpg",
    description: "Arrecadação, triagem e entrega solidária de doações para famílias em vulnerabilidade.",
  },
  {
    id: 5,
    title: "Curso de informática",
    cat: "Oficinas",
    imageUrl: "/images/galeria/acao-comunitaria-05.jpg",
    description: "Formação, aprendizado coletivo e acompanhamento pedagógico nas ações da ONG CES-MT.",
  },
  {
    id: 6,
    title: "Natal solidário",
    cat: "Eventos Comunitários",
    imageUrl: "/images/galeria/acao-comunitaria-06.jpg",
    description: "Encontro comunitário e celebração solidária com voluntários e famílias atendidas em Cuiabá - MT.",
  },
];

function Galeria() {
  const [cat, setCat] = useState<Cat>("Todas");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const shown = cat === "Todas" ? ITEMS : ITEMS.filter((i) => i.cat === cat);

  useEffect(() => {
    setSelectedIndex(null);
  }, [cat]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % shown.length));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + shown.length) % shown.length));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, shown.length]);

  const activeItem = selectedIndex !== null ? shown[selectedIndex] : null;

  return (
    <>
      <PageHero eyebrow="Galeria" title="Registros de quem faz acontecer.">As fotos oficiais das ações serão publicadas aqui.</PageHero>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer", cat === c ? "border-navy bg-navy text-primary-foreground" : "border-border hover:border-navy")}>{c}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((i, idx) => (
            <figure key={i.id}>
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Ampliar imagem: ${i.title}`}
                className="group relative block w-full aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy cursor-pointer"
              >
                <img
                  src={i.imageUrl}
                  alt={`${i.title} — ${i.cat}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
              <figcaption className="mt-3"><p className="font-semibold text-navy">{i.title}</p><p className="text-xs uppercase tracking-widest text-cta">{i.cat}</p></figcaption>
            </figure>
          ))}
        </div>

        <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
          <DialogContent className="max-w-4xl border-border bg-card p-4 sm:p-6">
            {activeItem && selectedIndex !== null && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 pr-8">
                  <div>
                    <DialogTitle className="text-lg font-semibold text-navy">
                      {activeItem.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs font-bold uppercase tracking-widest text-cta">
                      {activeItem.cat} · Foto {selectedIndex + 1} de {shown.length}
                    </DialogDescription>
                  </div>
                </div>
                <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-surface">
                  <img
                    src={activeItem.imageUrl}
                    alt={`${activeItem.title} — ${activeItem.cat}`}
                    className="max-h-[70vh] w-auto object-contain"
                  />
                  {shown.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setSelectedIndex((selectedIndex - 1 + shown.length) % shown.length)}
                        aria-label="Foto anterior"
                        className="absolute left-3 grid h-10 w-10 place-items-center rounded-full bg-navy/85 text-primary-foreground transition-colors hover:bg-cta cursor-pointer"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedIndex((selectedIndex + 1) % shown.length)}
                        aria-label="Próxima foto"
                        className="absolute right-3 grid h-10 w-10 place-items-center rounded-full bg-navy/85 text-primary-foreground transition-colors hover:bg-cta cursor-pointer"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{activeItem.description}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}
