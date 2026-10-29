import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle, Mail, MapPin } from "lucide-react";
import { NAV, ORG } from "@/lib/site-data";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed opacity-80">
            Organização da sociedade civil que acolhe, orienta e transforma vidas em Mato Grosso. Declarada de Utilidade Pública Estadual (Lei nº 11.717/2022).
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={ORG.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da ONG CES-MT"
              className="grid h-9 w-9 place-items-center rounded-full bg-navy-2 text-primary-foreground transition-all hover:bg-cta hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={ORG.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook da ONG CES-MT"
              className="grid h-9 w-9 place-items-center rounded-full bg-navy-2 text-primary-foreground transition-all hover:bg-cta hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={ORG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp da ONG CES-MT"
              className="grid h-9 w-9 place-items-center rounded-full bg-navy-2 text-primary-foreground transition-all hover:bg-cta hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-cta">Páginas</h2>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="opacity-85 hover:text-cta hover:opacity-100">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-cta">Contato</h2>
          <ul className="space-y-3 text-sm opacity-85">
            <li className="flex flex-col items-center gap-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cta">
                <MapPin className="h-3.5 w-3.5 shrink-0" /> Endereço
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ORG.address)}`}
                target="_blank"
                rel="noreferrer"
                className="max-w-xs leading-relaxed hover:text-cta hover:underline"
              >
                {ORG.address}
              </a>
            </li>
            <li className="flex items-center justify-center gap-2 pt-1">
              <MessageCircle className="h-4 w-4 shrink-0 text-cta" />
              <a href={ORG.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-cta hover:underline">
                WhatsApp: {ORG.whatsapp}
              </a>
            </li>
            <li className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-cta" />
              <a href={`mailto:${ORG.email}`} className="hover:text-cta hover:underline">
                {ORG.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-cta">Institucional</h2>
          <ul className="space-y-2 text-sm opacity-85">
            <li className="font-semibold text-primary-foreground">{ORG.name}</li>
            <li>CNPJ: {ORG.cnpj}</li>
            <li>Horário: {ORG.hours}</li>
            <li className="pt-2 text-xs opacity-75">
              Utilidade Pública Estadual — MT<br />Lei nº 11.717/2022
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-2 bg-navy-deep">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs opacity-70 sm:px-6">
          © {new Date().getFullYear()} {ORG.name} ({ORG.short}). Todos os direitos reservados. Compromisso com a transparência.
        </p>
      </div>
    </footer>
  );
}
