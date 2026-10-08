import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { contact, hours, nav, treatmentHref, treatments, whatsappLink } from "@/data/site";

const featured = ["root-canal", "implants", "orthodontics", "acne", "pigmentation", "hair"];

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { href: contact.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: contact.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: whatsappLink(), label: "WhatsApp", Icon: WhatsAppIcon },
  ];

  return (
    <footer className="on-dark bg-ink text-ink-foreground">
      {/* Closing CTA */}
      <div className="container-x border-b border-white/10 py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="display max-w-[16ch] text-5xl leading-[1.05] md:text-7xl">
            Let&rsquo;s talk about <em className="text-[#d8b892]">what you need.</em>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/book" className="btn btn-light">
              Book a consultation
            </Link>
            <a href={contact.phoneHref} className="btn btn-ghost">
              Call {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="Devkripa Health Care Multispeciality Centre — home" className="inline-block rounded-md bg-white px-4 py-3">
            <Logo className="h-9 w-auto" />
          </Link>
          <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-ink-foreground/65">
            The dental and cosmetic clinic of Dr. Jahanvi Tyagi — dental surgeon and clinical cosmetologist — in
            Jhotwara, Jaipur.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ink-foreground/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h3 className="eyebrow !text-ink-foreground/65">Explore</h3>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {[...nav, { href: "/blog", label: "Blog" }, { href: "/book", label: "Book appointment" }, { href: "/contact#faq", label: "FAQ" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline text-ink-foreground/80 hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="eyebrow !text-ink-foreground/65">Treatments</h3>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {featured.map((id) => {
              const t = treatments.find((x) => x.id === id);
              if (!t) return null;
              return (
                <li key={id}>
                  <Link href={treatmentHref(t.id)} className="link-underline text-ink-foreground/80 hover:text-white">
                    {t.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow !text-ink-foreground/65">Clinic</h3>
          <address className="mt-5 space-y-2.5 text-[0.95rem] not-italic text-ink-foreground/80">
            <p>
              {contact.address.line1}, {contact.address.line2}, {contact.address.line3}, {contact.address.city}{" "}
              {contact.address.postalCode}
            </p>
            <p>
              <a href={contact.phoneHref} className="link-underline hover:text-white">
                {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="link-underline break-all hover:text-white">
                {contact.email}
              </a>
            </p>
            <p className="text-ink-foreground/60">Open every day · {hours.label}</p>
          </address>
        </div>
      </div>

      <div className="container-x flex flex-col gap-6 border-t border-white/10 py-8 text-sm text-ink-foreground/65 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {year} Devkripa Healthcare</span>
            <Link href="/privacy" className="link-underline hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline hover:text-white">
              Terms
            </Link>
          </div>
          <p className="text-xs text-ink-foreground/60">
            Information on this site is general and not a substitute for a consultation.
          </p>
        </div>

        {/* Studio credit */}
        <a
          href="https://clio.co.in"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Designed by Clio — opens clio.co.in in a new tab"
          className="group inline-flex items-center gap-3 self-start rounded-full border border-white/10 py-2.5 pl-4 pr-3.5 transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.04] md:self-auto"
        >
          <span className="text-ink-foreground/65 transition-colors duration-500 group-hover:text-ink-foreground/90">
            Designed by
          </span>
          <span className="relative block h-[19px] w-[46px] overflow-hidden" aria-hidden>
            <Image
              src="/brand/clio-logo-light.png"
              alt=""
              fill
              sizes="46px"
              className="object-contain opacity-85 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
            />
            <Image
              src="/brand/clio-logo-light.png"
              alt=""
              fill
              sizes="46px"
              className="translate-y-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
            />
          </span>
          <ArrowUpRight
            className="h-3.5 w-3.5 text-ink-foreground/50 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            aria-hidden
          />
        </a>
      </div>
    </footer>
  );
}
