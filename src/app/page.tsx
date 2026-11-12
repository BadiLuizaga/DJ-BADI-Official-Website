"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Menu,
  MessageCircle,
  X,
  Zap,
} from "lucide-react";

import { artist } from "@/data/artist";
import TrajectorySection from "@/components/TrajectorySection";
import MusicSection from "@/components/MusicSection";
import GallerySection from "@/components/GallerySection";
import BookingSection from "@/components/BookingSection";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Monitor scroll for navbar elevation & state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for fluid scroll-triggered entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <main className="site">
      {/* NAVEGACIÓN STICKY */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <a href="#top" className="brand" onClick={closeMenu}>
          <span className="brand-symbol">
            <Zap size={26} />
          </span>
          <span>
            DJ BADI<span className="orange">.</span>
          </span>
        </a>

        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#about" onClick={closeMenu}>
            ACERCA DE
          </a>
          <a href="#trajectory" onClick={closeMenu}>
            TRAYECTORIA
          </a>
          <a href="#music" onClick={closeMenu}>
            MÚSICA
          </a>
          <a href="#gallery" onClick={closeMenu}>
            GALERÍA
          </a>
          <a href="#contact" onClick={closeMenu}>
            CONTACTO
          </a>
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
            linear-gradient(0deg, rgba(0,0,0,.82), transparent 60%),
            url("/foto-badi-hero.webp")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-top hero-anim-1">
          <span>
            <Zap size={14} /> ARTISTA DE MÚSICA URBANA / OPEN FORMAT
          </span>
          <span className="hero-status-pill">
            <span className="pulse-dot" /> DISPONIBLE PARA BOOKING 2026
          </span>
        </div>

        <div className="hero-content">
          <div className="hero-copy hero-anim-2">
            <h1>
              DJ
              <br />
              <span>BADI</span>
            </h1>

            <div className="hero-bottom hero-anim-3">
              <p className="hero-description">
                DJ &amp; Productor Musical desde 2019. Llevando energía,
                ritmo y una atmósfera inolvidable a cada escenario.
              </p>

              <a href="#music" className="discover">
                DESCUBRE MI MÚSICA <ArrowDown size={17} />
              </a>
            </div>

            <div className="hero-actions hero-anim-4">
              <a href="#contact" className="hero-booking">
                CONTRATACIONES <ArrowUpRight size={17} />
              </a>
              <a href="#gallery" className="hero-secondary-btn">
                VER GALERÍA
              </a>
            </div>
          </div>

          <div className="visual hero-anim-visual" aria-hidden="true">
            <div className="visual-ring ring-one" />
            <div className="visual-ring ring-two" />
            <div className="visual-ring ring-three" />
            <div className="visual-center">
              <Zap size={52} strokeWidth={1.2} />
            </div>
          </div>
        </div>

        <div className="hero-footer hero-anim-4">
          <span>ARTISTA INDEPENDIENTE</span>
          <span>TECH HOUSE · MÚSICA URBANA</span>
          <span>SCZ — BOLIVIA</span>
        </div>
      </section>

      {/* DIVIDER SUAVE */}
      <div className="section-divider" aria-hidden="true" />

      {/* ACERCA DE */}
      <section className="about-section reveal-on-scroll" id="about">
        <div className="about-label">
          <span className="about-label-line" />
          <span className="about-label-caption">
            01 / SOBRE MÍ · IDENTIDAD ARTÍSTICA
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
      <div className="reveal-on-scroll">
        <TrajectorySection />
      </div>

      {/* MÚSICA */}
      <div className="reveal-on-scroll">
        <MusicSection />
      </div>

      {/* GALERÍA */}
      <div className="reveal-on-scroll">
        <GallerySection />
      </div>

      {/* BOOKING / CONTACTO */}
      <div className="reveal-on-scroll">
        <BookingSection />
      </div>

      {/* BOTÓN FLOTANTE DE WHATSAPP / CONTACTO RÁPIDO */}
      <a
        href="https://wa.me/59172191333?text=Hola%20DJ%20BADI%2C%20quisiera%20consultar%20disponibilidad%20y%20precios%20para%20un%20evento."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-quick-action"
        aria-label="Contactar a DJ BADI por WhatsApp"
      >
        <MessageCircle size={18} />
        <span>RESERVAR / WHATSAPP</span>
      </a>

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
