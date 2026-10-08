import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Doctor } from "@/components/doctor/doctor";
import { Intro } from "@/components/intro/intro";
import { Reviews } from "@/components/reviews/reviews";
import { Community } from "@/components/community/community";

export const metadata: Metadata = {
  title: "Dr. Jahanvi Tyagi — Dental Surgeon & Clinical Cosmetologist",
  description: "Dr. Jahanvi Tyagi: BDS (Government Dental College, Nagpur, 2008), Fellowship in Facial Aesthetic Medicine (2018), Rajasthan Dental Council reg. A4243. Practising in Jhotwara, Jaipur.",
  alternates: { canonical: "/doctor" },
};

export default function DoctorPage() {
  return (
    <SiteShell crumb={{ label: "Doctor" }}>
      <Doctor titleAs="h1" />
      <Intro />
      <Community />
      <Reviews />
    </SiteShell>
  );
}
