import type { Metadata, Viewport } from "next";
import { Manrope, Outfit } from "next/font/google";
import "react-day-picker/style.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { contact, doctor, hours, site, treatments } from "@/data/site";
import { SiteHeader } from "@/components/navigation/site-header";
import { Footer } from "@/components/footer/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Loader } from "@/components/ui/loader";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollProgress, SpotlightTracker } from "@/components/ui/effects";
import { BackToTop } from "@/components/ui/motion-kit";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const title = "Devkripa Healthcare — Dentist & Cosmetologist in Jhotwara, Jaipur | Dr. Jahanvi Tyagi";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s — Devkripa Healthcare" },
  description: site.description,
  alternates: { canonical: "/" },
  keywords: [
    "dentist in Jhotwara",
    "dental clinic Jhotwara Jaipur",
    "cosmetologist Jaipur",
    "skin clinic Jhotwara",
    "root canal treatment Jaipur",
    "dental implants Jaipur",
    "hair PRP Jaipur",
    "Dr. Jahanvi Tyagi",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f8fc",
  width: "device-width",
  initialScale: 1,
};

const dayCodes = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Dentist", "MedicalClinic"],
      "@id": `${site.url}/#clinic`,
      name: `${site.name} — ${site.clinicName}`,
      url: site.url,
      image: `${site.url}/images/reception.webp`,
      telephone: "+918209011472",
      email: contact.email,
      currenciesAccepted: "INR",
      paymentAccepted: contact.payment.join(", "),
      address: {
        "@type": "PostalAddress",
        streetAddress: `${contact.address.line1}, ${contact.address.line2}, ${contact.address.line3}`,
        addressLocality: contact.address.city,
        addressRegion: contact.address.region,
        postalCode: contact.address.postalCode,
        addressCountry: contact.address.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng },
      hasMap: "https://maps.google.com/maps?q=26.93527211,75.72658185",
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: dayCodes, opens: hours.open, closes: hours.close },
      ],
      amenityFeature: contact.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
      sameAs: [contact.social.instagram, contact.social.facebook],
      availableService: treatments.map((t) => ({ "@type": "MedicalProcedure", name: t.name })),
      employee: { "@id": `${site.url}/#doctor` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#doctor`,
      name: doctor.name,
      jobTitle: doctor.title,
      image: `${site.url}/images/doctor-portrait.webp`,
      knowsLanguage: ["English", "Hindi"],
      worksFor: { "@id": `${site.url}/#clinic` },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Government Dental College, Nagpur" },
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "BDS (2008)" },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name: "Fellowship in Facial Aesthetic Medicine (2018)" },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: "Rajasthan Dental Council registration A4243",
          recognizedBy: { "@type": "Organization", name: "Rajasthan Dental Council" },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${manrope.variable} ${outfit.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <SpotlightTracker />
        <Loader />
        <SiteHeader />
        {children}
        <Footer />
        <WhatsAppButton />
        <BackToTop />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
