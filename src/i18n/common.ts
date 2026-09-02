/**
 * Shared / global strings — nav, footer, brand constants, common CTAs.
 * Page-specific copy lives in ./pages/<page>.ts and is merged by translations.ts.
 * Keys must be globally unique across all modules.
 * Source: YES_Website_FINAL_v2.pdf + YES_Mapa_Website.pdf (client Spanish kept
 * verbatim where the mapa provides it).
 */
export const common = {
  en: {
    /* ── Brand constants (FINAL v2 Brand Identity) ───────── */
    brand_tagline: 'YES finds the faithful workers nobody is standing with — and stands with them.',
    brand_thematic: 'If we are one Body — no faithful servant should stand alone.',
    brand_uvp: 'YES goes where faithful workers are already serving — and carrying more than anyone should carry alone.',
    brand_founded: 'Founded by missionaries. Built on the field. Standing with faithful Gospel workers since 1990.',

    /* ── Primary navigation (FINAL v2) ───────────────────── */
    nav_home: 'Home',
    nav_aboutYes: 'About',
    nav_missionaries: 'The Missionaries',
    nav_howItWorks: 'How It Works',
    nav_missionTeams: 'Mission Teams',
    nav_contact: 'Contact',
    nav_give: 'Give Now',
    nav_menu: 'Menu',
    nav_close: 'Close',

    /* ── Common CTA labels ───────────────────────────────── */
    cta_becomePartner: 'Partner with YES',
    cta_becomePartnerShort: 'Become a Partner',
    cta_donateNow: 'Donate Now',
    cta_standWithWorker: 'Stand With a Worker Today',
    cta_meetTheWorkers: 'Meet the Workers',
    cta_howItWorks: 'How It Works',
    cta_viewFinancials: 'View Our Financials',
    cta_talkWithAndres: 'Talk to Andrés',
    cta_learnMore: 'Learn more',
    cta_inquireTrip: 'Inquire About a Mission Trip',
    cta_giveByMail: 'Give By Mail',
    cta_seeFullStory: 'See the full story',

    /* ── Footer (FINAL v2 / mapa) ────────────────────────── */
    footer_links: 'Links',
    footer_connect: 'Connect',
    footer_join: 'Join the Mission',
    footer_financialSupport: 'Financial Support',
    footer_logisticalSupport: 'Logistical Support',
    footer_partnership: 'Partnership',
    footer_annualReports: 'Annual Reports',
    footer_legal: 'YES (Yielded Evangelical Servants) is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent permitted by law.',
    footer_ein: 'EIN: 54-1558343',
    footer_copyright: 'Yielded Evangelical Servants © 2002–2026 · All Rights Reserved',
    footer_utility_contact: 'Contact',
    footer_utility_privacy: 'Privacy',

    /* ── Worker / profile detail (shared) ────────────────── */
    detail_back: 'All Missionaries',
    detail_label: 'Missionary · YES',
    detail_sendingChurch: 'Sending Church',
    detail_started: 'Ministry Started',
    detail_duration: 'Duration',
    detail_contact: 'Contact',
    detail_donate: 'Support',
    detail_ctaLabel: 'Stand With',
    detail_ministry: '',
    detail_giveNow: 'Give Now →',
    detail_meetOthers: 'Meet Other Missionaries',

    /* ── Statement of Faith (reused) ─────────────────────── */
    faith_label: 'What We Believe',
    faith_creed: 'I believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord; who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell; the third day He arose again from the dead; He ascended into heaven, sits at the right hand of God, the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the Holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
    faith_source: "The Apostles' Creed",
  },

  es: {
    /* ── Constantes de marca (FINAL v2) ──────────────────── */
    brand_tagline: 'YES encuentra a los obreros fieles con quienes nadie está — y se pone a su lado.',
    brand_thematic: 'Si somos un solo Cuerpo — ningún siervo fiel debería estar solo.',
    brand_uvp: 'YES va donde los obreros fieles ya están sirviendo — cargando más de lo que nadie debería cargar solo.',
    brand_founded: 'Fundada por misioneros. Forjada en el campo. Junto a obreros fieles del Evangelio desde 1990.',

    /* ── Navegación principal (FINAL v2) ─────────────────── */
    nav_home: 'Inicio',
    nav_aboutYes: 'Quiénes Somos',
    nav_missionaries: 'Los Misioneros',
    nav_howItWorks: 'Cómo Funciona',
    nav_missionTeams: 'Equipos Misioneros',
    nav_contact: 'Contacto',
    nav_give: 'Donar Ahora',
    nav_menu: 'Menú',
    nav_close: 'Cerrar',

    /* ── Botones / llamados a la acción comunes ──────────── */
    cta_becomePartner: 'Asóciate con YES',
    cta_becomePartnerShort: 'Ser Socio',
    cta_donateNow: 'Donar Ahora',
    cta_standWithWorker: 'Apoya a un Trabajador Hoy',
    cta_meetTheWorkers: 'Conoce a los Misioneros',
    cta_howItWorks: 'Cómo Funciona',
    cta_viewFinancials: 'Ver Nuestras Finanzas',
    cta_talkWithAndres: 'Habla con Andrés',
    cta_learnMore: 'Conoce más',
    cta_inquireTrip: 'Consultar sobre un Viaje Misionero',
    cta_giveByMail: 'Donar por Correo',
    cta_seeFullStory: 'Conoce la historia completa',

    /* ── Pie de página (FINAL v2 / mapa) ─────────────────── */
    footer_links: 'Enlaces',
    footer_connect: 'Conectar',
    footer_join: 'Únete a la Misión',
    footer_financialSupport: 'Apoyo Financiero',
    footer_logisticalSupport: 'Apoyo Logístico',
    footer_partnership: 'Asociación',
    footer_annualReports: 'Informes Anuales',
    footer_legal: 'YES (Yielded Evangelical Servants) es una organización sin fines de lucro 501(c)(3) registrada. Todas las donaciones son deducibles de impuestos en la medida permitida por la ley.',
    footer_ein: 'EIN: 54-1558343',
    footer_copyright: 'Yielded Evangelical Servants © 2002–2026 · Todos los derechos reservados',
    footer_utility_contact: 'Contacto',
    footer_utility_privacy: 'Privacidad',

    /* ── Detalle de misionero / perfil (compartido) ──────── */
    detail_back: 'Todos los Misioneros',
    detail_label: 'Misionero · YES',
    detail_sendingChurch: 'Iglesia Enviadora',
    detail_started: 'Inicio del Ministerio',
    detail_duration: 'Duración',
    detail_contact: 'Contacto',
    detail_donate: 'Apoyar',
    detail_ctaLabel: 'Acompaña a',
    detail_ministry: '',
    detail_giveNow: 'Dar Ahora →',
    detail_meetOthers: 'Conoce a Otros Misioneros',

    /* ── Declaración de Fe (reutilizada) ─────────────────── */
    faith_label: 'En Qué Creemos',
    faith_creed: 'Creo en Dios, Padre Todopoderoso, Creador del cielo y de la tierra; y en Jesucristo, su único Hijo, Señor nuestro; que fue concebido por obra del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado. Descendió a los infiernos; al tercer día resucitó de entre los muertos; subió a los cielos y está sentado a la derecha de Dios, Padre Todopoderoso; desde allí ha de venir a juzgar a los vivos y a los muertos. Creo en el Espíritu Santo, la santa Iglesia Católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.',
    faith_source: 'El Credo de los Apóstoles',
  },
} as const;
