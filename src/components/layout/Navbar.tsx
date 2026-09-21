"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { Locale } from "@/i18n/routing";
import { sectionHref } from "@/lib/sections";
import { cn } from "@/lib/utils";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-[18px]" aria-hidden>
      <span
        className={cn(
          "absolute left-0 h-[1.5px] w-full rounded-full bg-foreground transition-[transform,top,opacity] duration-300 ease-out",
          open ? "top-[6.25px] rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute top-[6.25px] left-0 h-[1.5px] w-full rounded-full bg-foreground transition-[transform,opacity] duration-300 ease-out",
          open ? "scale-x-0 opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-[1.5px] w-full rounded-full bg-foreground transition-[transform,top] duration-300 ease-out",
          open ? "top-[6.25px] -rotate-45" : "top-[12.5px]",
        )}
      />
    </span>
  );
}

const navKeys = ["work", "capabilities", "process", "profile"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerOffsetPx, setHeaderOffsetPx] = useState(88);

  useScrollLock(menuOpen);

  const links = navKeys.map((key) => ({
    href: sectionHref(locale, key),
    label: t(key),
  }));

  const mobileLinks = [
    { href: sectionHref(locale, "about"), label: t("about") },
    ...links,
    { href: sectionHref(locale, "contact"), label: t("contact") },
  ];

  useEffect(() => {
    const syncHeaderOffset = () => {
      if (headerRef.current) {
        setHeaderOffsetPx(headerRef.current.offsetHeight);
      }
    };

    const onScroll = () => setScrolled(window.scrollY > 16);

    syncHeaderOffset();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncHeaderOffset, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncHeaderOffset);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-[110] px-4 pt-[max(0.75rem,env(safe-area-inset-top,0px))] md:px-6",
          menuOpen && "z-[130]",
        )}
      >
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mx-auto flex max-w-6xl items-center gap-3 rounded-2xl border px-2.5 py-2 transition-[box-shadow,background,border-color,transform] duration-500 md:gap-4 md:px-3 md:py-2.5",
            scrolled || menuOpen
              ? "border-border/80 bg-background/92 shadow-[0_12px_48px_-16px_rgba(28,25,23,0.18)] backdrop-blur-xl dark:shadow-[0_12px_48px_-16px_rgba(0,0,0,0.45)]"
              : "border-border/50 bg-background/55 shadow-[0_4px_24px_-12px_rgba(28,25,23,0.08)] backdrop-blur-md",
          )}
        >
          <a
            href={sectionHref(locale, "about")}
            className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-stone-200/40 dark:hover:bg-white/[0.05]"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-white dark:text-stone-900">
              OV
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate font-display text-base leading-tight text-foreground">
                Ondřej Všetička
              </span>
              <span className="block truncate text-[11px] text-muted">
                {t("brandSubtitle")}
              </span>
            </span>
          </a>

          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label={t("mainNav")}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-lg px-3 py-2 text-[13px] font-medium text-muted transition hover:bg-stone-200/35 hover:text-foreground dark:hover:bg-white/[0.05]"
              >
                {link.label}
                <span className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-2.5">
            <div className="hidden items-center gap-0.5 rounded-xl border border-border/70 bg-stone-100/60 p-0.5 md:flex dark:bg-white/[0.04]">
              <LocaleSwitcher variant="nav" />
              <ThemeToggle variant="nav" />
            </div>

            <Button
              asChild
              variant="primary"
              size="sm"
              className="hidden shadow-glow sm:inline-flex"
            >
              <a href="mailto:ondravseta@email.cz" className="gap-1.5">
                {t("cta")}
                <ArrowUpRight className="size-3.5" />
              </a>
            </Button>

            <button
              type="button"
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-surface transition hover:bg-stone-200/40 lg:hidden dark:hover:bg-white/[0.05]",
                menuOpen && "border-accent/30 bg-accent-soft/50",
              )}
              aria-expanded={menuOpen}
              aria-controls="site-mobile-menu"
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </motion.div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={mobileLinks}
        headerOffsetPx={headerOffsetPx}
      />
    </>
  );
}
