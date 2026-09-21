import type { Locale } from "@/i18n/routing";

export const sectionAnchors = {
  about: { cs: "o-mne", en: "about" },
  work: { cs: "prace", en: "work" },
  capabilities: { cs: "schopnosti", en: "capabilities" },
  process: { cs: "spoluprace", en: "process" },
  profile: { cs: "profil", en: "profile" },
  contact: { cs: "kontakt", en: "contact" },
} as const;

export type SectionKey = keyof typeof sectionAnchors;

export function sectionHref(locale: Locale, key: SectionKey) {
  return `#${sectionAnchors[key][locale]}`;
}
