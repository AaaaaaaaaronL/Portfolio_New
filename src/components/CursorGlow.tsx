import { useEffect, useState } from "react";
import "./CursorGlow.css";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    setOn(true);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!on) return null;

  return (
    <div
      className="cursor-glow"
      aria-hidden
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    />
  );
}
