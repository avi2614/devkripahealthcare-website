import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/ui/reveal";
import { AlwaysPlayingVideo } from "@/components/ui/always-playing-video";
import { blogPosts } from "@/data/blog";
import { treatmentAbout } from "@/data/treatment-about";
import {
  consultationFor,
  contact,
  doctor,
  hours,
  site,
  treatmentGroups,
  treatmentHref,
  treatments,
  type TreatmentGroup,
} from "@/data/site";

const find = (group: TreatmentGroup, slug: string) => treatments.find((t) => t.group === group && t.id === slug);

export const treatmentParams = (group: TreatmentGroup) =>
  treatments.filter((t) => t.group === group).map((t) => ({ slug: t.id }));

export function treatmentMetadata(group: TreatmentGroup, slug: string): Metadata {
  const t = find(group, slug);
  if (!t) return {};
  const title = `${t.name} in Jhotwara, Jaipur`;
  const description = `${t.short} ${t.detail}`.slice(0, 158).replace(/\s+\S*$/, "…");
  return {
    title,
    description,
    alternates: { canonical: treatmentHref(t.id) },
    openGraph: { url: `${site.url}${treatmentHref(t.id)}`, title, description, images: [{ url: t.image, alt: t.imageAlt }] },
  };
}

const steps = [
  { title: "Consultation", text: "Dr. Jahanvi listens to your concern and examines you before anything is decided." },
  { title: "Your plan", text: "Options, number of sittings and what to expect are explained, so you can choose with full information." },
  { title: "Treatment", text: "Done at the clinic in Jhotwara, with your comfort kept in mind throughout." },
  { title: "Follow-up", text: "Aftercare advice and review visits, so results are checked and maintained." },
];

export function TreatmentPage({ group, slug }: { group: TreatmentGroup; slug: string }) {
  const t = find(group, slug);
  if (!t) notFound();

  const g = treatmentGroups[group];
  const about = treatmentAbout[t.id] ?? [];
  const siblings = treatments.filter((x) => x.group === group && x.id !== t.id);
  const posts = blogPosts.filter((p) => p.treatmentId === t.id || p.body.includes(treatmentHref(t.id))).slice(0, 3);
  const bookHref = `/book?consultation=${consultationFor(t)}&treatment=${t.id}`;
  const url = `${site.url}${treatmentHref(t.id)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        url,
        name: `${t.name} — ${site.name}`,
        description: t.short,
        about: {
          "@type": "MedicalProcedure",
          name: t.name,
          description: t.detail,
          ...(t.includes ? { alternateName: t.includes } : {}),
        },
        provider: { "@id": `${site.url}/#clinic` },
        reviewedBy: { "@id": `${site.url}/#doctor` },
        image: `${site.url}${t.image}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: g.label, item: `${site.url}${g.path}` },
          { "@type": "ListItem", position: 3, name: t.name, item: url },
        ],
      },
    ],
  };

  return (
    <SiteShell crumb={{ label: t.name, parent: { label: g.label, href: g.path } }}>
      <section aria-labelledby="treatment-title" className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">{g.label}</p>
            <h1 id="treatment-title" className="display mt-5 text-5xl leading-[1.05] md:text-6xl">
              {t.name}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{t.short}</p>
            <p className="mt-6 text-[1.075rem] leading-[1.8] text-foreground/85">{t.detail}</p>
            {about.length > 0 && (
              <div className="mt-10 border-t border-border pt-10">
                <h2 className="display text-3xl md:text-4xl">About {t.name.toLowerCase()}</h2>
                <div className="mt-6 space-y-5 text-[1.075rem] leading-[1.8] text-foreground/85">
                  {about.map((para) => (
                    <p key={para.slice(0, 32)}>{para}</p>
                  ))}
                </div>
              </div>
            )}
            {t.includes && (
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Includes">
                {t.includes.map((x) => (
                  <li key={x} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                    {x}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={bookHref} className="btn btn-primary arrow-nudge">
                Book a consultation <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href={contact.phoneHref} className="btn btn-ghost">
                <Phone className="h-4 w-4" aria-hidden /> {contact.phoneDisplay}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:sticky lg:top-28 lg:col-span-5 lg:col-start-8 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image src={t.image} alt={t.imageAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {t.clinicPhoto ? "Photographed at the clinic." : "Representative photo."}
            </p>
          </Reveal>
        </div>
      </section>

      {t.video && (
        <section aria-labelledby="video-title" className="border-t border-border py-20 md:py-28">
          <div className="container-x grid items-center gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="eyebrow">At the clinic</p>
              <h2 id="video-title" className="display mt-5 text-4xl md:text-5xl">
                {t.video.title}
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">{t.video.caption}</p>
            </Reveal>
            <Reveal delay={0.06} className="md:col-span-5 md:col-start-8">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl bg-ink">
                <AlwaysPlayingVideo
                  src={t.video.src}
                  poster={t.video.poster}
                  aria-label={t.video.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section aria-labelledby="concerns-title" className="bg-secondary/55 py-20 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 id="concerns-title" className="display text-4xl md:text-5xl">
              What it can help with
            </h2>
            <p className="mt-5 text-muted-foreground">
              Not sure if this is the right treatment? That&rsquo;s what the consultation is for.
            </p>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-6 md:col-start-7">
            <ul className="divide-y divide-border border-y border-border">
              {t.concerns.map((c) => (
                <li key={c} className="flex items-start gap-4 py-5 text-lg">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <h2 id="steps-title" className="display text-4xl md:text-5xl">
              How it works at the clinic
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05}>
                <span className="display text-3xl text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-12 text-sm text-muted-foreground">
            With {doctor.name}, {doctor.title.toLowerCase()} · Open every day, {hours.label}
          </p>
        </div>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="reading-title" className="border-t border-border py-20 md:py-28">
          <div className="container-x">
            <h2 id="reading-title" className="display text-4xl md:text-5xl">
              Further reading
            </h2>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} headingAs="h3" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="more-title" className="bg-secondary/40 py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="more-title" className="display text-4xl md:text-5xl">
              More {g.label.toLowerCase()} treatments
            </h2>
            <Link href={g.path} className="arrow-nudge inline-flex items-center gap-2 text-sm font-semibold text-primary">
              All {g.label.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-10 border-t border-border">
            {siblings.map((s) => (
              <li key={s.id} className="border-b border-border">
                <Link href={treatmentHref(s.id)} className="group grid gap-1 py-6 md:grid-cols-[1fr_1.2fr_auto] md:items-baseline md:gap-8">
                  <span className="display text-2xl transition-transform duration-500 group-hover:translate-x-1.5">{s.name}</span>
                  <span className="text-muted-foreground">{s.short}</span>
                  <ArrowRight className="hidden h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 md:block" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SiteShell>
  );
}
