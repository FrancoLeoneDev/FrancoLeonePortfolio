export const personalInfo = {
  name: "Franco Leone",
  title: "Full Stack & Game Developer",
  subtitle:
    "Building high-quality web applications and interactive gaming experiences",
  email: "francoleone.dev@gmail.com",
  location: "Buenos Aires, Argentina",
  social: {
    github: "https://github.com/FrancoLeoneDev",
    linkedin: "https://www.linkedin.com/in/franco-leone-294511242/",
    whatsapp: "https://wa.me/5491126323865",
  },
};

export const aboutText = {
  intro:
    "I'm a Full Stack Developer & Game Developer with strong capabilities in both web/app and game development.",
  details: [
    "Advanced proficiency in Unity with C#, having built multiple systems, tools, and gameplay mechanics. Currently expanding my engine expertise with Unreal Engine (C++).",
    "Skilled in building complete web and mobile applications using modern technologies and frameworks, with solid experience in database integration and API development.",
    "Driven by a deep passion for interactive technologies, game design, and modern software development, with a strong commitment to delivering high-quality digital products across both fields.",
  ],
};

export interface Skill {
  name: string;
  iconKey: string;
  category: "frontend" | "backend" | "gamedev" | "tools";
}

export const skills: Skill[] = [
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

  // Game Development
  { name: "Unity", iconKey: "Unity", category: "gamedev" },
  { name: "C#", iconKey: "CSharp", category: "gamedev" },
  { name: "Unreal Engine", iconKey: "UnrealEngine", category: "gamedev" },
  { name: "C++", iconKey: "CPlusPlus", category: "gamedev" },

  // Tools
  { name: "Docker", iconKey: "Docker", category: "tools" },
  { name: "Git", iconKey: "Git", category: "tools" },
  { name: "Linux/Bash", iconKey: "Linux", category: "tools" },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: "completed" | "in-progress";
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "sagis",
    title: "Sagis - Artisanal Bakery E-commerce",
    description:
      "Full-stack e-commerce platform for an artisanal bakery featuring product catalog, shopping cart, Instagram feed integration, and WhatsApp ordering system. Built with modern web technologies and deployed on Vercel.",
    image: "/projects/sagis.jpg",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase"],
    liveUrl: "https://sagis-sand.vercel.app/",
    status: "completed",
    featured: true,
  },
  {
    id: "memora",
    title: "Memora - Horror Game Demo",
    description:
      "90s-era horror game featuring a unique memory mechanic where players dive into photographs to solve puzzles and escape from a nightmare. Explores atmospheric environments including a mansion and hospital with interactive puzzles and horror events.",
    image: "/projects/memora.jpg",
    tags: ["Unity", "C#", "Game Development", "Horror"],
    liveUrl: "https://memoraoficial.itch.io/memora",
    status: "in-progress",
    featured: true,
  },
  {
    id: "dantofema",
    title: "Dantofema - Software Development Company",
    description:
      "Software development company website showcasing custom development services, consulting, and modernization solutions. Features service portfolio, client showcase, and contact system built with modern web technologies.",
    image: "/projects/placeholder.jpg",
    tags: ["PHP", "Laravel", "MySQL", "JavaScript", "Vue.js"],
    liveUrl: "https://dantofema.ar",
    status: "completed",
    featured: true,
  },
  {
    id: "incasas",
    title: "Incasas - Real Estate Platform",
    description:
      "Full-featured real estate platform for property listings, sales, and rentals across Argentina. Includes advanced property search, expert valuations, personalized property matching services, and comprehensive property management tools.",
    image: "/projects/placeholder.jpg",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript"],
    liveUrl: "https://incasas.com.ar",
    status: "completed",
    featured: true,
  },
  {
    id: "mogotes",
    title: "Mogotes - Backend as a Service",
    description:
      "Backend as a Service platform providing API-first solutions for startups. Offers transactional email, push notifications, cloud storage, payment processing, authentication/SSO, and feature flags as fully managed services.",
    image: "/projects/placeholder.jpg",
    tags: ["API", "SaaS", "JavaScript", "Node.js"],
    liveUrl: "https://mogotes.ar",
    status: "completed",
    featured: true,
  },
  {
    id: "fiplatina",
    title: "FIP Latina Press - Journalism Portal",
    description:
      "News and information portal for the International Federation of Journalists in Latin America. Features journalism news, union updates, campaigns, and syndicated content with a focus on press freedom and journalists' rights.",
    image: "/projects/placeholder.jpg",
    tags: ["Laravel", "PHP", "JavaScript", "CMS"],
    liveUrl: "https://fiplatina.press",
    status: "completed",
    featured: true,
  },
  {
    id: "andes",
    title: "Andes - Artisanal Bakery E-commerce",
    description:
      "E-commerce platform for artisanal baked goods including brownies, cookies, and traditional pastries. Features product catalog, shopping cart, coordinated delivery system, and personalized customer service.",
    image: "/projects/placeholder.jpg",
    tags: ["Laravel", "PHP", "JavaScript", "E-commerce"],
    liveUrl: "https://andes.dantofema.ar",
    status: "completed",
    featured: true,
  },
  // Add more projects as needed
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Software Fullstack Engineer",
    company: "Nimbex Labs",
    period: "2025 - Present",
    description: [
      "Developing full-stack web applications using modern technologies",
      "Building scalable backend services and responsive frontend interfaces",
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
];

export const skillCategories = {
  frontend: "Frontend Development",
  backend: "Backend Development",
  gamedev: "Game Development",
  tools: "Tools & DevOps",
};
