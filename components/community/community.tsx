import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { communityCamp } from "@/data/site";
import { Tilt, WordsReveal } from "@/components/ui/motion-kit";

/** The clinic's free dental camp at a local school, as a photo mosaic. */
export function Community() {
  const { checkup, memento, line, screening, team } = communityCamp.photos;

  return (
    <section aria-labelledby="community-title" className="border-t border-border py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">In the community</p>
          <h2 id="community-title" className="display mt-5 text-4xl md:text-5xl">
            <WordsReveal>
              {communityCamp.title}
            </WordsReveal>
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
            Dr. Jahanvi and the clinic team ran a free dental check-up camp for students at Central Academy — checking
            teeth, answering questions and showing children how to look after their smiles.
          </p>
          <Link href="/gallery" className="arrow-nudge mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            See all photos <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>

        <div className="grid grid-cols-6 gap-3 md:gap-4 lg:col-span-8">
          <Photo item={checkup} className="col-span-6 aspect-[16/10] md:col-span-4" />
          <Photo item={memento} className="col-span-3 aspect-[3/4] md:col-span-2 md:row-span-2 md:aspect-auto" />
          <Photo item={line} className="col-span-3 aspect-[3/4] md:col-span-4 md:aspect-[16/10]" />
          <Photo item={screening} className="col-span-3 aspect-[4/3]" />
          <Photo item={team} className="col-span-3 aspect-[4/3]" />
        </div>
      </div>
    </section>
  );
}

function Photo({
  item,
  className,
}: {
  item: { src: string; alt: string; caption: string };
  className: string;
}) {
  return (
    <Reveal className={`relative ${className}`}>
      <Tilt className="h-full w-full" max={5}>
        <figure className="group relative h-full w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 pb-2.5 pt-8 text-xs font-medium text-white transition-[padding] duration-500 group-hover:pb-4">
            {item.caption}
          </figcaption>
        </figure>
      </Tilt>
    </Reveal>
  );
}
