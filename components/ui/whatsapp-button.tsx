"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/data/site";

/** Floating WhatsApp shortcut; appears once the visitor has scrolled past the hero. */
export function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const onScroll = () => {
      // On the home page wait until the hero is passed; elsewhere show it straight away.
      const pastHero = pathname !== "/" || window.scrollY > window.innerHeight * 0.6;
      // Step aside at the very bottom so it never covers the footer's legal row and studio credit.
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 140;
      setShow(pastHero && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <aside aria-label="Quick contact">
      <AnimatePresence>
        {show && (
          <motion.a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us — chat with the clinic (opens in a new tab)"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[#1f7a4d] pl-4 pr-4 text-white shadow-[0_14px_30px_-12px_rgba(16,60,38,0.6)] transition-[gap,padding] duration-500 hover:gap-2.5 hover:pr-5 focus-visible:gap-2.5 focus-visible:pr-5 md:bottom-8 md:right-8"
          >
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width] duration-500 group-hover:max-w-[8rem] group-focus-visible:max-w-[8rem]">
              WhatsApp us
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </aside>
  );
}
