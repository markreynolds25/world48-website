import { NextResponse } from "next/server";
import {
  getEmailSchedule,
  getApprovedRecipients,
  markReminderSent,
} from "@/lib/googleSheets";
import { sendEmail, reminderEmail } from "@/lib/emails";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_EMAILS_PER_RUN = 100;

function dueToday(sendOn: string): boolean {
  if (!sendOn) return false;
  const d = new Date(sendOn);
  if (isNaN(d.getTime())) return false;
  d.setUTCHours(0, 0, 0, 0);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return d.getTime() <= today.getTime();
}

/**
 * Daily reminder sender. Reads the Emailschedule tab; for each campaign that is
 * due (SendOn <= today) and not yet stamped, emails every approved recipient in
 * its audience, then stamps SentAt.
 *
 * Resend-optional: a campaign is only stamped when every recipient sent
 * successfully. With no RESEND_API_KEY, sends fail, the row stays unstamped,
 * and the campaign goes out on the first run after the key is added. No
 * duplicates, nothing lost.
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
    console.warn("[cron/send-reminders] CRON_SECRET not set — accepting Vercel cron by user-agent only.");
  }

  const schedule = await getEmailSchedule();
  const summary = { campaigns: 0, sent: 0, failed: 0, details: [] as string[] };
  let budget = MAX_EMAILS_PER_RUN;

  for (const camp of schedule) {
    if (camp.sentAt) continue;
    if (!dueToday(camp.sendOn)) continue;
    if (budget <= 0) break;

    const recipients = await getApprovedRecipients(camp.audience);
    if (recipients.length === 0) {
      summary.details.push(`${camp.key}: no approved ${camp.audience} recipients yet — will retry`);
      continue;
    }

    summary.campaigns++;
    let campSent = 0;
    let campFailed = 0;

    for (const r of recipients) {
      if (budget <= 0) break;
      const html = reminderEmail({
        firstName: r.name.split(" ")[0] || "there",
        heading: camp.heading,
        body: camp.body,
        buttonLabel: camp.buttonLabel,
        buttonUrl: camp.buttonUrl,
        paymentLink: camp.paymentLink,
      });
      const res = await sendEmail({
        to: r.email,
        cc: r.ccEmail,
        subject: camp.subject,
        html,
      });
      budget--;
      if (res.ok) {
        campSent++;
        summary.sent++;
      } else {
        campFailed++;
        summary.failed++;
      }
    }

    // Only stamp when the whole audience got it, so a partial/failed run retries.
    if (campFailed === 0 && campSent > 0 && budget >= 0) {
      await markReminderSent(camp.rowNumber, `sent ${campSent}`);
    }
    summary.details.push(`${camp.key}: sent ${campSent}, failed ${campFailed}`);
  }

  console.log("[cron/send-reminders]", JSON.stringify(summary));
  return NextResponse.json(summary);
}
