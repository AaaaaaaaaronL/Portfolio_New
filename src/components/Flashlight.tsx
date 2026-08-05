import { useEffect, useState } from "react";
import "./Flashlight.css";

type Props = {
  enabled?: boolean;
};

/** Soft spotlight + beam that follow the cursor light — no icon. */
export function Flashlight({ enabled = true }: Props) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [angle, setAngle] = useState(-35);
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || !enabled) {
      setOn(false);
      return;
    }

    setOn(true);
    let prev = { x: 0, y: 0 };
    let hasPrev = false;

    const move = (e: MouseEvent) => {
      const next = { x: e.clientX, y: e.clientY };
      if (hasPrev) {
        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        if (Math.hypot(dx, dy) > 2.5) {
          const target = (Math.atan2(dy, dx) * 180) / Math.PI;
          setAngle((current) => {
            const delta = ((target - current + 540) % 360) - 180;
            return current + delta * 0.22;
          });
        }
      }
      prev = next;
      hasPrev = true;
      setPos(next);
      setActive(true);
    };

    const leave = () => setActive(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [enabled]);

  if (!on) return null;

  const rad = (angle * Math.PI) / 180;
  const length = 200;
  // Beam trails behind the light, hotspot stays on the cursor
  const tipX = pos.x - Math.cos(rad) * length;
  const tipY = pos.y - Math.sin(rad) * length;
  const nx = -Math.sin(rad);
  const ny = Math.cos(rad);
  const startSpread = 70;
  const endSpread = 8;
  const points = active
    ? [
        `${tipX + nx * startSpread},${tipY + ny * startSpread}`,
        `${tipX - nx * startSpread},${tipY - ny * startSpread}`,
        `${pos.x - nx * endSpread},${pos.y - ny * endSpread}`,
        `${pos.x + nx * endSpread},${pos.y + ny * endSpread}`,
      ].join(" ")
    : "";

  return (
    <div className={`flashlight ${active ? "is-active" : ""}`} aria-hidden>
      <div
        className="flashlight__veil"
        style={{
          background: active
            ? `radial-gradient(
                circle 210px at ${pos.x}px ${pos.y}px,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.08) 28%,
                rgba(0, 0, 0, 0.4) 56%,
                rgba(0, 0, 0, 0.64) 100%
              )`
            : `radial-gradient(
                circle 180px at 50% 55%,
                rgba(0, 0, 0, 0.15) 0%,
                rgba(0, 0, 0, 0.55) 100%
              )`,
        }}
      />

      {active ? (
        <svg className="flashlight__svg" width="100%" height="100%">
          <defs>
            <linearGradient
              id="followBeam"
              gradientUnits="userSpaceOnUse"
              x1={tipX}
              y1={tipY}
              x2={pos.x}
              y2={pos.y}
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="55%" stopColor="#ffe9b5" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#fff8e8" stopOpacity="0.42" />
            </linearGradient>
            <radialGradient id="followHot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.72" />
              <stop offset="35%" stopColor="#fff1c9" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#fff1c9" stopOpacity="0" />
            </radialGradient>
            <filter id="followBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>
          <polygon points={points} fill="url(#followBeam)" filter="url(#followBlur)" />
          <circle cx={pos.x} cy={pos.y} r="120" fill="url(#followHot)" filter="url(#followBlur)" />
        </svg>
      ) : null}
    </div>
  );
}
