import { site } from "@content/site";
import { ModalPager, ModalShell, useCarousel } from "./DeskModals";
import { ResumeMenu } from "./ResumeMenu";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DossierModal({ open, onClose }: Props) {
  return (
    <ModalShell open={open} onClose={onClose} title="Personal dossier" variant="file">
      <div className="dossier-sheet">
        <div className="dossier-sheet__stamp">CONFIDENTIAL</div>
        <div className="dossier-sheet__header">
          <img
            className="dossier-sheet__photo"
            src={site.about.photo}
            alt={`${site.name} portrait`}
          />
          <div>
            <p className="dossier-sheet__name">{site.legalName}</p>
            <p className="dossier-sheet__aka">Also known as {site.name}</p>
          </div>
        </div>
        <p className="dossier-sheet__summary">{site.about.body}</p>
        <dl className="dossier-sheet__grid">
          {site.about.dossier.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ModalShell>
  );
}

export function ExperienceModal({ open, onClose }: Props) {
  const items = site.experience.items;
  const { index, prev, next } = useCarousel(items.length, open);
  const job = items[index];

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Experience files"
      variant="file"
      footer={<ModalPager index={index} total={items.length} onPrev={prev} onNext={next} label="File" />}
    >
      {job ? (
        <article className="exp-file">
          <div className="exp-file__tab">
            {job.category === "it" ? "IT" : "Customer Service"}
          </div>
          <p className="exp-file__dates">
            {job.start} – {job.end}
          </p>
          <h3>{job.title}</h3>
          <p className="exp-file__company">
            {job.company} · {job.employmentType}
          </p>
          <p className="exp-file__location">{job.location}</p>
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
        </article>
      ) : null}
    </ModalShell>
  );
}

export function CertificatesModal({ open, onClose }: Props) {
  const items = site.certificates.items;
  const { index, prev, next } = useCarousel(items.length, open);
  const cert = items[index];

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Certificates"
      variant="diploma"
      footer={<ModalPager index={index} total={items.length} onPrev={prev} onNext={next} />}
    >
      {cert ? (
        <article className="diploma">
          <p className="diploma__kicker">Certificate of achievement</p>
          <h3>{cert.title}</h3>
          <p className="diploma__issuer">{cert.issuer}</p>
          <p className="diploma__date">{cert.date}</p>
          {"credentialId" in cert && cert.credentialId ? (
            <p className="diploma__id">{cert.credentialId}</p>
          ) : null}
          <div className="diploma__seal" aria-hidden>
            ★
          </div>
          {cert.href ? (
            <a className="btn" href={cert.href} target="_blank" rel="noreferrer">
              Show credential
            </a>
          ) : (
            <span className="chip">Display only</span>
          )}
        </article>
      ) : null}
    </ModalShell>
  );
}

export function ContactModal({ open, onClose }: Props) {
  const whatsapp = site.social.whatsapp.trim();

  return (
    <ModalShell open={open} onClose={onClose} title="Business card" variant="card">
      <article className="biz-card">
        <div className="biz-card__face">
          <header className="biz-card__left">
            <div className="biz-card__mark" aria-hidden>
              A
            </div>
            <div className="biz-card__identity">
              <p className="biz-card__brand">{site.name}</p>
              <p className="biz-card__legal">{site.legalName}</p>
              <p className="biz-card__role">Web Developer · Communicator</p>
            </div>
            <p className="biz-card__place">{site.locationNote}</p>
          </header>

          <div className="biz-card__divider" aria-hidden />

          <ul className="biz-card__contacts">
            <li>
              <span>Email</span>
              <a href={`mailto:${site.social.email}`}>{site.social.email}</a>
            </li>
            <li>
              <span>Mobile / WhatsApp</span>
              <a href={whatsapp || `tel:${site.social.phone}`}>{site.social.phoneDisplay}</a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a href={site.social.linkedin} target="_blank" rel="noreferrer">
                Chun Kiat Lwi
              </a>
            </li>
            <li>
              <span>GitHub</span>
              <a href={site.social.github} target="_blank" rel="noreferrer">
                AaaaaaaaaronL
              </a>
            </li>
          </ul>
        </div>

        <div className="biz-card__actions">
          {whatsapp ? (
            <a className="btn biz-card__wa" href={whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : null}
          <ResumeMenu placement="up" />
        </div>
      </article>
    </ModalShell>
  );
}

export function ProjectsModal({ open, onClose }: Props) {
  const items = site.projects.items;
  const { index, prev, next } = useCarousel(items.length, open);
  const project = items[index];

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Projects"
      variant="screen"
      footer={<ModalPager index={index} total={items.length} onPrev={prev} onNext={next} />}
    >
      {project ? (
        <article className="project-screen">
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
        </article>
      ) : null}
    </ModalShell>
  );
}
