import { ArrowUp, ArrowUpRight, MessageCircle, Zap } from "lucide-react";

import { artist } from "@/data/artist";
import { SECTIONS, WHATSAPP_QUICK_URL } from "@/data/sections";

const PLATFORMS = [
  { label: "SoundCloud", href: artist.social.soundcloud },
  { label: "YouTube", href: artist.social.youtube },
  { label: "Spotify", href: artist.social.spotify },
];

/** Cierre de la página: llamada a la acción final, navegación y plataformas. */
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <span className="footer-cta-kicker">
          <span /> ¿TIENES UNA FECHA EN MENTE?
        </span>
        <h2>
          HAGAMOS QUE TU EVENTO
          <br />
          <span>SE SIENTA.</span>
        </h2>
        <div className="footer-cta-actions">
          <a href="#contact" className="hero-booking">
            RESERVAR FECHA <ArrowUpRight size={17} />
          </a>
          <a
            href={WHATSAPP_QUICK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-secondary-btn"
          >
            <MessageCircle size={16} /> WHATSAPP DIRECTO
          </a>
        </div>
      </div>

      <div className="footer-grid">
        <div className="footer-col footer-about">
          <a href="#top" className="footer-brand">
            <Zap size={20} />
            DJ BADI.
          </a>
          <p>
            {artist.profession}. {artist.location}.
          </p>
        </div>

        <nav className="footer-col" aria-label="Secciones">
          <span className="footer-col-title">EXPLORAR</span>
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>

        <div className="footer-col">
          <span className="footer-col-title">ESCUCHAR</span>
          {PLATFORMS.map((platform) => (
            <a
              key={platform.label}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {platform.label} <ArrowUpRight size={13} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer">
        <span>© 2026 DJ BADI. TODOS LOS DERECHOS RESERVADOS.</span>
        <span>{artist.slogan.toUpperCase()}</span>
        <a href="#top" className="footer-top-btn" aria-label="Volver al inicio">
          <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}
