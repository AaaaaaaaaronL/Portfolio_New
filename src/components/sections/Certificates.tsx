import { site } from "@content/site";

export function Certificates() {
  return (
    <section className="section" id="certificates">
      <p className="section-kicker">Credentials</p>
      <h2 className="section-title">{site.certificates.headline}</h2>

      <div className="cert-list panel">
        {site.certificates.items.map((cert) => (
          <article key={cert.id} className="cert">
            <div>
              <h3>{cert.title}</h3>
              <p>
                {cert.issuer} · {cert.date}
                {"credentialId" in cert && cert.credentialId
                  ? ` · ${cert.credentialId}`
                  : null}
              </p>
            </div>
            {cert.href ? (
              <a className="btn" href={cert.href} target="_blank" rel="noreferrer">
                Show credential
              </a>
            ) : (
              <span className="chip">Display only</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
