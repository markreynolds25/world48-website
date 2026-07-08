export type EventPhase = "pre" | "live" | "post";

/**
 * Single source of truth for the site lifecycle. Priority:
 *  1. NEXT_PUBLIC_SITE_PHASE (explicit override: "pre" | "live" | "post")
 *  2. Computed from NEXT_PUBLIC_EVENT_START / _END ISO dates
 *  3. Defaults to "pre"
 * All env vars are NEXT_PUBLIC_ so this resolves the same on server and client
 * (no hydration flash). Because it's date-driven, the site flips pre → live →
 * post automatically with no redeploy.
 */
export function getEventPhase(): EventPhase {
  const override = process.env.NEXT_PUBLIC_SITE_PHASE as EventPhase | undefined;
  if (override === "pre" || override === "live" || override === "post") {
    return override;
  }

  const start = process.env.NEXT_PUBLIC_EVENT_START;
  const end = process.env.NEXT_PUBLIC_EVENT_END;
  if (start && end) {
    const now = Date.now();
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (!isNaN(s) && !isNaN(e)) {
      if (now < s) return "pre";
      if (now > e) return "post";
      return "live";
    }
  }

  return "pre";
}

export const PHASE_COPY: Record<
  EventPhase,
  { eyebrow: string; headerCta: string }
> = {
  pre: {
    eyebrow: "2026 delivered · Returning 2027",
    headerCta: "Join 2027 Waitlist",
  },
  live: {
    eyebrow: "Live now · National Basketball Arena",
    headerCta: "Watch Live",
  },
  post: {
    eyebrow: "2027 complete · See the results",
    headerCta: "See Results",
  },
};
