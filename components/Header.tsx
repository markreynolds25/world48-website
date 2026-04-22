import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/players", label: "Roster" },
  { href: "/about", label: "About" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-3/60 bg-surface-0/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logos/world48-icon-sm.png"
            alt="World 48"
            width={56}
            height={30}
            priority
            className="h-7 w-auto"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            World <span className="text-gradient-brand">48</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-surface-1 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/players"
          className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-surface-0 transition hover:bg-white/90"
        >
          Browse Players
        </Link>
      </div>
    </header>
  );
}
