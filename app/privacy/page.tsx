import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How World 48 collects, uses and protects personal data for registrations, contact requests and event media.",
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Who we are",
    body: [
      "Undiscovered World 48 (“World 48”, “we”) runs an international basketball showcase in Dublin, Ireland. This policy explains what personal data we collect through this website and how we use it.",
    ],
  },
  {
    heading: "What we collect and why",
    body: [
      "Waitlist signups: your name, email address and role (fan, player, parent or coach), used solely to send you World 48 event updates such as dates, roster news and tickets.",
      "Contact and player-contact requests: your name, email address and message, used to respond to your enquiry and, for coach requests, to facilitate contact regarding a player.",
      "Player profiles: roster players appear with their name, country, stats, photo and highlight film. This is published with consent collected through the event registration and consent process.",
      "Analytics: we use Vercel Analytics, which collects anonymised, aggregated usage data. No advertising cookies, no cross-site tracking.",
    ],
  },
  {
    heading: "Where your data lives",
    body: [
      "Form submissions are stored in a private Google Sheet accessible only to the World 48 organising team, and, where email delivery is configured, sent to the team inbox. We do not sell or share personal data with third parties for marketing.",
    ],
  },
  {
    heading: "Event photography and film",
    body: [
      "Photography and video are captured at World 48 events under the media consent included in event registration. If you appear in event media and want something removed, contact us and we will action it promptly.",
    ],
  },
  {
    heading: "Retention",
    body: [
      "Waitlist and contact data is kept for the current and next event cycle, then deleted. Player profile data is retained while the player remains part of a World 48 roster or alumni results listing.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Under the GDPR you can request access to, correction of, or deletion of your personal data at any time, and you can withdraw consent to communications with a single reply. Contact us through the contact page or on Instagram @undiscoveredworld48 and we will respond within 30 days.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
        Legal
      </p>
      <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
        Privacy policy
      </h1>
      <p className="mt-4 text-sm text-ink-faint">Last updated: July 2026</p>

      <div className="mt-10 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-bold tracking-tight text-white">
              {s.heading}
            </h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 text-[15px] leading-relaxed text-white/65">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
