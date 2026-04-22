import { NextResponse } from "next/server";
import { getPlayersWithCache } from "@/lib/googleSheets";

// Revalidate every 5 minutes on the server side.
export const revalidate = 300;

export async function GET() {
  try {
    const players = await getPlayersWithCache();
    return NextResponse.json({
      success: true,
      count: players.length,
      data: players,
    });
  } catch (error) {
    console.error("[api/players] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
