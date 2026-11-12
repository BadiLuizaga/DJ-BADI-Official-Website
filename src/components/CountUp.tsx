"use client";

import { useEffect, useRef } from "react";

/**
 * Número que cuenta hacia arriba al entrar en pantalla.
 * El valor final se renderiza siempre (SEO / sin JS / lectores de pantalla);
 * la animación solo modifica el texto visual y se omite con movimiento reducido.
 */
export default function CountUp({
  value,
  suffix = "",
  from = 0,
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  from?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Si ya está visible al cargar, no se anima (evita parpadeos).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const render = (n: number) => {
      el.textContent = `${n}${suffix}`;
    };
    render(from);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          render(Math.round(from + (value - from) * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      render(value);
    };
  }, [value, suffix, from, duration]);

  return (
    <span className="count-up">
      <span ref={ref} aria-hidden="true">
        {`${value}${suffix}`}
      </span>
      <span className="visually-hidden">
        {`${value}${suffix}`}
      </span>
    </span>
  );
}
