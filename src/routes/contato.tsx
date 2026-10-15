import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Clock, Facebook, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero, SectionTitle, meta } from "@/components/site/PageHero";
import { PixCard } from "@/components/site/PixCard";
import { ORG } from "@/lib/site-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contato")({
  head: () =>
    meta(
      "Contato e Como Ajudar — Doe ou fale com a ONG CES-MT",
      "Doe via PIX, contribua com alimentos prioritários ou fale diretamente com a ONG Cristo é o Salvador pelo WhatsApp."
    ),
  component: Contato,
});

const ITEMS = [
  "Arroz, feijão e óleo",
  "Leite e açúcar",
  "Produtos de higiene",
  "Material escolar",
  "Roupas e cobertores",
  "Fraldas infantis",
];

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Informe um telefone ou WhatsApp").max(20),
  assunto: z.string().trim().min(3, "Informe o assunto").max(120),
  mensagem: z.string().trim().min(10, "Escreva ao menos 10 caracteres").max(1000),
});
type Field = keyof z.infer<typeof schema>;
const FIELDS: { f: Field; label: string }[] = [
  { f: "nome", label: "Nome" },
  { f: "email", label: "E-mail" },
  { f: "telefone", label: "Telefone / WhatsApp" },
  { f: "assunto", label: "Assunto" },
];

function Contato() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    e.currentTarget.reset();
    toast.success("Mensagem enviada! Responderemos em breve pelo WhatsApp.");
  };

  const info = [
    {
      icon: MapPin,
      k: "Endereço",
      v: ORG.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ORG.address)}`,
      target: "_blank",
    },
    {
      icon: MessageCircle,
      k: "WhatsApp",
      v: ORG.whatsapp,
      href: ORG.whatsappLink,
      target: "_blank",
    },
    {
      icon: Mail,
      k: "E-mail",
      v: ORG.email,
      href: `mailto:${ORG.email}`,
    },
    {
      icon: Clock,
      k: "Atendimento",
      v: ORG.hours,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contato e Doações"
        title="Estamos aqui para ouvir você e receber seu apoio."
      >
        Precisa de ajuda, quer doar via PIX, contribuir com alimentos ou propor uma parceria? Fale com a gente.
      </PageHero>

      {/* Doação Financeira — PIX */}
      <section id="doar" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Doação financeira" title="Doe via PIX" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {ORG.pix.map((p) => (
            <PixCard key={p.label} label={p.label} pixKey={p.key} />
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Favorecido: {ORG.name} · CNPJ {ORG.cnpj}
        </p>
      </section>

      {/* Materiais e Alimentos */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Materiais e alimentos" title="Itens prioritários" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((i) => (
              <li key={i} className="flex items-center gap-3 rounded-md bg-card p-4">
                <Check className="h-5 w-5 text-cta" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mensagem e Contato WhatsApp */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionTitle eyebrow="Fale Conosco" title="Envie uma mensagem" />
          <p className="mt-3 text-muted-foreground">
            Dúvidas, pedidos de apoio, interesse em voluntariado ou parcerias? Envie sua mensagem abaixo.
          </p>
          <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
            {FIELDS.map(({ f, label }) => (
              <div key={f}>
                <Label htmlFor={f}>{label}</Label>
                <Input
                  id={f}
                  name={f}
                  type={f === "email" ? "email" : "text"}
                  className="mt-1.5"
                  aria-invalid={!!errors[f]}
                />
                {errors[f] && <p className="mt-1 text-sm text-destructive">{errors[f]}</p>}
              </div>
            ))}
            <div className="sm:col-span-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea
                id="mensagem"
                name="mensagem"
                rows={6}
                className="mt-1.5"
                aria-invalid={!!errors.mensagem}
              />
              {errors.mensagem && <p className="mt-1 text-sm text-destructive">{errors.mensagem}</p>}
            </div>
            <button className="rounded-md bg-cta py-3 font-bold text-primary-foreground transition-colors hover:bg-cta-hover sm:col-span-2 cursor-pointer">
              Enviar mensagem
            </button>
          </form>
        </div>

        <aside className="space-y-6 lg:pt-16">
          <ul className="space-y-5">
            {info.map(({ icon: Icon, k, v, href, target }) => (
              <li key={k} className="flex gap-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-cta" aria-hidden />
                <div>
                  <p className="text-sm font-bold text-navy">{k}</p>
                  {href ? (
                    <a
                      href={href}
                      target={target}
                      rel={target ? "noreferrer" : undefined}
                      className="text-muted-foreground transition-colors hover:text-cta hover:underline"
                    >
                      {v}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{v}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 pt-1">
            <span className="text-sm font-bold text-navy mr-1">Redes Sociais:</span>
            <a
              href={ORG.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da ONG CES-MT"
              className="grid h-9 w-9 place-items-center rounded-full bg-navy text-primary-foreground transition-all hover:bg-cta hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={ORG.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook da ONG CES-MT"
              className="grid h-9 w-9 place-items-center rounded-full bg-navy text-primary-foreground transition-all hover:bg-cta hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          <a
            href={ORG.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-navy py-3 font-semibold text-primary-foreground transition-colors hover:bg-navy-2"
          >
            <MessageCircle className="h-5 w-5" /> Falar pelo WhatsApp
          </a>

          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-xs">
            <iframe
              title="Localização da ONG CES-MT"
              src="https://maps.google.com/maps?q=Rua+Rio+Grande+56+Novo+Horizonte+Cuiaba+MT&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-3 text-center">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ORG.address)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-cta hover:underline"
              >
                Abrir endereço no Google Maps →
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Empresas Parceiras */}
      <section className="bg-navy py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cta">Empresas parceiras</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold">Responsabilidade social com impacto mensurável.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              ["Patrocínio de projetos", "Apoie uma iniciativa específica e acompanhe resultados."],
              ["Voluntariado corporativo", "Engaje seus colaboradores em ações da comunidade."],
              ["Doação de produtos", "Destine itens e serviços a quem precisa."],
            ].map(([t, d]) => (
              <div key={t} className="border-t-2 border-cta pt-5">
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-2 opacity-80">{d}</p>
              </div>
            ))}
          </div>
          <a
            href={ORG.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-md bg-cta px-6 py-3 font-bold hover:bg-cta-hover transition-colors"
          >
            Quero ser parceiro via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
