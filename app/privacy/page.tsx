import type { Metadata } from "next";
import Link from "next/link";
import Mark from "@/components/Mark";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/site.config";

const UPDATED = "30 September 2026";

export const metadata: Metadata = {
  title: "Privacy policy | Rhobound",
  description: "How rhobound.com handles information. We don’t use cookies, analytics or trackers.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  const mail = <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>;
  return (
    <>
      <header className="top wrap">
        <Link href="/" className="brand" aria-label="Rhobound home">
          <Mark />
          <span>rhobound</span>
        </Link>
        <nav aria-label="Primary">
          <Link href="/">Home</Link>
          <ThemeToggle />
        </nav>
      </header>

      <main id="main" className="legal wrap">
        <h1>Privacy policy</h1>
        <p className="legal-meta">Last updated {UPDATED}</p>

        <p className="lede">
          This website doesn’t collect personal information from you. There are no cookies, no analytics, no advertising
          and no tracking scripts. This page explains the few places information does exist.
        </p>

        <h2>Who we are</h2>
        <p>
          This policy covers {site.url.replace("https://", "")} (“the website”), run by Rhobound (“we”, “us”). Questions
          about this policy go to {mail}.
        </p>

        <h2>What we don’t do</h2>
        <ul>
          <li>We don’t set cookies.</li>
          <li>We don’t run analytics, session recording, advertising or social-media pixels.</li>
          <li>We don’t have accounts, sign-up forms or newsletters on the website.</li>
          <li>We don’t sell or share personal information.</li>
          <li>We don’t load fonts, scripts or images from third-party servers. Everything is served from our own domain.</li>
        </ul>

        <h2>What exists anyway</h2>
        <h3>Hosting logs</h3>
        <p>
          The website is hosted by Vercel. Like any web host, Vercel processes technical data such as your IP address,
          approximate location derived from it, and browser details in order to deliver pages and protect the service.
          We don’t use this data to identify visitors. Vercel handles it under its own{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>
          .
        </p>

        <h3>Your theme choice</h3>
        <p>
          If you switch between light and dark mode, your choice is saved in your browser’s local storage under the key{" "}
          <code>rb-theme</code>. It never leaves your device, and you can clear it in your browser settings at any time.
        </p>

        <h3>If you email us</h3>
        <p>
          If you contact us, for example about becoming a design partner, we receive your email address and whatever you
          include in the message. We use it only to reply and to continue the conversation you started, and we delete it
          on request.
        </p>

        <h3>Links to other websites</h3>
        <p>
          The website links to sources such as research reports and articles. Those sites have their own privacy
          practices, which this policy doesn’t cover. Nothing is sent to them unless you click a link.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, including under the GDPR, UK GDPR and California privacy law, you may have the right
          to ask what personal information we hold about you, and to have it corrected or deleted. Since the website
          collects none, this usually only applies to email you’ve sent us. Write to {mail} and we’ll respond within 30
          days.
        </p>

        <h2>Children</h2>
        <p>The website is meant for professional audiences and isn’t directed at children.</p>

        <h2>Changes</h2>
        <p>
          If we add anything that collects information, such as analytics or a contact form, we’ll update this page first
          and change the date at the top.
        </p>

        <h2>Reporting a security issue</h2>
        <p>
          Email {mail}. Our contact details are also published at{" "}
          <a href="/.well-known/security.txt">/.well-known/security.txt</a>.
        </p>
      </main>

      <footer className="wrap">
        <div className="foot">
          <div className="brand brand-foot">
            <Mark />
            <span>rhobound</span>
          </div>
          <p className="foot-links">
            <Link href="/">Home</Link>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            <span>© {new Date().getFullYear()} Rhobound</span>
          </p>
        </div>
      </footer>
    </>
  );
}
