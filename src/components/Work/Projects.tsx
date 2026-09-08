"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { websiteProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

function previewStyle(palette: [string, string, string]) {
  return {
    background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 45%, ${palette[2]} 100%)`,
  };
}

export function Projects() {
  const t = useTranslations("projects");
  const paletteRoles = t.raw("paletteRoles") as string[];
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="projekty" className="relative overflow-hidden pt-8 pb-16 md:pt-10 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-6 max-w-6xl px-4 sm:px-5 md:mb-8 md:px-6"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-600/80 dark:text-indigo-300/70">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-white/60 md:text-lg">
            {t("subtitle")}
          </p>
        </div>
      </motion.div>

      <div className="mx-auto max-w-6xl">
        {websiteProjects.map((project, index) => {
          const isOpen = openId === project.id;
          const isHovered = hoveredId === project.id;
          const isActive = isOpen || isHovered;
          const servicesRaw = t.raw(`items.${project.id}.services`);
          const services = Array.isArray(servicesRaw) ? servicesRaw : [];

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative overflow-hidden border-t border-zinc-200/80 last:border-b dark:border-white/10"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={cn(
                  "projects-preview-mask pointer-events-none absolute top-0 right-0 hidden h-full w-[min(42vw,520px)] saturate-[1.2] transition-[opacity,transform] duration-[550ms] ease-out md:block",
                  isActive
                    ? "translate-x-0 scale-100 opacity-85"
                    : "translate-x-[8%] scale-[1.08] opacity-0",
                )}
                style={previewStyle(project.palette)}
                aria-hidden
              />

              <button
                type="button"
                className={cn(
                  "relative z-[1] grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-3 py-5 text-left transition-colors duration-300 ease-out shell-x md:gap-8 md:py-7",
                  isActive && "bg-white dark:bg-zinc-950/70",
                  "hover:bg-white dark:hover:bg-zinc-950/70",
                )}
                aria-expanded={isOpen}
                onClick={() => toggle(project.id)}
              >
                <span
                  className={cn(
                    "pt-0.5 text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.04em] text-indigo-300/60 transition-[opacity,color] duration-300 dark:text-indigo-400/40",
                    isActive && "text-indigo-600 opacity-100 dark:text-indigo-300",
                  )}
                >
                  0{index + 1}
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-[clamp(1.375rem,3.5vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-zinc-900 transition-[transform,letter-spacing] duration-500 ease-out dark:text-white",
                      isHovered && "md:translate-x-1.5 md:tracking-[-0.02em]",
                    )}
                  >
                    {t(`items.${project.id}.title`)}
                  </span>
                  <span
                    className={cn(
                      "mt-1.5 block text-sm font-light text-zinc-500 dark:text-white/55",
                      !isOpen && "max-md:hidden",
                    )}
                  >
                    {t(`items.${project.id}.client`)}
                  </span>
                  <span
                    className={cn(
                      "mt-2 flex flex-wrap items-center gap-1.5",
                      !isOpen && "max-md:hidden",
                    )}
                  >
                    {services.map((service, serviceIndex) => (
                      <span key={service} className="flex items-center gap-1.5">
                        <span className="text-xs font-normal text-zinc-500 md:text-[0.8125rem] dark:text-white/45">
                          {service}
                        </span>
                        {serviceIndex < services.length - 1 ? (
                          <span className="text-zinc-300 dark:text-white/20">·</span>
                        ) : null}
                      </span>
                    ))}
                  </span>
                </span>

                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center self-start rounded-full border border-zinc-200 transition-[border-color,background,transform] duration-[450ms] ease-out md:size-12 dark:border-white/15",
                    isActive && "rotate-90 border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-500",
                    "group-hover:rotate-90 group-hover:border-indigo-600 group-hover:bg-indigo-600 dark:group-hover:border-indigo-400 dark:group-hover:bg-indigo-500",
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      "text-lg font-light leading-none text-zinc-400 transition-colors duration-300 md:text-xl dark:text-white/45",
                      isActive && "text-white",
                      "group-hover:text-white",
                    )}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </span>
              </button>

              {isOpen ? (
                <div className="animate-project-reveal relative z-[1] bg-white shell-x pb-8 dark:bg-zinc-950/70 md:pb-10 md:pl-[calc(3rem+2.5rem+2rem)] lg:pl-[calc(5rem+2.5rem+2rem)] xl:pl-[calc(7rem+2.5rem+2rem)]">
                  <div className="shell-x-inner">
                    <div className="mb-5 flex gap-2 md:mb-6" aria-label={t("paletteLabel")}>
                      {project.palette.map((color, colorIndex) => (
                        <span
                          key={color}
                          className="size-10 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:size-12"
                          title={paletteRoles[colorIndex]}
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-[1.7] text-zinc-600 md:max-w-[62ch] md:text-base md:font-light dark:text-white/60">
                      {t(`items.${project.id}.description`)}
                    </p>
                    <p className="mt-3 text-sm text-zinc-500 md:hidden dark:text-white/55">
                      {t(`items.${project.id}.client`)}
                    </p>
                    <div className="mt-5">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-b border-zinc-900 pb-0.5 text-sm font-medium text-zinc-900 transition hover:border-indigo-600 hover:text-indigo-600 dark:border-white dark:text-white dark:hover:border-indigo-400 dark:hover:text-indigo-300"
                      >
                        {t("visitSite")} ↗
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
