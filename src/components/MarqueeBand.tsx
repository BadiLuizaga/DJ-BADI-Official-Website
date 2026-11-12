import { Zap } from "lucide-react";
import { artist } from "@/data/artist";

const IDENTITY = [
  ...artist.genres,
  "Santa Cruz de la Sierra",
  `Desde ${artist.since}`,
  "Feel the energy",
];

const VENUES = [...artist.venues.clubs, ...artist.venues.restoBars];

function Track({
  items,
  variant,
}: {
  items: string[];
  variant: "solid" | "outline";
}) {
  // El contenido se duplica para un bucle continuo; la copia se oculta a lectores de pantalla.
  return (
    <div className={`marquee marquee-${variant}`}>
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          className="marquee-track"
          aria-hidden={copy === 1 ? true : undefined}
        >
          {items.map((item) => (
            <li key={item}>
              <span>{item}</span>
              <Zap size={variant === "solid" ? 20 : 14} aria-hidden="true" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** Cinta en movimiento con la identidad sonora y los escenarios de DJ BADI. */
export default function MarqueeBand() {
  return (
    <section className="marquee-band" aria-label="Géneros y escenarios de DJ BADI">
      <Track items={IDENTITY} variant="solid" />
      <Track items={VENUES} variant="outline" />
    </section>
  );
}
