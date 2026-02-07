/**
 * Seed script with REAL Chilean news (February 7, 2026)
 *
 * Run with: npx tsx src/sanity/seed-real.ts
 *
 * This replaces mock data with current Chilean news sourced from
 * Cooperativa.cl, Emol.com, and other national media RSS feeds.
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

// Helper: create Portable Text blocks from paragraphs
function toBlocks(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block" as const,
    _key: `block-${i}`,
    style: "normal" as const,
    children: [{ _type: "span" as const, _key: `span-${i}`, text }],
  }));
}

// Categories (same as existing)
const categories = [
  { slug: "nacional", name: "Nacional", description: "Noticias de Chile, politica y sociedad", color: "#2563eb" },
  { slug: "internacional", name: "Internacional", description: "Noticias del mundo y asuntos globales", color: "#7c3aed" },
  { slug: "deportiva", name: "Deportiva", description: "Lo mejor del deporte nacional e internacional", color: "#16a34a" },
  { slug: "electoral", name: "Electoral", description: "Elecciones, partidos politicos y campanas", color: "#dc2626" },
  { slug: "popurri", name: "Popurri", description: "Entretenimiento, cultura y variedad", color: "#ea580c" },
  { slug: "no-somos-nada", name: "No Somos Nada", description: "Las noticias mas curiosas e increibles", color: "#ec4899" },
];

// Authors (Chilean journalists)
const authors = [
  { name: "Equipo SPNG", role: "Redaccion" },
  { name: "Carolina Mendez", role: "Editora Nacional" },
  { name: "Felipe Araya", role: "Corresponsal Politico" },
  { name: "Javiera Soto", role: "Periodista Internacional" },
  { name: "Rodrigo Valenzuela", role: "Editor Deportivo" },
  { name: "Camila Fuentes", role: "Periodista Cultural" },
  { name: "Andres Reyes", role: "Corresponsal Santiago" },
  { name: "Paula Contreras", role: "Editora Electoral" },
  { name: "Diego Munoz", role: "Periodista Policial" },
  { name: "Valentina Rojas", role: "Corresponsal Internacional" },
];

interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  isFeatured: boolean;
  isBreaking: boolean;
  views: number;
  tags: string[];
}

// =====================================================================
// REAL ARTICLES - February 7, 2026
// =====================================================================

const realArticles: ArticleData[] = [
  // --- NACIONAL ---
  {
    slug: "kast-anuncia-subsecretarios-delegados-gobierno-emergencia",
    title: "Con foco en seguridad y empleo, Kast anuncio a sus subsecretarios y delegados regionales",
    excerpt: "El presidente electo presento a la 'segunda linea' de su gabinete en el hotel Radisson Blu de Las Condes, con enfasis en un 'gobierno de emergencia'.",
    content: [
      "El presidente electo Jose Antonio Kast presento este viernes a sus subsecretarios y delegados regionales en una ceremonia realizada en el hotel Radisson Blu de Las Condes. La jornada estuvo marcada por un discurso centrado en los desafios inmediatos que enfrentara su administracion.",
      "\"Tenemos desafios inmediatos en materia de seguridad, salud y empleo\", enfatizo Kast durante la presentacion, donde destaco que su gobierno se enfocara en un modelo de \"emergencia\" para abordar las prioridades mas urgentes del pais.",
      "Entre los nombramientos destaca el de Andres Otero como subsecretario de Deportes, quien retomara la cartera que ocupo durante el segundo gobierno de Sebastian Pinera. Otero, actual gerente general de la Fetech, trae experiencia previa en el cargo.",
      "El mandatario electo tambien anuncio que evalua nombrar un comisionado especial para la macrozona norte, con el objetivo de supervisar la implementacion del Plan Escudo Fronterizo, una de las promesas centrales de su campana en materia de seguridad y migracion.",
      "La conformacion del equipo ministerial ha sido descrita como transversal, con figuras provenientes de distintos sectores de la coalicion de gobierno, buscando dar senales de colaboracion mas alla de las lineas partidarias.",
    ],
    category: "nacional",
    author: "Felipe Araya",
    publishedAt: "2026-02-07T09:53:00Z",
    readingTime: 4,
    isFeatured: true,
    isBreaking: true,
    views: 15420,
    tags: ["kast", "gobierno", "subsecretarios", "chile", "politica"],
  },
  {
    slug: "minsal-retira-choritos-antartic-contaminacion-botulismo",
    title: "Minsal ordeno el retiro de choritos en conserva Antartic por riesgo de botulismo",
    excerpt: "La alerta sanitaria afecta al lote L 23 12 25 con vencimiento en diciembre de 2029, por posible contaminacion con Clostridium botulinum.",
    content: [
      "El Ministerio de Salud ordeno el retiro inmediato de choritos en conserva marca Antartic despues de detectar un riesgo potencial de contaminacion con la bacteria Clostridium botulinum, causante del botulismo.",
      "La alerta afecta especificamente al lote L 23 12 25, con fecha de vencimiento en diciembre de 2029. Las autoridades sanitarias hicieron un llamado a la poblacion a no consumir el producto y devolverlo en el punto de compra.",
      "El botulismo es una enfermedad grave causada por toxinas producidas por la bacteria Clostridium botulinum. Los sintomas pueden aparecer entre 12 y 36 horas despues del consumo e incluyen vision borrosa, dificultad para tragar, debilidad muscular y en casos graves, paralisis respiratoria.",
      "La Seremi de Salud esta realizando fiscalizaciones en los puntos de venta para asegurar el retiro efectivo del producto. Se recomienda a quienes presenten sintomas tras el consumo acudir de inmediato a un servicio de urgencia.",
    ],
    category: "nacional",
    author: "Carolina Mendez",
    publishedAt: "2026-02-07T10:48:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 8340,
    tags: ["salud", "alerta-sanitaria", "botulismo", "minsal"],
  },
  {
    slug: "cinco-incendios-forestales-activos-maule-mas-afectada",
    title: "Cinco incendios forestales estan en combate: la region del Maule es la mas afectada",
    excerpt: "El mayor foco se registra en Parral, donde el incendio 'El Bosque' ha consumido 197 hectareas mientras se mantiene la alerta por calor extremo.",
    content: [
      "La Corporacion Nacional Forestal (Conaf) informo que cinco incendios forestales se encuentran activos este viernes en la zona centro-sur del pais, siendo la region del Maule la mas afectada con el siniestro de mayor extension.",
      "El incendio denominado 'El Bosque', ubicado en la comuna de Parral, ha consumido hasta el momento 197 hectareas de vegetacion. Brigadas terrestres y aereas trabajan en el combate del fuego, que se ha visto agravado por las altas temperaturas y los vientos.",
      "Las autoridades mantienen una alerta por calor extremo que se extendera hasta el sabado, lo que podria complicar aun mas las labores de extincion. La Direccion Meteorologica ha pronosticado temperaturas superiores a los 35 grados en varias comunas de la zona central.",
      "Conaf hizo un llamado a la ciudadania a extremar las precauciones y evitar actividades que puedan generar focos de incendio, recordando que la mayoria de los siniestros forestales en Chile tienen origen humano.",
      "Paralelamente, la Senapred identifico cuatro viviendas de emergencia mal instaladas en la region del Biobio y ordeno acciones correctivas. Las autoridades condenaron a quienes han intentado obtener beneficios fraudulentos de los subsidios por emergencia.",
    ],
    category: "nacional",
    author: "Andres Reyes",
    publishedAt: "2026-02-07T10:26:00Z",
    readingTime: 4,
    isFeatured: false,
    isBreaking: true,
    views: 12100,
    tags: ["incendios", "maule", "conaf", "emergencia", "calor"],
  },
  {
    slug: "pdi-allana-bodega-meiggs-medicamentos-chinos",
    title: "PDI allano bodega en barrio Meiggs: incauto medicamentos rotulados en chino",
    excerpt: "Tras una denuncia del Colegio de Quimicos, la PDI descubrio una bodega con medicamentos de procedencia dudosa en el populoso barrio comercial de Santiago.",
    content: [
      "La Policia de Investigaciones (PDI) realizo un operativo en el barrio Meiggs, en pleno centro de Santiago, donde allano una bodega que almacenaba medicamentos rotulados en chino mandarin sin autorizacion sanitaria.",
      "El procedimiento se origino tras una denuncia formal del Colegio de Quimicos Farmaceuticos de Chile, que alertara sobre la venta ilegal de productos farmaceuticos en el sector.",
      "Entre los productos incautados se encontraron cajas de medicamentos con etiquetado exclusivamente en idioma chino, sin registro sanitario del Instituto de Salud Publica (ISP) ni indicaciones en espanol, lo que constituye un grave riesgo para la salud publica.",
      "Las autoridades abrieron una investigacion para determinar la cadena de distribucion de estos productos y si estan vinculados a redes de comercio ilegal mas amplias que operan en el sector.",
    ],
    category: "nacional",
    author: "Diego Munoz",
    publishedAt: "2026-02-06T18:30:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 6780,
    tags: ["pdi", "meiggs", "medicamentos", "salud-publica", "santiago"],
  },
  {
    slug: "justicia-reanuda-formalizacion-diputado-calisto-fraude",
    title: "Justicia ordeno que se reanude la formalizacion del diputado Calisto por fraude",
    excerpt: "La Corte de Apelaciones de Coyhaique dispuso la reanudacion del proceso contra el parlamentario por presunto fraude fiscal de mas de 100 millones de pesos.",
    content: [
      "La Corte de Apelaciones de Coyhaique ordeno la reanudacion de la formalizacion del diputado Miguel Angel Calisto por un presunto delito de fraude fiscal que involucra mas de 100 millones de pesos en asignaciones parlamentarias no declaradas.",
      "Segun la investigacion, las irregularidades se habrian cometido entre 2018 y 2022, periodo en el que el legislador habria omitido la rendicion de honorarios por concepto de asesorias parlamentarias.",
      "La defensa del diputado habia logrado en instancias previas suspender el proceso de formalizacion, pero la Corte de Apelaciones determino que existen suficientes antecedentes para proseguir con la investigacion.",
      "El caso se suma a una serie de investigaciones por mal uso de recursos publicos que han afectado a parlamentarios de distintos sectores politicos en los ultimos anos, generando un debate sobre la transparencia en el uso de las asignaciones congresales.",
    ],
    category: "nacional",
    author: "Felipe Araya",
    publishedAt: "2026-02-07T11:33:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 9200,
    tags: ["calisto", "fraude", "congreso", "justicia", "corrupcion"],
  },
  {
    slug: "atropello-huechuraba-dos-fallecidos-conductor-ebrio",
    title: "Dos personas murieron tras ser atropelladas por conductor en estado de ebriedad en Huechuraba",
    excerpt: "Un conductor en estado de ebriedad provoco un atropello fatal que dejo dos victimas mortales en la comuna de Huechuraba.",
    content: [
      "Dos personas perdieron la vida la madrugada de este viernes tras ser atropelladas por un conductor en evidente estado de ebriedad en la comuna de Huechuraba, al norte de Santiago.",
      "Segun el parte policial, el vehiculo impacto a las victimas cuando estas se encontraban en la calzada. El conductor intento darse a la fuga pero fue detenido metros mas adelante por testigos y posteriormente por Carabineros.",
      "Las victimas fueron identificadas por el Servicio Medico Legal y sus familias ya fueron notificadas. El conductor fue sometido a un examen de alcoholemia que arrojo resultados positivos.",
      "La fiscalia ordeno la detencion del imputado, quien sera formalizado por dos cargos de homicidio y conduccion en estado de ebriedad. Este caso se suma a la preocupante cifra de siniestros viales relacionados con alcohol que se han registrado este verano.",
    ],
    category: "nacional",
    author: "Diego Munoz",
    publishedAt: "2026-02-07T08:15:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 11200,
    tags: ["huechuraba", "atropello", "ebriedad", "seguridad-vial"],
  },

  // --- INTERNACIONAL ---
  {
    slug: "hamas-acusa-israel-socavar-alto-fuego-500-muertos",
    title: "Hamas acusa a Israel de socavar el acuerdo de alto al fuego: mas de 500 muertos desde la tregua",
    excerpt: "El vocero de Hamas denuncio que las operaciones militares israelies 'continuan matando y destruyendo' pese al cese de hostilidades acordado.",
    content: [
      "El movimiento Hamas acuso este viernes a Israel de socavar el acuerdo de alto al fuego alcanzado en octubre, denunciando que las operaciones militares en la Franja de Gaza no se han detenido pese al cese de hostilidades pactado.",
      "Segun el vocero del grupo, mas de 500 palestinos han muerto desde que la tregua entro en vigor, lo que a su juicio demuestra que Israel no esta cumpliendo con los terminos del acuerdo.",
      "El Ministerio de Salud de Gaza elevo a mas de 72.000 el numero total de muertos desde el inicio de la ofensiva israelí en octubre de 2023, una cifra que incluye a miles de menores y mujeres.",
      "La comunidad internacional ha intensificado los llamados a ambas partes para que respeten los terminos del alto al fuego. Organizaciones humanitarias advierten que la situacion en Gaza sigue siendo critica, con hospitales funcionando al limite y escasez de suministros basicos.",
      "Varios paises mediadores, entre ellos Egipto y Qatar, han expresado su preocupacion por las denuncias y han convocado a reuniones urgentes para evaluar el cumplimiento del acuerdo.",
    ],
    category: "internacional",
    author: "Javiera Soto",
    publishedAt: "2026-02-07T15:50:00Z",
    readingTime: 4,
    isFeatured: true,
    isBreaking: true,
    views: 18500,
    tags: ["gaza", "israel", "hamas", "alto-al-fuego", "medio-oriente"],
  },
  {
    slug: "haiti-cierra-escuelas-vacio-poder-pandillas",
    title: "Cierran escuelas en Haiti por temor a vacio de poder: pandillas controlan 90% de la capital",
    excerpt: "Instituciones educativas y comercios cerraron sus puertas en Puerto Principe ante el fin del mandato del consejo de transicion.",
    content: [
      "Las escuelas y comercios de Puerto Principe, capital de Haiti, cerraron sus puertas este viernes ante los temores de un vacio de poder tras el vencimiento del mandato del consejo de transicion que gobernaba el pais.",
      "Grupos armados controlan aproximadamente el 90% de la capital haitiana, lo que ha generado una crisis de seguridad sin precedentes que afecta todos los aspectos de la vida cotidiana de la poblacion.",
      "La comunidad internacional ha expresado su preocupacion por la situacion, aunque hasta el momento no se han concretado intervenciones significativas que logren restablecer el orden. Las Naciones Unidas han calificado la crisis como una de las emergencias humanitarias mas graves del hemisferio.",
      "Miles de familias han abandonado sus hogares en los barrios mas afectados por la violencia, buscando refugio en zonas perifericas o intentando salir del pais por cualquier medio disponible.",
    ],
    category: "internacional",
    author: "Valentina Rojas",
    publishedAt: "2026-02-07T15:49:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 7800,
    tags: ["haiti", "pandillas", "crisis", "caribe", "seguridad"],
  },
  {
    slug: "nueva-york-legaliza-muerte-asistida-pacientes-terminales",
    title: "Nueva York legaliza la muerte asistida para pacientes terminales con periodo de espera",
    excerpt: "La gobernadora Kathy Hochul firmo la legislacion que permite la muerte asistida por medico con un plazo de espera de cinco dias y evaluacion psiquiatrica.",
    content: [
      "El estado de Nueva York se convirtio en una de las jurisdicciones mas grandes de Estados Unidos en legalizar la muerte asistida por medico para pacientes con enfermedades terminales, tras la firma de la gobernadora Kathy Hochul.",
      "La nueva legislacion, que entrara en vigor en julio de 2026, establece requisitos estrictos: los pacientes deben tener un diagnostico terminal con esperanza de vida menor a seis meses, completar un periodo de espera de cinco dias y someterse a una evaluacion psiquiatrica.",
      "Organizaciones medicas han mostrado posiciones divididas. Mientras algunos grupos aplauden la medida como un avance en los derechos de los pacientes, otros expresan reservas eticas y preocupacion por posibles abusos.",
      "La ley incluye protecciones adicionales, como la exigencia de que al menos dos medicos certifiquen el diagnostico terminal y que el paciente exprese su voluntad de manera reiterada. Los profesionales de salud podran ejercer objecion de conciencia.",
    ],
    category: "internacional",
    author: "Javiera Soto",
    publishedAt: "2026-02-07T14:19:00Z",
    readingTime: 4,
    isFeatured: false,
    isBreaking: false,
    views: 9400,
    tags: ["estados-unidos", "nueva-york", "eutanasia", "salud", "legislacion"],
  },
  {
    slug: "cuba-raciona-combustible-teletrabajo-crisis-petrolera",
    title: "Racionar combustible y priorizar teletrabajo: las medidas de Cuba ante su peor crisis energetica",
    excerpt: "El gobierno cubano implementa medidas de emergencia que incluyen racionamiento de gasolina y clases universitarias semipresenciales.",
    content: [
      "El gobierno de Cuba anuncio una serie de medidas de emergencia para enfrentar la peor crisis energetica en decadas, que incluyen el racionamiento de combustible, la priorizacion del teletrabajo y el paso a clases semipresenciales en las universidades.",
      "La crisis obedece a una combinacion de factores: el recrudecimiento de las sanciones estadounidenses bajo la administracion Trump y la reduccion de los suministros de petroleo desde Venezuela, principal proveedor historico de la isla.",
      "Los cubanos enfrentan largas colas para obtener combustible, con estaciones de servicio que limitan la venta a cantidades minimas. El transporte publico ha reducido drasticamente sus frecuencias, complicando el desplazamiento diario de millones de personas.",
      "Las autoridades cubanas pidieron a las empresas estatales y privadas implementar esquemas de teletrabajo donde sea posible, mientras que las universidades adoptaron un modelo hibrido para reducir la demanda de transporte.",
      "Analistas internacionales advierten que la situacion podria agravarse en los proximos meses si no se logran acuerdos que permitan un mayor flujo de combustible hacia la isla.",
    ],
    category: "internacional",
    author: "Valentina Rojas",
    publishedAt: "2026-02-07T14:02:00Z",
    readingTime: 4,
    isFeatured: false,
    isBreaking: false,
    views: 6500,
    tags: ["cuba", "crisis-energetica", "combustible", "caribe"],
  },
  {
    slug: "despidos-washington-post-300-periodistas-democracia",
    title: "Despidos en el Washington Post: 300 periodistas cesados y cierran seccion deportiva e internacional",
    excerpt: "El historico diario elimino el 30% de su plantilla periodistica, incluyendo las secciones de deportes, libros y corresponsalias internacionales.",
    content: [
      "El Washington Post, uno de los diarios mas emblematicos de Estados Unidos, despidio a aproximadamente 300 periodistas, lo que equivale al 30% de su plantilla, en una decision que ha generado alarma en el mundo del periodismo.",
      "Las secciones eliminadas incluyen deportes, libros y varias corresponsalias internacionales, entre ellas la del Medio Oriente, una de las mas criticas en el contexto actual del conflicto en Gaza.",
      "\"La democracia esta muriendo en la oscuridad\", ironizo un periodista cesado en referencia al lema del propio diario, que paradojicamente se presenta como defensor de la libertad de prensa.",
      "La decision se produce en un contexto de tension entre los medios de comunicacion y el gobierno de Donald Trump, quien ha mantenido una postura confrontacional con la prensa. Analistas del sector vinculan los recortes tanto a problemas financieros como a presiones politicas.",
      "Organizaciones de periodistas de todo el mundo han expresado su solidaridad con los trabajadores despedidos y su preocupacion por el impacto que estos recortes tendran en la cobertura informativa independiente.",
    ],
    category: "internacional",
    author: "Javiera Soto",
    publishedAt: "2026-02-07T13:01:00Z",
    readingTime: 4,
    isFeatured: false,
    isBreaking: true,
    views: 14300,
    tags: ["washington-post", "prensa", "despidos", "libertad-prensa", "estados-unidos"],
  },
  {
    slug: "latam-retoma-vuelos-venezuela-febrero",
    title: "LATAM retomara este mes sus vuelos a Venezuela tras negociaciones de Trump con Caracas",
    excerpt: "Seis aerolineas internacionales, incluida LATAM, reiniciaran operaciones hacia Venezuela entre febrero y marzo.",
    content: [
      "La aerolinea LATAM anuncio que retomara sus vuelos hacia Venezuela a partir de este mes de febrero, sumandose a otras cinco carriers internacionales que reanudaran operaciones tras las negociaciones del gobierno de Donald Trump con Caracas.",
      "La reanudacion de vuelos se produce en un contexto de apertura diplomatica entre Washington y el gobierno de Nicolas Maduro, que ha permitido flexibilizar algunas de las restricciones que pesaban sobre la aviacion comercial hacia el pais sudamericano.",
      "Para Chile, la noticia es particularmente relevante dado el importante flujo migratorio venezolano. Miles de familias podran reconectarse con sus seres queridos a traves de vuelos directos, sin necesidad de hacer escalas en terceros paises.",
      "Las aerolineas operaran inicialmente con frecuencias limitadas y tarifas que se esperan elevadas, dado los costos operativos asociados a la reactivacion de las rutas. Se espera una normalizacion gradual a lo largo del primer semestre.",
    ],
    category: "internacional",
    author: "Valentina Rojas",
    publishedAt: "2026-02-06T23:31:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 8900,
    tags: ["latam", "venezuela", "vuelos", "migracion", "aviacion"],
  },

  // --- DEPORTIVA ---
  {
    slug: "coquimbo-unido-primer-triunfo-local-palestino-3-1",
    title: "Coquimbo Unido debuto como local y logro ante Palestino su primer triunfo en la Liga de Primera",
    excerpt: "Los piratas se impusieron 3-1 frente a Palestino en el estadio Francisco Sanchez Rumoroso, consiguiendo sus primeros tres puntos del campeonato 2026.",
    content: [
      "Coquimbo Unido obtuvo su primera victoria en el Campeonato Nacional 2026 al imponerse 3-1 sobre Palestino en su debut como local en el estadio Francisco Sanchez Rumoroso.",
      "Los piratas demostraron solidez en su juego ofensivo durante el primer tiempo, abriendo la cuenta tempranamente y ampliando la ventaja antes del descanso. El gol del descuento de Palestino genero algo de suspenso, pero los locales supieron administrar el resultado.",
      "El equipo de Coquimbo jugo parte del segundo tiempo con un hombre menos tras una expulsion, pero logro mantener la ventaja y sellar el marcador con un tercer gol en los minutos finales.",
      "Con este resultado, Coquimbo Unido suma sus primeros tres puntos y se ubica en la parte alta de la tabla en las primeras fechas del campeonato. Palestino, por su parte, debera buscar su primer triunfo en la proxima jornada.",
    ],
    category: "deportiva",
    author: "Rodrigo Valenzuela",
    publishedAt: "2026-02-07T13:53:00Z",
    readingTime: 3,
    isFeatured: true,
    isBreaking: false,
    views: 7600,
    tags: ["futbol", "primera-division", "coquimbo", "palestino", "campeonato-2026"],
  },
  {
    slug: "tabilo-vence-davis-chile-serbia-segundo-punto",
    title: "Alejandro Tabilo derroto a Milic y le dio el segundo punto a Chile en la Copa Davis",
    excerpt: "El mejor tenista chileno se impuso en sets corridos ante Ognjen Milic para encaminar la serie de Copa Davis frente a Serbia.",
    content: [
      "Alejandro Tabilo, numero uno del tenis chileno, se impuso ante el serbio Ognjen Milic para darle el segundo punto a Chile en la serie de Copa Davis que se disputa en suelo nacional.",
      "El chileno mostro un nivel superlativo, dominando el encuentro de principio a fin con un servicio consistente y golpes de fondo que el serbio no pudo contrarrestar. La victoria en sets corridos confirma el gran momento que atraviesa Tabilo en la temporada.",
      "La serie entre Chile y Serbia no ha estado exenta de polemica. En un tenso episodio, el serbio Dusan Lajovic protagonizo un cruce con un hincha chileno, al que le dijo 'eres malo, malo'. El jugador posteriormente debio ser hospitalizado tras un incidente no relacionado con el partido.",
      "Con el 2-0 a favor, Chile queda en una posicion muy favorable para avanzar en la competencia. Tomas Barrios, quien tambien entro directo al cuadro principal del ATP de Buenos Aires, podria ser parte del equipo en los dobles del sabado.",
    ],
    category: "deportiva",
    author: "Rodrigo Valenzuela",
    publishedAt: "2026-02-06T22:00:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: true,
    views: 13200,
    tags: ["tenis", "copa-davis", "tabilo", "chile-serbia"],
  },
  {
    slug: "holscher-reemplaza-von-appen-jjoo-invierno-2026",
    title: "Tomas Holscher, de 18 anos, debutara en los Juegos Olimpicos de Invierno tras lesion de Von Appen",
    excerpt: "El joven esquiador chileno tomara el lugar de Henrik Von Appen, quien sufrio una lesion que le impide competir en las pruebas de eslalon.",
    content: [
      "El esquiador chileno Tomas Holscher, de tan solo 18 anos, tendra su debut olimpico en los Juegos de Invierno de Milan-Cortina 2026 tras la lesion de Henrik Von Appen, quien era el representante principal de Chile en las pruebas de eslalon.",
      "Holscher, considerado una de las grandes promesas del esqui chileno, competira en las pruebas de eslalon gigante y eslalon especial. A pesar de su juventud, el deportista ya cuenta con experiencia en competencias internacionales juveniles.",
      "La noticia es agridulce para el deporte chileno. Si bien la lesion de Von Appen es una baja importante, la oportunidad le da a Holscher una plataforma para mostrar su talento en el escenario mas grande del deporte mundial.",
      "Chile cuenta con una delegacion reducida en los Juegos de Invierno, pero con representantes que buscan dejar en alto el nombre del pais. Las competencias de esqui se realizaran en las sedes de Cortina d'Ampezzo y Bormio.",
    ],
    category: "deportiva",
    author: "Rodrigo Valenzuela",
    publishedAt: "2026-02-07T13:00:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 5400,
    tags: ["jjoo", "esqui", "holscher", "von-appen", "olimpicos-invierno"],
  },
  {
    slug: "barrios-entra-cuadro-principal-atp-buenos-aires",
    title: "Tomas Barrios entro directo al cuadro principal del ATP de Buenos Aires",
    excerpt: "El tenista chileno se sumo a Tabilo y Garin en el ATP 250 de Buenos Aires tras la baja de otro jugador del main draw.",
    content: [
      "El tenista chileno Tomas Barrios obtuvo un lugar directo en el cuadro principal del ATP 250 de Buenos Aires, luego de que otro jugador se retirara del torneo, liberando un espacio que fue ocupado por el nacional.",
      "Con esta inclusion, Chile tendra una importante representacion en el torneo argentino, ya que Barrios se suma a Alejandro Tabilo y Cristian Garin, quienes ya estaban confirmados en el main draw.",
      "Barrios viene de un buen inicio de temporada y buscara aprovechar la oportunidad para sumar puntos importantes en el ranking ATP. La superficie de polvo de ladrillo es una de las favoritas del chileno, lo que le da confianza de cara al torneo.",
      "El ATP de Buenos Aires es uno de los torneos mas importantes de Sudamerica y tradicionalmente convoca a figuras del tenis mundial y regional, lo que garantiza un alto nivel de competencia para los chilenos.",
    ],
    category: "deportiva",
    author: "Rodrigo Valenzuela",
    publishedAt: "2026-02-07T13:46:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 4200,
    tags: ["tenis", "atp", "barrios", "buenos-aires"],
  },
  {
    slug: "arsenal-golea-sunderland-lider-premier-league",
    title: "Arsenal goleo 3-0 a Sunderland y sigue firme como lider de la Premier League",
    excerpt: "Los gunners se impusieron sin dificultades en el Emirates Stadium por la fecha 25, manteniendo su posicion en lo mas alto de la tabla.",
    content: [
      "Arsenal continua su dominio en la Premier League con una contundente victoria 3-0 sobre Sunderland en el Emirates Stadium, correspondiente a la fecha 25 del campeonato ingles.",
      "Los dirigidos por Mikel Arteta mostraron un juego colectivo solido desde el inicio, abriendo la cuenta en el primer tiempo y ampliando la ventaja en la segunda mitad con goles que reflejaron la superioridad del equipo local.",
      "Con este resultado, Arsenal mantiene su liderato con una ventaja de varios puntos sobre sus perseguidores, consolidando una temporada que ilusiona a sus hinchas con la posibilidad de un nuevo titulo de liga.",
      "En el otro partido destacado de la jornada, Cole Palmer brillo con un hat-trick en la victoria 3-1 del Chelsea sobre Wolverhampton fuera de casa, confirmando al joven ingles como una de las figuras de la temporada.",
    ],
    category: "deportiva",
    author: "Rodrigo Valenzuela",
    publishedAt: "2026-02-07T14:23:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 6800,
    tags: ["futbol", "premier-league", "arsenal", "chelsea", "palmer"],
  },
  {
    slug: "otero-subsecretario-deportes-gobierno-kast",
    title: "Andres Otero sera el subsecretario de Deportes de Kast: vuelve a la cartera que ocupo con Pinera",
    excerpt: "El actual gerente general de la Fetech retomara la cartera deportiva que encabezo durante el segundo gobierno de Sebastian Pinera.",
    content: [
      "Andres Otero fue confirmado como el nuevo subsecretario de Deportes del gobierno de Jose Antonio Kast, regresando a la cartera que ya ocupo durante el segundo mandato de Sebastian Pinera.",
      "Otero, quien actualmente se desempena como gerente general de la Federacion de Tenis de Chile (Fetech), es un rostro conocido en la gestion deportiva publica. Su experiencia previa en el cargo lo posiciona como una continuidad en las politicas deportivas del sector.",
      "Entre los desafios que enfrentara estan la preparacion de Chile para competencias internacionales, el fortalecimiento del deporte de alto rendimiento y la ampliacion del acceso al deporte y la actividad fisica en todo el pais.",
      "Su nombramiento se dio en el marco de la presentacion de la 'segunda linea' del gabinete de Kast, en una ceremonia que enfatizo las prioridades de seguridad, salud y empleo del nuevo gobierno.",
    ],
    category: "deportiva",
    author: "Rodrigo Valenzuela",
    publishedAt: "2026-02-07T15:34:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 3800,
    tags: ["deportes", "gobierno", "otero", "kast", "fetech"],
  },

  // --- ELECTORAL ---
  {
    slug: "jornada-42-horas-empresas-preparan-reduccion-abril",
    title: "Llegan las 42 horas: empresas se alistan para nueva reduccion de jornada laboral desde abril",
    excerpt: "La segunda etapa de la ley de reduccion de jornada laboral entrara en vigor en abril, y las empresas advierten un 'impacto relevante' en sus operaciones.",
    content: [
      "Las empresas chilenas se preparan para la segunda etapa de la reduccion de jornada laboral, que reducira el limite semanal a 42 horas a partir de abril de 2026, en el marco de la ley que busca alcanzar progresivamente las 40 horas semanales.",
      "Los gremios empresariales han advertido sobre un 'impacto relevante' en la productividad y los costos operativos, especialmente para las pequenas y medianas empresas que tendran menos margen para redistribuir las cargas de trabajo.",
      "La ley, aprobada durante el gobierno anterior, establece una reduccion gradual: de las 45 horas originales se paso a 44 horas, ahora se llegara a 42 y finalmente a 40 horas semanales. Cada etapa busca dar tiempo a las empresas para adaptarse.",
      "Desde el mundo sindical, la evaluacion es positiva. Los trabajadores esperan que la medida mejore su calidad de vida y el equilibrio entre trabajo y tiempo personal, sin afectar significativamente sus remuneraciones.",
      "El nuevo gobierno de Kast ha senalado que respetara la implementacion de la ley, aunque evaluara mecanismos de flexibilidad para sectores que enfrenten dificultades especiales con la transicion.",
    ],
    category: "electoral",
    author: "Paula Contreras",
    publishedAt: "2026-02-07T10:00:00Z",
    readingTime: 4,
    isFeatured: true,
    isBreaking: false,
    views: 16800,
    tags: ["jornada-laboral", "42-horas", "trabajo", "empresas", "ley"],
  },
  {
    slug: "kast-evalua-comisionado-especial-macrozona-norte",
    title: "Kast evalua nombrar a un comisionado especial para la macrozona norte y el Plan Escudo Fronterizo",
    excerpt: "El presidente electo analiza designar una figura con rol coordinador para implementar sus politicas de seguridad en la frontera con Peru y Bolivia.",
    content: [
      "El presidente electo Jose Antonio Kast esta evaluando la designacion de un comisionado especial para la macrozona norte del pais, cuya principal funcion seria supervisar la implementacion del denominado Plan Escudo Fronterizo.",
      "Esta figura tendria un rol de coordinacion entre las distintas instituciones que operan en la zona fronteriza con Peru y Bolivia, incluyendo Fuerzas Armadas, Policia de Investigaciones, Carabineros y servicios migratorios.",
      "El Plan Escudo Fronterizo fue una de las propuestas centrales de la campana de Kast y contempla un refuerzo significativo del control migratorio, el combate al contrabando y la lucha contra el narcotrafico en las regiones de Arica y Parinacota, Tarapaca y Antofagasta.",
      "Sin embargo, se aclaro que este comisionado tendria atribuciones de coordinacion pero no ejecutivas, lo que plantea interrogantes sobre su capacidad real de accion en una zona donde operan multiples actores institucionales.",
    ],
    category: "electoral",
    author: "Felipe Araya",
    publishedAt: "2026-02-07T15:16:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 7200,
    tags: ["kast", "macrozona-norte", "seguridad", "migracion", "frontera"],
  },
  {
    slug: "zelenski-eeuu-quiere-fin-guerra-ucrania-junio",
    title: "Zelenski afirma que EE.UU. quiere poner fin a la guerra de Ucrania antes de junio",
    excerpt: "El presidente ucraniano revelo que la administracion Trump propuso concluir el conflicto para el verano boreal, posiblemente influenciado por las elecciones de medio termino.",
    content: [
      "El presidente de Ucrania, Volodimir Zelenski, afirmo que la administracion de Donald Trump le ha manifestado su intencion de poner fin a la guerra con Rusia antes de junio de 2026.",
      "Segun Zelenski, la propuesta estaria motivada en parte por el calendario electoral estadounidense, ya que las elecciones legislativas de medio termino se celebrarian en noviembre y el gobierno de Trump buscaria mostrar un logro diplomatico significativo.",
      "No obstante, las condiciones para un alto al fuego permanente siguen siendo objeto de intensas negociaciones. Rusia ha mantenido exigencias territoriales que Ucrania considera inaceptables, mientras que Kiev insiste en la restitucion de su soberania sobre todos los territorios ocupados.",
      "Analistas geopoliticos advierten que un acuerdo de paz antes de junio es un plazo ambicioso, dado el estado actual de las negociaciones y las posiciones distantes de las partes involucradas.",
    ],
    category: "electoral",
    author: "Javiera Soto",
    publishedAt: "2026-02-07T10:39:00Z",
    readingTime: 4,
    isFeatured: false,
    isBreaking: false,
    views: 8100,
    tags: ["ucrania", "rusia", "trump", "zelenski", "geopolitica"],
  },
  {
    slug: "trump-no-pedira-disculpas-video-racista-obama",
    title: "\"No cometi ningun error\": Trump se niega a pedir disculpas por video racista contra los Obama",
    excerpt: "El presidente de Estados Unidos rechazo disculparse por compartir un video generado con inteligencia artificial que mostraba a los Obama como primates.",
    content: [
      "El presidente de Estados Unidos, Donald Trump, rechazo categoricamente disculparse por haber compartido en sus redes sociales un video generado con inteligencia artificial que representaba al expresidente Barack Obama y a Michelle Obama como primates.",
      "\"No cometi ningun error\", declaro Trump ante la prensa, desestimando las criticas que le han llovido desde organizaciones de derechos civiles, lideres politicos de ambos partidos y personalidades publicas de todo el mundo.",
      "El incidente ha reavivado el debate sobre el uso de la inteligencia artificial para crear contenido ofensivo y la responsabilidad de las figuras publicas al difundir este tipo de material. Organizaciones afroamericanas calificaron el video como un acto de racismo abierto.",
      "Legisladores democratas han condenado la publicacion y exigido una disculpa formal, mientras que algunos republicanos han optado por guardar silencio o minimizar la polemica, evidenciando las tensiones internas en la politica estadounidense.",
    ],
    category: "electoral",
    author: "Paula Contreras",
    publishedAt: "2026-02-06T23:39:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 22000,
    tags: ["trump", "racismo", "inteligencia-artificial", "estados-unidos", "obama"],
  },
  {
    slug: "plan-viviendas-emergencia-247-mil-hogares-entregados",
    title: "Plan de Emergencia Habitacional: 247 mil viviendas entregadas y 18.479 en construccion",
    excerpt: "El Ministerio de Vivienda reporta avances significativos en el plan que busca reducir el deficit habitacional en Chile.",
    content: [
      "El Ministerio de Vivienda y Urbanismo presento un balance del Plan de Emergencia Habitacional, informando que se han entregado 247.000 viviendas durante 2025, con 18.479 actualmente en construccion y mas de 69.000 subsidios asignados para futuras edificaciones.",
      "El plan busca abordar el deficit habitacional cronico que afecta a cientos de miles de familias chilenas, especialmente en las grandes ciudades donde el costo de la vivienda ha subido significativamente en la ultima decada.",
      "El gobierno saliente destaco que las cifras representan un avance historico en la construccion de viviendas sociales, aunque reconocio que el deficit sigue siendo considerable y requiere un esfuerzo sostenido en el tiempo.",
      "El equipo del presidente electo Kast ha senalado que mantendra el impulso en vivienda social, aunque con ajustes en los mecanismos de focalizacion para asegurar que los recursos lleguen a quienes mas los necesitan.",
    ],
    category: "electoral",
    author: "Paula Contreras",
    publishedAt: "2026-02-07T11:01:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 5600,
    tags: ["vivienda", "minvu", "deficit-habitacional", "subsidios", "chile"],
  },

  // --- POPURRI ---
  {
    slug: "bad-bunny-super-bowl-lx-show-todo-en-espanol",
    title: "Bad Bunny hara historia en el Super Bowl LX con un show de 13 minutos completamente en espanol",
    excerpt: "El artista puertorriqueno se presentara en el medio tiempo del evento deportivo mas visto del mundo cantando exclusivamente en espanol.",
    content: [
      "Bad Bunny esta listo para hacer historia en el Super Bowl LX con un espectaculo de medio tiempo de 13 minutos que sera integramente en espanol, marcando un hito en la historia del evento deportivo mas visto del mundo.",
      "Segun su imitador chileno, conocido como 'el Bad Bunny chileno', el artista ha sido claro en su postura: \"El mercado norteamericano se ha adaptado a el, no al reves\", destacando el orgullo cultural que representa esta presentacion.",
      "La decision de cantar en espanol tiene un significado adicional en el contexto politico actual de Estados Unidos, donde las comunidades latinas enfrentan una retorica cada vez mas hostil. La presentacion se lee como una declaracion de identidad cultural.",
      "Bad Bunny es el segundo artista latino en encabezar el show del medio tiempo del Super Bowl, siguiendo los pasos de Shakira y Jennifer Lopez, quienes compartieron escenario en 2020.",
      "Se espera que el show incluya sus exitos mas reconocidos y posibles colaboraciones sorpresa, aunque los detalles se mantienen en secreto hasta el dia del evento.",
    ],
    category: "popurri",
    author: "Camila Fuentes",
    publishedAt: "2026-02-07T11:48:00Z",
    readingTime: 4,
    isFeatured: true,
    isBreaking: false,
    views: 25600,
    tags: ["bad-bunny", "super-bowl", "musica", "espanol", "cultura"],
  },
  {
    slug: "taylor-swift-opalite-video-murphy-gleeson",
    title: "Domhnall Gleeson y Cillian Murphy protagonizan el nuevo video de Taylor Swift para 'Opalite'",
    excerpt: "La cantante estreno un video con estetica noventera protagonizado por dos estrellas de Hollywood, en una estrategia de distribucion que priorizo las plataformas de streaming.",
    content: [
      "Taylor Swift estreno el videoclip de 'Opalite', una de las canciones destacadas de su ultimo album, con la participacion estelar de los actores Domhnall Gleeson y Cillian Murphy en una narrativa ambientada en los anos noventa.",
      "El video presenta una estetica retro cuidadosamente producida, con escenarios y vestuario que evocan la decada de 1990. Gleeson y Murphy interpretan personajes que se entrelazan con la historia que narra Swift a traves de su cancion.",
      "Un dato llamativo de la estrategia de lanzamiento fue que el video se estreno primero en plataformas de streaming premium antes de llegar a YouTube, reflejando la evolucion en las estrategias de distribucion de contenido musical.",
      "Los fans respondieron con entusiasmo al lanzamiento, convirtiendo el video en tendencia global en redes sociales a las pocas horas de su publicacion.",
    ],
    category: "popurri",
    author: "Camila Fuentes",
    publishedAt: "2026-02-06T15:54:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 19800,
    tags: ["taylor-swift", "musica", "opalite", "cillian-murphy", "video"],
  },
  {
    slug: "semana-penaflorina-joe-vasconcellos-nicole-festival",
    title: "Joe Vasconcellos, Amistades Peligrosas y Nicole estaran en la Semana Penaflorina 2026",
    excerpt: "El festival de la comuna de Penaflor trae tres dias de musica con artistas nacionales e internacionales en el Parque El Trapiche.",
    content: [
      "La Municipalidad de Penaflor anuncio la programacion de la Semana Penaflorina 2026, un festival de tres dias que se celebrara entre el 13 y 15 de febrero en el Parque El Trapiche con una variada oferta musical.",
      "Entre los artistas confirmados destacan Joe Vasconcellos, la agrupacion espanola Amistades Peligrosas y la cantante Nicole, quienes encabezaran las tres jornadas del evento.",
      "La entrada general tiene un valor de 8.000 pesos, con descuentos especiales para residentes de la comuna. Los ninos menores de 4 anos y adultos mayores de 65 anos ingresan de forma gratuita.",
      "El evento se suma a la oferta cultural del verano en la Region Metropolitana, que este ano cuenta con multiples festivales y actividades al aire libre aprovechando las altas temperaturas de la temporada.",
    ],
    category: "popurri",
    author: "Camila Fuentes",
    publishedAt: "2026-02-07T13:48:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 4500,
    tags: ["festival", "penaflor", "joe-vasconcellos", "musica", "verano"],
  },
  {
    slug: "jurado-vina-2026-pablo-chill-e-polemica",
    title: "Pablo Chill-E encabeza el jurado de Vina 2026 y genera polemica: 'Los que eligen son la produccion'",
    excerpt: "La inclusion del artista urbano en el jurado del Festival de Vina del Mar genero reacciones encontradas en redes sociales.",
    content: [
      "El artista urbano Pablo Chill-E fue anunciado como uno de los miembros del jurado del Festival de Vina del Mar 2026, generando una ola de reacciones en redes sociales que van desde el apoyo hasta el rechazo.",
      "Ante las criticas, el cantante respondio con un escueto: \"Los que eligen son la produccion, no yo\", trasladando la responsabilidad de su designacion a los organizadores del evento.",
      "El jurado del festival siempre genera debate, pero la inclusion de figuras del mundo urbano ha sido particularmente divisiva en un evento que tradicionalmente ha estado asociado a generos musicales mas establecidos.",
      "Los organizadores defendieron la seleccion argumentando que buscan reflejar la diversidad de la escena musical actual y conectar con audiencias mas jovenes que se identifican con los generos urbanos.",
    ],
    category: "popurri",
    author: "Camila Fuentes",
    publishedAt: "2026-02-06T13:58:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 12400,
    tags: ["vina-del-mar", "festival", "pablo-chill-e", "musica-urbana"],
  },
  {
    slug: "protesta-masiva-contra-juegos-olimpicos-invierno-milan",
    title: "Miles de personas se manifestaron en Milan contra los Juegos Olimpicos de Invierno 2026",
    excerpt: "Grupos ambientalistas y estudiantiles marcharon contra la tala de arboles, el gasto publico y la presencia policial asociados al evento deportivo.",
    content: [
      "Miles de personas marcharon por las calles de Milan en una masiva protesta contra los Juegos Olimpicos de Invierno 2026, que se realizaran en la region de Lombardia y el Veneto a partir de este mes.",
      "La manifestacion fue organizada por grupos ambientalistas y asociaciones estudiantiles que cuestionan el impacto ecologico del evento, incluyendo la tala de arboles para la construccion de infraestructura deportiva y vial.",
      "Los manifestantes tambien protestaron contra el incremento del gasto publico y la fuerte presencia de fuerzas de seguridad que se ha desplegado en la region con motivo de los juegos, asi como las politicas migratorias que se han endurecido en las zonas olimpicas.",
      "Las autoridades italianas respondieron que las obras se han realizado cumpliendo con las normativas ambientales y que los Juegos representan una oportunidad economica para la region.",
    ],
    category: "popurri",
    author: "Valentina Rojas",
    publishedAt: "2026-02-07T15:30:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 5200,
    tags: ["olimpicos", "milan", "protesta", "medio-ambiente", "italia"],
  },

  // --- NO SOMOS NADA ---
  {
    slug: "antivacunas-disparan-casos-sarampion-alerta-minsal",
    title: "Jefe de Epidemiologia del Minsal: 'Los antivacunas han disparado los casos de sarampion'",
    excerpt: "Las autoridades sanitarias atribuyen el resurgimiento del sarampion a la caida en la cobertura de vacunacion impulsada por grupos antivacunas.",
    content: [
      "El jefe de Epidemiologia del Ministerio de Salud lanzo una dura advertencia contra los movimientos antivacunas, a quienes responsabilizo directamente del resurgimiento de los casos de sarampion en Chile y el mundo.",
      "Segun el funcionario, la caida en las tasas de vacunacion infantil, impulsada por la desinformacion difundida por estos grupos en redes sociales, ha permitido que una enfermedad que estaba practicamente erradicada vuelva a ser una amenaza real.",
      "Los datos son contundentes: paises con baja cobertura de vacunacion han registrado un aumento exponencial de casos en los ultimos dos anos. En Chile, si bien la situacion es controlada, las autoridades temen que la tendencia global pueda replicarse.",
      "Los expertos insisten en que la vacuna contra el sarampion es segura, efectiva y ha salvado millones de vidas desde su introduccion. El llamado es a los padres a completar el calendario de vacunacion de sus hijos.",
      "\"Cada nino no vacunado es un riesgo no solo para el, sino para toda la comunidad\", advirtio el epidemiologo, recordando que el sarampion puede causar complicaciones graves e incluso la muerte en poblaciones vulnerables.",
    ],
    category: "no-somos-nada",
    author: "Carolina Mendez",
    publishedAt: "2026-02-07T09:30:00Z",
    readingTime: 4,
    isFeatured: true,
    isBreaking: false,
    views: 18200,
    tags: ["sarampion", "antivacunas", "salud", "vacunacion", "minsal"],
  },
  {
    slug: "criminal-peruano-el-monstruo-dice-dios-cambio-preso",
    title: "Criminal apodado 'El Monstruo' asegura que Dios lo cambio tras caer preso en Peru",
    excerpt: "Erick Moreno, lider de una banda dedicada al sicariato y la extorsion, dice haber encontrado la fe en prision, aunque disputa algunos cargos.",
    content: [
      "Erick Moreno, conocido en el mundo criminal peruano como 'El Monstruo', sorprendio al declarar ante los medios que ha experimentado una transformacion espiritual tras su encarcelamiento, asegurando que 'Dios lo cambio'.",
      "Moreno, quien lideraba una banda dedicada al sicariato, la extorsion y el trafico de drogas en Lima, expreso arrepentimiento por los crimenes cometidos, aunque se apresuro a disputar algunos de los cargos que pesan en su contra.",
      "La declaracion genero escepticismo entre las autoridades y las victimas de sus crimenes. Los fiscales del caso senalaron que las supuestas conversiones religiosas son una estrategia comun entre los reos para intentar obtener beneficios penitenciarios.",
      "\"Hemos visto esto muchas veces. La fe puede ser genuina, pero eso no borra los delitos cometidos ni exime de las penas correspondientes\", comento un fiscal del caso.",
    ],
    category: "no-somos-nada",
    author: "Equipo SPNG",
    publishedAt: "2026-02-06T15:31:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 14600,
    tags: ["peru", "crimen", "religion", "prision", "curiosas"],
  },
  {
    slug: "belloni-festival-parral-duramente-criticado-rutina",
    title: "La rutina de Ernesto Belloni en el Festival de Parral fue duramente criticada por 'denigrante'",
    excerpt: "Las redes sociales estallaron contra el comediante por una presentacion considerada anticuada e inapropiada que incluyo a una modelo semidesnuda.",
    content: [
      "El comediante Ernesto Belloni se convirtio en blanco de duras criticas tras su presentacion en el Vibra Fest de Parral, donde su rutina fue calificada como 'denigrante' y 'anticuada' por espectadores y usuarios de redes sociales.",
      "La polemica se centro en un segmento del show que incluyo a una modelo y un performer semidesnudo, lo que fue considerado inapropiado y fuera de lugar para un evento familiar. Los televidentes expresaron su molestia en tiempo real a traves de Twitter y otras plataformas.",
      "\"Esto es humor de los 90 que ya nadie encuentra gracioso\", fue una de las criticas mas repetidas en redes sociales, donde la actuacion se convirtio rapidamente en trending topic.",
      "Belloni, figura historica del humor chileno, no se ha pronunciado publicamente sobre la polemica. El incidente reavivo el debate sobre la vigencia del humor tradicional en un contexto social que exige mayor sensibilidad y respeto.",
    ],
    category: "no-somos-nada",
    author: "Camila Fuentes",
    publishedAt: "2026-02-07T11:21:00Z",
    readingTime: 3,
    isFeatured: false,
    isBreaking: false,
    views: 21000,
    tags: ["belloni", "comedia", "parral", "polemica", "entretenimiento"],
  },
  {
    slug: "sanchez-tecnoligarcas-quiten-manos-ninos-redes-sociales",
    title: "Pedro Sanchez a los 'tecnoligarcas': 'Quiten sus sucias manos de los ninos'",
    excerpt: "El presidente de Espana anuncio un plan de cinco puntos para proteger a los menores de 16 anos del impacto de las redes sociales.",
    content: [
      "El presidente del gobierno espanol, Pedro Sanchez, lanzo un fuerte ataque contra los lideres de las grandes empresas tecnologicas al anunciar un plan de cinco puntos para proteger a los menores de edad del impacto nocivo de las redes sociales.",
      "\"Quiten sus sucias manos de los ninos\", dijo Sanchez dirigiendose directamente a quienes denomino 'tecnoligarcas', en referencia a los magnates de Silicon Valley que controlan las principales plataformas digitales.",
      "El plan contempla la prohibicion de acceso a redes sociales para menores de 16 anos, la persecucion penal contra plataformas que se nieguen a eliminar contenido danino, y la investigacion de los algoritmos de recomendacion que, segun estudios, pueden afectar la salud mental de los jovenes.",
      "La iniciativa de Sanchez se suma a un movimiento global de regulacion tecnologica que ha cobrado fuerza en Europa, con la Union Europea liderando los esfuerzos legislativos para controlar el poder de las grandes plataformas digitales.",
      "Expertos en derechos digitales aplaudieron la intencion pero advirtieron sobre los desafios practicos de implementar restricciones efectivas en plataformas que operan a nivel global.",
    ],
    category: "no-somos-nada",
    author: "Equipo SPNG",
    publishedAt: "2026-02-06T22:33:00Z",
    readingTime: 4,
    isFeatured: false,
    isBreaking: false,
    views: 16500,
    tags: ["redes-sociales", "espana", "sanchez", "menores", "tecnologia"],
  },
  {
    slug: "cada-segundo-cuenta-que-hacer-ante-ahogamiento-piscina",
    title: "Cada segundo cuenta: que hacer ante un ahogamiento en piscinas y como aplicar RCP",
    excerpt: "Especialistas entregan una guia paso a paso para actuar ante una emergencia por inmersion, tecnica que puede salvar vidas en verano.",
    content: [
      "Con el verano en pleno apogeo y las altas temperaturas incentivando el uso de piscinas, expertos medicos entregaron una guia practica sobre como actuar ante un caso de ahogamiento por inmersion.",
      "\"Cada segundo cuenta\", enfatizo el especialista consultado por Cooperativa, quien detallo los pasos criticos que cualquier persona puede seguir mientras llega la ayuda profesional.",
      "Lo primero es retirar a la victima del agua sin ponerse en riesgo. Luego, verificar si respira y, en caso negativo, iniciar de inmediato las maniobras de reanimacion cardiopulmonar (RCP), alternando 30 compresiones toracicas con 2 ventilaciones.",
      "En el caso de ninos pequenos, las compresiones deben realizarse con menor fuerza y se recomienda iniciar con 5 ventilaciones de rescate antes de comenzar el ciclo de compresiones.",
      "Los expertos recordaron que la prevencion es siempre la mejor estrategia: supervision constante de menores cerca del agua, cercos perimetrales en piscinas y nunca dejar a ninos solos cerca de cuerpos de agua, por superficiales que parezcan.",
    ],
    category: "no-somos-nada",
    author: "Carolina Mendez",
    publishedAt: "2026-02-07T12:49:00Z",
    readingTime: 4,
    isFeatured: false,
    isBreaking: false,
    views: 8700,
    tags: ["ahogamiento", "rcp", "piscinas", "verano", "salud"],
  },
];

async function seedReal() {
  console.log("=== Seeding Sanity with REAL Chilean news (Feb 7, 2026) ===\n");

  // 1. Ensure categories exist
  console.log("1. Creating/updating categories...");
  const categoryRefs: Record<string, string> = {};
  for (const cat of categories) {
    const doc = await client.createOrReplace({
      _id: `category-${cat.slug}`,
      _type: "category",
      name: cat.name,
      slug: { _type: "slug", current: cat.slug },
      description: cat.description,
      color: cat.color,
    });
    categoryRefs[cat.slug] = doc._id;
    console.log(`   [OK] ${cat.name}`);
  }

  // 2. Create authors
  console.log("\n2. Creating/updating authors...");
  const authorRefs: Record<string, string> = {};
  for (const author of authors) {
    const slug = author.name.toLowerCase().replace(/\s+/g, "-");
    const doc = await client.createOrReplace({
      _id: `author-${slug}`,
      _type: "author",
      name: author.name,
      slug: { _type: "slug", current: slug },
      role: author.role,
    });
    authorRefs[author.name] = doc._id;
    console.log(`   [OK] ${author.name} (${author.role})`);
  }

  // 3. Delete old mock articles
  console.log("\n3. Removing old mock articles...");
  const oldArticles = await client.fetch(`*[_type == "article" && _id match "article-*"]._id`);
  if (oldArticles.length > 0) {
    let tx = client.transaction();
    for (const id of oldArticles) {
      tx = tx.delete(id);
    }
    await tx.commit();
    console.log(`   Deleted ${oldArticles.length} old articles`);
  } else {
    console.log("   No old articles to delete");
  }

  // 4. Create real articles
  console.log("\n4. Creating real articles...");
  for (const article of realArticles) {
    const catRef = categoryRefs[article.category];
    const authRef = authorRefs[article.author];

    if (!catRef) {
      console.error(`   [SKIP] No category ref for: ${article.category}`);
      continue;
    }
    if (!authRef) {
      console.error(`   [SKIP] No author ref for: ${article.author}`);
      continue;
    }

    await client.createOrReplace({
      _id: `article-${article.slug}`,
      _type: "article",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      excerpt: article.excerpt,
      content: toBlocks(article.content),
      category: { _type: "reference", _ref: catRef },
      author: { _type: "reference", _ref: authRef },
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      isFeatured: article.isFeatured,
      isBreaking: article.isBreaking,
      views: article.views,
      tags: article.tags,
    });
    console.log(`   [OK] [${article.category}] ${article.title.substring(0, 60)}...`);
  }

  // Summary
  const countByCategory: Record<string, number> = {};
  for (const a of realArticles) {
    countByCategory[a.category] = (countByCategory[a.category] || 0) + 1;
  }
  console.log("\n=== SEED COMPLETE ===");
  console.log(`Total articles: ${realArticles.length}`);
  for (const [cat, count] of Object.entries(countByCategory)) {
    console.log(`  ${cat}: ${count}`);
  }
  console.log(`Featured: ${realArticles.filter((a) => a.isFeatured).length}`);
  console.log(`Breaking: ${realArticles.filter((a) => a.isBreaking).length}`);
}

seedReal().catch(console.error);
