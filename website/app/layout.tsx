import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://aarr-bench.ai"),
  title: {
    default: "AARR-bench — Act As a Real Researcher",
    template: "%s — AARR-bench",
  },
  description:
    "A benchmark series evaluating how well LLM agents close the gap with human researchers across the full research lifecycle.",
  keywords: [
    "AARR",
    "AARRI",
    "benchmark",
    "LLM agents",
    "research",
    "evaluation",
    "Harbor",
  ],
  openGraph: {
    title: "AARR-bench — Act As a Real Researcher",
    description:
      "A benchmark series evaluating how well LLM agents close the gap with human researchers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
