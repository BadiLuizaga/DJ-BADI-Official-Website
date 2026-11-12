"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección que cruza el centro de la pantalla.
 * Se usa para resaltar la navegación (scrollspy).
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Franja estrecha en el centro vertical de la ventana
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
