import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-3/60 bg-surface-0">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logos/world48-icon-sm.png"
            alt="World 48"
            width={56}
            height={30}
            className="h-6 w-auto opacity-80"
          />
          <span className="text-sm text-white/60">
            © {year} World 48. Undiscovered international basketball talent.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/sponsors" className="hover:text-white">
            Sponsors
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <a
            href="mailto:mark.reynolds25@gmail.com"
            className="hover:text-white"
          >
            mark.reynolds25@gmail.com
          </a>
          <span className="text-white/30">
            In partnership with{" "}
            <a
              href="https://weave.agency"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 underline-offset-4 hover:text-white hover:underline"
            >
              Weave Agency
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
