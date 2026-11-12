"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Carrusel horizontal con scroll-snap (mismo sistema que la Galería):
 * detecta el elemento centrado al deslizar y permite saltar a uno concreto.
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>(count: number) {
  const trackRef = useRef<T>(null);
  const frameRef = useRef(0);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const track = trackRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDistance = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (distance < minDistance) {
          minDistance = distance;
          closest = i;
        }
      });
      setActive(closest);
    });
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const target = track.children[(index + count) % count] as HTMLElement | undefined;
      if (!target) return;
      track.scrollTo({
        left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
        behavior: "smooth",
      });
    },
    [count]
  );

  const reset = useCallback(() => {
    setActive(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, []);

  return { trackRef, active, onScroll, goTo, reset };
}
