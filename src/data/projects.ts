export type WebsiteProject = {
  id: "abivia" | "podpustevnami" | "zvonice";
  href: string;
  palette: [string, string, string];
};

export const websiteProjects: WebsiteProject[] = [
  {
    id: "abivia",
    href: "https://abivia.cz/",
    palette: ["#0F766E", "#5EEAD4", "#F0FDFA"],
  },
  {
    id: "podpustevnami",
    href: "https://www.podpustevnami.cz/",
    palette: ["#3F6212", "#BBF7D0", "#FEF9C3"],
  },
  {
    id: "zvonice",
    href: "https://zvonice.eu/",
    palette: ["#92400E", "#FDE68A", "#FFF7ED"],
  },
];
