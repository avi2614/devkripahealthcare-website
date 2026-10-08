import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/hero/hero";
import { Intro } from "@/components/intro/intro";
import { Doctor } from "@/components/doctor/doctor";
import { Treatments } from "@/components/treatments/treatments";
import { VisitSteps } from "@/components/experience/visit-steps";
import { Gallery } from "@/components/gallery/gallery";
import { Reviews } from "@/components/reviews/reviews";
import { Community } from "@/components/community/community";
import { Booking } from "@/components/appointment/booking";
import { Location } from "@/components/location/location";
import { Faq } from "@/components/faq/faq";
import { LatestPosts } from "@/components/blog/latest-posts";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Intro />
      <Doctor />
      <Treatments />
      <VisitSteps />
      <Gallery limit={6} />
      <Community />
      <Reviews />
      <Booking />
      <Location />
      <LatestPosts />
      <Faq />
    </SiteShell>
  );
}
