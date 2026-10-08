import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageReveal, Reveal } from "@/components/ui/reveal";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { contact, doctor } from "@/data/site";

export function Doctor({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  return (
    <section id="doctor" aria-labelledby="doctor-title" className="bg-secondary/55 py-24 md:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Images */}
        <div className="relative lg:col-span-6">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-muted">
            <Image
              src="/images/doctor-desk.webp"
              alt="Dr. Jahanvi Tyagi seated at her desk in the consultation room"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[50%_60%]"
              quality={80}
            />
          </ImageReveal>
          <Reveal
            delay={0.3}
            className="absolute -bottom-10 right-4 w-[38%] max-w-[220px] border-[6px] border-secondary bg-muted shadow-[0_20px_40px_-20px_rgba(20,25,22,0.35)] sm:right-8 lg:-right-8 lg:bottom-auto lg:top-[62%]"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/doctor-portrait.webp"
                alt="Portrait of Dr. Jahanvi Tyagi"
                fill
                sizes="220px"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        </div>

        {/* Text */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">Meet the doctor</p>
            <Title id="doctor-title" className="display mt-5 text-5xl md:text-6xl">
              {doctor.name}
            </Title>
            <p className="mt-3 text-lg text-muted-foreground">{doctor.title}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 space-y-5 text-[1.05rem] leading-[1.75] text-foreground/85">
            {doctor.about.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </Reveal>

          <Reveal delay={0.12} className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
            <div>
              <h3 className="eyebrow">Education</h3>
              <ol className="mt-4 space-y-4">
                {doctor.education.map((e) => (
                  <li key={e.year} className="grid grid-cols-[3.25rem_1fr] gap-3">
                    <span className="display text-xl text-accent">{e.year}</span>
                    <span className="text-[0.95rem] leading-snug">
                      {e.award}
                      <span className="block text-muted-foreground">{e.place}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-7">
              <div>
                <h3 className="eyebrow">Registration</h3>
                <p className="mt-4 text-[0.95rem] leading-snug">
                  {doctor.registration.body}
                  <span className="block text-muted-foreground">
                    No. {doctor.registration.number} · {doctor.registration.year}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="eyebrow">Languages</h3>
                <p className="mt-4 text-[0.95rem]">English, हिंदी</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/book" className="btn btn-primary arrow-nudge">
              Book with Dr. Jahanvi <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="flex items-center gap-1">
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in a new tab)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook (opens in a new tab)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
