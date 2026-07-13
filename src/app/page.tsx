import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { GameDev } from "@/components/sections/GameDev";
import { WebProjects } from "@/components/sections/WebProjects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <GameDev />
        <WebProjects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
