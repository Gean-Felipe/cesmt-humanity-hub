import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HandHeart, BookOpen, Users, Wheat } from "lucide-react";
import { PROJECTS, STATUS_LABEL, ORG } from "@/lib/site-data";
import { SectionTitle, meta } from "@/components/site/PageHero";
import { PixCard } from "@/components/site/PixCard";

export const Route = createFileRoute("/")({
  head: () => meta("ONG CES-MT — Cristo é o Salvador | Transformando vidas em MT", "A ONG Cristo é o Salvador (CES-MT) acolhe famílias, crianças e jovens em Mato Grosso com projetos sociais, educação e solidariedade."),
  component: Home,
});

const PILLARS = [
  { icon: HandHeart, title: "Acolhimento", text: "Escuta e orientação a famílias em vulnerabilidade." },
  { icon: Wheat, title: "Segurança alimentar", text: "Arrecadação e distribuição de alimentos." },
  { icon: BookOpen, title: "Educação", text: "Reforço escolar e oficinas formativas." },
  { icon: Users, title: "Comunidade", text: "Ações que fortalecem vínculos e cidadania." },
];

function Home() {
  return (
    <>
      <section className="bg-navy text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cta">ONG Cristo é o Salvador · Mato Grosso</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] md:text-7xl">Acolher pessoas.<br />Transformar vidas.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-85">Há anos a CES-MT caminha ao lado de famílias, crianças e jovens de Mato Grosso, levando cuidado, dignidade e esperança a quem mais precisa.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/sobre" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 px-6 py-3 font-semibold hover:bg-navy-2">Conheça nosso trabalho <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/como-ajudar" className="rounded-md bg-cta px-6 py-3 font-bold hover:bg-cta-hover">QUERO AJUDAR</Link>
            </div>
          </div>
          <blockquote className="border-l-4 border-cta pl-6 font-serif text-2xl italic leading-snug opacity-90">
            “Servir ao próximo é a forma mais concreta de viver a fé.”
            <footer className="mt-4 font-sans text-sm not-italic opacity-70">— Princípio da CES-MT</footer>
          </blockquote>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
        <SectionTitle eyebrow="Quem somos" title="Uma instituição feita de pessoas que cuidam de pessoas." />
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>A CES-MT é uma organização da sociedade civil, sem fins lucrativos, que atua no atendimento social, educacional e comunitário em Mato Grosso.</p>
          <Link to="/sobre" className="inline-flex items-center gap-2 font-semibold text-cta hover:underline">Conheça nossa história <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Pilares de atuação" title="Onde colocamos nossas mãos" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-card p-8">
                <Icon className="h-8 w-8 text-cta" aria-hidden />
                <h3 className="mt-5 text-xl font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Projetos" title="Iniciativas em andamento" />
          <Link to="/projetos" className="inline-flex items-center gap-2 font-semibold text-cta hover:underline">Ver todos os projetos <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROJECTS.filter((p) => p.status === "execucao").map((p) => (
            <article key={p.slug} className="flex flex-col rounded-lg border border-border border-t-4 border-t-navy bg-card p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-cta">{STATUS_LABEL[p.status]}</span>
              <h3 className="mt-3 text-2xl font-semibold text-navy">{p.title}</h3>
              <p className="mt-3 flex-1 text-muted-foreground">{p.objective}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle eyebrow="Atividades" title="Oficinas, encontros e ações comunitárias toda semana." />
            <p className="mt-5 text-lg text-muted-foreground">Educação, cultura, esporte, capacitação e apoio psicossocial fazem parte da nossa rotina.</p>
            <Link to="/atividades" className="mt-6 inline-flex items-center gap-2 font-semibold text-cta hover:underline">Ver cronograma <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-navy">Doe via PIX</h2>
            <PixCard label={ORG.pix[0].label} pixKey={ORG.pix[0].key} />
          </div>
        </div>
      </section>

      <section className="bg-cta text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-3xl font-semibold">Seu tempo também transforma. Seja voluntário ou fale com a gente.</h2>
          <div className="flex gap-3">
            <Link to="/como-ajudar" className="rounded-md bg-navy px-6 py-3 font-semibold hover:bg-navy-2">Ser voluntário</Link>
            <Link to="/contato" className="rounded-md border border-primary-foreground px-6 py-3 font-semibold hover:bg-cta-hover">Contato</Link>
          </div>
        </div>
      </section>
    </>
  );
}
