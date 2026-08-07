import { useEffect, useMemo, useState } from "react";
import { site } from "@content/site";

type Slice = {
  name: string;
  percent: number;
  text: string;
};

type Stats = {
  fetchedAt?: string;
  username: string;
  total: string;
  dailyAverage: string;
  range: string;
  languages: Slice[];
  editors: Slice[];
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
  "#a8c5ff",
  "#f2a1a1",
];

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polar(cx, cy, r, endAngle);
  const end = polar(cx, cy, r, startAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

function DonutChart({ items }: { items: Slice[] }) {
  const slices = useMemo(() => {
    const top = items.slice(0, 6);
    const used = top.reduce((sum, item) => sum + item.percent, 0);
    const rest = Math.max(0, 100 - used);
    return rest > 0.5
      ? [...top, { name: "Other", percent: rest, text: "" }]
      : top;
  }, [items]);

  let angle = 0;
  const cx = 120;
  const cy = 120;
  const radius = 78;
  const stroke = 28;

  return (
    <div className="waka__donut-wrap">
      <svg className="waka__donut" viewBox="0 0 240 240" role="img" aria-label="Language share chart">
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        {slices.map((item, i) => {
          const span = (item.percent / 100) * 360;
          const start = angle;
          const end = angle + Math.max(span, 0.8);
          angle = end;
          if (item.percent <= 0) return null;
          return (
            <path
              key={item.name}
              d={arcPath(cx, cy, radius, start, end)}
              fill="none"
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={stroke}
              strokeLinecap="butt"
            />
          );
        })}
        <circle cx={cx} cy={cy} r={52} fill="#0c0b0a" />
        <text x={cx} y={cy - 6} textAnchor="middle" className="waka__donut-label">
          Languages
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" className="waka__donut-value">
          Top {Math.min(items.length, 6)}
        </text>
      </svg>
      <ul className="waka__legend">
        {slices.map((item, i) => (
          <li key={item.name}>
            <span className="waka__swatch" style={{ background: COLORS[i % COLORS.length] }} />
            <span>{item.name}</span>
            <strong>{item.percent.toFixed(1)}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BarList({ title, items }: { title: string; items: Slice[] }) {
  if (!items.length) return null;
  return (
    <div className="waka__chart">
      <p className="waka__eyebrow">{title}</p>
      <ul>
        {items.map((item, i) => (
          <li key={item.name}>
            <div className="waka__row">
              <span>{item.name}</span>
              <span>
                {item.percent.toFixed(1)}%
                {item.text ? ` · ${item.text}` : ""}
              </span>
            </div>
            <div className="waka__bar">
              <span
                style={{
                  width: `${Math.max(item.percent, 2)}%`,
                  background: COLORS[i % COLORS.length],
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WakaTime() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const username = site.wakatime.username;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/wakatime.json`, {
          cache: "no-cache",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Stats;
        if (!cancelled) {
          setStats(json);
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
  }, []);

  return (
    <section className="section" id="wakatime">
      <p className="section-kicker">Coding activity</p>
      <h2 className="section-title">{site.wakatime.headline}</h2>
      <p className="section-sub">{site.wakatime.subhead}</p>

      <div className="waka panel">
        {status === "loading" ? <p className="waka__tip">Loading WakaTime chart…</p> : null}

        {status === "error" ? (
          <p className="waka__tip">
            Could not load the WakaTime chart file. Please open the profile link below.
          </p>
        ) : null}

        {status === "ready" && stats ? (
          <>
            <div className="waka__stats-grid">
              <div className="waka__stat">
                <p className="waka__eyebrow">{stats.range || "All time"}</p>
                <p className="waka__total">{stats.total}</p>
              </div>
              <div className="waka__stat">
                <p className="waka__eyebrow">Daily average</p>
                <p className="waka__total waka__total--sm">{stats.dailyAverage}</p>
              </div>
            </div>

            <div className="waka__visual">
              <DonutChart items={stats.languages} />
              <BarList title="Languages" items={stats.languages} />
            </div>

            <BarList title="Editors" items={stats.editors} />

            {stats.fetchedAt ? (
              <p className="waka__tip">
                Chart refreshed at build time · {new Date(stats.fetchedAt).toLocaleString()}
              </p>
            ) : null}
          </>
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
            Open WakaTime
          </a>
        </div>
      </div>
    </section>
  );
}
