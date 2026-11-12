/** Secciones navegables del sitio, en orden de aparición. */
export const SECTIONS = [
  { id: "about", label: "ACERCA DE", short: "Bio", index: "01" },
  { id: "trajectory", label: "TRAYECTORIA", short: "Trayectoria", index: "02" },
  { id: "music", label: "MÚSICA", short: "Música", index: "03" },
  { id: "gallery", label: "GALERÍA", short: "Galería", index: "04" },
  { id: "contact", label: "CONTACTO", short: "Booking", index: "05" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"] | "top";

export const WHATSAPP_QUICK_URL =
  "https://wa.me/59172191333?text=Hola%20DJ%20BADI%2C%20quisiera%20consultar%20disponibilidad%20y%20precios%20para%20un%20evento.";
