"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Reveal } from "@/components/ui/reveal";
import { reviews } from "@/data/site";
import { VideoReviews } from "@/components/reviews/video-reviews";

export function Reviews({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const r = reviews[i];
  const go = (s: number) => setI((v) => (v + s + reviews.length) % reviews.length);

  return (
    <section aria-labelledby="reviews-title" className="border-t border-border bg-card py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Patients</p>
          <Title id="reviews-title" className="display mt-5 text-4xl md:text-5xl">
            In their own words
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

        <div className="lg:col-span-7 lg:col-start-6">
          <figure className="relative min-h-[22rem] md:min-h-[20rem]" aria-live="polite">
            <span className="display absolute -left-1 -top-10 text-[7rem] leading-none text-accent/30 select-none md:-top-14 md:text-[9rem]" aria-hidden>
              &ldquo;
            </span>
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
                  {r.text}
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
