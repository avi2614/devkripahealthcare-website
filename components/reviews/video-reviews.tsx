"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useAlwaysPlay } from "@/components/ui/always-playing-video";
import { videoReviews, type VideoReview } from "@/data/site";

/** Patient video testimonials — always playing, muted by default, with a sound toggle that never pauses. */
export function VideoReviews() {
  const [unmuted, setUnmuted] = useState<string | null>(null);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {videoReviews.map((v, idx) => (
        <Reveal key={v.src} delay={idx * 0.08}>
          <VideoCard
            review={v}
            muted={unmuted !== v.src}
            onToggleSound={() => setUnmuted((cur) => (cur === v.src ? null : v.src))}
          />
        </Reveal>
      ))}
    </div>
  );
}

function VideoCard({ review, muted, onToggleSound }: { review: VideoReview; muted: boolean; onToggleSound: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useAlwaysPlay(ref);

  // `muted` must be set on the element directly for React to keep it in sync.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = muted;
    if (v.paused) v.play().catch(() => {});
  }, [muted]);

  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink">
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={review.src}
          poster={review.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-label={`Video review: ${review.quote}`}
        />
        <button
          type="button"
          onClick={onToggleSound}
          className="on-dark absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
        >
          {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 text-[0.95rem]">
        <span className="display text-lg">&ldquo;{review.quote}&rdquo;</span>
        <span className="text-muted-foreground">{review.topic}</span>
      </figcaption>
    </figure>
  );
}
