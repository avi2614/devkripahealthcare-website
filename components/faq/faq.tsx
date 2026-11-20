import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { faqGroups, faqs } from "@/data/site";
import { faqHeading } from "@/data/home-seo";
import { WordsReveal } from "@/components/ui/motion-kit";

/**
 * FAQ (homepage Part 3). Native <details> so every question and answer is in the server HTML —
 * the FAQPage schema must match text that is actually on the page.
 */
export function Faq({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-border py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Questions</p>
            <Title id="faq-title" className="display mt-5 text-4xl leading-[1.1] md:text-[2.75rem]">
              <WordsReveal>{faqHeading}</WordsReveal>
            </Title>
          </div>
        </Reveal>
        <div className="space-y-14 lg:col-span-8">
          {faqGroups.map((group) => (
            <Reveal key={group}>
              <h3 className="eyebrow">{group}</h3>
              <div className="mt-4 border-t border-border">
                {faqs
                  .filter((f) => f.group === group)
                  .map((f) => (
                    <details key={f.q} className="group border-b border-border">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                        <span className="display text-xl md:text-2xl">{f.q}</span>
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:border-foreground/40 group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-primary-foreground"
                          aria-hidden
                        >
                          <Plus className="h-4 w-4" />
                        </span>
                      </summary>
                      <p className="max-w-2xl pb-7 pr-12 text-[1.02rem] leading-[1.75] text-muted-foreground">{f.a}</p>
                    </details>
                  ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
