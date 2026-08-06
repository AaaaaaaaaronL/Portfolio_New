import { useEffect, useRef, useState } from "react";
import { site } from "@content/site";
import "./ResumeMenu.css";

type Props = {
  compact?: boolean;
  className?: string;
};

export function ResumeMenu({ compact = false, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={`resume-menu ${className}`} ref={rootRef}>
      <button
        className={`btn btn-primary ${compact ? "resume-menu__trigger--compact" : ""}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="resume-menu__label-full">{site.ctas.primary}</span>
        <span className="resume-menu__label-short">Resume</span>
        <span aria-hidden>▾</span>
      </button>
      {open && (
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
      )}
    </div>
  );
}
