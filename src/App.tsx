import { useEffect, useState } from "react";
import { site } from "@content/site";
import { Nav } from "./components/Nav";
import { DeskExperience } from "./components/DeskExperience";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Certificates } from "./components/sections/Certificates";
import { Education } from "./components/sections/Education";
import { Skills } from "./components/sections/Skills";
import { WakaTime } from "./components/sections/WakaTime";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/Footer";
import { CursorGlow } from "./components/CursorGlow";

export default function App() {
  const [deskComplete, setDeskComplete] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.desk = deskComplete ? "ready" : "intro";
  }, [deskComplete]);

  return (
    <>
      <CursorGlow />
      <Nav />
      <main>
        <DeskExperience onReadyChange={setDeskComplete} />
        <About />
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
