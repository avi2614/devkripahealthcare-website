import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the Devkripa Healthcare website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="October 2026">
      <p>
        These terms are a starting draft and should be reviewed by the clinic before publication.
      </p>
      <h2>Medical information</h2>
      <p>
        Descriptions of treatments on this website are general information. They are not medical advice, and they are
        not a substitute for a consultation. Whether a treatment is right for you — and what results to expect — can
        only be decided after an examination.
      </p>
      <h2>Appointments</h2>
      <p>
        A request sent through this website is not a confirmed appointment. Your appointment is confirmed only when the
        clinic contacts you.
      </p>
      <h2>Photographs</h2>
      <p>
        Photographs marked as clinic photos were taken at Devkripa Healthcare. Other treatment images are licensed stock
        photography used for illustration and do not show the clinic&rsquo;s patients or results.
      </p>
      <h2>Contact</h2>
      <p>
        {contact.email} · {contact.phoneDisplay}
      </p>
    </LegalPage>
  );
}
