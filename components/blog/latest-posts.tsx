import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/ui/reveal";
import { sortedPosts } from "@/data/blog";
import { WordsReveal } from "@/components/ui/motion-kit";

export function LatestPosts() {
  const posts = sortedPosts().slice(0, 3);
  return (
    <section aria-labelledby="latest-posts-title" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">From the blog</p>
            <h2 id="latest-posts-title" className="display mt-5 text-5xl md:text-6xl">
              <WordsReveal>
                Patient guides
              </WordsReveal>
            </h2>
          </div>
          <Link href="/blog" className="arrow-nudge inline-flex items-center gap-2 text-sm font-semibold text-primary">
            All articles <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} headingAs="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}
