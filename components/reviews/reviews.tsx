"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Reveal } from "@/components/ui/reveal";
import { reviews } from "@/data/site";
import { VideoReviews } from "@/components/reviews/video-reviews";
import { WordsReveal } from "@/components/ui/motion-kit";

export function Reviews({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const r = reviews[i];
  const go = (s: number) => setI((v) => (v + s + reviews.length) % reviews.length);
  // Auto-advance every few seconds; pauses while the visitor hovers or focuses the quote.
  const [paused, setPaused] = useState(false);
  const autoplay = !reduce && !paused;
  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % reviews.length), 9000);
    return () => window.clearTimeout(t);
  }, [autoplay, i]);

  return (
    <section aria-labelledby="reviews-title" className="border-t border-border bg-card py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Patients</p>
          <Title id="reviews-title" className="display mt-5 text-4xl md:text-5xl">
            <WordsReveal>
              In their own words
            </WordsReveal>
          </Title>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Reviews left by patients on the clinic&rsquo;s booking page, shown as written.
          </p>

          <ul className="mt-10 hidden space-y-1 lg:block" aria-label="Choose a review">
            {reviews.map((x, idx) => (
              <li key={x.author}>
                <button
                  type="button"
                  onClick={() => setI(idx)}
                  aria-current={idx === i}
                  className={`flex w-full items-center gap-3 py-2 text-left text-[0.95rem] transition-colors ${
                    idx === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`h-px bg-current transition-all duration-500 ${idx === i ? "w-10" : "w-4"}`}
                    aria-hidden
                  />
                  {x.author}
                  <span className="text-xs text-muted-foreground">· {x.topic}</span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <div
          className="lg:col-span-7 lg:col-start-6"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <figure className="relative min-h-[22rem] md:min-h-[20rem]" aria-live={autoplay ? "off" : "polite"}>
            <motion.span
              key={`q-${i}`}
              className="display absolute -left-1 -top-10 text-[7rem] leading-none text-accent/30 select-none md:-top-14 md:text-[9rem]"
              aria-hidden
              initial={reduce ? false : { scale: 0.4, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              &ldquo;
            </motion.span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={r.author}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <blockquote className="display text-[1.7rem] leading-[1.3] md:text-[2.35rem] md:leading-[1.25]">
                  <WordsReveal mode="mount" stagger={0.018}>
                    {r.text}
                  </WordsReveal>
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-3 text-[0.95rem]">
                  <span className="font-semibold">{r.author}</span>
                  <span className="text-muted-foreground">
                    {r.topic} · {format(new Date(r.date), "MMMM yyyy")}
                  </span>
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </figure>

          <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
              aria-label="Previous review"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
              aria-label="Next review"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
            <span className="ml-3 text-sm tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </span>
            {/* Time until the next review */}
            <span className="ml-auto h-[2px] w-24 overflow-hidden rounded-full bg-border md:w-40" aria-hidden>
              <motion.span
                key={`p-${i}-${autoplay}`}
                className="block h-full origin-left bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: autoplay ? 1 : 0 }}
                transition={{ duration: autoplay ? 9 : 0.3, ease: "linear" }}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="container-x mt-24 grid gap-10 border-t border-border pt-16 md:mt-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">On camera</p>
          <h3 className="display mt-5 text-3xl md:text-4xl">Hear it from them</h3>
          <p className="mt-5 max-w-sm text-muted-foreground">
            Patients sharing their experience, recorded at the clinic. Tap the speaker to listen.
          </p>
        </Reveal>
        <div className="lg:col-span-7 lg:col-start-6">
          <VideoReviews />
        </div>
      </div>
    </section>
  );
}
