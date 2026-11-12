"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";

const WHATSAPP_PHONE = "59172191333";
const DIRECT_WHATSAPP_URL =
  "https://wa.me/59172191333?text=Hola%20DJ%20BADI%2C%20quisiera%20consultar%20disponibilidad%20y%20precios%20para%20una%20presentaci%C3%B3n.";

const EVENT_TYPES = [
  "Cumpleaños",
  "Boda",
  "XV años",
  "Evento corporativo",
  "Discoteca / Club",
  "Evento privado",
  "Otro",
];

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    date: "",
    location: "",
    duration: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Ingresa tu nombre completo.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Ingresa tu número de WhatsApp.";
    }
    if (!formData.eventType) {
      newErrors.eventType = "Selecciona el tipo de evento.";
    }
    if (!formData.date) {
      newErrors.date = "Selecciona la fecha del evento.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Ingresa la ciudad y ubicación.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const messageLines = [
      "🎧 *NUEVA SOLICITUD DE BOOKING — DJ BADI*",
      "",
      `👤 *Cliente:* ${formData.name.trim()}`,
      `📱 *WhatsApp:* ${formData.phone.trim()}`,
      `🎉 *Tipo de evento:* ${formData.eventType}`,
      `📅 *Fecha:* ${formData.date}`,
      `📍 *Ciudad / Ubicación:* ${formData.location.trim()}`,
      formData.duration.trim()
        ? `⏰ *Horario / Duración:* ${formData.duration.trim()}`
        : null,
      formData.message.trim()
        ? `💬 *Mensaje adicional:* ${formData.message.trim()}`
        : null,
      "",
      "_Enviado desde el sitio web oficial de DJ BADI_",
    ].filter((line) => line !== null);

    const fullMessage = messageLines.join("\n");
    const encoded = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="booking-section" id="contact">
      <div className="booking-container">
        {/* Header */}
        <div className="booking-layout">
          {/* Left Column: Information & Direct Contact */}
          <div className="booking-info">
            <span className="booking-kicker">
              <span className="booking-kicker-line" />
              06 / BOOKING &amp; CONTACT
            </span>

            <h2>
              HAGÁMOSLO
              <br />
              <span>REALIDAD.</span>
            </h2>

            <p className="booking-subtitle">
              ¿Tienes un evento? Cuéntame los detalles y hagamos que suceda.
            </p>

            <div className="booking-highlights">
              <div className="booking-highlight-item">
                <Sparkles size={16} />
                <span>Formatos personalizados para cada tipo de público y evento.</span>
              </div>
              <div className="booking-highlight-item">
                <MapPin size={16} />
                <span>Disponible en Santa Cruz de la Sierra y tours a nivel nacional.</span>
              </div>
              <div className="booking-highlight-item">
                <Clock size={16} />
                <span>Respuesta rápida y coordinación técnica directa.</span>
              </div>
            </div>

            <div className="booking-direct-card">
              <span>¿CONSULTA RÁPIDA?</span>
              <p>También puedes comunicarte directamente con mi equipo:</p>
              <a
                href={DIRECT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="booking-direct-btn"
              >
                <MessageCircle size={18} />
                WHATSAPP DIRECTO
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="booking-card">
            <div className="booking-card-header">
              <span className="booking-card-badge">FORMULARIO DE RESERVA</span>
              <h3>SOLICITAR COTIZACIÓN</h3>
            </div>

            <form onSubmit={handleSubmit} noValidate className="booking-form">
              {/* Row 1: Nombre & Teléfono */}
              <div className="booking-row">
                <div className="booking-field">
                  <label htmlFor="booking-name">
                    <User size={14} />
                    NOMBRE COMPLETO *
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre y apellido"
                    className={errors.name ? "input-error" : ""}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="booking-field">
                  <label htmlFor="booking-phone">
                    <Phone size={14} />
                    NÚMERO DE WHATSAPP *
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ej. +591 72191333"
                    className={errors.phone ? "input-error" : ""}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              {/* Row 2: Tipo de Evento & Fecha */}
              <div className="booking-row">
                <div className="booking-field">
                  <label htmlFor="booking-eventType">
                    <Sparkles size={14} />
                    TIPO DE EVENTO *
                  </label>
                  <select
                    id="booking-eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={errors.eventType ? "input-error" : ""}
                  >
                    <option value="">Selecciona el tipo de evento</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <span className="error-text">{errors.eventType}</span>
                  )}
                </div>

                <div className="booking-field">
                  <label htmlFor="booking-date">
                    <Calendar size={14} />
                    FECHA DEL EVENTO *
                  </label>
                  <input
                    id="booking-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? "input-error" : ""}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>
              </div>

              {/* Row 3: Ubicación & Duración */}
              <div className="booking-row">
                <div className="booking-field">
                  <label htmlFor="booking-location">
                    <MapPin size={14} />
                    CIUDAD Y UBICACIÓN *
                  </label>
                  <input
                    id="booking-location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ej. Santa Cruz - Salón / Local"
                    className={errors.location ? "input-error" : ""}
                  />
                  {errors.location && (
                    <span className="error-text">{errors.location}</span>
                  )}
                </div>

                <div className="booking-field">
                  <label htmlFor="booking-duration">
                    <Clock size={14} />
                    HORARIO O DURACIÓN
                  </label>
                  <input
                    id="booking-duration"
                    name="duration"
                    type="text"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ej. 23:00 a 03:00 / 4 horas"
                  />
                </div>
              </div>

              {/* Row 4: Mensaje Adicional */}
              <div className="booking-field full-width">
                <label htmlFor="booking-message">
                  <MessageCircle size={14} />
                  MENSAJE ADICIONAL
                </label>
                <textarea
                  id="booking-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Detalles sobre temáticas musicales, público estimado o requerimientos especiales..."
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="booking-submit-btn">
                <Send size={18} />
                ENVIAR SOLICITUD POR WHATSAPP
                <ArrowUpRight size={18} />
              </button>

              <p className="booking-disclaimer">
                Al hacer clic, se abrirá WhatsApp con los datos completados listos para enviar al número oficial de DJ BADI.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

