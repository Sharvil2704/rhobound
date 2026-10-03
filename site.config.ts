// Fill these in before launch. Empty values hide the matching links, sections and lines.
export const site = {
  name: "Rhobound",
  url: "https://www.rhobound.com",
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
  bio: string; // two or three plain sentences
  href?: string; // LinkedIn or personal site
};

// Add people here and a Team section appears. Leave empty to hide it.
export const team: TeamMember[] = [
  {
    name: "Sharvil Bhatt",
    role: "Founder",
    bio: "Researches software supply chain security, secure systems architecture, and the trade-off between security and performance in real systems. First author in IEEE Open Journal of Vehicular Technology, reviewer for IEEE Transactions on Vehicular Technology, and speaker at KubeCon India and OpenSSF Korea.",
    href: "https://www.linkedin.com/in/sharvil-bhatt/",
  },
];

export const primaryCta = site.bookCallUrl
  ? { href: site.bookCallUrl, label: "Become a design partner" }
  : {
      href: `mailto:${site.contactEmail}?subject=${encodeURIComponent("Rhobound design partner")}`,
      label: "Become a design partner",
    };
