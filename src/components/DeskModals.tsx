import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import "./DeskModals.css";

export type DeskModalId =
  | "dossier"
  | "experience"
  | "projects"
  | "certificates"
  | "contact";

type ShellProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  variant?: "file" | "diploma" | "card" | "screen";
  children: ReactNode;
  footer?: ReactNode;
};

export function ModalShell({
  open,
  title,
  onClose,
  variant = "file",
  children,
  footer,
}: ShellProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="desk-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button className="desk-modal__backdrop" aria-label="Close" onClick={onClose} />
          <motion.div
            className={`desk-modal__panel desk-modal__panel--${variant}`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="desk-modal__top">
              <h2>{title}</h2>
              <button className="desk-modal__close" onClick={onClose} aria-label="Close dialog">
                ×
              </button>
            </div>
            <div className="desk-modal__body">{children}</div>
            {footer ? <div className="desk-modal__footer">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

type PagerProps = {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  label?: string;
};

export function ModalPager({ index, total, onPrev, onNext, label }: PagerProps) {
  return (
    <div className="modal-pager">
      <button type="button" onClick={onPrev} aria-label="Previous" disabled={total <= 1}>
        ←
      </button>
      <span>
        {label ? `${label} ` : ""}
        {index + 1} / {total}
      </span>
      <button type="button" onClick={onNext} aria-label="Next" disabled={total <= 1}>
        →
      </button>
    </div>
  );
}

export function useCarousel(length: number, enabled = true) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + length) % Math.max(length, 1));
  }, [length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(length, 1));
  }, [length]);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, length, prev, next]);

  return { index, prev, next, setIndex };
}
