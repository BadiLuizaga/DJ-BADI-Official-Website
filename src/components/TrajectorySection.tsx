
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Music2,
  Sparkles,
  Users,
} from "lucide-react";

import { artist } from "@/data/artist";
import CountUp from "@/components/CountUp";

const cardBackground = (image: string) => ({
  backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.38)), linear-gradient(0deg, rgba(0,0,0,.55), transparent), url("${image}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

export default function TrajectorySection() {
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

        <div className="trajectory-grid">

          {/* CLUBES */}
          <article
            className="trajectory-card trajectory-clubs"
            style={cardBackground("/Clubs.jpg")}
          >
            <div className="trajectory-card-top">
              <span>01 / EXPERIENCIAS</span>
              <Music2 size={20} />
            </div>

            <div className="trajectory-card-content">
              <h3>CLUBES</h3>
              <p>
                Escenarios donde la música y el público se conectan.
              </p>

              <div className="venue-list">
                {artist.venues.clubs.map((venue) => (
                  <span key={venue}>{venue}</span>
                ))}
              </div>
            </div>
          </article>

          {/* RESTAURANTES */}
          <article
            className="trajectory-card trajectory-restobars"
            style={cardBackground("/restobar1.jpg")}
          >
            <div className="trajectory-card-top">
              <span>02 / EXPERIENCIAS</span>
              <MapPin size={20} />
            </div>

            <div className="trajectory-card-content">
              <h3>RESTAURANTES</h3>
              <p>
                Presentaciones en espacios sociales y experiencias nocturnas.
              </p>

              <div className="venue-list">
                {artist.venues.restoBars.map((venue) => (
                  <span key={venue}>{venue}</span>
                ))}
              </div>

              <a
                href="https://www.tripadvisor.es/Restaurant_Review-g297317-d18193721-Reviews-Kaos_Resto_Bar-Santa_Cruz_Santa_Cruz_Department.html"
                target="_blank"
                rel="noopener noreferrer"
                className="trajectory-reference"
              >
                VER REFERENCIA <ArrowUpRight size={15} />
              </a>
            </div>
          </article>

          {/* EVENTOS */}
          <article
            className="trajectory-card trajectory-events"
            style={cardBackground("/Eventos.jpg")}
          >
            <div className="trajectory-card-top">
              <span>03 / EXPERIENCIAS</span>
              <CalendarDays size={20} />
            </div>

            <div className="trajectory-card-content">
              <h3>EVENTOS</h3>
              <p>
                Adaptando cada presentación a la energía de cada celebración.
              </p>

              <div className="venue-list">
                {artist.events.map((event) => (
                  <span key={event}>{event}</span>
                ))}
              </div>
            </div>
          </article>

          {/* COLABORACIONES */}
          <article
            className="trajectory-card trajectory-collaborations collaboration-card"
          >
            <div className="trajectory-card-top">
              <span>04 / COLABORACIONES</span>
              <Users size={20} />
            </div>

            <div className="trajectory-card-content">
              <h3>COLABORACIONES</h3>
              <p>
                Sinergia musical, conexiones y experiencias compartidas
                sobre el escenario.
              </p>

              <div className="collaboration-list">
                {artist.collaborations.map((collaboration) => (
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
            </div>
          </article>
        </div>

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
    </section>
  );
}
