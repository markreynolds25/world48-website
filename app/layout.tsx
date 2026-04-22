import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "World 48 — Undiscovered Basketball Showcase",
  description:
    "A curated roster of elite international basketball prospects. Built for NCAA Division I coaches.",
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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-surface-0 text-white antialiased flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
