"use client";

const PARTNERS = [
  {
    name: "SDCC",
    description: "South Dublin County Council",
    url: "https://www.sdcc.ie/en/",
    logo: "https://www.sdcc.ie/en/files/images/sdcc-logo-2025.png",
  },
  {
    name: "Resync Physiotherapy",
    description: "Elite sports physiotherapy & rehabilitation",
    url: "https://resyncphysiotherapy.ie/",
    logo: "https://resyncphysiotherapy.ie/wp-content/uploads/2023/09/ReSync-Physiotherapy-Logo.webp",
  },
  {
    name: "People Playbook",
    description: "Leadership & performance consulting",
    url: "https://www.peopleplaybook.com/",
    logo: "/partners/people-playbook.svg",
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
  {
    name: "Draft Express",
    description: "The global authority on basketball prospect evaluation",
    url: "https://www.draftexpress.com/about-us",
    logo: "https://logo.clearbit.com/draftexpress.com",
  },
  {
    name: "Sportradar",
    description: "World-leading sports data and technology company",
    url: "https://sportradar.com/",
    logo: "https://logo.clearbit.com/sportradar.com",
  },
  {
    name: "The Catering Company",
    description: "Award-winning catering & event hospitality",
    url: "https://www.thecateringcompany.ie/",
    logo: "https://www.thecateringcompany.ie/uploads/logo-1644585227-2826.svg",
  },
];

export default function PartnerGrid() {
  return (
    <div>
      {/* Logos grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {PARTNERS.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noreferrer"
            title={partner.name}
            className="group flex h-20 items-center justify-center rounded-xl border border-white/10 bg-white px-4 shadow-sm transition hover:shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-10 max-w-[7rem] object-contain opacity-100 transition"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-xs font-semibold uppercase tracking-wider text-white/60">${partner.name}</span>`;
                }
              }}
            />
          </a>
        ))}
      </div>

      {/* Discrete text links */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {PARTNERS.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-white/35 transition hover:text-white/70"
          >
            {partner.name}
          </a>
        ))}
      </div>
    </div>
  );
}
