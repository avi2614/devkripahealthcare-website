/**
 * Single source of truth for clinic content.
 * Everything here comes from the clinic's existing website export
 * (README.md, pages/*.md, structured-data.md). Do not add claims,
 * statistics or credentials that are not in those sources.
 */

export const site = {
  url: "https://devkripahealthcare.com",
  name: "Devkripa Healthcare",
  clinicName: "Dr. Jahanvi's Dermadent",
  tagline: "Dental, skin & hair care in Jhotwara, Jaipur",
  description:
    "Devkripa Healthcare is the dental and cosmetic clinic of Dr. Jahanvi Tyagi — dental surgeon and clinical cosmetologist — in Jhotwara, Jaipur. Open every day, 10:30 AM to 8:00 PM.",
};

export const doctor = {
  name: "Dr. Jahanvi Tyagi",
  firstName: "Dr. Jahanvi",
  title: "Dental Surgeon & Clinical Cosmetologist",
  specialties: ["Dental surgeon", "Cosmetologist"],
  practisingSince: 2008,
  /** Biography as supplied by the clinic. */
  about: [
    "Dr. Jahanvi boasts over 15 years of esteemed expertise as a distinguished dentist and cosmetologist, graduating from the prestigious Government Dental College Nagpur, affiliated with MUHS Nashik. Her unparalleled proficiency encompasses a diverse spectrum of dental services, including but not limited to smile enhancement, tooth restoration via capping, root canal therapy, correction of malocclusion, and precise placement of implants, effectively addressing a comprehensive array of oral health concerns.",
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
    line1: "H.No. 175, Ashok Vihar Vistar",
    line2: "Near Mini Market, Khirni Phatak Road",
    line3: "Gokulpura, Jhotwara",
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
      "Everyday dentistry and restorative work — from cleaning and root canals to implants, braces and smile correction.",
    image: "/images/doctor-treating-3.webp",
    imageAlt: "Dr. Jahanvi Tyagi treating a patient in the dental chair at the clinic",
  },
  skin: {
    label: "Skin & hair",
    path: "/skin-care",
    title: "Skin & hair treatments in Jhotwara, Jaipur",
    intro:
      "Treatments for acne, pigmentation, texture and hair fall, backed by Dr. Jahanvi's fellowship in facial aesthetic medicine.",
    image: "/images/skin-laser-room.webp",
    imageAlt: "The skin and laser treatment room at Devkripa Healthcare",
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
    imageAlt: "The dental operatory at Devkripa Healthcare with a green dental chair",
    clinicPhoto: true,
  },
  {
    id: "cleaning-whitening",
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
    imageAlt: "The skin and laser treatment room at the clinic",
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
  { src: "/images/reception.webp", alt: "Clinic reception with the Devkripa Healthcare desk and waiting chairs", caption: "Reception", w: 1280, h: 960 },
  { src: "/images/doctor-treating-3.webp", alt: "Dr. Jahanvi Tyagi treating a patient in the dental chair", caption: "In the dental chair", w: 1200, h: 1600 },
  { src: "/images/dental-operatory.webp", alt: "Dental operatory with a green dental chair and cabinets", caption: "Dental operatory", w: 1280, h: 1039 },
  { src: "/images/doctor-child-patient.webp", alt: "Dr. Jahanvi Tyagi with a young patient smiling in the dental chair", caption: "A young patient", w: 1200, h: 1600 },
  { src: "/images/skin-laser-room.webp", alt: "Skin and laser room with a treatment bed and laser machine", caption: "Skin & laser room", w: 1280, h: 960 },
  { src: "/images/consultation-room.webp", alt: "Consultation room with wood-panelled wall and desk", caption: "Consultation room", w: 1280, h: 960 },
  { src: "/images/doctor-treating-4.webp", alt: "Dr. Jahanvi Tyagi examining a patient", caption: "Examination", w: 1200, h: 1600 },
  { src: "/images/team-reception.webp", alt: "The clinic team standing together in the reception area", caption: "The team", w: 1600, h: 1200 },
  { src: "/images/building.webp", alt: "The clinic building on Khirni Phatak Road", caption: "The building, Ashok Vihar Vistar", w: 913, h: 1280 },
  { src: "/images/exterior-evening.webp", alt: "The clinic entrance and signage in the evening", caption: "Open until 8 PM", w: 1485, h: 1127 },
  { src: "/images/community-camp.webp", alt: "Dr. Jahanvi Tyagi at a community health camp", caption: "Community health camp", w: 780, h: 1040 },
  { src: "/images/team-outdoor.webp", alt: "The clinic team seated outside the clinic", caption: "The team, outside the clinic", w: 1077, h: 842 },
  { src: "/images/doctor-desk.webp", alt: "Dr. Jahanvi Tyagi at her desk in the consultation room", caption: "Dr. Jahanvi in her cabin", w: 1600, h: 2133 },
  { src: "/images/front-desk.webp", alt: "A desk and chairs in one of the clinic's rooms", caption: "Front desk", w: 1280, h: 960 },
  { src: "/images/doctor-treating-1.webp", alt: "Dr. Jahanvi Tyagi treating a patient under the dental light", caption: "Under the dental light", w: 1200, h: 1600 },
  { src: "/images/community-camp-welcome.webp", alt: "Dr. Jahanvi Tyagi being welcomed with a garland at a community event", caption: "Welcomed at a community camp", w: 1032, h: 581 },
  { src: "/images/doctor-treating-2.webp", alt: "Dr. Jahanvi Tyagi examining a patient's teeth", caption: "Dental examination", w: 1200, h: 1600 },
  { src: "/images/certificate.webp", alt: "Dr. Jahanvi Tyagi receiving a certificate alongside colleagues", caption: "Receiving a certificate", w: 1600, h: 1200 },
  { src: "/images/camp-dental-checkup.webp", alt: "Dr. Jahanvi Tyagi and a team dentist checking schoolchildren's teeth at a free dental camp", caption: "Free dental camp, Central Academy", w: 1600, h: 900 },
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

export const faqs = [
  {
    q: "When is the clinic open?",
    a: "Every day of the week, including Sunday, from 10:30 AM to 8:00 PM.",
  },
  {
    q: "Where is the clinic?",
    a: "H.No. 175, Ashok Vihar Vistar, near Mini Market, Khirni Phatak Road, Gokulpura, Jhotwara, Jaipur 302012. The “Get directions” link opens the exact location in Google Maps.",
  },
  {
    q: "Can I get dental and skin treatment at the same clinic?",
    a: "Yes. Devkripa Healthcare has a dental wing and a skin & hair (cosmetic) wing, both headed by Dr. Jahanvi Tyagi.",
  },
  {
    q: "How do I book an appointment?",
    a: "Send a request using the booking form on this page, call +91 82090 11472, or message the clinic on WhatsApp. The clinic will get back to you to confirm the time.",
  },
  {
    q: "Is my booking confirmed as soon as I submit the form?",
    a: "No — the form sends a request. Your appointment is confirmed only once the clinic contacts you.",
  },
  {
    q: "Which languages does the doctor speak?",
    a: "English and Hindi.",
  },
  {
    q: "How can I pay?",
    a: "The clinic accepts cash and UPI.",
  },
  {
    q: "Is the clinic accessible?",
    a: "Yes — there is a wheelchair-accessible elevator, and a gender-neutral restroom.",
  },
];

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
