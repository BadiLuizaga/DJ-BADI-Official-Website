import type { Metadata, Viewport } from "next";
import "../styles/style.css";
import "../styles/music-section.css";
import "../styles/gallery-section.css";
import "../styles/booking-section.css";
import "../styles/experience.css";

/**
 * Dominio definitivo del sitio. Definir NEXT_PUBLIC_SITE_URL
 * (p. ej. en Vercel) cuando el dominio esté confirmado: habilita la URL
 * canónica y las URLs absolutas de Open Graph. Sin él no se declara canónica.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const title = "DJ BADI | DJ de Música Urbana y Open Format en Santa Cruz";
const description =
  "Sitio oficial de DJ BADI, DJ de música urbana, open format y tech house en Santa Cruz de la Sierra, Bolivia. Clubes, restobares, bodas, quinceaños y eventos privados desde 2019. Booking por WhatsApp.";

export const metadata: Metadata = {
  ...(siteUrl && {
    metadataBase: new URL(siteUrl),
    alternates: { canonical: "/" },
  }),
  title,
  description,
  applicationName: "DJ BADI",
  authors: [{ name: "Anthony Badi Luizaga" }],
  creator: "DJ BADI",
  keywords: [
    "DJ BADI",
    "DJ en Santa Cruz de la Sierra",
    "DJ Bolivia",
    "música urbana",
    "open format",
    "tech house",
    "DJ para eventos",
    "DJ para bodas",
    "DJ para quinceaños",
  ],
  category: "music",
  openGraph: {
    type: "website",
    locale: "es_BO",
    siteName: "DJ BADI",
    title,
    description,
    // La imagen se toma de app/opengraph-image.jpg (convención de archivos de Next.js)
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
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
