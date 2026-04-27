import { NextResponse } from "next/server";

const TO_EMAIL = "mark.reynolds25@gmail.com";

export async function POST(request: Request) {
  try {
    const { name, email, message, subject } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── Email sending ────────────────────────────────────────────────────────
    // This route uses Resend (https://resend.com) to send emails.
    // To enable:
    //   1. Sign up at resend.com (free tier: 3,000 emails/month)
    //   2. Add your API key to Vercel env vars as RESEND_API_KEY
    //   3. Verify your domain (or use onboarding@resend.dev for testing)
    //
    // If RESEND_API_KEY is not set, the form will still accept submissions
    // but emails won't be sent — useful for testing the UI.
    // ────────────────────────────────────────────────────────────────────────

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const emailBody = {
        from: "World 48 <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: subject || "New message — World 48",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
            <h2 style="margin:0 0 4px">${subject || "New message — World 48"}</h2>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
            <p style="white-space:pre-wrap">${message}</p>
          </div>
        `,
      };

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailBody),
      });

      if (!resendRes.ok) {
        const err = await resendRes.text();
        console.error("Resend error:", err);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
      }
    } else {
      // No API key — log to console so you can still test in Vercel logs
      console.log("📬 Contact form submission (no email service configured):", {
        name,
        email,
        subject,
        message,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
