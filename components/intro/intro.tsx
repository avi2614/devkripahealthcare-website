import { Reveal } from "@/components/ui/reveal";
import { doctor } from "@/data/site";

const facts = [
  { k: "BDS, 2008", v: "Government Dental College, Nagpur (MUHS Nashik)" },
  { k: "FFAC, 2018", v: "Fellowship in Facial Aesthetic Medicine, Mumbai" },
  { k: `Reg. ${doctor.registration.number}`, v: `${doctor.registration.body}, since ${doctor.registration.year}` },
  { k: "7 days", v: "Open every day, Sunday included" },
];

export function Intro() {
  return (
    <section id="intro" className="dot-field dot-field-light py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">The clinic</p>
          </Reveal>
          <Reveal className="md:col-span-9" delay={0.05}>
            <p className="display text-[1.85rem] leading-[1.18] md:text-[2.75rem] md:leading-[1.12]">
              Devkripa Healthcare is a doctor-led clinic in Jhotwara with two wings —{" "}
              <em className="text-primary">dental</em>, and <em className="text-primary">skin &amp; hair</em> — both
              headed by {doctor.name}. One doctor who knows your history, whether you&rsquo;ve come in for a root canal
              or for melasma.
            </p>
          </Reveal>
        </div>

        <dl className="mt-20 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal
              key={f.k}
              delay={i * 0.08}
              className={`group relative border-b border-border py-7 transition-transform duration-500 hover:-translate-y-1 sm:pr-8 lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 === 1 ? "sm:border-l sm:pl-8 lg:pl-8" : ""}`}
            >
              <span aria-hidden className="absolute inset-x-0 -top-px h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--primary),var(--accent))] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <dt className="display text-3xl transition-colors duration-500 group-hover:text-primary">{f.k}</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{f.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
