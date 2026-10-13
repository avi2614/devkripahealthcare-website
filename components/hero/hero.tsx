"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { doctor, hours } from "@/data/site";
import { useAlwaysPlay } from "@/components/ui/always-playing-video";
import { NumberTicker } from "@/components/ui/effects";
import { Magnetic } from "@/components/ui/motion-kit";

const VIDEO = {
  desktop: { src: "/videos/hero-clinic.mp4", poster: "/videos/hero-clinic-poster.webp" },
  mobile: { src: "/videos/hero-clinic-mobile.mp4", poster: "/videos/hero-clinic-poster-mobile.webp" },
};
/** Last-resort fallback: the clinic's own reception photo. */
const FALLBACK = "/images/reception.webp";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  // Pick the right cut for the screen once we're on the client.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (orientation: portrait) and (max-width: 1024px)");
    const pick = () => setSrc(mq.matches ? VIDEO.mobile.src : VIDEO.desktop.src);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  // Always playing, including after the source switches between cuts.
  useAlwaysPlay(videoRef, [src]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  const lines = ["Dental and skin care,", "with a doctor who", "takes time to listen."];

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
      {/* Media */}
      <motion.div style={{ y: mediaY }} className="grain absolute inset-0">
        {/* Poster (and fallback) sits underneath; the video fades in over it once it plays. */}
        {posterFailed ? (
          <Image src={FALLBACK} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : (
          <picture>
            <source media="(max-width: 767px)" srcSet={VIDEO.mobile.poster} />
            <img
              src={VIDEO.desktop.poster}
              alt=""
              fetchPriority="high"
              onError={() => setPosterFailed(true)}
              className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
            />
          </picture>
        )}
        {src && !failed && (
          <video
            ref={videoRef}
            key={src}
            className={`absolute inset-0 h-full w-full object-cover object-[60%_center] transition-opacity duration-[1.2s] ${ready ? "opacity-100" : "opacity-0"}`}
            src={src}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            onPlaying={() => setReady(true)}
            onLoadedData={() => setReady(true)}
            onError={() => setFailed(true)}
          />
        )}
        {/* Legibility scrim — kept quiet and directional, not decorative */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.15)_70%,rgba(0,0,0,0.45)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_60%)]" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity: contentOpacity }} className="container-x relative flex min-h-[100svh] flex-col justify-end pb-24 pt-28 md:pb-28">
        <motion.p
          className="eyebrow on-dark mb-6 flex items-center gap-3 !text-white/80"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          Dr. Jahanvi&rsquo;s Dermadent · Jhotwara, Jaipur
        </motion.p>

        <h1 className="display max-w-[17ch] text-[2.3rem] min-[360px]:text-[2.65rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={`block ${i === 2 ? "text-gradient" : ""}`}
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-8 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          // Transform-only entrance: this block is the LCP element, so it must paint immediately.
          initial={reduce ? false : { y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
        >
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-white/85 md:text-lg">
              {doctor.name} is a dental surgeon with a fellowship in facial aesthetic medicine. Teeth, skin and hair are
              treated under one roof — open every day of the week.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link href="/book" className="btn btn-light arrow-nudge on-dark">
                  Book a consultation <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/treatments" className="btn btn-ghost on-dark text-white">
                  See treatments
                </Link>
              </Magnetic>
            </div>
          </div>

          <dl className="hidden shrink-0 grid-cols-2 gap-x-10 gap-y-1 border-l border-white/25 pl-6 text-sm md:grid">
            <dt className="text-white/60">Years practising</dt>
            <dt className="text-white/60">Open daily</dt>
            <dd className="display text-3xl">
              <NumberTicker value={new Date().getFullYear() - doctor.practisingSince} suffix="+" />
            </dd>
            <dd className="display text-3xl">{hours.label.replace(" – ", "–")}</dd>
          </dl>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0">
        <div className="container-x flex items-center justify-between">
          <a href="#intro" className="on-dark hidden items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/70 md:inline-flex">
            <motion.span
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown className="h-4 w-4" aria-hidden />
            </motion.span>
            Scroll
          </a>
        </div>
      </div>
    </section>
  );
}
