"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealTransition } from "@/lib/motion";
import { sectionHref } from "@/lib/sections";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const stepKeys = ["discover", "design", "build", "launch"] as const;

const stepVisuals: Record<
  (typeof stepKeys)[number],
  { gradient: string; accent: string }
> = {
  discover: {
    gradient: "from-amber-100 via-orange-50 to-stone-100 dark:from-amber-950/40 dark:via-stone-900 dark:to-stone-950",
    accent: "#c2410c",
  },
  design: {
    gradient: "from-indigo-100/80 via-violet-50 to-stone-100 dark:from-indigo-950/30 dark:via-stone-900 dark:to-stone-950",
    accent: "#6366f1",
  },
  build: {
    gradient: "from-stone-200 via-stone-100 to-amber-50 dark:from-stone-900 dark:via-stone-950 dark:to-stone-900",
    accent: "#78716c",
  },
  launch: {
    gradient: "from-emerald-100 via-teal-50 to-stone-100 dark:from-emerald-950/30 dark:via-stone-900 dark:to-stone-950",
    accent: "#059669",
  },
};

function StepVisual({ step }: { step: (typeof stepKeys)[number] }) {
  const visual = stepVisuals[step];

  if (step === "discover") {
    return (
      <div className="relative flex h-full items-center justify-center p-6">
        <div className="grid grid-cols-3 gap-2.5">
          {[0, 1, 2, 3, 4, 5].map((node) => (
            <div
              key={node}
              className={cn(
                "size-8 rounded-full border-2 border-white/80 bg-white/60 shadow-sm dark:border-white/10 dark:bg-white/5",
                node === 1 && "scale-110 ring-2 ring-accent/30",
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === "design") {
    return (
      <div className="relative flex h-full flex-col gap-2 p-5">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-white/70 dark:bg-white/15" />
          <div className="size-2 rounded-full bg-white/70 dark:bg-white/15" />
          <div className="size-2 rounded-full bg-white/70 dark:bg-white/15" />
        </div>
        <div className="grid flex-1 grid-cols-[28%_1fr] gap-2">
          <div className="space-y-1.5 rounded-lg bg-white/60 p-2 dark:bg-white/[0.05]">
            <div className="h-1.5 w-3/4 rounded-full bg-stone-300/70 dark:bg-white/10" />
            <div className="h-1.5 w-full rounded-full bg-stone-200/80 dark:bg-white/[0.08]" />
          </div>
          <div className="space-y-1.5 rounded-lg bg-white/75 p-2.5 dark:bg-white/[0.05]">
            <div className="h-2 w-2/5 rounded-full bg-stone-300/70 dark:bg-white/12" />
            <div className="h-1.5 w-full rounded-full bg-stone-200/80 dark:bg-white/[0.08]" />
            <div className="mt-2 h-6 w-20 rounded-md bg-gradient-to-r from-indigo-100 to-violet-50 dark:from-indigo-500/20 dark:to-violet-500/10" />
          </div>
        </div>
      </div>
    );
  }

  if (step === "build") {
    return (
      <div className="relative flex h-full items-center p-5 font-mono text-[10px] leading-relaxed md:text-[11px]">
        <div className="w-full rounded-lg border border-white/60 bg-white/70 p-3 shadow-sm dark:border-white/10 dark:bg-black/20">
          <p className="text-accent">const product = build({"{"} … {"});"}</p>
          <p className="mt-2 text-emerald-600 dark:text-emerald-400">// sprint demo ✓</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full items-center justify-center p-6">
      <div
        className="flex size-14 items-center justify-center rounded-full border-2 border-white/80 bg-white/70 shadow-md dark:border-white/10 dark:bg-white/[0.06]"
        style={{ color: visual.accent }}
      >
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export function Process() {
  const t = useTranslations("process");
  const locale = useLocale() as Locale;

  return (
    <section
      id={sectionHref(locale, "process").slice(1)}
      className="section-y bg-stone-100/60 dark:bg-white/[0.02]"
    >
      <div className="content-shell">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <ol className="relative mt-10 space-y-8 md:mx-auto md:max-w-4xl md:space-y-12">
          {stepKeys.map((key, index) => {
            const visual = stepVisuals[key];
            const isLeft = index % 2 === 0;

            return (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...revealTransition, delay: index * 0.06 }}
                className={cn(
                  "relative pl-14 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start md:gap-x-5 md:pl-0",
                )}
              >
                {index < stepKeys.length - 1 ? (
                  <div
                    className="absolute left-5 top-5 z-0 h-[calc(100%+2rem)] w-px bg-border md:left-1/2 md:top-[1.375rem] md:h-[calc(100%+3rem)] md:-translate-x-1/2"
                    aria-hidden
                  />
                ) : null}

                <span
                  className={cn(
                    "relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-accent/30 bg-surface font-mono text-sm text-accent md:col-start-2 md:size-11 md:shrink-0",
                    "absolute left-0 top-0 md:relative md:left-auto md:top-auto",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <article
                  className={cn(
                    "max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-sm md:max-w-[20rem] lg:max-w-[22rem]",
                    isLeft
                      ? "md:col-start-1 md:justify-self-end"
                      : "md:col-start-3 md:justify-self-start",
                  )}
                >
                  <div
                    className={cn(
                      "relative h-28 overflow-hidden bg-gradient-to-br md:h-32",
                      visual.gradient,
                    )}
                  >
                    <StepVisual step={key} />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-display text-lg tracking-tight text-foreground md:text-xl">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
