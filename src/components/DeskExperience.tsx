import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { site } from "@content/site";
import { ResumeMenu } from "./ResumeMenu";
import "./DeskExperience.css";

type Props = {
  onReadyChange: (ready: boolean) => void;
};

export function DeskExperience({ onReadyChange }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55, 0.78], [0.42, 1, 1.02]);
  const y = useTransform(scrollYProgress, [0, 0.55], [80, 0]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7], [0.35, 0.85, 0.55]);
  const beamWidth = useTransform(scrollYProgress, [0, 0.55], [18, 55]);
  const uiOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const drawerY = useTransform(scrollYProgress, [0.78, 0.95], [0, 70]);
  const drawerOpacity = useTransform(scrollYProgress, [0.78, 0.9, 1], [0, 1, 0.3]);
  const hintOpacity = useTransform(scrollYProgress, [0.5, 0.62, 0.78], [0, 1, 0]);
  const beamWidthPx = useMotionTemplate`${beamWidth}%`;

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      onReadyChange(v >= 0.52);
    });
  }, [scrollYProgress, onReadyChange]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="desk" id="top" ref={ref}>
      <div className="desk__sticky">
        <div className="desk__void" aria-hidden>
          <motion.div
            className="desk__beam"
            style={{ opacity: beamOpacity, width: beamWidthPx }}
          />
          <div className="desk__vignette" />
        </div>

        <motion.div className="desk__stage" style={{ scale, y }}>
          <div className="desk__surface">
            <div className="desk__grain" aria-hidden />

            <button
              className="desk-object desk-object--dossier"
              onClick={() => goTo("about")}
              aria-label="Open about dossier"
            >
              <span className="desk-object__label">Dossier</span>
            </button>

            <button
              className="desk-object desk-object--laptop"
              onClick={() => goTo("projects")}
              aria-label="Open projects on laptop"
            >
              <span className="desk-object__screen" />
              <span className="desk-object__label">Projects</span>
            </button>

            <button
              className="desk-object desk-object--folder"
              onClick={() => goTo("experience")}
              aria-label="Open experience folder"
            >
              <span className="desk-object__label">Experience</span>
            </button>

            <button
              className="desk-object desk-object--certs"
              onClick={() => goTo("certificates")}
              aria-label="Open certificates"
            >
              <span className="desk-object__label">Certificates</span>
            </button>

            <button
              className="desk-object desk-object--note"
              onClick={() => goTo("wakatime")}
              aria-label="Open WakaTime note"
            >
              <span className="desk-object__label">WakaTime</span>
            </button>

            <button
              className="desk-object desk-object--envelope"
              onClick={() => goTo("contact")}
              aria-label="Open contact envelope"
            >
              <span className="desk-object__label">Contact</span>
            </button>

            <motion.div className="desk__drawer" style={{ y: drawerY, opacity: drawerOpacity }} />
          </div>
        </motion.div>

        <motion.div className="desk__hero" style={{ opacity: uiOpacity }}>
          <p className="desk__kicker">Portfolio</p>
          <h1>{site.tagline}</h1>
          <p className="desk__subtitle">{site.subtitle}</p>
          <div className="desk__cta">
            <ResumeMenu />
            <a className="btn" href={site.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn" href="#contact">
              Contact
            </a>
          </div>
          <motion.p className="desk__hint" style={{ opacity: hintOpacity }}>
            Click an object · or keep scrolling to open the drawer
          </motion.p>
        </motion.div>

        <div className="desk__mobile-rail" aria-label="Quick links">
          {site.desk.objects.map((obj) => (
            <button key={obj.id} onClick={() => goTo(obj.target)}>
              {obj.hint}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
