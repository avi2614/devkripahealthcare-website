"use client";

import { useState, type ReactNode } from "react";
import { ChevronsLeftRight } from "lucide-react";

/**
 * Drag (or use arrow keys on) the handle to compare a "before" and "after" view.
 * The after layer sits underneath; the before layer is clipped from the right.
 */
export function BeforeAfter({
  before,
  after,
  label,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: {
  before: ReactNode;
  after: ReactNode;
  /** What is being compared, for screen readers. */
  label: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <figure className={className}>
      <div className="relative aspect-[4/3] select-none overflow-hidden rounded-2xl bg-muted">
        <div className="absolute inset-0">{after}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {before}
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          After
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg">
            <ChevronsLeftRight className="h-5 w-5" aria-hidden />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare before and after: ${label}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 grid grid-cols-2 gap-4 text-sm">
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Before</span>
          {beforeLabel}
        </span>
        <span className="text-right">
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-primary">After</span>
          {afterLabel}
        </span>
      </figcaption>
    </figure>
  );
}
