"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Images, Maximize2, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Tilt, WordsReveal } from "@/components/ui/motion-kit";
import { gallery } from "@/data/site";

/** Column/row spans for a 6-column editorial rhythm; repeats every 6 items. */
const layout = [
  "col-span-6 md:col-span-4 aspect-[4/3]",
  "col-span-3 md:col-span-2 md:row-span-2 aspect-[3/4] md:aspect-auto",
  "col-span-3 md:col-span-2 aspect-[3/4] md:aspect-[4/3]",
  "col-span-3 md:col-span-2 aspect-[3/4]",
  "col-span-3 md:col-span-2 aspect-[3/4] md:aspect-[4/3]",
  "col-span-6 md:col-span-2 aspect-[4/3] md:aspect-[3/4]",
];

type GalleryProps = {
  titleAs?: "h1" | "h2";
  /** Show only the first N photos plus a link to the full gallery page. */
  limit?: number;
  eyebrow?: string;
  id?: string;
};

export function Gallery({ titleAs = "h2", limit, eyebrow = "Inside the clinic", id = "clinic" }: GalleryProps = {}) {
  const Title = titleAs;
  const items = limit ? gallery.slice(0, limit) : gallery;
  const hasMore = items.length < gallery.length;
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const open = index !== null;

  const go = useCallback((step: number) => {
    setDir(step);
    setIndex((i) => (i === null ? i : (i + step + items.length) % items.length));
  }, [items.length]);

  const item = index !== null ? items[index] : null;

  // Keep the active thumbnail in view as the visitor pages through.
  useEffect(() => {
    if (index === null) return;
    const t = window.setTimeout(() => {
      document.querySelector("[data-thumb-active]")?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }, 50);
    return () => window.clearTimeout(t);
  }, [index]);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="eyebrow">{eyebrow}</p>
            <Title id={`${id}-title`} className="display mt-5 text-5xl md:text-6xl">
              <WordsReveal>
                A real place, <em className="text-primary">a familiar team</em>
              </WordsReveal>
            </Title>
          </Reveal>
          <Reveal delay={0.06} className="self-end md:col-span-5 md:col-start-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Photographs from the clinic on Khirni Phatak Road — the rooms you&rsquo;ll be treated in, the people
              you&rsquo;ll meet, and the community health camps the team runs.
            </p>
          </Reveal>
        </div>

        <ul
          className={
            limit
              ? "mt-16 grid grid-flow-dense grid-cols-6 gap-3 md:gap-4"
              : "mt-16 columns-2 gap-3 md:columns-3 md:gap-4 [&>li]:mb-3 md:[&>li]:mb-4"
          }
        >
          {items.map((g, i) => (
            <li
              key={g.src}
              className={limit ? `${layout[i % layout.length]} relative` : "relative break-inside-avoid"}
              style={limit ? undefined : { aspectRatio: `${g.w} / ${g.h}` }}
            >
              <motion.div
                className="h-full w-full"
                initial={reduce ? false : { opacity: 0, clipPath: "inset(14% 8% 14% 8% round 18px)", scale: 0.96 }}
                whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 14px)", scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 1.1, delay: (i % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt className="h-full w-full" max={6}>
                  <button
                    type="button"
                    onClick={() => {
                      setDir(1);
                      setIndex(i);
                    }}
                    className="group relative block h-full w-full overflow-hidden rounded-[14px] bg-muted"
                    aria-label={`Open photo: ${g.caption}`}
                  >
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                    />
                    {/* Zoom badge on hover */}
                    <span
                      aria-hidden
                      className="absolute right-3 top-3 flex h-10 w-10 scale-50 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-lg transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-ink/75 to-transparent px-4 pb-3.5 pt-12 text-left text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      {g.caption}
                    </span>
                  </button>
                </Tilt>
              </motion.div>
            </li>
          ))}
        </ul>

        {hasMore && (
          <Reveal className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Showing {items.length} of {gallery.length} photos
            </p>
            <Link href="/gallery" className="btn btn-primary arrow-nudge">
              <Images className="h-4 w-4" aria-hidden />
              Load more photos
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        )}
      </div>

      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <AnimatePresence>
          {open && item && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[80] bg-ink/95"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>
              <Dialog.Content
                forceMount
                className="on-dark fixed inset-0 z-[90] flex flex-col text-white outline-none"
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") go(1);
                  if (e.key === "ArrowLeft") go(-1);
                }}
              >
                <div className="flex items-center justify-between px-5 py-4 md:px-8">
                  <Dialog.Title className="text-sm text-white/80">
                    {item.caption}
                    <span className="ml-3 tabular-nums text-white/50">
                      {index! + 1} / {items.length}
                    </span>
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Photo viewer. Use the left and right arrow keys to move between photos.
                  </Dialog.Description>
                  <Dialog.Close
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
                    aria-label="Close photo viewer"
                  >
                    <X className="h-6 w-6" aria-hidden />
                  </Dialog.Close>
                </div>

                <div className="relative flex-1 overflow-hidden">
                  <AnimatePresence initial={false} custom={dir}>
                    <motion.div
                      key={item.src}
                      custom={dir}
                      className="absolute inset-0 px-4 pb-4 md:px-24"
                      initial={{ opacity: 0, x: dir * 60, scale: 0.94 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: dir * -60, scale: 0.96 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -80) go(1);
                        else if (info.offset.x > 80) go(-1);
                      }}
                    >
                      <div className="relative h-full w-full">
                        <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 md:left-6"
                    aria-label="Previous photo"
                  >
                    <ArrowLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 md:right-6"
                    aria-label="Next photo"
                  >
                    <ArrowRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-2 overflow-x-auto px-4 pb-5 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {items.map((t, ti) => (
                    <button
                      key={t.src}
                      type="button"
                      onClick={() => {
                        setDir(ti > index! ? 1 : -1);
                        setIndex(ti);
                      }}
                      aria-label={`Show photo: ${t.caption}`}
                      aria-current={ti === index}
                      data-thumb-active={ti === index ? "" : undefined}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md transition-opacity duration-300 md:h-14 md:w-20 ${
                        ti === index ? "opacity-100" : "opacity-45 hover:opacity-80"
                      }`}
                    >
                      <Image src={t.src} alt="" fill sizes="80px" className="object-cover" />
                      {ti === index && (
                        <motion.span
                          layoutId="thumb-ring"
                          className="absolute inset-0 rounded-md ring-2 ring-inset ring-highlight"
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
