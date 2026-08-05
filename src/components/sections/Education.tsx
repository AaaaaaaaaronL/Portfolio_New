import { useState } from "react";
import { site } from "@content/site";

export function Education() {
  const [open, setOpen] = useState(false);
  const { secondary, university } = site.education;

  return (
    <section className="section" id="education">
      <p className="section-kicker">Learning</p>
      <h2 className="section-title">{site.education.headline}</h2>

      <div className="edu-grid panel">
        <article className="edu">
          <p className="edu__label">Secondary</p>
          <h3>{secondary.school}</h3>
          <p className="edu__focus">{secondary.focus}</p>
          <p>{secondary.summary}</p>
        </article>

        <article className="edu">
          <p className="edu__label">University</p>
          <h3>{university.school}</h3>
          <p className="edu__focus">
            {university.program} · {university.years}
          </p>
          <ul>
            {university.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <button
            className="btn edu__toggle"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide academic details" : "Show academic performance"}
          </button>

          {open && (
            <div className="edu__details">
              <h4>Semester GPA</h4>
              <ul className="edu__gpa">
                {university.semesters.map((row) => (
                  <li key={row.term}>
                    <span>{row.term}</span>
                    <strong>
                      {row.gpa}
                      {"note" in row && row.note ? ` · ${row.note}` : ""}
                    </strong>
                  </li>
                ))}
              </ul>
              <h4>Leadership</h4>
              <ul>
                {university.leadership.map((row) => (
                  <li key={row.term}>
                    <strong>{row.term}:</strong> {row.roles.join("; ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
