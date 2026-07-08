import Link from "next/link";
import { ShieldCheck } from "@/components/icons";

/**
 * Own-brand certification badge — no hotlinked NCAA logo (trademark use
 * requires written consent). Links to our eligibility guide.
 */
export default function NcaaBadge() {
  return (
    <Link
      href="/ncaa-eligibility"
      title="NCAA Certified Event — eligibility guide"
      className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 transition hover:border-brand-cyan/50 hover:bg-white/15"
    >
      <ShieldCheck className="h-4 w-4 shrink-0 text-brand-cyan" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/80 transition group-hover:text-white">
        NCAA Certified Event
      </span>
    </Link>
  );
}
