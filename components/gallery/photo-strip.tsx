import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { WordsReveal } from "@/components/ui/motion-kit";
import { gallery } from "@/data/site";

/** Two rows of clinic photos drifting in opposite directions, full-bleed across the page. */
export function PhotoStrip() {
  const half = Math.ceil(gallery.length / 2);
  const top = gallery.slice(0, half);
  const bottom = gallery.slice(half);

  return (
    <section aria-labelledby="photo-strip-title" className="overflow-hidden py-24 md:py-32">
      <div className="container-x grid gap-8 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <p className="eyebrow">A look around</p>
          <h2 id="photo-strip-title" className="display mt-5 text-5xl md:text-6xl">
            <WordsReveal>
              Step inside <em>Devkripa</em>
            </WordsReveal>
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="flex flex-col items-start gap-5 self-end md:col-span-5 md:col-start-8">
          <p className="text-lg leading-relaxed text-muted-foreground">
            The chairs, the rooms, the team and the camps — hover over any photo to pause the strip.
          </p>
          <Link href="/gallery" className="arrow-nudge inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Open the full gallery <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 flex flex-col gap-4">
        <ImageAutoSlider images={top} direction="right" duration={70} />
        <ImageAutoSlider images={bottom} direction="left" duration={80} />
      </div>
    </section>
  );
}
