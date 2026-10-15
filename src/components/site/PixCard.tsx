import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { generatePixPayload } from "@/lib/pix";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PixCard({ label, pixKey }: { label: string; pixKey: string }) {
  const placeholder = pixKey.startsWith("[");
  const cleanDigits = pixKey.replace(/\D/g, "");
  const displayKey =
    cleanDigits.length === 14
      ? cleanDigits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
      : cleanDigits.length === 11
      ? cleanDigits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
      : pixKey;

  const pixPayload = placeholder
    ? ""
    : generatePixPayload({ key: pixKey, name: "CESMT ONG", city: "VARZEA GRANDE" });

  const copyKey = async () => {
    if (placeholder) {
      toast.info("Chave PIX ainda não cadastrada.");
      return;
    }
    try {
      await navigator.clipboard.writeText(pixKey);
      toast.success("Chave PIX copiada com sucesso!");
    } catch {
      toast.error("Não foi possível copiar automaticamente. Copie manualmente.");
    }
  };

  const copyPayload = async () => {
    if (!pixPayload) return;
    try {
      await navigator.clipboard.writeText(pixPayload);
      toast.success("Código PIX Copia e Cola copiado com sucesso!");
    } catch {
      toast.error("Não foi possível copiar o código Copia e Cola.");
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-6 shadow-xs sm:flex-row sm:items-center">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group relative grid h-32 w-32 shrink-0 place-items-center rounded-lg border border-border bg-white p-2 shadow-xs transition-transform hover:scale-105 cursor-pointer"
            title="Clique para ampliar o QR Code"
          >
            {placeholder || !pixPayload ? (
              <QrCode className="h-12 w-12 text-cta" />
            ) : (
              <QRCodeSVG
                value={pixPayload}
                size={110}
                level="M"
                aria-label={`QR Code PIX para ${label}`}
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-navy/80 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
              Ampliar QR Code
            </span>
          </button>
        </DialogTrigger>

        {!placeholder && pixPayload && (
          <DialogContent className="sm:max-w-md text-center">
            <DialogHeader>
              <DialogTitle className="text-center text-lg font-bold text-navy">
                QR Code PIX — {label}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="rounded-xl border border-border bg-white p-4 shadow-md">
                <QRCodeSVG value={pixPayload} size={220} level="Q" />
              </div>
              <p className="text-sm text-foreground/80 max-w-xs">
                Abra o app do seu banco, escolha a opção <strong>PIX QR Code</strong> e aponte a câmera.
              </p>
              <button
                type="button"
                onClick={copyPayload}
                className="inline-flex items-center gap-2 rounded-md bg-cta px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-cta-hover cursor-pointer"
              >
                <Copy className="h-4 w-4" /> Copiar PIX Copia e Cola
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-widest text-cta">{label}</p>
        <p className="mt-2 break-all font-mono text-lg font-semibold text-navy">{displayKey}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyKey}
            className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-navy-2 cursor-pointer"
          >
            <Copy className="h-4 w-4 text-cta" /> Copiar chave PIX
          </button>
          {!placeholder && pixPayload && (
            <button
              type="button"
              onClick={copyPayload}
              className="inline-flex items-center gap-2 rounded-md border border-navy/20 bg-surface px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-surface/80 cursor-pointer"
            >
              <Copy className="h-4 w-4 text-cta" /> Copia e Cola
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

