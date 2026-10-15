import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle, meta } from "@/components/site/PageHero";

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
const EVENTS = [
  { title: "Mutirão de cadastro de famílias", category: "Ação comunitária", date: "Todo 1º Sábado do Mês" },
  { title: "Ação Social e Dia das Crianças", category: "Evento comunitário", date: "Outubro" },
  { title: "Campanha Natal Solidário", category: "Arrecadação e Doação", date: "Novembro / Dezembro" },
];

function Atividades() {
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
          <SectionTitle eyebrow="Calendário" title="Próximos eventos e ações" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {EVENTS.map((e) => (
              <article key={e.title} className="rounded-lg border border-border bg-card p-6 shadow-xs">
                <p className="font-serif text-xs font-bold uppercase tracking-widest text-cta">{e.date}</p>
                <h3 className="mt-3 text-xl font-semibold text-navy">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.category}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
