"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type CarouselCard = {
  id: string;
  href: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Small label above the title, e.g. "Skin & hair". */
  tag?: string;
};

/**
 * A draggable row of full-height image cards with text over the photo
 * (21st.dev / shadcnblocks "Gallery with image cards" pattern, built on Embla).
 * Slides left-to-right on its own, pauses on hover/focus, and stops for reduced motion.
 */
export function ImageCardCarousel({
  items,
  label,
  autoplay = true,
  className = "",
}: {
  items: CarouselCard[];
  label: string;
  autoplay?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // One plugin instance per carousel (Embla wants a stable reference across renders).
  const [plugin] = useState(() =>
    Autoplay({ delay: 3800, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }),
  );
  const [viewportRef, api] = useEmblaCarousel(
    { align: "start", loop: true, dragFree: false, skipSnaps: false },
    autoplay && !reduce ? [plugin] : [],
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const init = () => {
      setSnaps(api.scrollSnapList());
      onSelect();
    };
    init();
    api.on("select", onSelect).on("reInit", init);
    return () => {
      api.off("select", onSelect).off("reInit", init);
    };
  }, [api, onSelect]);

  // When the list changes (e.g. switching wings), start again from the first card.
  // Embla re-measures the new slides itself; keyed on ids so parent re-renders don't reset it.
  const itemsKey = items.map((c) => c.id).join("|");
  useEffect(() => {
    api?.scrollTo(0, true);
  }, [api, itemsKey]);

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div ref={viewportRef} className="mt-6 overflow-hidden">
        <ul className="-ml-4 flex touch-pan-y md:-ml-5">
          {items.map((c, i) => (
            <li
              key={c.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              className="min-w-0 shrink-0 grow-0 basis-[82%] pl-4 min-[480px]:basis-[60%] md:basis-[42%] md:pl-5 lg:basis-[31%]"
            >
              <Link
                href={c.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 768px) 42vw, 82vw"
                  className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                />
                <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,19,46,0.92)_0%,rgba(6,19,46,0.45)_42%,rgba(6,19,46,0)_70%)]" />
                <span className="on-dark absolute inset-x-0 bottom-0 flex flex-col p-6 text-white md:p-7">
                  {c.tag && (
                    <span className="mb-3 w-fit rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm">
                      {c.tag}
                    </span>
                  )}
                  <span className="display text-2xl leading-tight md:text-[1.7rem]">{c.title}</span>
                  <span className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-white/80">{c.description}</span>
                  <span className="arrow-nudge mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                    Read more <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {snaps.length > 1 && (
        <div className="mt-7 flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selected}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === selected ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
