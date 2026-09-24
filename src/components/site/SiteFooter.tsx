import { Link } from "@tanstack/react-router";
import { NAV, ORG } from "@/lib/site-data";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed opacity-80">Organização da sociedade civil que acolhe, orienta e transforma vidas em Mato Grosso.</p>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-cta">Páginas</h2>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="opacity-85 hover:text-cta hover:opacity-100">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-cta">Contato</h2>
          <ul className="space-y-2 text-sm opacity-85">
            <li>{ORG.address}</li><li>{ORG.phone}</li><li>WhatsApp: {ORG.whatsapp}</li><li>{ORG.email}</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-cta">Institucional</h2>
          <ul className="space-y-2 text-sm opacity-85">
            <li>{ORG.name}</li><li>CNPJ: {ORG.cnpj}</li><li>Redes sociais: [INSERIR LINKS]</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-2 bg-navy-deep">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs opacity-70 sm:px-6">© {new Date().getFullYear()} {ORG.name} ({ORG.short}). Todos os direitos reservados. Compromisso com a transparência.</p>
      </div>
    </footer>
  );
}
