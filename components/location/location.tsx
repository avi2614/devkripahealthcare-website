"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, ImageReveal } from "@/components/ui/reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact, hours, whatsappLink } from "@/data/site";
import { WordsReveal } from "@/components/ui/motion-kit";

const noopSubscribe = () => () => {};

export function Location({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  // Highlight today's row (in clinic time) on the client only.
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().toLocaleDateString("en-IN", { weekday: "long", timeZone: "Asia/Kolkata" }),
    () => null,
  );

  const rows = [
    { icon: Phone, label: "Call", value: contact.phoneDisplay, href: contact.phoneHref },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "Message the clinic", href: whatsappLink(), external: true },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 md:py-36">
      <div className="container-x">
        <Reveal className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow">Visit &amp; contact</p>
            <Title id="contact-title" className="display mt-5 text-5xl md:text-6xl">
              <WordsReveal>
                Find us in Jhotwara
              </WordsReveal>
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
                    {contact.address.line1},<br />
                    {contact.address.line2},<br />
                    {contact.address.line3}, {contact.address.city} {contact.address.postalCode}
                  </span>
                </p>
                <a
                  href={contact.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary arrow-nudge mt-8"
                >
                  Get directions <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>

                <ul className="mt-12 divide-y divide-border border-y border-border">
                  {rows.map((r) => (
                    <li key={r.label}>
                      <a
                        href={r.href}
                        {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 py-5"
                      >
                        <r.icon className="h-5 w-5 text-muted-foreground" aria-hidden />
                        <span className="sr-only text-sm text-muted-foreground sm:not-sr-only sm:w-24 sm:shrink-0">{r.label}</span>
                        <span className="link-underline min-w-0 font-medium [overflow-wrap:anywhere]">{r.value}</span>
                        <ArrowUpRight
                          className="ml-auto h-4 w-4 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </address>
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
              <div className="space-y-8">
                <div>
                  <h3 className="eyebrow">At the clinic</h3>
                  <ul className="mt-4 space-y-1.5 text-[0.95rem]">
                    {contact.amenities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow">Payment</h3>
                  <p className="mt-4 text-[0.95rem]">{contact.payment.join(" · ")}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Map + photo */}
          <div className="grid gap-4 lg:col-span-7">
            <Reveal className="relative aspect-[4/3] overflow-hidden border border-border bg-muted md:aspect-[16/11]">
              <iframe
                title="Map showing Devkripa Healthcare on Khirni Phatak Road, Jhotwara"
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
                  alt="The clinic entrance and signage in the evening"
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover"
                />
              </ImageReveal>
              <ImageReveal delay={0.1} className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src="/images/reception.webp"
                  alt="The reception area inside the clinic"
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
