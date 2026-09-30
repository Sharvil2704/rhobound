"use client";

import { useEffect, useLayoutEffect } from "react";

type W = Window & { __rbIntroAt?: number; __rbEntry?: string };
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Suppresses the intro when the homepage is reached by in-site navigation. Skipping
// on input is handled by the inline head script, so it works before hydration.
export default function IntroControl() {
  useIsoLayoutEffect(() => {
    const d = document.documentElement;
    const w = window as W;
    // Play only when the homepage itself was loaded. Arriving from another page of the
    // site, or a mount long after the first one, is an in-site return.
    const returning = w.__rbIntroAt !== undefined && performance.now() - w.__rbIntroAt > 1000;
    if (w.__rbEntry !== "/" || returning) {
      d.dataset.nointro = "1";
      return;
    }
    w.__rbIntroAt ??= performance.now();
  }, []);
  return null;
}
