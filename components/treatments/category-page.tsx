import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Reveal } from "@/components/ui/reveal";
import { site, treatmentGroups, treatmentHref, treatments, type TreatmentGroup } from "@/data/site";

export function categoryMetadata(group: TreatmentGroup): Metadata {
  const g = treatmentGroups[group];
  const names = treatments.filter((t) => t.group === group).map((t) => t.name.toLowerCase());
  const description = `${g.intro} ${names.slice(0, 6).join(", ")} and more at Devkripa Healthcare, Jhotwara, Jaipur.`;
  return {
    title: g.title,
    description,
    alternates: { canonical: g.path },
    openGraph: { url: `${site.url}${g.path}`, title: g.title, description, images: [{ url: g.image, alt: g.imageAlt }] },
  };
}

/** All treatments in one wing, each linking to its own page. */
export function CategoryPage({ group }: { group: TreatmentGroup }) {
  const g = treatmentGroups[group];
  const list = treatments.filter((t) => t.group === group);
  const other = treatmentGroups[group === "dental" ? "skin" : "dental"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: g.title,
        itemListElement: list.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          url: `${site.url}${treatmentHref(t.id)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: g.label, item: `${site.url}${g.path}` },
        ],
      },
    ],
  };

  return (
    <SiteShell crumb={{ label: g.label }}>
      <section aria-labelledby="category-title" className="py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <p className="eyebrow">{g.label}</p>
              <h1 id="category-title" className="display mt-5 text-5xl md:text-6xl">
                {g.title}
              </h1>
            </Reveal>
            <Reveal delay={0.06} className="self-end md:col-span-5 md:col-start-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {g.intro} Every treatment starts with a consultation — choose one to read more.
              </p>
            </Reveal>
          </div>

          <ul className="mt-16 grid gap-x-8 gap-y-14 border-t border-border pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((t, i) => (
              <li key={t.id}>
                <Link href={treatmentHref(t.id)} className="group flex h-full flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={t.image}
                      alt={t.imageAlt}
                      fill
                      priority={i < 3}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="mt-5 text-xs font-semibold tabular-nums tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display mt-2 text-2xl leading-tight transition-colors group-hover:text-primary md:text-[1.75rem]">
                    {t.name}
                  </h2>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-muted-foreground">{t.short}</p>
                  <span className="arrow-nudge mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    View treatment <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 md:flex-row md:items-center">
            <p className="text-lg text-muted-foreground">
              Looking for something else?{" "}
              <Link href={other.path} className="link-underline text-foreground">
                See {other.label.toLowerCase()} treatments
              </Link>
            </p>
            <Link href="/book" className="btn btn-primary arrow-nudge">
              Book a consultation <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SiteShell>
  );
}
