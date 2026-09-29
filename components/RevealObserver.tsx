"use client";

import { useEffect } from "react";

// Adds .is-in to each .reveal element once it scrolls into view. Hiding before
// reveal only applies under html[data-js], which the head script sets and removes
// again if this never runs.
export default function RevealObserver() {
  useEffect(() => {
    (window as Window & { __rv?: boolean }).__rv = true;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
