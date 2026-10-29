import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle, meta } from "@/components/site/PageHero";
import { evaluateCalendarEvents } from "@/lib/calendarUtils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atividades")({
  head: () => meta("Atividades — ONG CES-MT", "Cronograma de oficinas educativas, culturais, esportivas, capacitação e apoio psicossocial da CES-MT."),
  component: Atividades,
});

const WEEK = [
  {
    day: "Segunda-feira",
    title: "Arrecadação e Coletas de Doação",
    category: "Logística & Solidariedade",
    description: "Recepção, triagem e busca de doações de alimentos, roupas e suprimentos para as ações comunitárias.",
  },
  {
    day: "Terça e Quarta-feira",
    title: "Distribuição e Doação de Cestas de Frutas e Verduras",
    category: "Segurança Alimentar",
    description: "Entrega direta de alimentos frescos, frutas e hortaliças para famílias cadastradas em situação de vulnerabilidade.",
  },
  {
    day: "Quinta, Sexta e Sábado",
    title: "Projeto Mercadinho Solidário",
    category: "Ação Comunitária",
    description: "Espaço comunitário de apoio onde as famílias cadastradas escolhem itens essenciais com dignidade.",
  },
];

type EventFilter = "proximos" | "encerrados" | "todos";

function Atividades() {
  const [filter, setFilter] = useState<EventFilter>("todos");
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const evaluatedEvents = useMemo(() => evaluateCalendarEvents(undefined, now), [now]);

  const upcomingCount = useMemo(
    () => evaluatedEvents.filter((e) => e.status === "em_andamento" || e.status === "futuro").length,
    [evaluatedEvents]
  );
  const pastCount = useMemo(
    () => evaluatedEvents.filter((e) => e.status === "encerrado").length,
    [evaluatedEvents]
  );

  const visibleEvents = useMemo(() => {
    if (filter === "proximos") {
      return evaluatedEvents.filter((e) => e.status === "em_andamento" || e.status === "futuro");
    }
    if (filter === "encerrados") {
      return evaluatedEvents.filter((e) => e.status === "encerrado");
    }
    return evaluatedEvents;
  }, [evaluatedEvents, filter]);

  return (
    <>
      <PageHero eyebrow="Atividades" title="Uma rotina de cuidado, semana após semana.">
        Confira a programação semanal das nossas ações sociais na comunidade.
      </PageHero>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Cronograma Semanal" title="Atividades da ONG" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {WEEK.map((w) => (
            <div key={w.day} className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs transition-shadow hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                    {w.category}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-navy">{w.day}</h3>
                <p className="mt-2 text-lg font-semibold text-cta">{w.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle eyebrow="Calendário" title="Próximos eventos e ações" />
            <div role="group" aria-label="Filtrar eventos do calendário" className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter("proximos")}
                aria-pressed={filter === "proximos"}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
                  filter === "proximos"
                    ? "border-navy bg-navy text-primary-foreground"
                    : "border-border bg-card hover:border-navy"
                )}
              >
                Próximos ({upcomingCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter("encerrados")}
                aria-pressed={filter === "encerrados"}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
                  filter === "encerrados"
                    ? "border-navy bg-navy text-primary-foreground"
                    : "border-border bg-card hover:border-navy"
                )}
              >
                Realizados ({pastCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter("todos")}
                aria-pressed={filter === "todos"}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer",
                  filter === "todos"
                    ? "border-navy bg-navy text-primary-foreground"
                    : "border-border bg-card hover:border-navy"
                )}
              >
                Todos ({evaluatedEvents.length})
              </button>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {visibleEvents.map((e) => (
              <article
                key={e.id}
                className={cn(
                  "flex flex-col justify-between rounded-lg border bg-card p-6 shadow-xs",
                  e.isNextHighlight ? "border-cta" : "border-border",
                  e.status === "encerrado" && "opacity-80"
                )}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-serif text-xs font-bold uppercase tracking-widest text-cta">
                      {e.dateFormatted}
                    </p>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        e.status === "em_andamento"
                          ? "bg-cta text-primary-foreground"
                          : e.status === "futuro"
                          ? "bg-navy text-primary-foreground"
                          : "bg-surface text-muted-foreground"
                      )}
                    >
                      {e.statusLabel}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-navy">{e.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {e.category} · {e.relativeTimeLabel}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
                </div>
                <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground space-y-1">
                  <p>
                    <strong className="text-foreground">Horário:</strong> {e.timeDisplay}
                  </p>
                  <p>
                    <strong className="text-foreground">Local:</strong> {e.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
