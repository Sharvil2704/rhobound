// Fill these in before launch. Empty values hide the matching links and buttons.
export const site = {
  name: "Rhobound",
  url: "https://rhobound.com",
  contactEmail: "sam@rhobound.com",
  bookCallUrl: "", // e.g. a Cal.com or Calendly link
  githubUrl: "", // only once the repository is public
  demoVideoUrl: "",
};

export const primaryCta = site.bookCallUrl
  ? { href: site.bookCallUrl, label: "Become a design partner" }
  : {
      href: `mailto:${site.contactEmail}?subject=${encodeURIComponent("Rhobound design partner")}`,
      label: "Become a design partner",
    };
