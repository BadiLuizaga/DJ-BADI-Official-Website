/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: "performances" | "events";
  categoryLabel: string;
  location: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "vintage-set",
    src: "/gallery/performances/Vintage 27_02.jpg",
    alt: "DJ BADI en presentación en vivo - Vintage Session",
    title: "VINTAGE SESSION",
    category: "performances",
    categoryLabel: "PRESENTACIONES",
    location: "Live Performance",
  },
  {
    id: "badi-m",
    src: "/gallery/performances/BadiM (2).jpg",
    alt: "DJ BADI en cabina de mezcla - Sound Experience",
    title: "SOUND EXPERIENCE",
    category: "performances",
    categoryLabel: "PRESENTACIONES",
    location: "Club Set",
  },
  {
    id: "badi-cancun",
    src: "/gallery/performances/BadiCancun.jpeg",
    alt: "DJ BADI presentación en Cancún",
    title: "CANCÚN TOUR",
    category: "performances",
    categoryLabel: "PRESENTACIONES",
    location: "Tour Especial",
  },
  {
    id: "badi-q",
    src: "/gallery/performances/BadiQ.JPG (2).jpeg",
    alt: "DJ BADI energía en escenario principal",
    title: "THE ENERGY",
    category: "performances",
    categoryLabel: "PRESENTACIONES",
    location: "Main Stage",
  },
  {
    id: "badi-milu",
    src: "/gallery/events/BadiMilu.jpeg",
    alt: "DJ BADI en evento privado exclusivo",
    title: "PRIVATE CELEBRATION",
    category: "events",
    categoryLabel: "EVENTOS",
    location: "Evento Exclusivo",
  },
];

type FilterType = "all" | "performances" | "events";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const counts = {
    all: GALLERY_ITEMS.length,
    performances: GALLERY_ITEMS.filter((i) => i.category === "performances").length,
    events: GALLERY_ITEMS.filter((i) => i.category === "events").length,
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        showNext();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        {/* Header */}
        <header className="gallery-heading">
          <div>
            <span className="gallery-kicker">
              <span className="gallery-kicker-line" />
              04 / GALERÍA &amp; MOMENTOS
            </span>
            <h2>
              VISUAL<br />
              <span>EXPERIENCE.</span>
            </h2>
          </div>
          <p>
            Una selección fotográfica de presentaciones, energía en cabina y
            experiencias en vivo de DJ BADI.
          </p>
        </header>

        {/* Filter Navigation */}
        <div className="gallery-filters" role="tablist" aria-label="Filtros de galería">
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "all"}
            className={`gallery-filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            TODAS <span>({counts.all})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "performances"}
            className={`gallery-filter-btn ${activeFilter === "performances" ? "active" : ""}`}
            onClick={() => setActiveFilter("performances")}
          >
            PRESENTACIONES <span>({counts.performances})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === "events"}
            className={`gallery-filter-btn ${activeFilter === "events" ? "active" : ""}`}
            onClick={() => setActiveFilter("events")}
          >
            EVENTOS <span>({counts.events})</span>
          </button>
        </div>

        {/* Masonry / Editorial Grid */}
        <div className="gallery-masonry">
          {filteredItems.map((item, index) => (
            <figure
              key={item.id}
              className={`gallery-item gallery-item-${index + 1}`}
              onClick={() => openLightbox(index)}
              tabIndex={0}
              role="button"
              aria-label={`Ampliar fotografía: ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              <div className="gallery-image-wrapper">
                {/* Standard img tag for optimal raw asset loading with fallback */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-top">
                    <span className="gallery-badge">{item.categoryLabel}</span>
                    <span className="gallery-zoom-icon">
                      <Maximize2 size={16} />
                    </span>
                  </div>
                  <div className="gallery-overlay-bottom">
                    <h3>{item.title}</h3>
                    <p>{item.location}</p>
                  </div>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografía ampliada: ${currentItem.title}`}
          onClick={closeLightbox}
        >
          <div className="lightbox-backdrop" />

          {/* Close button */}
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={closeLightbox}
            aria-label="Cerrar vista ampliada (Escape)"
          >
            <X size={24} />
          </button>

          {/* Previous button */}
          {filteredItems.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn lightbox-prev-btn"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Fotografía anterior"
            >
              <ChevronLeft size={30} />
            </button>
          )}

          {/* Next button */}
          {filteredItems.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn lightbox-next-btn"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Fotografía siguiente"
            >
              <ChevronRight size={30} />
            </button>
          )}

          {/* Lightbox Content Container */}
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-image-container">
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                className="lightbox-img"
              />
            </div>

            <div className="lightbox-info">
              <div className="lightbox-info-left">
                <span className="lightbox-badge">{currentItem.categoryLabel}</span>
                <h4>{currentItem.title}</h4>
                <p>{currentItem.location}</p>
              </div>
              <div className="lightbox-info-right">
                <span className="lightbox-counter">
                  0{lightboxIndex! + 1} / 0{filteredItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
