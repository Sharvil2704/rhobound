import Link from "next/link";
import Mark from "@/components/Mark";

export default function NotFound() {
  return (
    <main id="main" className="legal wrap not-found">
      <Link href="/" className="brand" aria-label="Rhobound home">
        <Mark />
        <span>rhobound</span>
      </Link>
      <h1>This page doesn’t exist</h1>
      <p className="lede">The link may be out of date, or the address may have a typo.</p>
      <p>
        <Link href="/" className="btn">
          Go to the homepage
        </Link>
      </p>
    </main>
  );
}
