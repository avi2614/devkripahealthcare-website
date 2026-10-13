"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * The logo's cross on its own: red upper half, blue lower half, split by a white swoosh.
 * With `animate`, the two halves fly in from opposite corners and lock together.
 */
export function BrandMark({ className = "h-10 w-10", animate = false }: { className?: string; animate?: boolean }) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const play = animate && !reduce;
  const ease = [0.22, 1, 0.36, 1] as const;

  const cross = (
    <>
      <rect x="32" y="0" width="36" height="100" rx="9" />
      <rect x="0" y="32" width="100" height="36" rx="9" />
    </>
  );

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`${id}-r`}>
          <path d="M0 0H100V26Q46 42 18 100H0Z" />
        </clipPath>
        <clipPath id={`${id}-b`}>
          <path d="M100 35Q52 52 28 100H100Z" />
        </clipPath>
      </defs>
      <motion.g
        clipPath={`url(#${id}-r)`}
        fill="#ee1c25"
        initial={play ? { x: -28, y: -28, opacity: 0 } : false}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
      >
        {cross}
      </motion.g>
      <motion.g
        clipPath={`url(#${id}-b)`}
        fill="#0b5fef"
        initial={play ? { x: 28, y: 28, opacity: 0 } : false}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.08, ease }}
      >
        {cross}
      </motion.g>
    </svg>
  );
}
