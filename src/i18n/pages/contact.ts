/**
 * Contact page copy — FINAL v2 (YES_Website_FINAL_v2.pdf, Page 7).
 * Simple. Clean. Two columns: info left, form right. Closes with John 13:35.
 * Keys prefixed `contact_`. EN and ES must stay in lockstep.
 */
export const contact = {
  en: {
    /* ── Page meta ───────────────────────────────────────── */
    contact_meta_title: 'Contact — YES | Yielded Evangelical Servants',
    contact_meta_desc:
      'Whether you want to become a partner, send a team, ask about a specific worker, or just learn more — we want to hear from you.',

    /* ── Opener ──────────────────────────────────────────── */
    contact_opener_label: 'Contact',
    contact_opener_headline: "Let's Talk.",
    contact_opener_body:
      'Whether you want to become a partner, send a team, ask about a specific worker, or just learn more — we want to hear from you.',

    /* ── Info column ─────────────────────────────────────── */
    contact_info_label: 'Contact Information',
    contact_info_website: 'yeservants.org',
    contact_info_email: 'info@yeservants.org',
    contact_info_location: 'Orlando, FL',
    contact_info_org: '501(c)(3) — EIN: [number]',
    contact_info_address_label: 'Mailing Address',
    contact_info_phone_label: 'Phone',

    /* ── Form column ─────────────────────────────────────── */
    contact_form_label: 'Send a Message',
    contact_form_name: 'Name',
    contact_form_email: 'Email',
    contact_form_subject: 'Subject',
    contact_form_subject_partner: 'Partner inquiry',
    contact_form_subject_trip: 'Mission trip',
    contact_form_subject_general: 'General',
    contact_form_subject_other: 'Other',
    contact_form_message: 'Message',
    contact_form_submit: 'Send Message',
    contact_form_note:
      'Submitting opens your email app with your message addressed to info@yeservants.org.',

    /* ── Close — John 13:35 ──────────────────────────────── */
    contact_close_quote:
      'By this everyone will know that you are my disciples, if you love one another.',
    contact_close_ref: 'John 13:35',
  },

  es: {
    /* ── Meta de la página ──────────────────────────────── */
    contact_meta_title: 'Contacto — YES | Yielded Evangelical Servants',
    contact_meta_desc:
      'Ya sea que quieras ser socio, enviar un equipo, preguntar por un trabajador específico o simplemente saber más — queremos escucharte.',

    /* ── Apertura ────────────────────────────────────────── */
    contact_opener_label: 'Contacto',
    contact_opener_headline: 'Hablemos.',
    contact_opener_body:
      'Ya sea que quieras ser socio, enviar un equipo, preguntar por un trabajador específico o simplemente saber más — queremos escucharte.',

    /* ── Columna de información ──────────────────────────── */
    contact_info_label: 'Información de Contacto',
    contact_info_website: 'yeservants.org',
    contact_info_email: 'info@yeservants.org',
    contact_info_location: 'Orlando, FL',
    contact_info_org: '501(c)(3) — EIN: [número]',
    contact_info_address_label: 'Dirección Postal',
    contact_info_phone_label: 'Teléfono',

    /* ── Columna del formulario ──────────────────────────── */
    contact_form_label: 'Envía un Mensaje',
    contact_form_name: 'Nombre',
    contact_form_email: 'Email',
    contact_form_subject: 'Asunto',
    contact_form_subject_partner: 'Consulta de asociación',
    contact_form_subject_trip: 'Viaje misionero',
    contact_form_subject_general: 'General',
    contact_form_subject_other: 'Otro',
    contact_form_message: 'Mensaje',
    contact_form_submit: 'Enviar Mensaje',
    contact_form_note:
      'Al enviar se abrirá tu aplicación de correo con el mensaje dirigido a info@yeservants.org.',

    /* ── Cierre — Juan 13:35 ─────────────────────────────── */
    contact_close_quote:
      'En esto conocerán todos que sois mis discípulos, si tuviereis amor los unos con los otros.',
    contact_close_ref: 'Juan 13:35',
  },
} as const;
