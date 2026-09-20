export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="aioMark"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7a9e7e" />
          <stop offset="1" stopColor="#b5764a" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#aioMark)" />
      <path
        transform="translate(5.6 4.4) scale(0.88)"
        d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z"
        fill="#F7F6F1"
      />
    </svg>
  );
}

export function Logo({
  size = 32,
  tone = "dark",
  className,
}: {
  size?: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={size} />
      <span
        className={`text-[18px] tracking-[-0.01em] ${
          tone === "light" ? "text-[#f7f6f1]" : "text-[#1b1b19]"
        }`}
      >
        <span className="font-extrabold">CineBook</span>
      </span>
    </span>
  );
}
