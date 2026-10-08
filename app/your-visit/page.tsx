import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { VisitSteps } from "@/components/experience/visit-steps";
import { Faq } from "@/components/faq/faq";

export const metadata: Metadata = {
  title: "Your visit — what a first appointment looks like",
  description: "What to expect at your first appointment with Dr. Jahanvi Tyagi at Devkripa Healthcare, Jhotwara.",
  alternates: { canonical: "/your-visit" },
};

export default function YourVisitPage() {
  return (
    <SiteShell crumb={{ label: "Your visit" }}>
      <VisitSteps titleAs="h1" />
      <Faq />
    </SiteShell>
  );
}
