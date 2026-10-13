"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/data/site";
import { WordsReveal } from "@/components/ui/motion-kit";

export function Faq({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-border py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Questions</p>
          <Title id="faq-title" className="display mt-5 text-4xl md:text-5xl">
            <WordsReveal>
              Good to know
            </WordsReveal>
          </Title>
        </Reveal>
        <Reveal delay={0.06} className="lg:col-span-8">
          <Accordion.Root type="single" collapsible className="border-t border-border">
            {faqs.map((f, i) => (
              <Accordion.Item key={f.q} value={`q${i}`} className="border-b border-border">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left">
                    <span className="display text-xl md:text-2xl">{f.q}</span>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:border-foreground/40 group-data-[state=open]:rotate-45 group-data-[state=open]:border-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground"
                      aria-hidden
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="acc-content overflow-hidden">
                  <p className="max-w-2xl pb-7 pr-12 text-[1.02rem] leading-[1.75] text-muted-foreground">{f.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
