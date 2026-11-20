import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope, Newsreader } from "next/font/google";

import "react-day-picker/style.css";
import "lenis/dist/lenis.css";
import "./globals.css";

import { site } from "@/data/site";
import { clinicJsonLd, homeMeta } from "@/data/home-seo";
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

const title = homeMeta.title;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s — Devkripa Healthcare",
  },
  description: site.description,
  keywords: homeMeta.keywords,
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

        {/* Clinic and doctor schema (homepage SEO brief, Part 4.1) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(clinicJsonLd),
          }}
        />
      </body>
    </html>
  );
}
