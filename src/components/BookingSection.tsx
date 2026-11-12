"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
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

type FormData = {
  name: string;
  phone: string;
  eventType: string;
  date: string;
  location: string;
  duration: string;
  message: string;
};

type FieldName = keyof FormData;

/** Asistente en 3 pasos: menos campos a la vista, avance claro y resumen final. */
const STEPS: { title: string; caption: string; fields: FieldName[] }[] = [
  { title: "EL EVENTO", caption: "¿Qué celebramos y cuándo?", fields: ["eventType", "date"] },
  { title: "LOS DETALLES", caption: "¿Dónde y cómo será?", fields: ["location", "duration", "message"] },
  { title: "TUS DATOS", caption: "¿Cómo te contactamos?", fields: ["name", "phone"] },
];

const ERROR_MESSAGES: Partial<Record<FieldName, string>> = {
  name: "Ingresa tu nombre completo.",
  phone: "Ingresa tu número de WhatsApp.",
  eventType: "Selecciona el tipo de evento.",
  date: "Selecciona la fecha del evento.",
  location: "Ingresa la ciudad y ubicación.",
};

const formatDate = (value: string) => {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  return `${d}/${m}/${y}`;
};

export default function BookingSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    eventType: "",
    date: "",
    location: "",
    duration: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Al cambiar de paso, el foco va al título del paso (lectores de pantalla y teclado)
  useEffect(() => {
    if (hasNavigated) stepHeadingRef.current?.focus({ preventScroll: true });
  }, [step, hasNavigated]);

  const updateField = (name: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    updateField(e.target.name as FieldName, e.target.value);
  };

  const validateFields = (fields: FieldName[]) => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const message = ERROR_MESSAGES[field];
      if (message && !formData[field].trim()) newErrors[field] = message;
    });
    setErrors((prev) => {
      const next = { ...prev };
      fields.forEach((field) => delete next[field]);
      return { ...next, ...newErrors };
    });
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (target: number) => {
    setHasNavigated(true);
    setStep(target);
  };

  const nextStep = () => {
    if (validateFields(STEPS[step].fields)) goToStep(step + 1);
  };

  const sendToWhatsApp = () => {
    const allFields = STEPS.flatMap((s) => s.fields);
    if (!validateFields(allFields)) {
      // Lleva al primer paso con errores
      const firstInvalid = STEPS.findIndex((s) =>
        s.fields.some((f) => ERROR_MESSAGES[f] && !formData[f].trim())
      );
      if (firstInvalid >= 0) goToStep(firstInvalid);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Enter en un campo avanza al siguiente paso; en el último, envía.
    if (step < STEPS.length - 1) nextStep();
    else sendToWhatsApp();
  };

  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <span className="error-text" id={`booking-${name}-error`} role="alert">
        {errors[name]}
      </span>
    ) : null;

  const describedBy = (name: FieldName) =>
    errors[name] ? `booking-${name}-error` : undefined;

  const summary = [
    { label: "Evento", value: formData.eventType, step: 0 },
    { label: "Fecha", value: formatDate(formData.date), step: 0 },
    { label: "Lugar", value: formData.location.trim(), step: 1 },
    { label: "Horario", value: formData.duration.trim(), step: 1 },
  ].filter((item) => item.value);

  return (
    <section className="booking-section" id="contact">
      <div className="booking-container">
        <div className="booking-layout">
          {/* Columna izquierda: información y contacto directo */}
          <div className="booking-info">
            <span className="booking-kicker">
              <span className="booking-kicker-line" />
              05 / BOOKING &amp; CONTACT
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

          {/* Columna derecha: asistente de reserva */}
          <div className="booking-card">
            <div className="booking-card-header">
              <span className="booking-card-badge">FORMULARIO DE RESERVA</span>
              <h3>SOLICITAR COTIZACIÓN</h3>
            </div>

            {/* Progreso */}
            <ol className="booking-steps" aria-label="Pasos de la reserva">
              {STEPS.map((s, index) => {
                const state =
                  index === step ? "is-current" : index < step ? "is-done" : "";
                return (
                  <li key={s.title} className={state}>
                    <button
                      type="button"
                      onClick={() => index < step && goToStep(index)}
                      disabled={index > step}
                      aria-current={index === step ? "step" : undefined}
                    >
                      <span className="booking-step-index">
                        {index < step ? <Check size={13} /> : index + 1}
                      </span>
                      <span className="booking-step-title">{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="booking-progress" aria-hidden="true">
              <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>

            <form onSubmit={handleSubmit} noValidate className="booking-form">
              <div className="booking-step-panel" key={step}>
                <h4
                  className="booking-step-heading"
                  ref={stepHeadingRef}
                  tabIndex={-1}
                >
                  <span>
                    PASO {step + 1} DE {STEPS.length}
                  </span>
                  {STEPS[step].caption}
                </h4>

                {/* PASO 1: tipo de evento y fecha */}
                {step === 0 && (
                  <>
                    <fieldset className="booking-field full-width booking-fieldset">
                      <legend>
                        <Sparkles size={14} />
                        TIPO DE EVENTO *
                      </legend>
                      <div
                        className={`booking-chips ${errors.eventType ? "has-error" : ""}`}
                        role="radiogroup"
                        aria-describedby={describedBy("eventType")}
                      >
                        {EVENT_TYPES.map((type) => (
                          <label
                            key={type}
                            className={`booking-chip ${
                              formData.eventType === type ? "is-selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="eventType"
                              value={type}
                              checked={formData.eventType === type}
                              onChange={handleChange}
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                      {fieldError("eventType")}
                    </fieldset>

                    <div className="booking-field full-width">
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
                        aria-invalid={errors.date ? true : undefined}
                        aria-describedby={describedBy("date")}
                        className={errors.date ? "input-error" : ""}
                      />
                      {fieldError("date")}
                    </div>
                  </>
                )}

                {/* PASO 2: ubicación, duración y mensaje */}
                {step === 1 && (
                  <>
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
                          aria-invalid={errors.location ? true : undefined}
                          aria-describedby={describedBy("location")}
                          className={errors.location ? "input-error" : ""}
                        />
                        {fieldError("location")}
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
                  </>
                )}

                {/* PASO 3: datos de contacto y resumen */}
                {step === 2 && (
                  <>
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
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre y apellido"
                          aria-invalid={errors.name ? true : undefined}
                          aria-describedby={describedBy("name")}
                          className={errors.name ? "input-error" : ""}
                        />
                        {fieldError("name")}
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
                          autoComplete="tel"
                          inputMode="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Ej. +591 72191333"
                          aria-invalid={errors.phone ? true : undefined}
                          aria-describedby={describedBy("phone")}
                          className={errors.phone ? "input-error" : ""}
                        />
                        {fieldError("phone")}
                      </div>
                    </div>

                    {summary.length > 0 && (
                      <div className="booking-summary">
                        <span className="booking-summary-title">RESUMEN DE TU SOLICITUD</span>
                        <dl>
                          {summary.map((item) => (
                            <div key={item.label}>
                              <dt>{item.label}</dt>
                              <dd>
                                {item.value}
                                <button
                                  type="button"
                                  onClick={() => goToStep(item.step)}
                                  aria-label={`Editar ${item.label.toLowerCase()}`}
                                >
                                  Editar
                                </button>
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Navegación del asistente */}
              <div className="booking-actions">
                {step > 0 && (
                  <button
                    type="button"
                    className="booking-back-btn"
                    onClick={() => goToStep(step - 1)}
                  >
                    <ArrowLeft size={16} />
                    ATRÁS
                  </button>
                )}

                {step < STEPS.length - 1 ? (
                  <button type="submit" className="booking-submit-btn">
                    CONTINUAR
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button type="submit" className="booking-submit-btn">
                    <Send size={18} />
                    ENVIAR POR WHATSAPP
                    <ArrowUpRight size={18} />
                  </button>
                )}
              </div>

              <p className="booking-disclaimer">
                Al enviar, se abrirá WhatsApp con los datos completados listos para enviar al número oficial de DJ BADI.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
