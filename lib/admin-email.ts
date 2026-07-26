import "server-only";

interface ResetEmailInput {
  email: string;
  name: string;
  token: string;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);
}

export function isAdminEmailConfigured() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ADMIN_RESET_FROM_EMAIL;
  const baseUrl = process.env.APP_BASE_URL;

  if (!apiKey || !from || !baseUrl) return false;

  try {
    const parsedBaseUrl = new URL(baseUrl);
    return parsedBaseUrl.protocol === "https:" || (
      process.env.NODE_ENV !== "production"
      && parsedBaseUrl.protocol === "http:"
      && ["localhost", "127.0.0.1"].includes(parsedBaseUrl.hostname)
    );
  } catch {
    return false;
  }
}

export async function sendAdminPasswordResetEmail({ email, name, token }: ResetEmailInput) {
  if (!isAdminEmailConfigured()) return false;

  const baseUrl = new URL(process.env.APP_BASE_URL!);
  const resetUrl = new URL("/admin/reset-password", baseUrl);
  resetUrl.searchParams.set("token", token);
  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(resetUrl.toString());

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ADMIN_RESET_FROM_EMAIL,
        to: [email],
        subject: "Восстановление доступа к PFA CRM",
        html: `
          <div style="font-family:Arial,sans-serif;color:#07111e;line-height:1.6">
            <h1 style="font-size:24px">Восстановление доступа к PFA CRM</h1>
            <p>Здравствуйте, ${safeName}.</p>
            <p>Чтобы установить новый пароль, перейдите по ссылке:</p>
            <p><a href="${safeUrl}">Изменить пароль</a></p>
            <p>Ссылка действует 30 минут и может быть использована один раз.</p>
            <p>Если вы не запрашивали восстановление, просто проигнорируйте это письмо.</p>
          </div>
        `,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    return response.ok;
  } catch {
    return false;
  }
}
