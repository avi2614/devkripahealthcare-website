import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ImageReveal, Reveal } from "@/components/ui/reveal";
import { WordsReveal } from "@/components/ui/motion-kit";
import { Rich } from "@/components/ui/rich";
import { altText, dentalSection, skinSection, type HomeTreatment } from "@/data/home-seo";

type Section = { h2: string; intro: string; footnote: string; items: HomeTreatment[] };

/**
 * Homepage 2.4 and 2.5 — one H2 per wing, every treatment as a visible H3 linking to its own page.
 * Rendered on the server so all headings and copy are in the HTML.
 */
export function TreatmentSections() {
  return (
    <>
      <Wing
        id="dental-treatments"
        eyebrow="Dental care"
        section={dentalSection}
        image={{ src: "/images/dental-operatory.webp", alt: altText.dentalOperatory }}
        all={{ href: "/dental-care", label: "All dental treatments" }}
      />
      <Wing
        id="skin-treatments"
        eyebrow="Skin & hair"
        section={skinSection}
        image={{ src: "/images/skin-laser-room.webp", alt: altText.skinLaserRoom }}
        all={{ href: "/skin-care", label: "All skin and hair treatments" }}
        tinted
      />
    </>
  );
}

function Wing({
  id,
  eyebrow,
  section,
  image,
  all,
  tinted = false,
}: {
  id: string;
  eyebrow: string;
  section: Section;
  image: { src: string; alt: string };
  all: { href: string; label: string };
  tinted?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-24 md:py-32 ${tinted ? "bg-secondary/55" : ""}`}>
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-5 ${tinted ? "lg:order-2 lg:col-start-8" : ""}`}>
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
              <h2 id={`${id}-title`} className="display mt-5 text-4xl leading-[1.1] md:text-5xl">
                <WordsReveal>{section.h2}</WordsReveal>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{section.intro}</p>
            </Reveal>
            <ImageReveal className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </ImageReveal>
            <Link href={all.href} className="arrow-nudge mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              {all.label} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className={`lg:col-span-7 ${tinted ? "lg:order-1" : "lg:col-start-6 lg:pl-8"}`}>
          <ol className="border-t border-border">
            {section.items.map((t, i) => (
              <Reveal as="li" key={t.id} delay={Math.min(i, 4) * 0.04} className="spotlight border-b border-border">
                <article className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-7 md:grid-cols-[3.25rem_1fr] md:py-8">
                  <span className="pt-2 text-xs font-semibold tabular-nums tracking-widest text-muted-foreground" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display text-2xl leading-tight md:text-[1.85rem]">
                      <Link href={t.href} className="group inline-flex items-start gap-2 transition-colors hover:text-primary">
                        <span>{t.h3}</span>
                        <ArrowUpRight
                          className="mt-1.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden
                        />
                      </Link>
                    </h3>
                    <p className="mt-3 max-w-xl text-[1.02rem] leading-[1.75] text-foreground/80">
                      <Rich text={t.body} />
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
          <p className="mt-6 text-sm italic text-muted-foreground">{section.footnote}</p>
        </div>
      </div>
    </section>
  );
}
