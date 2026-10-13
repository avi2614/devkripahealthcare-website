"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrandMark } from "@/components/ui/brand-mark";

/**
 * A brief branded curtain on first visit in a session. Never longer than ~1s,
 * skipped entirely for reduced-motion users and return visits.
 */
export function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("dk-intro") === "1";
      sessionStorage.setItem("dk-intro", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setVisible(false), seen || reduce ? 0 : 1250);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          className="loader-failsafe fixed inset-0 z-[200] flex items-center justify-center bg-background"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center">
            <motion.span
              className="block"
              initial={{ rotate: -90, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrandMark animate className="h-16 w-16 md:h-20 md:w-20" />
            </motion.span>
            <span className="mt-6 block overflow-hidden">
              <motion.span
                className="display block text-2xl md:text-3xl"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                Devkripa Health Care
              </motion.span>
            </span>
            <span className="mt-4 block h-[2px] w-32 overflow-hidden rounded-full bg-border">
              <motion.span
                className="block h-full bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
