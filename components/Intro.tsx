import IntroControl from "@/components/IntroControl";
import { RhoBoundChart } from "@/components/RhoBound";

// Full-screen opening: the delay curve climbs to the bound, ρ and bound are named,
// then "ρ + bound" resolves into the wordmark and the overlay lifts. It dismisses
// itself with CSS alone, never shows under reduced motion, and any input skips it.
export default function Intro() {
  return (
    <div className="opening" aria-hidden="true">
      <div className="opening-inner">
        <RhoBoundChart titleId="intro-title" />
        <p className="opening-word">
          <span className="opening-slot">
            <span className="opening-sym">ρ</span>
            <span className="opening-txt">rho</span>
          </span>
          <span className="opening-plus">{" + "}</span>
          bound
        </p>
      </div>
      <IntroControl />
    </div>
  );
}
