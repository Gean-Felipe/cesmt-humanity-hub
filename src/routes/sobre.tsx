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
    responsibilities:
      "Representação institucional e legal da ONG CES-MT, condução pastoral, planejamento estratégico das frentes comunitárias e articulação com parceiros e poder público.",
    pendingNote: null,
  },
  {
    name: "Equipe Social",
    role: "Coordenação de Acolhimento Comunitário",
    responsibilities:
      "Cadastro socioeconômico e escuta qualificada das famílias, visitas domiciliares, triagem de demandas emergenciais e organização das entregas de cestas básicas e do Mercadinho Solidário.",
    pendingNote: "Identificação nominal da coordenação social pendente de confirmação documental.",
  },
  {
    name: "Equipe Administrativa",
    role: "Secretaria e Gestão Institucional",
    responsibilities:
      "Gestão documental, atas, certidões institucionais, atendimento na sede, controle de cadastros e suporte operacional às atividades semanais da organização.",
    pendingNote: "Identificação nominal da secretaria executiva pendente de confirmação documental.",
  },
  {
    name: "Equipe Financeira",
    role: "Tesouraria e Prestação de Contas",
    responsibilities:
      "Controle de receitas e despesas, gestão das doações recebidas via PIX, organização de comprovantes fiscais e elaboração de balancetes para prestação de contas.",
    pendingNote: "Identificação nominal da tesouraria pendente de confirmação documental.",
  },
  {
    name: "Conselho Fiscal",
    role: "Fiscalização e Conformidade",
    responsibilities:
      "Verificação periódica dos relatórios contábeis, acompanhamento da correta aplicação dos recursos doados e emissão de pareceres de conformidade estatutária.",
    pendingNote: "Composição nominal dos conselheiros fiscais pendente de confirmação em ata vigente.",
  },
  {
    name: "Corpo Voluntário",
    role: "Coordenação de Projetos e Oficinas",
    responsibilities:
      "Planejamento e execução das oficinas socioeducativas, reforço escolar, apoio logístico na coleta de doações e mobilização nas campanhas comunitárias.",
    pendingNote: "Relação nominal de coordenadores de oficinas em atualização cadastral.",
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
              <div key={m.role} className="flex flex-col justify-between rounded-lg border border-border bg-card p-5 shadow-xs">
                <div>
                  <p className="font-semibold text-base text-navy">{m.name}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-cta">{m.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Responsabilidades: </span>
                    {m.responsibilities}
                  </p>
                </div>
                {m.pendingNote && (
                  <p className="mt-3 border-t border-border pt-2.5 text-xs italic text-muted-foreground">
                    {m.pendingNote}
                  </p>
                )}
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
