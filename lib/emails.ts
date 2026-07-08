const RESEND_URL = 'https://api.resend.com/emails';
const SITE = 'https://www.undiscoveredworld48.com';

function fromAddress(): string {
  return process.env.EMAIL_FROM || 'World 48 <onboarding@resend.dev>';
}

/**
 * Send one email via Resend. Returns ok:false (never throws) when
 * RESEND_API_KEY is missing, so callers can queue and retry later.
 */
export async function sendEmail(opts: {
  to: string;
  cc?: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY not set' };
  }
  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: [opts.to],
        ...(opts.cc ? { cc: [opts.cc] } : {}),
        ...(process.env.EMAIL_REPLY_TO ? { reply_to: process.env.EMAIL_REPLY_TO } : {}),
        subject: opts.subject,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('[emails] Resend error:', err);
      return { ok: false, error: err };
    }
    return { ok: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[emails] Send failed:', error);
    return { ok: false, error: msg };
  }
}

/** Shared shell: light background (dark emails render badly in many clients),
 *  W48 red accent, logo, footer. */
function emailShell(bodyHtml: string): string {
  return `
  <div style="background:#f4f5f7;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:#0A0C10;padding:20px 32px">
        <img src="${SITE}/logos/world48-lockup-dark.png" alt="World 48" height="36" style="display:block;height:36px;width:auto"/>
      </div>
      <div style="padding:32px;color:#1f2430;font-size:15px;line-height:1.6">
        ${bodyHtml}
      </div>
      <div style="padding:20px 32px;border-top:1px solid #e5e7eb;color:#8a8f99;font-size:12px;line-height:1.5">
        Undiscovered World 48 · National Basketball Arena, Dublin, Ireland<br/>
        <a href="${SITE}" style="color:#8a8f99">undiscoveredworld48.com</a> ·
        <a href="${SITE}/privacy" style="color:#8a8f99">Privacy</a>
      </div>
    </div>
  </div>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#E53E3E;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 24px;border-radius:8px;margin:8px 0">${label}</a>`;
}

export function coachApprovedEmail(firstName: string): { subject: string; html: string } {
  return {
    subject: "You're confirmed — World 48 2027 coach list",
    html: emailShell(`
      <h1 style="margin:0 0 12px;font-size:22px;color:#0A0C10">You're confirmed, ${firstName}.</h1>
      <p>Your coach registration for <strong>World 48 2027</strong> has been approved. You're on the list that hears everything first — dates, the 2027 roster, film and evaluation-day logistics.</p>
      <p>If you registered for in-person attendance, payment details for the $350 registration fee will follow in a separate email.</p>
      <p>In the meantime, the full player roster with film is live on the site:</p>
      ${button(`${SITE}/players`, 'View the roster')}
      <p style="margin-top:16px">Questions about travel, schedule or specific prospects — just reply to this email.</p>
      <p style="margin-top:16px">— The World 48 team</p>
    `),
  };
}

export function playerApprovedEmail(firstName: string): { subject: string; html: string } {
  return {
    subject: 'Your World 48 2027 application is approved',
    html: emailShell(`
      <h1 style="margin:0 0 12px;font-size:22px;color:#0A0C10">${firstName}, you're on the radar.</h1>
      <p>Your application for <strong>World 48 2027</strong> has been approved. Next steps:</p>
      <ol style="padding-left:20px">
        <li style="margin-bottom:8px"><strong>NCAA eligibility</strong> — start (or renew) your Basketball Certification System registration now. It's mandatory and takes 15–20 minutes:</li>
      </ol>
      ${button(`${SITE}/ncaa-eligibility`, 'NCAA eligibility — 3 steps')}
      <ol start="2" style="padding-left:20px;margin-top:12px">
        <li style="margin-bottom:8px"><strong>Film</strong> — keep your highlight link current; coaches check it before the event.</li>
        <li><strong>Logistics</strong> — we'll follow up with event dates, travel and accommodation details as they're confirmed.</li>
      </ol>
      <p style="margin-top:16px">Questions — reply to this email.</p>
      <p style="margin-top:16px">— The World 48 team</p>
    `),
  };
}

export function declinedEmail(firstName: string): { subject: string; html: string } {
  return {
    subject: 'Your World 48 2027 application',
    html: emailShell(`
      <h1 style="margin:0 0 12px;font-size:22px;color:#0A0C10">Thank you, ${firstName}.</h1>
      <p>Thank you for applying to <strong>World 48 2027</strong>. Demand for the 48 spots is intense, and we're not able to offer you a place this cycle.</p>
      <p>Selections continue as the event approaches and rosters can change — we'll keep your application on file and contact you if a spot opens. You can also join the public list for dates and news:</p>
      ${button(SITE, 'undiscoveredworld48.com')}
      <p style="margin-top:16px">— The World 48 team</p>
    `),
  };
}
