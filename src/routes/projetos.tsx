import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionTitle, meta } from "@/components/site/PageHero";
import { PROJECTS, STATUS_LABEL, type Project, type ProjectStatus } from "@/lib/site-data";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/projetos")({
  head: () => meta("Projetos — ONG CES-MT", "Projetos sociais em execução, concluídos e planejados pela ONG Cristo é o Salvador em Mato Grosso."),
  component: Projetos,
});

const GROUPS: { status: ProjectStatus; title: string }[] = [
  { status: "execucao", title: "Projetos em execução" },
  { status: "concluido", title: "Projetos desenvolvidos" },
  { status: "planejado", title: "Projetos futuros" },
];

function ProjectCard({ p }: { p: Project }) {
  return (
    <Dialog>
      <article className="flex flex-col rounded-lg border border-border border-t-4 border-t-navy bg-card p-6">
        <span className="text-xs font-bold uppercase tracking-widest text-cta">{STATUS_LABEL[p.status]}</span>
        <h3 className="mt-3 text-2xl font-semibold text-navy">{p.title}</h3>
        <p className="mt-3 flex-1 text-muted-foreground">{p.objective}</p>
        <DialogTrigger className="mt-6 self-start text-sm font-semibold text-cta hover:underline">Ver detalhes →</DialogTrigger>
      </article>
      <DialogContent>
        <DialogTitle className="text-2xl text-navy">{p.title}</DialogTitle>
        <DialogDescription>{STATUS_LABEL[p.status]}</DialogDescription>
        <dl className="space-y-4 text-sm">
          {[["Objetivo", p.objective], ["Público atendido", p.audience], ["Impacto esperado", p.impact]].map(([k, v]) => (
            <div key={k}><dt className="font-bold text-navy">{k}</dt><dd className="text-muted-foreground">{v}</dd></div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  );
}

function Projetos() {
  return (
    <>
      <PageHero eyebrow="Projetos" title="Ações planejadas para gerar mudança real.">Conheça o que estamos fazendo, o que já realizamos e o que vem pela frente.</PageHero>
      {GROUPS.map((g, i) => (
        <section key={g.status} className={i % 2 ? "bg-surface py-16" : "py-16"}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionTitle eyebrow={STATUS_LABEL[g.status]} title={g.title} />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.filter((p) => p.status === g.status).map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
