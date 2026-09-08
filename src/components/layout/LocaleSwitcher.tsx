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
  inverted?: boolean;
};

export function LocaleSwitcher({ inverted = false }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full p-0.5",
        inverted
          ? "border border-white/15 bg-white/5"
          : "border border-zinc-200/80 bg-white/80 dark:border-white/15 dark:bg-white/5",
      )}
    >
      {locales.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => router.replace(pathname, { locale: item.code })}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-medium transition",
            locale === item.code
              ? inverted
                ? "bg-indigo-500 text-white shadow-sm"
                : "bg-indigo-600 text-white shadow-sm"
              : inverted
                ? "text-white/55 hover:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-white/55 dark:hover:text-white",
          )}
          aria-current={locale === item.code ? "true" : undefined}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
