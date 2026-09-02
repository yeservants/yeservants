/**
 * Home page copy — client v7 landing, verbatim.
 * Source of truth: https://andresgonzalez-beep.github.io/yes-partner/YES_Landing_v7.html
 * (EN) and .../YES_Landing_v7_ES.html (ES). Section order on the page mirrors
 * the source document exactly:
 *   Hero · Stats · The Investment (bridge) · What Makes YES Different ·
 *   The Model · Where Your Partnership Goes · Special Projects ·
 *   The Body of Christ · Why Trust YES · Final CTA
 * (The Missionaries procession carousel closes the page per the 2026-08-19
 * client directive; it carries no v7 body copy.)
 *
 * NOTE: the client's ES source file was published without accents/diacritics.
 * The Spanish below is that same wording with correct orthography restored.
 *
 * Keys prefixed home_. EN and ES must stay in lockstep.
 */
export const home = {
  en: {
    home_meta_desc:
      'Behind every missionary is a story no one sees. YES stands with faithful Gospel workers already in the field, carrying more than anyone should carry alone. Since 1990.',

    /* ── 1 — Hero ─────────────────────────────────────────── */
    home_hero_eyebrow: 'An invitation from Andrés, President — YES Ministries',
    home_hero_headline: 'Behind every missionary is a story no one sees. Until now.',
    home_hero_p1:
      "I've stood in communities where the pastor, the one person the whole village trusts, goes home at night to a leaking roof, a table with barely enough on it. I've seen pastors cutting grass with a machete and picking pineapples in the field just to feed their families.",
    home_hero_pullquote:
      'Their calling is clear. Their faithfulness is extraordinary. What they are carrying, no one should carry alone.',
    home_hero_p2:
      "They are the hands and feet of Jesus in the world's most forgotten places, reaching people no outsider ever could. And they're doing it with almost no support, no structure, and no safety net.",
    home_hero_stat_label: 'Years in the Field',

    /* ── 2 — Stats strip ──────────────────────────────────── */
    home_stat1_value: '35+',
    home_stat1_label: 'Years in the field',
    home_stat2_value: '20+',
    home_stat2_label: 'Nations reached',
    home_stat3_value: 'Platinum',
    home_stat3_label: 'Candid rated',
    home_stat4_value: '501(c)(3)',
    home_stat4_label: 'EIN 54-1558343',

    /* ── 3 — The Investment (bridge pull-quote) ───────────── */
    home_inv_line1: 'The highest-return investment you will ever make is not on Wall Street.',
    home_inv_line2: 'It is in the field. And it lasts forever.',
    home_inv_verse:
      'Do not store up for yourselves treasures on earth, where moth and rust destroy. But store up for yourselves treasures in heaven, where neither moth nor rust destroys.',
    home_inv_ref: 'Matthew 6:19-20',

    /* ── 4 — What Makes YES Different (4 numbered) ────────── */
    home_diff_label: 'What makes YES different',
    home_diff_headline: 'Four things no one else is doing.',
    home_diff_1_title: 'We find the faithful workers everyone else forgot to look for.',
    home_diff_1_body:
      'The large councils only support their own. No sending organization is looking for the pastor already embedded in his community, already trusted, already bearing fruit and carrying everything alone. We do.',
    home_diff_2_title:
      'One Body. One mission. We recognize each other not by our council, but by the Spirit we share.',
    home_diff_2_body:
      "Jesus prayed that we would be one and said our unity would be what makes the watching world believe. We don't ask what council you belong to. We ask one question: are you faithful and are you there?",
    home_diff_3_title: 'We build the people who build churches.',
    home_diff_3_body:
      'A congregation can gather anywhere. What it cannot survive without is a pastor who is stable, supported, and free to lead. We have seen congregations fall not because they lacked a building, but because their pastor was carrying too much alone. We start there.',
    home_diff_4_title: "We go to the field. We stay with the workers. That's the difference.",
    home_diff_4_body:
      'Every year thousands of mission trips arrive, build something, and go home. The pastor stays. The need stays. YES comes alongside these workers with financial support, pastoral care, and ongoing education and keeps them connected to the wider Body of Christ. Not for a season. For as long as it takes.',

    /* ── 5 — The Model (comparison ledger) ────────────────── */
    home_model_label: 'The model',
    home_model_headline: 'Why this is the most direct path to lasting impact.',
    home_model_intro:
      "There is already a pastor in that village. He already speaks the language. He has already earned the community's trust. The question was never whether someone should go. It is whether we noticed who was already there.",
    home_model_col_factor: 'Factor',
    home_model_col_us: 'Sent from the US',
    home_model_col_yes: 'YES model',
    home_model_r1_f: 'Language',
    home_model_r1_us: 'Years of training',
    home_model_r1_us_sub: 'before ministry begins',
    home_model_r1_yes: 'Already fluent',
    home_model_r1_yes_sub: 'ministry starts day one',
    home_model_r2_f: 'Community trust',
    home_model_r2_us: 'Built from zero',
    home_model_r2_us_sub: 'takes years',
    home_model_r2_yes: 'Already earned',
    home_model_r2_yes_sub: 'years of relationships',
    home_model_r3_f: 'Field access',
    home_model_r3_us: 'Visa dependent',
    home_model_r3_us_sub: 'can be revoked',
    home_model_r3_yes: 'Permanent citizen',
    home_model_r3_yes_sub: 'nowhere to be sent home',
    home_model_r4_f: 'Time to impact',
    home_model_r4_us: 'Years of preparation',
    home_model_r4_us_sub: 'training + adaptation',
    home_model_r4_yes: 'Immediate',
    home_model_r4_yes_sub: 'support begins right away',
    home_model_r5_f: 'Permanence',
    home_model_r5_us: 'Temporary',
    home_model_r5_us_sub: 'assignment eventually ends',
    home_model_r5_yes: 'Permanent',
    home_model_r5_yes_sub: 'this is his home',
    home_model_r6_f: 'Cost efficiency',
    home_model_r6_us: 'Significantly higher',
    home_model_r6_us_sub: 'fully loaded',
    home_model_r6_yes: 'A fraction of that',
    home_model_r6_yes_sub: 'calibrated to the field',

    /* ── 6 — Where Your Partnership Goes ──────────────────── */
    home_sup_label: 'Where your partnership goes',
    home_sup_headline: 'God makes the connection. We stay.',
    home_sup_quote:
      "You partner with YES. YES partners with the workers. We know them by name — their fields, their families, their faithfulness. That's how the Kingdom moves.",
    home_sup_1_title: 'Sustaining faithful workers',
    home_sup_1_body:
      'Supporting missionaries and their families so they can focus entirely on the mission, not on survival.',
    home_sup_2_title: 'Restoring homes and gathering places',
    home_sup_2_body:
      'A pastor who lives with dignity leads with his whole self. A congregation with a place to gather becomes the Church.',
    home_sup_3_title: 'Deploying mission teams',
    home_sup_3_body:
      'Churches, schools, and companies who want to invest in global mission with real impact, not sightseeing.',
    home_sup_4_title: 'Evangelistic projects on the ground',
    home_sup_4_body:
      'Work identified by local workers who know the field, that opens doors and leaves lasting connections to the local church.',

    /* ── 7 — Special Projects (2 priorities) ──────────────── */
    home_proj_label: 'Special projects',
    home_proj_headline: 'Beyond ongoing support, there is always work to be done.',
    home_proj_intro:
      'The biblical model does not require a building. People gather wherever there is faith. But the pastor who serves that congregation needs a place to live with dignity. When he is stable, the congregation grows. And then we think about the building.',
    home_proj_1_num: 'Priority 01',
    home_proj_1_title: "The pastor's home.",
    home_proj_1_body:
      "We have seen pastors living in conditions no one should accept. A leaking roof. Walls that let in the rain. Restoring a pastor's home changes his family's reality permanently, and frees him to lead with his whole self, not just what's left after survival.",
    home_proj_1_verse: 'The worker deserves his wages.',
    home_proj_1_ref: 'Luke 10:7',
    home_proj_2_num: 'Priority 02',
    home_proj_2_title: "The congregation's gathering place.",
    home_proj_2_body:
      'Once a pastor and his family are stable, the congregation can grow. A growing congregation needs a place to gather. Replacing a roof. Repairing walls. Building a space where a community can meet week after week and become the Church.',
    home_proj_2_verse: 'How beautiful are the feet of those who bring good news.',
    home_proj_2_ref: 'Romans 10:15',

    /* ── 8 — The Body of Christ ───────────────────────────── */
    home_biblical_label: 'The Body of Christ',
    home_biblical_headline: 'This is not charity. This is the Body functioning as one.',
    home_biblical_p1:
      "The Church was never meant to be a building. It is a people, each part indispensable to the whole. And the missionary in the field? They are the body's reach into the world, going where the rest of us cannot. When we leave them unsupported, we are a body that has abandoned its own limbs.",
    home_biblical_card1_ref: '1 Corinthians 12:26-27',
    home_biblical_card1_quote:
      'If one member suffers, all suffer together with it; if one member is honored, all rejoice together with it. Now you are the body of Christ, and each one of you is a part of it.',
    home_biblical_card2_ref: 'Luke 6:38',
    home_biblical_card2_quote:
      'Give, and it will be given to you. A good measure, pressed down, shaken together, running over, will be put into your lap.',

    /* ── 9 — Why Trust YES ────────────────────────────────── */
    home_trust_label: 'Why trust YES',
    home_trust_headline: '35 years. Platinum-rated. Founded by missionaries, for missionaries.',
    home_trust_body:
      'YES has operated since 1990, founded by people who had been in the field and understood from experience what faithful workers were missing. We do not parachute in. We build relationships, stay for the long term, and structure everything so local leaders are empowered, not dependent.',
    home_trust_i1: 'Platinum-rated on Candid',
    home_trust_i2: '501(c)(3) · EIN 54-1558343',
    home_trust_i3: 'Operating since 1990',
    home_trust_i4: 'Founded by field missionaries',
    home_trust_i5: '20+ nations active today',

    /* ── 10 — Final CTA ───────────────────────────────────── */
    home_cta_signature: 'Andrés · President, YES',
    home_cta_headline: 'The hands and feet need the whole body. Will you be that support?',
    home_cta_body:
      "Your partnership is what lets a missionary stop surviving and start thriving. Give me a few minutes. I'll show you a real face, a real place, and exactly where your support goes.",
    home_cta_verse: 'By this everyone will know that you are my disciples, if you love one another.',
    home_cta_verse_ref: 'John 13:35',
    home_cta_contact: 'yeservants.org · info@yeservants.org · Orlando, FL · 501(c)(3)',
    home_cta_andres_alt: 'Andrés González, President of YES, in the field',

    /* ── The Missionaries procession (bottom carousel) ────── */
    home_mis_label: 'The Missionaries',
    home_mis_headline: 'The faces you stand with.',
    home_mis_sub:
      'Pastors, evangelists and church planters — already in the field, already faithful, already bearing fruit.',
    home_mis_cta: 'Meet the missionaries',
  },

  es: {
    home_meta_desc:
      'Detrás de cada misionero hay una historia que nadie ve. YES acompaña a obreros fieles del Evangelio que ya están en el campo, cargando más de lo que nadie debería cargar solo. Desde 1990.',

    /* ── 1 — Hero ─────────────────────────────────────────── */
    home_hero_eyebrow: 'Una invitación de Andrés, Presidente de YES Ministries',
    home_hero_headline: 'Detrás de cada misionero hay una historia que nadie ve. Hasta ahora.',
    home_hero_p1:
      'He estado en comunidades donde el pastor, la persona en quien todo el pueblo confía, llega a casa por la noche a un techo con goteras, a una mesa con apenas suficiente. He visto pastores cortando hierba con un machete y recogiendo piñas en el campo para alimentar a sus familias.',
    home_hero_pullquote:
      'Su llamado es claro. Su fidelidad es extraordinaria. Lo que cargan, nadie debería cargarlo solo.',
    home_hero_p2:
      'Son las manos y los pies de Jesús en los lugares más olvidados del mundo, alcanzando personas que ningún extranjero jamás podría alcanzar. Y lo hacen con casi ningún apoyo, ninguna estructura, y ninguna red de seguridad para ellos ni para sus familias.',
    home_hero_stat_label: 'Años en el Campo',

    /* ── 2 — Fila de estadísticas ─────────────────────────── */
    home_stat1_value: '35+',
    home_stat1_label: 'Años en el campo',
    home_stat2_value: '20+',
    home_stat2_label: 'Naciones alcanzadas',
    home_stat3_value: 'Platino',
    home_stat3_label: 'Calificación Candid',
    home_stat4_value: '501(c)(3)',
    home_stat4_label: 'EIN 54-1558343',

    /* ── 3 — La Inversión ─────────────────────────────────── */
    home_inv_line1: 'La inversión de mayor retorno que jamás harás no está en Wall Street.',
    home_inv_line2: 'Está en el campo. Y dura para siempre.',
    home_inv_verse:
      'No acumuléis para vosotros tesoros en la tierra, donde la polilla y el óxido destruyen. Sino acumulad para vosotros tesoros en el cielo, donde ni la polilla ni el óxido destruyen.',
    home_inv_ref: 'Mateo 6:19-20',

    /* ── 4 — Lo que hace diferente a YES ──────────────────── */
    home_diff_label: 'Lo que hace diferente a YES',
    home_diff_headline: 'Cuatro cosas que nadie más está haciendo.',
    home_diff_1_title: 'Encontramos a los trabajadores fieles que todos los demás olvidaron buscar.',
    home_diff_1_body:
      'Los grandes concilios solo apoyan a los suyos. Ninguna organización misionera está buscando al pastor que ya está insertado en su comunidad, ya confiable, ya dando fruto, y cargando todo solo. Nosotros sí.',
    home_diff_2_title:
      'Un solo Cuerpo. Una sola misión. Nos reconocemos no por nuestro concilio, sino por el Espíritu que compartimos.',
    home_diff_2_body:
      'Jesús oró para que fuéramos uno, y dijo que nuestra unidad sería lo que haría creer al mundo que lo observa. No preguntamos a qué concilio perteneces. Preguntamos una sola cosa: ¿eres fiel y estás allí?',
    home_diff_3_title: 'Formamos a las personas que construyen iglesias.',
    home_diff_3_body:
      'Una congregación puede reunirse en cualquier lugar. Lo que no puede faltarle es un pastor que esté estable, apoyado y libre para liderar. Hemos visto congregaciones caer no porque les faltara un edificio, sino porque su pastor cargaba demasiado solo. Empezamos ahí.',
    home_diff_4_title: 'Vamos al campo. Nos quedamos con los trabajadores. Esa es la diferencia.',
    home_diff_4_body:
      'Cada año llegan miles de viajes misioneros, construyen algo y se van. El pastor se queda. La necesidad se queda. YES camina junto a estos trabajadores con apoyo financiero, acompañamiento pastoral y educación continua, y los mantiene conectados al Cuerpo de Cristo. No por una temporada. Por el tiempo que sea necesario.',

    /* ── 5 — El modelo ────────────────────────────────────── */
    home_model_label: 'El modelo',
    home_model_headline: 'Por qué este es el camino más directo hacia un impacto duradero.',
    home_model_intro:
      'Ya hay un pastor en ese pueblo. Ya habla el idioma. Ya se ha ganado la confianza de la comunidad. La pregunta nunca fue si alguien debía ir. Fue si notamos a quien ya estaba allí.',
    home_model_col_factor: 'Factor',
    home_model_col_us: 'Misionero enviado desde EE. UU.',
    home_model_col_yes: 'Modelo YES',
    home_model_r1_f: 'Idioma',
    home_model_r1_us: 'Años de entrenamiento',
    home_model_r1_us_sub: 'antes de que el ministerio comience',
    home_model_r1_yes: 'Ya habla el idioma',
    home_model_r1_yes_sub: 'el ministerio empieza el primer día',
    home_model_r2_f: 'Confianza de la comunidad',
    home_model_r2_us: 'Construida desde cero',
    home_model_r2_us_sub: 'toma años',
    home_model_r2_yes: 'Ya ganada',
    home_model_r2_yes_sub: 'años de relaciones establecidas',
    home_model_r3_f: 'Acceso al campo',
    home_model_r3_us: 'Depende de la visa',
    home_model_r3_us_sub: 'puede ser revocada',
    home_model_r3_yes: 'Ciudadano permanente',
    home_model_r3_yes_sub: 'nadie puede enviarlo de vuelta',
    home_model_r4_f: 'Tiempo hasta el impacto',
    home_model_r4_us: 'Años de preparación',
    home_model_r4_us_sub: 'entrenamiento y adaptación',
    home_model_r4_yes: 'Inmediato',
    home_model_r4_yes_sub: 'el apoyo comienza de inmediato',
    home_model_r5_f: 'Permanencia',
    home_model_r5_us: 'Temporal',
    home_model_r5_us_sub: 'la asignación eventualmente termina',
    home_model_r5_yes: 'Permanente',
    home_model_r5_yes_sub: 'este es su hogar',
    home_model_r6_f: 'Eficiencia de costo',
    home_model_r6_us: 'Significativamente mayor',
    home_model_r6_us_sub: 'costo total',
    home_model_r6_yes: 'Una fracción de eso',
    home_model_r6_yes_sub: 'calibrado al campo',

    /* ── 6 — A dónde va tu apoyo ──────────────────────────── */
    home_sup_label: 'A dónde va tu apoyo',
    home_sup_headline: 'Dios hace la conexión. Nosotros nos quedamos.',
    home_sup_quote:
      'Tú te asocias con YES. YES se asocia con los trabajadores. Los conocemos por nombre — sus campos, sus familias, su fidelidad. Así es como se mueve el Reino.',
    home_sup_1_title: 'Sosteniendo a trabajadores fieles',
    home_sup_1_body:
      'Apoyando a misioneros y sus familias para que puedan enfocarse completamente en la misión, no en sobrevivir.',
    home_sup_2_title: 'Restaurando hogares y lugares de reunión',
    home_sup_2_body:
      'Un pastor que vive con dignidad lidera con todo su ser. Una congregación con un lugar para reunirse se convierte en la Iglesia.',
    home_sup_3_title: 'Enviando equipos misioneros',
    home_sup_3_body:
      'Iglesias, escuelas y empresas que quieren invertir en la misión global con impacto real, no turismo espiritual.',
    home_sup_4_title: 'Proyectos evangelísticos en el campo',
    home_sup_4_body:
      'Trabajo identificado por los trabajadores locales que conocen el campo, que abre puertas y deja conexiones duraderas con la iglesia local.',

    /* ── 7 — Proyectos especiales ─────────────────────────── */
    home_proj_label: 'Proyectos especiales',
    home_proj_headline: 'Más allá del apoyo continuo, siempre hay trabajo por hacer.',
    home_proj_intro:
      'El modelo bíblico no requiere un edificio. La gente se reúne donde sea que haya fe. Pero el pastor que sirve a esa congregación necesita un lugar donde vivir con dignidad. Cuando él está estable, la congregación crece. Y entonces pensamos en el edificio.',
    home_proj_1_num: 'Prioridad 01',
    home_proj_1_title: 'El hogar del pastor.',
    home_proj_1_body:
      'Hemos visto pastores viviendo en condiciones que nadie debería aceptar. Un techo con goteras. Paredes que dejan entrar la lluvia. Restaurar el hogar de un pastor cambia la realidad de su familia para siempre, y lo libera para liderar con todo su ser, no solo con lo que queda después de sobrevivir.',
    home_proj_1_verse: 'El trabajador merece su salario.',
    home_proj_1_ref: 'Lucas 10:7',
    home_proj_2_num: 'Prioridad 02',
    home_proj_2_title: 'El lugar de reunión de la congregación.',
    home_proj_2_body:
      'Una vez que el pastor y su familia estén estables, la congregación puede crecer. Una congregación en crecimiento necesita un lugar para reunirse. Cambiar un techo. Reparar paredes. Construir un espacio donde una comunidad pueda reunirse semana tras semana y convertirse en la Iglesia.',
    home_proj_2_verse: 'Cuán hermosos son los pies de los que anuncian buenas nuevas.',
    home_proj_2_ref: 'Romanos 10:15',

    /* ── 8 — El Cuerpo de Cristo ──────────────────────────── */
    home_biblical_label: 'El Cuerpo de Cristo',
    home_biblical_headline: 'Esto no es caridad. Es el Cuerpo funcionando como uno.',
    home_biblical_p1:
      'La Iglesia nunca fue pensada como un edificio. Es un pueblo, cada parte indispensable para el conjunto. ¿Y el misionero en el campo? Es el alcance del cuerpo hacia el mundo, las manos y los pies de Jesús, yendo donde el resto de nosotros no puede. Cuando los dejamos sin apoyo, somos un cuerpo que ha abandonado sus propios miembros.',
    home_biblical_card1_ref: '1 Corintios 12:26-27',
    home_biblical_card1_quote:
      'Si un miembro padece, todos los miembros se duelen con él; y si un miembro recibe honra, todos los miembros con él se gozan. Vosotros, pues, sois el cuerpo de Cristo, y miembros cada uno en particular.',
    home_biblical_card2_ref: 'Lucas 6:38',
    home_biblical_card2_quote:
      'Dad, y se os dará; medida buena, apretada, remecida y rebosando darán en vuestro regazo.',

    /* ── 9 — Por qué confiar en YES ───────────────────────── */
    home_trust_label: 'Por qué confiar en YES',
    home_trust_headline: '35 años. Calificación Platino. Fundado por misioneros, para misioneros.',
    home_trust_body:
      'YES ha operado desde 1990, fundado por personas que habían estado en el campo y entendían por experiencia lo que les faltaba a los trabajadores fieles. No llegamos en paracaídas. Construimos relaciones, nos quedamos a largo plazo, y estructuramos todo para que los líderes locales sean empoderados, no dependientes.',
    home_trust_i1: 'Calificación Platino en Candid',
    home_trust_i2: '501(c)(3) · EIN 54-1558343',
    home_trust_i3: 'Operando desde 1990',
    home_trust_i4: 'Fundado por misioneros de campo',
    home_trust_i5: '20+ naciones activas hoy',

    /* ── 10 — Llamada final ───────────────────────────────── */
    home_cta_signature: 'Andrés · Presidente, YES',
    home_cta_headline: 'Las manos y los pies necesitan al Cuerpo entero. ¿Serás ese apoyo?',
    home_cta_body:
      'Tu asociación es lo que permite que un misionero deje de sobrevivir y empiece a prosperar. Dame unos minutos. Te mostraré un rostro real, un lugar real, y exactamente a dónde va tu apoyo.',
    home_cta_verse:
      'En esto conocerán todos que sois mis discípulos, si tuviereis amor los unos con los otros.',
    home_cta_verse_ref: 'Juan 13:35',
    home_cta_contact: 'yeservants.org · info@yeservants.org · Orlando, FL · 501(c)(3)',
    home_cta_andres_alt: 'Andrés González, Presidente de YES, en el campo',

    /* ── La procesión de Los Misioneros (carrusel final) ─── */
    home_mis_label: 'Los Misioneros',
    home_mis_headline: 'Los rostros que tú sostienes.',
    home_mis_sub:
      'Pastores, evangelistas y plantadores de iglesias — ya en el campo, ya fieles, ya dando fruto.',
    home_mis_cta: 'Conoce a los misioneros',
  },
} as const;
