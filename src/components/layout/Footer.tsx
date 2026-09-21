"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import type { Locale } from "@/i18n/routing";
import { sectionHref, type SectionKey } from "@/lib/sections";

const socials = [
  { href: "https://www.linkedin.com/in/ond%C5%99ej-v%C5%A1eti%C4%8Dka-7376a0271/", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com/ondrejvseticka", label: "GitHub", icon: Github },
];

const navKeys: SectionKey[] = [
  "about",
  "work",
  "capabilities",
  "process",
  "profile",
  "contact",
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;

  const navLinks = navKeys.map((key) => ({
    href: sectionHref(locale, key),
    label: tNav(key),
  }));

  return (
    <footer className="content-shell pb-10 pt-8">
      <motion.section
        id={sectionHref(locale, "contact").slice(1)}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65 }}
        className="surface-card relative overflow-hidden"
      >
        <AuroraBackground />
        <div className="relative grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative aspect-[5/8] min-h-[354px] border-b border-border md:aspect-auto md:min-h-[455px] md:border-b-0 md:border-r">
            <Image
              src="/ondrej-vseticka.jpg"
              alt={t("portraitAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover object-top"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background/40"
              aria-hidden
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {t("subtitle")}
            </p>
            <div className="mt-8">
              <Button asChild variant="primary">
                <a href="mailto:ondravseta@email.cz">{t("cta")}</a>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="mt-12 border-t border-border pt-10"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
          <div>
            <a
              href={sectionHref(locale, "about")}
              className="inline-flex items-center gap-2 font-display text-lg text-foreground"
            >
              Ondřej Všetička
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{t("tagline")}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted">{t("navigation")}</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-muted">{t("connect")}</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="mailto:ondravseta@email.cz"
                  className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
                >
                  <Mail className="size-4" />
                  ondravseta@email.cz
                </a>
              </li>
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
                  >
                    <social.icon className="size-4" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {t("copyright")}. {t("rights")}
          </p>
          <a
            href={sectionHref(locale, "about")}
            className="inline-flex items-center gap-2 text-xs text-muted transition hover:text-foreground"
          >
            {t("backToTop")}
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
