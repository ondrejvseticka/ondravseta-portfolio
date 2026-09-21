"use client";

import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { portfolioProjects, type ProjectKind } from "@/data/projects";
import { sectionHref } from "@/lib/sections";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectKind;

export function WorkCarousel() {
  const t = useTranslations("work");
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<Filter>("all");
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? portfolioProjects
        : portfolioProjects.filter((p) => p.kind === filter),
    [filter],
  );

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("filterAll") },
    { id: "client", label: t("filterClient") },
    { id: "lab", label: t("filterLab") },
  ];

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track || !progressRef.current) return;

    const max = track.scrollWidth - track.clientWidth;
    const progress = max > 0 ? track.scrollLeft / max : 0;
    progressRef.current.style.transform = `scaleX(${progress})`;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateProgress();

    const onScroll = () => updateProgress();
    track.addEventListener("scroll", onScroll, { passive: true });

    const onWheel = (event: WheelEvent) => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const edgeThreshold = 2;
      const atStart = track.scrollLeft <= edgeThreshold;
      const atEnd = track.scrollLeft >= max - edgeThreshold;
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      if ((scrollingDown && atEnd) || (scrollingUp && atStart)) return;

      event.preventDefault();
      track.scrollLeft += event.deltaY;
      updateProgress();
    };

    track.addEventListener("wheel", onWheel, { passive: false });

    const resizeObserver = new ResizeObserver(() => updateProgress());
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("wheel", onWheel);
      resizeObserver.disconnect();
    };
  }, [filter, updateProgress]);

  return (
    <section
      id={sectionHref(locale, "work").slice(1)}
      className="section-y"
    >
      <div className="content-shell">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition",
                filter === item.id
                  ? "bg-accent text-white dark:text-stone-900"
                  : "bg-stone-200/70 text-muted hover:bg-stone-300/70 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent md:w-20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-background to-transparent md:w-28"
          aria-hidden
        />

        <div
          ref={trackRef}
          data-lenis-prevent
          className="work-scroll-track cursor-grab overflow-x-auto pb-2 pl-4 active:cursor-grabbing md:pl-[max(1rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          {filtered.map((project) => {
            const highlightsRaw = t.raw(`items.${project.id}.highlights`);
            const highlights = Array.isArray(highlightsRaw) ? highlightsRaw : [];

            return (
              <article
                key={project.id}
                className="work-card surface-card w-[min(88vw,380px)] shrink-0 overflow-hidden md:w-[420px]"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.palette[0]} 0%, ${project.palette[1]} 50%, ${project.palette[2]} 100%)`,
                  }}
                >
                  <Image
                    src={project.preview}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="420px"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                    {project.kind === "client" ? t("kindClient") : t("kindLab")}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-xl text-foreground">
                    {t(`items.${project.id}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {t(`items.${project.id}.client`)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {t(`items.${project.id}.description`)}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {highlights.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-medium text-accent dark:text-amber-200"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition hover:text-accent"
                      >
                        {t("visitSite")}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : null}
                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-foreground"
                      >
                        <Github className="size-3.5" />
                        {t("viewRepo")}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
          <div className="w-4 shrink-0 md:w-6" aria-hidden />
        </div>

        <div className="content-shell mt-5 flex items-center gap-3">
          <div className="h-px flex-1 overflow-hidden rounded-full bg-stone-200/80 dark:bg-white/10">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 bg-accent"
            />
          </div>
          <p className="shrink-0 text-xs text-muted">{t("scrollHint")}</p>
        </div>
      </div>
    </section>
  );
}
