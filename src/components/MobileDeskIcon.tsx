import type { ReactNode } from "react";

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function MobileDeskIcon({ id }: { id: string }): ReactNode {
  switch (id) {
    case "dossier":
      return (
        <svg {...svgProps}>
          <path d="M8 4h7l2 2v14H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M10 10h6M10 14h5" />
        </svg>
      );
    case "laptop":
      return (
        <svg {...svgProps}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M2 19h20" />
          <path d="M9 9h6v4H9z" />
        </svg>
      );
    case "folder":
      return (
        <svg {...svgProps}>
          <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10Z" />
        </svg>
      );
    case "certs":
      return (
        <svg {...svgProps}>
          <rect x="5" y="3" width="14" height="16" rx="1.5" />
          <circle cx="12" cy="11" r="2.5" />
          <path d="M10.5 13.5 9 19l3-1.5L15 19l-1.5-5.5" />
        </svg>
      );
    case "envelope":
      return (
        <svg {...svgProps}>
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <path d="m4 8 8 5 8-5" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="7" />
        </svg>
      );
  }
}
