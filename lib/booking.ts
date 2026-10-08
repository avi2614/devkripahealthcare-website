import { z } from "zod";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { hours, whatsappLink } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  Consultation types offered in the booking flow                     */
/* ------------------------------------------------------------------ */

export const consultationTypes = [
  { id: "dental", label: "Dental consultation", hint: "Pain, cleaning, RCT, braces, implants, smile correction" },
  { id: "skin", label: "Skin consultation", hint: "Acne, pigmentation, peels, facials, laser" },
  { id: "hair", label: "Hair consultation", hint: "Hair fall, PRP, transplant" },
  { id: "general", label: "Not sure yet", hint: "Talk it through with the doctor first" },
] as const;

export type ConsultationType = (typeof consultationTypes)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Validation                                                          */
/* ------------------------------------------------------------------ */

const phoneRegex = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

export const bookingSchema = z.object({
  consultation: z.enum(["dental", "skin", "hair", "general"], {
    error: "Choose what you'd like to book.",
  }),
  treatment: z.string().optional(),
  date: z.date({ error: "Pick a date for your visit." }),
  time: z.string({ error: "Pick a time." }).min(1, "Pick a time."),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name is a little long — 80 characters at most."),
  phone: z
    .string()
    .trim()
    .min(1, "We need a phone number to confirm your visit.")
    .regex(phoneRegex, "Enter a 10-digit Indian mobile number, e.g. 98290 12345."),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((v) => v === "" || z.email().safeParse(v).success, "That email address doesn't look right."),
  message: z.string().trim().max(400, "Please keep the note under 400 characters.").optional(),
  consent: z.boolean().refine((v) => v, "Please agree so the clinic can contact you."),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingValues = z.output<typeof bookingSchema>;

/** Fields validated at each step of the form. */
export const stepFields = {
  0: ["consultation"],
  1: ["date", "time"],
  2: ["name", "phone", "email", "message", "consent"],
} as const satisfies Record<number, readonly (keyof BookingInput)[]>;

/* ------------------------------------------------------------------ */
/*  Availability provider                                              */
/*  Replace `demoAvailability` with Cal.com / Calendly / your own API. */
/* ------------------------------------------------------------------ */

export type Slot = { time: string; label: string; available: boolean };

export interface AvailabilityProvider {
  /** First and last bookable days. */
  window(): { from: Date; to: Date };
  /** Slots for a given day. */
  slots(day: Date): Promise<Slot[]>;
}

const toLabel = (h: number, m: number) => format(new Date(2000, 0, 1, h, m), "h:mm a");

/** Demo availability: 30-minute slots inside clinic hours, with a few deterministically "taken". */
export const demoAvailability: AvailabilityProvider = {
  window() {
    const from = startOfDay(new Date());
    return { from, to: addDays(from, 45) };
  },
  async slots(day) {
    const [oh, om] = hours.open.split(":").map(Number);
    const [ch, cm] = hours.close.split(":").map(Number);
    const out: Slot[] = [];
    const now = new Date();
    const seed = day.getFullYear() * 400 + day.getMonth() * 32 + day.getDate();
    let i = 0;
    for (let mins = oh * 60 + om; mins <= ch * 60 + cm - 30; mins += 30, i++) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      const slotDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m);
      const inPast = isSameDay(day, now) && slotDate.getTime() < now.getTime() + 60 * 60 * 1000;
      const taken = (seed * 7 + i * 13) % 5 === 0;
      out.push({ time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`, label: toLabel(h, m), available: !inPast && !taken });
    }
    return out;
  },
};

/* ------------------------------------------------------------------ */
/*  Submission adapter                                                 */
/* ------------------------------------------------------------------ */

export type BookingResult = { ok: true; reference: string; live: boolean } | { ok: false; error: string };

export interface BookingAdapter {
  /** `live` should be true only when the request really reaches the clinic's scheduling system. */
  readonly live: boolean;
  submit(values: BookingValues): Promise<BookingResult>;
}

/** Demo adapter — nothing is sent anywhere. */
export const demoAdapter: BookingAdapter = {
  live: false,
  async submit() {
    await new Promise((r) => setTimeout(r, 900));
    const ref = `DK-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    return { ok: true, reference: ref, live: false };
  },
};

export const bookingAdapter: BookingAdapter = demoAdapter;
export const availability: AvailabilityProvider = demoAvailability;

/** A WhatsApp message carrying the request, so the patient can send it to the clinic directly. */
export function bookingWhatsappLink(v: BookingValues, consultationLabel: string, treatmentName?: string) {
  const lines = [
    "Hi, I'd like to book an appointment.",
    `Name: ${v.name}`,
    `For: ${consultationLabel}${treatmentName ? ` — ${treatmentName}` : ""}`,
    `Preferred: ${format(v.date, "EEEE d MMMM yyyy")}, ${toLabelFrom(v.time)}`,
    `Phone: ${v.phone}`,
  ];
  if (v.message) lines.push(`Note: ${v.message}`);
  return whatsappLink(lines.join("\n"));
}

export function toLabelFrom(time: string) {
  const [h, m] = time.split(":").map(Number);
  return toLabel(h, m);
}
