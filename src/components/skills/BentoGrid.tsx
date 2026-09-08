"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Code2, Database, Globe, Layers, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

import { BentoCard } from "@/components/skills/BentoCard";
import { cn } from "@/lib/utils";

const MiniShape3D = dynamic(
  () =>
    import("@/components/skills/MiniShape3D").then((mod) => mod.MiniShape3D),
  { ssr: false },
);

function VisualPanel({
  children,
  className,
  bleed = false,
}: {
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <div
      className={cn(
        "bento-visual relative h-full min-h-[96px] overflow-hidden",
        bleed
          ? "rounded-none ring-0"
          : "ring-1 ring-inset ring-zinc-200/40 dark:ring-white/[0.05]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function FrontendVisual() {
  return (
    <VisualPanel
      bleed
      className="flex h-full min-h-0 flex-col p-2.5 md:p-3"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.16),transparent_60%)]" />
      <div className="relative mb-2.5 flex w-full items-center gap-2">
        <div className="size-2.5 rounded-full bg-zinc-300/90 dark:bg-white/15" />
        <div className="size-2.5 rounded-full bg-zinc-300/90 dark:bg-white/15" />
        <div className="size-2.5 rounded-full bg-zinc-300/90 dark:bg-white/15" />
        <div className="mx-1 h-6 flex-1 rounded-md bg-white/70 dark:bg-white/[0.06]" />
        <span className="flex size-7 items-center justify-center rounded-md bg-white/80 dark:bg-white/[0.08]">
          <Code2 className="size-3.5 text-indigo-600 dark:text-indigo-300" />
        </span>
      </div>
      <div className="relative flex min-h-0 flex-1 gap-2.5 md:gap-3">
        <div className="hidden w-[22%] shrink-0 flex-col gap-2 rounded-lg bg-white/60 p-2.5 dark:bg-white/[0.04] md:flex">
          <div className="h-2 w-3/4 rounded-full bg-zinc-300/70 dark:bg-white/[0.12]" />
          <div className="h-2 w-full rounded-full bg-zinc-200/80 dark:bg-white/[0.08]" />
          <div className="h-2 w-5/6 rounded-full bg-indigo-200/80 dark:bg-indigo-500/20" />
          <div className="mt-1 h-2 w-full rounded-full bg-zinc-200/80 dark:bg-white/[0.08]" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-between rounded-lg bg-white/75 p-3 dark:bg-white/[0.04] md:p-3.5">
          <div className="space-y-2.5">
            <div className="h-2.5 w-2/5 rounded-full bg-zinc-300/70 dark:bg-white/[0.14]" />
            <div className="h-2 w-full rounded-full bg-zinc-200/80 dark:bg-white/[0.08]" />
            <div className="h-2 w-11/12 rounded-full bg-zinc-200/80 dark:bg-white/[0.08]" />
            <div className="h-2 w-4/5 rounded-full bg-zinc-200/80 dark:bg-white/[0.08]" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="h-8 w-24 rounded-md bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-500/25 dark:to-indigo-400/10" />
            <div className="h-8 w-16 rounded-md bg-zinc-100 dark:bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}

function FullstackVisual() {
  const items = [
    { label: "API", icon: Globe },
    { label: "DB", icon: Database },
    { label: "CMS", icon: Layers },
    { label: "Auth", icon: Lock },
  ];

  return (
    <VisualPanel bleed className="flex items-center justify-center p-2.5 md:p-3">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_72%,rgba(99,102,241,0.1),transparent_52%)]" />
      <div className="relative grid w-full grid-cols-2 gap-2.5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-lg bg-white/70 px-2.5 py-2 backdrop-blur-sm dark:bg-white/[0.04]"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-indigo-50/90 dark:bg-indigo-500/15">
              <item.icon className="size-3.5 text-indigo-600 dark:text-indigo-300" />
            </span>
            <span className="text-xs font-semibold text-zinc-700 dark:text-white/80">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </VisualPanel>
  );
}

export function BentoGrid() {
  const t = useTranslations("bento");

  return (
    <section id="zkusenosti" className="pt-12 pb-6 md:pt-14 md:pb-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 md:mb-6"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-600/80 dark:text-indigo-300/70">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:grid-rows-2 md:items-stretch md:gap-4">
          <BentoCard
            index={0}
            variant="featured"
            className="md:col-span-4 md:row-span-2 md:min-h-[300px]"
            title={t("frontendTitle")}
            description={t("frontendDescription")}
            tags={["TypeScript", "React", "Next.js", "Tailwind CSS"]}
            visual={<FrontendVisual />}
          />

          <BentoCard
            index={1}
            className="md:col-span-2"
            title={t("threeDTitle")}
            description={t("threeDDescription")}
            tags={["Babylon.js", "WebGL", "3D"]}
            visual={
              <VisualPanel bleed>
                <MiniShape3D />
              </VisualPanel>
            }
          />

          <BentoCard
            index={2}
            className="md:col-span-2"
            title={t("fullstackTitle")}
            description={t("fullstackDescription")}
            tags={["Node.js", "NestJS", "GraphQL", "Sanity"]}
            visual={<FullstackVisual />}
          />
        </div>
      </div>
    </section>
  );
}
