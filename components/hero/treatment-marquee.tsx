import Link from "next/link";
import { treatmentHref, treatments } from "@/data/site";

/** A slow ribbon of every treatment, just under the hero. Duplicated once so the loop is seamless. */
export function TreatmentMarquee() {
  const items = treatments.map((t) => (
    <Link
      key={t.id}
      href={treatmentHref(t.id)}
      className="group flex items-center gap-3 whitespace-nowrap text-lg font-medium text-ink-foreground/80 transition-colors hover:text-white md:text-xl"
    >
      <span
        aria-hidden
        className={`inline-block h-3 w-3 transition-transform duration-500 group-hover:rotate-90 ${
          t.group === "dental" ? "bg-primary" : "bg-accent"
        } [clip-path:polygon(33%_0,67%_0,67%_33%,100%_33%,100%_67%,67%_67%,67%_100%,33%_100%,33%_67%,0_67%,0_33%,33%_33%)]`}
      />
      <span className="display">{t.name}</span>
    </Link>
  ));

  return (
    <nav aria-label="All treatments" className="on-dark border-y border-white/10 bg-ink py-6">
      <div className="marquee">
        <div className="marquee-track">{items}</div>
        <div className="marquee-track" aria-hidden inert>
          {items}
        </div>
      </div>
    </nav>
  );
}
