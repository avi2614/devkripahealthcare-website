import Image from "next/image";

/** The clinic's logo (transparent PNG, trimmed). Served at 2–3× display size so edges stay crisp on retina screens. */
export function Logo({ className = "h-10 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/devkripa-logo.png"
      alt="Devkripa Health Care Multispeciality Centre"
      width={2041}
      height={426}
      priority={priority}
      quality={80}
      sizes="(min-width: 768px) 240px, 200px"
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}
