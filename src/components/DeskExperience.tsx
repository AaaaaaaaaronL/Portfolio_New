import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { site } from "@content/site";
import { ResumeMenu } from "./ResumeMenu";
import { Atmosphere } from "./Atmosphere";
import { Flashlight } from "./Flashlight";
import type { DeskModalId } from "./DeskModals";
import {
  CertificatesModal,
  ContactModal,
  DossierModal,
  ExperienceModal,
  ProjectsModal,
} from "./DeskModalViews";
import "./DeskExperience.css";

export function DeskExperience() {
  const ref = useRef<HTMLElement>(null);
  const [modal, setModal] = useState<DeskModalId | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.62], [0.38, 1]);
  const y = useTransform(scrollYProgress, [0, 0.62], [110, 0]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.18, 0.55], [0.25, 0.8, 0.4]);
  const beamWidth = useTransform(scrollYProgress, [0, 0.62], [14, 48]);
  const uiOpacity = useTransform(scrollYProgress, [0.4, 0.62], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0.55, 0.7, 0.9], [0, 1, 0.35]);
  const beamWidthPx = useMotionTemplate`${beamWidth}%`;

  const openModal = (id: DeskModalId) => {
    setDrawerOpen(false);
    setModal(id);
  };
  const closeModal = () => setModal(null);

  return (
    <section className="desk" id="top" ref={ref}>
      <div className="desk__sticky">
        <Atmosphere variant="hero" />
        <Flashlight enabled={!modal} />

        <div className="desk__void" aria-hidden>
          <motion.div
            className="desk__beam"
            style={{ opacity: beamOpacity, width: beamWidthPx }}
          />
          <div className="desk__vignette" />
        </div>

        <motion.div className="desk__stage" style={{ scale, y }}>
          <div className="desk__legs" aria-hidden>
            <span />
            <span />
          </div>

          <div className="desk__surface">
            <div className="desk__edge" aria-hidden />
            <div className="desk__grain" aria-hidden />
            <div className="desk__lamp" aria-hidden />

            <button
              className="desk-object desk-object--dossier"
              onClick={() => openModal("dossier")}
              aria-label="Open personal dossier"
            >
              <span className="desk-object__sheen" />
              <span className="desk-object__label">Dossier</span>
            </button>

            <button
              className="desk-object desk-object--laptop"
              onClick={() => openModal("projects")}
              aria-label="Open projects on laptop"
            >
              <span className="desk-object__screen" />
              <span className="desk-object__label">Projects</span>
            </button>

            <button
              className="desk-object desk-object--folder"
              onClick={() => openModal("experience")}
              aria-label="Open experience folder"
            >
              <span className="desk-object__papers" aria-hidden />
              <span className="desk-object__badge">Experience</span>
              <span className="desk-object__label">Experience</span>
            </button>

            <button
              className="desk-object desk-object--certs"
              onClick={() => openModal("certificates")}
              aria-label="Open certificates"
            >
              <span className="desk-object__label">Certificates</span>
            </button>

            <button
              className="desk-object desk-object--envelope"
              onClick={() => openModal("contact")}
              aria-label="Open contact card"
            >
              <span className="desk-object__label">Contact</span>
            </button>

            <div className="desk__mug" aria-hidden />

            <button
              type="button"
              className={`desk__drawer ${drawerOpen ? "is-open" : ""}`}
              aria-expanded={drawerOpen}
              aria-label={drawerOpen ? "Close desk drawer" : "Open desk drawer"}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span className="desk__drawer-handle" />
              <span className="desk__drawer-label">{drawerOpen ? "Close" : "Open drawer"}</span>
            </button>

            <div className={`desk__drawer-tray ${drawerOpen ? "is-open" : ""}`}>
              {site.desk.objects.map((obj) => (
                <button
                  key={obj.id}
                  type="button"
                  className="desk__drawer-item"
                  onClick={() => openModal(obj.modal)}
                >
                  {obj.hint}
                </button>
              ))}
            </div>
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
            <button className="btn" type="button" onClick={() => openModal("contact")}>
              Contact
            </button>
          </div>
          <motion.p className="desk__hint" style={{ opacity: hintOpacity }}>
            Use the flashlight · click objects · or open the drawer
          </motion.p>
        </motion.div>

        <div className="desk__mobile" aria-label="Desk shortcuts">
          <p className="desk__mobile-title">{site.tagline}</p>
          <p className="desk__mobile-sub">{site.subtitle}</p>
          <div className="desk__mobile-cta">
            <ResumeMenu />
          </div>
          <div className="desk__mobile-rail">
            {site.desk.objects.map((obj) => (
              <button
                key={obj.id}
                type="button"
                className={`desk__mobile-card desk__mobile-card--${obj.id}`}
                onClick={() => openModal(obj.modal)}
              >
                <span className="desk__mobile-icon" aria-hidden />
                <span>{obj.hint}</span>
              </button>
            ))}
            <button
              type="button"
              className="desk__mobile-card desk__mobile-card--drawer"
              onClick={() => openModal("experience")}
            >
              <span className="desk__mobile-icon" aria-hidden />
              <span>Open drawer · Experience</span>
            </button>
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
