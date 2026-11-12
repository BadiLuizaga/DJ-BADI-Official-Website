"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Zap } from "lucide-react";

import { artist } from "@/data/artist";
import SiteNavigation from "@/components/SiteNavigation";
import MarqueeBand from "@/components/MarqueeBand";
import TrajectorySection from "@/components/TrajectorySection";
import MusicSection from "@/components/MusicSection";
import GallerySection from "@/components/GallerySection";
import BookingSection from "@/components/BookingSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const aboutFxRef = useRef<HTMLDivElement>(null);

  // El fondo animado de "Sobre mí" solo se ejecuta mientras está en pantalla
  useEffect(() => {
    const fx = aboutFxRef.current;
    if (!fx || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => fx.classList.toggle("is-running", entry.isIntersecting),
      { rootMargin: "100px 0px" }
    );
    observer.observe(fx);
    return () => observer.disconnect();
  }, []);

  // Profundidad sutil del Hero siguiendo el puntero (solo ratón, sin movimiento reducido)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        hero.style.setProperty("--px", x.toFixed(3));
        hero.style.setProperty("--py", y.toFixed(3));
      });
    };
    const onLeave = () => {
      hero.style.setProperty("--px", "0");
      hero.style.setProperty("--py", "0");
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Las secciones son visibles por defecto (CSS); solo se ocultan con JS activo.
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");
    const revealAll = () =>
      elements.forEach((el) => el.classList.add("is-revealed"));

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // threshold 0: también funciona en secciones más altas que la pantalla
        threshold: 0,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="site">
      <SiteNavigation />

      {/* INICIO / HERO */}
      <section
        className="hero"
        id="top"
        ref={heroRef}
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

        <a href="#about" className="scroll-cue" aria-label="Desplazarse a la siguiente sección">
          <span className="scroll-cue-line" />
          <span className="scroll-cue-text">SCROLL</span>
        </a>
      </section>

      {/* CINTA DE IDENTIDAD SONORA */}
      <MarqueeBand />

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
          {/* Fondo vivo: capas de luz (solo transform/opacity) fusionadas en
              "overlay"; sobre la silueta oscura del DJ no tienen efecto,
              así que la persona y el logo permanecen estáticos. */}
          <div className="about-photo-fx" ref={aboutFxRef} aria-hidden="true">
            <span className="about-fx-haze about-fx-haze-a" />
            <span className="about-fx-haze about-fx-haze-b" />
            <span className="about-fx-beam" />
          </div>
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

      {/* CIERRE / FOOTER */}
      <SiteFooter />
    </main>
  );
}
