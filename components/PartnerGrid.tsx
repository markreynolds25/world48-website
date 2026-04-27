"use client";

const PARTNERS = [
  {
    name: "SDCC",
    description: "Sport Development Club Cork",
    url: "https://sdcc.ie/en/",
    logo: "https://logo.clearbit.com/sdcc.ie",
  },
  {
    name: "Resync Physiotherapy",
    description: "Elite sports physiotherapy & rehabilitation",
    url: "https://resyncphysiotherapy.ie/",
    logo: "https://logo.clearbit.com/resyncphysiotherapy.ie",
  },
  {
    name: "People Playbook",
    description: "Leadership & performance consulting",
    url: "https://www.peopleplaybook.com/",
    logo: "https://logo.clearbit.com/peopleplaybook.com",
  },
  {
    name: "Weave Agency",
    description: "The leading international recruiting agency in US college basketball",
    url: "https://weave.agency/",
    logo: "https://logo.clearbit.com/weave.agency",
  },
  {
    name: "Get Recruited Hoops",
    description: "Connecting international players with US college programs",
    url: "https://getrecruitedhoops.com/",
    logo: "https://logo.clearbit.com/getrecruitedhoops.com",
  },
];

export default function PartnerGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PARTNERS.map((partner) => (
        <a
          key={partner.name}
          href={partner.url}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col gap-4 rounded-xl border border-surface-3/70 bg-surface-1 p-6 transition hover:border-white/20 hover:bg-surface-2"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-surface-3/60 bg-surface-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-8 max-w-[2.5rem] object-contain opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div>
            <div className="font-semibold text-white transition group-hover:text-brand-cyan">
              {partner.name}
            </div>
            <p className="mt-1 text-sm text-white/55">{partner.description}</p>
          </div>
          <div className="mt-auto flex items-center gap-1 text-xs font-medium text-white/40 transition group-hover:text-brand-cyan">
            Visit site
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
              <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
            </svg>
          </div>
        </a>
      ))}
    </div>
  );
}
