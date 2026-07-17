import Link from "next/link";

// Eenvoudig tekstlogo met subtiel symbool: een stilistische "NL-blad"-vorm
// die verwijst naar Nederland + voeding/wetenschap, zonder cliché
// (geen avocado, meetlint of weegschaal).

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Low Carb Netherlands — home"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="16" className="fill-forest-800" />
        <path
          d="M16 6C11 10 9 14.5 9 18.5C9 22.6 12.1 26 16 26C19.9 26 23 22.6 23 18.5C23 14.5 21 10 16 6Z"
          className="fill-forest-200"
        />
        <path
          d="M16 10.5V22"
          stroke="#193026"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="16" cy="18.5" r="1.6" className="fill-amber-400" />
      </svg>
      <span className="font-serif text-lg font-semibold leading-tight text-forest-900">
        Low Carb
        <br className="hidden sm:block" /> Netherlands
      </span>
    </Link>
  );
}
