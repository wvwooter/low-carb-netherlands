import "server-only";

// Dunne wrapper rond Resend (transactionele e-mail). RESEND_API_KEY wordt
// UITSLUITEND hier gelezen — dit bestand heeft de "server-only"-guard
// hierboven, die de build laat falen als het ooit per ongeluk in een
// client-bundel terecht zou komen. De sleutel verlaat de server dus nooit.
//
// Werkt bewust ook zonder RESEND_API_KEY / NOTIFICATION_EMAIL: als die
// ontbreken, wordt er duidelijk (maar zonder privacygevoelige details)
// naar de servelogs gelogd en gaat de rest van de aanvraag/aanmelding
// gewoon door. Een mislukte of niet-geconfigureerde mail mag nooit een
// aanmelding of contactformulier laten falen.

const DEFAULT_FROM_EMAIL =
  "Low Carb Netherlands <notificaties@mail.lowcarbnetherlands.com>";

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface SendEmailResult {
  skipped: boolean;
  error: boolean;
}

async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;

  if (!apiKey) {
    console.info(
      "[email] RESEND_API_KEY ontbreekt in de environment variables — " +
        "e-mail wordt overgeslagen. Voeg 'm toe in Vercel → Settings → " +
        `Environment Variables om dit te versturen (onderwerp: "${subject}").`
    );
    return { skipped: true, error: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html, text }),
    });

    if (!res.ok) {
      // Log alleen status + Resend's eigen foutcode/melding, geen
      // ontvanger, inhoud of andere persoonsgegevens.
      let detail = `status ${res.status}`;
      try {
        const body = (await res.json()) as { name?: string; message?: string };
        if (body?.name || body?.message) {
          detail += ` — ${body.name ?? "fout"}: ${body.message ?? "onbekend"}`;
        }
      } catch {
        // Resend gaf geen (geldige) JSON-body terug; status is dan alles
        // wat we betrouwbaar kunnen loggen.
      }
      console.error(`[email] Resend-verzending mislukt (${detail})`);
      return { skipped: false, error: true };
    }

    return { skipped: false, error: false };
  } catch (err) {
    // Netwerkfout, timeout, DNS-probleem e.d. — vang dit expliciet af zodat
    // een storing bij Resend nooit de aanroepende server action laat falen.
    const message = err instanceof Error ? err.message : "onbekende fout";
    console.error(`[email] Onverwachte fout bij verzenden via Resend: ${message}`);
    return { skipped: false, error: true };
  }
}

export async function sendApplicationConfirmationEmail(params: {
  to: string;
  voornaam: string;
}) {
  return sendEmail({
    to: params.to,
    subject: "Bevestiging aanmelding — Low Carb Netherlands",
    html: `
      <p>Beste ${escapeHtml(params.voornaam)},</p>
      <p>Bedankt voor je aanmelding als professional bij Low Carb Netherlands.
      We beoordelen je profiel zorgvuldig; dit kan enkele dagen duren. Zodra je
      profiel is goedgekeurd, nemen we contact met je op en wordt het
      zichtbaar in de verwijsgids.</p>
      <p>Met vriendelijke groet,<br />Low Carb Netherlands</p>
    `,
    text: `Beste ${params.voornaam},\n\nBedankt voor je aanmelding als professional bij Low Carb Netherlands. We beoordelen je profiel zorgvuldig; dit kan enkele dagen duren. Zodra je profiel is goedgekeurd, nemen we contact met je op en wordt het zichtbaar in de verwijsgids.\n\nMet vriendelijke groet,\nLow Carb Netherlands`,
  });
}

/**
 * Algemene admin-notificatie, gebruikt door het contactformulier
 * (/contact) voor een korte melding van een nieuw bericht.
 */
export async function sendAdminApplicationNotification(params: {
  naam: string;
  beroep: string;
  email: string;
}) {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) {
    console.info(
      "[email] NOTIFICATION_EMAIL ontbreekt — admin-notificatie overgeslagen."
    );
    return { skipped: true, error: false };
  }

  return sendEmail({
    to,
    subject: `Nieuw bericht: ${params.naam}`,
    html: `
      <p>Nieuw bericht ontvangen.</p>
      <ul>
        <li>Naam: ${escapeHtml(params.naam)}</li>
        <li>Onderwerp: ${escapeHtml(params.beroep)}</li>
        <li>E-mail: ${escapeHtml(params.email)}</li>
      </ul>
    `,
    text: `Nieuw bericht ontvangen.\nNaam: ${params.naam}\nOnderwerp: ${params.beroep}\nE-mail: ${params.email}`,
  });
}

/**
 * Rijke notificatie specifiek voor nieuwe professional-aanmeldingen
 * (/aanmelden), met alle gegevens die de redactie nodig heeft om de
 * aanmelding te kunnen beoordelen zonder eerst te hoeven inloggen.
 */
export async function sendProfessionalApplicationNotification(params: {
  naam: string;
  beroep: string;
  organisatie?: string | null;
  email: string;
  telefoonnummer?: string | null;
  plaats?: string | null;
  aangemeldOp: Date;
  beheerLink?: string | null;
}) {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) {
    console.info(
      "[email] NOTIFICATION_EMAIL ontbreekt in de environment variables — " +
        "notificatie voor nieuwe aanmelding overgeslagen. Voeg 'm toe in " +
        "Vercel → Settings → Environment Variables."
    );
    return { skipped: true, error: false };
  }

  const datumTijd = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Amsterdam",
  }).format(params.aangemeldOp);

  const rows: Array<[string, string]> = [
    ["Naam", params.naam],
    ["Beroep", params.beroep],
    ["Praktijk/organisatie", params.organisatie || "—"],
    ["E-mailadres", params.email],
    ["Telefoonnummer", params.telefoonnummer || "—"],
    ["Vestigingsplaats", params.plaats || "—"],
    ["Datum/tijd aanmelding", `${datumTijd} (Nederlandse tijd)`],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555;white-space:nowrap;">${escapeHtml(
          label
        )}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const linkHtml = params.beheerLink
    ? `<p style="margin-top:20px;"><a href="${escapeAttr(
        params.beheerLink
      )}" style="background:#1f3d2b;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;display:inline-block;">Bekijk aanmelding in het beheerpaneel →</a></p>`
    : "";
  const linkText = params.beheerLink
    ? `\nBeoordeel deze aanmelding: ${params.beheerLink}`
    : "";

  return sendEmail({
    to,
    subject: `Nieuwe aanmelding: ${params.naam} (${params.beroep})`,
    html: `
      <div style="font-family:sans-serif;color:#1a1a1a;max-width:520px;">
        <h2 style="color:#1f3d2b;">Nieuwe professional-aanmelding</h2>
        <p>Er heeft zich zojuist een nieuwe professional aangemeld voor de
        verwijsgids van Low Carb Netherlands. Onderstaande gegevens zijn
        door de aanvrager zelf opgegeven en nog niet geverifieerd.</p>
        <table style="border-collapse:collapse;margin-top:12px;">${htmlRows}</table>
        ${linkHtml}
        <p style="margin-top:24px;color:#777;font-size:13px;">
          Deze aanmelding wordt pas zichtbaar in de openbare gids nadat je
          'm in het beheerpaneel hebt goedgekeurd.
        </p>
      </div>
    `,
    text: `Nieuwe professional-aanmelding\n\n${textRows}\n${linkText}\n\nDeze aanmelding wordt pas zichtbaar in de openbare gids nadat je 'm in het beheerpaneel hebt goedgekeurd.`,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value);
}
