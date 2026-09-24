import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero, meta } from "@/components/site/PageHero";
import { ORG } from "@/lib/site-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contato")({
  head: () => meta("Contato — ONG CES-MT", "Fale com a ONG Cristo é o Salvador: endereço em Mato Grosso, telefone, WhatsApp, e-mail e horário de atendimento."),
  component: Contato,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Informe um telefone ou WhatsApp").max(20),
  assunto: z.string().trim().min(3, "Informe o assunto").max(120),
  mensagem: z.string().trim().min(10, "Escreva ao menos 10 caracteres").max(1000),
});
type Field = keyof z.infer<typeof schema>;
const FIELDS: { f: Field; label: string }[] = [
  { f: "nome", label: "Nome" }, { f: "email", label: "E-mail" }, { f: "telefone", label: "Telefone / WhatsApp" }, { f: "assunto", label: "Assunto" },
];

function Contato() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({}); e.currentTarget.reset();
    toast.success("Mensagem enviada! Responderemos em breve.");
  };
  const info = [
    { icon: MapPin, k: "Endereço", v: ORG.address }, { icon: Phone, k: "Telefone", v: ORG.phone },
    { icon: MessageCircle, k: "WhatsApp", v: ORG.whatsapp }, { icon: Mail, k: "E-mail", v: ORG.email }, { icon: Clock, k: "Atendimento", v: ORG.hours },
  ];
  return (
    <>
      <PageHero eyebrow="Contato" title="Estamos aqui para ouvir você.">Precisa de ajuda, quer ajudar ou propor uma parceria? Fale com a gente.</PageHero>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
          {FIELDS.map(({ f, label }) => (
            <div key={f}>
              <Label htmlFor={f}>{label}</Label>
              <Input id={f} name={f} type={f === "email" ? "email" : "text"} className="mt-1.5" aria-invalid={!!errors[f]} />
              {errors[f] && <p className="mt-1 text-sm text-destructive">{errors[f]}</p>}
            </div>
          ))}
          <div className="sm:col-span-2">
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea id="mensagem" name="mensagem" rows={6} className="mt-1.5" aria-invalid={!!errors.mensagem} />
            {errors.mensagem && <p className="mt-1 text-sm text-destructive">{errors.mensagem}</p>}
          </div>
          <button className="rounded-md bg-cta py-3 font-bold text-primary-foreground hover:bg-cta-hover sm:col-span-2">Enviar mensagem</button>
        </form>
        <aside className="space-y-6">
          <ul className="space-y-5">
            {info.map(({ icon: Icon, k, v }) => (
              <li key={k} className="flex gap-4"><Icon className="mt-1 h-5 w-5 shrink-0 text-cta" aria-hidden /><div><p className="text-sm font-bold text-navy">{k}</p><p className="text-muted-foreground">{v}</p></div></li>
            ))}
          </ul>
          <a href={ORG.whatsappLink ?? "#"} target="_blank" rel="noreferrer" aria-disabled={!ORG.whatsappLink}
            onClick={(e) => { if (!ORG.whatsappLink) { e.preventDefault(); toast.info("WhatsApp oficial ainda não cadastrado."); } }}
            className="flex items-center justify-center gap-2 rounded-md bg-navy py-3 font-semibold text-primary-foreground hover:bg-navy-2">
            <MessageCircle className="h-5 w-5" /> Falar pelo WhatsApp
          </a>
          <div className="grid aspect-video place-items-center rounded-lg border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
            O mapa de localização será exibido quando o endereço oficial for cadastrado.
          </div>
        </aside>
      </section>
    </>
  );
}
