"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";

const socials = [
  {
    href: "https://linkedin.com/in/ondravseta",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://github.com/ondravseta",
    label: "GitHub",
    icon: Github,
  },
];

const navLinks = [
  { href: "#o-mne", key: "about" as const },
  { href: "#zkusenosti", key: "experience" as const },
  { href: "#projekty", key: "projects" as const },
  { href: "#kontakt", key: "contact" as const },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="section-padding pb-10 pt-8">
      <motion.section
        id="kontakt"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:shadow-none"
      >
        <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="relative aspect-[4/5] min-h-[280px] md:aspect-auto md:min-h-[420px]">
            <Image
              src="/ondrej-vseticka.jpg"
              alt={t("portraitAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover object-top"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent dark:from-zinc-950/40 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/10 dark:md:to-zinc-900"
              aria-hidden
            />
          </div>

          <div className="flex flex-col justify-center bg-white p-8 text-center dark:bg-zinc-900 md:p-12 md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-base text-zinc-600 dark:text-white/60 md:text-lg">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <Button asChild variant="primary">
                <a href="mailto:ondravseta@email.cz">{t("cta")}</a>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto mt-12 max-w-5xl border-t border-zinc-200/80 pt-10 dark:border-white/10"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] md:gap-8">
          <div>
            <a
              href="#o-mne"
              className="inline-flex items-center gap-2 text-lg font-semibold tracking-wide text-zinc-900 dark:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-sm dark:border-indigo-400/20 dark:bg-indigo-500/10">
                OV
              </span>
              {t("copyright")}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-white/55">
              {t("tagline")}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-white/35">
              {t("stack")}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-white/35">
              {t("navigation")}
            </p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-white/60 dark:hover:text-white"
                  >
                    {tNav(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-white/35">
              {t("connect")}
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:ondravseta@email.cz"
                  className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-white/60 dark:hover:text-white"
                >
                  <Mail className="h-4 w-4 transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                  ondravseta@email.cz
                </a>
              </li>
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-white/60 dark:hover:text-white"
                  >
                    <social.icon className="h-4 w-4 transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-zinc-200/80 pt-6 dark:border-white/10 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-400 dark:text-white/30">
            © {new Date().getFullYear()} {t("copyright")}. {t("rights")}
          </p>
          <a
            href="#o-mne"
            className="group inline-flex items-center gap-2 text-xs text-zinc-500 transition hover:text-zinc-900 dark:text-white/45 dark:hover:text-white"
          >
            {t("backToTop")}
            <ArrowUp className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
