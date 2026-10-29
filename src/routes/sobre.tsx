import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle, meta } from "@/components/site/PageHero";

export const Route = createFileRoute("/sobre")({
  head: () => meta("Sobre Nós — ONG CES-MT", "Conheça a história, missão, visão, valores e a equipe da ONG Cristo é o Salvador em Mato Grosso."),
  component: Sobre,
});

const MVV = [
  { t: "Missão", d: "Acolher e promover a dignidade de pessoas e famílias em vulnerabilidade, por meio de ações sociais, educativas e comunitárias." },
  { t: "Visão", d: "Ser referência em Mato Grosso como instituição que transforma realidades com amor, seriedade e transparência." },
  { t: "Valores", d: "Fé, respeito, solidariedade, ética, transparência e compromisso com cada pessoa atendida." },
];
const PRINC = ["Cada pessoa é tratada com dignidade", "Escuta antes de agir", "Transparência no uso dos recursos", "Trabalho em rede com a comunidade", "Continuidade, não assistencialismo pontual"];
const TEAM = [
  {
    name: "Pr. Valdeck",
    role: "Presidência e Liderança Pastoral",
    responsibility: "Representação institucional, condução pastoral e direção geral das ações sociais.",
  },
  {
    name: "Equipe Social",
    role: "Coordenação de Acolhimento Comunitário",
    responsibility: "Cadastro de famílias, triagem social e entrega de cestas e doações.",
  },
  {
    name: "Equipe Administrativa",
    role: "Secretaria e Gestão Institucional",
    responsibility: "Gestão documental, atendimento na sede e organização operacional.",
  },
  {
    name: "Equipe Financeira",
    role: "Tesouraria e Prestação de Contas",
    responsibility: "Controle de receitas, gestão das doações via PIX e prestação de contas.",
  },
  {
    name: "Conselho Fiscal",
    role: "Fiscalização e Conformidade",
    responsibility: "Conferência contábil e fiscalização da aplicação transparente dos recursos.",
  },
  {
    name: "Corpo Voluntário",
    role: "Coordenação de Projetos e Oficinas",
    responsibility: "Execução das oficinas educativas, reforço escolar e mutirões comunitários.",
  },
];

function Sobre() {
  return (
    <>
      <PageHero eyebrow="Sobre nós" title="Uma história construída com fé e serviço ao próximo.">
        A CES-MT nasceu do desejo de transformar o cuidado em ação concreta.
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.5fr]">
        <SectionTitle eyebrow="Nossa história" title="Como tudo começou" />
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            A ONG Cristo é o Salvador (CES-MT) foi fundada em 14 de março de 2018 em Cuiabá por iniciativa de líderes e membros comprometidos com o amparo às famílias em situação de vulnerabilidade em Mato Grosso.
          </p>
          <p>
            Desde o início, as ações foram pautadas no acolhimento humano, na segurança alimentar e no suporte direto à comunidade local. Em 1º de abril de 2022, a seriedade e o impacto social da instituição foram oficialmente reconhecidos pelo Estado de Mato Grosso através da Lei Estadual nº 11.717, que declarou a entidade de Utilidade Pública Estadual.
          </p>
        </div>
      </section>
      <section className="bg-navy py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3">
          {MVV.map((m) => (
            <div key={m.t} className="border-t-2 border-cta pt-6">
              <h2 className="text-3xl font-semibold">{m.t}</h2>
              <p className="mt-4 leading-relaxed opacity-85">{m.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Princípios" title="O que guia nosso trabalho" />
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {PRINC.map((p, i) => (
            <li key={p} className="flex items-baseline gap-5 border-b border-border pb-4">
              <span className="font-serif text-3xl text-cta">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-lg text-foreground">{p}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Equipe e liderança" title="Quem conduz a CES-MT" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.role} className="flex flex-col justify-center rounded-lg border border-border bg-card p-5 shadow-xs">
                <p className="font-semibold text-base text-navy">{m.name}</p>
                <p className="mt-0.5 text-sm font-medium text-cta">{m.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.responsibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <SectionTitle eyebrow="Transparência" title="Compromisso ético com quem confia em nós" />
        <p className="mt-6 text-lg text-muted-foreground">Prestamos contas das doações recebidas e mantemos nossa documentação disponível a parceiros e apoiadores. Relatórios e estatuto podem ser solicitados pela página de contato.</p>
      </section>
    </>
  );
}
