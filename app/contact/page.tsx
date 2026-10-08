import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Location } from "@/components/location/location";
import { Faq } from "@/components/faq/faq";
import { faqs } from "@/data/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export const metadata: Metadata = {
  title: "Contact & directions — Devkripa Healthcare, Jhotwara",
  description: "Address, phone, WhatsApp, email, map and opening hours for Devkripa Healthcare, Khirni Phatak Road, Jhotwara, Jaipur 302012. Open every day, 10:30 AM – 8:00 PM.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SiteShell crumb={{ label: "Contact" }}>
      <Location titleAs="h1" />
      <Faq />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </SiteShell>
  );
}
