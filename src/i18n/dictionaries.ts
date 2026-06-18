export type Lang = "en" | "es";

/** A value available in both languages. Use with `pick()` from useLanguage(). */
export type Localized = { en: string; es: string };

const en = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  },
  hero: {
    badge: "Available for opportunities",
    greeting: "Hi, I'm",
    viewWork: "View My Work",
    getInTouch: "Get In Touch",
    scroll: "Scroll",
  },
  about: {
    heading: "About Me",
    photo: "Your photo here",
    statWeb: "Web Projects",
    statGames: "Game Projects",
    statTech: "Technologies",
  },
  skills: {
    heading: "Skills & Technologies",
    subtitle:
      "A comprehensive toolkit spanning web development, game development, and modern DevOps practices.",
    learning: "Always learning new technologies",
  },
  skillCategories: {
    frontend: "Frontend Development",
    backend: "Backend Development",
    gamedev: "Game Development",
    tools: "Tools & DevOps",
  },
  projects: {
    heading: "Featured Projects",
    subtitle:
      "A selection of my web and game development projects, showcasing different technologies and approaches.",
    filterAll: "All Projects",
    filterCompleted: "Completed",
    filterInProgress: "In Progress",
    statusCompleted: "Completed",
    statusInProgress: "In Progress",
    featured: "Featured",
    readMore: "Read more",
    showLess: "Show less",
    empty: "No projects found with the selected filter.",
    viewMore: "View more on GitHub",
  },
  experience: {
    heading: "Experience",
    subtitle:
      "My professional journey and the roles that have shaped my career.",
    comingSoon: "Experience details coming soon...",
  },
  contact: {
    heading: "Get In Touch",
    subtitle:
      "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    workTogether: "Let's work together",
    workTogetherBody:
      "Whether you have a project in mind, want to collaborate on something cool, or just want to say hi, I'd love to hear from you. Feel free to reach out through any of the channels below.",
    findMe: "Find me on",
    email: "Email",
    location: "Location",
    ready: "Ready to start a project?",
    readyBody:
      "I'm available for freelance work and exciting opportunities. Let's create something amazing together.",
    sendEmail: "Send me an email",
    available: "Currently available for new projects",
  },
  footer: {
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
};

export type Dictionary = typeof en;

const es: Dictionary = {
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    skills: "Habilidades",
    projects: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
  },
  hero: {
    badge: "Disponible para oportunidades",
    greeting: "Hola, soy",
    viewWork: "Ver mi trabajo",
    getInTouch: "Contactame",
    scroll: "Scroll",
  },
  about: {
    heading: "Sobre mí",
    photo: "Tu foto acá",
    statWeb: "Proyectos web",
    statGames: "Proyectos de juegos",
    statTech: "Tecnologías",
  },
  skills: {
    heading: "Habilidades y Tecnologías",
    subtitle:
      "Un set completo de herramientas que abarca desarrollo web, desarrollo de videojuegos y prácticas modernas de DevOps.",
    learning: "Siempre aprendiendo nuevas tecnologías",
  },
  skillCategories: {
    frontend: "Desarrollo Frontend",
    backend: "Desarrollo Backend",
    gamedev: "Desarrollo de Videojuegos",
    tools: "Herramientas y DevOps",
  },
  projects: {
    heading: "Proyectos Destacados",
    subtitle:
      "Una selección de mis proyectos web y de videojuegos, mostrando distintas tecnologías y enfoques.",
    filterAll: "Todos",
    filterCompleted: "Completados",
    filterInProgress: "En progreso",
    statusCompleted: "Completado",
    statusInProgress: "En progreso",
    featured: "Destacado",
    readMore: "Ver más",
    showLess: "Ver menos",
    empty: "No se encontraron proyectos con el filtro seleccionado.",
    viewMore: "Ver más en GitHub",
  },
  experience: {
    heading: "Experiencia",
    subtitle:
      "Mi recorrido profesional y los roles que dieron forma a mi carrera.",
    comingSoon: "Detalles de experiencia próximamente...",
  },
  contact: {
    heading: "Hablemos",
    subtitle:
      "Siempre estoy abierto a hablar de nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión.",
    workTogether: "Trabajemos juntos",
    workTogetherBody:
      "Ya sea que tengas un proyecto en mente, quieras colaborar en algo copado o simplemente saludar, me encantaría saber de vos. Escribime por cualquiera de estos canales.",
    findMe: "Encontrame en",
    email: "Email",
    location: "Ubicación",
    ready: "¿Listo para empezar un proyecto?",
    readyBody:
      "Estoy disponible para trabajos freelance y oportunidades interesantes. Creemos algo increíble juntos.",
    sendEmail: "Enviame un email",
    available: "Disponible para nuevos proyectos",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    backToTop: "Volver arriba",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, es };
