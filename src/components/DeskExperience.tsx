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

  const uiOpacity = useTransform(scrollYProgress, [0.35, 0.58], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0.5, 0.68, 0.9], [0, 1, 0.4]);

  const openModal = (id: DeskModalId) => setModal(id);
  const closeModal = () => setModal(null);

  return (
    <section className="desk" id="top" ref={ref}>
      <div className="desk__sticky">
        <Atmosphere variant="hero" />

        <div className="desk__canvas-wrap" aria-hidden={Boolean(modal)}>
          <Suspense fallback={<div className="desk3d desk3d--loading">Loading desk…</div>}>
            <DeskScene3D
              progress={progress}
              enabled={!modal}
              onOpen={openModal}
            />
          </Suspense>
        </div>

        <motion.div className="desk__hero" style={{ opacity: uiOpacity }}>
          <motion.p
            className="desk__kicker"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            {site.tagline}
          </motion.h1>
          <motion.p
            className="desk__subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            {site.subtitle}
          </motion.p>
          <motion.div
            className="desk__cta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ResumeMenu />
            <a className="btn" href={site.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <button className="btn" type="button" onClick={() => openModal("contact")}>
              Contact
            </button>
          </motion.div>
          <motion.p className="desk__hint" style={{ opacity: hintOpacity }}>
            Scroll to approach · click objects on the desk
          </motion.p>
        </motion.div>

        <div className="desk__mobile" aria-label="Desk shortcuts">
          <motion.p
            className="desk__mobile-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {site.tagline}
          </motion.p>
          <p className="desk__mobile-sub">{site.subtitle}</p>
          <div className="desk__mobile-cta">
            <ResumeMenu />
          </div>
          <div className="desk__mobile-rail">
            {site.desk.objects.map((obj, i) => (
              <motion.button
                key={obj.id}
                type="button"
                className={`desk__mobile-card desk__mobile-card--${obj.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal(obj.modal)}
              >
                <span className="desk__mobile-icon" aria-hidden />
                <span>{obj.hint}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <DossierModal open={modal === "dossier"} onClose={closeModal} />
      <ExperienceModal open={modal === "experience"} onClose={closeModal} />
      <ProjectsModal open={modal === "projects"} onClose={closeModal} />
      <CertificatesModal open={modal === "certificates"} onClose={closeModal} />
      <ContactModal open={modal === "contact"} onClose={closeModal} />
    </section>
  );
}
