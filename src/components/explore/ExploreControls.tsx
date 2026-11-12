"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const pad = (n: number) => String(n).padStart(2, "0");

export type FilterOption<T extends string> = {
  value: T;
  label: string;
  count: number;
};

/** Filtros con contador: mismo sistema y estilos que la Galería. */
export function ExploreFilters<T extends string>({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: FilterOption<T>[];
  active: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="gallery-filters" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={active === option.value}
          className={`gallery-filter-btn ${active === option.value ? "active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label} <span>({option.count})</span>
        </button>
      ))}
    </div>
  );
}

/** Contador, puntos y flechas del carrusel móvil (estilos de la Galería). */
export function CarouselControls({
  active,
  count,
  onGoTo,
  itemLabel,
}: {
  active: number;
  count: number;
  onGoTo: (index: number) => void;
  itemLabel: string;
}) {
  if (count < 2) return null;
  return (
    <div className="gallery-carousel-controls">
      <span className="gallery-carousel-counter" aria-live="polite">
        <strong>{pad(active + 1)}</strong> / {pad(count)}
      </span>
      <div className="gallery-carousel-dots" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className={i === active ? "is-active" : undefined} />
        ))}
      </div>
      <div className="gallery-carousel-arrows">
        <button
          type="button"
          onClick={() => onGoTo(active - 1)}
          aria-label={`${itemLabel} anterior`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => onGoTo(active + 1)}
          aria-label={`${itemLabel} siguiente`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export const padIndex = pad;
