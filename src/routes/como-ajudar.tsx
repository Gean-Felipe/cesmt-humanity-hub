import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { PageHero, SectionTitle, meta } from "@/components/site/PageHero";
import { PixCard } from "@/components/site/PixCard";
import { ORG } from "@/lib/site-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/como-ajudar")({
  head: () => meta("Como Ajudar — Doe ou seja voluntário | ONG CES-MT", "Doe via PIX, contribua com alimentos e materiais, seja voluntário ou empresa parceira da ONG CES-MT."),
  component: ComoAjudar,
});

const ITEMS = ["Arroz, feijão e óleo", "Leite e açúcar", "Produtos de higiene", "Material escolar", "Roupas e cobertores", "Fraldas infantis"];
const AREAS = ["Educação", "Eventos", "Arrecadação", "Comunicação", "Apoio administrativo", "Saúde e bem-estar"];

const volunteerSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Informe um telefone").max(20),
  areas: z.array(z.string()).min(1, "Escolha ao menos uma área"),
});

function VolunteerForm() {
  const [areas, setAreas] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = volunteerSchema.safeParse({ nome: fd.get("nome"), email: fd.get("email"), telefone: fd.get("telefone"), areas });
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    setErrors({}); e.currentTarget.reset(); setAreas([]);
    toast.success("Inscrição recebida! Entraremos em contato.");
  };
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-lg border border-border bg-card p-6">
      {(["nome", "email", "telefone"] as const).map((f) => (
        <div key={f}>
          <Label htmlFor={`v-${f}`} className="capitalize">{f === "email" ? "E-mail" : f}</Label>
          <Input id={`v-${f}`} name={f} type={f === "email" ? "email" : "text"} className="mt-1.5" aria-invalid={!!errors[f]} />
          {errors[f] && <p className="mt-1 text-sm text-destructive">{errors[f]}</p>}
        </div>
      ))}
      <fieldset>
        <legend className="text-sm font-medium">Áreas de interesse</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {AREAS.map((a) => {
            const on = areas.includes(a);
            return <button type="button" key={a} aria-pressed={on} onClick={() => setAreas(on ? areas.filter((x) => x !== a) : [...areas, a])}
              className={on ? "rounded-full border border-navy bg-navy px-3 py-1.5 text-sm text-primary-foreground" : "rounded-full border border-border px-3 py-1.5 text-sm hover:border-navy"}>{a}</button>;
          })}
        </div>
        {errors["areas"] && <p className="mt-1 text-sm text-destructive">{errors["areas"]}</p>}
      </fieldset>
      <button className="w-full rounded-md bg-cta py-3 font-bold text-primary-foreground hover:bg-cta-hover">Quero ser voluntário</button>
    </form>
  );
}

function ComoAjudar() {
  return (
    <>
      <PageHero eyebrow="Como ajudar" title="Toda ajuda chega a alguém que precisa.">Escolha a forma de contribuir que faz mais sentido para você.</PageHero>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle eyebrow="Doação financeira" title="Doe via PIX" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {ORG.pix.map((p) => <PixCard key={p.label} label={p.label} pixKey={p.key} />)}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Favorecido: {ORG.name} · CNPJ {ORG.cnpj}</p>
      </section>
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Materiais e alimentos" title="Itens prioritários" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((i) => <li key={i} className="flex items-center gap-3 rounded-md bg-card p-4"><Check className="h-5 w-5 text-cta" aria-hidden />{i}</li>)}
          </ul>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Voluntariado" title="Seja voluntário" />
          <p className="mt-5 text-lg text-muted-foreground">Doe algumas horas do seu tempo e ajude a transformar a realidade de famílias em Mato Grosso.</p>
        </div>
        <VolunteerForm />
      </section>
      <section className="bg-navy py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cta">Empresas parceiras</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold">Responsabilidade social com impacto mensurável.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[["Patrocínio de projetos", "Apoie uma iniciativa específica e acompanhe resultados."], ["Voluntariado corporativo", "Engaje seus colaboradores em ações da comunidade."], ["Doação de produtos", "Destine itens e serviços a quem precisa."]].map(([t, d]) => (
              <div key={t} className="border-t-2 border-cta pt-5"><h3 className="text-xl font-semibold">{t}</h3><p className="mt-2 opacity-80">{d}</p></div>
            ))}
          </div>
          <Link to="/contato" className="mt-10 inline-block rounded-md bg-cta px-6 py-3 font-bold hover:bg-cta-hover">Quero ser parceiro</Link>
        </div>
      </section>
    </>
  );
}
