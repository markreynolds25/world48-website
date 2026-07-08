import { NextResponse } from "next/server";
import { addContactMessage } from "@/lib/googleSheets";

const TO_EMAIL = "mark.reynolds25@gmail.com";

export async function POST(request: Request) {
  try {
    const { name, email, message, subject } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const finalSubject = subject || "New message — World 48";

    // Every message is written to the Google Sheet first, so nothing is lost
    // even while the email service is unconfigured.
    const sheetResult = await addContactMessage({
      name,
      email,
      subject: finalSubject,
      message,
    });

    // Then also email it if Resend is configured (RESEND_API_KEY in Vercel).
    let emailOk = false;
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const emailBody = {
        from: "World 48 <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: finalSubject,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
            <h2 style="margin:0 0 4px">${finalSubject}</h2>
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
      emailOk = resendRes.ok;
      if (!resendRes.ok) {
        console.error("Resend error:", await resendRes.text());
      }
    }

    if (!sheetResult.ok && !emailOk) {
      console.error("[api/contact] Message NOT delivered:", sheetResult.error);
      return NextResponse.json(
        { error: "Message could not be delivered" },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
