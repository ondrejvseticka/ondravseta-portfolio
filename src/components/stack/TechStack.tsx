"use client";

import { motion } from "framer-motion";
import { Box, Brackets, Server } from "lucide-react";
import { useTranslations } from "next-intl";

const groupKeys = ["frontend", "threeD", "backend"] as const;

const groupIcons = {
  frontend: Brackets,
  threeD: Box,
  backend: Server,
} as const;

const revealEase = [0.22, 1, 0.36, 1] as const;

export function TechStack() {
  const t = useTranslations("stack");

  return (
    <section className="border-y border-border bg-stone-100/40 py-10 dark:bg-white/[0.02] md:py-12">
      <div className="content-shell">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: revealEase }}
          className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-accent">{t("label")}</p>
            <h2 className="mt-1 font-display text-[clamp(1.35rem,2.5vw,1.75rem)] tracking-tight text-foreground">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">{t("subtitle")}</p>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {groupKeys.map((key, index) => {
            const Icon = groupIcons[key];
            const itemsRaw = t.raw(`groups.${key}.items`);
            const items = Array.isArray(itemsRaw) ? itemsRaw : [];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: revealEase }}
                className="surface-card p-4 md:p-5"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-sm font-medium text-foreground">
                    {t(`groups.${key}.title`)}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-background/80 px-2.5 py-1 font-mono text-[11px] text-foreground/90 dark:bg-background/40"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
