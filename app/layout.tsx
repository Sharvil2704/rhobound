import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { site } from "@/site.config";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display", display: "swap" });
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const description =
  "Rhobound predicts how a security patch to a shared container image or library changes latency across your microservices, before rollout: which services slow down, which SLOs break, and how much headroom you lose.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Rhobound: know what a security patch costs your latency before you ship it",
  description,
  openGraph: {
    title: "Rhobound",
    description: "Patch fast. Know the performance cost before rollout.",
    type: "website",
    url: site.url,
  },
  twitter: { card: "summary", title: "Rhobound", description: "Patch fast. Know the performance cost before rollout." },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E6EAEE" },
    { media: "(prefers-color-scheme: dark)", color: "#0C1217" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
