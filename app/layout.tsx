import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Heavy condensed display face — sports-poster headlines and numerals.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.undiscoveredworld48.com"),
  title: {
    default: "Undiscovered World 48",
    template: "%s · World 48",
  },
  description:
    "48 elite international basketball prospects. One showcase in Dublin. 13 college placements out of the 2026 event — six NCAA Division I.",
  openGraph: {
    title: "Undiscovered World 48",
    description:
      "48 elite international prospects. NCAA coaches courtside in Dublin. 13 college placements out of the 2026 showcase — six NCAA Division I.",
    url: "https://www.undiscoveredworld48.com",
    siteName: "Undiscovered World 48",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Undiscovered World 48",
    description:
      "48 elite international prospects. NCAA coaches courtside in Dublin. 13 college placements out of the 2026 showcase — six NCAA Division I.",
  },
  icons: {
    icon: "/logos/favicon-32.png",
    apple: "/logos/world48-icon-sm.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${anton.variable}`}>
      <body className="min-h-screen bg-surface-0 text-white antialiased flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
