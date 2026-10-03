// Fill these in before launch. Empty values hide the matching links, sections and lines.
export const site = {
  name: "Rhobound",
  url: "https://rhobound.com",
  contactEmail: "sam@rhobound.com",
  bookCallUrl: "", // e.g. a Cal.com or Calendly link
  githubUrl: "", // only once the repository is public
  demoVideoUrl: "",
  legalName: "", // e.g. "Rhobound Inc."
  location: "", // e.g. "San Francisco, CA"
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string; // one or two plain sentences
  href?: string; // LinkedIn or personal site
};

// Add people here and a Team section appears. Leave empty to hide it.
export const team: TeamMember[] = [];

export const primaryCta = site.bookCallUrl
  ? { href: site.bookCallUrl, label: "Become a design partner" }
  : {
      href: `mailto:${site.contactEmail}?subject=${encodeURIComponent("Rhobound design partner")}`,
      label: "Become a design partner",
    };
