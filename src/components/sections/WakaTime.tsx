import { useEffect, useState } from "react";
import { site } from "@content/site";

type Lang = {
  name: string;
  percent: number;
  text: string;
};

type Stats = {
  total: string;
  languages: Lang[];
};

const COLORS = [
  "#c4a574",
  "#7eb6ff",
  "#8fd6a0",
  "#f0c36a",
  "#d4a8c4",
  "#9b8cff",
  "#6ec6c6",
  "#e8a87c",
];

/**
 * github-readme-stats often returns a 200 SVG that says "user not found"
 * even when the WakaTime API is fine — so we render from WakaTime's public API.
 */
export function WakaTime() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const username = site.wakatime.username;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://wakatime.com/api/v1/users/${encodeURIComponent(username)}/stats`,
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as {
          data?: {
            human_readable_total?: string;
            languages?: Lang[];
          };
        };
        const languages = (json.data?.languages ?? [])
          .filter((l) => l.percent > 0.4)
          .slice(0, 12);
        if (!cancelled) {
          setStats({
            total: json.data?.human_readable_total ?? "—",
            languages,
          });
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <section className="section" id="wakatime">
      <p className="section-kicker">Coding activity</p>
      <h2 className="section-title">{site.wakatime.headline}</h2>
      <p className="section-sub">{site.wakatime.subhead}</p>

      <div className="waka panel">
        {status === "loading" ? <p className="waka__tip">Loading WakaTime stats…</p> : null}

        {status === "error" ? (
          <p className="waka__tip">
            Could not load live WakaTime stats. Please open the profile link below.
          </p>
        ) : null}

        {status === "ready" && stats ? (
          <div className="waka__chart">
            <div className="waka__summary">
              <p className="waka__eyebrow">All-time coding</p>
              <p className="waka__total">{stats.total}</p>
            </div>
            <p className="waka__eyebrow">Languages</p>
            <ul>
              {stats.languages.map((lang, i) => (
                <li key={lang.name}>
                  <div className="waka__row">
                    <span>{lang.name}</span>
                    <span>
                      {lang.percent.toFixed(1)}% · {lang.text}
                    </span>
                  </div>
                  <div className="waka__bar">
                    <span
                      style={{
                        width: `${Math.max(lang.percent, 2)}%`,
                        background: COLORS[i % COLORS.length],
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="waka__card">
          <p className="waka__eyebrow">WakaTime profile</p>
          <h3>@{username}</h3>
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
      </div>
    </section>
  );
}
