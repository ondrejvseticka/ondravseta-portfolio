"use client";

import { motion } from "framer-motion";
import { Box, Layers, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const serviceKeys = ["webApps", "threeD", "optimization"] as const;

const icons = {
  webApps: Layers,
  threeD: Box,
  optimization: Zap,
} as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section className="section-padding pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-6xl"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-indigo-600/80 dark:text-indigo-300/70">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
          {t("title")}
        </h2>
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {serviceKeys.map((key, index) => {
          const Icon = icons[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass glass-hover rounded-2xl p-6 md:p-8"
            >
              <div className="mb-5 inline-flex rounded-xl border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-400/20 dark:bg-indigo-500/10">
                <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-white/60">
                {t(`items.${key}.description`)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
