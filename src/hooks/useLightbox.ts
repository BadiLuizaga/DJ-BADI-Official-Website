"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Vista ampliada (mismo comportamiento que el Lightbox de la Galería):
 * teclado (Escape, flechas, Tab atrapado), bloqueo de scroll,
 * gestión del foco y gesto de deslizar en pantallas táctiles.
 */
export function useLightbox(count: number) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const isOpen = index !== null;

  const open = useCallback((i: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setIndex(i);
  }, []);

  const close = useCallback(() => setIndex(null), []);

  const next = useCallback(() => {
    setIndex((prev) => (prev === null ? prev : (prev + 1) % count));
  }, [count]);

  const prev = useCallback(() => {
    setIndex((p) => (p === null ? p : (p - 1 + count) % count));
  }, [count]);

  // Foco: entra al diálogo y vuelve al elemento de origen al cerrar
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    return () => {
      lastFocusedRef.current?.focus();
    };
  }, [isOpen]);

  // Teclado y bloqueo del scroll de fondo
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button, a[href], iframe"
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchStartXRef.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      touchStartXRef.current = null;
      if (Math.abs(deltaX) < 45) return;
      if (deltaX < 0) next();
      else prev();
    },
  };

  return {
    index,
    isOpen,
    open,
    close,
    next,
    prev,
    setIndex,
    dialogRef,
    closeButtonRef,
    touchHandlers,
  };
}
