"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { CloudShader } from "@/components/ui/cloud-shader";
import { SpaceShader } from "@/components/ui/space-shader";
import { cn } from "@/lib/utils";

function HeroContent({ isDark }: { isDark: boolean }) {
  const t = useTranslations("hero");

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-28 pt-32 text-center text-white">
      {!isDark ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.55)_0%,rgba(15,23,42,0.22)_48%,transparent_72%)]"
          aria-hidden
        />
      ) : null}

      <div className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm uppercase tracking-[0.25em] text-white/80"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] md:text-6xl lg:text-7xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_16px_rgba(0,0,0,0.3)] md:text-xl"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild variant={isDark ? "primary" : "skyPrimary"}>
            <a href="#projekty">{t("ctaWork")}</a>
          </Button>
          <Button asChild variant={isDark ? "heroOutline" : "skyOutline"}>
            <a href="#kontakt">{t("ctaContact")}</a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-5 text-sm text-white/75"
        >
          {t("hint")}
        </motion.p>
      </div>
    </div>
  );
}

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section id="o-mne" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            isDark ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <CloudShader className="h-full min-h-screen w-full" speed={0.85} count={6} />
        </div>
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            isDark ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <SpaceShader className="h-full min-h-screen w-full" speed={0.9} />
        </div>
      </div>

      <HeroContent isDark={isDark} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-background to-transparent" />

      <motion.a
        href="#zkusenosti"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 text-white/60 transition hover:text-white"
        aria-label="Scroll down"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
