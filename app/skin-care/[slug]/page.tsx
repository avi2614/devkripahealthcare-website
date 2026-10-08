import type { Metadata } from "next";
import { TreatmentPage, treatmentMetadata, treatmentParams } from "@/components/treatments/treatment-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return treatmentParams("skin");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return treatmentMetadata("skin", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <TreatmentPage group="skin" slug={(await params).slug} />;
}
