/**
 * Single source of truth for clinic content.
 * Everything here comes from the clinic's existing website export
 * (README.md, pages/*.md, structured-data.md). Do not add claims,
 * statistics or credentials that are not in those sources.
 */

export const site = {
  url: "https://www.devkripahealthcare.com",
  name: "Devkripa Healthcare",
  clinicName: "Dr. Jahanvi's Dermadent",
  tagline: "Dental, skin & hair care in Jhotwara, Jaipur",
  description:
    "Dental & skin clinic in Ashok Vihar, Jhotwara, Jaipur. Root canal, implants, braces, acne, pigmentation, laser & hair PRP with Dr. Jahanvi Tyagi. Open daily.",
};

export const doctor = {
  name: "Dr. Jahanvi Tyagi",
  firstName: "Dr. Jahanvi",
  title: "Dental Surgeon & Clinical Cosmetologist",
  specialties: ["Dental surgeon", "Cosmetologist"],
  practisingSince: 2008,
  /** Biography as supplied by the clinic. */
  about: [
    "Dr. Jahanvi has been practising as a dentist and cosmetologist since 2008, after graduating from the prestigious Government Dental College Nagpur, affiliated with MUHS Nashik. Her unparalleled proficiency encompasses a diverse spectrum of dental services, including but not limited to smile enhancement, tooth restoration via capping, root canal therapy, correction of malocclusion, and precise placement of implants, effectively addressing a comprehensive array of oral health concerns.",
    "Beyond her exceptional dental specialization, Dr. Jahanvi has pursued rigorous further training, culminating in a fellowship in facial aesthetic medicine from Mumbai. Her unwavering commitment extends to dermatological matters, where she adeptly addresses concerns such as melasma, pigmentation irregularities, acne scarring, uneven skin tone, wrinkles, and signs of aging. Dr. Jahanvi offers an expansive repertoire of advanced facial treatments, including HydraFacial, carbon facial, PRP facial, alongside cutting-edge services like laser hair removal and tattoo removal.",
    "Moreover, she seamlessly integrates her expertise to provide comprehensive solutions for hair-related issues, offering tailored interventions for hair fall problems, PRP therapy, and hair transplants. Dr. Jahanvi is dedicated to delivering holistic care, ensuring her patients receive the highest standard of treatment for both their dental and aesthetic needs.",
  ],
  languages: ["English", "हिंदी (Hindi)"],
  education: [
    { year: "2018", award: "FFAC — Fellowship in Facial Aesthetic Medicine", place: "Mumbai" },
    { year: "2008", award: "BDS — Bachelor of Dental Surgery", place: "Government Dental College, Nagpur (MUHS Nashik)" },
  ],
  registration: { number: "A4243", body: "Rajasthan Dental Council", year: "2008" },
  dentalFocus: [
    "Smile correction",
    "Tooth capping (crowns)",
    "Root canal treatment",
    "Malocclusion correction",
    "Implants",
  ],
  skinFocus: [
    "Melasma & pigmentation",
    "Acne scars",
    "Uneven skin tone",
    "Wrinkles & signs of ageing",
    "Hair fall",
  ],
};

export const contact = {
  phoneDisplay: "+91 82090 11472",
  phoneHref: "tel:+918209011472",
  whatsappNumber: "918209011472",
  email: "dev.kripahealthcare@gmail.com",
  address: {
    line1: "174/175, Sangh Shakti Rd",
    line2: "opposite Tatkaleshwar Mahadev Mandir",
    line3: "Ashok Vihar Vistar, Jhotwara",
    city: "Jaipur",
    region: "Rajasthan",
    postalCode: "302012",
    country: "IN",
  },
  geo: { lat: 26.93527211, lng: 75.72658185 },
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Dr%20jahanvi%27s%20dermadent&query_place_id=ChIJD-tIDDizbTkRwgbRq8-YXwk",
  mapEmbedUrl: "https://maps.google.com/maps?q=26.93527211,75.72658185&z=16&output=embed",
  social: {
    instagram: "https://www.instagram.com/dermadentt/",
    facebook: "https://www.facebook.com/Dr.jahanvisdermadent",
  },
  payment: ["Cash", "UPI"],
  amenities: ["Wheelchair-accessible elevator", "Gender-neutral restroom", "Restroom"],
};

export const whatsappLink = (text = "Hi, I'd like to book an appointment.") =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;

/** Clinic is open the same hours all seven days. */
export const hours = {
  open: "10:30",
  close: "20:00",
  label: "10:30 AM – 8:00 PM",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
};

export type TreatmentGroup = "dental" | "skin";

export type Treatment = {
  id: string;
  group: TreatmentGroup;
  name: string;
  short: string;
  detail: string;
  /** What the treatment helps with — shown on its own page. */
  concerns: string[];
  includes?: string[];
  image: string;
  imageAlt: string;
  /** true when the photo is the clinic's own, false when it is licensed stock */
  clinicPhoto: boolean;
  /** Optional clip filmed at the clinic, shown on the treatment page. */
  video?: { src: string; poster: string; title: string; caption: string };
  /**
   * Real before/after photos (with patient consent), e.g. "/images/before-after/acne-before.webp".
   * When absent, the treatment page shows an illustrative comparison built from `image`.
   */
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
    /** Set for openly licensed photos of people who are not clinic patients; omit for the clinic's own consented photos. */
    credit?: { author: string; license: string; licenseUrl: string; source: string; sourceName: string };
  };
};

export const treatmentGroups: Record<
  TreatmentGroup,
  { label: string; path: string; title: string; intro: string; image: string; imageAlt: string }
> = {
  dental: {
    label: "Dental care",
    path: "/dental-care",
    title: "Dental treatments in Jhotwara, Jaipur",
    intro:
      "Everyday dentistry and restorative work, from cleaning and root canals to implants, braces and smile correction, all by one doctor.",
    image: "/images/doctor-treating-3.webp",
    imageAlt: "Dr. Jahanvi Tyagi treating a patient in the dental chair at the clinic",
  },
  skin: {
    label: "Skin & hair",
    path: "/skin-care",
    title: "Skin and hair treatments in Jaipur",
    intro:
      "Skin and hair concerns are assessed first, then a treatment plan is explained so you can choose with confidence.",
    image: "/images/skin-laser-room.webp",
    imageAlt: "Skin and laser treatment room at Devkripa Healthcare, Jhotwara, Jaipur",
  },
};

export const treatments: Treatment[] = [
  // ——— Dental ———
  {
    id: "root-canal",
    group: "dental",
    name: "Root canal treatment",
    short: "Saving a damaged or infected tooth instead of removing it.",
    concerns: [
      "Lingering pain with hot or cold food",
      "Toothache that throbs or wakes you at night",
      "Swelling or a gum boil near a tooth",
      "A deep cavity or cracked tooth reaching the nerve",
    ],
    detail:
      "When decay or infection reaches the inside of a tooth, a root canal cleans and seals it so the natural tooth can stay. It is usually followed by a cap (crown) to protect it.",
    includes: ["RCT", "Tooth capping / crowns"],
    image: "/images/doctor-treating-2.webp",
    imageAlt: "Dr. Jahanvi Tyagi examining a patient's teeth",
    clinicPhoto: true,
  },
  {
    id: "extraction",
    group: "dental",
    name: "Tooth extraction & oral surgery",
    short: "Gentle extractions and minor tooth surgery.",
    concerns: [
      "Teeth too broken or decayed to save",
      "Impacted or painful wisdom teeth",
      "Loose teeth from advanced gum disease",
      "Teeth removed as part of orthodontic treatment",
    ],
    detail:
      "Some teeth can't be saved, and some — like impacted wisdom teeth — are better out. Extractions and minor oral surgery are done at the clinic, with your comfort kept in mind throughout.",
    includes: ["Extraction", "Tooth surgeries"],
    image: "/images/doctor-treating-4.webp",
    imageAlt: "Dr. Jahanvi Tyagi treating a patient seated in the dental chair",
    clinicPhoto: true,
  },
  {
    id: "orthodontics",
    beforeAfter: {
      before: "/images/before-after/photos/orthodontics-before.webp",
      after: "/images/before-after/photos/orthodontics-after.webp",
      beforeLabel: "Crooked, crowded teeth",
      afterLabel: "After orthodontic treatment",
      credit: { author: "Jeffrey Dorfman", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", source: "https://commons.wikimedia.org/wiki/File:Before_and_After_Photos_following_Orthodontic_Treatment_-_Teeth_Braces.jpg", sourceName: "Wikimedia Commons" },
    },
    group: "dental",
    name: "Braces & clear aligners",
    short: "Straightening teeth and correcting the bite.",
    concerns: [
      "Crowded or overlapping teeth",
      "Gaps between teeth",
      "Overbite, underbite or crossbite",
      "Teeth that are hard to clean because of crowding",
    ],
    detail:
      "Orthodontic treatment for crowded, gapped or misaligned teeth and bite problems (malocclusion) — with traditional braces or clear aligners, depending on what suits you.",
    includes: ["Braces", "Clear aligners", "Malocclusion correction"],
    image: "/images/px-braces-model.webp",
    imageAlt: "A dentist holding a dental model fitted with braces",
    clinicPhoto: false,
  },
  {
    id: "smile-correction",
    group: "dental",
    name: "Smile correction",
    short: "Addressing gaps, uneven teeth and other things you'd like to change.",
    concerns: [
      "Gaps, chips or uneven edges",
      "Stained or discoloured teeth",
      "Teeth of uneven length or shape",
      "A smile you feel self-conscious about",
    ],
    detail:
      "Smile correction brings together whichever treatments your smile needs — closing gaps, reshaping, aligning or restoring teeth — planned around what bothers you most.",
    image: "/images/px-smile-check.webp",
    imageAlt: "A dentist matching tooth shade for a patient in the dental chair",
    clinicPhoto: false,
  },
  {
    id: "veneers-bridges",
    beforeAfter: {
      before: "/images/before-after/photos/veneers-bridges-before.webp",
      after: "/images/before-after/photos/veneers-bridges-after.webp",
      beforeLabel: "Worn, discoloured front teeth",
      afterLabel: "After veneers",
      credit: { author: "Yvul", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", source: "https://commons.wikimedia.org/wiki/File:Faccette_estetiche_confronto_prima_e_dopo.jpg", sourceName: "Wikimedia Commons" },
    },
    group: "dental",
    name: "Veneers, crowns & bridges",
    short: "Restoring the look and function of damaged or missing teeth.",
    concerns: [
      "Chipped, cracked or worn teeth",
      "Discoloured teeth that don't respond to whitening",
      "Teeth weakened by large fillings or a root canal",
      "A missing tooth between healthy teeth",
    ],
    detail:
      "Veneers cover the front of discoloured or chipped teeth; crowns cap weakened ones; bridges replace a missing tooth by anchoring to the teeth beside it. Each is shade-matched to your natural teeth.",
    includes: ["Veneers", "Crowns", "Bridges", "Tooth colouring"],
    image: "/images/px-shade-guide.webp",
    imageAlt: "A patient smiling while a dentist holds up a tooth shade guide",
    clinicPhoto: false,
  },
  {
    id: "implants",
    group: "dental",
    name: "Dental implants",
    short: "Replacing missing teeth, from a single tooth to a full arch.",
    concerns: [
      "A single missing tooth",
      "Several missing teeth",
      "Loose or uncomfortable dentures",
      "Full-mouth restoration",
    ],
    detail:
      "An implant replaces the root of a missing tooth and holds a crown on top. Implants can replace one tooth or support a full-mouth restoration.",
    image: "/images/dental-operatory.webp",
    imageAlt: "Dental operatory at Devkripa Healthcare, dental clinic in Jhotwara, Jaipur",
    clinicPhoto: true,
  },
  {
    id: "cleaning-whitening",
    beforeAfter: {
      before: "/images/before-after/photos/cleaning-whitening-before.webp",
      after: "/images/before-after/photos/cleaning-whitening-after.webp",
      beforeLabel: "Heavy tartar build-up",
      afterLabel: "Tartar removed",
      credit: { author: "Bugmore", license: "Public domain", licenseUrl: "https://commons.wikimedia.org/wiki/File:Periogen_Tartar_Dissolution_Study,_day_0.jpg", source: "https://commons.wikimedia.org/wiki/File:Periogen_Tartar_Dissolution_Study,_day_90.jpg", sourceName: "Wikimedia Commons" },
    },
    group: "dental",
    name: "Scaling, polishing & whitening",
    short: "Professional cleaning and teeth whitening.",
    concerns: [
      "Tartar and plaque build-up",
      "Bleeding or swollen gums",
      "Bad breath",
      "Stained or yellowed teeth",
    ],
    detail:
      "Scaling removes hardened plaque and tartar that brushing can't; polishing leaves teeth smooth and clean. Teeth whitening is available for stains and discolouration.",
    includes: ["Scaling", "Polishing", "Teeth whitening"],
    image: "/images/doctor-treating-1.webp",
    imageAlt: "Dr. Jahanvi Tyagi working on a patient under the dental light",
    clinicPhoto: true,
  },

  // ——— Skin & hair ———
  {
    id: "acne",
    beforeAfter: {
      before: "/images/before-after/photos/acne-before.webp",
      after: "/images/before-after/photos/acne-after.webp",
      beforeLabel: "Active acne breakouts",
      afterLabel: "Clearer skin",
      credit: { author: "kylieaquino01", license: "Public Domain Mark 1.0", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", source: "https://www.flickr.com/photos/149720488@N03/34183392056", sourceName: "Flickr" },
    },
    group: "skin",
    name: "Acne & acne scars",
    short: "Treating active breakouts and the marks they leave.",
    concerns: [
      "Active pimples, blackheads and whiteheads",
      "Painful cystic acne",
      "Dark marks left after acne",
      "Pitted or uneven acne scars",
    ],
    detail:
      "Acne treatment is planned around your skin — it may combine topical or oral medication, chemical peels and other procedures. Acne scars and marks are treated separately once breakouts are under control.",
    image: "/images/px-skin-consult.webp",
    imageAlt: "A cosmetologist examining a patient's skin during a consultation",
    clinicPhoto: false,
  },
  {
    id: "pigmentation",
    group: "skin",
    name: "Melasma & pigmentation",
    short: "For dark patches, uneven tone and dullness.",
    concerns: [
      "Melasma patches on the cheeks and forehead",
      "Sun spots and tanning",
      "Dark marks after acne or injury",
      "Dull, uneven skin tone",
    ],
    detail:
      "Melasma, pigmentation and uneven skin tone are among the concerns Dr. Jahanvi treats most. Options include peels, laser toning and skin-rejuvenation treatments.",
    includes: ["Laser toning", "Skin rejuvenation", "Whitening treatments"],
    image: "/images/px-laser-toning.webp",
    imageAlt: "A practitioner performing a laser skin treatment on a patient wearing protective glasses",
    clinicPhoto: false,
  },
  {
    id: "chemical-peels",
    group: "skin",
    name: "Chemical peels",
    short: "Controlled exfoliation for scars, pigmentation and fine lines.",
    concerns: [
      "Acne marks and mild scarring",
      "Pigmentation and uneven tone",
      "Fine lines",
      "Dull, rough skin texture",
    ],
    detail:
      "A peel solution removes the outer layer of dead skin cells. Peels range from superficial to deeper ones and are chosen for concerns like acne marks, uneven pigmentation and fine lines.",
    image: "/images/px-chemical-peel.webp",
    imageAlt: "A peel solution being brushed onto a patient's face",
    clinicPhoto: false,
  },
  {
    id: "microneedling",
    group: "skin",
    name: "Microneedling",
    short: "Stimulating the skin's own repair to improve texture.",
    concerns: [
      "Depressed acne scars",
      "Large pores",
      "Fine lines and wrinkles",
      "Uneven texture",
    ],
    detail:
      "Fine needles create tiny, controlled punctures that prompt the skin to produce collagen. It is used for acne scars, wrinkles and pigmentation, with little downtime.",
    image: "/images/px-microneedling.webp",
    imageAlt: "A microneedling treatment on a patient's cheek",
    clinicPhoto: false,
  },
  {
    id: "medi-facials",
    group: "skin",
    name: "HydraFacial & medi-facials",
    short: "Deep cleansing, exfoliation and hydration in one session.",
    concerns: [
      "Dull or tired-looking skin",
      "Clogged pores and blackheads",
      "Dehydrated skin",
      "A glow before an event",
    ],
    detail:
      "HydraFacial cleanses, exfoliates, extracts and hydrates the skin using suction and serums. Other medi-facials offered include carbon facials and PRP facials.",
    includes: ["HydraFacial", "Carbon facial", "PRP facial"],
    image: "/images/px-hydrafacial.webp",
    imageAlt: "A patient receiving a facial treatment with a handheld device",
    clinicPhoto: false,
  },
  {
    id: "microdermabrasion",
    group: "skin",
    name: "Microdermabrasion",
    short: "Gentle resurfacing for smoother, brighter skin.",
    concerns: [
      "Dull surface skin",
      "Shallow acne marks",
      "Mild sun damage",
      "Rough texture and fine lines",
    ],
    detail:
      "A non-invasive exfoliation with a diamond or crystal tip that buffs away dull surface skin. It can soften fine lines, sun damage and shallow acne marks.",
    image: "/images/px-microdermabrasion.webp",
    imageAlt: "A practitioner performing a facial treatment on a patient lying down",
    clinicPhoto: false,
  },
  {
    id: "laser-hair-removal",
    group: "skin",
    name: "Laser hair removal",
    short: "Long-term reduction of unwanted hair.",
    concerns: [
      "Unwanted facial hair",
      "Underarm, arm and leg hair",
      "Ingrown hairs and razor bumps",
      "Excess hair growth (e.g. with PCOS)",
    ],
    detail:
      "Laser energy targets the hair follicle while sparing the surrounding skin. It is done over a series of sessions, with settings chosen for your skin type and hair colour.",
    image: "/images/px-laser-hair.webp",
    imageAlt: "A laser hair removal session on a patient wearing safety glasses",
    clinicPhoto: false,
  },
  {
    id: "hair",
    group: "skin",
    name: "Hair PRP & hair transplant",
    short: "For hair fall and thinning.",
    concerns: [
      "Excessive daily hair fall",
      "Thinning at the crown or parting",
      "A receding hairline",
      "Advanced hair loss in patches",
    ],
    detail:
      "PRP (platelet-rich plasma) therapy uses growth factors from your own blood to support weak hair follicles. Where hair loss is advanced, a hair transplant moves healthy follicles to thinning areas.",
    includes: ["Hair PRP", "Hair transplant", "Hair-fall treatment"],
    video: {
      src: "/videos/hair-transplant-grafts.mp4",
      poster: "/videos/hair-transplant-grafts-poster.webp",
      title: "Inside a hair transplant",
      caption:
        "Filmed during a hair transplant at the clinic: healthy follicles (grafts) are taken from the back of the scalp and placed one by one into thinning areas, where they grow as natural hair.",
    },
    image: "/images/px-hair-scalp.webp",
    imageAlt: "A man touching his hairline",
    clinicPhoto: false,
  },
  {
    id: "skin-procedures",
    group: "skin",
    name: "Mole, wart, skin tag & tattoo removal",
    short: "Minor procedures for common skin growths and tattoos.",
    concerns: [
      "Moles you want removed",
      "Warts",
      "Skin tags on the neck, underarms or face",
      "Unwanted tattoos",
    ],
    detail:
      "Removal of moles, warts and skin tags, and laser tattoo removal, done in the clinic's skin and laser room.",
    image: "/images/skin-laser-room.webp",
    imageAlt: "Skin and laser treatment room at Devkripa Healthcare, Jhotwara, Jaipur",
    clinicPhoto: true,
  },
];

/** A treatment's own page, under its wing: /dental-care/<id> or /skin-care/<id>. */
export const treatmentHref = (id: string) => {
  const t = treatments.find((x) => x.id === id);
  return t ? `${treatmentGroups[t.group].path}/${t.id}` : "/treatments";
};

/** Which booking consultation a treatment belongs to. */
export const consultationFor = (t: Treatment) => (t.group === "dental" ? "dental" : t.id === "hair" ? "hair" : "skin");

/** Verbatim patient reviews published on the clinic's website (dates from its structured data). */
export const reviews = [
  {
    author: "Seema Nathawat",
    date: "2024-02-22",
    topic: "Skin",
    text: "I had a wonderful experience with Dr. Jahanvi ma'am, a skilled dermatologist. Her friendly approach and expert care made me feel at ease. The results were also impressive.",
  },
  {
    author: "Dv Shekhawat",
    date: "2024-03-22",
    topic: "Acne",
    text: "I'm Suffering from Acne My Friend Suggest me to take Treatment From Dr Jhanavi Tyagi. Treatment is Very Good with affordable Cost and Dr Behaviour is Friendly.. Thanks A lot Dr.",
  },
  {
    author: "Arpit Khandelwal",
    date: "2024-02-22",
    topic: "Hair PRP",
    text: "I underwent a hair PRP procedure at Dr. Jahanvi's Dermanent, and I'm thrilled with the outcomes. The staff is highly professional, the facility is state-of-the-art and immaculate…",
  },
  {
    author: "Surendra Pareek",
    date: "2024-04-08",
    topic: "Skin",
    text: "Very nice experience constantly with dr. Jahanvi ji. She is a nice person. She is listing my problem with very carefully. And give best suggestions for my wife skin problem.",
  },
  {
    author: "Dimpal Agarwal",
    date: "2024-03-22",
    topic: "Skin",
    text: "I have done my skin treatment from Dr jahanvi she is very kind and interactive. she listen problem very patiently. I m fully satisfied with treatment…",
  },
  {
    author: "Vartika Tyagi",
    date: "2024-03-22",
    topic: "Dental & skin",
    text: "Dr Jahanvi is very kind and interative. I had wonderful experience at the hospital. I got my dental and skin treatment at a very affordable price…",
  },
];

export type VideoReview = { src: string; poster: string; quote: string; topic: string };

/** Patient video testimonials recorded at the clinic (trimmed and cropped to the patient footage). */
export const videoReviews: VideoReview[] = [
  {
    src: "/videos/review-patient-1.mp4",
    poster: "/videos/review-patient-1-poster.webp",
    quote: "So I just love it.",
    topic: "Dental · Video review",
  },
  {
    src: "/videos/review-patient-2.mp4",
    poster: "/videos/review-patient-2-poster.webp",
    quote: "Ekdam ghar jaisi — just like home.",
    topic: "Dental · Video review",
  },
];

export type GalleryItem ={ src: string; alt: string; caption: string; w: number; h: number };

export const gallery: GalleryItem[] = [
  { src: "/images/reception.webp", alt: "Reception at Devkripa Healthcare dental and skin clinic, Jhotwara", caption: "Reception", w: 1280, h: 960 },
  { src: "/images/doctor-treating-3.webp", alt: "Dr. Jahanvi Tyagi treating a patient in the dental chair", caption: "In the dental chair", w: 1200, h: 1600 },
  { src: "/images/dental-operatory.webp", alt: "Dental operatory at Devkripa Healthcare, dental clinic in Jhotwara, Jaipur", caption: "Dental operatory", w: 1280, h: 1039 },
  { src: "/images/doctor-child-patient.webp", alt: "Dr. Jahanvi Tyagi with a young patient smiling in the dental chair", caption: "A young patient", w: 1200, h: 1600 },
  { src: "/images/skin-laser-room.webp", alt: "Skin and laser treatment room at Devkripa Healthcare, Jhotwara, Jaipur", caption: "Skin & laser room", w: 1280, h: 960 },
  { src: "/images/consultation-room.webp", alt: "Consultation room with wood-panelled wall and desk", caption: "Consultation room", w: 1280, h: 960 },
  { src: "/images/doctor-treating-4.webp", alt: "Dr. Jahanvi Tyagi examining a patient", caption: "Examination", w: 1200, h: 1600 },
  { src: "/images/team-reception.webp", alt: "The clinic team standing together in the reception area", caption: "The team", w: 1600, h: 1200 },
  { src: "/images/building.webp", alt: "Devkripa Healthcare clinic building, Ashok Vihar Vistar, Jhotwara, Jaipur", caption: "The building, Ashok Vihar Vistar", w: 913, h: 1280 },
  { src: "/images/exterior-evening.webp", alt: "The clinic entrance and signage in the evening", caption: "Open until 8 PM", w: 1485, h: 1127 },
  { src: "/images/community-camp.webp", alt: "Dr. Jahanvi Tyagi at a community health camp", caption: "Community health camp", w: 780, h: 1040 },
  { src: "/images/team-outdoor.webp", alt: "The clinic team seated outside the clinic", caption: "The team, outside the clinic", w: 1077, h: 842 },
  { src: "/images/doctor-desk.webp", alt: "Dr. Jahanvi Tyagi at her desk in the consultation room", caption: "Dr. Jahanvi in her cabin", w: 1600, h: 2133 },
  { src: "/images/front-desk.webp", alt: "A desk and chairs in one of the clinic's rooms", caption: "Front desk", w: 1280, h: 960 },
  { src: "/images/doctor-treating-1.webp", alt: "Dr. Jahanvi Tyagi treating a patient under the dental light", caption: "Under the dental light", w: 1200, h: 1600 },
  { src: "/images/community-camp-welcome.webp", alt: "Dr. Jahanvi Tyagi being welcomed with a garland at a community event", caption: "Welcomed at a community camp", w: 1032, h: 581 },
  { src: "/images/doctor-treating-2.webp", alt: "Dr. Jahanvi Tyagi examining a patient's teeth", caption: "Dental examination", w: 1200, h: 1600 },
  { src: "/images/certificate.webp", alt: "Dr. Jahanvi Tyagi receiving a certificate alongside colleagues", caption: "Receiving a certificate", w: 1600, h: 1200 },
  { src: "/images/camp-dental-checkup.webp", alt: "Free dental check-up camp for school students by Dr. Jahanvi Tyagi, Jaipur", caption: "Free dental camp, Central Academy", w: 1600, h: 900 },
  { src: "/images/camp-memento.webp", alt: "Dr. Jahanvi Tyagi receiving a memento from the school after the dental camp", caption: "A memento from the school", w: 900, h: 1600 },
  { src: "/images/camp-students-line.webp", alt: "Students lining up for their dental check-up at the camp", caption: "Students waiting for their check-up", w: 1599, h: 900 },
  { src: "/images/camp-screening.webp", alt: "Clinic dentists examining students at the camp tables", caption: "Dental screening at the camp", w: 1600, h: 900 },
  { src: "/images/camp-team-banner.webp", alt: "Two members of the clinic team in front of the free dental camp banners", caption: "The camp team", w: 1600, h: 900 },
  { src: "/images/camp-team-portrait.webp", alt: "Clinic team members standing beside the free dental camp banner and poster", caption: "At the camp", w: 900, h: 1600 },
];

/** Photos from the clinic's free dental camp at Central Academy school, Jaipur. */
export const communityCamp = {
  title: "Free dental camp at Central Academy",
  photos: {
    checkup: gallery.find((g) => g.src === "/images/camp-dental-checkup.webp")!,
    memento: gallery.find((g) => g.src === "/images/camp-memento.webp")!,
    line: gallery.find((g) => g.src === "/images/camp-students-line.webp")!,
    screening: gallery.find((g) => g.src === "/images/camp-screening.webp")!,
    team: gallery.find((g) => g.src === "/images/camp-team-banner.webp")!,
  },
};

export type FaqGroup = "Location and timings" | "Doctor and booking" | "Dental" | "Skin and hair";

/**
 * Homepage SEO FAQ (22 questions, from the homepage SEO brief). The FAQPage schema is
 * generated from this list, so the visible wording and the schema always match.
 */
export const faqs: { group: FaqGroup; q: string; a: string }[] = [
  { group: "Location and timings", q: "Where is the dental clinic in Jhotwara, Jaipur?", a: "Devkripa Healthcare is a dental and skin clinic at 174/175, Sangh Shakti Road, Ashok Vihar Vistar, Jhotwara, Jaipur 302012, led by Dr. Jahanvi Tyagi." },
  { group: "Location and timings", q: "What are the clinic timings?", a: "The clinic is open all seven days, including Sunday, from 10:30 AM to 8:00 PM." },
  { group: "Location and timings", q: "Is there a dentist open on Sunday in Jaipur?", a: "Yes. Devkripa Healthcare in Jhotwara is open on Sunday from 10:30 AM to 8:00 PM." },
  { group: "Location and timings", q: "How do I reach the clinic?", a: "The clinic is on Sangh Shakti Road, opposite Tatkaleshwar Mahadev Mandir, in Ashok Vihar Vistar, Jhotwara." },
  { group: "Location and timings", q: "Is the clinic wheelchair accessible?", a: "Yes. It has a wheelchair-accessible elevator and a gender-neutral restroom." },
  { group: "Location and timings", q: "How can I pay?", a: "We accept cash and UPI." },
  { group: "Doctor and booking", q: "Who is Dr. Jahanvi Tyagi?", a: "Dr. Jahanvi Tyagi is a dental surgeon (BDS, 2008) and clinical cosmetologist with a Fellowship in Facial Aesthetic Medicine (2018). She is registered with the Rajasthan Dental Council (No. A4243)." },
  { group: "Doctor and booking", q: "Can I get both dental and skin treatment at the same clinic?", a: "Yes. Dr. Jahanvi Tyagi heads both the dental wing and the skin and hair wing." },
  { group: "Doctor and booking", q: "Which languages does the doctor speak?", a: "English and Hindi." },
  { group: "Doctor and booking", q: "How do I book an appointment?", a: "Use the online booking form, call +91 82090 11472, or message the clinic on WhatsApp." },
  { group: "Doctor and booking", q: "Is my booking confirmed immediately?", a: "No. The clinic calls you to confirm your time slot." },
  { group: "Dental", q: "Is root canal treatment available in Jhotwara?", a: "Yes. Root canal treatment is done at Devkripa Healthcare to save a damaged or infected tooth. A crown is usually advised afterwards." },
  { group: "Dental", q: "How many visits does a root canal need?", a: "It depends on the tooth and the infection. The doctor explains the plan after examining you." },
  { group: "Dental", q: "Are dental implants available at this clinic?", a: "Yes. Implants are offered to replace a single missing tooth up to a full arch, after an examination." },
  { group: "Dental", q: "Dental implant or bridge: which should I choose?", a: "Both replace missing teeth but work differently. The right choice depends on your teeth, gums and jaw bone, so the doctor decides after examination." },
  { group: "Dental", q: "Does the clinic offer braces and clear aligners?", a: "Yes, for straightening teeth and correcting the bite." },
  { group: "Dental", q: "Is teeth whitening available?", a: "Yes, along with scaling and polishing." },
  { group: "Skin and hair", q: "Which clinic treats melasma and pigmentation in Jhotwara?", a: "Dr. Jahanvi Tyagi treats melasma and pigmentation at Devkripa Healthcare using options such as sunscreen guidance, creams, peels and laser toning." },
  { group: "Skin and hair", q: "Is acne scar treatment available at this clinic?", a: "Yes. Acne, acne scars and related options such as peels and microneedling are offered." },
  { group: "Skin and hair", q: "Is laser hair removal available?", a: "Yes. Laser hair removal usually needs more than one session." },
  { group: "Skin and hair", q: "Does the clinic offer hair PRP and hair transplant?", a: "Yes. The right option is advised after a scalp examination." },
  { group: "Skin and hair", q: "Can I remove moles, warts, skin tags or tattoos here?", a: "Yes. These minor skin procedures are offered at the clinic." },
];

export const faqGroups: FaqGroup[] = ["Location and timings", "Doctor and booking", "Dental", "Skin and hair"];

/** FAQPage JSON-LD, built from the visible FAQ list above. */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Which treatments a nav item's dropdown lists. */
export type NavMenu = "all" | TreatmentGroup;

export const nav: { href: string; label: string; menu?: NavMenu }[] = [
  { href: "/", label: "Home" },
  { href: "/doctor", label: "Doctor" },
  { href: "/dental-care", label: "Dental care", menu: "dental" },
  { href: "/skin-care", label: "Skin care", menu: "skin" },
  { href: "/your-visit", label: "Your visit" },
  { href: "/clinic", label: "Clinic" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
