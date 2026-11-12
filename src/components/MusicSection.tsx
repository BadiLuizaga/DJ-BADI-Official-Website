"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Headphones,
  Maximize2,
  Music2,
  Radio,
  Video,
  type LucideIcon,
} from "lucide-react";

import { artist } from "@/data/artist";
import {
  CarouselControls,
  ExploreFilters,
  type FilterOption,
} from "@/components/explore/ExploreControls";
import ExploreDialog from "@/components/explore/ExploreDialog";
import { useCarousel } from "@/hooks/useCarousel";
import { useLightbox } from "@/hooks/useLightbox";

const SOUNDCLOUD_EMBED =
  "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/badi-luizaga/dj-badi-house-mix-vol1&color=%23ff5a1f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true";

type TrackType = "mixes" | "videos";
type FilterType = "all" | TrackType;

type Track = {
  id: string;
  type: TrackType;
  typeLabel: string;
  className: string;
  number: string;
  title: string;
  accent: string;
  subtitle: string;
  LiveIcon: LucideIcon;
  liveLabel: string;
  PlayerIcon: LucideIcon;
  status: string;
  player: { kind: "soundcloud" | "youtube"; title: string; src: string };
};

const TRACKS: Track[] = [
  {
    id: "house-mix-vol1",
    type: "mixes",
    typeLabel: "MIX · SOUNDCLOUD",
    className: "",
    number: "001",
    title: "HOUSE MIX",
    accent: "VOL. 1",
    subtitle: "Una sesión de DJ BADI.",
    LiveIcon: Radio,
    liveLabel: "DJ BADI / SOUND EXPERIENCE",
    PlayerIcon: Headphones,
    status: "ONLINE",
    player: {
      kind: "soundcloud",
      title: "DJ BADI - House Mix Vol. 1 en SoundCloud",
      src: SOUNDCLOUD_EMBED,
    },
  },
  {
    id: "ella-quiere-beber",
    type: "videos",
    typeLabel: "VIDEO · YOUTUBE",
    className: "music-feature-youtube",
    number: "002",
    title: "ELLA QUIERE",
    accent: "BEBER",
    subtitle: "Anuel AA — Extended Edit por DJ BADI.",
    LiveIcon: Video,
    liveLabel: "YOUTUBE / SESIÓN EN VIVO",
    PlayerIcon: Video,
    status: "EN VIVO",
    player: {
      kind: "youtube",
      title: "DJ BADI - Ella Quiere Beber (Anuel AA) Extended Edit",
      src: "https://www.youtube.com/embed/NXuMXYUddWc",
    },
  },
];

const FILTERS: FilterOption<FilterType>[] = [
  { value: "all", label: "TODOS", count: TRACKS.length },
  { value: "mixes", label: "MIXES", count: TRACKS.filter((t) => t.type === "mixes").length },
  { value: "videos", label: "VIDEOS", count: TRACKS.filter((t) => t.type === "videos").length },
];

/** Enlaces propios de cada pieza (se conservan los originales). */
function TrackLinks({ track }: { track: Track }) {
  if (track.player.kind === "soundcloud") {
    return (
      <>
        {/* Spotify profile link */}
        <div className="music-player-wrapper">
          <div className="music-player-top">
            <span>
              <Music2 size={16} />
              SPOTIFY
            </span>
            <span className="music-player-status">
              <span />
              ENLACE
            </span>
          </div>
          <a
            href={artist.social.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="music-external-link"
          >
            ABRIR EN SPOTIFY
            <ArrowUpRight size={17} />
          </a>
        </div>

        {/* SoundCloud link */}
        <a
          href="https://soundcloud.com/badi-luizaga/dj-badi-house-mix-vol1"
          target="_blank"
          rel="noopener noreferrer"
          className="music-external-link"
        >
          ABRIR EN SOUNDCLOUD
          <ArrowUpRight size={17} />
        </a>
      </>
    );
  }

  return (
    <>
      <a
        href="https://youtu.be/NXuMXYUddWc"
        target="_blank"
        rel="noopener noreferrer"
        className="music-external-link"
      >
        ABRIR EN YOUTUBE
        <ArrowUpRight size={17} />
      </a>

      <a
        href={artist.social.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="music-external-link"
      >
        CANAL OFICIAL
        <ArrowUpRight size={17} />
      </a>
    </>
  );
}

/** Reproductor sin reproducción automática; carga diferida. */
function Player({ track }: { track: Track }) {
  if (track.player.kind === "soundcloud") {
    return (
      <iframe
        title={track.player.title}
        width="100%"
        height="300"
        scrolling="no"
        frameBorder="0"
        allow="autoplay"
        loading="lazy"
        src={track.player.src}
      />
    );
  }
  return (
    <iframe
      title={track.player.title}
      width="100%"
      height="300"
      src={track.player.src}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}

export default function MusicSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredTracks = TRACKS.filter(
    (track) => activeFilter === "all" || track.type === activeFilter
  );

  const {
    trackRef,
    active: activeSlide,
    onScroll: onTrackScroll,
    goTo: goToSlide,
    reset: resetCarousel,
  } = useCarousel(filteredTracks.length);
  const lightbox = useLightbox(filteredTracks.length);
  const current = lightbox.index !== null ? filteredTracks[lightbox.index] : null;

  const changeFilter = (filter: FilterType) => {
    setActiveFilter(filter);
    resetCarousel();
  };

  return (
    <section className="music-section-new" id="music">
      <div className="music-container-new">
        {/* Header */}
        <header className="music-heading-new">
          <div>
            <span className="music-kicker-new">
              <span />
              03 / MI UNIVERSO MUSICAL
            </span>
            <h2>
              SELECTED<br />
              <span>SOUNDS.</span>
            </h2>
          </div>
          <p>
            Una selección de sonidos, mezclas y experiencias musicales.
            Descubre mi propuesta y conecta con mi frecuencia.
          </p>
        </header>

        {/* Filtros (mismo sistema que la Galería) */}
        <ExploreFilters
          label="Filtros de música"
          options={FILTERS}
          active={activeFilter}
          onChange={changeFilter}
        />

        {/* Piezas: lista (escritorio) · carrusel deslizable (móvil) */}
        <div
          className="music-tracks explore-track"
          ref={trackRef}
          onScroll={onTrackScroll}
        >
          {filteredTracks.map((track, index) => {
            const { LiveIcon, PlayerIcon } = track;
            return (
              <article
                key={`${activeFilter}-${track.id}`}
                className={`music-feature-new ${track.className} explore-item`}
                style={{ "--i": index } as React.CSSProperties}
              >
                <div className="music-feature-info">
                  <span className="music-live-label">
                    <LiveIcon size={15} />
                    {track.liveLabel}
                  </span>

                  <div className="music-feature-title">
                    <span className="music-feature-number">{track.number}</span>
                    <h3>
                      {track.title} <span>{track.accent}</span>
                    </h3>
                    <p>{track.subtitle}</p>
                  </div>

                  <TrackLinks track={track} />
                </div>

                <div className="music-player-wrapper">
                  <div className="music-player-top">
                    <span>
                      <PlayerIcon size={16} />
                      REPRODUCTOR OFICIAL
                    </span>
                    <span className="music-player-actions">
                      <span className="music-player-status">
                        <span />
                        {track.status}
                      </span>
                      <button
                        type="button"
                        className="music-stage-btn"
                        onClick={() => lightbox.open(index)}
                        aria-label={`Abrir ${track.title} ${track.accent} en modo escenario`}
                      >
                        <Maximize2 size={13} />
                        <span>AMPLIAR</span>
                      </button>
                    </span>
                  </div>

                  {/* Mientras el modo escenario está abierto, el reproductor
                      se desmonta aquí para que no suenen dos a la vez */}
                  {lightbox.isOpen ? (
                    <div className="music-player-placeholder">
                      <PlayerIcon size={22} />
                      REPRODUCIENDO EN MODO ESCENARIO
                    </div>
                  ) : (
                    <Player track={track} />
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <CarouselControls
          active={activeSlide}
          count={filteredTracks.length}
          onGoTo={goToSlide}
          itemLabel="Pieza musical"
        />

        {/* Signature */}
        <div className="music-signature">
          <span>DJ BADI</span>
          <span>FEEL THE ENERGY. LIVE THE SOUND.</span>
        </div>
      </div>

      {/* Modo escenario: reproductor ampliado */}
      {current && lightbox.index !== null && (
        <ExploreDialog
          variant="music"
          ariaLabel={`Modo escenario: ${current.title} ${current.accent}`}
          badge={current.typeLabel}
          title={`${current.title} ${current.accent}`}
          subtitle={current.subtitle}
          index={lightbox.index}
          count={filteredTracks.length}
          onClose={lightbox.close}
          onPrev={lightbox.prev}
          onNext={lightbox.next}
          onSelect={lightbox.setIndex}
          dialogRef={lightbox.dialogRef}
          closeButtonRef={lightbox.closeButtonRef}
          touchHandlers={lightbox.touchHandlers}
          thumbs={filteredTracks.map((track) => ({
            key: track.id,
            label: `${track.title} ${track.accent}`,
            content: (
              <span className="explore-thumb-art explore-thumb-number">
                <track.PlayerIcon size={14} />
                {track.number}
              </span>
            ),
          }))}
        >
          <div
            key={current.id}
            className={`music-stage music-stage-${current.player.kind}`}
          >
            <Player track={current} />
          </div>
        </ExploreDialog>
      )}
    </section>
  );
}
