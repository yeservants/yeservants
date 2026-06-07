/**
 * Shared / global strings — nav, footer, brand constants, common CTAs.
 * Page-specific copy lives in ./pages/<page>.ts and is merged by translations.ts.
 * Keys must be globally unique across all modules.
 */
export const common = {
  en: {
    /* ── Brand constants ─────────────────────────────────── */
    brand_tagline: 'Strengthening Gospel Workers. Sustaining Kingdom Impact.',
    brand_thematic: 'If we are one Body, no servant of Christ should stand alone.',
    brand_founded: 'Founded by missionaries. Built on the field. Serving Gospel workers for 35+ years.',

    /* ── V3 primary navigation ───────────────────────────── */
    nav_home: 'Home',
    nav_aboutYes: 'About YES',
    nav_ourWork: 'Our Work',
    nav_gospelWorkers: 'Gospel Workers',
    nav_howItWorks: 'How It Works',
    nav_give: 'Give',
    nav_forDonors: 'For Donors',
    nav_menu: 'Menu',
    nav_close: 'Close',

    /* ── Common CTA labels ───────────────────────────────── */
    cta_partnerWithUs: 'Partner With Us',
    cta_meetTheWorkers: 'Meet the Workers',
    cta_giveMonthly: 'Give Monthly',
    cta_exploreOurWork: 'Explore Our Work',
    cta_learnMore: 'Learn More',
    cta_learnHowWeWork: 'Learn More About How We Work',
    cta_seeFinancials: 'See Our Financials',
    cta_viewFinancials: 'View Our Financials and Annual Reports',
    cta_giveToday: 'Give Today',
    cta_becomeMonthlyPartner: 'Become a Monthly Partner',
    cta_becomePartner: 'Become a Partner Today',
    cta_talkWithTeam: 'Talk With Our Team',
    cta_scheduleConversation: 'Schedule a Conversation',
    cta_donateOnline: 'Donate Online',
    cta_giveByMail: 'Give By Mail',

    /* ── V3 footer ───────────────────────────────────────── */
    footer_explore: 'Explore',
    footer_connect: 'Connect',
    footer_supportCta_label: '2 Corinthians 9:7',
    footer_supportCta_heading: 'Stand With Faithful Workers',
    footer_supportCta_body: 'For more than 35 years, YES has strengthened the workers who carry the Gospel into hard places. Your partnership keeps them there.',
    footer_legal: 'Yielded Evangelical Servants (YES) is a registered 501(c)(3) nonprofit ministry. All donations are tax-deductible to the extent permitted by law.',
    footer_ein: 'EIN: [to be provided]',
    footer_copyright: 'Yielded Evangelical Servants © 2002–2026 · All Rights Reserved',
    footer_utility_contact: 'Contact',
    footer_utility_privacy: 'Privacy',

    /* ── Worker / profile detail (shared) ────────────────── */
    detail_back: 'All Gospel Workers',
    detail_label: 'Gospel Worker · YES',
    detail_sendingChurch: 'Sending Church',
    detail_started: 'Ministry Started',
    detail_duration: 'Duration',
    detail_contact: 'Contact',
    detail_donate: 'Support',
    detail_ctaLabel: 'Stand With',
    detail_ministry: '',
    detail_giveNow: 'Give Now →',
    detail_meetOthers: 'Meet Other Workers',

    /* ── Statement of Faith (reused) ─────────────────────── */
    faith_label: 'What We Believe',
    faith_creed: 'I believe in God, the Father Almighty, Creator of heaven and earth; and in Jesus Christ, His only Son, our Lord; who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell; the third day He arose again from the dead; He ascended into heaven, sits at the right hand of God, the Father Almighty; from thence He shall come to judge the living and the dead. I believe in the Holy Spirit, the Holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
    faith_source: "The Apostles' Creed",
  },

  es: {
    /* ── Constantes de marca ─────────────────────────────── */
    brand_tagline: 'Fortaleciendo a los Obreros del Evangelio. Sosteniendo el Impacto del Reino.',
    brand_thematic: 'Si somos un solo Cuerpo, ningún siervo de Cristo debería estar solo.',
    brand_founded: 'Fundada por misioneros. Forjada en el campo. Sirviendo a obreros del Evangelio por más de 35 años.',

    /* ── Navegación principal V3 ─────────────────────────── */
    nav_home: 'Inicio',
    nav_aboutYes: 'Sobre YES',
    nav_ourWork: 'Nuestra Labor',
    nav_gospelWorkers: 'Obreros del Evangelio',
    nav_howItWorks: 'Cómo Funciona',
    nav_give: 'Donar',
    nav_forDonors: 'Para Donantes',
    nav_menu: 'Menú',
    nav_close: 'Cerrar',

    /* ── Botones / llamados a la acción comunes ──────────── */
    cta_partnerWithUs: 'Asóciate con Nosotros',
    cta_meetTheWorkers: 'Conoce a los Obreros',
    cta_giveMonthly: 'Dona Mensualmente',
    cta_exploreOurWork: 'Explora Nuestra Labor',
    cta_learnMore: 'Conoce Más',
    cta_learnHowWeWork: 'Conoce Cómo Trabajamos',
    cta_seeFinancials: 'Ver Nuestras Finanzas',
    cta_viewFinancials: 'Ver Nuestras Finanzas e Informes Anuales',
    cta_giveToday: 'Dona Hoy',
    cta_becomeMonthlyPartner: 'Hazte Socio Mensual',
    cta_becomePartner: 'Hazte Socio Hoy',
    cta_talkWithTeam: 'Habla con Nuestro Equipo',
    cta_scheduleConversation: 'Agenda una Conversación',
    cta_donateOnline: 'Donar en Línea',
    cta_giveByMail: 'Donar por Correo',

    /* ── Pie de página V3 ────────────────────────────────── */
    footer_explore: 'Explorar',
    footer_connect: 'Conectar',
    footer_supportCta_label: '2 Corintios 9:7',
    footer_supportCta_heading: 'Acompaña a los Obreros Fieles',
    footer_supportCta_body: 'Por más de 35 años, YES ha fortalecido a los obreros que llevan el Evangelio a lugares difíciles. Tu apoyo los sostiene allí.',
    footer_legal: 'Yielded Evangelical Servants (YES) es un ministerio sin fines de lucro 501(c)(3) registrado. Todas las donaciones son deducibles de impuestos en la medida permitida por la ley.',
    footer_ein: 'EIN: [por proporcionar]',
    footer_copyright: 'Yielded Evangelical Servants © 2002–2026 · Todos los derechos reservados',
    footer_utility_contact: 'Contacto',
    footer_utility_privacy: 'Privacidad',

    /* ── Detalle de obrero / perfil (compartido) ─────────── */
    detail_back: 'Todos los Obreros',
    detail_label: 'Obrero del Evangelio · YES',
    detail_sendingChurch: 'Iglesia Enviadora',
    detail_started: 'Inicio del Ministerio',
    detail_duration: 'Duración',
    detail_contact: 'Contacto',
    detail_donate: 'Apoyar',
    detail_ctaLabel: 'Acompaña a',
    detail_ministry: '',
    detail_giveNow: 'Dar Ahora →',
    detail_meetOthers: 'Conoce a Otros Obreros',

    /* ── Declaración de Fe (reutilizada) ─────────────────── */
    faith_label: 'En Qué Creemos',
    faith_creed: 'Creo en Dios, Padre Todopoderoso, Creador del cielo y de la tierra; y en Jesucristo, su único Hijo, Señor nuestro; que fue concebido por obra del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado. Descendió a los infiernos; al tercer día resucitó de entre los muertos; subió a los cielos y está sentado a la derecha de Dios, Padre Todopoderoso; desde allí ha de venir a juzgar a los vivos y a los muertos. Creo en el Espíritu Santo, la santa Iglesia Católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.',
    faith_source: 'El Credo de los Apóstoles',
  },
} as const;
