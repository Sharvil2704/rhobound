import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { site, team } from "@/site.config";
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
  "Rhobound is the performance gate for software change. It reads your OpenTelemetry traces, profiles the new version in your cluster, and predicts latency, SLO impact and capacity at every service before rollout.";

const ldJson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      email: site.contactEmail,
      description,
      ...(site.legalName ? { legalName: site.legalName } : {}),
      ...(site.location ? { address: { "@type": "PostalAddress", addressLocality: site.location } } : {}),
      ...(team.length ? { founder: team.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role })) } : {}),
    },
    {
      "@type": "SoftwareApplication",
      name: "Rhobound",
      applicationCategory: "DeveloperApplication",
      description,
      publisher: { "@id": `${site.url}/#org` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Rhobound: the performance gate for software change",
  description,
  openGraph: {
    title: "Rhobound",
    description: "Know what a change costs your latency before it ships.",
    type: "website",
    url: site.url,
  },
  twitter: { card: "summary", title: "Rhobound", description: "Know what a change costs your latency before it ships." },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
