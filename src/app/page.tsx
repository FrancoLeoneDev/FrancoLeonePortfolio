import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { GameDev } from "@/components/sections/GameDev";
import { WebProjects } from "@/components/sections/WebProjects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* Order is deliberate: the work comes before the claims. Skills sits
            after the two project sections so the tech grid reads as a summary
            of what the visitor just saw running, not as a list of promises. */}
        <Hero />
        <About />
        <GameDev />
        <WebProjects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
