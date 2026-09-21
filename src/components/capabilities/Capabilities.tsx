"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealTransition } from "@/lib/motion";
import { sectionHref } from "@/lib/sections";
import type { Locale } from "@/i18n/routing";

const capabilityKeys = ["frontend", "threeD", "fullstack"] as const;

type CapabilityKey = (typeof capabilityKeys)[number];

function CapabilityPanel({
  capabilityKey,
  index,
}: {
  capabilityKey: CapabilityKey;
  index: number;
}) {
  const t = useTranslations("capabilities");
  const tagsRaw = t.raw(`items.${capabilityKey}.tags`);
  const tags = Array.isArray(tagsRaw) ? tagsRaw : [];

  return (
    <div className="surface-card flex h-full flex-col p-6 md:p-8">
      <p className="font-mono text-sm text-accent">0{index + 1}</p>
      <h3 className="mt-3 font-display text-xl tracking-tight text-foreground md:text-2xl">
        {t(`items.${capabilityKey}.title`)}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">
        {t(`items.${capabilityKey}.description`)}
      </p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Capabilities() {
  const t = useTranslations("capabilities");
  const locale = useLocale() as Locale;

  return (
    <section
      id={sectionHref(locale, "capabilities").slice(1)}
      className="section-y"
    >
      <div className="content-shell">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3 md:items-stretch md:gap-5">
          {capabilityKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...revealTransition, delay: index * 0.08 }}
              className="h-full"
            >
              <CapabilityPanel capabilityKey={key} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
