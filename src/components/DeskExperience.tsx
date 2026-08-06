import { lazy, Suspense, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { site } from "@content/site";
import { ResumeMenu } from "./ResumeMenu";
import { Atmosphere } from "./Atmosphere";
import type { DeskModalId } from "./DeskModals";
import {
  CertificatesModal,
  ContactModal,
  DossierModal,
  ExperienceModal,
  ProjectsModal,
} from "./DeskModalViews";
import { AboutContent } from "./sections/AboutContent";
import { MobileDeskIcon } from "./MobileDeskIcon";
import "./DeskExperience.css";

const DeskScene3D = lazy(() =>
  import("./desk3d/DeskScene3D").then((m) => ({ default: m.DeskScene3D })),
);

export function DeskExperience() {
  const ref = useRef<HTMLElement>(null);
  const [modal, setModal] = useState<DeskModalId | null>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  // Hero copy during approach; fades when desk fills the frame
  const uiOpacity = useTransform(scrollYProgress, [0.22, 0.38, 0.55, 0.68], [0, 1, 1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0.35, 0.48, 0.6], [0, 1, 0]);
  // Desk fills frame → About content presents
  const aboutOpacity = useTransform(scrollYProgress, [0.74, 0.86, 1], [0, 1, 1]);
  const aboutY = useTransform(scrollYProgress, [0.74, 0.9], [36, 0]);
  const sceneFade = useTransform(scrollYProgress, [0.74, 0.88], [1, 0]);

  const openModal = (id: DeskModalId) => setModal(id);
  const closeModal = () => setModal(null);

  return (
    <section className="desk" id="top" ref={ref}>
      <div className="desk__sticky">
        <Atmosphere variant="hero" />

        <motion.div
          className="desk__canvas-wrap"
          style={{ opacity: sceneFade }}
          aria-hidden={Boolean(modal) || progress > 0.88}
        >
          <Suspense fallback={<div className="desk3d desk3d--loading">Loading desk…</div>}>
            <DeskScene3D
              progress={progress}
              enabled={!modal && progress < 0.82}
              onOpen={openModal}
            />
          </Suspense>
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
            <button className="btn" type="button" onClick={() => openModal("contact")}>
              Contact
            </button>
          </div>
          <motion.p className="desk__hint" style={{ opacity: hintOpacity }}>
            Keep scrolling — the desk fills the frame, then About begins
          </motion.p>
        </motion.div>

        <div className="desk__mobile" aria-label="Desk shortcuts">
          <p className="desk__mobile-title">{site.tagline}</p>
          <p className="desk__mobile-sub">{site.subtitle}</p>
          <div className="desk__mobile-cta">
            <ResumeMenu compact />
          </div>
          <div className="desk__mobile-rail">
            {site.desk.objects.map((obj) => (
              <button
                key={obj.id}
                type="button"
                className={`desk__mobile-card desk__mobile-card--${obj.id}`}
                onClick={() => openModal(obj.modal)}
              >
                <span className="desk__mobile-icon" aria-hidden>
                  <MobileDeskIcon id={obj.id} />
                </span>
                <span>{obj.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="desk__about-slot">
          <motion.div
            className="desk__about-bridge section"
            style={{ opacity: aboutOpacity, y: aboutY }}
            aria-hidden={progress < 0.74}
          >
            <AboutContent />
          </motion.div>
          <div className="desk__about-static section">
            <AboutContent />
          </div>
        </div>
      </div>

      {/* Lands nav #about near desk → About handoff */}
      <div id="about" className="desk__about-anchor" aria-hidden />

      <DossierModal open={modal === "dossier"} onClose={closeModal} />
      <ExperienceModal open={modal === "experience"} onClose={closeModal} />
      <ProjectsModal open={modal === "projects"} onClose={closeModal} />
      <CertificatesModal open={modal === "certificates"} onClose={closeModal} />
      <ContactModal open={modal === "contact"} onClose={closeModal} />
    </section>
  );
}
