import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope, Newsreader } from "next/font/google";

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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

const title =
  "Devkripa Healthcare — Dentist & Cosmetologist in Jhotwara, Jaipur | Dr. Jahanvi Tyagi";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s — Devkripa Healthcare",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
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
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "Pjol-d_0iWSLCmY9Bwfe9-Uyhfrk4atTk4jfia9VPiM",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f1ea",
  width: "device-width",
  initialScale: 1,
};

const dayCodes = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Dr.Jahanvi's Dermadent Skin Clinic",
  image:
    "https://www.devkripahealthcare.com/_next/image?url=%2Fimages%2Fdoctor-treating-2.webp&w=1920&q=70",
  "@id": "",
  url: "https://share.google/BGPl0oZhvqzWGLWSG",
  telephone: "82090 11472",
  priceRange: "500-34500",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "174/175, Sangh Shakti Rd, opposite Tatkaleshwar Mahadev Mandir, Ashok Vihar Vistar, Jhotwara, Jaipur, Jaipur Nagar Nigam",
    addressLocality: "Jaipur",
    postalCode: "302016",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.935465075653372,
    longitude: 75.72671169582856,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "21:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:30",
      closes: "20:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/Dr.jahanvisdermadent",
    "https://www.instagram.com/dermadentt/",
  ],
};

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
      geo: {
        "@type": "GeoCoordinates",
        latitude: contact.geo.lat,
        longitude: contact.geo.lng,
      },
      hasMap: "https://maps.google.com/maps?q=26.93527211,75.72658185",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayCodes,
          opens: hours.open,
          closes: hours.close,
        },
      ],
      amenityFeature: contact.amenities.map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a,
        value: true,
      })),
      sameAs: [contact.social.instagram, contact.social.facebook],
      availableService: treatments.map((t) => ({
        "@type": "MedicalProcedure",
        name: t.name,
      })),
      employee: {
        "@id": `${site.url}/#doctor`,
      },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#doctor`,
      name: doctor.name,
      jobTitle: doctor.title,
      image: `${site.url}/images/doctor-portrait.webp`,
      knowsLanguage: ["English", "Hindi"],
      worksFor: {
        "@id": `${site.url}/#clinic`,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Government Dental College, Nagpur",
      },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "BDS (2008)",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certificate",
          name: "Fellowship in Facial Aesthetic Medicine (2018)",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: "Rajasthan Dental Council registration A4243",
          recognizedBy: {
            "@type": "Organization",
            name: "Rajasthan Dental Council",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${newsreader.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="Pjol-d_0iWSLCmY9Bwfe9-Uyhfrk4atTk4jfia9VPiM"
        />
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-58VFMQTJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-58VFMQTJ');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DNM6RDG3H6"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DNM6RDG3H6');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){
                (c[a].q=c[a].q||[]).push(arguments)
              };
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yxniwgs4hq");
          `}
        </Script>

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

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />

        {/* Clinic and Doctor Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  );
}
