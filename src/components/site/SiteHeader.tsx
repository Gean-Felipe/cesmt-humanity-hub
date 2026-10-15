import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { NAV } from "@/lib/site-data";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-navy text-primary-foreground shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" aria-label="CES-MT — página inicial"><Logo /></Link>
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="relative px-3 py-2 text-sm font-medium text-primary-foreground/85 transition-colors hover:text-cta focus-visible:outline-2 focus-visible:outline-cta"
              activeProps={{ className: "!text-primary-foreground after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-cta" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contato" className="hidden rounded-md bg-cta px-5 py-2.5 text-sm font-bold tracking-wide text-primary-foreground transition-colors hover:bg-cta-hover sm:inline-flex">
            QUERO AJUDAR
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label="Abrir menu" className="rounded-md p-2 hover:bg-navy-2 lg:hidden"><Menu className="h-6 w-6" /></SheetTrigger>
            <SheetContent side="right" className="border-navy-2 bg-navy text-primary-foreground">
              <SheetTitle className="text-primary-foreground"><Logo /></SheetTitle>
              <nav aria-label="Menu móvel" className="mt-8 flex flex-col">
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }}
                    className="border-b border-navy-2 py-4 text-lg font-medium hover:text-cta"
                    activeProps={{ className: "text-cta" }}>{n.label}</Link>
                ))}
              </nav>
              <Link to="/contato" onClick={() => setOpen(false)} className="mt-8 block rounded-md bg-cta py-3 text-center font-bold hover:bg-cta-hover">QUERO AJUDAR</Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
