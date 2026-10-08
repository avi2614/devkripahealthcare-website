import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { PostBody, parseBody } from "@/components/blog/post-body";
import { PostCard } from "@/components/blog/post-card";
import { blogPosts, formatPostDate, getPost, readingMinutes, sortedPosts } from "@/data/blog";
import { contact, doctor, site, treatmentHref, treatments } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    authors: [{ name: site.name, url: site.url }],
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.category,
      tags: post.keywords,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const blocks = parseBody(post.body);
  const toc = blocks.filter((b) => b.type === "h2");
  const treatment = treatments.find((t) => t.id === post.treatmentId);
  const related = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  const url = `${site.url}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        image: `${site.url}${post.image}`,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "en-IN",
        mainEntityOfPage: url,
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        wordCount: post.body.split(/\s+/).length,
        author: { "@type": "Organization", name: site.name, url: site.url },
        publisher: { "@id": `${site.url}/#clinic` },
        isPartOf: { "@id": `${site.url}/blog#blog` },
        about: treatment ? { "@type": "MedicalProcedure", name: treatment.name } : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <SiteShell crumb={{ label: post.title, parent: { label: "Blog", href: "/blog" } }}>
      <article className="pb-24 md:pb-32">
        <header className="container-x max-w-4xl pt-10 md:pt-14">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="eyebrow !text-accent">{post.category}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{readingMinutes(post)} min read</span>
          </div>
          <h1 className="display mt-5 text-4xl leading-[1.08] md:text-6xl">{post.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{post.description}</p>
        </header>

        <div className="container-x mt-12 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="container-x mt-14 grid max-w-5xl gap-12 lg:grid-cols-[1fr_15rem]">
          <div className="min-w-0 max-w-[68ch]">
            <PostBody blocks={blocks} />

            <p className="mt-12 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
              This article is general information, not medical advice, and is not a substitute for a consultation.
              Treatment is always planned after an examination by {doctor.name}.
            </p>
          </div>

          <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            {toc.length > 0 && (
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="eyebrow">On this page</p>
                <ol className="mt-4 space-y-2.5 border-l border-border pl-4 text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-muted-foreground transition-colors hover:text-foreground">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="bg-secondary/70 p-6">
              <p className="eyebrow">Talk to the doctor</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed">
                {doctor.name} sees patients in Jhotwara, Jaipur — open every day.
              </p>
              {treatment && (
                <Link href={treatmentHref(treatment.id)} className="link-underline mt-4 inline-block text-sm font-medium text-primary">
                  About {treatment.name.toLowerCase()}
                </Link>
              )}
              <div className="mt-5 space-y-2">
                <Link href="/book" className="btn btn-primary w-full">
                  Book a consultation
                </Link>
                <a href={contact.phoneHref} className="btn btn-ghost w-full">
                  <Phone className="h-4 w-4" aria-hidden /> Call
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section aria-labelledby="related-title" className="border-t border-border bg-secondary/40 py-20 md:py-28">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-title" className="display text-4xl md:text-5xl">
              Keep reading
            </h2>
            <Link href="/blog" className="arrow-nudge inline-flex items-center gap-2 text-sm font-semibold text-primary">
              All articles <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} headingAs="h3" />
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SiteShell>
  );
}
