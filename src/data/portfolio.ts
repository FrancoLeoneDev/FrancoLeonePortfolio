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
  description: {
    en: "90s-era horror game featuring a unique memory mechanic where players dive into photographs to solve puzzles and escape from a nightmare. Explores atmospheric environments including a mansion and hospital with interactive puzzles and horror events.",
    es: "Juego de terror ambientado en los años 90 con una mecánica única de memoria donde el jugador se sumerge en fotografías para resolver puzzles y escapar de una pesadilla. Explora entornos atmosféricos como una mansión y un hospital, con puzzles interactivos y eventos de terror.",
  },
  image: "/projects/memora.jpg",
  // Opens on the title card, then the environments grouped by location — the two settings named
  // in the description. Append here to add more; the carousel's dots and arrows appear on their
  // own past one frame. `caption` is optional and unused here.
  images: [
    { src: "/projects/memora.jpg" },
    { src: "/projects/memora/mansion-living.jpg" },
    { src: "/projects/memora/mansion-corridor.jpg" },
    { src: "/projects/memora/hospital-corridor.jpg" },
    { src: "/projects/memora/hospital-lobby.jpg" },
  ],
  tags: ["C#", "Game Development", "Horror"],
  liveUrl: "https://memoraoficial.itch.io/memora",
  status: "in-progress",
  featured: true,
  engine: "unity",
};

/** Which engine a piece of work was built in. Rendered as a badge — see EngineBadge. */
export type EngineKey = "unreal" | "unity";

// Individual gameplay systems (Unreal Engine C++ or Unity C#). Each maps to a LinkedIn write-up.
// To add a system: append here and drop <id>.mp4 / <id>.jpg into public/systems/.
export interface GameSystem {
  id: string;
  title: string;
  description: Localized;
  poster: string; // /systems/<id>.jpg — shown as video poster and as fallback when no video
  video?: string; // /systems/<id>.mp4 — optional inline clip
  tags: string[];
  linkedinUrl?: string; // link to the LinkedIn post; button hidden when empty/absent
  engine: EngineKey;
}

export const gameSystems: GameSystem[] = [
  {
    id: "investigation-board",
    title: "Investigation Board System",
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
    title: "Grid Inventory System",
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
    title: "Object Inspection System",
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
