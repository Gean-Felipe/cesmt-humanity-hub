import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle, meta } from "@/components/site/PageHero";

export const Route = createFileRoute("/atividades")({
  head: () => meta("Atividades — ONG CES-MT", "Cronograma de oficinas educativas, culturais, esportivas, capacitação e apoio psicossocial da CES-MT."),
  component: Atividades,
});

const WEEK = [
  { day: "Segunda", items: [["Reforço escolar", "Educativa", "14h–16h"]] },
  { day: "Terça", items: [["Oficina de artes", "Cultural", "15h–17h"], ["Roda de conversa", "Apoio psicossocial", "19h"]] },
  { day: "Quarta", items: [["Futebol e recreação", "Esportiva", "16h–18h"]] },
  { day: "Quinta", items: [["Curso de informática", "Capacitação", "18h–20h"]] },
  { day: "Sexta", items: [["Música e coral", "Cultural", "15h–17h"]] },
  { day: "Sábado", items: [["Entrega de cestas", "Ação social", "8h–11h"]] },
];
const EVENTS = [
  ["Mutirão de cadastro de famílias", "Ação comunitária"],
  ["Festa das crianças", "Evento comunitário"],
  ["Campanha do agasalho", "Arrecadação"],
];

function Atividades() {
  return (
    <>
      <PageHero eyebrow="Atividades" title="Uma rotina de cuidado, semana após semana.">Horários sujeitos a ajustes — confirme pela página de contato.</PageHero>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Cronograma" title="Atividades regulares" />
        <div className="mt-10 divide-y divide-border rounded-lg border border-border">
          {WEEK.map((w) => (
            <div key={w.day} className="grid gap-3 p-5 md:grid-cols-[160px_1fr]">
              <p className="font-serif text-xl font-semibold text-navy">{w.day}</p>
              <ul className="space-y-2">
                {w.items.map(([n, c, h]) => (
                  <li key={n} className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-semibold">{n}</span>
                    <span className="rounded-sm bg-surface px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-navy">{c}</span>
                    <span className="text-sm text-muted-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Calendário" title="Próximos eventos e ações" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {EVENTS.map(([t, c]) => (
              <article key={t} className="rounded-lg border border-border bg-card p-6">
                <p className="font-serif text-sm font-semibold uppercase tracking-widest text-cta">[DATA]</p>
                <h3 className="mt-3 text-xl font-semibold text-navy">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
