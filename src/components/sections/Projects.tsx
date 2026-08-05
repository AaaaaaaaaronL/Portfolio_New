import { motion } from "framer-motion";
import { site } from "@content/site";

export function Projects() {
  return (
    <section className="section" id="projects">
      <p className="section-kicker">Work</p>
      <h2 className="section-title">{site.projects.headline}</h2>
      <p className="section-sub">{site.projects.subhead}</p>

      <div className="project-list panel">
        {site.projects.items.map((project, index) => (
          <motion.article
            key={project.id}
            className="project"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.stack.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div className="project__links">
              {project.links.map((link) => (
                <a key={link.href} className="btn" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
