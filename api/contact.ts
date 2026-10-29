/**
 * Rota Serverless segura da Vercel (/api/contact) para envio de mensagens institucionais da ONG CES-MT.
 *
 * Regras de segurança aplicadas:
 * - Credenciais lidas exclusivamente de variáveis privadas de servidor (process.env.RESEND_API_KEY, etc.).
 * - Nenhum segredo utiliza prefixo VITE_ ou NEXT_PUBLIC_.
 * - O destinatário institucional é fixo no servidor (ongcesmt@gmail.com ou CONTACT_RECIPIENT_EMAIL),
 *   impedindo que visitantes escolham arbitrariamente o destinatário.
 * - O e-mail informado pelo visitante é utilizado apenas no cabeçalho Reply-To.
 * - Validação rigorosa de campos obrigatórios, formato de e-mail, honeypot anti-spam e limite de requisições por IP.
 * - Confirmação (HTTP 200) retornada SOMENTE quando o provedor confirma o recebimento da mensagem.
 */

export interface ContactRequestBody {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  website?: string; // Campo honeypot anti-spam (deve vir vazio)
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, RateLimitEntry>();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);
  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  existing.count += 1;
  return true;
}

export async function processContactSubmission(
  body: ContactRequestBody,
  clientIp: string,
  env: Record<string, string | undefined>
): Promise<{ status: number; payload: Record<string, unknown> }> {
  if (body.website && body.website.trim().length > 0) {
    return {
      status: 400,
      payload: {
        ok: false,
        code: "SPAM_DETECTED",
        message: "Envio bloqueado pela verificação de segurança.",
      },
    };
  }

  if (!checkRateLimit(clientIp)) {
    return {
      status: 429,
      payload: {
        ok: false,
        code: "RATE_LIMIT_EXCEEDED",
        message: "Muitas tentativas de envio em sequência. Aguarde alguns minutos e tente novamente.",
      },
    };
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  const fieldErrors: Record<string, string> = {};

  if (name.length < 2 || name.length > 100) {
    fieldErrors.name = "Informe seu nome completo (entre 2 e 100 caracteres).";
  }
  if (!email || !EMAIL_REGEX.test(email) || email.length > 255) {
    fieldErrors.email = "Informe um endereço de e-mail válido.";
  }
  if (phone && (phone.length < 8 || phone.length > 25)) {
    fieldErrors.phone = "Informe um telefone ou WhatsApp válido com DDD.";
  }
  if (subject.length < 3 || subject.length > 140) {
    fieldErrors.subject = "Informe o assunto da mensagem (mínimo de 3 caracteres).";
  }
  if (message.length < 10 || message.length > 2000) {
    fieldErrors.message = "A mensagem deve conter entre 10 e 2000 caracteres.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 422,
      payload: {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Verifique os campos destacados e tente novamente.",
        errors: fieldErrors,
      },
    };
  }

  const recipientEmail = (env.CONTACT_RECIPIENT_EMAIL || "ongcesmt@gmail.com").trim();
  const resendApiKey = (env.RESEND_API_KEY || "").trim();
  const fromEmail = (
    env.CONTACT_FROM_EMAIL || "Site Institucional CES-MT <onboarding@resend.dev>"
  ).trim();

  if (!resendApiKey) {
    return {
      status: 503,
      payload: {
        ok: false,
        code: "EMAIL_PROVIDER_NOT_CONFIGURED",
        message:
          "O servidor de e-mail aguarda a configuração da chave privada RESEND_API_KEY nas variáveis de ambiente da Vercel. Enquanto isso, utilize o botão de WhatsApp ou seu aplicativo de e-mail.",
      },
    };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Não informado");
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #172554; color: #ffffff; padding: 20px 24px;">
        <p style="margin: 0; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: #f87171;">ONG CES-MT — Cristo é o Salvador</p>
        <h2 style="margin: 6px 0 0; font-size: 20px;">Nova Mensagem pelo Site Institucional</h2>
      </div>
      <div style="padding: 24px; background-color: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #475569;">Nome:</td>
            <td style="padding: 8px 0;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">E-mail (Responder a):</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Telefone / WhatsApp:</td>
            <td style="padding: 8px 0;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Assunto:</td>
            <td style="padding: 8px 0;">${safeSubject}</td>
          </tr>
        </table>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="font-weight: bold; font-size: 14px; color: #475569; margin-bottom: 8px;">Mensagem:</p>
        <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6;">
          ${safeMessage}
        </div>
      </div>
      <div style="background-color: #f1f5f9; padding: 12px 24px; font-size: 12px; color: #64748b;">
        Enviado através do formulário oficial de contato da ONG CES-MT (CNPJ 30.948.606/0001-14).
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: email,
        subject: `[Contato Site CES-MT] ${subject} — ${name}`,
        html: htmlBody,
        text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone || "Não informado"}\nAssunto: ${subject}\n\nMensagem:\n${message}`,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;

    if (!response.ok) {
      return {
        status: 502,
        payload: {
          ok: false,
          code: "PROVIDER_ERROR",
          message:
            "Não foi possível confirmar a entrega pelo provedor de e-mail neste momento. Por favor, tente novamente ou utilize nosso WhatsApp oficial.",
          details: data.message || response.statusText,
        },
      };
    }

    return {
      status: 200,
      payload: {
        ok: true,
        id: data.id,
        recipient: recipientEmail,
        message: "Mensagem recebida e encaminhada com sucesso ao e-mail institucional da CES-MT.",
      },
    };
  } catch {
    return {
      status: 500,
      payload: {
        ok: false,
        code: "INTERNAL_ERROR",
        message: "Falha de comunicação ao processar o envio do e-mail no servidor.",
      },
    };
  }
}

export default async function handler(
  req: {
    method?: string;
    headers?: Record<string, string | string[] | undefined>;
    body?: ContactRequestBody | string;
  },
  res: {
    status: (code: number) => { json: (data: Record<string, unknown>) => void };
    setHeader?: (name: string, value: string) => void;
  }
) {
  if (req.method !== "POST") {
    res.setHeader?.("Allow", "POST");
    return res.status(405).json({
      ok: false,
      code: "METHOD_NOT_ALLOWED",
      message: "Método não permitido. Utilize POST.",
    });
  }

  let parsedBody: ContactRequestBody = {};
  if (typeof req.body === "string") {
    try {
      parsedBody = JSON.parse(req.body) as ContactRequestBody;
    } catch {
      return res.status(400).json({
        ok: false,
        code: "INVALID_JSON",
        message: "Formato de requisição inválido.",
      });
    }
  } else if (req.body && typeof req.body === "object") {
    parsedBody = req.body;
  }

  const forwarded = req.headers?.["x-forwarded-for"];
  const clientIp = Array.isArray(forwarded)
    ? forwarded[0]
    : typeof forwarded === "string"
    ? forwarded.split(",")[0].trim()
    : "127.0.0.1";

  const env = (typeof process !== "undefined" ? process.env : {}) as Record<
    string,
    string | undefined
  >;

  const result = await processContactSubmission(parsedBody, clientIp, env);
  return res.status(result.status).json(result.payload);
}
