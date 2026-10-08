"use client";

import { useEffect, useRef, type RefObject, type VideoHTMLAttributes } from "react";

/** Keeps a video playing: starts it, and resumes whenever the browser pauses it (tab switch, power saving). */
export function useAlwaysPlay(ref: RefObject<HTMLVideoElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const play = () => {
      if (v.paused) v.play().catch(() => {});
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") play();
    };
    play();
    v.addEventListener("pause", play);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      v.removeEventListener("pause", play);
      document.removeEventListener("visibilitychange", onVisible);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Muted, looping, control-less video that never stays paused. */
export function AlwaysPlayingVideo(props: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);
  useAlwaysPlay(ref);
  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      {...props}
    />
  );
}
