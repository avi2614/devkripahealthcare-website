"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Eased wheel scrolling for desktop pointers. Touch devices keep native scrolling,
 * and it is switched off entirely for people who prefer reduced motion.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -80 },
      autoRaf: true,
      // Let scrollable areas inside dialogs (menu, photo viewer) scroll natively.
      prevent: (node) => !!node.closest?.('[role="dialog"]'),
    });
    lenisRef.current = lenis;

    // Radix dialogs lock page scroll by marking <body>; pause Lenis while they're open.
    const observer = new MutationObserver(() => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    return () => {
      observer.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page: start at the top (unless the link points at a section on it).
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
