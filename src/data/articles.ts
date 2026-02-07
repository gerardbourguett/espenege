import { Article, CategorySlug } from "@/types/article";

export const articles: Article[] = [
  // NACIONAL (7 articles)
  {
    id: "1",
    slug: "congreso-aprueba-reforma-educativa-2026",
    title: "Congreso aprueba reforma educativa con amplia mayoria",
    excerpt: "El proyecto de ley que moderniza el sistema educativo nacional fue aprobado con 85 votos a favor tras meses de debate.",
    content: `
      <p>En una sesion historica que se extendio hasta altas horas de la noche, el Congreso Nacional aprobo la reforma educativa mas ambiciosa de las ultimas decadas. Con 85 votos a favor, 12 en contra y 3 abstenciones, el proyecto de ley transformara el sistema educativo del pais en los proximos cinco anos.</p>
      <p>La reforma incluye la digitalizacion de todas las aulas, nuevos programas de capacitacion docente, y un aumento del 40% en el presupuesto educativo. Los sectores mas beneficiados seran las zonas rurales, donde se construiran 200 nuevas escuelas equipadas con tecnologia de punta.</p>
      <p>El presidente de la Comision de Educacion celebro la aprobacion y destaco que "este es un dia historico para nuestro pais. Estamos invirtiendo en el futuro de nuestros ninos y jovenes". La implementacion comenzara en marzo de 2026.</p>
    `,
    category: "nacional",
    author: {
      name: "Maria Rodriguez",
      avatar: "/images/avatars/maria.jpg",
      role: "Editora Politica",
    },
    publishedAt: "2026-02-05T14:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Sesion del Congreso Nacional",
    readingTime: 4,
    isFeatured: true,
    views: 45230,
    tags: ["educacion", "congreso", "reforma", "politica"],
  },
  {
    id: "2",
    slug: "nuevo-hospital-metropolitano-inauguracion",
    title: "Inauguran el nuevo Hospital Metropolitano con capacidad para 500 pacientes",
    excerpt: "El moderno centro medico cuenta con tecnologia de ultima generacion y atendera a miles de familias de la capital.",
    content: `
      <p>El Ministro de Salud inauguro hoy el nuevo Hospital Metropolitano, una obra que demando tres anos de construccion y una inversion de 180 millones de dolares. El centro medico, ubicado en la zona norte de la capital, tiene capacidad para atender a 500 pacientes simultaneamente.</p>
      <p>Entre sus instalaciones destacan 15 quirofanos de alta complejidad, una unidad de cuidados intensivos con 80 camas, y el primer centro de medicina nuclear del pais. Ademas, cuenta con helipuerto para emergencias y un sistema de telemedicina que lo conecta con centros de salud rurales.</p>
      <p>Se estima que el hospital beneficiara a mas de 2 millones de personas de la region metropolitana, reduciendo significativamente los tiempos de espera para cirugias y consultas especializadas. El centro comenzara operaciones completas la proxima semana.</p>
    `,
    category: "nacional",
    author: {
      name: "Carlos Mendez",
      avatar: "/images/avatars/carlos.jpg",
      role: "Corresponsal de Salud",
    },
    publishedAt: "2026-02-04T09:15:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Fachada del nuevo Hospital Metropolitano",
    readingTime: 3,
    isFeatured: true,
    views: 38750,
    tags: ["salud", "infraestructura", "hospitales"],
  },
  {
    id: "3",
    slug: "metro-linea-4-expansion-aprobada",
    title: "Aprueban expansion de la Linea 4 del Metro hacia el este",
    excerpt: "El proyecto conectara cinco nuevos municipios y se espera que este operativo en 2028.",
    content: `
      <p>El Consejo de Transporte Metropolitano aprobo por unanimidad la expansion de la Linea 4 del Metro, un proyecto que beneficiara a mas de 800,000 residentes del este de la ciudad. La nueva extension agregara 12 kilometros y 9 estaciones a la red existente.</p>
      <p>La obra, presupuestada en 450 millones de dolares, comenzara en junio de 2026 y se espera que este completada para mediados de 2028. Las nuevas estaciones incluiran centros comerciales, estacionamientos para bicicletas y conexiones con rutas de autobuses.</p>
      <p>Los alcaldes de los municipios beneficiados celebraron la decision, destacando que mejorara significativamente la calidad de vida de sus habitantes y reducira el tiempo de traslado al centro de la ciudad en hasta 45 minutos.</p>
    `,
    category: "nacional",
    author: {
      name: "Ana Patricia Silva",
      avatar: "/images/avatars/ana.jpg",
      role: "Periodista de Infraestructura",
    },
    publishedAt: "2026-02-03T16:45:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Plano de la expansion del Metro",
    readingTime: 3,
    views: 29340,
    tags: ["transporte", "metro", "infraestructura", "movilidad"],
  },
  {
    id: "4",
    slug: "temporada-lluvias-alerta-verde",
    title: "Declaran alerta verde en 8 provincias por inicio de temporada de lluvias",
    isBreaking: true,
    excerpt: "Defensa Civil activa protocolos de prevencion ante pronostico de precipitaciones intensas para los proximos 15 dias.",
    content: `
      <p>El Instituto Nacional de Meteorologia y el Ministerio de Defensa Civil declararon alerta verde en ocho provincias del pais ante el inicio de la temporada de lluvias, que este ano se presenta con mayor intensidad de lo habitual. Las provincias afectadas incluyen la region central, norte y costa atlantica.</p>
      <p>Segun los modelos meteorologicos, se esperan precipitaciones acumuladas de hasta 200 milimetros en las proximas dos semanas, con picos de intensidad durante las tardes y noches. Las autoridades han activado los centros de monitoreo las 24 horas y dispuesto brigadas de respuesta rapida en zonas de riesgo.</p>
      <p>Los residentes de areas propensas a inundaciones han sido notificados y se han habilitado 15 refugios temporales. Defensa Civil recomienda revisar techos, limpiar alcantarillas y mantenerse informados a traves de los canales oficiales. El numero de emergencias 911 esta disponible para cualquier eventualidad.</p>
    `,
    category: "nacional",
    author: {
      name: "Roberto Guzman",
      avatar: "/images/avatars/roberto.jpg",
      role: "Corresponsal de Emergencias",
    },
    publishedAt: "2026-02-06T07:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Mapa de alerta meteorologica",
    readingTime: 3,
    views: 52100,
    tags: ["clima", "emergencia", "lluvias", "defensa-civil"],
  },
  {
    id: "5",
    slug: "exportaciones-crecen-15-primer-trimestre",
    title: "Exportaciones crecen 15% en el primer mes del ano",
    excerpt: "El sector agricola lidera el incremento con ventas record de cafe y aguacate a mercados internacionales.",
    content: `
      <p>El Ministerio de Comercio Exterior reporto un crecimiento del 15% en las exportaciones durante enero de 2026, superando las proyecciones mas optimistas de los analistas economicos. El sector agricola fue el motor principal de este incremento, con ventas record de cafe, aguacate y productos organicos.</p>
      <p>Las exportaciones de cafe alcanzaron los 45 millones de dolares, un 22% mas que el mismo mes del ano anterior, impulsadas por nuevos contratos con cadenas de cafeterias europeas. El aguacate, por su parte, registro un incremento del 18% gracias a la apertura del mercado asiatico.</p>
      <p>El ministro de Comercio celebro los resultados y destaco que "estamos diversificando nuestros mercados y agregando valor a nuestros productos. Este crecimiento genera empleo y fortalece nuestra economia". Se espera que la tendencia positiva continue durante el primer trimestre.</p>
    `,
    category: "nacional",
    author: {
      name: "Laura Jimenez",
      avatar: "/images/avatars/laura.jpg",
      role: "Analista Economica",
    },
    publishedAt: "2026-02-02T11:20:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Contenedores de exportacion",
    readingTime: 3,
    views: 18760,
    tags: ["economia", "exportaciones", "comercio", "agricultura"],
  },
  {
    id: "6",
    slug: "parque-nacional-nueva-area-protegida",
    title: "Declaran 50,000 hectareas como nueva area protegida en el Parque Nacional",
    excerpt: "La medida busca preservar ecosistemas unicos y especies en peligro de extincion.",
    content: `
      <p>El Ministerio de Medio Ambiente anuncio la creacion de una nueva zona de proteccion estricta que abarca 50,000 hectareas del Parque Nacional del Norte. La decision fue tomada tras estudios cientificos que identificaron ecosistemas criticos para la conservacion de especies endemicas.</p>
      <p>Entre las especies que se beneficiaran de esta medida se encuentran el jaguar, el aguila harpia y varias especies de anfibios en peligro de extincion. La nueva area protegida tambien resguarda nacimientos de agua que abastecen a comunidades rurales y la capital.</p>
      <p>Ambientalistas celebraron la decision calificandola como "un paso historico para la conservacion". Se implementaran programas de ecoturismo controlado que permitiran visitas educativas sin comprometer la integridad del ecosistema. Guardaparques adicionales seran contratados para vigilar el area.</p>
    `,
    category: "nacional",
    author: {
      name: "Diego Morales",
      avatar: "/images/avatars/diego.jpg",
      role: "Periodista Ambiental",
    },
    publishedAt: "2026-01-31T13:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Bosque tropical del Parque Nacional",
    readingTime: 3,
    views: 15420,
    tags: ["medio-ambiente", "conservacion", "biodiversidad"],
  },
  {
    id: "7",
    slug: "universidad-publica-ranking-internacional",
    title: "Universidad Nacional escala 30 posiciones en ranking internacional",
    excerpt: "El reconocimiento destaca la calidad de investigacion y programas de postgrado en ciencias.",
    content: `
      <p>La Universidad Nacional del Pais escalo 30 posiciones en el prestigioso ranking QS World University, ubicandose entre las 500 mejores universidades del mundo. Este logro representa un reconocimiento a la calidad academica y la produccion cientifica de la institucion.</p>
      <p>El ascenso se debe principalmente a los avances en investigacion cientifica, con especial destaque en las areas de biotecnologia, energias renovables y ciencias de la salud. La universidad publico mas de 300 articulos en revistas cientificas internacionales durante 2025.</p>
      <p>El rector celebro el reconocimiento y anuncio inversiones adicionales en laboratorios y becas para estudiantes de investigacion. "Este logro es el resultado del trabajo dedicado de nuestros profesores y estudiantes. Seguiremos apostando por la excelencia academica", declaro.</p>
    `,
    category: "nacional",
    author: {
      name: "Sofia Ramirez",
      avatar: "/images/avatars/sofia.jpg",
      role: "Corresponsal de Educacion",
    },
    publishedAt: "2026-01-29T10:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Campus de la Universidad Nacional",
    readingTime: 3,
    views: 22140,
    tags: ["educacion", "universidad", "investigacion", "ranking"],
  },

  // INTERNACIONAL (6 articles)
  {
    id: "8",
    slug: "cumbre-cambio-climatico-acuerdos-globales",
    title: "Cumbre mundial sobre cambio climatico alcanza acuerdos historicos",
    excerpt: "Mas de 150 paises se comprometen a reducir emisiones de carbono en 50% para 2035.",
    content: `
      <p>La Cumbre Mundial sobre Cambio Climatico celebrada en Ginebra concluyo con la firma de acuerdos vinculantes por parte de 153 naciones para reducir drasticamente las emisiones de gases de efecto invernadero. Los paises desarrollados se comprometieron a alcanzar la neutralidad de carbono para 2035.</p>
      <p>Entre las medidas acordadas destacan la eliminacion progresiva del carbon como fuente energetica, inversiones de 2 billones de dolares en energias renovables, y la creacion de un fondo de 500 mil millones para ayudar a paises en desarrollo en su transicion energetica.</p>
      <p>Los lideres mundiales calificaron el acuerdo como "el mas ambicioso de la historia" y expresaron optimismo sobre la posibilidad de limitar el calentamiento global a 1.5 grados centigrados. Organizaciones ambientales, aunque reconocen el avance, piden acciones mas rapidas y concretas.</p>
    `,
    category: "internacional",
    author: {
      name: "Patricia Vega",
      avatar: "/images/avatars/patricia.jpg",
      role: "Corresponsal Internacional",
    },
    publishedAt: "2026-02-05T18:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Lideres mundiales en la cumbre",
    readingTime: 4,
    isFeatured: true,
    views: 41200,
    tags: ["clima", "medio-ambiente", "internacional", "cumbre"],
  },
  {
    id: "9",
    slug: "elecciones-francia-segunda-vuelta",
    title: "Francia se prepara para segunda vuelta electoral con candidatos tecnicos",
    excerpt: "Los sondeos muestran una carrera reñida entre la centro-izquierda y centro-derecha.",
    content: `
      <p>Francia se encuentra a pocos dias de la segunda vuelta electoral que definira su proximo presidente. Los candidatos Emmanuel Dubois, de centro-derecha, y Sophie Laurent, de centro-izquierda, mantienen una diferencia de apenas 2 puntos en las ultimas encuestas.</p>
      <p>Ambos candidatos han centrado sus campanas en temas economicos, particularmente la reforma del sistema de pensiones, el desempleo juvenil y la politica migratoria. Los debates televisados han sido vistos por mas de 20 millones de franceses.</p>
      <p>Analistas politicos predicen una participacion electoral superior al 75%, reflejando el alto interes ciudadano en estas elecciones. La votacion se llevara a cabo el domingo y los resultados preliminares se conoceran la misma noche.</p>
    `,
    category: "internacional",
    author: {
      name: "Jean-Pierre Fontaine",
      avatar: "/images/avatars/jean.jpg",
      role: "Corresponsal en Europa",
    },
    publishedAt: "2026-02-04T15:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Bandera de Francia",
    readingTime: 3,
    views: 28450,
    tags: ["elecciones", "francia", "europa", "politica"],
  },
  {
    id: "10",
    slug: "tecnologia-inteligencia-artificial-regulacion",
    title: "Union Europea aprueba primera regulacion integral de Inteligencia Artificial",
    excerpt: "La nueva ley establece estandares eticos y de seguridad para sistemas de IA en todos los sectores.",
    content: `
      <p>El Parlamento Europeo aprobo la primera legislacion integral sobre Inteligencia Artificial del mundo, estableciendo un marco regulatorio que equilibra la innovacion tecnologica con la proteccion de derechos fundamentales. La ley entrara en vigor en enero de 2027.</p>
      <p>La regulacion clasifica los sistemas de IA segun su nivel de riesgo y prohibe aplicaciones consideradas peligrosas como el reconocimiento facial masivo y la manipulacion subliminal. Las empresas deberan cumplir con estrictos requisitos de transparencia y auditoria.</p>
      <p>Gigantes tecnologicos han expresado preocupacion por posibles limitaciones a la innovacion, mientras que grupos de derechos civiles celebran la medida. La Comision Europea enfatiza que la ley posicionara a Europa como lider en IA etica y confiable.</p>
    `,
    category: "internacional",
    author: {
      name: "Michael Chen",
      avatar: "/images/avatars/michael.jpg",
      role: "Editor de Tecnologia",
    },
    publishedAt: "2026-02-03T12:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Concepto de Inteligencia Artificial",
    readingTime: 4,
    views: 35670,
    tags: ["tecnologia", "inteligencia-artificial", "europa", "regulacion"],
  },
  {
    id: "11",
    slug: "arqueologia-egipto-tumba-faraon",
    title: "Descubren tumba intacta de faraon desconocido en el Valle de los Reyes",
    excerpt: "El hallazgo incluye tesoros, momias y jeroglificos que podrian reescribir la historia del antiguo Egipto.",
    content: `
      <p>Un equipo internacional de arqueologos anuncio el descubrimiento de una tumba real intacta en el Valle de los Reyes, Egipto. Se trata de la primera tumba de un faraon encontrada sin saquear en mas de un siglo, y perteneceria a un gobernante hasta ahora desconocido de la dinastia XVIII.</p>
      <p>La tumba contiene mas de 5,000 objetos, incluyendo sarcofagos dorados, joyas, armas ceremoniales y papiros con textos religiosos. Los jeroglificos en las paredes narran la vida del faraon y proporcionan informacion invaluable sobre un periodo poco documentado.</p>
      <p>El Ministerio de Antiguedades de Egipto califica el hallazgo como "uno de los mas importantes del siglo XXI". Los artefactos seran estudiados durante los proximos anos y eventualmente exhibidos en el Gran Museo Egipcio de El Cairo.</p>
    `,
    category: "internacional",
    author: {
      name: "Ahmed Hassan",
      avatar: "/images/avatars/ahmed.jpg",
      role: "Corresponsal en Medio Oriente",
    },
    publishedAt: "2026-02-01T09:45:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Entrada a la tumba descubierta",
    readingTime: 4,
    views: 48900,
    tags: ["arqueologia", "egipto", "historia", "descubrimiento"],
  },
  {
    id: "12",
    slug: "economia-japon-reforma-tecnologica",
    title: "Japon anuncia plan de 300 mil millones para liderar revolucion robotica",
    excerpt: "El gobierno invertira en automatizacion para enfrentar el envejecimiento poblacional.",
    content: `
      <p>El gobierno japones presento un ambicioso plan de inversion de 300 mil millones de dolares para convertir al pais en el lider mundial de robotica y automatizacion. La estrategia busca enfrentar el envejecimiento poblacional y la escasez de mano de obra mediante tecnologia avanzada.</p>
      <p>El plan incluye el desarrollo de robots de asistencia para personas mayores, automatizacion industrial de nueva generacion, y la creacion de ciudades inteligentes piloto. Se espera que genere 2 millones de empleos en sectores tecnologicos durante la proxima decada.</p>
      <p>Empresas como Sony, Toyota y Softbank han confirmado inversiones complementarias por 80 mil millones de dolares. El primer ministro destaco que "esta es nuestra respuesta al desafio demografico y una oportunidad para redefinir el futuro del trabajo".</p>
    `,
    category: "internacional",
    author: {
      name: "Yuki Tanaka",
      avatar: "/images/avatars/yuki.jpg",
      role: "Corresponsal en Asia",
    },
    publishedAt: "2026-01-30T14:20:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Robotica en Japon",
    readingTime: 3,
    views: 26340,
    tags: ["tecnologia", "japon", "robotica", "economia"],
  },
  {
    id: "13",
    slug: "brasil-amazon-reforestacion-proyecto",
    title: "Brasil lanza mayor proyecto de reforestacion del Amazonas en su historia",
    excerpt: "La iniciativa plantara 1,000 millones de arboles en areas degradadas durante los proximos 5 anos.",
    content: `
      <p>El gobierno brasileno, en alianza con ONGs internacionales y empresas privadas, lanzo el mayor proyecto de reforestacion del Amazonas en la historia del pais. La meta es plantar 1,000 millones de arboles nativos en areas degradadas para 2031.</p>
      <p>El proyecto, con una inversion inicial de 2,500 millones de dolares, empleara a 50,000 personas de comunidades locales y utilizara drones y tecnologia satelital para monitorear el crecimiento de los arboles. Se espera que capture 500 millones de toneladas de CO2 en las proximas dos decadas.</p>
      <p>Organizaciones ambientales celebraron la iniciativa como "un cambio de paradigma" en la politica ambiental brasilena. El proyecto tambien incluye programas de educacion ambiental y desarrollo economico sostenible para comunidades indigenas y ribereñas.</p>
    `,
    category: "internacional",
    author: {
      name: "Gabriela Santos",
      avatar: "/images/avatars/gabriela.jpg",
      role: "Corresponsal en Latinoamerica",
    },
    publishedAt: "2026-01-28T11:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Selva amazonica",
    readingTime: 3,
    views: 31280,
    tags: ["medio-ambiente", "brasil", "amazonas", "reforestacion"],
  },

  // DEPORTIVA (8 articles)
  {
    id: "14",
    slug: "seleccion-nacional-clasificacion-mundial",
    title: "Seleccion nacional clasifica al Mundial tras victoria historica",
    excerpt: "El equipo vencio 3-1 a su rival y aseguro su pase al torneo que se celebrara en 2027.",
    content: `
      <p>En un partido inolvidable disputado en el Estadio Nacional, la seleccion de futbol aseguro su clasificacion al Mundial 2027 tras vencer 3-1 a su principal rival en las eliminatorias. Los goles de Martinez, Gomez y Rodriguez desataron la celebracion de 45,000 espectadores.</p>
      <p>El equipo dirigido por el tecnico Carlos Hernandez supo manejar la presion de un partido decisivo y desplego su mejor futbol en el segundo tiempo. La victoria no solo significa la clasificacion, sino que tambien posiciona al pais entre las 32 mejores selecciones del mundo.</p>
      <p>Las calles de la capital se llenaron de celebraciones espontaneas, mientras que el presidente felicito a los jugadores por "hacer historia y enorgullecer a toda la nacion". Esta sera la quinta participacion del pais en una Copa del Mundo.</p>
    `,
    category: "deportiva",
    author: {
      name: "Fernando Castillo",
      avatar: "/images/avatars/fernando.jpg",
      role: "Editor Deportivo",
    },
    publishedAt: "2026-02-05T22:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Celebracion de la seleccion nacional",
    readingTime: 4,
    isFeatured: true,
    views: 89450,
    tags: ["futbol", "seleccion-nacional", "mundial", "clasificacion"],
  },
  {
    id: "15",
    slug: "tennis-campeon-grand-slam-nacional",
    title: "Tenista nacional conquista su primer Grand Slam en Australia",
    excerpt: "Miguel Serrano se convierte en el primer jugador del pais en ganar un torneo de Grand Slam.",
    content: `
      <p>Miguel Serrano escribio su nombre en la historia del tenis nacional al conquistar el Abierto de Australia, su primer titulo de Grand Slam. El tenista de 26 anos vencio en la final al numero 2 del mundo en un vibrante partido que se extendio por cuatro horas.</p>
      <p>Con parciales de 7-6, 4-6, 6-3 y 7-5, Serrano desplego un tenis agresivo y demostro una fortaleza mental excepcional en los momentos cruciales. El triunfo lo catapulta al top 10 del ranking mundial por primera vez en su carrera.</p>
      <p>El presidente lo llamo para felicitarlo y anuncio que sera condecorado con la maxima distincion deportiva del pais. "Miguel ha demostrado que con talento, trabajo y dedicacion, los sueños se hacen realidad", declararon desde la federacion de tenis.</p>
    `,
    category: "deportiva",
    author: {
      name: "Lucia Moreno",
      avatar: "/images/avatars/lucia.jpg",
      role: "Periodista de Tenis",
    },
    publishedAt: "2026-02-04T06:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Miguel Serrano levantando el trofeo",
    readingTime: 3,
    views: 62180,
    tags: ["tenis", "grand-slam", "australia", "campeon"],
  },
  {
    id: "16",
    slug: "liga-nacional-torneo-apertura-jornada-5",
    title: "Jornada 5 de la Liga Nacional deja resultados sorprendentes",
    excerpt: "El lider cayo en casa y tres equipos quedan empatados en la cima de la tabla.",
    content: `
      <p>La quinta jornada del Torneo Apertura de la Liga Nacional estuvo marcada por resultados inesperados. El hasta entonces lider invicto, Atletico Capital, cayo 2-0 ante el recien ascendido Deportivo del Sur, permitiendo que tres equipos empaten en la cima con 13 puntos.</p>
      <p>Los otros grandes ganadores fueron Sporting FC, que goleo 4-1 a Union Central, y Real FC que vencio 3-2 a Olimpia en un partido dramatico decidido en el minuto 90. El goleador del torneo, Juan Pablo Torres, marco un doblete y llega a 8 goles.</p>
      <p>La siguiente jornada promete ser crucial, con el enfrentamiento directo entre Sporting FC y Real FC como plato fuerte. Los analistas coinciden en que el campeonato esta mas abierto que nunca, con seis equipos aspirando realisticamente al titulo.</p>
    `,
    category: "deportiva",
    author: {
      name: "Ricardo Sosa",
      avatar: "/images/avatars/ricardo.jpg",
      role: "Analista de Futbol",
    },
    publishedAt: "2026-02-03T20:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Accion de la Liga Nacional",
    readingTime: 3,
    views: 43290,
    tags: ["futbol", "liga-nacional", "torneo-apertura"],
  },
  {
    id: "17",
    slug: "baloncesto-equipo-femenino-clasificacion",
    title: "Equipo femenino de baloncesto clasifica a Juegos Panamericanos",
    excerpt: "Las campeonas centroamericanas aseguran su boleto tras vencer a Brasil en el preolimpico.",
    content: `
      <p>La seleccion femenina de baloncesto hizo historia al clasificar a los Juegos Panamericanos 2027 tras vencer 78-75 a Brasil en un partido de infarto disputado en Lima. Es la primera vez que el equipo femenino logra esta hazaña.</p>
      <p>La estrella del equipo, Daniela Gutierrez, fue fundamental con 28 puntos, 12 rebotes y 7 asistencias. El partido estuvo reñido hasta el final, pero la defensa nacional logro contener el ultimo ataque brasileno preservando la ventaja de tres puntos.</p>
      <p>La tecnica Maria Fernandez celebro con lagrimas el logro de sus dirigidas: "Estas jugadoras han trabajado incansablemente. Merecen este reconocimiento y van a representar al pais con orgullo". El equipo regresa manana a la capital donde se espera una multitudinaria bienvenida.</p>
    `,
    category: "deportiva",
    author: {
      name: "Carmen Delgado",
      avatar: "/images/avatars/carmen.jpg",
      role: "Corresponsal de Baloncesto",
    },
    publishedAt: "2026-02-02T23:15:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Seleccion femenina de baloncesto",
    readingTime: 3,
    views: 35720,
    tags: ["baloncesto", "seleccion-femenina", "panamericanos"],
  },
  {
    id: "18",
    slug: "ciclismo-vuelta-nacional-etapa-montana",
    title: "Ciclista local gana etapa de montana en la Vuelta Nacional",
    excerpt: "Pedro Alcantara se impuso en el ascenso al Cerro Alto y toma el liderato general.",
    content: `
      <p>El ciclista Pedro Alcantara del equipo Nacional Cycling protagonizo una actuacion memorable en la etapa reina de la Vuelta Nacional. Tras 180 kilometros que incluyeron tres puertos de montana, Alcantara ataco en los ultimos 5 kilometros de subida al Cerro Alto y se impuso en solitario.</p>
      <p>Con este triunfo, Alcantara arrebata el maillot de lider al colombiano Rodrigo Suarez, quien no pudo seguir el ritmo en la subida final. El ciclista nacional ahora tiene una ventaja de 1 minuto y 23 segundos sobre su mas cercano perseguidor.</p>
      <p>Faltan tres etapas para concluir la Vuelta, incluyendo una contrarreloj individual donde Alcantara debera defender su ventaja. De lograrlo, seria el tercer ciclista nacional en ganar la prestigiosa carrera en sus 45 años de historia.</p>
    `,
    category: "deportiva",
    author: {
      name: "Esteban Vargas",
      avatar: "/images/avatars/esteban.jpg",
      role: "Periodista de Ciclismo",
    },
    publishedAt: "2026-02-01T17:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Pedro Alcantara en la meta",
    readingTime: 3,
    views: 28540,
    tags: ["ciclismo", "vuelta-nacional", "montana"],
  },
  {
    id: "19",
    slug: "natacion-records-nacionales-campeonato",
    title: "Se rompen 5 records nacionales en el Campeonato de Natacion",
    excerpt: "La nueva generacion de nadadores deja su marca en la historia del deporte acuatico.",
    content: `
      <p>El Campeonato Nacional de Natacion celebrado en el Centro Acuatico Olimpico fue testigo de una exhibicion historica, con cinco records nacionales rotos en un solo fin de semana. Los jovenes nadadores demostraron que el futuro de la natacion nacional es prometedor.</p>
      <p>Andrea Marin, de solo 17 anos, establecio nuevos records en los 100 y 200 metros libres, mientras que Sebastian Torres hizo lo propio en los 100 metros mariposa. El relevo 4x100 mixto tambien bajo el tiempo record que resistia desde 2018.</p>
      <p>El director de la federacion de natacion celebro los logros y anuncio que varios nadadores recibiran becas completas para entrenar en centros de alto rendimiento. "Estamos viendo los frutos de la inversion en infraestructura y entrenadores de clase mundial", declaro.</p>
    `,
    category: "deportiva",
    author: {
      name: "Melissa Torres",
      avatar: "/images/avatars/melissa.jpg",
      role: "Corresponsal de Deportes Acuaticos",
    },
    publishedAt: "2026-01-31T19:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Competencia de natacion",
    readingTime: 3,
    views: 21670,
    tags: ["natacion", "records", "campeonato"],
  },
  {
    id: "20",
    slug: "beisbol-serie-nacional-semifinales",
    title: "Serie Nacional de Beisbol define a sus semifinalistas",
    excerpt: "Leones, Tigres, Aguilas y Toros disputaran las series por el titulo del campeonato.",
    content: `
      <p>La fase regular de la Serie Nacional de Beisbol concluyo con la clasificacion de los cuatro equipos que disputaran las semifinales. Leones del Norte termino como lider con 42 victorias, seguido por Tigres Metropolitanos, Aguilas del Sur y Toros del Este.</p>
      <p>Los Leones, dirigidos por el legendado manager Roberto Jimenez, cuentan con la mejor ofensiva del campeonato liderada por el bateador Carlos "El Cañon" Rodriguez, quien promedia .348 con 28 jonrones. Su pitcheo tambien ha sido solido con un efectividad colectiva de 2.89.</p>
      <p>Las semifinales comenzaran el viernes con el formato al mejor de siete juegos. El duelo entre Leones y Toros promete ser el mas parejo, mientras que los Tigres parten como favoritos ante las Aguilas segun las casas de apuestas.</p>
    `,
    category: "deportiva",
    author: {
      name: "Jorge Herrera",
      avatar: "/images/avatars/jorge.jpg",
      role: "Editor de Beisbol",
    },
    publishedAt: "2026-01-30T21:45:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Partido de beisbol",
    readingTime: 3,
    views: 39850,
    tags: ["beisbol", "serie-nacional", "playoffs"],
  },
  {
    id: "21",
    slug: "maraton-nacional-record-participacion",
    title: "Maraton Nacional registra record de 15,000 participantes",
    excerpt: "La edicion 2026 supera todas las expectativas con corredores de 30 paises.",
    content: `
      <p>La decima edicion del Maraton Nacional se llevo a cabo con exito total, registrando un record de 15,000 participantes de 30 paises. El evento, que recorrio las principales avenidas de la capital, conto con categorias para todos los niveles incluyendo 5K, 10K, media maraton y maraton completo.</p>
      <p>El keniano David Kipchoge gano la categoria masculina con un tiempo de 2:08:15, mientras que la etíope Tigist Assefa triunfo en la femenina con 2:22:30. En la rama nacional, Miguel Hernandez y Sofia Castillo se alzaron con los primeros lugares.</p>
      <p>El evento, transmitido en vivo por television, tambien sirvio para recaudar fondos para organizaciones beneficas. Se recolectaron mas de 500,000 dolares que seran destinados a programas deportivos en comunidades vulnerables. La proxima edicion ya tiene fecha: primer domingo de febrero de 2027.</p>
    `,
    category: "deportiva",
    author: {
      name: "Andrea Campos",
      avatar: "/images/avatars/andrea.jpg",
      role: "Periodista de Atletismo",
    },
    publishedAt: "2026-01-29T15:20:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Corredores del maraton",
    readingTime: 3,
    views: 27390,
    tags: ["atletismo", "maraton", "running"],
  },

  // ELECTORAL (5 articles)
  {
    id: "22",
    slug: "elecciones-municipales-inscripcion-candidatos",
    title: "Cierra inscripcion de candidatos para elecciones municipales",
    excerpt: "Un total de 847 candidatos competiran por alcaldias y concejalias en los 81 municipios del pais.",
    content: `
      <p>El Tribunal Supremo Electoral cerro el periodo de inscripcion de candidatos para las elecciones municipales que se celebraran en mayo de 2026. Un total de 847 personas aspiran a cargos de alcaldes, vicealcaldes y concejales en los 81 municipios del pais.</p>
      <p>De los candidatos inscritos, 312 son mujeres, representando el 36% del total, un incremento significativo respecto a elecciones anteriores. Los partidos politicos presentaron candidatos en todos los municipios, mientras que 78 candidatos independientes tambien entraron en la contienda.</p>
      <p>El presidente del TSE, magistrado Roberto Salazar, enfatizo que "la democracia se fortalece cuando hay competencia y participacion ciudadana. Estas elecciones seran las mas transparentes de nuestra historia gracias a las nuevas tecnologias de votacion".</p>
    `,
    category: "electoral",
    author: {
      name: "Alejandro Paz",
      avatar: "/images/avatars/alejandro.jpg",
      role: "Corresponsal Electoral",
    },
    publishedAt: "2026-02-05T16:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Tribunal Supremo Electoral",
    readingTime: 3,
    isFeatured: true,
    views: 33420,
    tags: ["elecciones", "municipales", "candidatos", "tse"],
  },
  {
    id: "23",
    slug: "debate-presidencial-economia-educacion",
    title: "Debate presidencial se centra en economia y educacion",
    excerpt: "Los cinco candidatos exponen sus propuestas en el primer debate televisado ante 8 millones de espectadores.",
    content: `
      <p>El primer debate presidencial de cara a las elecciones generales de 2026 se llevo a cabo ante una audiencia de 8 millones de televidentes. Los cinco candidatos con mayor intencion de voto debatieron durante tres horas sobre economia, educacion, seguridad y salud.</p>
      <p>La candidata de centro-izquierda, Martha Gonzalez, propuso un aumento del 60% en el presupuesto educativo, mientras que el candidato de centro-derecha, Ricardo Montes, enfatizo reducciones fiscales para estimular el empleo. Los temas de corrupcion y transparencia tambien generaron intercambios intensos.</p>
      <p>Encuestas flash realizadas tras el debate muestran que el 32% de los espectadores considero a Gonzalez como ganadora, seguida por Montes con 28%. El proximo debate esta programado para el 20 de febrero y se enfocara en politica exterior y medio ambiente.</p>
    `,
    category: "electoral",
    author: {
      name: "Veronica Ruiz",
      avatar: "/images/avatars/veronica.jpg",
      role: "Analista Politica",
    },
    publishedAt: "2026-02-03T22:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Debate presidencial",
    readingTime: 4,
    views: 56780,
    tags: ["elecciones", "debate", "candidatos", "presidencial"],
  },
  {
    id: "24",
    slug: "encuesta-elecciones-tendencias-febrero",
    title: "Nueva encuesta muestra empate tecnico entre dos candidatos presidenciales",
    excerpt: "Los sondeos indican una carrera reñida con 45% de electores aun indecisos.",
    content: `
      <p>La mas reciente encuesta de intencion de voto publicada por el Instituto Nacional de Estadisticas muestra un empate tecnico entre los candidatos presidenciales Martha Gonzalez y Ricardo Montes, con 23% y 22% respectivamente. El margen de error de 2.5% hace imposible determinar un lider claro.</p>
      <p>El dato mas significativo es que el 45% de los electores encuestados se declara indeciso o no revela su preferencia, lo que sugiere que la campana esta abierta y cualquier candidato puede cambiar su posicion. Los candidatos menores se ubican entre 5% y 8% de intencion de voto.</p>
      <p>Los analistas coinciden en que los debates televisados y las propuestas de gobierno seran determinantes para convencer a los indecisos. La encuesta tambien revela que los temas prioritarios para los votantes son el empleo (34%), la seguridad (28%) y la educacion (22%).</p>
    `,
    category: "electoral",
    author: {
      name: "Daniel Ortega",
      avatar: "/images/avatars/daniel.jpg",
      role: "Analista de Encuestas",
    },
    publishedAt: "2026-02-01T10:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Graficos de encuestas",
    readingTime: 3,
    views: 41230,
    tags: ["encuestas", "elecciones", "sondeos", "candidatos"],
  },
  {
    id: "25",
    slug: "reforma-electoral-aprobacion-congreso",
    title: "Congreso aprueba reforma electoral con voto electronico",
    excerpt: "La nueva ley moderniza el sistema electoral e incluye transmision en tiempo real de resultados.",
    content: `
      <p>El Congreso Nacional aprobo una reforma integral al codigo electoral que introduce el voto electronico en todos los centros de votacion del pais. La medida, aprobada con 78 votos a favor, entrara en vigencia para las elecciones presidenciales de noviembre de 2026.</p>
      <p>La reforma incluye la transmision en tiempo real de resultados, sistemas de verificacion biometrica para evitar fraudes, y la reduccion del periodo de campana electoral de 90 a 60 dias. Tambien establece limites mas estrictos al financiamiento privado de campanas.</p>
      <p>El Tribunal Supremo Electoral iniciara un programa de capacitacion para los 30,000 miembros de juntas receptoras de votos. Se instalaran 8,500 maquinas de votacion electronica en todo el territorio nacional, con el apoyo tecnico de una empresa internacional especializada.</p>
    `,
    category: "electoral",
    author: {
      name: "Mariana Campos",
      avatar: "/images/avatars/mariana.jpg",
      role: "Editora de Politica",
    },
    publishedAt: "2026-01-30T14:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Sistema de voto electronico",
    readingTime: 3,
    views: 29870,
    tags: ["reforma", "electoral", "voto-electronico", "modernizacion"],
  },
  {
    id: "26",
    slug: "partidos-politicos-alianzas-estrategicas",
    title: "Partidos minoritarios anuncian alianzas de cara a elecciones legislativas",
    excerpt: "Tres partidos de centro forman coalicion para competir por escanos en el Congreso.",
    content: `
      <p>Tres partidos politicos de centro anunciaron la formacion de una coalicion electoral para competir por escanos en el Congreso Nacional en las elecciones de noviembre. La Alianza Democratica, el Partido del Progreso y Accion Ciudadana uniran fuerzas presentando candidatos unicos en 15 circunscripciones.</p>
      <p>Los lideres de los tres partidos firmaron el pacto en una ceremonia publica, comprometiendose a impulsar una agenda legislativa centrada en transparencia, educacion y desarrollo economico. Segun las encuestas, la coalicion podria obtener entre 18 y 22 de los 84 escanos en disputa.</p>
      <p>La estrategia busca evitar la fragmentacion del voto de centro y constituir un bloque legislativo capaz de influir en la conformacion de mayorias. Otras alianzas entre partidos de izquierda y derecha tambien estan en negociacion, segun fuentes cercanas a las dirigencias partidarias.</p>
    `,
    category: "electoral",
    author: {
      name: "Guillermo Rivas",
      avatar: "/images/avatars/guillermo.jpg",
      role: "Corresponsal Legislativo",
    },
    publishedAt: "2026-01-28T12:15:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Lideres de partidos politicos",
    readingTime: 3,
    views: 24560,
    tags: ["partidos", "alianzas", "elecciones", "legislativo"],
  },

  // POPURRI (3 articles)
  {
    id: "27",
    slug: "festival-musica-caribbean-sounds",
    title: "Festival Caribbean Sounds reunira a 50 artistas internacionales",
    excerpt: "El evento musical mas grande del año se celebrara en marzo con tres dias de conciertos.",
    content: `
      <p>El Festival Caribbean Sounds regresa en su quinta edicion con un cartel espectacular que incluye a 50 artistas de reggae, salsa, merengue y musica tropical. El evento se llevara a cabo del 15 al 17 de marzo en el Parque Central de la capital, con capacidad para 80,000 personas diarias.</p>
      <p>Entre los artistas confirmados destacan el legendario salsero Willie Colon, la banda de reggae jamaiquina Third World, y la sensacion del momento Bad Bunny. Tambien se presentaran talentos locales en escenarios alternos dedicados a promover la musica nacional.</p>
      <p>Los boletos salieron a la venta hoy y ya se han vendido el 60% para el dia que se presentara Bad Bunny. Los organizadores prometen "una experiencia musical inolvidable con la mejor produccion tecnica y gastronomia caribeña". Habra transporte gratuito desde 15 puntos de la ciudad.</p>
    `,
    category: "popurri",
    author: {
      name: "Isabella Morales",
      avatar: "/images/avatars/isabella.jpg",
      role: "Editora de Entretenimiento",
    },
    publishedAt: "2026-02-04T11:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Festival de musica",
    readingTime: 3,
    views: 34890,
    tags: ["musica", "festival", "entretenimiento", "conciertos"],
  },
  {
    id: "28",
    slug: "cine-nacional-premios-internacionales",
    title: "Pelicula nacional gana tres premios en Festival de Cine Latinoamericano",
    excerpt: "El Ultimo Verano triunfa en las categorias de Mejor Pelicula, Director y Actriz.",
    content: `
      <p>La pelicula nacional "El Ultimo Verano" del director Miguel Angel Soto se llevo tres de los principales premios del Festival Internacional de Cine Latinoamericano celebrado en Buenos Aires. La cinta gano en las categorias de Mejor Pelicula, Mejor Director y Mejor Actriz.</p>
      <p>El film, que narra la historia de una familia rural enfrentando la migracion forzada, ha sido elogiado por su cinematografia y actuaciones. La actriz protagonista, Elena Martinez, dedico el premio "a todas las mujeres del campo que luchan por sus familias y sus tierras".</p>
      <p>Este exito internacional abre las puertas para que "El Ultimo Verano" sea la propuesta del pais para competir en la categoria de Mejor Pelicula Internacional de los premios Oscar. La pelicula se estrenara en salas comerciales nacionales el 1 de marzo.</p>
    `,
    category: "popurri",
    author: {
      name: "Rodrigo Pena",
      avatar: "/images/avatars/rodrigo.jpg",
      role: "Critico de Cine",
    },
    publishedAt: "2026-02-02T15:45:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Premios de cine",
    readingTime: 3,
    views: 26710,
    tags: ["cine", "premios", "cultura", "latinoamerica"],
  },
  {
    id: "29",
    slug: "gastronomia-chef-nacional-estrella-michelin",
    title: "Chef nacional obtiene primera estrella Michelin para restaurante local",
    excerpt: "El restaurante Raices se convierte en el primero del pais en recibir la prestigiosa distincion.",
    content: `
      <p>El restaurante Raices, del chef Diego Alvarez, hizo historia al convertirse en el primer establecimiento gastronomico del pais en recibir una estrella Michelin. El reconocimiento fue anunciado en la gala anual de la Guia Michelin celebrada en Madrid.</p>
      <p>Raices, especializado en cocina de autor con ingredientes autoctonos, ha desarrollado un menu que fusiona tecnicas culinarias modernas con sabores tradicionales. Platillos como el "Ceviche de Montaña" y el "Cordero con Mole de Cacao" han cautivado a los inspectores de Michelin.</p>
      <p>El chef Alvarez, emocionado, declaro que "este premio no es solo mio, es de toda mi brigada y de los productores locales que nos proveen ingredientes extraordinarios. Estamos poniendo nuestra gastronomia en el mapa mundial". Las reservaciones para los proximos tres meses ya estan agotadas.</p>
    `,
    category: "popurri",
    author: {
      name: "Valentina Cruz",
      avatar: "/images/avatars/valentina.jpg",
      role: "Periodista de Gastronomia",
    },
    publishedAt: "2026-01-31T18:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Plato gourmet",
    readingTime: 3,
    views: 31450,
    tags: ["gastronomia", "michelin", "chef", "restaurante"],
  },

  // NO SOMOS NADA (3 articles)
  {
    id: "30",
    slug: "loro-testigo-caso-policial",
    title: "Loro ayuda a resolver caso policial al repetir conversaciones del sospechoso",
    excerpt: "El ave repitio frases clave que permitieron a los investigadores esclarecer un robo.",
    content: `
      <p>En un caso sin precedentes en la historia criminal del pais, un loro se convirtio en pieza clave para resolver un robo a una joyeria. El ave, propiedad del principal sospechoso, repetia constantemente frases como "esconde las joyas en el garaje" y "el sabado a medianoche".</p>
      <p>La policia, tras recibir el testimonio de vecinos sobre el peculiar comportamiento del loro, solicito una orden judicial para confiscar temporalmente al animal. Los investigadores grabaron al ave durante dos dias y lograron recopilar suficiente informacion para realizar un cateo.</p>
      <p>El registro en el domicilio del sospechoso permitio recuperar joyas valoradas en 200,000 dolares escondidas exactamente donde el loro habia indicado. El detenido confeso haber cometido el robo. Aunque el testimonio del loro no es admisible en corte, las joyas recuperadas constituyen evidencia contundente.</p>
    `,
    category: "no-somos-nada",
    author: {
      name: "Pablo Navarro",
      avatar: "/images/avatars/pablo.jpg",
      role: "Editor de Noticias Curiosas",
    },
    publishedAt: "2026-02-05T13:20:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Loro multicolor",
    readingTime: 3,
    views: 67890,
    tags: ["insolito", "policia", "animales", "curiosidades"],
  },
  {
    id: "31",
    slug: "pizza-gigante-record-guinness",
    title: "Pizzeria local rompe record Guinness con pizza de 50 metros de diametro",
    excerpt: "Se necesitaron 200 kilos de queso y 12 horas de coccion para la pizza mas grande del mundo.",
    content: `
      <p>La pizzeria "Napolitano" entro al Libro Guinness de los Records al crear la pizza mas grande del mundo, con un diametro de 50 metros y un peso de 2.5 toneladas. El evento se llevo a cabo en la plaza principal de la capital ante 15,000 espectadores.</p>
      <p>Para la elaboracion de la pizza se utilizaron 800 kilos de harina, 200 kilos de queso mozzarella, 150 kilos de salsa de tomate y 100 kilos de pepperoni. Un equipo de 50 pizzeros trabajo durante 12 horas en hornos especiales diseñados exclusivamente para este reto.</p>
      <p>El representante del Libro Guinness certifico el record y entrego el diploma oficial al propietario de la pizzeria, Giuseppe Marinelli. La pizza fue posteriormente cortada en 10,000 porciones que se distribuyeron gratuitamente al publico. Las ganancias de un evento paralelo fueron donadas a comedores comunitarios.</p>
    `,
    category: "no-somos-nada",
    author: {
      name: "Natalia Vega",
      avatar: "/images/avatars/natalia.jpg",
      role: "Reportera de Entretenimiento",
    },
    publishedAt: "2026-02-01T14:00:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Pizza gigante",
    readingTime: 3,
    views: 54320,
    tags: ["record", "guinness", "comida", "insolito"],
  },
  {
    id: "32",
    slug: "alcalde-redes-sociales-viral",
    title: "Alcalde se vuelve viral por bailar en TikTok durante inauguracion oficial",
    excerpt: "El video del burgomaestre bailando 'La Macarena' acumula 5 millones de reproducciones.",
    content: `
      <p>El alcalde de Villa Central, Don Roberto Fernandez de 68 anos, se convirtio en sensacion viral en TikTok tras ser grabado bailando 'La Macarena' durante la inauguracion de un parque recreativo. El video, publicado por un asistente, ya supera los 5 millones de reproducciones.</p>
      <p>El burgomaestre, conocido por su seriedad, sorprendio a todos cuando, en medio del evento oficial, se unio a un grupo de ninos que bailaban la famosa cancion. Con movimientos torpes pero entusiastas, Fernandez completo la coreografia completa ante la algarabia del publico.</p>
      <p>Lejos de molestarse por la viralidad, el alcalde aprovecho el momento para promover las nuevas instalaciones recreativas del municipio. "Si bailar me ayuda a conectar con la gente, bailare mas seguido", declaro entre risas. Ahora sus asesores consideran crear una cuenta oficial de TikTok para la alcaldia.</p>
    `,
    category: "no-somos-nada",
    author: {
      name: "Camila Rojas",
      avatar: "/images/avatars/camila.jpg",
      role: "Reportera de Redes Sociales",
    },
    publishedAt: "2026-01-29T16:30:00Z",
    imageUrl: "/images/placeholder-hero.jpg",
    imageAlt: "Alcalde bailando",
    readingTime: 2,
    views: 72450,
    tags: ["viral", "tiktok", "alcalde", "insolito"],
  },
];

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Get all articles for a specific category
 */
export function getArticlesByCategory(category: CategorySlug): Article[] {
  return articles.filter((article) => article.category === category);
}

/**
 * Get all featured articles
 */
export function getFeaturedArticles(): Article[] {
  return articles.filter((article) => article.isFeatured === true);
}

/**
 * Get most read articles sorted by views
 */
export function getMostReadArticles(limit: number = 10): Article[] {
  return [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

/**
 * Get latest articles sorted by publication date
 */
export function getLatestArticles(limit: number = 10): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

/**
 * Get related articles from the same category, excluding the current article
 */
export function getRelatedArticles(article: Article, limit: number = 3): Article[] {
  return articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, limit);
}

/**
 * Get all breaking news articles
 */
export function getBreakingNews(): Article[] {
  return articles.filter((article) => article.isBreaking === true);
}
