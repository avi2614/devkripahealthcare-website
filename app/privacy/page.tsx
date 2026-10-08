import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Devkripa Healthcare handles the information you share through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="October 2026">
      <p>
        This notice explains what happens to information you share through this website. It is a starting draft and
        should be reviewed by the clinic before the booking form is connected to a live system.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Your name and mobile number, so the clinic can confirm your appointment.</li>
        <li>Your email address, only if you choose to give it.</li>
        <li>The type of consultation, preferred date and time, and any short note you add.</li>
      </ul>
      <p>
        Please don&rsquo;t send detailed medical history through the website. That is best discussed with the doctor in
        person.
      </p>
      <h2>How it is used</h2>
      <p>
        Only to arrange and confirm your appointment. It is not sold or shared for marketing. If you choose to send your
        request on WhatsApp, WhatsApp&rsquo;s own privacy terms also apply to that message.
      </p>
      <h2>Current status of online booking</h2>
      <p>
        The booking form on this site is currently a demonstration and does not send or store your details anywhere.
        To book, please call or message the clinic.
      </p>
      <h2>Contact</h2>
      <p>
        For any question about your information, write to {contact.email} or call {contact.phoneDisplay}.
      </p>
    </LegalPage>
  );
}
