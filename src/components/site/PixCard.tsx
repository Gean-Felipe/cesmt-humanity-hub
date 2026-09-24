import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";

export function PixCard({ label, pixKey }: { label: string; pixKey: string }) {
  const placeholder = pixKey.startsWith("[");
  const copy = async () => {
    if (placeholder) { toast.info("Chave PIX ainda não cadastrada."); return; }
    try { await navigator.clipboard.writeText(pixKey); toast.success("Chave PIX copiada!"); }
    catch { toast.error("Não foi possível copiar. Copie manualmente."); }
  };
  return (
    <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center">
      <div className="grid h-28 w-28 shrink-0 place-items-center rounded-md border-2 border-dashed border-border bg-surface text-muted-foreground" aria-label="Espaço para QR Code">
        <QrCode className="h-10 w-10" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-widest text-cta">{label}</p>
        <p className="mt-2 break-all font-mono text-base text-foreground">{pixKey}</p>
        <button onClick={copy} className="mt-4 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-navy-2">
          <Copy className="h-4 w-4" /> Copiar chave
        </button>
      </div>
    </div>
  );
}
