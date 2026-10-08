import Image from "next/image";
import { ImageReveal, Reveal } from "@/components/ui/reveal";

const steps = [
  {
    n: "01",
    title: "Listen",
    body: "You start by telling Dr. Jahanvi what's bothering you — in English or Hindi. Patients often mention how patiently she listens; it's where every plan begins.",
  },
  {
    n: "02",
    title: "Examine & explain",
    body: "A proper look at your teeth, skin or scalp, followed by a plain explanation of what she sees and what's causing it.",
  },
  {
    n: "03",
    title: "Choose together",
    body: "Most concerns can be treated in more than one way. You'll hear what each option involves, so the decision is yours.",
  },
  {
    n: "04",
    title: "Follow through",
    body: "Root canals, braces, peels and laser sessions usually take more than one visit. With the clinic open every day, follow-ups are easier to fit around work and family.",
  },
];

export function VisitSteps({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  return (
    <section id="visit" aria-labelledby="visit-title" className="bg-ink py-24 text-ink-foreground md:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow !text-ink-foreground/60">Your visit</p>
              <Title id="visit-title" className="display mt-5 text-5xl md:text-6xl">
                What a first appointment <em className="text-[#d8b892]">looks like</em>
              </Title>
            </Reveal>
            <div className="mt-12 grid grid-cols-5 gap-3">
              <ImageReveal className="relative col-span-3 aspect-[3/4] overflow-hidden bg-white/5">
                <Image
                  src="/images/doctor-treating-3.webp"
                  alt="Dr. Jahanvi Tyagi treating a patient in the dental chair"
                  fill
                  sizes="(min-width: 1024px) 24vw, 60vw"
                  className="object-cover"
                />
              </ImageReveal>
              <ImageReveal delay={0.15} className="relative col-span-2 mt-16 aspect-[3/4] overflow-hidden bg-white/5">
                <Image
                  src="/images/doctor-child-patient.webp"
                  alt="Dr. Jahanvi Tyagi with a smiling young patient in the dental chair"
                  fill
                  sizes="(min-width: 1024px) 16vw, 40vw"
                  className="object-cover"
                />
              </ImageReveal>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 0.04}
              className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-white/15 py-10 first:border-t-0 first:pt-0 md:grid-cols-[7rem_1fr] md:py-14"
            >
                <span className="display text-5xl text-[#d8b892] md:text-7xl" aria-hidden>
                  {s.n}
                </span>
                <div>
                  <h3 className="display text-3xl md:text-4xl">{s.title}</h3>
                  <p className="mt-4 max-w-md text-[1.02rem] leading-[1.75] text-ink-foreground/75">{s.body}</p>
                </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
