"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Button } from "@/components/ui/Button";
import { sectionHref } from "@/lib/sections";
import type { Locale } from "@/i18n/routing";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

  return (
    <section
      id={sectionHref(locale, "about").slice(1)}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-32 md:px-6 md:pt-36"
    >
      <AuroraBackground />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: revealEase }}
          className="mb-4 text-sm font-medium text-accent"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: revealEase }}
          className="font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.06] tracking-tight text-foreground"
        >
          {t("titleBefore")}{" "}
          <span className="text-accent-gradient">{t("titleAccent")}</span>{" "}
          {t("titleAfter")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: revealEase }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: revealEase }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild variant="primary">
            <a href={sectionHref(locale, "work")}>{t("ctaWork")}</a>
          </Button>
          <Button asChild variant="outline">
            <a href={sectionHref(locale, "profile")}>{t("ctaProfile")}</a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 font-mono text-xs text-muted"
        >
          {t("hint")}
        </motion.p>
      </div>

      <motion.a
        href={sectionHref(locale, "work")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted transition hover:text-foreground"
        aria-label={t("ctaWork")}
      >
        <ChevronDown className="size-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
