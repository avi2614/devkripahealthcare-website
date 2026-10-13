"use client";

import { Suspense, useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { requestBooking } from "@/lib/booking-events";
import { consultationFor, treatmentGroups, treatmentHref, treatments, type TreatmentGroup } from "@/data/site";
import { WordsReveal } from "@/components/ui/motion-kit";
import { ImageCardCarousel } from "@/components/ui/image-card-carousel";

const ease = [0.22, 1, 0.36, 1] as const;
const groups: TreatmentGroup[] = ["dental", "skin"];

/**
 * Applies `?wing=dental|skin` and `?t=<treatment id>` (used by the header menus).
 * Kept in its own Suspense boundary so the rest of the section still renders on the server.
 */
function QuerySync({ onSelect }: { onSelect: (group: TreatmentGroup, id: string | null) => void }) {
  const params = useSearchParams();
  const wing = params?.get("wing");
  const id = params?.get("t");

  useEffect(() => {
    const t = id ? treatments.find((x) => x.id === id) : undefined;
    if (t) onSelect(t.group, t.id);
    else if (wing === "dental" || wing === "skin") onSelect(wing, null);
  }, [wing, id, onSelect]);

  return null;
}

export function Treatments({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  const reduce = useReducedMotion();
  const router = useRouter();
  const uid = useId();
  const [group, setGroup] = useState<TreatmentGroup>("dental");
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const list = treatments.filter((t) => t.group === group);
  const activeId = hoverId ?? openId;
  const active = list.find((t) => t.id === activeId);
  const image = active
    ? { src: active.image, alt: active.imageAlt, clinic: active.clinicPhoto, key: active.id }
    : { src: treatmentGroups[group].image, alt: treatmentGroups[group].imageAlt, clinic: true, key: group };

  const switchGroup = (g: TreatmentGroup) => {
    setGroup(g);
    setOpenId(null);
    setHoverId(null);
  };

  const selectFromQuery = useCallback((g: TreatmentGroup, id: string | null) => {
    setGroup(g);
    setOpenId(id);
    setHoverId(null);
    // Wait for the list to swap and the panel to open, then bring it into view below the fixed header.
    window.setTimeout(() => {
      const el = document.getElementById(id ? `treatment-${id}` : "treatments");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }, 500);
  }, []);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = groups[(i + (e.key === "ArrowRight" ? 1 : groups.length - 1)) % groups.length];
    switchGroup(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <section id="treatments" aria-labelledby="treatments-title" className="py-24 md:py-36">
      <Suspense fallback={null}>
        <QuerySync onSelect={selectFromQuery} />
      </Suspense>
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">Treatments</p>
            <Title id="treatments-title" className="display mt-5 text-5xl md:text-6xl">
              <WordsReveal>
                What we treat
              </WordsReveal>
            </Title>
          </Reveal>
          <Reveal delay={0.06} className="self-end md:col-span-6 md:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Every treatment starts with a consultation. Choose a wing to see what&rsquo;s offered, and open any
              treatment to read more.
            </p>
          </Reveal>
        </div>

        {/* Wing switch */}
        <div role="tablist" aria-label="Treatment areas" className="mt-16 flex gap-5 border-b border-border min-[360px]:gap-6 sm:gap-8 md:gap-14">
          {groups.map((g, i) => {
            const selected = g === group;
            return (
              <button
                key={g}
                id={`${uid}-tab-${g}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => switchGroup(g)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`group relative -mb-px flex items-baseline gap-2 pb-5 sm:gap-3 text-left transition-colors ${
                  selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-xs font-semibold tabular-nums tracking-widest">0{i + 1}</span>
                <span className="display whitespace-nowrap text-[1.35rem] min-[360px]:text-[1.6rem] sm:text-3xl md:text-[2.6rem]">{treatmentGroups[g].label}</span>
                {selected && (
                  <motion.span
                    layoutId={`${uid}-underline`}
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-primary"
                    transition={{ duration: 0.5, ease }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${group}`}
          className="mt-12"
        >
          <ImageCardCarousel
            label={`${treatmentGroups[group].label} treatments`}
            items={list.map((t) => ({
              id: t.id,
              href: treatmentHref(t.id),
              title: t.name,
              description: t.short,
              image: t.image,
              imageAlt: t.imageAlt,
              tag: treatmentGroups[group].label,
            }))}
          />

          <div className="mt-20 grid gap-12 lg:grid-cols-12">
          {/* List */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={group}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease }}
              >
                <p className="mb-6 max-w-xl text-muted-foreground">{treatmentGroups[group].intro}</p>
                <ul className="border-t border-border" onMouseLeave={() => setHoverId(null)}>
                  {list.map((t, i) => {
                    const open = openId === t.id;
                    const panelId = `${uid}-${t.id}`;
                    return (
                      <li key={t.id} id={`treatment-${t.id}`} className="spotlight border-b border-border" onMouseEnter={() => setHoverId(t.id)}>
                        <h3>
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-controls={panelId}
                            onClick={() => setOpenId(open ? null : t.id)}
                            onFocus={() => setHoverId(t.id)}
                            className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 py-6 text-left md:grid-cols-[3.5rem_1fr_auto] md:py-7"
                          >
                            <span className="text-xs font-semibold tabular-nums tracking-widest text-muted-foreground transition-transform duration-500 group-hover:translate-x-1">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>
                              <span className="display block text-2xl leading-tight transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-primary md:text-[2rem]">
                                {t.name}
                              </span>
                              <span className="mt-1.5 block text-[0.95rem] text-muted-foreground">{t.short}</span>
                            </span>
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:border-foreground/40 ${
                                open ? "rotate-45 border-primary bg-primary text-primary-foreground" : ""
                              }`}
                              aria-hidden
                            >
                              <Plus className="h-4 w-4" />
                            </span>
                          </button>
                        </h3>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              id={panelId}
                              key="panel"
                              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                              animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.55, ease }}
                              className="overflow-hidden"
                            >
                              <div className="grid gap-6 pb-8 md:grid-cols-[3.5rem_1fr] md:gap-x-3">
                                <div className="hidden md:block" />
                                <div>
                                  <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-muted lg:hidden">
                                    <Image src={t.image} alt={t.imageAlt} fill sizes="100vw" className="object-cover" />
                                  </div>
                                  <p className="max-w-xl text-[1.02rem] leading-[1.75] text-foreground/85">{t.detail}</p>
                                  {t.includes && (
                                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Includes">
                                      {t.includes.map((x) => (
                                        <li key={x} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                                          {x}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        requestBooking(
                                          { treatmentId: t.id, consultation: consultationFor(t) },
                                          (url) => router.push(url),
                                        )
                                      }
                                      className="btn btn-primary arrow-nudge"
                                    >
                                      Book a consultation for this <ArrowRight className="h-4 w-4" aria-hidden />
                                    </button>
                                    <Link href={treatmentHref(t.id)} className="link-underline text-sm font-semibold text-primary">
                                      Full details
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky image */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={image.key}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease }}
                  >
                    <Image src={image.src} alt={image.alt} fill sizes="40vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {image.clinic ? "Photographed at the clinic." : "Representative photo."}
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
