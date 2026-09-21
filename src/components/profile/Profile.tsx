"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { sectionHref } from "@/lib/sections";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const revealEase = [0.22, 1, 0.36, 1] as const;

function ProfileList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span
            className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Profile() {
  const t = useTranslations("profile");
  const locale = useLocale() as Locale;

  const focusItems = t.raw("focusItems") as string[];
  const stackItems = t.raw("stackHighlight") as string[];
  const lookingItems = t.raw("lookingItems") as string[];

  return (
    <section
      id={sectionHref(locale, "profile").slice(1)}
      className="section-y"
    >
      <div className="content-shell">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 md:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: revealEase }}
            className="surface-card flex h-full flex-col p-6 md:p-8"
          >
            <p className="font-mono text-xs text-accent">{t("focusTitle")}</p>
            <h3 className="mt-2 font-display text-xl tracking-tight text-foreground md:text-2xl">
              {t("focusHeadline")}
            </h3>
            <div className="mt-5 flex-1">
              <ProfileList items={focusItems} />
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {t("stackTitle")}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {stackItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-background/70 px-2.5 py-1 font-mono text-[11px] text-foreground/90 dark:bg-background/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: revealEase }}
            className={cn(
              "surface-card flex h-full flex-col p-6 md:p-8",
              "bg-gradient-to-br from-stone-100/80 via-surface to-accent-soft/20",
              "dark:from-white/[0.03] dark:via-surface dark:to-accent-soft/10",
            )}
          >
            <p className="font-mono text-xs text-accent">{t("lookingTitle")}</p>
            <h3 className="mt-2 font-display text-xl tracking-tight text-foreground md:text-2xl">
              {t("lookingHeadline")}
            </h3>
            <div className="mt-5 flex-1">
              <ProfileList items={lookingItems} />
            </div>
            <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted">
              {t("availability")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
