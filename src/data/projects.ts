export type ProjectKind = "client" | "lab";

export type PortfolioProject = {
  id: string;
  kind: ProjectKind;
  href?: string;
  repo?: string;
  preview: string;
  palette: [string, string, string];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "abivia",
    kind: "client",
    href: "https://abivia.cz/",
    preview: "/previews/abivia.jpg",
    palette: ["#1E3A8A", "#E11D48", "#F8FAFC"],
  },
  {
    id: "prinsights",
    kind: "client",
    href: "https://prinsights.cz/",
    preview: "/previews/prinsights.jpg",
    palette: ["#0A0A0A", "#FAFAFA", "#E5E5E5"],
  },
  {
    id: "podpustevnami",
    kind: "client",
    href: "https://www.podpustevnami.cz/",
    preview: "/previews/podpustevnami.jpg",
    palette: ["#3F6212", "#BBF7D0", "#FEF9C3"],
  },
  {
    id: "zvonice",
    kind: "client",
    href: "https://zvonice.eu/",
    preview: "/previews/zvonice.jpg",
    palette: ["#166534", "#86EFAC", "#F0FDF4"],
  },
  {
    id: "keeb",
    kind: "lab",
    href: "https://keeb-sigma.vercel.app/",
    repo: "https://github.com/ondrejvseticka/keeb",
    preview: "/previews/keeb.png",
    palette: ["#312E81", "#6366F1", "#E0E7FF"],
  },
  {
    id: "prsi",
    kind: "lab",
    href: "https://mau-mau-card-game.vercel.app/",
    repo: "https://github.com/ondrejvseticka/mau-mau",
    preview: "/previews/prsi.png",
    palette: ["#B45309", "#FBBF24", "#FEF3C7"],
  },
];

/** @deprecated use portfolioProjects */
export const websiteProjects = portfolioProjects.filter((p) => p.kind === "client");
