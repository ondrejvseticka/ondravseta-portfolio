"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative h-3.5 w-[18px]" aria-hidden>
      <span
        className={cn(
          "absolute left-0 h-[1.5px] w-full rounded-[1px] bg-zinc-900 transition-[transform,top,opacity] duration-[380ms] ease-out dark:bg-white",
          open ? "top-[6.25px] rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute top-[6.25px] left-0 h-[1.5px] w-full rounded-[1px] bg-zinc-900 transition-[transform,opacity] duration-[380ms] ease-out dark:bg-white",
          open ? "scale-x-0 opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-[1.5px] w-full rounded-[1px] bg-zinc-900 transition-[transform,top] duration-[380ms] ease-out dark:bg-white",
          open ? "top-[6.25px] -rotate-45" : "top-[12.5px]",
        )}
      />
    </span>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const { resolvedTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerOffsetPx, setHeaderOffsetPx] = useState(88);

  useScrollLock(menuOpen);

  const links = [
    { href: "#o-mne", label: t("about") },
    { href: "#zkusenosti", label: t("experience") },
    { href: "#projekty", label: t("projects") },
    { href: "#kontakt", label: t("contact") },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const syncHeaderOffset = () => {
      if (headerRef.current) {
        setHeaderOffsetPx(headerRef.current.offsetHeight);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setOverHero(y < window.innerHeight * 0.72);
    };

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

  const isDark = mounted && resolvedTheme === "dark";
  const skyHero = overHero && !isDark && !menuOpen;
  const spaceHero = overHero && isDark && !menuOpen;
  const heroNav = overHero && !menuOpen;

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[110] shell-x pb-3 pt-[max(0.875rem,env(safe-area-inset-top,0px))] transition-[background,backdrop-filter] duration-500",
          menuOpen && "z-[130]",
          scrolled && !heroNav && "border-b border-zinc-200/80 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-zinc-950/80",
        )}
      >
        <div className="shell-x-inner flex items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="#o-mne"
            className={cn(
              "justify-self-start py-2 text-sm font-semibold tracking-wide transition-colors",
              heroNav ? "text-white" : "text-zinc-900 dark:text-white",
            )}
            onClick={() => setMenuOpen(false)}
          >
            OV
          </a>

          <nav
            className={cn(
              "hidden items-center gap-6 rounded-full px-6 py-3 transition-all duration-500 lg:flex lg:justify-self-center",
              skyHero
                ? "border border-white/25 bg-white/10 backdrop-blur-md shadow-lg shadow-black/5"
                : spaceHero
                  ? "glass-hero"
                  : "border border-zinc-200/80 bg-white/90 shadow-sm dark:border-white/10 dark:bg-zinc-950/70",
            )}
            aria-label={t("mainNav")}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[0.6875rem] font-medium uppercase tracking-[0.1em] whitespace-nowrap transition-opacity duration-250 hover:opacity-55",
                  heroNav ? "text-white" : "text-zinc-700 dark:text-white/80",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center justify-self-end gap-2 lg:flex">
            <LocaleSwitcher inverted={heroNav} />
            <ThemeToggle inverted={heroNav} />
            <a
              href="mailto:ondravseta@email.cz"
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs transition",
                heroNav
                  ? "border-white/15 text-white/80 hover:border-indigo-400/40 hover:text-white"
                  : "border-zinc-200 text-zinc-700 hover:border-indigo-300 hover:text-indigo-700 dark:border-white/15 dark:text-white/80 dark:hover:border-indigo-400/40 dark:hover:text-white",
              )}
            >
              {t("contact")}
            </a>
          </div>

          <button
            type="button"
            className={cn(
              "relative z-[1] -mr-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-[background,box-shadow,border-color] duration-[350ms] ease-out lg:hidden",
              heroNav || menuOpen
                ? "border-0 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                : "border border-zinc-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900",
            )}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
        headerOffsetPx={headerOffsetPx}
      />
    </>
  );
}
