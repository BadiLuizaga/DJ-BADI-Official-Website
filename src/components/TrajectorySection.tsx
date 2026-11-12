"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Maximize2,
  Music2,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import { artist } from "@/data/artist";
import CountUp from "@/components/CountUp";
import {
  CarouselControls,
  ExploreFilters,
  type FilterOption,
} from "@/components/explore/ExploreControls";
import ExploreDialog from "@/components/explore/ExploreDialog";
import { useCarousel } from "@/hooks/useCarousel";
import { useLightbox } from "@/hooks/useLightbox";

const cardBackground = (image: string) => ({
  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.38)), linear-gradient(0deg, rgba(0,0,0,.55), transparent), url("${image}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

type Category = "venues" | "events" | "collabs";
type FilterType = "all" | Category;

type TrajectoryItem = {
  id: string;
  className: string;
  category: Category;
  categoryLabel: string;
  kicker: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  image?: string;
  tags?: string[];
  reference?: { href: string; label: string };
  collaborations?: typeof artist.collaborations;
};

const ITEMS: TrajectoryItem[] = [
  {
    id: "clubs",
    className: "trajectory-clubs",
    category: "venues",
    categoryLabel: "ESCENARIOS",
    kicker: "01 / EXPERIENCIAS",
    title: "CLUBES",
    description: "Escenarios donde la música y el público se conectan.",
    Icon: Music2,
    image: "/Clubs.jpg",
    tags: artist.venues.clubs,
  },
  {
    id: "restobars",
    className: "trajectory-restobars",
    category: "venues",
    categoryLabel: "ESCENARIOS",
    kicker: "02 / EXPERIENCIAS",
    title: "RESTAURANTES",
    description: "Presentaciones en espacios sociales y experiencias nocturnas.",
    Icon: MapPin,
    image: "/restobar1.jpg",
    tags: artist.venues.restoBars,
    reference: {
      href: "https://www.tripadvisor.es/Restaurant_Review-g297317-d18193721-Reviews-Kaos_Resto_Bar-Santa_Cruz_Santa_Cruz_Department.html",
      label: "VER REFERENCIA",
    },
  },
  {
    id: "events",
    className: "trajectory-events",
    category: "events",
    categoryLabel: "EVENTOS",
    kicker: "03 / EXPERIENCIAS",
    title: "EVENTOS",
    description: "Adaptando cada presentación a la energía de cada celebración.",
    Icon: CalendarDays,
    image: "/Eventos.jpg",
    tags: artist.events,
  },
  {
    id: "collabs",
    className: "trajectory-collaborations collaboration-card",
    category: "collabs",
    categoryLabel: "COLABORACIONES",
    kicker: "04 / COLABORACIONES",
    title: "COLABORACIONES",
    description:
      "Sinergia musical, conexiones y experiencias compartidas sobre el escenario.",
    Icon: Users,
    collaborations: artist.collaborations,
  },
];

const FILTERS: FilterOption<FilterType>[] = [
  { value: "all", label: "TODAS", count: ITEMS.length },
  { value: "venues", label: "ESCENARIOS", count: ITEMS.filter((i) => i.category === "venues").length },
  { value: "events", label: "EVENTOS", count: ITEMS.filter((i) => i.category === "events").length },
  { value: "collabs", label: "COLABORACIONES", count: ITEMS.filter((i) => i.category === "collabs").length },
];

/** Contenido compartido entre la tarjeta y la vista ampliada. */
function ItemDetails({ item }: { item: TrajectoryItem }) {
  return (
    <>
      {item.tags && (
        <div className="venue-list">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}

      {item.collaborations && (
        <div className="collaboration-list">
          {item.collaborations.map((collaboration) => (
            <a
              key={collaboration.name}
              href={collaboration.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="collaboration-item"
            >
              <div>
                <strong>{collaboration.name}</strong>
                <span>{collaboration.description}</span>
              </div>

              <ArrowUpRight size={20} />
            </a>
          ))}
        </div>
      )}

      {item.reference && (
        <a
          href={item.reference.href}
          target="_blank"
          rel="noopener noreferrer"
          className="trajectory-reference"
        >
          {item.reference.label} <ArrowUpRight size={15} />
        </a>
      )}
    </>
  );
}

export default function TrajectorySection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredItems = ITEMS.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const {
    trackRef,
    active: activeSlide,
    onScroll: onTrackScroll,
    goTo: goToSlide,
    reset: resetCarousel,
  } = useCarousel(filteredItems.length);
  const lightbox = useLightbox(filteredItems.length);
  const current = lightbox.index !== null ? filteredItems[lightbox.index] : null;

  const changeFilter = (filter: FilterType) => {
    setActiveFilter(filter);
    resetCarousel();
  };

  const featuredUrl = artist.featuredEvent.url;
  const featuredContent = (
    <div>
      <span className="featured-label">
        <Sparkles size={14} />
        EVENTO DESTACADO
      </span>

      <h3>{artist.featuredEvent.name}</h3>

      <p>
        {artist.featuredEvent.venue} · {artist.featuredEvent.location}
      </p>
    </div>
  );

  return (
    <section id="trajectory" className="trajectory-section">
      <div className="trajectory-container">

        <div className="trajectory-heading-new">
          <div>
            <span className="section-kicker">
              <span className="kicker-line" />
              02 / MI TRAYECTORIA &amp; HITOS
            </span>

            <h2>
              CONSTRUIDO A TRAVÉS
              <br />
              <span>DE LA MÚSICA.</span>
            </h2>
          </div>

          <p className="trajectory-intro">
            Desde 2019, llevando música y energía a diferentes
            escenarios, eventos y experiencias. Cada presentación
            forma parte de un recorrido construido con pasión por
            la música.
          </p>
        </div>

        <div className="trajectory-stats">
          <div>
            <strong>
              <CountUp value={artist.since} from={2000} />
            </strong>
            <span>INICIO DE TRAYECTORIA</span>
          </div>

          <div>
            <strong>
              <CountUp
                value={
                  artist.venues.clubs.length + artist.venues.restoBars.length
                }
                suffix="+"
              />
            </strong>
            <span>ESCENARIOS</span>
          </div>

          <div>
            <strong>
              <CountUp value={artist.events.length} />
            </strong>
            <span>TIPOS DE EVENTOS</span>
          </div>
        </div>

        {/* Filtros (mismo sistema que la Galería) */}
        <ExploreFilters
          label="Filtros de trayectoria"
          options={FILTERS}
          active={activeFilter}
          onChange={changeFilter}
        />

        {/* Rejilla (escritorio) · carrusel deslizable (móvil) */}
        <div
          className="trajectory-grid explore-track"
          ref={trackRef}
          onScroll={onTrackScroll}
        >
          {filteredItems.map((item, index) => {
            const { Icon } = item;
            return (
              <article
                key={`${activeFilter}-${item.id}`}
                className={`trajectory-card ${item.className} explore-item`}
                style={{
                  ...(item.image ? cardBackground(item.image) : {}),
                  "--i": index,
                } as React.CSSProperties}
                onClick={(e) => {
                  // Los enlaces internos mantienen su propio comportamiento
                  if ((e.target as HTMLElement).closest("a, button")) return;
                  lightbox.open(index);
                }}
              >
                <div className="trajectory-card-top">
                  <span>{item.kicker}</span>
                  {/* El icono de la tarjeta es el acceso a la vista ampliada */}
                  <button
                    type="button"
                    className="explore-open-btn"
                    onClick={() => lightbox.open(index)}
                    aria-label={`Explorar ${item.title.toLowerCase()}`}
                  >
                    <Icon size={20} className="explore-open-icon" />
                    <Maximize2 size={16} className="explore-open-zoom" />
                  </button>
                </div>

                <div className="trajectory-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ItemDetails item={item} />
                </div>
              </article>
            );
          })}
        </div>

        <CarouselControls
          active={activeSlide}
          count={filteredItems.length}
          onGoTo={goToSlide}
          itemLabel="Experiencia"
        />

        {/* EVENTO DESTACADO: SABOR A MODA
            Sin enlace externo hasta contar con una publicación oficial verificada. */}
        {featuredUrl ? (
          <a
            className="featured-event-new"
            href={featuredUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {featuredContent}
            <ArrowUpRight size={28} />
          </a>
        ) : (
          <div className="featured-event-new">{featuredContent}</div>
        )}

      </div>

      {/* Vista ampliada de cada experiencia */}
      {current && lightbox.index !== null && (
        <ExploreDialog
          variant="trajectory"
          ariaLabel={`Experiencia ampliada: ${current.title}`}
          badge={current.categoryLabel}
          title={current.title}
          subtitle={current.description}
          index={lightbox.index}
          count={filteredItems.length}
          onClose={lightbox.close}
          onPrev={lightbox.prev}
          onNext={lightbox.next}
          onSelect={lightbox.setIndex}
          dialogRef={lightbox.dialogRef}
          closeButtonRef={lightbox.closeButtonRef}
          touchHandlers={lightbox.touchHandlers}
          thumbs={filteredItems.map((item) => ({
            key: item.id,
            label: item.title,
            content: (
              <span
                className="explore-thumb-art"
                style={item.image ? { backgroundImage: `url("${item.image}")` } : undefined}
              >
                <item.Icon size={18} />
              </span>
            ),
          }))}
        >
          <div
            key={current.id}
            className="trajectory-detail"
            style={current.image ? cardBackground(current.image) : undefined}
          >
            <div className="trajectory-card-top">
              <span>{current.kicker}</span>
              <current.Icon size={22} />
            </div>
            <div className="trajectory-detail-body">
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              <ItemDetails item={current} />
            </div>
          </div>
        </ExploreDialog>
      )}
    </section>
  );
}
