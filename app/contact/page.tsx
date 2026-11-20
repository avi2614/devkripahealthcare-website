import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Location } from "@/components/location/location";
import { Faq } from "@/components/faq/faq";

export const metadata: Metadata = {
  title: "Contact & directions — Devkripa Healthcare, Jhotwara",
  description: "Address, phone, WhatsApp, email, map and opening hours for Devkripa Healthcare, 174/175, Sangh Shakti Rd, opposite Tatkaleshwar Mahadev Mandir, Ashok Vihar Vistar, Jhotwara, Jaipur 302012. Open every day, 10:30 AM – 8:00 PM.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SiteShell crumb={{ label: "Contact" }}>
      <Location titleAs="h1" />
      <Faq />
    </SiteShell>
  );
}
