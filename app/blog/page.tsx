import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/ui/reveal";
import { blogCategories, sortedPosts } from "@/data/blog";
import { site } from "@/data/site";

const description =
  "Patient guides on dental, skin and hair care from Devkripa Healthcare, Jhotwara, Jaipur — root canals, implants, braces, melasma, acne scars, laser hair removal, hair PRP and more.";

export const metadata: Metadata = {
  title: "Blog — dental, skin & hair care guides",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: `${site.url}/blog`, title: "Devkripa Healthcare Blog", description },
};

export default function BlogPage() {
  const posts = sortedPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${site.url}/blog#blog`,
        name: "Devkripa Healthcare Blog",
        url: `${site.url}/blog`,
        description,
        publisher: { "@id": `${site.url}/#clinic` },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${site.url}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        ],
      },
    ],
  };

  return (
    <SiteShell crumb={{ label: "Blog" }}>
      <section aria-labelledby="blog-title" className="py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <p className="eyebrow">Blog</p>
              <h1 id="blog-title" className="display mt-5 text-5xl md:text-6xl">
                Guides for healthier teeth, skin &amp; hair
              </h1>
            </Reveal>
            <Reveal delay={0.06} className="self-end md:col-span-5 md:col-start-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Plain-language articles on the treatments we offer and the questions patients ask most. They&rsquo;re
                general information — for advice about you, book a consultation.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
                {blogCategories.map((c) => (
                  <li key={c} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                    {c} · {posts.filter((p) => p.category === c).length}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-16 border-t border-border pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SiteShell>
  );
}
