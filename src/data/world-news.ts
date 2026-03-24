import type { WorldNewsArticle } from "@/lib/worldnews-api";

export const worldNewsMock: WorldNewsArticle[] = [
  {
    id: "wn-mock-001",
    slug: "wn-mock-001",
    title: "ONU advierte que crisis alimentaria en América Latina afectará a 8 millones de personas en 2026",
    excerpt:
      "El informe de la FAO revela que Chile enfrenta presiones inflacionarias en alimentos básicos, con alzas de hasta un 12% en canasta familiar de sectores vulnerables...",
    content:
      "El informe de la FAO revela que Chile enfrenta presiones inflacionarias en alimentos básicos, con alzas de hasta un 12% en canasta familiar de sectores vulnerables. La crisis se atribuye a fenómenos climáticos extremos y conflictos regionales que interrumpen cadenas de suministro. Organismos internacionales instan a los gobiernos latinoamericanos a reforzar redes de apoyo social y a diversificar fuentes de abastecimiento. Chile anunció medidas de emergencia para proteger a las familias más expuestas al alza de precios.",
    category: "internacional",
    author: {
      name: "Redacción Internacional",
      avatar: "/images/avatars/default.jpg",
      role: "Corresponsal",
    },
    publishedAt: "2026-03-20T10:00:00Z",
    imageUrl: "https://placehold.co/800x450/1a1a1a/ffffff?text=SPNG",
    imageAlt: "ONU crisis alimentaria América Latina",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 0,
    tags: ["internacional", "mundo"],
    externalUrl: "https://www.un.org/es/food-crisis-latam-2026",
  },
  {
    id: "wn-mock-002",
    slug: "wn-mock-002",
    title: "Cumbre climática europea alcanza acuerdo para reducir emisiones de carbono en 55% antes de 2030",
    excerpt:
      "Los 27 países miembros de la Unión Europea firmaron un histórico acuerdo de reducción de emisiones que impactará directamente en las exportaciones chilenas de productos agrícolas...",
    content:
      "Los 27 países miembros de la Unión Europea firmaron un histórico acuerdo de reducción de emisiones que impactará directamente en las exportaciones chilenas de productos agrícolas. El pacto incluye nuevos aranceles de carbono en frontera que afectan a países exportadores de alto consumo energético. Chile, con su industria del cobre y de la celulosa, deberá acelerar su transición hacia energías renovables para mantenerse competitivo en el mercado europeo.",
    category: "internacional",
    author: {
      name: "Agencia EFE",
      avatar: "/images/avatars/default.jpg",
      role: "Corresponsal",
    },
    publishedAt: "2026-03-19T14:30:00Z",
    imageUrl: "https://placehold.co/800x450/1a1a1a/ffffff?text=SPNG",
    imageAlt: "Cumbre climática europea",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 0,
    tags: ["internacional", "mundo"],
    externalUrl: "https://www.europarl.europa.eu/clima-acuerdo-2030",
  },
  {
    id: "wn-mock-003",
    slug: "wn-mock-003",
    title: "Tabilo avanza a cuartos de final en Miami Open tras demoler al número 5 del mundo",
    excerpt:
      "El tenista chileno Alejandro Tabilo protagonizó una actuación brillante en el Hard Rock Stadium y se instala entre los ocho mejores del torneo Masters 1000 en Miami...",
    content:
      "El tenista chileno Alejandro Tabilo protagonizó una actuación brillante en el Hard Rock Stadium y se instala entre los ocho mejores del torneo Masters 1000 en Miami. Con un marcador de 6-3, 7-5 sobre el cabeza de serie número 5, Tabilo demostró un nivel de tenis de primer orden que lo tiene como uno de los favoritos para llegar a la final. Es la mejor actuación del tenista chileno en un Masters 1000 durante la temporada 2026.",
    category: "deportiva",
    author: {
      name: "Redacción Deportes",
      avatar: "/images/avatars/default.jpg",
      role: "Corresponsal",
    },
    publishedAt: "2026-03-21T22:00:00Z",
    imageUrl: "https://placehold.co/800x450/1a1a1a/ffffff?text=SPNG",
    imageAlt: "Alejandro Tabilo en Miami Open",
    readingTime: 2,
    isFeatured: false,
    isBreaking: false,
    views: 0,
    tags: ["internacional", "mundo"],
    externalUrl: "https://www.atptour.com/es/news/tabilo-miami-2026",
  },
  {
    id: "wn-mock-004",
    slug: "wn-mock-004",
    title: "Tensiones comerciales entre EE.UU. y China amenazan exportaciones chilenas de cobre en 2026",
    excerpt:
      "Analistas advierten que la nueva ronda de aranceles cruzados entre las dos principales economías del mundo podría reducir la demanda de cobre en un 8%, golpeando directamente el presupuesto fiscal chileno...",
    content:
      "Analistas advierten que la nueva ronda de aranceles cruzados entre las dos principales economías del mundo podría reducir la demanda de cobre en un 8%, golpeando directamente el presupuesto fiscal chileno. La Corporación del Cobre ya monitorea el escenario y evalúa ajustes en sus proyecciones de ingresos para el segundo semestre. El Ministerio de Hacienda indicó que existen reservas suficientes para sostener el gasto social comprometido sin necesidad de ajustes presupuestarios en el corto plazo.",
    category: "nacional",
    author: {
      name: "Reuters América Latina",
      avatar: "/images/avatars/default.jpg",
      role: "Corresponsal",
    },
    publishedAt: "2026-03-18T09:00:00Z",
    imageUrl: "https://placehold.co/800x450/1a1a1a/ffffff?text=SPNG",
    imageAlt: "Exportaciones chilenas de cobre",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 0,
    tags: ["internacional", "mundo"],
    externalUrl: "https://www.reuters.com/world/americas/chile-copper-trade-war-2026",
  },
  {
    id: "wn-mock-005",
    slug: "wn-mock-005",
    title: "Festival de Viña del Mar se convierte en fenómeno viral global: más de 50 millones de vistas en TikTok",
    excerpt:
      "Las actuaciones del Festival Internacional de la Canción de Viña del Mar 2026 rompieron récords en redes sociales, posicionando a Chile en el mapa cultural mundial con tendencia en 30 países...",
    content:
      "Las actuaciones del Festival Internacional de la Canción de Viña del Mar 2026 rompieron récords en redes sociales, posicionando a Chile en el mapa cultural mundial con tendencia en 30 países. El fenómeno impulsó la búsqueda de destinos turísticos en Chile en un 340% en plataformas internacionales. Aerolíneas europeas y norteamericanas reportan un aumento del 25% en reservas hacia el país, motivadas en parte por la visibilidad del festival en medios digitales.",
    category: "popurri",
    author: {
      name: "Redacción Cultura",
      avatar: "/images/avatars/default.jpg",
      role: "Corresponsal",
    },
    publishedAt: "2026-03-17T16:00:00Z",
    imageUrl: "https://placehold.co/800x450/1a1a1a/ffffff?text=SPNG",
    imageAlt: "Festival de Viña del Mar viral",
    readingTime: 2,
    isFeatured: false,
    isBreaking: false,
    views: 0,
    tags: ["internacional", "mundo"],
    externalUrl: "https://www.bbc.com/mundo/noticias/vina-del-mar-viral-2026",
  },
];
