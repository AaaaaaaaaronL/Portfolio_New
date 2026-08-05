import { site } from "@content/site";
import { ResumeMenu } from "../ResumeMenu";

export function Contact() {
  const whatsapp = site.social.whatsapp.trim();

  return (
    <section className="section" id="contact">
      <p className="section-kicker">Contact</p>
      <h2 className="section-title">{site.contact.headline}</h2>
      <p className="section-sub">{site.contact.body}</p>

      <div className="contact panel">
        <div className="contact__actions">
          <ResumeMenu />
          <a className="btn" href={site.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn" href={`mailto:${site.social.email}`}>
            Email
          </a>
          <a className="btn" href={site.social.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          {whatsapp ? (
            <a className="btn" href={whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : (
            <span className="chip">WhatsApp coming soon</span>
          )}
        </div>
        <p className="contact__email">
          <a href={`mailto:${site.social.email}`}>{site.social.email}</a>
        </p>
      </div>
    </section>
  );
}
