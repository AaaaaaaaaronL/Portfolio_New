import { site } from "@content/site";

export function Skills() {
  return (
    <section className="section" id="skills">
      <p className="section-kicker">Toolkit</p>
      <h2 className="section-title">{site.skills.headline}</h2>

      <div className="skills-grid panel">
        {site.skills.groups.map((group) => (
          <div key={group.title} className="skill-group">
            <h3>{group.title}</h3>
            <div className="tag-row">
              {group.items.map((item) => (
                <span className="chip chip--skill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
