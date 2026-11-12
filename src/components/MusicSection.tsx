
"use client";

import {
  ArrowUpRight,
  Headphones,
  Music2,
  Play,
  Radio,
} from "lucide-react";

import { artist } from "@/data/artist";

export default function MusicSection() {
  const soundCloudEmbed =
    "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/badi-luizaga/dj-badi-house-mix-vol1&color=%23ff5a1f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true";

  return (
    <section className="music-section-new" id="music">
      <div className="music-container-new">

        <header className="music-heading-new">
          <div>
            <span className="music-kicker-new">
              <span />
              03 / MI UNIVERSO MUSICAL
            </span>

            <h2>
              SELECTED
              <br />
              <span>SOUNDS.</span>
            </h2>
          </div>

          <p>
            Una selección de sonidos, mezclas y experiencias musicales.
            Descubre mi propuesta y conecta con mi frecuencia.
          </p>
        </header>

        <div className="music-feature-new">
          <div className="music-feature-info">
            <span className="music-live-label">
              <Radio size={15} />
              DJ BADI / SOUND EXPERIENCE
            </span>

            <div className="music-feature-title">
              <span className="music-feature-number">001</span>
              <h3>HOUSE MIX <span>VOL. 1</span></h3>
              <p>Una sesión de DJ BADI.</p>
            </div>

            <a
              href="https://soundcloud.com/badi-luizaga/dj-badi-house-mix-vol1"
              target="_blank"
              rel="noopener noreferrer"
              className="music-external-link"
            >
              ABRIR EN SOUNDCLOUD
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="music-player-wrapper">
            <div className="music-player-top">
              <span>
                <Headphones size={16} />
                REPRODUCTOR OFICIAL
              </span>
              <span className="music-player-status">
                <span />
                ONLINE
              </span>
            </div>

            <iframe
              title="DJ BADI - House Mix Vol. 1 en SoundCloud"
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="0"
              allow="autoplay"
              loading="lazy"
              src={soundCloudEmbed}
            />
          </div>
        </div>

        <div className="music-platform-heading">
          <span>ENCUÉNTRAME EN</span>
          <span className="music-platform-line" />
        </div>

        <div className="music-platforms-new">

          <a
            href={artist.social.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="music-platform-new"
          >
            <div className="music-platform-icon">
              <Music2 size={25} />
            </div>
            <div>
              <span>SOUNDCLOUD</span>
              <p>Sets, mezclas y sesiones.</p>
            </div>
            <ArrowUpRight size={20} />
          </a>

          <a
            href={artist.social.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="music-platform-new"
          >
            <div className="music-platform-icon spotify-icon">
              <Play size={25} />
            </div>
            <div>
              <span>SPOTIFY</span>
              <p>Mi perfil musical.</p>
            </div>
            <ArrowUpRight size={20} />
          </a>

          <a
            href={artist.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="music-platform-new"
          >
            <div className="music-platform-icon">
            </div>
            <div>
              <span>YOUTUBE</span>
              <p>Videos y contenido audiovisual.</p>
            </div>
            <ArrowUpRight size={20} />
          </a>

        </div>

        <div className="music-signature">
          <span>DJ BADI</span>
          <span>FEEL THE ENERGY. LIVE THE SOUND.</span>
        </div>

      </div>
    </section>
  );
}
