import type { Localized } from "@/i18n/dictionaries";

export const personalInfo = {
  name: "Franco Leone",
  title: {
    en: "Game & Full Stack Developer",
    es: "Desarrollador de Videojuegos y Full Stack",
  },
  subtitle: {
    en: "Building interactive gaming experiences and high-quality web applications",
    es: "Creando experiencias de juego interactivas y aplicaciones web de alta calidad",
  },
  email: "francoleone.dev@gmail.com",
  location: "Buenos Aires, Argentina",
  social: {
    github: "https://github.com/FrancoLeoneDev",
    linkedin: "https://www.linkedin.com/in/franco-leone-294511242/",
    whatsapp: "https://wa.me/5491126323865",
  },
};

export const aboutText: { intro: Localized; details: Localized[] } = {
  intro: {
    en: "I'm a Game Developer & Full Stack Developer with strong capabilities in both game and web/app development.",
    es: "Soy Desarrollador de Videojuegos y Full Stack, con sólidas capacidades tanto en desarrollo de juegos como web/apps.",
  },
  details: [
    {
      en: "Advanced proficiency in Unity with C#, having built multiple systems, tools, and gameplay mechanics. Currently expanding my engine expertise with Unreal Engine (C++).",
      es: "Dominio avanzado de Unity con C#, habiendo construido múltiples sistemas, herramientas y mecánicas de juego. Actualmente ampliando mi experiencia en motores con Unreal Engine (C++).",
    },
    {
      en: "Skilled in building complete web and mobile applications using modern technologies and frameworks, with solid experience in database integration and API development.",
      es: "Experiencia en construir aplicaciones web y móviles completas con tecnologías y frameworks modernos, con sólida experiencia en integración de bases de datos y desarrollo de APIs.",
    },
    {
      en: "Driven by a deep passion for interactive technologies, game design, and modern software development, with a strong commitment to delivering high-quality digital products across both fields.",
      es: "Impulsado por una profunda pasión por las tecnologías interactivas, el diseño de juegos y el desarrollo de software moderno, con un fuerte compromiso de entregar productos digitales de alta calidad en ambos campos.",
    },
  ],
};

export interface Skill {
  name: string;
  iconKey: string;
  category: "gamedev" | "frontend" | "backend" | "tools";
}

// Ordered game-dev first, matching how the rest of the site names the two poles.
export const skills: Skill[] = [
  // Game Development
  { name: "Unity", iconKey: "Unity", category: "gamedev" },
  { name: "C#", iconKey: "CSharp", category: "gamedev" },
  { name: "Unreal Engine", iconKey: "UnrealEngine", category: "gamedev" },
  { name: "C++", iconKey: "CPlusPlus", category: "gamedev" },
  { name: "Photon Fusion", iconKey: "PhotonFusion", category: "gamedev" },

  // Frontend
  { name: "React", iconKey: "React", category: "frontend" },
  { name: "Next.js", iconKey: "NextJS", category: "frontend" },
  { name: "HTML", iconKey: "HTML", category: "frontend" },
  { name: "CSS", iconKey: "CSS", category: "frontend" },
  { name: "Tailwind CSS", iconKey: "TailwindCSS", category: "frontend" },
  { name: "Framer Motion", iconKey: "FramerMotion", category: "frontend" },

  // Backend
  { name: "TypeScript", iconKey: "TypeScript", category: "backend" },
  { name: "JavaScript", iconKey: "JavaScript", category: "backend" },
  { name: "Node.js", iconKey: "NodeJS", category: "backend" },
  { name: "Python", iconKey: "Python", category: "backend" },
  { name: "PHP", iconKey: "PHP", category: "backend" },
  { name: "PostgreSQL", iconKey: "PostgreSQL", category: "backend" },
  { name: "Supabase", iconKey: "Supabase", category: "backend" },

  // Tools
  { name: "Docker", iconKey: "Docker", category: "tools" },
  { name: "Git", iconKey: "Git", category: "tools" },
  { name: "CI/CD (GitHub Actions)", iconKey: "GitHubActions", category: "tools" },
  { name: "Linux/Bash", iconKey: "Linux", category: "tools" },
  { name: "n8n", iconKey: "N8N", category: "tools" },
  { name: "Vercel", iconKey: "Vercel", category: "tools" },
];

/**
 * Who the work belongs to. Every project carries one so the reader never has to
 * infer authorship by elimination: omitting `org` renders as "Proyecto propio",
 * naming it renders as "<empresa> · <rol>". Keep `role` short — it shares one line.
 */
export interface ProjectCredit {
  org?: string; // employer/agency; absent = own project
  role: Localized;
}

/** One frame in a game's gallery. Caption optional — game art usually speaks for itself. */
export interface GameShot {
  src: string;
  caption?: Localized;
}

export interface Project {
  id: string;
  title: string;
  description: Localized;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: "completed" | "in-progress";
  featured: boolean;
  credit?: ProjectCredit;
  /** Game projects only — renders an EngineBadge. Web projects leave it unset. */
  engine?: EngineKey;
  /**
   * Featured game only. When set, the card shows a carousel of these instead of the single
   * `image`; list every frame you want shown, including the first. `image` stays as the
   * canonical still used elsewhere.
   */
  images?: GameShot[];
}

const SOLO: ProjectCredit = {
  role: { en: "Sole developer", es: "Único desarrollador" },
};

// Freelance work under ABK Solutions — named company, but full ownership of the build.
const ABK_SOLO: ProjectCredit = {
  org: "ABK Solutions",
  role: { en: "Sole developer", es: "Único desarrollador" },
};

// A site built for someone else with no company in between: the client's own
// name goes in the org slot, because "Own project" would claim work that isn't mine.
const LUCAS_CLIENT: ProjectCredit = {
  org: "Lucas Nocquet",
  role: { en: "Sole developer", es: "Único desarrollador" },
};

const NIMBEX_FULLSTACK: ProjectCredit = {
  org: "Nimbex Labs",
  role: { en: "Full stack, in a team", es: "Full stack, en equipo" },
};

const DANTOFEMA: ProjectCredit = {
  org: "Dantofema",
  role: { en: "In a team", es: "En equipo" },
};

// Ordered: own work first (it sells the strongest — full ownership), then the
// employed work grouped by company. Don't interleave; the grouping is the point.
export const projects: Project[] = [
  {
    id: "cookizza",
    title: "Cookizza",
    description: {
      en: "Production e-commerce for Cookizza, a family-run artisanal cookie shop in Floresta, CABA. A Next.js + Supabase storefront with a build-your-own \"Cookizza\" configurator (base, toppings and sauces chosen slice by slice), a cookie catalog with single cookies and mixed boxes, a persistent cart, an events section, an Instagram feed, and a WhatsApp checkout offering delivery across CABA or pickup in Floresta — plus an admin panel for managing the catalog.",
      es: "E-commerce en producción para Cookizza, un emprendimiento familiar de cookies artesanales en Floresta, CABA. Storefront en Next.js + Supabase con un configurador \"armá tu Cookizza\" (base, toppings y salsas elegidos porción por porción), catálogo de cookies con unidades y cajas surtidas, carrito persistente, sección de eventos, feed de Instagram y checkout por WhatsApp con envíos en CABA o retiro en Floresta, además de un panel de administración para gestionar el catálogo.",
    },
    image: "/projects/cookizza.jpg",
    tags: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind CSS", "Framer Motion", "Vercel", "E-commerce"],
    liveUrl: "https://www.cookizza.com.ar",
    status: "completed",
    featured: true,
    credit: ABK_SOLO,
  },
  {
    id: "papelera-bahia",
    title: "Papelera Bahía",
    description: {
      en: "Production e-commerce for a CABA-based wholesale supplier of disposable food-service and packaging products. A Next.js + Supabase storefront with catalog search, category and material filters, real-time stock, a persistent cart, and a WhatsApp checkout that builds each order server-side with a verified total.",
      es: "E-commerce en producción para un mayorista de descartables gastronómicos y packaging con base en CABA. Storefront en Next.js + Supabase con búsqueda de catálogo, filtros por categoría y material, stock en tiempo real, carrito persistente y checkout por WhatsApp que arma cada pedido del lado del servidor con total verificado.",
    },
    image: "/projects/papelera-bahia.jpg",
    tags: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind CSS", "Framer Motion", "Vercel", "E-commerce"],
    liveUrl: "https://www.papelerabahia.com.ar",
    status: "completed",
    featured: true,
    credit: ABK_SOLO,
  },
  {
    id: "sagis",
    title: "Sagis - Artisanal Bakery E-commerce",
    description: {
      en: "Full-stack e-commerce platform for an artisanal bakery featuring product catalog, shopping cart, Instagram feed integration, and WhatsApp ordering system. Built with modern web technologies and deployed on Vercel.",
      es: "Plataforma de e-commerce full-stack para una panadería artesanal con catálogo de productos, carrito de compras, integración con el feed de Instagram y sistema de pedidos por WhatsApp. Construida con tecnologías web modernas y desplegada en Vercel.",
    },
    image: "/projects/sagis.jpg",
    tags: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind CSS", "Framer Motion", "Vercel", "E-commerce"],
    liveUrl: "https://www.sagis.com.ar/",
    status: "completed",
    featured: true,
    credit: SOLO,
  },
  {
    id: "lucas-nocquet",
    title: "Lucas Nocquet - 3D Artist Portfolio",
    description: {
      en: "Portfolio site for a 3D artist and game designer of virtual simulators. A dark single-page build in Next.js with an EN/ES switch that runs entirely client-side — no routing, no middleware, the choice kept in localStorage — so every string, content included, is typed as a localized pair. The headline project gets a full-width spotlight above the regular grid; the 3D models gallery links each render straight to its Sketchfab viewer; and the skills board, the education timeline and the certifications each get their own section. Static export deployed on Vercel.",
      es: "Sitio de portfolio para un artista 3D y diseñador de juegos de simuladores virtuales. Una single-page oscura hecha en Next.js con un switch EN/ES que corre entero del lado del cliente —sin routing ni middleware, con la elección guardada en localStorage—, así que cada string del sitio, contenido incluido, está tipado como un par localizado. El proyecto principal tiene una tarjeta destacada a todo el ancho arriba de la grilla; la galería de modelos 3D linkea cada render directo a su visor de Sketchfab; y el tablero de skills, la línea de tiempo de formación y las certificaciones tienen cada uno su propia sección. Export estático desplegado en Vercel.",
    },
    image: "/projects/lucas-nocquet.jpg",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "Vercel", "i18n", "Portfolio"],
    liveUrl: "https://lucas-nocquet-portfolio.vercel.app/",
    githubUrl: "https://github.com/FrancoLeoneDev/lucas-nocquet-portfolio",
    status: "completed",
    featured: true,
    credit: LUCAS_CLIENT,
  },
  {
    id: "aifa",
    title: "AiFA - Amateur Football Association",
    description: {
      en: "Institutional platform for AiFA, the largest amateur football association in Argentina: 140+ clubs, 3,600+ registered players and tournaments across four divisions, plus Recopa and Supercopa. I worked mainly on the backend — the disciplinary tribunal, the news portal, the yearbook, and real-time PDF generation for squad lists and match sheets — and also contributed to the frontend. Built at Nimbex Labs together with the team.",
      es: "Plataforma institucional de AiFA, la asociación de fútbol amateur más grande de Argentina: más de 140 clubes, 3.600 jugadores registrados y torneos en cuatro divisiones, además de Recopa y Supercopa. Trabajé principalmente en el backend: el tribunal de disciplina, el portal de noticias, el anuario y la generación de PDFs en tiempo real de planillas de planteles y de partidos. También colaboré en el frontend. Desarrollado en Nimbex Labs junto al equipo.",
    },
    image: "/projects/aifa.jpg",
    tags: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind CSS", "Framer Motion", "Vercel", "Sports Platform"],
    liveUrl: "https://www.aifa.ar/",
    status: "completed",
    featured: true,
    credit: {
      org: "Nimbex Labs",
      role: { en: "Backend, in a team", es: "Backend, en equipo" },
    },
  },
  {
    id: "nimbex-league",
    title: "Nimbex League - Amateur LoL Tournaments",
    description: {
      en: "Competitive tournament platform for amateur League of Legends players in Latin America: persistent teams, 5v5 and 1v1 tournament registration, automatic brackets, scrims, result validation, player profiles with stats, rankings and subscriptions, with email, Discord and in-app notifications. I worked across the full stack with support from the team, at Nimbex Labs.",
      es: "Plataforma de torneos competitivos de League of Legends para jugadores amateur de Latinoamérica: equipos persistentes, inscripción a torneos 5v5 y 1v1, brackets automáticos, scrims, validación de resultados, perfiles de jugador con estadísticas, rankings y suscripciones, con notificaciones por email, Discord e in-app. Lo trabajé full-stack, con el apoyo del equipo, en Nimbex Labs.",
    },
    image: "/projects/nimbex-league.jpg",
    tags: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind CSS", "Framer Motion", "Vercel", "Esports"],
    liveUrl: "https://league.nimbexlabs.com/",
    status: "completed",
    featured: true,
    credit: NIMBEX_FULLSTACK,
  },
  {
    id: "dantofema",
    title: "Dantofema - Software Development Company",
    description: {
      en: "Software development company website showcasing custom development services, consulting, and modernization solutions. Features service portfolio, client showcase, and contact system built with modern web technologies.",
      es: "Sitio web de una empresa de desarrollo de software que muestra servicios de desarrollo a medida, consultoría y soluciones de modernización. Incluye portfolio de servicios, casos de clientes y sistema de contacto, construido con tecnologías web modernas.",
    },
    image: "/projects/placeholder.jpg",
    tags: ["PHP", "Laravel", "MySQL", "JavaScript", "Vue.js"],
    liveUrl: "https://dantofema.ar",
    status: "completed",
    featured: true,
    credit: DANTOFEMA,
  },
  {
    id: "fiplatina",
    title: "FIP Latina Press - Journalism Portal",
    description: {
      en: "News and information portal for the International Federation of Journalists in Latin America. Features journalism news, union updates, campaigns, and syndicated content with a focus on press freedom and journalists' rights.",
      es: "Portal de noticias e información para la Federación Internacional de Periodistas en América Latina. Incluye noticias de periodismo, novedades sindicales, campañas y contenido sindicado, con foco en la libertad de prensa y los derechos de los periodistas.",
    },
    image: "/projects/placeholder.jpg",
    tags: ["Laravel", "PHP", "JavaScript", "CMS"],
    liveUrl: "https://fiplatina.press",
    status: "completed",
    featured: true,
    credit: DANTOFEMA,
  },
];

// The Unity project shown as the "Featured Game" in the Game Dev section.
export const featuredGame: Project = {
  id: "memora",
  title: "Memora - Horror Game Demo",
  // Deliberately says what the game is and not how its mechanics work: the memory
  // dive, the document reading, the in-game PC and the chain examine each have their
  // own card in Gameplay Systems below. Telling it twice makes the short version
  // compete with the detailed one, and the short version loses.
  description: {
    en: "A 90s-era horror game in Unity, in development: a mansion and a hospital to explore, built around old photographs and the memories kept inside them. The puzzles live in the places themselves and the horror events are staged around them. The cards marked Memora further down this section are the systems that make it run.",
    es: "Juego de terror ambientado en los años 90, hecho en Unity y en desarrollo: una mansión y un hospital para explorar, construido alrededor de fotos viejas y los recuerdos que guardan. Los puzzles están en los lugares mismos y los eventos de terror se montan sobre ellos. Las tarjetas marcadas como Memora más abajo en esta sección son los sistemas que lo hacen funcionar.",
  },
  image: "/projects/memora.jpg",
  // Opens on the title card, then the mansion, then the systems the description points at
  // (the photograph, a puzzle, the in-game PC), then the hospital — so the run reads as the
  // game's own arc and not as a folder of screenshots. The gallery advances on its own, which
  // is why the order matters more than it used to. Append here to add more; the carousel's
  // dots and arrows appear on their own past one frame. `caption` is optional and unused here.
  images: [
    // The same logo as `image` above, letterboxed on black at 16:9 instead of cropped from the
    // square: full-bleed cover on a frame this size blew the 640px mark up past its own
    // resolution and cut the drips off the bottom.
    { src: "/projects/memora/title-card.jpg" },
    { src: "/projects/memora/mansion-corridor.jpg" },
    { src: "/projects/memora/mansion-lit-door.jpg" },
    { src: "/projects/memora/photo-examine.jpg" },
    { src: "/projects/memora/bulb-puzzle.jpg" },
    // PNG, not JPEG: flat 90s UI with hard edges, where JPEG ringing shows and the
    // lossless file is no bigger.
    { src: "/projects/memora/pc-inbox.png" },
    { src: "/projects/memora/hospital-corridor.jpg" },
    { src: "/projects/memora/hospital-dark-figure.jpg" },
    { src: "/projects/memora/hospital-nursery.jpg" },
  ],
  tags: ["C#", "Game Development", "Horror"],
  liveUrl: "https://memoraoficial.itch.io/memora",
  status: "in-progress",
  featured: true,
  engine: "unity",
};

/**
 * A game with nothing to show yet. Rendered as a text-only band, never as a card
 * with an empty media slot: a missing image reads as a bug, while a deliberately
 * text-first block reads as an announcement. `status` exists so the stage is said
 * out loud rather than inferred from the absence of screenshots — the reader
 * believes you when you say it is early, and doubts you when they have to guess.
 */
export interface UpcomingGame {
  id: string;
  title: string;
  description: Localized;
  status: Localized;
  /** Id of a gameplay system already published from this game, linked as proof. */
  systemAnchor?: string;
}

export const upcomingGames: UpcomingGame[] = [
  {
    id: "listof20",
    title: "ListOf20",
    description: {
      en: "A detective and deduction game: you arrive at a mansion holding twenty bodies and have to work out, from the guest list, who each one is — whether they were murdered, by whom, and the cause of death. The investigation board is where you photograph what you find and build your own conjectures.",
      es: "Un juego de detective y deducción: llegás a una mansión con veinte cadáveres y tenés que deducir, a partir de la lista de invitados, a quién pertenece cada uno — si fue asesinado, quién lo hizo y la causa de muerte. El tablero de investigación es donde sacás fotos de lo que encontrás y armás tus propias conjeturas.",
    },
    status: {
      en: "Early prototype — no visual material to show yet.",
      es: "Prototipo temprano — todavía sin material visual para mostrar.",
    },
    systemAnchor: "investigation-board",
  },
];

/** Which engine a piece of work was built in. Rendered as a badge — see EngineBadge. */
export type EngineKey = "unreal" | "unity";

// Individual gameplay systems (Unreal Engine C++ or Unity C#). Each maps to a LinkedIn write-up.
// To add a system: append here and drop <id>.mp4 / <id>.jpg into public/systems/.
export interface GameSystem {
  id: string;
  /**
   * Localized, unlike the titles on tools and games: a system's name is a
   * description ("Grid Inventory System"), not a proper noun. Audio Trim and
   * Reparent keep their English names because that is what they are called on
   * GitHub, and Memora is a game's name — those must not be translated.
   */
  title: Localized;
  /**
   * The game this system ships in. Deliberately not a tag: the tag row is
   * technologies, and "Memora" is a different kind of fact — it says the system
   * runs inside a finished game rather than in an isolated demo, which is worth
   * more. Rendered as its own badge opposite the engine badge.
   */
  project?: string;
  description: Localized;
  /**
   * /systems/<id>.jpg — shown as video poster and as fallback when no video.
   * Optional because a system with no on-screen surface has nothing honest to
   * put here: a save system is proved by the game reloading, not by a frame.
   * The card draws a stated placeholder rather than a staged capture.
   */
  poster?: string;
  video?: string; // /systems/<id>.mp4 — optional inline clip
  tags: string[];
  linkedinUrl?: string; // link to the LinkedIn post; button hidden when empty/absent
  /**
   * Deep link into the system's own folder in the published repo, where its README
   * is what GitHub renders. Always /tree/HEAD/<folder>, never /tree/main/: HEAD
   * resolves to whatever the default branch is called, so renaming it later does
   * not rot every link here. Button hidden when empty/absent — the Unreal systems
   * and the ListOf20 board are not in that repo.
   */
  githubUrl?: string;
  engine: EngineKey;
}

export const gameSystems: GameSystem[] = [
  {
    id: "memory-dive",
    title: {
      en: "Memory Dive System",
      es: "Sistema de Inmersión en Recuerdos",
    },
    project: "Memora",
    description: {
      en: "Memora's core mechanic, in Unity (C#): you look at a photograph, hold for three seconds, and you are inside the memory. Through the hold an HDRP custom pass runs a four-stage grade — peripheral vision opens up, the world drains of colour until the photograph is the only living thing left, and at the end everything floods to white — while a custom shader tears a crack of light open in the paper. The light coming out of that crack is not a screen effect: it is a real volumetric point light that lights the room and pulses at 1.5 Hz, in sync with the core of the crack. Past the point of no return, the memory's scene loads additively with its own arrival grade.",
      es: "La mecánica principal de Memora, hecha en Unity (C#): mirás una foto, mantenés apretado tres segundos y entrás adentro del recuerdo. Durante el hold, un custom pass de HDRP corre un grading de cuatro etapas —la visión periférica se abre, el mundo pierde el color hasta que la foto es lo único vivo, y al final todo se inunda de blanco— mientras un shader propio abre una grieta de luz en el papel. La luz que sale de la grieta no es un efecto de pantalla: es un point light volumétrico real que ilumina la habitación y late a 1,5 Hz, sincronizado con el núcleo de la grieta. Al cruzar el punto de no retorno, la escena del recuerdo se carga de forma aditiva con su propio grading de llegada.",
    },
    poster: "/systems/memory-dive.jpg",
    video: "/systems/memory-dive.mp4",
    tags: ["C#", "HDRP Custom Pass", "Shaders", "Additive Loading"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/01-memory-dive",
    engine: "unity",
  },
  {
    id: "document-reading",
    title: {
      en: "Document Reading System",
      es: "Sistema de Lectura de Documentos",
    },
    project: "Memora",
    description: {
      en: "A note and document reading system in Unity (C#): the paper never moves, and it never teleports into the player's hand. The camera fades to black, reappears in front of the document where it actually sits, and comes back the same way, with a side panel holding the transcription and the inspection light on for dark rooms. The core decision was to never interpolate the camera — every move is a fade over an instant teleport, because in first person a camera lerp the player does not control reads as sloppy and makes people queasy. It replaces three earlier systems with one.",
      es: "Sistema de lectura de notas y documentos en Unity (C#): el papel nunca se mueve ni se teletransporta a la mano del jugador. La cámara hace un fade a negro, reaparece frente al documento donde está realmente, y vuelve del mismo modo, con un panel lateral que muestra la transcripción y la luz de inspección encendida para cuartos oscuros. La decisión central fue no interpolar la cámara en ningún momento: todo el movimiento son fades sobre teleports instantáneos, porque en primera persona un lerp de cámara que el jugador no controla se lee sucio y marea. Unifica tres sistemas anteriores en uno.",
    },
    poster: "/systems/document-reading.jpg",
    video: "/systems/document-reading.mp4",
    tags: ["C#", "First-Person Camera", "UI"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/07-document-reading",
    engine: "unity",
  },
  {
    id: "in-game-pc",
    title: {
      en: "In-Game PC System",
      es: "Sistema de PC Dentro del Juego",
    },
    project: "Memora",
    description: {
      en: "A working computer inside the game, in Unity (C#): you sit down, it boots with its own sound, the screen swaps material and lights the room, and it asks for a password you work out by exploring the house. Inside there are mail and photo sections and a security-camera circuit that renders real cameras from the scene, each with its own feed. The whole desktop — windows, icons, taskbar — is built on Canvas. Every piece of state (password solved, section open, what you have read) persists through ISaveable, and it drives a printer that first needs you to find paper.",
      es: "Una computadora funcional dentro del juego, hecha en Unity (C#): te sentás, arranca con su sonido de booteo, la pantalla cambia de material y prende su propia luz, y te pide una contraseña que se deduce explorando la casa. Adentro hay secciones de mail, de fotos y un circuito de cámaras de seguridad que renderiza cámaras reales de la escena, cada una con su propia señal. Todo el escritorio —ventanas, iconos, barra de tareas— está hecho en Canvas. Todo el estado (contraseña resuelta, sección abierta, qué leíste) persiste vía ISaveable, y está conectada a una impresora que primero necesita que le consigas papel.",
    },
    poster: "/systems/in-game-pc.jpg",
    video: "/systems/in-game-pc.mp4",
    tags: ["C#", "Canvas / uGUI", "Render Textures", "Save System"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/08-in-game-pc",
    engine: "unity",
  },
  {
    id: "chain-examine",
    title: {
      en: "Chain Examine System",
      es: "Sistema de Inspección Encadenada",
    },
    project: "Memora",
    description: {
      en: "Object inspection with sub-elements in Unity (C#): what you are holding can carry parts you interact with without putting it down. A painting comes off the wall; you pick it up, rotate it, and inside the broken frame there is a photograph you take and keep. While something inside is still unresolved, the container blocks the exit — you cannot drop the object until you have dealt with what it holds. Sub-elements live on their own raycast layer.",
      es: "Inspección de objetos con sub-elementos, hecha en Unity (C#): lo que tenés en la mano puede tener partes con las que interactuás sin soltarlo. Se cae un cuadro de la pared; lo levantás, lo rotás, y dentro del marco roto hay una foto que sacás y te quedás. Mientras haya algo pendiente adentro, el contenedor bloquea la salida: no podés soltar el objeto hasta resolver lo que tiene. Los sub-elementos viven en su propia layer de raycast.",
    },
    poster: "/systems/chain-examine.jpg",
    video: "/systems/chain-examine.mp4",
    tags: ["C#", "Raycasting", "Interaction"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/06-chain-examine",
    engine: "unity",
  },
  {
    id: "inventory",
    title: {
      en: "Inventory System",
      es: "Sistema de Inventario",
    },
    project: "Memora",
    description: {
      en: "An inventory in Unity (C#) you open at any point to go back over what you have found and inspect it again unhurried: each object is shown in 3D, you rotate it with the mouse over the blurred background and read it alongside its description. The categories are defined by the game — three here, because they are the ones the story needs: usable objects, notes and photographs. All of it persists through the save system, and the photographs can be entered from here too, straight into their memory.",
      es: "Inventario hecho en Unity (C#) que abrís en cualquier momento para repasar lo que conseguiste y volver a inspeccionarlo con calma: cada objeto se muestra en 3D, lo rotás con el mouse sobre el fondo difuminado y lo leés con su descripción al lado. Las categorías las define el juego; en este caso son tres, porque son las que la historia necesita: objetos utilizables, notas y fotos. Todo persiste en el sistema de guardado, y a los recuerdos de las fotos también se entra desde acá.",
    },
    poster: "/systems/inventory.jpg",
    video: "/systems/inventory.mp4",
    tags: ["C#", "UI", "3D Preview", "Save System"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/05-inventory",
    engine: "unity",
  },
  {
    id: "interactions-menu",
    title: {
      en: "Interactions Menu System",
      es: "Sistema de Menú de Interacciones",
    },
    project: "Memora",
    description: {
      en: "A key and item-selection system in Unity (C#): interact with a locked door and the camera moves in on the lock where it stands, opening a 3x3 grid of the inventory in miniature. You pick with WASD and use with space; a wrong item returns a red flash without throwing you out of the menu, and the right key is consumed, travels to the mouth of the lock and turns. The menu is generic — anything in the world that implements IMenuInteractable uses it, doors, printer, lamp — and each one returns its own verdict on whether the item fit.",
      es: "Sistema de llaves y selector de objetos hecho en Unity (C#): al interactuar con una puerta trabada, la cámara se acerca a la cerradura in situ y se abre una grilla de 3×3 con el inventario en miniatura. Elegís con WASD y usás con espacio; un objeto incorrecto devuelve un flash rojo sin sacarte del menú, y la llave correcta se consume, viaja hasta la boca de la cerradura y gira. El menú es genérico: cualquier objeto del mundo que implemente IMenuInteractable lo usa —puertas, impresora, lámpara— y cada uno devuelve su propio veredicto de si el ítem servía.",
    },
    poster: "/systems/interactions-menu.jpg",
    video: "/systems/interactions-menu.mp4",
    tags: ["C#", "Interface-Driven", "UI", "Inventory"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/04-interactions-menu",
    engine: "unity",
  },
  {
    id: "scripted-set-piece",
    title: {
      en: "Scripted Set-Piece System",
      es: "Sistema de Set-Pieces Scripteados",
    },
    project: "Memora",
    description: {
      en: "A framework for scripted set-pieces in Unity (C#): a persistent base class that fires when the player looks towards a point and then orchestrates independent actuators — a warm-light fader, a dying lamp, a desaturation volume, a micro-movement oscillator, the dissociation effect — each one unaware of the others. The moment in the clip is six phases: the corridor's four warm lights die in parallel, the hanging lamp agonises in warm and comes back cold, revealing a figure at the far end, and the audio riser is tuned so its peak lands on the exact frame where the hospital ceiling appears over the house. The composition rule was that the hospital is the noun, the grade is the adjective and the dissociation is the verb, and that everything converges on a single downbeat. The last phase hides the reset under a blink: when you open your eyes the house is normal again and the figure is gone.",
      es: "Framework de set-pieces scripteados hecho en Unity (C#): una clase base persistente que se dispara cuando el jugador mira hacia un punto y orquesta actuadores independientes —un fader de luces cálidas, una lámpara que agoniza, un volumen de desaturación, un oscilador de micro-movimiento, el efecto de disociación—, cada uno ignorante de los demás. El momento del video son seis fases: las cuatro luces cálidas del pasillo mueren en paralelo, la lámpara colgante agoniza en cálido y vuelve a encender fría, revelando una figura al fondo, y el riser de audio está tuneado para que su pico caiga clavado en el mismo frame en que el techo del hospital aparece sobre la casa. La regla de composición fue que el hospital es el sustantivo, el grade el adjetivo y la disociación el verbo, y que todo converja en un solo downbeat. La fase final esconde el reset debajo de un parpadeo del personaje: cuando abrís los ojos la casa volvió a la normalidad y la figura no está.",
    },
    poster: "/systems/scripted-set-piece.jpg",
    video: "/systems/scripted-set-piece.mp4",
    tags: ["C#", "Sequencing", "Lighting", "Audio Sync"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/09-scripted-set-piece",
    engine: "unity",
  },
  {
    id: "physics-door",
    title: {
      en: "Physics Door System",
      es: "Sistema de Puertas Físicas",
    },
    project: "Memora",
    description: {
      en: "Doors with no open button, in Unity (C#): the leaf is a Rigidbody on a HingeJoint and you push it with your body as you walk, so it swings differently depending on where you touch it and how hard. The rule the system runs on is that continuous interaction is physics and the discrete verb is animation — pushing is physics, but the slam when you run in and the close on a key press are animations, so they look the same every time. It covers locked-door feedback, collision layers that follow the state of the leaf, and optional auto-close through JointSpring. On closing, the door sweeps its own path: if you are standing in the doorway it stays open instead of passing through you.",
      es: "Puertas sin botón de abrir, hechas en Unity (C#): la hoja es un Rigidbody con HingeJoint y la empujás con el cuerpo al caminar, así que gira distinto según dónde y con cuánta fuerza la toques. La regla del sistema es que la interacción continua es física y el verbo discreto es animación: empujar es física, pero el portazo al entrar corriendo y el cierre con la tecla son animaciones, para que se vean iguales siempre. Incluye feedback de puerta trabada, capas de colisión que siguen el estado de la hoja y auto-cierre opcional por JointSpring. Al cerrar, la puerta chequea su propio barrido: si estás parado en el vano, no cierra en vez de atravesarte.",
    },
    poster: "/systems/physics-door.jpg",
    video: "/systems/physics-door.mp4",
    tags: ["C#", "Physics", "HingeJoint", "Collision Layers"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/02-physics-door",
    engine: "unity",
  },
  {
    id: "save-system",
    title: {
      en: "Save System",
      es: "Sistema de Guardado",
    },
    project: "Memora",
    description: {
      en: "A JSON save system in Unity (C#): every object in the world decides what persists by implementing an interface, and a component with a stable GUID collects the state of everything sitting on it. It writes to a temporary file first and uses File.Replace, which is atomic and produces the backup in the same operation — if the main file is missing or fails to parse, it recovers itself from the backup. Restoring is multi-pass with a hard cap, because restoring one object can create another: the printer turns a photo on, the lamp instantiates a bulb, and those new arrivals need their state too. It includes a gate that suspends saving while a scripted sequence is running, so no checkpoint can land halfway through a moment and leave the game in an inconsistent state.",
      es: "Sistema de guardado en JSON hecho en Unity (C#): cada objeto del mundo decide qué persiste implementando una interfaz, y un componente con GUID estable recolecta el estado de todo lo que tiene encima. Escribe primero a un temporal y usa File.Replace, que es atómico y genera el backup en la misma operación — si el archivo principal falta o no parsea, se recupera solo del backup. La restauración es multi-pasada con tope duro, porque restaurar un objeto puede crear otro: la impresora enciende una foto, la lámpara instancia un bulbo, y esos aparecidos también necesitan su estado. Incluye una compuerta que suspende el guardado mientras corre una secuencia scripteada, para que ningún checkpoint caiga a mitad de un momento y deje la partida en un estado inconsistente.",
    },
    // No poster and no video on purpose: this one never appears on screen.
    tags: ["C#", "JSON Serialization", "Atomic Writes", "Interface-Driven"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/10-save-system",
    engine: "unity",
  },
  {
    id: "investigation-board",
    title: {
      en: "Investigation Board System",
      es: "Sistema de Tablero de Investigación",
    },
    project: "ListOf20",
    description: {
      en: "The core mechanic of an investigation game in Unity (C#): photograph clues, pin them to a cork board, and link them with red thread to reconstruct the case. The threads are a physically-simulated Verlet rope running on the UI's own real-time clock, so they keep swinging while the board freezes game time (timeScale = 0). Built entirely with UI Toolkit.",
      es: "La mecánica principal de un juego de investigación en Unity (C#): fotografiás las pistas, las pinchás en un tablero de corcho y las conectás con hilo rojo para reconstruir el caso. Los hilos son una cuerda Verlet simulada físicamente que corre en el reloj propio de la UI en tiempo real, así que se siguen balanceando aunque el tablero congele el tiempo de juego (timeScale = 0). Todo hecho con UI Toolkit.",
    },
    poster: "/systems/investigation-board.jpg",
    video: "/systems/investigation-board.mp4",
    tags: ["C#", "UI Toolkit", "Gameplay"],
    linkedinUrl:
      "https://www.linkedin.com/posts/franco-leone-294511242_unity-unity3d-gamedev-ugcPost-7486164897823830016-PsUL",
    engine: "unity",
  },
  {
    id: "grid-inventory",
    title: {
      en: "Grid Inventory System",
      es: "Sistema de Inventario en Grilla",
    },
    description: {
      en: "A Tetris-style grid inventory built in Unreal Engine with C++: items occupy multiple cells with drag-and-drop placement, rotation, and stacking, backed by fast slot lookup and collision checks.",
      es: "Un inventario en grilla estilo Tetris hecho en Unreal Engine con C++: los ítems ocupan múltiples celdas con colocación por drag-and-drop, rotación y apilado, con búsqueda rápida de slots y chequeo de colisiones.",
    },
    poster: "/systems/grid-inventory.jpg",
    video: "/systems/grid-inventory.mp4",
    tags: ["C++", "UE5", "Gameplay"],
    linkedinUrl:
      "https://www.linkedin.com/posts/franco-leone-294511242_unrealengine-ue5-gamedev-ugcPost-7482871303042150401-wwiF",
    engine: "unreal",
  },
  {
    id: "object-inspection",
    title: {
      en: "Object Inspection System",
      es: "Sistema de Inspección de Objetos",
    },
    description: {
      en: "A first-person object inspection system in Unreal Engine with C++: pick up and rotate props in 3D to examine them, with smooth camera focus and highlight-on-hover.",
      es: "Un sistema de inspección de objetos en primera persona en Unreal Engine con C++: agarrá y rotá props en 3D para examinarlos, con enfoque de cámara suave y resaltado al pasar el mouse.",
    },
    poster: "/systems/object-inspection.jpg",
    video: "/systems/object-inspection.mp4",
    tags: ["C++", "UE5", "Gameplay"],
    linkedinUrl:
      "https://www.linkedin.com/posts/franco-leone-294511242_unrealengine-ue5-gamedev-activity-7453919156778725376-Z6mx",
    engine: "unreal",
  },
];

/**
 * One screenshot in a tool's gallery. `width`/`height` are the file's natural size and are not
 * optional: the gallery renders at 1:1 or smaller and never upscales, because these are editor
 * UI captures whose 11px text turns to mush the moment it is scaled up.
 */
export interface ToolShot {
  src: string;
  width: number;
  height: number;
  caption: Localized;
}

/**
 * An editor extension — tooling that speeds up building, as opposed to a gameplay system that
 * ships in the game. Rendered as a full-width row, because the interface is the whole argument
 * and it does not survive a 1/3-width grid cell.
 *
 * To add one: append here and drop the captures into public/tools/<id>/. Keep them PNG — the
 * static export serves them unoptimized, and JPEG destroys UI text.
 */
export interface EditorTool {
  id: string;
  title: string;
  engine: EngineKey;
  problem: Localized; // why the tool exists; shown above the description
  description: Localized;
  shots: ToolShot[];
  tags: string[]; // engine deliberately omitted — the badge already says it
  linkedinUrl?: string; // button hidden when empty/absent
  githubUrl?: string; // idem — not every tool has a public repo
}

/**
 * Internal tooling, as opposed to `editorTools`, which are published on GitHub
 * under MIT. Split into its own block because the two answer different questions:
 * one is "what I release", the other is "how I work".
 *
 * It carries `media` rather than `shots` because these are usually argued in
 * motion — a tool whose whole point is that it saves you half an hour is proved
 * by watching the wait not happen, which no screenshot can show.
 */
export interface DebugTool {
  id: string;
  title: string;
  engine: EngineKey;
  problem: Localized;
  description: Localized;
  media: MediaItem[];
  tags: string[];
  githubUrl?: string;
  linkedinUrl?: string;
}

// Empty renders nothing — the block stays hidden until there is a tool in it.
export const debugTools: DebugTool[] = [
  {
    id: "unit-tests",
    title: "Unit Test Suite",
    engine: "unity",
    problem: {
      en: "Some logic can be verified neither by reading it nor by playing it. Whether an event fires once in so many runs, whether a cooldown really holds, whether the rationing of scares survives a long session — playing it thirty times does not separate a wrong probability from bad luck.",
      es: "Hay lógica que no se puede verificar ni leyéndola ni jugando. Si un evento sale una vez cada tantas, si un cooldown corta de verdad, si el racionamiento de sustos aguanta un recorrido largo: jugarlo treinta veces no alcanza para distinguir una probabilidad mal puesta de la mala suerte.",
    },
    description: {
      en: "98 EditMode tests over exactly that logic: probabilistic event selection, per-source-type cooldowns, scare rationing, phase gating and an absence budget. To make it testable, the director's engine was written as pure C# with no UnityEngine, taking the clock, the randomness source and the opportunity probe as injected dependencies: in production it gets Unity's clock, in the tests a fake one that jumps time forward. That same decision is what later enabled the match simulator — being able to run 100 thirty-three-minute playthroughs without entering Play comes from the engine never having depended on Time.time.",
      es: "98 tests en EditMode sobre exactamente esa lógica: selección probabilística de eventos, cooldowns por tipo de fuente, racionamiento de sustos, gating por fases y presupuesto por ausencia. Para que fuera testeable, el motor del director se escribió como C# puro, sin UnityEngine, recibiendo inyectados el reloj, la fuente de aleatoriedad y el sondeo de oportunidad: en producción entra el reloj de Unity, en los tests uno falso que adelanta el tiempo de golpe. Esa misma decisión es la que después habilitó el simulador de partidas: poder correr 100 recorridos de 33 minutos sin entrar a Play sale de que el motor nunca dependió de Time.time.",
    },
    media: [
      {
        type: "video",
        src: "/debug/unit-tests/clip.mp4",
        poster: "/debug/unit-tests/clip.jpg",
        caption: {
          en: "The whole suite running green, without the game ever entering Play.",
          es: "La suite entera corriendo en verde, sin que el juego entre a Play nunca.",
        },
      },
      {
        type: "image",
        src: "/debug/unit-tests/runner.jpg",
        caption: {
          en: "145 in the runner: 98 over the game's director logic, plus the suites that ship with Audio Trim and Reparent.",
          es: "145 en el runner: 98 sobre la lógica del director del juego, más las suites que vienen con Audio Trim y Reparent.",
        },
      },
    ],
    tags: ["C#", "EditMode Tests", "Dependency Injection", "Pure C# Core"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/director-core",
  },
  {
    id: "lock-editor",
    title: "Lock Editor",
    engine: "unity",
    problem: {
      en: "The key fact was invisible: the point where the key ends up is a world-space offset added to the spawn — three numbers in the Inspector and nothing on screen. The only way to know whether the key went into the lock or buried itself in the wood was to enter Play, look, leave and correct, door by door.",
      es: "El dato clave era invisible: el punto donde termina la llave es un offset en coordenadas de mundo que se le suma al spawn, tres números en el Inspector y nada que ver en pantalla. La única forma de saber si la llave entraba en la cerradura o se clavaba en la madera era entrar a Play, mirar, salir y corregir, puerta por puerta.",
    },
    description: {
      en: "A custom editor for the locks: that point is now a handle you drag in the Scene view, with the key drawn at its origin and at its destination, the path between the two and the arc of the turn, plus a button that plays the whole animation without entering Play.",
      es: "Editor propio para las cerraduras: ese punto ahora es un handle que arrastrás en la Scene view, con la llave dibujada en el origen y en el destino, la trayectoria entre ambos y el arco de giro, más un botón que reproduce la animación completa sin entrar a Play.",
    },
    media: [
      {
        type: "video",
        src: "/debug/lock-editor/clip.mp4",
        poster: "/debug/lock-editor/clip.jpg",
        caption: {
          en: "The handle dragged against the Inspector that used to be the only way in.",
          es: "El handle arrastrándose, contra el Inspector que antes era la única vía.",
        },
      },
      {
        type: "image",
        src: "/debug/lock-editor/handles.jpg",
        caption: {
          en: "\"Sale acá\" and \"entra acá\": the offset stops being three numbers and becomes two points you can grab.",
          es: "«Sale acá» y «entra acá»: el offset deja de ser tres números y pasa a ser dos puntos que se agarran.",
        },
      },
    ],
    tags: ["C#", "Custom Editor", "Scene Handles", "Level Authoring"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/03-key-and-lock",
  },
  {
    id: "authoring-gizmos",
    title: "Authoring Gizmos",
    engine: "unity",
    problem: {
      en: "Tuning how an event moves — how far it turns, where it falls, how much spread it has — meant entering Play to see the result, leaving, nudging a number blind and going round again. In the Scene view a well-configured object and a broken one looked exactly alike.",
      es: "Ajustar cómo se mueve un evento —cuánto gira, hacia dónde cae, con cuánta dispersión— obligaba a entrar a Play para ver el resultado, salir, tocar un número a ciegas y repetir. En la Scene view un objeto bien configurado y uno roto se veían exactamente igual.",
    },
    description: {
      en: "Authoring gizmos that show in the Scene view what an event is going to do before you ever enter Play: which way an object turns, moves or falls, and with how much spread, without playing it. The cyan ghosts are the poses it will end up in.",
      es: "Gizmos de autoría que muestran en la Scene view qué va a hacer un evento antes de entrar a Play: hacia dónde gira, se desplaza o cae un objeto y con cuánta dispersión, sin tener que jugar. Los fantasmas celestes son las poses donde va a terminar.",
    },
    media: [
      {
        type: "image",
        src: "/debug/authoring-gizmos/1.jpg",
        caption: {
          en: "A chair and the poses it can settle into: the spread is visible as a range, not guessed from a number in the Inspector.",
          es: "Una silla y las poses en las que puede terminar: la dispersión se ve como un rango, no se adivina desde un número en el Inspector.",
        },
      },
      {
        type: "image",
        src: "/debug/authoring-gizmos/2.jpg",
        caption: {
          en: "A painting rigged to fall: the ghosts carry the rotation it can take, and the arrow marks where it lands.",
          es: "Un cuadro preparado para caerse: los fantasmas llevan la rotación que puede tomar y la flecha marca por dónde cae.",
        },
      },
    ],
    tags: ["C#", "Editor Scripting", "Scene Gizmos", "Level Authoring"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/editor-tools",
  },
  {
    id: "jump-to",
    title: "Jump To",
    engine: "unity",
    problem: {
      en: "Checking a change late in the demo meant playing the demo to get there. Thirty-three minutes per iteration, which in practice means you stop iterating: you convince yourself the change is probably fine rather than sit through it again.",
      es: "Verificar un cambio del final de la demo significaba jugar la demo hasta ahí. Treinta y tres minutos por iteración, que en la práctica es dejar de iterar: te convencés de que el cambio seguramente está bien en vez de bancarte el recorrido otra vez.",
    },
    description: {
      en: "A Unity editor tool that boots the game straight into any point of the demo: you pick the memory and the moment from the menu, and seconds later you are standing there with every object the player would be carrying by then — so you test against real state and not an invented one. It is not a teleport. It skips the intro with the flag the game already had, waits for the player and the managers to exist, and loads the memory through the same path the game uses. Loading additively by hand would leave internal state in some arbitrary shape and send you chasing bugs that exist only because of the tool. It lives in Assets/Editor: it does not exist in the build.",
      es: "Herramienta de editor de Unity que arranca el juego directo en cualquier momento de la demo: elegís el recuerdo y el momento en el menú, y a los pocos segundos estás parado ahí con todos los objetos que el jugador tendría a esa altura del juego, así probás sobre el estado real y no sobre uno inventado. No es un teleport: saltea la intro con el flag que el juego ya tenía, espera a que existan el jugador y los managers, y carga el recuerdo por el mismo camino que usa el juego. Una carga aditiva a mano dejaría el estado interno en cualquier cosa y te haría perseguir bugs que existen solo por culpa de la herramienta. Vive en Assets/Editor: no existe en la build.",
    },
    media: [
      {
        type: "video",
        src: "/debug/jump-to/clip.mp4",
        poster: "/debug/jump-to/clip.jpg",
        caption: {
          en: "From the menu to standing inside the chosen memory, in one unbroken take.",
          es: "Del menú a estar parado dentro del recuerdo elegido, en una sola toma sin cortes.",
        },
      },
      {
        type: "image",
        src: "/debug/jump-to/menu.jpg",
        caption: {
          en: "The entry points, one menu item each: every memory and the house, each with its own moments.",
          es: "Los puntos de entrada, uno por ítem de menú: cada recuerdo y la casa, cada uno con sus momentos.",
        },
      },
    ],
    tags: ["C#", "Editor Scripting", "Scene Loading", "Iteration Speed"],
    githubUrl:
      "https://github.com/FrancoLeoneDev/unity-gameplay-systems-memora/tree/HEAD/editor-tools",
  },
];

// Newest first: the most recent tool is the one worth landing on.
export const editorTools: EditorTool[] = [
  {
    id: "audio-trim",
    title: "Audio Trim",
    engine: "unity",
    problem: {
      en: "Memora's generated sounds arrive exported to a fixed duration and padded with silence — a 3-second file whose sound dies at one and a half. That isn't just ugly: several gestures derive their duration from clip length, so a door set to open \"for as long as its creak lasts\" kept moving, silently, through all the padding.",
      es: "Los sonidos generados de Memora salen exportados a una duración fija y rellenados con silencio: un archivo de 3 segundos donde el sonido muere al segundo y medio. No es solo feo: la duración de varios gestos se deriva del largo del clip, así que una puerta que se abre «lo que dura su crujido» seguía moviéndose, en silencio, durante todo el relleno.",
    },
    description: {
      en: "A Unity editor extension in C# that does what no external editor can: the trimmed file inherits the original's .meta — same GUID, same import settings — so every prefab and scene that referenced the clip resolves to the new file without being touched. Silence detection proposes the cut instead of imposing it; both markers drag on the waveform, and the play button gives you exactly the range that will be written, with a playhead running over it. Per-clip fades default to 2 ms — inaudible, there only to kill the click any hard cut leaves behind. A whole folder goes at once, always behind a mandatory preview. Output is hand-written 16-bit PCM WAV, because Unity reads mp3 but cannot encode it. Free under MIT and editor-only: the assembly isn't compiled into player builds, so there's zero weight and zero runtime cost.",
      es: "Una extensión de editor para Unity en C# que hace lo que ninguna herramienta externa puede: el archivo recortado hereda el .meta del original, con el mismo GUID y los mismos import settings, así que todo prefab y escena que usaba ese clip sigue funcionando sin tocar nada. La detección de silencio propone el corte, no lo impone: los dos marcadores se mueven a mano sobre la forma de onda, y el botón de play reproduce exactamente el tramo que se va a escribir, con un cabezal corriendo sobre ella. Los fades por clip vienen en 2 ms: no se escuchan, están para matar el click que deja cualquier corte seco. Una carpeta entera se procesa de una vez, siempre detrás de un preview obligatorio. La salida es WAV PCM de 16 bits escrito a mano, porque Unity lee mp3 pero no puede codificarlo. Gratis con licencia MIT y editor-only: el assembly ni siquiera se compila en los builds del juego, así que no pesa ni corre nada en runtime.",
    },
    shots: [
      {
        src: "/tools/audio-trim/1.png",
        width: 1200,
        height: 1200,
        caption: {
          en: "Audio Trim: trim audio clips in Unity without breaking a single reference in the project.",
          es: "Audio Trim: recortar clips de audio en Unity sin romper una sola referencia del proyecto.",
        },
      },
      {
        src: "/tools/audio-trim/2.png",
        width: 1200,
        height: 1200,
        caption: {
          en: "Generated audio arrives padded to a fixed length — 40% of this 1.01 s file is silence. Detection places the two markers; you drag them from there.",
          es: "El audio generado llega rellenado a una duración fija: el 40% de este archivo de 1,01 s es silencio. La detección coloca los dos marcadores y de ahí los movés vos.",
        },
      },
      {
        src: "/tools/audio-trim/3.png",
        width: 1200,
        height: 1200,
        caption: {
          en: "Why every clip gets 2 ms of fade by default: cutting where the wave isn't at zero makes the speaker cone snap back, and that is heard as a click.",
          es: "Por qué cada clip lleva 2 ms de fade por defecto: cortar donde la onda no está en cero hace que el cono del parlante vuelva de golpe, y eso se escucha como un click.",
        },
      },
      {
        src: "/tools/audio-trim/4.png",
        width: 1200,
        height: 1200,
        caption: {
          en: "A whole folder loads at once, each clip with its own proposed cut and its own checkbox. Nothing is written before you have seen the preview.",
          es: "Una carpeta entera carga de una vez, cada clip con su corte propuesto y su propio checkbox. Nada se escribe antes de que hayas visto el preview.",
        },
      },
      {
        src: "/tools/audio-trim/5.png",
        width: 1200,
        height: 1200,
        caption: {
          en: "Free under MIT and editor-only: no dependencies, and the assembly is not compiled into player builds at all.",
          es: "Gratis con licencia MIT y editor-only: sin dependencias, y el assembly no se compila en los builds del juego.",
        },
      },
    ],
    tags: ["C#", "Editor Scripting", "Audio Pipeline", "WAV Encoding"],
    linkedinUrl:
      "https://www.linkedin.com/posts/franco-leone-294511242_unity-gamedev-indiedev-activity-7490455826336305153-6vCC",
    githubUrl: "https://github.com/FrancoLeoneDev/audio-trim",
  },
  {
    id: "reparent",
    title: "Reparent",
    engine: "unity",
    problem: {
      en: "In a scene with 300+ objects, Unity's default reparenting means dragging a row across a hierarchy whose target is scrolled off-screen — slow, easy to drop in the wrong place, and painful to repeat.",
      es: "En una escena con más de 300 objetos, el reparentado por defecto de Unity es arrastrar una fila por una jerarquía cuyo destino está fuera de pantalla: lento, fácil de soltar donde no va, y molesto de repetir.",
    },
    description: {
      en: "A Unity editor extension in C# that adds a Parent field to the Inspector header — right where Unity should have put it, instead of behind another window. Three ways in: the field itself, a right-click entry on the object, or Ctrl+Shift+H. Typing searches the whole hierarchy with subsequence matching, so mscm resolves to Mesa_Comedor, and every result carries its full path so repeated names stay unambiguous. If the parent doesn't exist yet, you create it and group into it without leaving the field. It works on multi-selections, a toggle controls whether world position survives the move, and every reparent is one Ctrl+Z away.",
      es: "Una extensión de editor para Unity en C# que agrega un campo Parent en el header del Inspector, justo donde Unity debería haberlo puesto en vez de escondido detrás de otra ventana. Se llega de tres formas: el campo mismo, una entrada con click derecho sobre el objeto, o Ctrl+Shift+H. Al escribir busca en toda la jerarquía con matching por subsecuencia, así mscm resuelve a Mesa_Comedor, y cada resultado muestra su path completo para que los nombres repetidos nunca queden ambiguos. Si el padre todavía no existe, lo creás y agrupás sin salir del campo. Funciona con selección múltiple, un toggle controla si la posición world sobrevive al movimiento, y cada reparentado se deshace con un solo Ctrl+Z.",
    },
    shots: [
      {
        src: "/tools/reparent/1.png",
        width: 598,
        height: 405,
        caption: {
          en: "The problem: 300+ objects in the hierarchy. Mesa_SinUbicar sits at the bottom while its intended parent is scrolled out of view.",
          es: "El problema: más de 300 objetos en la jerarquía. Mesa_SinUbicar está al fondo mientras su padre queda fuera de pantalla.",
        },
      },
      {
        src: "/tools/reparent/2.png",
        width: 657,
        height: 128,
        caption: {
          en: "The Parent field, injected into the Inspector header below Tag and Layer. No extra window, no separate workflow.",
          es: "El campo Parent, inyectado en el header del Inspector debajo de Tag y Layer. Sin ventana aparte ni flujo separado.",
        },
      },
      {
        src: "/tools/reparent/3.png",
        width: 515,
        height: 432,
        caption: {
          en: "Typing filters the entire hierarchy, and each result shows its full path — so a scene full of repeated names stays unambiguous.",
          es: "Al escribir se filtra toda la jerarquía, y cada resultado muestra su path completo: una escena llena de nombres repetidos deja de ser ambigua.",
        },
      },
      {
        src: "/tools/reparent/4.png",
        width: 521,
        height: 432,
        caption: {
          en: "Subsequence matching: mscm resolves to Mesa_Comedor. And if the parent doesn't exist yet, create it and group into it inline.",
          es: "Matching por subsecuencia: mscm resuelve a Mesa_Comedor. Y si el padre todavía no existe, lo creás y agrupás ahí mismo.",
        },
      },
      {
        src: "/tools/reparent/5.png",
        width: 602,
        height: 407,
        caption: {
          en: "Result: the object lands under Comedor and the hierarchy reads cleanly again.",
          es: "Resultado: el objeto queda bajo Comedor y la jerarquía vuelve a leerse ordenada.",
        },
      },
    ],
    tags: ["C#", "Editor Scripting", "Inspector Extension", "Fuzzy Search"],
    linkedinUrl:
      "https://www.linkedin.com/posts/franco-leone-294511242_unity-unity3d-gamedev-ugcPost-7488706774393425920-1KnB",
    githubUrl: "https://github.com/FrancoLeoneDev/reparent",
  },
];

/**
 * Which Photon Fusion topology a prototype runs. The pair is the point: the same
 * prototype under both models is what shows the decision, so keep them together.
 */
export type NetworkTopology = "shared" | "host";

/**
 * A networked prototype. Separate from GameSystem because the thing being shown
 * is an architecture choice, not a mechanic — hence `topology`, and links to a
 * repo (where the netcode actually is) rather than to a LinkedIn write-up.
 *
 * `buildUrl` is optional and should only be set when a lone visitor can reach a
 * running session — opening two tabs into the same room. A build that needs two
 * coordinated players shows an empty room and reads as broken.
 */
export interface MultiplayerProject {
  id: string;
  title: string;
  topology: NetworkTopology;
  description: Localized;
  /** Where it came from — coursework, own prototype. Shown as a small credit line. */
  context?: Localized;
  /** Clip first, stills after: the clip is the proof, the stills are the detail. */
  media: MediaItem[];
  tags: string[];
  githubUrl?: string;
  build?: BuildLink;
  engine: EngineKey;
}

/**
 * A runnable artifact. `kind` decides the wording, and it matters: a browser build
 * you click into and a 25 MB executable you download are different promises, and
 * labelling the second one "Play" is how you annoy the person who clicked.
 * `platform` and `size` are shown next to the link so nobody clicks blind.
 */
/**
 * One slide of a prototype's gallery. `caption` is required, not decorative: on a
 * grid of near-identical client windows the caption is what tells the reader what
 * they are supposed to be noticing.
 */
export interface MediaItem {
  type: "video" | "image";
  src: string;
  /** Videos only — the still shown before playback and in the thumbnail strip. */
  poster?: string;
  caption: Localized;
}

export interface BuildLink {
  url: string;
  kind: "play" | "download";
  platform?: string;
  size?: string;
}

// Empty renders nothing — the block is hidden until there is something in it.
// The two entries are a deliberate pair: same engine, same stack, opposite network
// topologies. Each description names the other's repo, so a reader landing on one
// card knows the other exists. Keep that cross-reference if you edit the copy.
export const multiplayerProjects: MultiplayerProject[] = [
  {
    id: "fusion-host",
    title: "Fusion Arena",
    topology: "host",
    description: {
      en: "Online last-player-standing arena for four players, built with Unity and Photon Fusion 2. Movement, fire, dash and shield all travel through a single tick-aligned input struct; transforms sync via NetworkRigidbody3D and projectile lifetimes run on TickTimer rather than Unity's own clock. Runs on Fusion's Host Mode with the host as sole state authority — the authoritative counterpart to the Shared Mode architecture in Prototype-Network-Fusion-Shared — verified with four simultaneous clients.",
      es: "Arena multijugador online de último jugador en pie para cuatro jugadores, hecha en Unity con Photon Fusion 2. Movimiento, disparo, dash y escudo viajan en una única estructura de input alineada al tick; los transforms se sincronizan con NetworkRigidbody3D y la vida de los proyectiles corre sobre TickTimer y no sobre el reloj propio de Unity. Corre en Host Mode de Fusion, con el host como única autoridad de estado —la contraparte autoritativa de la arquitectura Shared Mode de Prototype-Network-Fusion-Shared—, verificado con cuatro clientes simultáneos.",
    },
    media: [
      {
        type: "video",
        src: "/multiplayer/fusion-host.mp4",
        poster: "/multiplayer/fusion-host.jpg",
        caption: {
          en: "Four clients in one match: the shield bubble and the muzzle flash appear in all four views at once.",
          es: "Cuatro clientes en una misma partida: la burbuja del escudo y el fogonazo aparecen en las cuatro vistas a la vez.",
        },
      },
      {
        type: "image",
        src: "/multiplayer/fusion-host-1-menu.jpg",
        caption: {
          en: "The same build enters as host or as client — the choice that decides who holds state authority.",
          es: "El mismo build entra como host o como cliente: la elección que decide quién tiene la autoridad de estado.",
        },
      },
      {
        type: "image",
        src: "/multiplayer/fusion-host-2-lobby.jpg",
        caption: {
          en: "The room holds until the four players are in.",
          es: "La sala espera hasta que entran los cuatro jugadores.",
        },
      },
      {
        type: "image",
        src: "/multiplayer/fusion-host-3-result.jpg",
        caption: {
          en: "One outcome resolved for everyone: one \"You Win\" and three \"You Lose\", with lives at 3 and 0 on the matching clients.",
          es: "Un único resultado resuelto para todos: un \"You Win\" y tres \"You Lose\", con las vidas en 3 y en 0 según el cliente.",
        },
      },
    ],
    tags: ["C#", "Photon Fusion 2", "Networking", "State Authority"],
    githubUrl: "https://github.com/FrancoLeoneDev/Prototype-Network-Fusion-Host",
    build: {
      url: "https://drive.google.com/file/d/1FC7txzJb5p-VLa2PA9ufRHLQ98jr5ZWD/view?usp=sharing",
      kind: "download",
      platform: "Windows",
      size: "25 MB",
    },
    engine: "unity",
  },
  {
    id: "fusion-shared",
    title: "Fusion Obstacle Course",
    topology: "shared",
    description: {
      en: "Online multiplayer obstacle-course racer built with Unity and Photon Fusion 2. Four hazard types — sweeping obstacles, moving platforms, blinking walkways and collapsing floors — each replicated with the mechanism that fits it: NetworkTransform, networked physics or RPCs. Runs on Fusion's Shared Mode with no authoritative host — the peer-to-peer counterpart to the Host Mode architecture in Prototype-Network-Fusion-Host — verified with four simultaneous clients.",
      es: "Carrera de obstáculos multijugador online hecha en Unity con Photon Fusion 2. Cuatro tipos de obstáculo —barredoras, plataformas móviles, pasarelas intermitentes y pisos que se derrumban—, cada uno replicado con el mecanismo que le corresponde: NetworkTransform, física en red o RPCs. Corre en Shared Mode de Fusion, sin host autoritativo —la contraparte peer-to-peer de la arquitectura Host Mode de Prototype-Network-Fusion-Host—, verificado con cuatro clientes simultáneos.",
    },
    media: [
      {
        type: "video",
        src: "/multiplayer/fusion-shared.mp4",
        poster: "/multiplayer/fusion-shared.jpg",
        caption: {
          en: "Four clients running the course at once, with no host arbitrating: every peer holds authority over its own player.",
          es: "Cuatro clientes recorriendo la pista a la vez, sin un host que arbitre: cada peer tiene autoridad sobre su propio jugador.",
        },
      },
      {
        type: "image",
        src: "/multiplayer/fusion-shared-1-clients.jpg",
        caption: {
          en: "The same moment across the four views — each client sees itself in white and the other three in red.",
          es: "El mismo momento en las cuatro vistas: cada cliente se ve a sí mismo en blanco y a los otros tres en rojo.",
        },
      },
    ],
    tags: ["C#", "Photon Fusion 2", "Networking", "State Replication"],
    githubUrl: "https://github.com/FrancoLeoneDev/Prototype-Network-Fusion-Shared",
    build: {
      url: "https://drive.google.com/file/d/1u8U-V9pDbA7UmYAuUDRlOhImk3QR-4Qp/view?usp=sharing",
      kind: "download",
      platform: "Windows",
      size: "22 MB",
    },
    engine: "unity",
  },
];

export interface Experience {
  id: string;
  role: Localized;
  company: string;
  period: Localized;
  description: Localized[];
  technologies: string[];
}

// Reverse-chronological: the current role goes first. Periods are deliberately
// year-only (no months) — the standard CV convention, and it keeps the two
// entries reading as a continuous span. Don't "improve" these into month ranges.
export const experiences: Experience[] = [
  {
    id: "exp-abk",
    role: {
      en: "Web Developer (Freelance)",
      es: "Desarrollador Web (Freelance)",
    },
    company: "ABK Solutions",
    period: { en: "2026 - Present", es: "2026 - Presente" },
    description: [
      {
        en: "Building full-stack web applications end to end as the sole developer",
        es: "Construcción de aplicaciones web full-stack de punta a punta como único desarrollador",
      },
      {
        en: "Owning the full delivery: data model, server logic, and interface",
        es: "A cargo de toda la entrega: modelo de datos, lógica de servidor e interfaz",
      },
    ],
    technologies: ["TypeScript", "React", "Next.js", "Supabase"],
  },
  {
    id: "exp-1",
    role: {
      en: "Software Fullstack Engineer",
      es: "Ingeniero de Software Full Stack",
    },
    company: "Nimbex Labs",
    period: { en: "2025 - 2026", es: "2025 - 2026" },
    description: [
      {
        en: "Developing full-stack web applications using modern technologies",
        es: "Desarrollo de aplicaciones web full-stack con tecnologías modernas",
      },
      {
        en: "Building scalable backend services and responsive frontend interfaces",
        es: "Construcción de servicios backend escalables e interfaces frontend responsivas",
      },
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
];

/**
 * Formal study. `period` is optional and year-only when present, matching the
 * convention in `experiences` — an unknown year renders as no badge at all
 * rather than as a guess. `description` is optional for the same reason.
 */
export interface Education {
  id: string;
  degree: Localized;
  institution: string;
  /** The programme page. Present turns the institution name into a link. */
  url?: string;
  location: string;
  period?: Localized;
  description?: Localized;
}

// The formal degree. Kept as an array so a second one drops in without touching
// the component, but the section is designed around this being the headline item.
export const education: Education[] = [
  {
    id: "edu-davinci",
    degree: {
      en: "Higher Technical Degree in Virtual Simulator Design and Programming",
      es: "Técnico Superior en Diseño y Programación de Simuladores Virtuales",
    },
    institution: "Escuela Da Vinci",
    url: "https://davinci.edu.ar/carreras/diseno-y-programacion-de-videojuegos",
    location: "Buenos Aires, Argentina",
    period: { en: "2022 - 2026", es: "2022 - 2026" },
    // Drawn from the programme's own curriculum, picking the engine- and
    // programming-heavy subjects: they are what connects the degree to the
    // gameplay systems and editor tools shown earlier on the page.
    description: {
      en: "A three-year official degree in videogame design and programming, built around engine programming and simulation: engine application and engine programming, Artificial Intelligence I and II, models and algorithms, applied physics, network development and level design, closing with a final project. Escuela Da Vinci is recognized by Epic Games as an Education & Training Partner for Unreal Engine. It is the formal grounding under the gameplay systems and editor tools shown above.",
      es: "Carrera oficial de tres años en diseño y programación de videojuegos, centrada en la programación de motores y la simulación: Aplicación de Motores y Programación de Motores, Inteligencia Artificial I y II, Modelos y Algoritmos, física aplicada, desarrollo para redes y diseño de niveles, cerrada con un proyecto final. Escuela Da Vinci está reconocida por Epic Games como Education & Training Partner de Unreal Engine. Es la base formal de los sistemas de gameplay y las herramientas de editor que muestro más arriba.",
    },
  },
];

/**
 * A course certificate — the second tier of the Education section, rendered
 * smaller than the degree on purpose so a 12-hour course never reads at the
 * same rank as a three-year title.
 *
 * `credentialUrl` is the public verification link the platform issues and is
 * what the card links to when present — it proves the certificate, which a file
 * anyone could produce does not. `image` (/certificates/<id>.jpg) is the
 * fallback link target for courses that never issued a verifiable URL. With
 * neither, the card renders as plain text.
 */
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  /** Who taught it. Worth showing when the name carries weight in the field. */
  instructor?: string;
  year?: string;
  credentialUrl?: string;
  image?: string;
}

// Newest first. Empty renders nothing — the section falls back to the degree alone.
// Names match the certificate, except where Udemy's own title is a sales line: see
// cert-unity-builder-defender. Don't rewrite the rest to match a house style.
export const certifications: Certification[] = [
  {
    id: "cert-unity-lighting",
    name: "Lighting in Unity",
    issuer: "Udemy",
    instructor: "Pete Jepson",
    year: "2026",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-7bfad179-48d3-4933-a372-edc313821fca/",
  },
  {
    id: "cert-unity-builder-defender",
    // Certificate reads "Learn to make an Awesome Builder-Defender game in
    // Unity!" — shortened here to drop the sales pitch. The verification link
    // still shows the full title.
    name: "Builder-Defender Game in Unity",
    issuer: "Udemy",
    instructor: "Code Monkey",
    year: "2025",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-3d29240d-ecf1-4b8a-af90-7f05d08f7ea8/",
  },
  {
    id: "cert-unity-dialogue-quests",
    name: "Unity Dialogue & Quests: Intermediate C# Game Coding",
    issuer: "Udemy",
    instructor: "Rick Davidson, GameDev.tv Team",
    year: "2025",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-ed4b5d15-ce61-477f-9880-adac712e8806/",
  },
  {
    id: "cert-unity-turn-based",
    name: "Unity Turn-Based Strategy Game: Intermediate C# Coding",
    issuer: "Udemy",
    instructor: "GameDev.tv Team, Code Monkey",
    year: "2025",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-9f9d36f4-6ffe-41a3-a220-8043277fe8d1/",
  },
  {
    id: "cert-unity-parkour",
    name: "Unity Parkour & Climbing System",
    issuer: "Udemy",
    instructor: "Fantacode Studios",
    year: "2025",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-fe0e098b-b679-4bda-8d69-1969124aadab/",
  },
];

// Key order drives the render order of the Skills section — game-dev first.
export const skillCategories = {
  gamedev: "Game Development",
  frontend: "Frontend Development",
  backend: "Backend Development",
  tools: "Tools & DevOps",
};
