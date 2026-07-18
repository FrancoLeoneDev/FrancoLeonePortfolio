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
  { name: "TypeScript", iconKey: "TypeScript", category: "frontend" },
  { name: "JavaScript", iconKey: "JavaScript", category: "frontend" },
  { name: "HTML", iconKey: "HTML", category: "frontend" },
  { name: "CSS", iconKey: "CSS", category: "frontend" },
  { name: "Tailwind CSS", iconKey: "TailwindCSS", category: "frontend" },

  // Backend
  { name: "Node.js", iconKey: "NodeJS", category: "backend" },
  { name: "Python", iconKey: "Python", category: "backend" },
  { name: "PHP", iconKey: "PHP", category: "backend" },
  { name: "PostgreSQL", iconKey: "PostgreSQL", category: "backend" },
  { name: "Supabase", iconKey: "Supabase", category: "backend" },

  // Tools
  { name: "Docker", iconKey: "Docker", category: "tools" },
  { name: "Git", iconKey: "Git", category: "tools" },
  { name: "Linux/Bash", iconKey: "Linux", category: "tools" },
];

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
}

export const projects: Project[] = [
  {
    id: "cookizza",
    title: "Cookizza",
    description: {
      en: "Production e-commerce for Cookizza, a family-run artisanal cookie shop in Floresta, CABA. A Next.js + Supabase storefront with a build-your-own \"Cookizza\" configurator (base, toppings and sauces chosen slice by slice), a cookie catalog with single cookies and mixed boxes, a persistent cart, an events section, an Instagram feed, and a WhatsApp checkout offering delivery across CABA or pickup in Floresta — plus an admin panel for managing the catalog.",
      es: "E-commerce en producción para Cookizza, un emprendimiento familiar de cookies artesanales en Floresta, CABA. Storefront en Next.js + Supabase con un configurador \"armá tu Cookizza\" (base, toppings y salsas elegidos porción por porción), catálogo de cookies con unidades y cajas surtidas, carrito persistente, sección de eventos, feed de Instagram y checkout por WhatsApp con envíos en CABA o retiro en Floresta, además de un panel de administración para gestionar el catálogo.",
    },
    image: "/projects/cookizza.jpg",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "E-commerce"],
    liveUrl: "https://www.cookizza.com.ar",
    status: "completed",
    featured: true,
  },
  {
    id: "papelera-bahia",
    title: "Papelera Bahía",
    description: {
      en: "Production e-commerce for a CABA-based wholesale supplier of disposable food-service and packaging products. A Next.js + Supabase storefront with catalog search, category and material filters, real-time stock, a persistent cart, and a WhatsApp checkout that builds each order server-side with a verified total.",
      es: "E-commerce en producción para un mayorista de descartables gastronómicos y packaging con base en CABA. Storefront en Next.js + Supabase con búsqueda de catálogo, filtros por categoría y material, stock en tiempo real, carrito persistente y checkout por WhatsApp que arma cada pedido del lado del servidor con total verificado.",
    },
    image: "/projects/papelera-bahia.jpg",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "E-commerce"],
    liveUrl: "https://www.papelerabahia.com.ar",
    status: "completed",
    featured: true,
  },
  {
    id: "sagis",
    title: "Sagis - Artisanal Bakery E-commerce",
    description: {
      en: "Full-stack e-commerce platform for an artisanal bakery featuring product catalog, shopping cart, Instagram feed integration, and WhatsApp ordering system. Built with modern web technologies and deployed on Vercel.",
      es: "Plataforma de e-commerce full-stack para una panadería artesanal con catálogo de productos, carrito de compras, integración con el feed de Instagram y sistema de pedidos por WhatsApp. Construida con tecnologías web modernas y desplegada en Vercel.",
    },
    image: "/projects/sagis.jpg",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase"],
    liveUrl: "https://sagis-sand.vercel.app/",
    status: "completed",
    featured: true,
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
  },
  {
    id: "incasas",
    title: "Incasas - Real Estate Platform",
    description: {
      en: "Full-featured real estate platform for property listings, sales, and rentals across Argentina. Includes advanced property search, expert valuations, personalized property matching services, and comprehensive property management tools.",
      es: "Plataforma inmobiliaria completa para listados, venta y alquiler de propiedades en Argentina. Incluye búsqueda avanzada de propiedades, tasaciones expertas, servicios personalizados de matching y herramientas integrales de gestión de propiedades.",
    },
    image: "/projects/placeholder.jpg",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript"],
    liveUrl: "https://incasas.com.ar",
    status: "completed",
    featured: true,
  },
  {
    id: "mogotes",
    title: "Mogotes - Backend as a Service",
    description: {
      en: "Backend as a Service platform providing API-first solutions for startups. Offers transactional email, push notifications, cloud storage, payment processing, authentication/SSO, and feature flags as fully managed services.",
      es: "Plataforma de Backend as a Service que ofrece soluciones API-first para startups. Brinda email transaccional, notificaciones push, almacenamiento en la nube, procesamiento de pagos, autenticación/SSO y feature flags como servicios totalmente gestionados.",
    },
    image: "/projects/placeholder.jpg",
    tags: ["API", "SaaS", "JavaScript", "Node.js"],
    liveUrl: "https://mogotes.ar",
    status: "completed",
    featured: true,
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
  },
  {
    id: "andes",
    title: "Andes - Artisanal Bakery E-commerce",
    description: {
      en: "E-commerce platform for artisanal baked goods including brownies, cookies, and traditional pastries. Features product catalog, shopping cart, coordinated delivery system, and personalized customer service.",
      es: "Plataforma de e-commerce para productos de panadería artesanal como brownies, cookies y pastelería tradicional. Incluye catálogo de productos, carrito de compras, sistema de entrega coordinada y atención personalizada al cliente.",
    },
    image: "/projects/placeholder.jpg",
    tags: ["Laravel", "PHP", "JavaScript", "E-commerce"],
    liveUrl: "https://andes.dantofema.ar",
    status: "completed",
    featured: true,
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
  tags: ["Unity", "C#", "Game Development", "Horror"],
  liveUrl: "https://memoraoficial.itch.io/memora",
  status: "in-progress",
  featured: true,
};

// Individual Unreal Engine (C++) gameplay systems. Each maps to a LinkedIn write-up.
// To add a system: append here and drop <id>.mp4 / <id>.jpg into public/systems/.
export interface GameSystem {
  id: string;
  title: string;
  description: Localized;
  poster: string; // /systems/<id>.jpg — shown as video poster and as fallback when no video
  video?: string; // /systems/<id>.mp4 — optional inline clip
  tags: string[];
  linkedinUrl?: string; // link to the LinkedIn post; button hidden when empty/absent
  engine: "unreal";
}

export const gameSystems: GameSystem[] = [
  {
    id: "grid-inventory",
    title: "Grid Inventory System",
    description: {
      en: "A Tetris-style grid inventory built in Unreal Engine with C++: items occupy multiple cells with drag-and-drop placement, rotation, and stacking, backed by fast slot lookup and collision checks.",
      es: "Un inventario en grilla estilo Tetris hecho en Unreal Engine con C++: los ítems ocupan múltiples celdas con colocación por drag-and-drop, rotación y apilado, con búsqueda rápida de slots y chequeo de colisiones.",
    },
    poster: "/systems/grid-inventory.jpg",
    video: "/systems/grid-inventory.mp4",
    tags: ["Unreal Engine", "C++", "UE5", "Gameplay"],
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
    tags: ["Unreal Engine", "C++", "UE5", "Gameplay"],
    linkedinUrl:
      "https://www.linkedin.com/posts/franco-leone-294511242_unrealengine-ue5-gamedev-activity-7453919156778725376-Z6mx",
    engine: "unreal",
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

// Two concurrent roles. "(Freelance)" on the ABK entry is load-bearing: it is
// what explains two simultaneous "Present" periods rather than a stale record.
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
    period: { en: "2025 - Present", es: "2025 - Presente" },
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

// Key order drives the render order of the Skills section — game-dev first.
export const skillCategories = {
  gamedev: "Game Development",
  frontend: "Frontend Development",
  backend: "Backend Development",
  tools: "Tools & DevOps",
};
