"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Reveal, ImageReveal } from "@/components/ui/reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact, hours, whatsappLink } from "@/data/site";
import { altText, contactBlock } from "@/data/home-seo";
import { Magnetic, WordsReveal } from "@/components/ui/motion-kit";

const noopSubscribe = () => () => {};

/** Contact block (homepage 2.7). Also the H1 section of /contact. */
export function Location({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  // Highlight today's row (in clinic time) on the client only.
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().toLocaleDateString("en-IN", { weekday: "long", timeZone: "Asia/Kolkata" }),
    () => null,
  );

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 md:py-36">
      <div className="container-x">
        <Reveal className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Visit &amp; contact</p>
            <Title id="contact-title" className="display mt-5 text-5xl md:text-6xl">
              <WordsReveal>{contactBlock.h2}</WordsReveal>
            </Title>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <address className="not-italic">
                <p className="flex gap-3 text-xl leading-relaxed">
                  <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <span>
                    <strong className="font-semibold">{contactBlock.name}</strong>
                    <br />
                    {contactBlock.address}
                  </span>
                </p>

                <dl className="mt-10 divide-y divide-border border-y border-border text-[0.97rem]">
                  <div className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                    <dt className="text-muted-foreground">{contactBlock.phoneLabel}</dt>
                    <dd className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <a href={contact.phoneHref} className="link-underline font-medium">
                        {contact.phoneDisplay}
                      </a>
                      <a
                        href={whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <WhatsAppIcon className="h-4 w-4" aria-hidden /> WhatsApp
                      </a>
                    </dd>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href={`mailto:${contact.email}`} className="link-underline font-medium [overflow-wrap:anywhere]">
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                    <dt className="text-muted-foreground">Hours</dt>
                    <dd className="font-medium">{contactBlock.hoursText}</dd>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                    <dt className="text-muted-foreground">Payment</dt>
                    <dd className="font-medium">{contactBlock.paymentText}</dd>
                  </div>
                </dl>
              </address>

              <div className="mt-10 flex flex-wrap gap-3">
                <Magnetic>
                  <Link href="/book" className="btn btn-primary arrow-nudge">
                    Book a consultation <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Magnetic>
                <a href={contact.phoneHref} className="btn btn-ghost border border-border">
                  <Phone className="h-4 w-4" aria-hidden /> Call {contact.phoneDisplay}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
                <a
                  href={contact.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-nudge inline-flex items-center gap-1.5 text-primary"
                >
                  Get directions <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                {titleAs === "h2" && (
                  <Link href="/contact" className="link-underline text-primary">
                    Contact page
                  </Link>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.06} className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow">Opening hours</h3>
                <table className="mt-4 w-full text-[0.95rem]">
                  <caption className="sr-only">Clinic opening hours</caption>
                  <tbody>
                    {hours.days.map((d) => (
                      <tr key={d} className={d === today ? "font-semibold text-primary" : ""}>
                        <th scope="row" className="py-1 pr-4 text-left font-[inherit]">
                          {d.slice(0, 3)}
                          {d === today && <span className="sr-only"> (today)</span>}
                        </th>
                        <td className="py-1 text-right tabular-nums">{hours.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="eyebrow">At the clinic</h3>
                <ul className="mt-4 space-y-1.5 text-[0.95rem]">
                  {contact.amenities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Map + photo */}
          <div className="grid gap-4 lg:col-span-7">
            <Reveal className="relative aspect-[4/3] overflow-hidden border border-border bg-muted md:aspect-[16/11]">
              <iframe
                title="Map showing Devkripa Healthcare on Sangh Shakti Road, Ashok Vihar Vistar, Jhotwara"
                src={contact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.55] sepia-[0.12] contrast-[0.95]"
              />
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src="/images/exterior-evening.webp"
                  alt="The Devkripa Healthcare entrance and signage in the evening, Jhotwara"
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover"
                />
              </ImageReveal>
              <ImageReveal delay={0.1} className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src="/images/reception.webp"
                  alt={altText.reception}
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover"
                />
              </ImageReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
