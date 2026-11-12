import type { Metadata } from "next";
import "../styles/style.css";
import "../styles/music-section.css";
import "../styles/booking-section.css";

export const metadata: Metadata = {
  title: "DJ BADI | Música, eventos y experiencias",
  description:
    "Sitio oficial de DJ BADI, artista de música urbana y open format en Santa Cruz de la Sierra.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
