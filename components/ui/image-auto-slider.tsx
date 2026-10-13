import Image from "next/image";

export type SliderImage = { src: string; alt: string; caption?: string; w: number; h: number };

/**
 * An endless row of photos drifting sideways (21st.dev "Image Auto Slider" pattern).
 * The row is rendered twice so the loop is seamless; it pauses on hover and stops for reduced motion.
 */
export function ImageAutoSlider({
  images,
  direction = "right",
  duration = 60,
  className = "",
}: {
  images: SliderImage[];
  /** "right" drifts left-to-right, "left" drifts right-to-left. */
  direction?: "left" | "right";
  /** Seconds for one full pass. */
  duration?: number;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      className="auto-slider-track"
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      style={{ animationDuration: `${duration}s`, animationDirection: direction === "right" ? "reverse" : "normal" }}
    >
      {images.map((img) => (
        <li
          key={img.src}
          className="group relative h-56 shrink-0 overflow-hidden rounded-2xl bg-muted md:h-72"
          style={{ aspectRatio: `${Math.min(Math.max(img.w / img.h, 0.75), 1.5)}` }}
        >
          <Image
            src={img.src}
            alt={hidden ? "" : img.alt}
            fill
            sizes="(min-width: 768px) 420px, 320px"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
          />
          {img.caption && (
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-4 pb-3 pt-10 text-sm font-semibold text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {img.caption}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`auto-slider ${className}`}>
      {row(false)}
      {row(true)}
    </div>
  );
}
