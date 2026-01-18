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
  // Add your projects here
  {
    id: "project-1",
    title: "Project Name",
    description:
      "A brief description of what this project does and the technologies used.",
    image: "/projects/placeholder.jpg",
    tags: ["React", "TypeScript", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
    status: "completed",
    featured: true,
  },
  {
    id: "project-2",
    title: "Game Project",
    description: "An exciting game built with Unity showcasing gameplay mechanics and systems.",
    image: "/projects/placeholder.jpg",
    tags: ["Unity", "C#", "Game Development"],
    status: "in-progress",
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
