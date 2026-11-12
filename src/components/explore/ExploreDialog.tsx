"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ReactNode, RefObject } from "react";

import { padIndex } from "./ExploreControls";

export type ExploreThumb = {
  key: string;
  label: string;
  content: ReactNode;
};

/**
 * Vista ampliada reutilizable con la estructura y estilos del Lightbox
 * de la Galería: cerrar, anterior/siguiente, información, contador y miniaturas.
 */
export default function ExploreDialog({
  ariaLabel,
  badge,
  title,
  subtitle,
  index,
  count,
  onClose,
  onPrev,
  onNext,
  onSelect,
  thumbs,
  dialogRef,
  closeButtonRef,
  touchHandlers,
  variant,
  children,
}: {
  ariaLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  index: number;
  count: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  thumbs: ExploreThumb[];
  dialogRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
  variant: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`gallery-lightbox explore-dialog explore-dialog-${variant}`}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
      ref={dialogRef}
    >
      <div className="lightbox-backdrop" />

      <button
        type="button"
        className="lightbox-close-btn"
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Cerrar vista ampliada (Escape)"
      >
        <X size={24} />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            className="lightbox-nav-btn lightbox-prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Anterior"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            type="button"
            className="lightbox-nav-btn lightbox-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Siguiente"
          >
            <ChevronRight size={30} />
          </button>
        </>
      )}

      <div className="lightbox-content explore-dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="explore-dialog-stage" {...touchHandlers}>
          {children}
        </div>

        <div className="lightbox-info">
          <div className="lightbox-info-left">
            <span className="lightbox-badge">{badge}</span>
            <h4>{title}</h4>
            <p>{subtitle}</p>
          </div>
          <div className="lightbox-info-right">
            <span className="lightbox-counter">
              {padIndex(index + 1)} / {padIndex(count)}
            </span>
          </div>
        </div>

        {count > 1 && (
          <div className="lightbox-thumbs" role="group" aria-label="Miniaturas">
            {thumbs.map((thumb, i) => (
              <button
                key={thumb.key}
                type="button"
                className={`lightbox-thumb explore-thumb ${i === index ? "is-active" : ""}`}
                onClick={() => onSelect(i)}
                aria-label={`Ver: ${thumb.label}`}
                aria-current={i === index ? "true" : undefined}
              >
                {thumb.content}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
