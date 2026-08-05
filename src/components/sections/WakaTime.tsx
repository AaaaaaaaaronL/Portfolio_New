import { site } from "@content/site";

const hasCustomEmbed =
  Boolean(site.wakatime.embedSrc) &&
  !site.wakatime.embedSrc.includes("placeholder");

export function WakaTime() {
  return (
    <section className="section" id="wakatime">
      <p className="section-kicker">Coding activity</p>
      <h2 className="section-title">{site.wakatime.headline}</h2>
      <p className="section-sub">{site.wakatime.subhead}</p>

      <div className="waka panel">
        {hasCustomEmbed ? (
          <div className="waka__embed">
            <img src={site.wakatime.embedSrc} alt="WakaTime coding activity chart" />
          </div>
        ) : null}

        <div className="waka__card">
          <p className="waka__eyebrow">WakaTime profile</p>
          <h3>Aaron_Lwi</h3>
          <p>{site.wakatime.note}</p>
          <a
            className="btn btn-primary"
            href={site.wakatime.profileUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open WakaTime charts
          </a>
        </div>

        {!hasCustomEmbed ? (
          <p className="waka__tip">
            To embed a chart on this page: WakaTime → Embeddables → copy the image/share URL into{" "}
            <code>content/site.ts</code> → <code>wakatime.embedSrc</code>.
          </p>
        ) : null}
      </div>
    </section>
  );
}
