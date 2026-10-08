import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Gallery } from "@/components/gallery/gallery";

export const metadata: Metadata = {
  title: "Gallery — photos of Devkripa Healthcare, Jhotwara",
  description:
    "Photographs of Devkripa Healthcare: Dr. Jahanvi Tyagi at work, the dental operatory, skin & laser room, reception, the team and community health camps.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <SiteShell crumb={{ label: "Gallery" }}>
      <Gallery titleAs="h1" eyebrow="Gallery" id="gallery" />
    </SiteShell>
  );
}
