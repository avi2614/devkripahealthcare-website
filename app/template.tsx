"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// Skip the transition on the very first page load (keeps LCP fast); animate on later navigations.
const session = { mounted: false };

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [animate] = useState(() => session.mounted);

  useEffect(() => {
    session.mounted = true;
  }, []);

  return (
    <motion.div
      initial={animate && !reduce ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
