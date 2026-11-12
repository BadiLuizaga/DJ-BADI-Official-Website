"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
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
  /** Dimensiones originales: reservan el espacio y evitan saltos de diseño. */
  width: number;
  height: number;
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
    width: 3024,
    height: 4032,
  },
  {
    id: "badi-m",
    src: "/gallery/performances/BadiM (2).jpg",
    alt: "DJ BADI en cabina de mezcla - Sound Experience",
    title: "MILÚ CLUB",
    category: "performances",
    categoryLabel: "PRESENTACIONES",
    location: "Club Set",
    width: 3024,
    height: 4032,
  },
  {
    id: "badi-cancun",
    src: "/gallery/performances/BadiCancun.jpeg",
    alt: "DJ BADI presentación en Cancún",
    title: "CANCÚN TOUR",
    category: "performances",
    categoryLabel: "PRESENTACIONES",
    location: "Tour Especial",
    width: 1086,
    height: 1448,
  },
  {
    id: "badi-q",
    src: "/gallery/performances/BadiQ.JPG (2).jpeg",
    alt: "DJ BADI energía en escenario principal",
    title: "LA MANSIÓN RESTOBAR",
    category: "performances",
    categoryLabel: "PRESENTACIONES",
    location: "Main Stage",
    width: 1170,
    height: 2052,
  },
  {
    id: "badi-milu",
    src: "/gallery/events/BadiMilu.jpeg",
    alt: "DJ BADI en evento privado exclusivo",
    title: "PRIVATE CELEBRATION",
    category: "events",
    categoryLabel: "EVENTOS",
    location: "Evento Exclusivo",
    width: 1086,
    height: 1448,
  },
];

type FilterType = "all" | "performances" | "events";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

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

  const changeFilter = (filter: FilterType) => {
    setActiveFilter(filter);
    setActiveSlide(0);
    trackRef.current?.scrollTo({ left: 0 });
  };

  // Carrusel móvil: detecta la fotografía centrada al deslizar
  const handleTrackScroll = () => {
    if (scrollFrameRef.current) return;
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = 0;
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
      setActiveSlide(closest);
    });
  };

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    const total = filteredItems.length;
    if (!track || total === 0) return;
    const target = track.children[(index + total) % total] as HTMLElement;
    track.scrollTo({
      left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  // Lightbox: gesto de deslizar en pantallas táctiles
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) < 45) return;
    if (deltaX < 0) showNext();
    else showPrev();
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
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

  const isLightboxOpen = lightboxIndex !== null;

  // Focus management: move focus into the dialog and restore it on close
  useEffect(() => {
    if (!isLightboxOpen) return;
    closeButtonRef.current?.focus();
    return () => {
      lastFocusedRef.current?.focus();
    };
  }, [isLightboxOpen]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) {
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
      } else if (e.key === "Tab") {
        // Keep keyboard focus inside the dialog
        const dialog = document.querySelector<HTMLElement>(".gallery-lightbox");
        const focusable = dialog?.querySelectorAll<HTMLElement>("button");
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
        <div className="gallery-filters" role="group" aria-label="Filtros de galería">
          <button
            type="button"
            aria-pressed={activeFilter === "all"}
            className={`gallery-filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => changeFilter("all")}
          >
            TODAS <span>({counts.all})</span>
          </button>
          <button
            type="button"
            aria-pressed={activeFilter === "performances"}
            className={`gallery-filter-btn ${activeFilter === "performances" ? "active" : ""}`}
            onClick={() => changeFilter("performances")}
          >
            PRESENTACIONES <span>({counts.performances})</span>
          </button>
          <button
            type="button"
            aria-pressed={activeFilter === "events"}
            className={`gallery-filter-btn ${activeFilter === "events" ? "active" : ""}`}
            onClick={() => changeFilter("events")}
          >
            EVENTOS <span>({counts.events})</span>
          </button>
        </div>

        {/* Masonry editorial (escritorio) · carrusel deslizable (móvil) */}
        <div
          className="gallery-masonry"
          ref={trackRef}
          onScroll={handleTrackScroll}
        >
          {filteredItems.map((item, index) => (
            <figure
              key={`${activeFilter}-${item.id}`}
              className={`gallery-item gallery-item-${index + 1}`}
              style={{ "--i": index } as React.CSSProperties}
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
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 768px) 94vw, (max-width: 1024px) 47vw, 434px"
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

        {/* Controles del carrusel (solo móvil) */}
        {filteredItems.length > 1 && (
          <div className="gallery-carousel-controls">
            <span className="gallery-carousel-counter" aria-live="polite">
              <strong>{String(activeSlide + 1).padStart(2, "0")}</strong> /{" "}
              {String(filteredItems.length).padStart(2, "0")}
            </span>
            <div className="gallery-carousel-dots" aria-hidden="true">
              {filteredItems.map((item, index) => (
                <span
                  key={item.id}
                  className={index === activeSlide ? "is-active" : undefined}
                />
              ))}
            </div>
            <div className="gallery-carousel-arrows">
              <button
                type="button"
                onClick={() => goToSlide(activeSlide - 1)}
                aria-label="Fotografía anterior del carrusel"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => goToSlide(activeSlide + 1)}
                aria-label="Fotografía siguiente del carrusel"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
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
            ref={closeButtonRef}
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
            <div
              className="lightbox-image-container"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                key={currentItem.id}
                src={currentItem.src}
                alt={currentItem.alt}
                width={currentItem.width}
                height={currentItem.height}
                sizes="85vw"
                loading="eager"
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
                  {String(lightboxIndex! + 1).padStart(2, "0")} /{" "}
                  {String(filteredItems.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {filteredItems.length > 1 && (
              <div className="lightbox-thumbs" role="group" aria-label="Miniaturas">
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`lightbox-thumb ${index === lightboxIndex ? "is-active" : ""}`}
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Ver fotografía: ${item.title}`}
                    aria-current={index === lightboxIndex ? "true" : undefined}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                      sizes="72px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
