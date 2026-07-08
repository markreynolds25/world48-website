import { NextResponse } from "next/server";
import {
  addCoachRegistration,
  addPlayerRegistration,
} from "@/lib/googleSheets";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.type === "coach") {
      const {
        name, title, institution, email, attendance, bioLink,
        accommodation, recruitingFocus, social, days, dietary, irishNight,
      } = body;
      if (!name || !title || !email || !attendance || !accommodation || !days || !dietary) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
      if (!EMAIL_RE.test(String(email))) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
      }
      const result = await addCoachRegistration({
        name: String(name).trim(),
        title: String(title).trim(),
        institution: institution ? String(institution).trim() : undefined,
        email: String(email).trim(),
        attendance: String(attendance).trim(),
        bioLink: bioLink ? String(bioLink).trim() : undefined,
        accommodation: String(accommodation).trim(),
        recruitingFocus: recruitingFocus ? String(recruitingFocus).trim() : undefined,
        social: social ? String(social).trim() : undefined,
        days: String(days).trim(),
        dietary: String(dietary).trim(),
        irishNight: irishNight ? String(irishNight).trim() : undefined,
      });
      if (!result.ok) {
        console.error("[api/register-2027] coach write failed:", result.error);
        return NextResponse.json({ success: false }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    if (body.type === "player") {
      const {
        name, email, whatsapp, dob, gradYear, country, headshotUrl,
        highlightUrl, statsLink, twitter, instagram, agent, days,
        jerseyNumber, jerseySize, parentName, parentEmail,
      } = body;
      if (!name || !email || !dob || !gradYear || !country || !days) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
      if (!EMAIL_RE.test(String(email))) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
      }
      if (parentEmail && !EMAIL_RE.test(String(parentEmail))) {
        return NextResponse.json({ error: "Invalid parent email" }, { status: 400 });
      }
      const result = await addPlayerRegistration({
        name: String(name).trim(),
        email: String(email).trim(),
        whatsapp: whatsapp ? String(whatsapp).trim() : undefined,
        dob: String(dob).trim(),
        gradYear: String(gradYear).trim(),
        country: String(country).trim(),
        headshotUrl: headshotUrl ? String(headshotUrl).trim() : undefined,
        highlightUrl: highlightUrl ? String(highlightUrl).trim() : undefined,
        statsLink: statsLink ? String(statsLink).trim() : undefined,
        twitter: twitter ? String(twitter).trim() : undefined,
        instagram: instagram ? String(instagram).trim() : undefined,
        agent: agent ? String(agent).trim() : undefined,
        days: String(days).trim(),
        jerseyNumber: jerseyNumber ? String(jerseyNumber).trim() : undefined,
        jerseySize: jerseySize ? String(jerseySize).trim() : undefined,
        parentName: parentName ? String(parentName).trim() : undefined,
        parentEmail: parentEmail ? String(parentEmail).trim() : undefined,
      });
      if (!result.ok) {
        console.error("[api/register-2027] player write failed:", result.error);
        return NextResponse.json({ success: false }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown registration type" }, { status: 400 });
  } catch (error) {
    console.error("[api/register-2027]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
