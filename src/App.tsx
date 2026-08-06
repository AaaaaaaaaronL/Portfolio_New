import { site } from "@content/site";
import { Nav } from "./components/Nav";
import { DeskExperience } from "./components/DeskExperience";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Certificates } from "./components/sections/Certificates";
import { Education } from "./components/sections/Education";
import { Skills } from "./components/sections/Skills";
import { Contact } from "./components/sections/Contact";
import { WakaTime } from "./components/sections/WakaTime";
import { Atmosphere } from "./components/Atmosphere";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Atmosphere variant="page" />
      <Nav />
      <main>
        <DeskExperience />
        <Experience />
        <Projects />
        <Certificates />
        <Education />
        <Skills />
        <WakaTime />
        <Contact />
      </main>
      <Footer />
      <a className="sr-only" href={`mailto:${site.social.email}`}>
        Email Aaron
      </a>
    </>
  );
}
