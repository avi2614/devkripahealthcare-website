"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Info, Loader2, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import {
  availability,
  bookingAdapter,
  bookingSchema,
  bookingWhatsappLink,
  consultationTypes,
  stepFields,
  toLabelFrom,
  type BookingInput,
  type BookingValues,
  type Slot,
} from "@/lib/booking";
import { BOOK_EVENT, type BookEventDetail } from "@/lib/booking-events";
import { contact, hours, treatments, whatsappLink } from "@/data/site";
import { WordsReveal } from "@/components/ui/motion-kit";

const steps = ["Treatment", "Date & time", "Your details", "Review"] as const;
const ease = [0.22, 1, 0.36, 1] as const;

const defaults: BookingInput = {
  consultation: undefined as unknown as BookingInput["consultation"],
  treatment: "",
  date: undefined as unknown as Date,
  time: "",
  name: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
};

function treatmentsFor(c?: string) {
  if (c === "dental") return treatments.filter((t) => t.group === "dental");
  if (c === "skin") return treatments.filter((t) => t.group === "skin" && t.id !== "hair");
  if (c === "hair") return treatments.filter((t) => t.id === "hair");
  return [];
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 text-sm font-medium text-danger"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function Booking({ titleAs = "h2" }: { titleAs?: "h1" | "h2" } = {}) {
  const Title = titleAs;
  const uid = useId();
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ reference: string; live: boolean; values: BookingValues } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<BookingInput, unknown, BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const { control, register, handleSubmit, trigger, setValue, reset, getValues, clearErrors, formState } = form;
  const { errors } = formState;

  const consultation = useWatch({ control, name: "consultation" });
  const date = useWatch({ control, name: "date" });
  const options = treatmentsFor(consultation);

  // Preselect from "Book a consultation for this" buttons elsewhere on the page.
  useEffect(() => {
    const onBook = (e: Event) => {
      const d = (e as CustomEvent<BookEventDetail>).detail;
      setResult(null);
      setStep(0);
      if (d.consultation) setValue("consultation", d.consultation, { shouldValidate: true });
      setValue("treatment", d.treatmentId ?? "");
    };
    window.addEventListener(BOOK_EVENT, onBook);

    // Arriving from another page, e.g. /book?consultation=skin&treatment=acne
    const q = new URLSearchParams(window.location.search);
    const c = q.get("consultation");
    if (c && consultationTypes.some((x) => x.id === c)) {
      setValue("consultation", c as BookingInput["consultation"]);
      const t = q.get("treatment");
      if (t && treatmentsFor(c).some((x) => x.id === t)) setValue("treatment", t);
    }
    return () => window.removeEventListener(BOOK_EVENT, onBook);
  }, [setValue]);

  // Load slots whenever the date changes.
  useEffect(() => {
    let alive = true;
    if (!date) return;
    availability.slots(date).then((s) => alive && setSlots(s));
    return () => {
      alive = false;
    };
  }, [date]);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, result]);

  const next = async () => {
    const fields = stepFields[step as 0 | 1 | 2];
    const ok = await trigger(fields as unknown as (keyof BookingInput)[], { shouldFocus: true });
    if (ok) setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: BookingValues) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await bookingAdapter.submit(values);
      if (res.ok) setResult({ reference: res.reference, live: res.live, values });
      else setSubmitError(res.error);
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again, or call the clinic.");
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    reset(defaults);
    setSlots(null);
    setResult(null);
    setStep(0);
  };

  const win = availability.window();
  const consultationLabel = (id?: string) => consultationTypes.find((c) => c.id === id)?.label ?? "";
  const treatmentName = (id?: string) => treatments.find((t) => t.id === id)?.name;

  return (
    <section id="book" aria-labelledby="book-title" className="bg-secondary/55 py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        {/* Intro */}
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Appointments</p>
          <Title id="book-title" className="display mt-5 text-5xl md:text-6xl">
            <WordsReveal>
              Book a consultation
            </WordsReveal>
          </Title>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground">
            Choose a time that suits you and the clinic will call to confirm. It takes about a minute.
          </p>

          <div className="mt-10 space-y-4 border-t border-border pt-8 text-[0.95rem]">
            <p className="text-muted-foreground">Prefer to talk?</p>
            <a href={contact.phoneHref} className="flex items-center gap-3 font-medium hover:text-primary">
              <Phone className="h-4 w-4" aria-hidden /> {contact.phoneDisplay}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-medium hover:text-primary"
            >
              <WhatsAppIcon className="h-4 w-4" /> Message on WhatsApp
            </a>
            <p className="text-muted-foreground">Open every day, {hours.label}</p>
          </div>
        </Reveal>

        {/* Flow */}
        <Reveal delay={0.08} className="lg:col-span-8">
          <div className="border-beam border border-border bg-card shadow-[0_30px_60px_-40px_rgba(11,30,70,0.3)]">
            {/* Stepper */}
            {!result && (
              <ol className="grid grid-cols-4 border-b border-border" aria-label="Booking steps">
                {steps.map((label, i) => {
                  const state = i < step ? "done" : i === step ? "current" : "upcoming";
                  return (
                    <li
                      key={label}
                      aria-current={state === "current" ? "step" : undefined}
                      className={`relative px-3 py-4 text-xs sm:px-5 sm:text-sm ${state === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}
                    >
                      <span className="block font-semibold tabular-nums">
                        {state === "done" ? <Check className="inline h-3.5 w-3.5" aria-label="completed" /> : `0${i + 1}`}
                      </span>
                      <span className="mt-0.5 hidden sm:block">{label}</span>
                      <span className="sr-only sm:hidden">{label}</span>
                      <span
                        className={`absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-primary transition-transform duration-700 ${
                          i <= step ? "scale-x-100" : "scale-x-0"
                        }`}
                        aria-hidden
                      />
                    </li>
                  );
                })}
              </ol>
            )}

            <form
              onSubmit={(e) => {
                // Enter key: advance a step; only the explicit "Send request" button submits.
                e.preventDefault();
                if (step < 3) void next();
              }}
              noValidate className="p-5 sm:p-8 md:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {result ? (
                  <motion.div
                    key="done"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 ref={headingRef} tabIndex={-1} className="display mt-6 text-4xl outline-none">
                      Request received
                    </h3>
                    <p className="mt-3 max-w-lg text-muted-foreground">
                      Thank you, {result.values.name.split(" ")[0]}. The clinic will call you on {result.values.phone} to
                      confirm your appointment.
                    </p>

                    <dl className="mt-8 grid gap-x-8 gap-y-5 border-y border-border py-6 sm:grid-cols-3">
                      <div>
                        <dt className="eyebrow">For</dt>
                        <dd className="mt-1.5">
                          {consultationLabel(result.values.consultation)}
                          {treatmentName(result.values.treatment) && (
                            <span className="block text-muted-foreground">{treatmentName(result.values.treatment)}</span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow">Date</dt>
                        <dd className="mt-1.5">{format(result.values.date, "EEEE, d MMMM yyyy")}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow">Preferred time</dt>
                        <dd className="mt-1.5">{toLabelFrom(result.values.time)}</dd>
                      </div>
                    </dl>
                    <p className="mt-4 text-sm text-muted-foreground">Reference {result.reference}</p>

                    {!result.live && (
                      <div className="mt-6 flex gap-3 rounded-md border border-accent/40 bg-accent/[0.07] p-4 text-sm leading-relaxed">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        <p>
                          <strong className="font-semibold">Demo booking — not yet connected to the clinic&rsquo;s live scheduling system.</strong>{" "}
                          Nothing has been sent. To reach the clinic now, send these details on WhatsApp or call{" "}
                          {contact.phoneDisplay}.
                        </p>
                      </div>
                    )}

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={bookingWhatsappLink(
                          result.values,
                          consultationLabel(result.values.consultation),
                          treatmentName(result.values.treatment),
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        <WhatsAppIcon className="h-4 w-4" /> Send details on WhatsApp
                      </a>
                      <button type="button" onClick={startOver} className="btn btn-ghost">
                        Make another request
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: -18 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {/* ——— Step 1 ——— */}
                    {step === 0 && (
                      <div>
                        <h3 ref={headingRef} tabIndex={-1} className="display text-3xl outline-none md:text-4xl">
                          What would you like to book?
                        </h3>
                        <Controller
                          control={control}
                          name="consultation"
                          render={({ field }) => (
                            <div
                              role="radiogroup"
                              aria-label="What would you like to book?"
                              aria-describedby={errors.consultation ? `${uid}-c-err` : undefined}
                              className="mt-8 grid gap-3 sm:grid-cols-2"
                            >
                              {consultationTypes.map((c) => {
                                const checked = field.value === c.id;
                                return (
                                  <label
                                    key={c.id}
                                    className={`relative flex cursor-pointer flex-col rounded-md border p-5 transition-colors ${
                                      checked ? "border-primary bg-primary/[0.05]" : "border-border hover:border-foreground/30"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={field.name}
                                      value={c.id}
                                      checked={checked}
                                      onChange={() => {
                                        field.onChange(c.id);
                                        clearErrors("consultation");
                                        setValue("treatment", "");
                                      }}
                                      onBlur={field.onBlur}
                                      ref={c.id === "dental" ? field.ref : undefined}
                                      className="peer sr-only"
                                    />
                                    <span className="flex items-center justify-between font-semibold">
                                      {c.label}
                                      <span
                                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                                          checked ? "border-primary bg-primary text-primary-foreground" : "border-border"
                                        }`}
                                        aria-hidden
                                      >
                                        {checked && <Check className="h-3 w-3" />}
                                      </span>
                                    </span>
                                    <span className="mt-1.5 text-sm text-muted-foreground">{c.hint}</span>
                                    <span className="pointer-events-none absolute inset-0 rounded-md peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring" />
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        />
                        <FieldError id={`${uid}-c-err`} message={errors.consultation?.message} />

                        {options.length > 0 && (
                          <div className="mt-8">
                            <label htmlFor={`${uid}-treatment`} className="block text-sm font-semibold">
                              Anything specific? <span className="font-normal text-muted-foreground">(optional)</span>
                            </label>
                            <select id={`${uid}-treatment`} className="field mt-2" {...register("treatment")}>
                              <option value="">I&rsquo;m not sure — I&rsquo;d like advice</option>
                              {options.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ——— Step 2 ——— */}
                    {step === 1 && (
                      <div>
                        <h3 ref={headingRef} tabIndex={-1} className="display text-3xl outline-none md:text-4xl">
                          Pick a day and time
                        </h3>
                        <p className="mt-2 text-muted-foreground">The clinic is open every day, {hours.label}.</p>
                        <div className="mt-8 grid gap-10 md:grid-cols-[auto_1fr]">
                          <div>
                            <Controller
                              control={control}
                              name="date"
                              render={({ field }) => (
                                <DayPicker
                                  mode="single"
                                  required
                                  selected={field.value}
                                  onSelect={(d) => {
                                    field.onChange(d);
                                    clearErrors("date");
                                    setValue("time", "");
                                    setSlots(null);
                                  }}
                                  disabled={{ before: win.from, after: win.to }}
                                  startMonth={win.from}
                                  endMonth={win.to}
                                  weekStartsOn={1}
                                  showOutsideDays
                                  aria-describedby={errors.date ? `${uid}-d-err` : undefined}
                                />
                              )}
                            />
                            <FieldError id={`${uid}-d-err`} message={errors.date?.message} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold" id={`${uid}-slots`}>
                              {date ? format(date, "EEEE, d MMMM") : "Choose a date first"}
                            </p>
                            {date && (
                              <Controller
                                control={control}
                                name="time"
                                render={({ field }) => (
                                  <div
                                    role="radiogroup"
                                    aria-labelledby={`${uid}-slots`}
                                    aria-describedby={errors.time ? `${uid}-t-err` : undefined}
                                    className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4"
                                  >
                                    {(slots ?? []).map((s) => {
                                      const checked = field.value === s.time;
                                      return (
                                        <label
                                          key={s.time}
                                          className={`relative flex min-h-[44px] items-center justify-center rounded-full border text-sm tabular-nums transition-colors ${
                                            !s.available
                                              ? "cursor-not-allowed border-dashed border-border text-muted-foreground/50 line-through"
                                              : checked
                                                ? "cursor-pointer border-primary bg-primary font-semibold text-primary-foreground"
                                                : "cursor-pointer border-border hover:border-foreground/40"
                                          }`}
                                        >
                                          <input
                                            type="radio"
                                            className="peer sr-only"
                                            name={field.name}
                                            value={s.time}
                                            disabled={!s.available}
                                            checked={checked}
                                            onChange={() => {
                                              field.onChange(s.time);
                                              clearErrors("time");
                                            }}
                                            onBlur={field.onBlur}
                                            aria-label={`${s.label}${s.available ? "" : " (unavailable)"}`}
                                          />
                                          {s.label}
                                          <span className="pointer-events-none absolute inset-0 rounded-full peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring" />
                                        </label>
                                      );
                                    })}
                                    {slots === null && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Loading times" />}
                                  </div>
                                )}
                              />
                            )}
                            {date && slots && slots.every((s) => !s.available) && (
                              <p className="mt-4 text-sm text-muted-foreground">No times left on this day — try the next one.</p>
                            )}
                            <FieldError id={`${uid}-t-err`} message={errors.time?.message} />
                            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                              Times shown are sample availability for this demo. The clinic confirms the final time with you.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ——— Step 3 ——— */}
                    {step === 2 && (
                      <div>
                        <h3 ref={headingRef} tabIndex={-1} className="display text-3xl outline-none md:text-4xl">
                          Your details
                        </h3>
                        <p className="mt-2 text-muted-foreground">Only what the clinic needs to reach you.</p>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <label htmlFor={`${uid}-name`} className="block text-sm font-semibold">
                              Full name
                            </label>
                            <input
                              id={`${uid}-name`}
                              className="field mt-2"
                              autoComplete="name"
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? `${uid}-n-err` : undefined}
                              {...register("name")}
                            />
                            <FieldError id={`${uid}-n-err`} message={errors.name?.message} />
                          </div>
                          <div>
                            <label htmlFor={`${uid}-phone`} className="block text-sm font-semibold">
                              Mobile number
                            </label>
                            <input
                              id={`${uid}-phone`}
                              className="field mt-2"
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              placeholder="98290 12345"
                              aria-invalid={!!errors.phone}
                              aria-describedby={errors.phone ? `${uid}-p-err` : undefined}
                              {...register("phone")}
                            />
                            <FieldError id={`${uid}-p-err`} message={errors.phone?.message} />
                          </div>
                          <div>
                            <label htmlFor={`${uid}-email`} className="block text-sm font-semibold">
                              Email <span className="font-normal text-muted-foreground">(optional)</span>
                            </label>
                            <input
                              id={`${uid}-email`}
                              className="field mt-2"
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? `${uid}-e-err` : undefined}
                              {...register("email")}
                            />
                            <FieldError id={`${uid}-e-err`} message={errors.email?.message} />
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor={`${uid}-msg`} className="block text-sm font-semibold">
                              Anything you&rsquo;d like the doctor to know?{" "}
                              <span className="font-normal text-muted-foreground">(optional)</span>
                            </label>
                            <textarea
                              id={`${uid}-msg`}
                              rows={3}
                              className="field mt-2 resize-y"
                              placeholder="e.g. tooth pain on the lower left for a week"
                              aria-invalid={!!errors.message}
                              aria-describedby={`${uid}-m-hint${errors.message ? ` ${uid}-m-err` : ""}`}
                              {...register("message")}
                            />
                            <p id={`${uid}-m-hint`} className="mt-2 text-xs text-muted-foreground">
                              Please don&rsquo;t include detailed medical history — that&rsquo;s best discussed in person.
                            </p>
                            <FieldError id={`${uid}-m-err`} message={errors.message?.message} />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed">
                              <input
                                type="checkbox"
                                className="mt-1 h-5 w-5 shrink-0 accent-[var(--primary)]"
                                aria-invalid={!!errors.consent}
                                aria-describedby={errors.consent ? `${uid}-cn-err` : undefined}
                                {...register("consent")}
                              />
                              <span>
                                I agree to Devkripa Healthcare contacting me by phone, WhatsApp or email about this
                                appointment. See the{" "}
                                <a href="/privacy" className="underline underline-offset-2">
                                  privacy notice
                                </a>
                                .
                              </span>
                            </label>
                            <FieldError id={`${uid}-cn-err`} message={errors.consent?.message} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ——— Step 4 ——— */}
                    {step === 3 && (
                      <div>
                        <h3 ref={headingRef} tabIndex={-1} className="display text-3xl outline-none md:text-4xl">
                          Check your request
                        </h3>
                        <dl className="mt-8 divide-y divide-border border-y border-border">
                          {(() => {
                            const v = getValues();
                            const rows: [string, string, number][] = [
                              ["For", `${consultationLabel(v.consultation)}${treatmentName(v.treatment) ? ` — ${treatmentName(v.treatment)}` : ""}`, 0],
                              ["When", v.date && v.time ? `${format(v.date, "EEEE, d MMMM yyyy")} at ${toLabelFrom(v.time)}` : "", 1],
                              ["Name", v.name, 2],
                              ["Mobile", v.phone, 2],
                            ];
                            if (v.email) rows.push(["Email", v.email, 2]);
                            if (v.message) rows.push(["Note", v.message, 2]);
                            return rows.map(([k, val, s]) => (
                              <div key={k} className="grid grid-cols-[5.5rem_1fr_auto] items-baseline gap-4 py-4">
                                <dt className="text-sm text-muted-foreground">{k}</dt>
                                <dd className="break-words">{val}</dd>
                                <button
                                  type="button"
                                  onClick={() => setStep(s)}
                                  className="text-sm font-semibold text-primary underline-offset-2 hover:underline"
                                  aria-label={`Edit ${k.toLowerCase()}`}
                                >
                                  Edit
                                </button>
                              </div>
                            ));
                          })()}
                        </dl>
                        <p className="mt-5 text-sm text-muted-foreground">
                          This is a request — the clinic will contact you to confirm the time.
                        </p>
                        {submitError && (
                          <p role="alert" className="mt-4 text-sm font-medium text-danger">
                            {submitError}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              {!result && (
                <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
                  {step > 0 ? (
                    <button type="button" onClick={back} className="btn btn-ghost">
                      <ArrowLeft className="h-4 w-4" aria-hidden /> Back
                    </button>
                  ) : (
                    <span />
                  )}
                  {step < 3 ? (
                    <button key="continue" type="button" onClick={next} className="btn btn-primary arrow-nudge">
                      Continue <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  ) : (
                    <button
                      key="submit"
                      type="button"
                      onClick={() => void handleSubmit(onSubmit)()}
                      disabled={submitting}
                      className="btn btn-primary disabled:opacity-70"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                        </>
                      ) : (
                        <>Send request</>
                      )}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
