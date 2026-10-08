"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/logo";

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
    const t = window.setTimeout(() => setVisible(false), seen || reduce ? 0 : 950);
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo priority className="h-12 w-auto md:h-14" />
            </motion.span>
            <span className="mt-5 block h-px w-28 overflow-hidden bg-border">
              <motion.span
                className="block h-full bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
