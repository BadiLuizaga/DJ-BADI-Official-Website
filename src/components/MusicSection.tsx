import { ArrowUpRight, Headphones, Music2, Radio, Video } from "lucide-react";
import { artist } from "@/data/artist";

export default function MusicSection() {
  const soundCloudEmbed =
    "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/badi-luizaga/dj-badi-house-mix-vol1&color=%23ff5a1f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true";

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

        {/* SoundCloud Feature — left: info, right: player */}
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
          </div>

          {/* SoundCloud player */}
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

        {/* YouTube Feature — same structure as SoundCloud: left info, right player */}
        <div className="music-feature-new music-feature-youtube">
          <div className="music-feature-info">
            <span className="music-live-label">
              <Video size={15} />
              YOUTUBE / SESIÓN EN VIVO
            </span>

            <div className="music-feature-title">
              <span className="music-feature-number">002</span>
              <h3>ELLA QUIERE <span>BEBER</span></h3>
              <p>Anuel AA — Extended Edit por DJ BADI.</p>
            </div>

            {/* YouTube link */}
            <a
              href="https://youtu.be/NXuMXYUddWc"
              target="_blank"
              rel="noopener noreferrer"
              className="music-external-link"
            >
              ABRIR EN YOUTUBE
              <ArrowUpRight size={17} />
            </a>

            {/* Channel link */}
            <a
              href="https://www.youtube.com/@DJBADIBo"
              target="_blank"
              rel="noopener noreferrer"
              className="music-external-link"
            >
              CANAL OFICIAL
              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* YouTube player */}
          <div className="music-player-wrapper">
            <div className="music-player-top">
              <span>
                <Video size={16} />
                REPRODUCTOR OFICIAL
              </span>
              <span className="music-player-status">
                <span />
                EN VIVO
              </span>
            </div>
            <iframe
              title="DJ BADI - Ella Quiere Beber (Anuel AA) Extended Edit"
              width="100%"
              height="300"
              src="https://www.youtube.com/embed/NXuMXYUddWc"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Signature */}
        <div className="music-signature">
          <span>DJ BADI</span>
          <span>FEEL THE ENERGY. LIVE THE SOUND.</span>
        </div>
      </div>
    </section>
  );
}
