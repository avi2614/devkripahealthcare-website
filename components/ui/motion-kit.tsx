"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/components/ui/smooth-scroll";

const ease = [0.22, 1, 0.36, 1] as const;

/** True for a mouse/trackpad user who hasn't asked for reduced motion. */
function useFinePointer() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine && !reduce;
}

/* ------------------------------------------------------------------ */
/*  3D tilt card with a moving glare (Aceternity "3D card")            */
/* ------------------------------------------------------------------ */
export function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const enabled = useFinePointer();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(500px circle at ${gx} ${gy}, rgba(255,255,255,0.22), transparent 45%)`;
  const [hover, setHover] = useState(false);

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => {
          setHover(false);
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-soft-light"
          style={{ background: glare }}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Word-by-word blur-up headline reveal (Magic UI "blur fade" text)   */
/* ------------------------------------------------------------------ */
function splitWords(node: ReactNode, counter: { i: number }, reduce: boolean, mode: "view" | "mount", stagger: number): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((part, k) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return part;
        const i = counter.i++;
        const target = { opacity: 1, y: 0, filter: "blur(0px)" };
        return (
          <motion.span
            key={`${i}-${k}`}
            className="inline-block will-change-transform"
            initial={reduce ? false : { opacity: 0, y: "0.45em", filter: "blur(10px)" }}
            {...(mode === "view"
              ? { whileInView: target, viewport: { once: true, margin: "0px 0px -10% 0px" } }
              : { animate: target })}
            transition={{ duration: 0.8, delay: i * stagger, ease }}
          >
            {part}
          </motion.span>
        );
      });
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
      return cloneElement(child as ReactElement<{ children?: ReactNode }>, {}, splitWords(child.props.children, counter, reduce, mode, stagger));
    }
    return child;
  });
}

/** Wrap a heading's contents: `<h2><WordsReveal>A real place, <em>a team</em></WordsReveal></h2>`. */
export function WordsReveal({
  children,
  mode = "view",
  stagger = 0.055,
}: {
  children: ReactNode;
  mode?: "view" | "mount";
  stagger?: number;
}) {
  const reduce = !!useReducedMotion();
  return <>{splitWords(children, { i: 0 }, reduce, mode, stagger)}</>;
}

/* ------------------------------------------------------------------ */
/*  Magnetic pull towards the cursor for primary CTAs                  */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, strength = 0.3, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const enabled = useFinePointer();
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  if (!enabled) return <span className={`inline-flex ${className}`}>{children}</span>;
  return (
    <motion.span
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll parallax                                                    */
/* ------------------------------------------------------------------ */
export function Parallax({ children, offset = 40, className = "" }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Back-to-top button with a scroll-progress ring                     */
/* ------------------------------------------------------------------ */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => scrollY.on("change", (v) => setShow(v > 900)), [scrollY]);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-[5.5rem] right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-card text-primary shadow-[0_12px_30px_-12px_rgba(11,30,70,0.45)] md:bottom-[6.75rem] md:right-9"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.35, ease }}
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="24" cy="24" r="22" fill="none" stroke="var(--border)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="url(#btt-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
            <defs>
              <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp className="h-5 w-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Gentle up-and-down float for badges sitting on photos. */
export function Float({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/** A vertical line that fills top-to-bottom as its parent scrolls through the viewport. */
export function ScrollLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <span ref={ref} aria-hidden className={`pointer-events-none absolute inset-y-0 w-px bg-white/10 ${className}`}>
      <motion.span
        className="absolute inset-0 origin-top bg-[linear-gradient(180deg,var(--highlight),var(--accent))]"
        style={{ scaleY }}
      />
    </span>
  );
}
