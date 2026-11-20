import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/hero/hero";
import { TreatmentMarquee } from "@/components/hero/treatment-marquee";
import { Intro } from "@/components/intro/intro";
import { Doctor } from "@/components/doctor/doctor";
import { LocationIntro } from "@/components/home/location-intro";
import { TreatmentSections } from "@/components/home/treatment-sections";
import { VisitSteps } from "@/components/experience/visit-steps";
import { PhotoStrip } from "@/components/gallery/photo-strip";
import { Reviews } from "@/components/reviews/reviews";
import { Community } from "@/components/community/community";
import { Booking } from "@/components/appointment/booking";
import { Location } from "@/components/location/location";
import { Faq } from "@/components/faq/faq";
import { LatestPosts } from "@/components/blog/latest-posts";
import { faqJsonLd } from "@/data/site";
import { homeMeta } from "@/data/home-seo";

// Part 1 — head tags
export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
  keywords: homeMeta.keywords,
  alternates: { canonical: homeMeta.canonical },
  openGraph: {
    type: "website",
    url: homeMeta.canonical,
    title: homeMeta.title,
    description: homeMeta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: homeMeta.title,
    description: homeMeta.description,
  },
};

/**
 * Section order follows Part 2 of the homepage SEO brief:
 * hero (H1) → doctor → location → dental → skin & hair → first visit → contact → FAQ.
 */
export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <TreatmentMarquee />
      <Intro />
      <Doctor />
      <LocationIntro />
      <TreatmentSections />
      <VisitSteps />
      <PhotoStrip />
      <Community />
      <Reviews />
      <LatestPosts />
      <Booking />
      <Location />
      <Faq />

      {/* Part 4.2 — FAQ schema, generated from the same list the FAQ section renders */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </SiteShell>
  );
}
