"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  CalendarCheck,
  Headphones,
  Images,
  MessageCircle,
  User,
  Zap,
} from "lucide-react";

import { SECTIONS, WHATSAPP_QUICK_URL } from "@/data/sections";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = ["top", ...SECTIONS.map((s) => s.id)] as const;

const DOCK_ICONS = {
  about: User,
  trajectory: Award,
  music: Headphones,
  gallery: Images,
  contact: CalendarCheck,
} as const;

/**
 * Navegación principal:
 * - Barra superior con scrollspy y barra de progreso de lectura.
 * - Índice lateral de secciones (escritorio).
 * - Dock inferior tipo app (móvil), siempre al alcance del pulgar.
 */
export default function SiteNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progressRef.current?.style.setProperty("--progress", progress.toFixed(4));
      setScrolled(window.scrollY > 40);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
        aria-label="Navegación principal"
      >
        <a href="#top" className="brand" aria-label="DJ BADI, volver al inicio">
          <span className="brand-symbol">
            <Zap size={26} />
          </span>
          <span>
            DJ BADI<span className="orange">.</span>
          </span>
        </a>

        <div className="nav-links">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={active === section.id ? "is-active" : undefined}
              aria-current={active === section.id ? "true" : undefined}
            >
              {section.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="booking">
          BOOKING <ArrowUpRight size={16} />
        </a>

        <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      </nav>

      {/* Índice lateral (escritorio) */}
      <nav
        className={`section-rail ${active === "top" ? "is-hidden" : ""}`}
        aria-label="Índice de secciones"
      >
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={active === section.id ? "is-active" : undefined}
            aria-current={active === section.id ? "true" : undefined}
          >
            <span className="section-rail-label">
              <em>{section.index}</em> {section.label}
            </span>
            <span className="section-rail-dot" />
          </a>
        ))}
      </nav>

      {/* Acceso rápido a WhatsApp: se oculta en Booking y en el cierre,
          donde ya hay accesos directos y taparía el formulario */}
      <a
        href={WHATSAPP_QUICK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-quick-action ${
          active === "contact" ? "is-hidden" : ""
        }`}
        aria-label="Contactar a DJ BADI por WhatsApp"
        tabIndex={active === "contact" ? -1 : undefined}
        aria-hidden={active === "contact" ? true : undefined}
      >
        <MessageCircle size={18} />
        <span>RESERVAR / WHATSAPP</span>
      </a>

      {/* Dock inferior (móvil) */}
      <nav className="mobile-dock" aria-label="Navegación móvil">
        {SECTIONS.map((section) => {
          const Icon = DOCK_ICONS[section.id];
          const isBooking = section.id === "contact";
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${active === section.id ? "is-active" : ""} ${
                isBooking ? "mobile-dock-cta" : ""
              }`}
              aria-current={active === section.id ? "true" : undefined}
            >
              <Icon size={isBooking ? 20 : 19} strokeWidth={1.8} />
              <span>{section.short}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
