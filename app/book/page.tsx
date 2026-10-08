import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Booking } from "@/components/appointment/booking";
import { Faq } from "@/components/faq/faq";

export const metadata: Metadata = {
  title: "Book an appointment",
  description: "Request a dental, skin or hair consultation with Dr. Jahanvi Tyagi at Devkripa Healthcare, Jaipur.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <SiteShell crumb={{ label: "Book appointment" }}>
      <Booking titleAs="h1" />
      <Faq />
    </SiteShell>
  );
}
