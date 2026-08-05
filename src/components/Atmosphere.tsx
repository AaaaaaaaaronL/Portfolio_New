import "./Atmosphere.css";

const CODE_SNIPPETS = [
  "const learn = () => curiosity()",
  "function build(idea) { return ship(idea) }",
  "while (growing) { practice() }",
  "export default Aaron",
  "git commit -m 'FEAT: keep learning'",
  "SELECT * FROM skills WHERE active = 1",
  "npm run build && deploy()",
  "if (problem) solve(problem)",
  "type Skill = 'web' | 'ops' | 'people'",
  "await improve(self)",
];

type Props = {
  variant?: "page" | "hero";
};

export function Atmosphere({ variant = "page" }: Props) {
  const starCount = variant === "hero" ? 72 : 40;

  return (
    <div className={`atmosphere atmosphere--${variant}`} aria-hidden>
      <div className="atmosphere__stars">
        {Array.from({ length: starCount }, (_, i) => (
          <span
            key={i}
            className="atmosphere__star"
            style={{
              left: `${(i * 13 + 7) % 100}%`,
              top: `${(i * 19 + 11) % 100}%`,
              animationDelay: `${(i % 14) * 0.28}s`,
              animationDuration: `${2.4 + (i % 6) * 0.5}s`,
            }}
          />
        ))}
      </div>
      <div className="atmosphere__code">
        {CODE_SNIPPETS.map((line, i) => (
          <span
            key={line}
            className="atmosphere__line"
            style={{
              left: `${4 + ((i * 19) % 78)}%`,
              animationDelay: `${i * 1.1}s`,
              animationDuration: `${12 + (i % 5) * 2.2}s`,
            }}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
