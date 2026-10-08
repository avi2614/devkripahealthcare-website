import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Gallery } from "@/components/gallery/gallery";
import { Intro } from "@/components/intro/intro";

export const metadata: Metadata = {
  title: "Inside the clinic — photos of Devkripa Healthcare",
  description: "Photographs of Devkripa Healthcare on Khirni Phatak Road, Jhotwara: reception, dental operatory, skin & laser room and the team.",
  alternates: { canonical: "/clinic" },
};

export default function ClinicPage() {
  return (
    <SiteShell crumb={{ label: "Clinic" }}>
      <Gallery titleAs="h1" limit={6} />
      <Intro />
    </SiteShell>
  );
}
