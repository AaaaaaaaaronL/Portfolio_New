import { motion } from "framer-motion";
import { site } from "@content/site";

export function About() {
  return (
    <section className="section" id="about">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-kicker">About</p>
        <h2 className="section-title">{site.about.headline}</h2>
        <p className="section-sub">{site.about.body}</p>

        <div className="dossier panel">
          <div className="dossier__header">
            <img
              className="dossier__photo"
              src={site.about.photo}
              alt={`${site.name} portrait`}
            />
            <div>
              <h3 className="dossier__title">Personal dossier</h3>
              <p className="dossier__legal">{site.legalName}</p>
            </div>
          </div>
          <dl className="dossier__grid">
            {site.about.dossier.map((row) => (
              <div key={row.label} className="dossier__row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
