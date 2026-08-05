import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@content/site";
import { ResumeMenu } from "./ResumeMenu";
import "./Nav.css";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="nav__brand" href="#top">
        <span className="nav__brand-mark">A</span>
        <span className="nav__brand-text">Aaron</span>
      </a>

      <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
        {site.nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="nav__actions">
        <ResumeMenu compact />
        <a
          className="btn nav__linkedin"
          href={site.social.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <button
          className="nav__burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </motion.header>
  );
}
