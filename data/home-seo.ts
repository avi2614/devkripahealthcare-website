/**
 * Homepage SEO copy, taken word for word from "Devkripa Healthcare — Homepage SEO Content".
 * Words wrapped in **double asterisks** are target keywords and render bold (see components/ui/rich.tsx).
 * Keep headings and the first paragraph under each H2 exactly as written here.
 */

export const homeMeta = {
  title: "Dentist & Skin Clinic in Jhotwara, Jaipur | Dr. Jahanvi Tyagi",
  description:
    "Dental & skin clinic in Ashok Vihar, Jhotwara, Jaipur. Root canal, implants, braces, acne, pigmentation, laser & hair PRP with Dr. Jahanvi Tyagi. Open daily.",
  keywords: [
    "dentist in Jhotwara",
    "dental clinic Jhotwara Jaipur",
    "dentist in Jaipur",
    "skin clinic Jhotwara",
    "cosmetologist in Jaipur",
    "root canal treatment Jaipur",
    "dental implants Jaipur",
    "braces Jaipur",
    "hair PRP Jaipur",
    "laser hair removal Jaipur",
    "acne scar treatment Jaipur",
    "melasma treatment Jaipur",
    "Dr. Jahanvi Tyagi",
  ],
  canonical: "https://www.devkripahealthcare.com/",
};

/** 2.1 Hero */
export const hero = {
  h1: "Dentist and Skin Clinic in Jhotwara, Jaipur — Dr. Jahanvi Tyagi",
  intro:
    "**Devkripa Healthcare** (Dr. Jahanvi's Dermadent) is a **dental and skin clinic in Jhotwara, Jaipur**, led by **Dr. Jahanvi Tyagi**, a dental surgeon and clinical cosmetologist. The clinic is at **174/175, Sangh Shakti Road, opposite Tatkaleshwar Mahadev Mandir, Ashok Vihar Vistar, Jhotwara, Jaipur 302012**, and is **open every day, including Sunday, from 10:30 AM to 8:00 PM**.",
};

/** 2.2 About the doctor */
export const aboutDoctor = {
  h2: "Who is Dr. Jahanvi Tyagi, dentist and cosmetologist in Jaipur?",
  body:
    "**Dr. Jahanvi Tyagi** is a **dental surgeon** with a BDS from Government Dental College, Nagpur (MUHS Nashik, 2008) and a **Fellowship in Facial Aesthetic Medicine** from Mumbai (2018). She has been practising since 2008 and is registered with the **Rajasthan Dental Council (No. A4243)**. She treats **teeth, skin and hair** at one clinic, so she knows your history whether you come for a root canal or for melasma. Patients can consult her in **English or Hindi**.",
};

/** 2.3 Location */
export const locationIntro = {
  h2: "Where is Devkripa Healthcare located in Jaipur?",
  body:
    "The clinic is in **Ashok Vihar Vistar, Jhotwara**, on **Sangh Shakti Road**, **opposite Tatkaleshwar Mahadev Mandir**, within the Jaipur Nagar Nigam area. It is easy to reach for patients from **Jhotwara, Gokulpura, Khirni Phatak, Murlipura and Kalwar Road**. The clinic has a **wheelchair-accessible elevator** and accepts **cash and UPI**.",
};

export type HomeTreatment = { id: string; h3: string; body: string; href: string };

const DISCLAIMER = "Suitability, number of visits and results depend on your examination and individual case.";

/** 2.4 Dental treatments */
export const dentalSection = {
  h2: "Dental treatments in Jhotwara, Jaipur",
  intro:
    "Everyday dentistry and restorative work, from cleaning and root canals to implants, braces and smile correction, all by one doctor.",
  footnote: DISCLAIMER,
  items: [
    {
      id: "root-canal",
      h3: "Root canal treatment in Jhotwara, Jaipur",
      body: "A root canal treats a deeply decayed, cracked or infected tooth. The infected inside of the tooth is cleaned and sealed so the tooth can be saved instead of removed, and a **crown** is usually placed afterwards to protect it. Common signs are strong toothache, lingering sensitivity to hot or cold, and swelling.",
      href: "/dental-care/root-canal",
    },
    {
      id: "extraction",
      h3: "Tooth extraction and oral surgery",
      body: "Gentle removal of badly damaged or problematic teeth, and minor oral surgery when a tooth cannot be saved.",
      href: "/dental-care/extraction",
    },
    {
      id: "orthodontics",
      h3: "Braces and clear aligners in Jhotwara, Jaipur",
      body: "**Teeth straightening** and bite correction for crowding, gaps and uneven alignment. The right option is discussed after an examination.",
      href: "/dental-care/orthodontics",
    },
    {
      id: "smile-correction",
      h3: "Smile correction",
      body: "Treatment for gaps, uneven teeth and other things you would like to change in your smile.",
      href: "/dental-care/smile-correction",
    },
    {
      id: "veneers-bridges",
      h3: "Veneers, crowns and bridges",
      body: "Restore the look and function of damaged, discoloured or missing teeth.",
      href: "/dental-care/veneers-bridges",
    },
    {
      id: "implants",
      h3: "Dental implants in Jhotwara, Jaipur",
      body: "Implants replace missing teeth, from a **single tooth to a full arch**. Whether an implant or a bridge suits you is decided after examining your teeth, gums and jaw bone.",
      href: "/dental-care/implants",
    },
    {
      id: "cleaning-whitening",
      h3: "Scaling, polishing and teeth whitening",
      body: "Professional cleaning to remove plaque and tartar, plus **teeth whitening** for brighter teeth.",
      href: "/dental-care/cleaning-whitening",
    },
  ] satisfies HomeTreatment[],
};

/** 2.5 Skin and hair treatments */
export const skinSection = {
  h2: "Skin and hair treatments in Jaipur",
  intro:
    "Skin and hair concerns are assessed first, then a treatment plan is explained so you can choose with confidence.",
  footnote: DISCLAIMER,
  items: [
    {
      id: "acne",
      h3: "Acne and acne scar treatment in Jaipur",
      body: "Evaluation of the cause and a treatment plan for active acne and acne scars.",
      href: "/skin-care/acne",
    },
    {
      id: "pigmentation",
      h3: "Melasma and pigmentation treatment in Jhotwara",
      body: "Treatment of dark patches and uneven skin tone using a mix of sunscreen guidance, creams, **chemical peels** and **laser toning**, depending on the case.",
      href: "/skin-care/pigmentation",
    },
    {
      id: "chemical-peels",
      h3: "Chemical peels",
      body: "For pigmentation, dull skin and texture concerns.",
      href: "/skin-care/chemical-peels",
    },
    {
      id: "microneedling",
      h3: "Microneedling",
      body: "For acne scars and skin texture.",
      href: "/skin-care/microneedling",
    },
    {
      id: "medi-facials",
      h3: "HydraFacial and medi-facials",
      body: "Includes **HydraFacial, carbon facial and PRP facial** for cleansing and skin rejuvenation.",
      href: "/skin-care/medi-facials",
    },
    {
      id: "microdermabrasion",
      h3: "Microdermabrasion",
      body: "Gentle exfoliation for smoother skin.",
      href: "/skin-care/microdermabrasion",
    },
    {
      id: "laser-hair-removal",
      h3: "Laser hair removal in Jaipur",
      body: "Reduces unwanted hair. It usually needs more than one session.",
      href: "/skin-care/laser-hair-removal",
    },
    {
      id: "hair",
      h3: "Hair PRP and hair transplant in Jaipur",
      body: "Options for **hair fall** and thinning, chosen after a scalp examination.",
      href: "/skin-care/hair",
    },
    {
      id: "skin-procedures",
      h3: "Mole, wart, skin tag and tattoo removal",
      body: "Minor skin procedures done at the clinic.",
      href: "/skin-care/skin-procedures",
    },
  ] satisfies HomeTreatment[],
};

/** 2.6 First visit */
export const firstVisit = {
  h2: "What to expect at your first visit",
  body:
    "Dr. Jahanvi listens first, then examines your teeth, skin or scalp and explains what she sees. She goes through the treatment options with you so the decision is yours. Root canals, braces, peels and laser sessions usually need more than one visit, and because the clinic is **open all seven days**, follow-ups are easier to fit around work and family.",
};

/** 2.7 Contact block */
export const contactBlock = {
  h2: "Visit Devkripa Healthcare in Jhotwara",
  name: "Devkripa Healthcare",
  address: "174/175, Sangh Shakti Rd, opposite Tatkaleshwar Mahadev Mandir, Ashok Vihar Vistar, Jhotwara, Jaipur, Rajasthan 302012",
  phoneLabel: "Phone and WhatsApp",
  hoursText: "Monday to Sunday, 10:30 AM to 8:00 PM",
  paymentText: "Cash and UPI",
};

/** Part 3 heading (questions live in data/site.ts → faqs) */
export const faqHeading = "Frequently asked questions about dental and skin care in Jhotwara, Jaipur";

/** Part 4.1 — clinic and doctor schema, exactly as supplied. */
export const clinicJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Dentist", "MedicalClinic"],
      "@id": "https://www.devkripahealthcare.com/#clinic",
      name: "Devkripa Healthcare",
      alternateName: "Dr. Jahanvi's Dermadent",
      url: "https://www.devkripahealthcare.com/",
      logo: "https://www.devkripahealthcare.com/brand/devkripa-logo.png",
      description:
        "Dental and skin clinic in Ashok Vihar, Jhotwara, Jaipur, led by Dr. Jahanvi Tyagi. Root canal, implants, braces, acne, pigmentation, laser hair removal and hair PRP.",
      telephone: "+91-82090-11472",
      email: "dev.kripahealthcare@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "174/175, Sangh Shakti Rd, opposite Tatkaleshwar Mahadev Mandir, Ashok Vihar Vistar",
        addressLocality: "Jhotwara, Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302012",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.93527211,
        longitude: 75.72658185,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "10:30",
          closes: "20:00",
        },
      ],
      paymentAccepted: "Cash, UPI",
      areaServed: ["Jhotwara", "Jaipur"],
      sameAs: ["https://www.instagram.com/dermadentt/", "https://www.facebook.com/Dr.jahanvisdermadent"],
      employee: { "@id": "https://www.devkripahealthcare.com/#doctor" },
    },
    {
      "@type": "Person",
      "@id": "https://www.devkripahealthcare.com/#doctor",
      name: "Dr. Jahanvi Tyagi",
      jobTitle: "Dental Surgeon & Clinical Cosmetologist",
      worksFor: { "@id": "https://www.devkripahealthcare.com/#clinic" },
      knowsLanguage: ["English", "Hindi"],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Government Dental College, Nagpur",
      },
    },
  ],
};

/** Part 5 — image alt text */
export const altText = {
  doctorPortrait: "Dr. Jahanvi Tyagi, dental surgeon and cosmetologist in Jhotwara, Jaipur",
  dentalOperatory: "Dental operatory at Devkripa Healthcare, dental clinic in Jhotwara, Jaipur",
  skinLaserRoom: "Skin and laser treatment room at Devkripa Healthcare, Jhotwara, Jaipur",
  reception: "Reception at Devkripa Healthcare dental and skin clinic, Jhotwara",
  building: "Devkripa Healthcare clinic building, Ashok Vihar Vistar, Jhotwara, Jaipur",
  campDentalCheckup: "Free dental check-up camp for school students by Dr. Jahanvi Tyagi, Jaipur",
};
