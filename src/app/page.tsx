import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Cursor } from "@/components/ui/Cursor";
import { EasterEgg } from "@/components/ui/EasterEgg";
import { Loader } from "@/components/ui/Loader";
import { Navbar } from "@/components/ui/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main id="main" className="relative z-[1]">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden />
      <Cursor />
      <EasterEgg />
    </>
  );
}
