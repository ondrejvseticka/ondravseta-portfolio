"use client";

import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const locales: { code: Locale; label: string }[] = [
  { code: "cs", label: "CS" },
  { code: "en", label: "EN" },
];

type LocaleSwitcherProps = {
  variant?: "default" | "nav";
};

export function LocaleSwitcher({ variant = "default" }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const isNav = variant === "nav";

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full p-0.5",
        !isNav && "border border-border bg-surface/80",
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => router.replace(pathname, { locale: item.code })}
          className={cn(
            "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition",
            locale === item.code
              ? "bg-accent text-white dark:text-stone-900"
              : "text-muted hover:text-foreground",
          )}
          aria-current={locale === item.code ? "true" : undefined}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
