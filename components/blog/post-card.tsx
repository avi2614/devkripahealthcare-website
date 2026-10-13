import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPostDate, readingMinutes, type BlogPost } from "@/data/blog";
import { Tilt } from "@/components/ui/motion-kit";

export function PostCard({
  post,
  priority = false,
  headingAs: Heading = "h2",
}: {
  post: BlogPost;
  priority?: boolean;
  headingAs?: "h2" | "h3";
}) {
  return (
    <article className="group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col" aria-label={post.title}>
        <Tilt className="aspect-[4/3]" max={5}>
        <div className="relative h-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
        </Tilt>
        <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="eyebrow !text-accent">{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{readingMinutes(post)} min read</span>
        </div>
        <Heading className="display mt-3 text-2xl leading-tight transition-colors group-hover:text-primary md:text-[1.7rem]">
          {post.title}
        </Heading>
        <p className="mt-3 line-clamp-3 text-[0.97rem] leading-relaxed text-muted-foreground">{post.description}</p>
        <span className="arrow-nudge mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Read article <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </Link>
    </article>
  );
}
