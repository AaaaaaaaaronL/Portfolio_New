import { useEffect, useRef, useState } from "react";
import { site } from "@content/site";
import "./ResumeMenu.css";

type Props = {
  compact?: boolean;
  className?: string;
  /** Prefer "up" near the bottom of the page (e.g. Contact). */
  placement?: "up" | "down";
};

export function ResumeMenu({
  compact = false,
  className = "",
  placement = "down",
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className={`resume-menu resume-menu--${placement} ${open ? "is-open" : ""} ${className}`}
      ref={rootRef}
    >
      <button
        type="button"
        className={`btn btn-primary ${compact ? "resume-menu__trigger--compact" : ""}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="resume-menu__label-full">{site.ctas.primary}</span>
        <span className="resume-menu__label-short">Resume</span>
        <span aria-hidden>▾</span>
      </button>
      {open ? (
        <div className="resume-menu__panel" role="menu">
          {site.ctas.resumes.map((resume) => (
            <a
              key={resume.href}
              role="menuitem"
              href={resume.href}
              download={resume.filename}
              onClick={() => setOpen(false)}
            >
              {resume.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
