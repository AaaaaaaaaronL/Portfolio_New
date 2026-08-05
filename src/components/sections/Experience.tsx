import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type ExperienceFilter } from "@content/site";

export function Experience() {
  const [filter, setFilter] = useState<ExperienceFilter>("all");

  const items = useMemo(() => {
    if (filter === "all") return site.experience.items;
    return site.experience.items.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <section className="section" id="experience">
      <p className="section-kicker">Timeline</p>
      <h2 className="section-title">{site.experience.headline}</h2>
      <p className="section-sub">{site.experience.subhead}</p>

      <div className="filter-bar panel" role="tablist" aria-label="Experience filters">
        {site.experience.filters.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={filter === item.id}
            className={`filter-chip ${filter === item.id ? "is-active" : ""}`}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="timeline">
        <AnimatePresence mode="popLayout">
          {items.map((job) => (
            <motion.article
              key={job.id}
              className="timeline__item"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="timeline__meta">
                <span className="chip">{job.category === "it" ? "IT" : "Customer Service"}</span>
                <span>
                  {job.start} – {job.end}
                </span>
              </div>
              <h3>{job.title}</h3>
              <p className="timeline__company">
                {job.company} · {job.employmentType}
              </p>
              <p className="timeline__location">{job.location}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="tag-row">
                {job.skills.map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
