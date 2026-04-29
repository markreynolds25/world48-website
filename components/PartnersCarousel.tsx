"use client";

const PARTNERS = [
  {
    name: "SDCC",
    url: "https://www.sdcc.ie/en/",
    logo: "https://www.sdcc.ie/en/files/images/sdcc-logo-2025.png",
    abbr: "SDCC",
  },
  {
    name: "Resync Physiotherapy",
    url: "https://resyncphysiotherapy.ie/",
    logo: "https://resyncphysiotherapy.ie/wp-content/uploads/2023/09/ReSync-Physiotherapy-Logo.webp",
    abbr: "Resync",
  },
  {
    name: "People Playbook",
    url: "https://www.peopleplaybook.com/",
    logo: "/partners/people-playbook.svg",
    abbr: "People Playbook",
  },
  {
    name: "Weave Agency",
    url: "https://weave.agency/",
    logo: "/partners/Weave.jpg",
    abbr: "Weave",
  },
  {
    name: "Get Recruited Hoops",
    url: "https://getrecruitedhoops.com/",
    logo: "/partners/get-recruited.png",
    abbr: "Get Recruited",
  },
  {
    name: "Draft Express",
    url: "https://www.draftexpress.com/about-us",
    logo: "/partners/DX.jpg",
    abbr: "DraftExpress",
  },
  {
    name: "Sportradar",
    url: "https://sportradar.com/",
    logo: "/partners/SR.png",
    abbr: "Sportradar",
  },
  {
    name: "Juco Advocate",
    url: "https://www.instagram.com/juco_advocate/",
    logo: "/partners/JA.jpg",
    abbr: "Juco Advocate",
  },
  {
    name: "The Catering Company",
    url: "https://www.thecateringcompany.ie/",
    logo: "https://www.thecateringcompany.ie/uploads/logo-1644585227-2826.svg",
    abbr: "Catering Co.",
  },
];

function PartnerLogo({ partner }: { partner: typeof PARTNERS[number] }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      title={partner.name}
      className="group mx-6 flex shrink-0 items-center justify-center"
    >
      <div className="flex h-14 w-44 items-center justify-center rounded-lg border border-black/8 bg-gray-100 px-4 shadow-sm transition duration-200 group-hover:shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={partner.logo}
          alt={partner.name}
          className="h-9 w-auto max-w-[9rem] object-contain transition duration-200"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="text-xs font-semibold uppercase tracking-wider text-white/60">${partner.abbr}</span>`;
            }
          }}
        />
      </div>
    </a>
  );
}

export default function PartnersCarousel() {
  return (
    <div className="overflow-hidden">
      <div className="flex animate-marquee items-center will-change-transform">
        {[...PARTNERS, ...PARTNERS].map((partner, i) => (
          <PartnerLogo key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}
