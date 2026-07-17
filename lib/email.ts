import "server-only";

// Dunne wrapper rond Resend. Werkt zonder RESEND_API_KEY (logt dan alleen
// naar console), zodat lokale ontwikkeling niet vastloopt zonder sleutel.

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@lowcarbnetherlands.nl";

  if (!apiKey) {
    console.info(`[email:skipped — geen RESEND_API_KEY] naar=${to} onderwerp="${subject}"`);
    return { skipped: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    console.error("Resend-fout:", await res.text());
    return { skipped: false, error: true };
  }

  return { skipped: false, error: false };
}

export async function sendApplicationConfirmationEmail(params: {
  to: string;
  voornaam: string;
}) {
  return sendEmail({
    to: params.to,
    subject: "Bevestiging aanmelding — Low Carb Netherlands",
    html: `
      <p>Beste ${params.voornaam},</p>
      <p>Bedankt voor je aanmelding als professional bij Low Carb Netherlands.
      We beoordelen je profiel zorgvuldig; dit kan enkele dagen duren. Zodra je
      profiel is goedgekeurd, nemen we contact met je op en wordt het
      zichtbaar in de verwijsgids.</p>
      <p>Met vriendelijke groet,<br />Low Carb Netherlands</p>
    `,
  });
}

export async function sendAdminApplicationNotification(params: {
  naam: string;
  beroep: string;
  email: string;
}) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!adminEmail) {
    console.info("[email:skipped — geen ADMIN_NOTIFICATION_EMAIL]");
    return { skipped: true };
  }

  return sendEmail({
    to: adminEmail,
    subject: `Nieuwe aanmelding: ${params.naam}`,
    html: `
      <p>Nieuwe professional-aanmelding ontvangen.</p>
      <ul>
        <li>Naam: ${params.naam}</li>
        <li>Beroep: ${params.beroep}</li>
        <li>E-mail: ${params.email}</li>
      </ul>
      <p>Beoordeel deze aanmelding in het beheerpaneel.</p>
    `,
  });
}
