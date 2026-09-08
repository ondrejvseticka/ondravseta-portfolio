"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { type CSSProperties, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

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
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[120] flex touch-none flex-col overscroll-none lg:hidden"
        >
          <motion.button
            type="button"
            aria-label={t("closeMenu")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 touch-none bg-zinc-50/95 backdrop-blur-md dark:bg-zinc-950/95"
            onClick={props.onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            className="relative flex min-h-0 flex-1 flex-col justify-between overflow-y-auto overscroll-contain shell-x pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] touch-pan-y"
            style={{ paddingTop: `calc(${props.headerOffsetPx}px + env(safe-area-inset-top, 0px))` }}
          >
            <div className="shell-x-inner">
              <nav className="flex flex-col" aria-label={t("mobileNav")}>
                {props.links.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="menu-shell-item block border-b border-zinc-200/80 py-5 text-[clamp(1.625rem,6.5vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-zinc-900 transition-colors duration-250 hover:text-indigo-600 dark:border-white/10 dark:text-white dark:hover:text-indigo-300"
                    style={{ "--menu-i": index } as CSSProperties}
                    onClick={props.onClose}
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href="mailto:ondravseta@email.cz"
                  className="menu-shell-item mt-6 inline-flex w-fit rounded-full border border-zinc-900 px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-zinc-900"
                  style={{ "--menu-i": props.links.length } as CSSProperties}
                  onClick={props.onClose}
                >
                  {t("contact")}
                </a>

                <div
                  className="menu-shell-item mt-8 flex items-center gap-3"
                  style={{ "--menu-i": props.links.length + 1 } as CSSProperties}
                >
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>
              </nav>

              <p
                className="menu-shell-item--foot mt-10 text-[0.6875rem] font-normal uppercase tracking-[0.08em] text-zinc-400 dark:text-white/35"
                style={{ "--menu-i": props.links.length + 2 } as CSSProperties}
              >
                Ondřej Všetička · Software Developer
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
