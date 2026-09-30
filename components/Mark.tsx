export default function Mark() {
  return (
    <svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true" className="mark">
      <line x1="74" y1="14" x2="74" y2="86" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      <path d="M14 80 C40 78 62 72 68 16" fill="none" stroke="var(--signal)" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}
