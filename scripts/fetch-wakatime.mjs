/**
 * Fetches public WakaTime stats at build time so the site can render charts
 * without browser CORS limits or exposing an API key.
 */
import fs from "node:fs";
import path from "node:path";

const USERNAME = "Aaron_Lwi";
const OUT = path.join("public", "data", "wakatime.json");

async function main() {
  const url = `https://wakatime.com/api/v1/users/${encodeURIComponent(USERNAME)}/stats`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`WakaTime API failed: HTTP ${res.status}`);
  }

  const json = await res.json();
  const data = json.data ?? {};

  const payload = {
    fetchedAt: new Date().toISOString(),
    username: USERNAME,
    total: data.human_readable_total ?? "—",
    dailyAverage: data.human_readable_daily_average ?? "—",
    range: data.human_readable_range ?? "All time",
    languages: (data.languages ?? [])
      .filter((l) => typeof l.percent === "number" && l.percent > 0.4)
      .slice(0, 10)
      .map((l) => ({
        name: l.name,
        percent: l.percent,
        text: l.text,
      })),
    editors: (data.editors ?? [])
      .filter((e) => typeof e.percent === "number" && e.percent > 1)
      .slice(0, 6)
      .map((e) => ({
        name: e.name,
        percent: e.percent,
        text: e.text,
      })),
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(
    `WakaTime stats written to ${OUT} (${payload.languages.length} languages)`,
  );
}

main().catch((err) => {
  console.error(err);
  // Keep previous public/data/wakatime.json if present so builds still succeed offline.
  if (fs.existsSync(OUT)) {
    console.warn("Using existing wakatime.json from a previous fetch.");
    process.exit(0);
  }
  process.exit(1);
});
