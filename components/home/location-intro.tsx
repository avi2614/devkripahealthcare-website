import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ImageReveal, Reveal } from "@/components/ui/reveal";
import { WordsReveal } from "@/components/ui/motion-kit";
import { Rich } from "@/components/ui/rich";
import { contact } from "@/data/site";
import { altText, locationIntro } from "@/data/home-seo";

/** Homepage 2.3 — "Where is Devkripa Healthcare located in Jaipur?" */
export function LocationIntro() {
  return (
    <section id="location" aria-labelledby="location-title" className="py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted lg:col-span-5">
          <Image
            src="/images/building.webp"
            alt={altText.building}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </ImageReveal>

        <Reveal className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow">Location</p>
          <h2 id="location-title" className="display mt-5 text-4xl leading-[1.1] md:text-5xl">
            <WordsReveal>{locationIntro.h2}</WordsReveal>
          </h2>
          <p className="mt-8 text-[1.05rem] leading-[1.75] text-foreground/85">
            <Rich text={locationIntro.body} />
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={contact.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary arrow-nudge">
              Get directions <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href="/contact" className="arrow-nudge inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Contact the clinic <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
