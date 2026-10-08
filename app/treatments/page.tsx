import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Treatments } from "@/components/treatments/treatments";
import { Reviews } from "@/components/reviews/reviews";

export const metadata: Metadata = {
  title: "Dental, skin & hair treatments in Jhotwara, Jaipur",
  description: "Root canal treatment, implants, braces & aligners, smile correction, acne, pigmentation, peels, HydraFacial, laser hair removal and hair PRP at Devkripa Healthcare, Jaipur.",
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <SiteShell crumb={{ label: "Treatments" }}>
      <Treatments titleAs="h1" />
      <Reviews />
    </SiteShell>
  );
}
