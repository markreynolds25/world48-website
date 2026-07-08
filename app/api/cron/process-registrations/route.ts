import { NextResponse } from "next/server";
import {
  getRegistrationRows,
  markRegistrationEmailSent,
  type RegistrationTab,
} from "@/lib/googleSheets";
import {
  sendEmail,
  coachApprovedEmail,
  playerApprovedEmail,
  declinedEmail,
} from "@/lib/emails";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_SENDS_PER_RUN = 50;

/**
 * Daily job: for every approved/rejected registration row without an
 * EmailSentAt stamp, send the decision email and stamp the row.
 *
 * Rows only get stamped after a SUCCESSFUL send — so while RESEND_API_KEY
 * is missing, decisions simply queue in the sheet and go out on the first
 * run after the key is added. Nothing is lost.
 *
 * Auth: requires `Authorization: Bearer CRON_SECRET` when CRON_SECRET is
 * set. Until it's set, only Vercel's own cron invocations are accepted
 * (interim — add CRON_SECRET in Vercel for proper protection).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (secret) {
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else {
    const ua = request.headers.get("user-agent") || "";
    if (!ua.startsWith("vercel-cron/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.warn("[cron/process-registrations] CRON_SECRET not set — accepting Vercel cron by user-agent only.");
  }

  const summary = { checked: 0, sent: 0, failed: 0, details: [] as string[] };
  const tabs: RegistrationTab[] = ["CoachRegistrations", "PlayerRegistrations"];

  for (const tab of tabs) {
    const rows = await getRegistrationRows(tab);
    for (const row of rows) {
      const status = row.status.trim().toLowerCase();
      const actionable =
        (status === "approved" || status === "rejected") && !row.emailSentAt;
      if (!actionable) continue;
      if (summary.sent + summary.failed >= MAX_SENDS_PER_RUN) break;

      summary.checked++;
      const firstName = row.name.split(" ")[0] || "there";
      const template =
        status === "rejected"
          ? declinedEmail(firstName)
          : tab === "CoachRegistrations"
            ? coachApprovedEmail(firstName)
            : playerApprovedEmail(firstName);

      const result = await sendEmail({
        to: row.email,
        cc: row.ccEmail,
        subject: template.subject,
        html: template.html,
      });

      if (result.ok) {
        await markRegistrationEmailSent(tab, row.rowNumber);
        summary.sent++;
        summary.details.push(`${tab} row ${row.rowNumber}: ${status} email sent`);
      } else {
        summary.failed++;
        summary.details.push(
          `${tab} row ${row.rowNumber}: NOT SENT (${result.error}) — will retry next run`
        );
      }
    }
  }

  console.log("[cron/process-registrations]", JSON.stringify(summary));
  return NextResponse.json(summary);
}
