import { NextResponse } from "next/server";
import { addWaitlist } from "@/lib/googleSheets";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role } = body as {
      name?: string;
      email?: string;
      role?: string;
    };

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(String(email))) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const result = await addWaitlist({
      name: String(name).trim(),
      email: String(email).trim(),
      role: String(role).trim(),
    });

    if (!result.ok) {
      console.error("[api/waitlist] Sheet write failed:", result.error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/waitlist]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
