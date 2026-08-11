export type Lang = "en" | "es";

/** A value available in both languages. Use with `pick()` from useLanguage(). */
export type Localized = { en: string; es: string };

const en = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    games: "Games",
    web: "Web",
    experience: "Experience",
    education: "Education",
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
    statWeb: "Web Projects",
    statGames: "Game Projects",
    statTech: "Technologies",
  },
  skills: {
    heading: "Skills & Technologies",
    subtitle:
      "A comprehensive toolkit spanning game development, web development, and modern DevOps practices.",
    learning: "Always learning new technologies",
  },
  skillCategories: {
    gamedev: "Game Development",
    frontend: "Frontend Development",
    backend: "Backend Development",
    tools: "Tools & DevOps",
  },
  web: {
    heading: "Web Development",
    subtitle:
      "Full-stack web applications and e-commerce platforms built with modern technologies.",
    featured: "Featured",
    ownProject: "Independent project",
    statusCompleted: "Completed",
    statusInProgress: "In Progress",
    readMore: "Read more",
    showLess: "Show less",
    viewMore: "View more on GitHub",
  },
  games: {
    heading: "Game Development",
    subtitle:
      "A featured game, individual gameplay systems, and the editor tools I build to speed the work up.",
    featuredGameLabel: "Featured Game",
    systemsLabel: "Gameplay Systems",
    systemsSubtitle: "Individual gameplay systems built in Unreal Engine (C++) and Unity (C#).",
    toolsLabel: "Editor Tools",
    toolsSubtitle:
      "Editor extensions that take the friction out of the day-to-day of building a game.",
    toolProblem: "The problem",
    multiplayerLabel: "Multiplayer",
    multiplayerSubtitle:
      "Networked prototypes in Photon Fusion — the same prototype under both of Fusion's topologies, so the netcode decision is the thing on display.",
    topology: {
      shared: "Shared Mode",
      host: "Host / Client",
    },
    playBuild: "Play the build",
    downloadBuild: "Download the build",
    galleryShot: "Screenshot",
    galleryPrev: "Previous screenshot",
    galleryNext: "Next screenshot",
    playDemo: "Play the demo",
    viewOnLinkedin: "View on LinkedIn",
    viewOnGithub: "View on GitHub",
    statusInProgress: "In Progress",
  },
  experience: {
    heading: "Experience",
    subtitle:
      "My professional journey and the roles that have shaped my career.",
    comingSoon: "Experience details coming soon...",
  },
  education: {
    heading: "Education",
    subtitle:
      "My formal training, and the courses I keep taking to stay current.",
    graduate: "Graduate",
    certificationsLabel: "Certifications",
    certificationsSubtitle:
      "Courses completed outside the classroom, each with its verification link.",
    by: "by",
    viewCredential: "View credential",
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
    games: "Juegos",
    web: "Web",
    experience: "Experiencia",
    education: "Estudios",
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
    statWeb: "Proyectos web",
    statGames: "Proyectos de juegos",
    statTech: "Tecnologías",
  },
  skills: {
    heading: "Habilidades y Tecnologías",
    subtitle:
      "Un set completo de herramientas que abarca desarrollo de videojuegos, desarrollo web y prácticas modernas de DevOps.",
    learning: "Siempre aprendiendo nuevas tecnologías",
  },
  skillCategories: {
    gamedev: "Desarrollo de Videojuegos",
    frontend: "Desarrollo Frontend",
    backend: "Desarrollo Backend",
    tools: "Herramientas y DevOps",
  },
  web: {
    heading: "Desarrollo Web",
    subtitle:
      "Aplicaciones web full-stack y plataformas de e-commerce construidas con tecnologías modernas.",
    featured: "Destacado",
    ownProject: "Proyecto propio",
    statusCompleted: "Completado",
    statusInProgress: "En progreso",
    readMore: "Ver más",
    showLess: "Ver menos",
    viewMore: "Ver más en GitHub",
  },
  games: {
    heading: "Desarrollo de Videojuegos",
    subtitle:
      "Un juego destacado, sistemas de gameplay individuales, y las herramientas de editor que construyo para acelerar el trabajo.",
    featuredGameLabel: "Juego destacado",
    systemsLabel: "Sistemas de Gameplay",
    systemsSubtitle: "Sistemas individuales construidos en Unreal Engine (C++) y Unity (C#).",
    toolsLabel: "Herramientas de Editor",
    toolsSubtitle:
      "Extensiones de editor que sacan la fricción del día a día de construir un juego.",
    toolProblem: "El problema",
    multiplayerLabel: "Multijugador",
    multiplayerSubtitle:
      "Prototipos en red con Photon Fusion: el mismo prototipo bajo las dos topologías de Fusion, para que lo que se muestre sea la decisión de netcode.",
    topology: {
      shared: "Shared Mode",
      host: "Host / Client",
    },
    playBuild: "Jugar el build",
    downloadBuild: "Descargar el build",
    galleryShot: "Captura",
    galleryPrev: "Captura anterior",
    galleryNext: "Captura siguiente",
    playDemo: "Jugar la demo",
    viewOnLinkedin: "Ver en LinkedIn",
    viewOnGithub: "Ver en GitHub",
    statusInProgress: "En progreso",
  },
  experience: {
    heading: "Experiencia",
    subtitle:
      "Mi recorrido profesional y los roles que dieron forma a mi carrera.",
    comingSoon: "Detalles de experiencia próximamente...",
  },
  education: {
    heading: "Estudios",
    subtitle:
      "Mi formación formal y los cursos con los que sigo actualizándome.",
    graduate: "Graduado",
    certificationsLabel: "Certificaciones",
    certificationsSubtitle:
      "Cursos completados fuera del aula, cada uno con su link de verificación.",
    by: "por",
    viewCredential: "Ver certificado",
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
