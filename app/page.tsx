import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/hero/hero";
import { TreatmentMarquee } from "@/components/hero/treatment-marquee";
import { Intro } from "@/components/intro/intro";
import { Doctor } from "@/components/doctor/doctor";
import { Treatments } from "@/components/treatments/treatments";
import { VisitSteps } from "@/components/experience/visit-steps";
import { PhotoStrip } from "@/components/gallery/photo-strip";
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
      <TreatmentMarquee />
      <Intro />
      <Doctor />
      <Treatments />
      <VisitSteps />
      <PhotoStrip />
      <Community />
      <Reviews />
      <Booking />
      <Location />
      <LatestPosts />
      <Faq />
    </SiteShell>
  );
}
