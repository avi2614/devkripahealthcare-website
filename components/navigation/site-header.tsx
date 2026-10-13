"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import {
  contact,
  hours,
  nav,
  treatmentGroups,
  treatmentHref,
  treatments,
  type NavMenu,
  type TreatmentGroup,
} from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/** The treatment columns a nav dropdown shows. */
const menuColumns = (menu: NavMenu): { group: TreatmentGroup; title: string; href: string }[] => {
  const groups: TreatmentGroup[] = menu === "all" ? ["dental", "skin"] : [menu];
  return groups.map((g) => ({ group: g, title: treatmentGroups[g].label, href: treatmentGroups[g].path }));
};

function DesktopDropdown({ menu, label, onNavigate }: { menu: NavMenu; label: string; onNavigate: () => void }) {
  const columns = menuColumns(menu);
  const wide = columns.length > 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.25, ease }}
      className={`absolute top-full z-10 pt-4 ${wide ? "left-1/2 w-[34rem] -translate-x-1/2" : "-left-5 w-72"}`}
    >
      <div className="rounded-[2px] border border-border bg-background p-5 shadow-[0_24px_48px_-24px_rgba(11,30,70,0.4)]">
        <div className={wide ? "grid grid-cols-2 gap-6" : undefined}>
          {columns.map((c) => (
            <div key={c.group}>
              <Link href={c.href} onClick={onNavigate} className="eyebrow inline-flex items-center gap-1 hover:text-foreground">
                {c.title}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <ul className="mt-3 space-y-0.5" aria-label={`${label}: ${c.title}`}>
                {treatments
                  .filter((t) => t.group === c.group)
                  .map((t) => (
                    <li key={t.id}>
                      <Link
                        href={treatmentHref(t.id)}
                        onClick={onNavigate}
                        className="-mx-2 block whitespace-normal rounded-[2px] px-2 py-1.5 text-[0.9rem] text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          href={wide ? "/treatments" : columns[0].href}
          onClick={onNavigate}
          className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-primary"
        >
          {wide ? "See all treatments" : `See all ${label.toLowerCase()} treatments`}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </motion.div>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/95 text-foreground backdrop-blur-md transition-[border-color,box-shadow] duration-500 ${
        scrolled ? "border-border shadow-[0_8px_24px_-18px_rgba(11,30,70,0.35)]" : "border-transparent"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6">
        <Link href="/" aria-label="Devkripa Health Care Multispeciality Centre — home" className="shrink-0">
          <Logo priority className="h-9 w-auto md:h-10" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-6 whitespace-nowrap text-[0.9rem] font-semibold 2xl:gap-8 2xl:text-[0.95rem]">
            {nav.map((item) => {
              const active = isActive(item.href);
              const expanded = menuOpen === item.href;
              return (
                <li
                  key={item.href}
                  className={item.menu ? "relative flex items-center" : undefined}
                  onMouseEnter={item.menu ? () => setMenuOpen(item.href) : undefined}
                  onMouseLeave={item.menu ? () => setMenuOpen(null) : undefined}
                  onBlur={
                    item.menu
                      ? (e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenuOpen(null);
                        }
                      : undefined
                  }
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(null)}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-1 transition-colors ${
                      active ? "text-primary" : "link-underline text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-primary"
                        transition={{ duration: 0.45, ease }}
                      />
                    )}
                  </Link>
                  {item.menu && (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-label={`${item.label} menu`}
                        onClick={() => setMenuOpen(expanded ? null : item.href)}
                        className="inline-flex h-7 w-5 items-center justify-center text-foreground/60 hover:text-foreground"
                      >
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence>
                        {expanded && (
                          <DesktopDropdown menu={item.menu} label={item.label} onNavigate={() => setMenuOpen(null)} />
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={contact.phoneHref}
            aria-label={`Call now: ${contact.phoneDisplay}`}
            title={contact.phoneDisplay}
            className="btn btn-ghost !min-h-[44px] !w-11 !gap-2 !px-0 text-primary min-[400px]:!w-auto min-[400px]:!px-4 2xl:!px-5"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <span className="hidden min-[400px]:inline">Call now</span>
          </a>
          <Link
            href="/book"
            aria-current={isActive("/book") ? "page" : undefined}
            className="btn btn-primary hidden !min-h-[44px] sm:inline-flex sm:!px-4 2xl:!px-[1.4rem]"
          >
            <span className="lg:hidden xl:inline 2xl:hidden">Book now</span>
            <span className="hidden lg:inline xl:hidden 2xl:inline">Book appointment</span>
          </Link>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-muted xl:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" aria-hidden />
              </button>
            </Dialog.Trigger>
            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      className="fixed inset-0 z-[60] bg-ink/40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild forceMount>
                    <motion.div
                      className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto bg-background px-6 pb-8 pt-5 text-foreground"
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <div className="flex items-center justify-between">
                        <Dialog.Title asChild>
                          <span>
                            <Logo className="h-9 w-auto" />
                          </span>
                        </Dialog.Title>
                        <Dialog.Close
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted"
                          aria-label="Close menu"
                        >
                          <X className="h-6 w-6" aria-hidden />
                        </Dialog.Close>
                      </div>
                      <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                      <nav aria-label="Mobile" className="mt-10">
                        <ul className="space-y-1">
                          {nav.map((item, i) => {
                            const active = isActive(item.href);
                            const sectionOpen = mobileSection === item.href;
                            return (
                              <motion.li
                                key={item.href}
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease }}
                              >
                                {item.menu ? (
                                  <>
                                    <button
                                      type="button"
                                      aria-expanded={sectionOpen}
                                      onClick={() => setMobileSection(sectionOpen ? null : item.href)}
                                      className={`display flex w-full items-center justify-between border-b border-border py-4 text-left text-3xl ${
                                        active ? "text-primary" : ""
                                      }`}
                                    >
                                      {item.label}
                                      <ChevronDown
                                        className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                                          sectionOpen ? "rotate-180" : ""
                                        }`}
                                        aria-hidden
                                      />
                                    </button>
                                    <AnimatePresence initial={false}>
                                      {sectionOpen && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.35, ease }}
                                          className="overflow-hidden"
                                        >
                                          <div className="space-y-5 border-b border-border py-4">
                                            {menuColumns(item.menu).map((c) => (
                                              <div key={c.group}>
                                                <Link href={c.href} onClick={() => setOpen(false)} className="eyebrow">
                                                  {c.title}
                                                </Link>
                                                <ul className="mt-2">
                                                  <li>
                                                    <Link
                                                      href={c.href}
                                                      onClick={() => setOpen(false)}
                                                      className="block py-2 text-base font-semibold text-primary"
                                                    >
                                                      All {item.label.toLowerCase()} treatments
                                                    </Link>
                                                  </li>
                                                  {treatments
                                                    .filter((t) => t.group === c.group)
                                                    .map((t) => (
                                                      <li key={t.id}>
                                                        <Link
                                                          href={treatmentHref(t.id)}
                                                          onClick={() => setOpen(false)}
                                                          className="block py-2 text-base text-foreground/80"
                                                        >
                                                          {t.name}
                                                        </Link>
                                                      </li>
                                                    ))}
                                                </ul>
                                              </div>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                ) : (
                                  <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    aria-current={active ? "page" : undefined}
                                    className={`display flex items-center justify-between border-b border-border py-4 text-3xl ${
                                      active ? "text-primary" : ""
                                    }`}
                                  >
                                    {item.label}
                                    <ArrowUpRight className="h-5 w-5 text-muted-foreground" aria-hidden />
                                  </Link>
                                )}
                              </motion.li>
                            );
                          })}
                        </ul>
                      </nav>
                      <div className="mt-auto space-y-3 pt-8">
                        <Link href="/book" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                          Book appointment
                        </Link>
                        <a href={contact.phoneHref} className="btn btn-ghost w-full">
                          <Phone className="h-4 w-4" aria-hidden /> Call {contact.phoneDisplay}
                        </a>
                        <p className="pt-2 text-center text-sm text-muted-foreground">Open every day · {hours.label}</p>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
