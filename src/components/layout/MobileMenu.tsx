"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { type CSSProperties, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  headerOffsetPx: number;
};

export function MobileMenu(props: MobileMenuProps) {
  const t = useTranslations("nav");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {props.open ? (
        <motion.div
          id="site-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("mobileNav")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[120] flex touch-none flex-col overscroll-none lg:hidden"
        >
          <motion.button
            type="button"
            aria-label={t("closeMenu")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 touch-none bg-background/90 backdrop-blur-md"
            onClick={props.onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            className="relative mx-4 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain rounded-2xl border border-border bg-surface shadow-[0_24px_64px_-24px_rgba(28,25,23,0.25)] touch-pan-y md:mx-6"
            style={{
              marginTop: `calc(${props.headerOffsetPx}px + 0.5rem + env(safe-area-inset-top, 0px))`,
              marginBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
            }}
          >
            <nav className="flex flex-1 flex-col p-5" aria-label={t("mobileNav")}>
              {props.links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="menu-shell-item block border-b border-border py-4 font-display text-[clamp(1.5rem,5.5vw,2rem)] leading-tight tracking-tight text-foreground transition hover:text-accent"
                  style={{ "--menu-i": index } as CSSProperties}
                  onClick={props.onClose}
                >
                  {link.label}
                </a>
              ))}

              <div
                className="menu-shell-item mt-6 space-y-4"
                style={{ "--menu-i": props.links.length } as CSSProperties}
              >
                <Button asChild variant="primary" className="h-12 w-full shadow-glow">
                  <a href="mailto:ondravseta@email.cz" className="gap-2">
                    {t("cta")}
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>

                <div className="flex items-center justify-between rounded-xl border border-border bg-stone-100/50 p-1 dark:bg-white/[0.03]">
                  <LocaleSwitcher variant="nav" />
                  <ThemeToggle variant="nav" />
                </div>
              </div>
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
