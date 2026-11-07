"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Menu,
  MessageCircle,
  Music2,
  Play,
  Video,
  X,
  Zap,
} from "lucide-react";

import { artist } from "@/data/artist";
import TrajectorySection from "@/components/TrajectorySection";

const WHATSAPP_URL =
  "https://wa.me/59172191333?text=Hola%20DJ%20BADI%2C%20quisiera%20consultar%20disponibilidad%20y%20precios%20para%20una%20presentaci%C3%B3n.";

const platforms = [
  {
    name: "SOUNDCLOUD",
    description: "Escucha mis sets y mezclas.",
    url: artist.social.soundcloud,
    icon: Music2,
  },
  {
    name: "SPOTIFY",
    description: "Descubre mi música.",
    url: artist.social.spotify,
    icon: Play,
  },
  {
    name: "YOUTUBE",
    description: "Mira mis videos y sesiones.",
    url: artist.social.youtube,
    icon: Video,
  },
];

const eventExperiences = [
  {
    title: "CLUB NIGHTS",
    description: "Clubes y experiencias nocturnas.",
    image:
      "https://images.unsplash.com/photo-1571266028243-d220c9c3b7e4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "PRIVATE EVENTS",
    description: "Cumpleaños, bodas y celebraciones privadas.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "GRADUATIONS",
    description: "Fiestas de graduación y eventos especiales.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "BRAND EXPERIENCES",
    description: "Activaciones de marca y festivales temáticos.",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site">
      {/* NAVEGACIÓN */}
      <nav className="navbar">
        <a href="#top" className="brand" onClick={closeMenu}>
          <span className="brand-symbol">
            <Zap size={28} />
          </span>
          <span>
            DJ BADI<span className="orange">.</span>
          </span>
        </a>

        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#about" onClick={closeMenu}>ACERCA DE</a>
          <a href="#trajectory" onClick={closeMenu}>TRAYECTORIA</a>
          <a href="#music" onClick={closeMenu}>MÚSICA</a>
          <a href="#events" onClick={closeMenu}>EVENTOS</a>
          <a href="#contact" onClick={closeMenu}>CONTACTO</a>
        </div>

        <a href="#contact" className="booking">
          BOOKING <ArrowUpRight size={16} />
        </a>

        <button
          className="mobile-menu"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* INICIO / HERO */}
      <section
        className="hero"
        id="top"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0,0,0,.76), rgba(0,0,0,.22)),
            linear-gradient(0deg, rgba(0,0,0,.72), transparent 65%),
            url("/foto-badi-hero.webp")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-top">
          <span><Zap size={14} /> ARTISTA DE MÚSICA URBANA / OPEN FORMAT</span>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <h1>
              DJ
              <br />
              <span>BADI</span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-description">
                DJ &amp; Productor Musical desde 2019.
              </p>

              <a href="#music" className="discover">
                DESCUBRE MI MÚSICA <ArrowDown size={17} />
              </a>
            </div>

            <a href="#contact" className="hero-booking">
              CONTRATACIONES <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="visual" aria-hidden="true">
            <div className="visual-ring ring-one" />
            <div className="visual-ring ring-two" />
            <div className="visual-ring ring-three" />
            <div className="visual-center">
              <Zap size={52} strokeWidth={1.2} />
            </div>
          </div>
        </div>

        <div className="hero-footer">
          <span>ARTISTA INDEPENDIENTE</span>
          <span>TECH HOUSE · MÚSICA URBANA</span>
          <span>SCZ — BOLIVIA</span>
        </div>
      </section>

      {/* ACERCA DE */}
      <section className="about-section" id="about">
        <div className="about-label">
          <span className="about-label-line" />
          <span className="about-label-caption">
            DJ BADI / IDENTIDAD ARTÍSTICA
          </span>
        </div>

        <div
          className="about-photo"
          role="img"
          aria-label="DJ BADI de espaldas, con su camiseta y logo durante una presentación"
        >
          <div className="about-photo-overlay" />
          <span className="about-photo-caption">
            SANTA CRUZ DE LA SIERRA · BOLIVIA
          </span>
        </div>

        <div className="about-content">
          <span className="about-eyebrow">
            <Zap size={14} /> ACERCA DE MÍ
          </span>

          <h2>
            MÁS QUE UN DJ.
            <br />
            <span>UNA IDENTIDAD SONORA.</span>
          </h2>

          <h3>{artist.fullName}</h3>

          <p>{artist.biography}</p>
          <p>
            Mi propuesta combina versatilidad, lectura del público y una
            selección musical pensada para convertir cada presentación en
            una experiencia.
          </p>

          <div className="about-genres">
            {artist.genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>

          <div className="about-signature">
            <span>DJ &amp; MUSIC PRODUCER</span>
            <span>EST. {artist.since}</span>
          </div>
        </div>
      </section>

      {/* TRAYECTORIA */}
      <TrajectorySection />

      {/* MÚSICA */}
      <section className="music-section" id="music">
        <div className="section-heading">
          <span className="section-number">03 / MÚSICA</span>
          <h2>
            SELECTED <span>SOUNDS.</span>
          </h2>
          <p>Explora mi música, mis mezclas y mi contenido audiovisual.</p>
        </div>

        <div className="music-card">
          <div className="music-art">
            <span>BADI</span>
            <Play size={34} fill="currentColor" />
          </div>

          <div className="music-info">
            <span className="eyebrow">ARTIST PROFILE</span>
            <h3>THE FREQUENCY</h3>
            <p>Sonidos electrónicos. Dimensiones diferentes.</p>
          </div>

          <span className="music-index">001</span>
        </div>

        <div className="music-platforms">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="music-platform"
              >
                <div className="platform-icon">
                  <Icon size={24} />
                </div>
                <div className="platform-info">
                  <span>{platform.name}</span>
                  <p>{platform.description}</p>
                </div>
                <ArrowUpRight size={21} />
              </a>
            );
          })}
        </div>
      </section>

      {/* EVENTOS */}
      <section className="events-section" id="events">
        <div className="section-heading">
          <span className="section-number">04 / EXPERIENCIAS EN VIVO</span>
          <h2>
            BEYOND THE
            <br />
            <span>STAGE.</span>
          </h2>
          <p>
            Cada evento tiene su propia energía. Cada público, su propia
            frecuencia.
          </p>
        </div>

        <div className="events-grid">
          {eventExperiences.map((event, index) => (
            <article
              key={event.title}
              className="event-item event-photo"
              style={{
                backgroundImage: `
                  linear-gradient(0deg, rgba(0,0,0,.94), rgba(0,0,0,.08)),
                  url("${event.image}")
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <span>0{index + 1}</span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contact-section" id="contact">
        <span className="section-number">05 / CONTRATACIONES</span>
        <h2>
          CREEMOS
          <br />
          <span>UNA EXPERIENCIA.</span>
        </h2>
        <p>
          Disponible para clubes, festivales, activaciones de marca y eventos
          privados.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={19} />
          CONTRATACIONES POR WHATSAPP
          <ArrowUpRight size={18} />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#top" className="footer-brand">
          <Zap size={20} />
          DJ BADI.
        </a>
        <span>© 2026 DJ BADI. TODOS LOS DERECHOS RESERVADOS.</span>
        <span>FEEL THE ENERGY. LIVE THE SOUND.</span>
      </footer>
    </main>
  );
}
