"use client";

import { motion } from "framer-motion";
import { type ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

type BentoCardProps = {
  title: string;
  description: string;
  tags?: string[];
  visual?: ReactNode;
  className?: string;
  index?: number;
  variant?: "stack" | "featured";
};

const revealEase = [0.22, 1, 0.36, 1] as const;

export function BentoCard({
  title,
  description,
  tags,
  visual,
  className,
  index = 0,
  variant = "stack",
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isFeatured = variant === "featured";

  const setSpotlight = (x: number, y: number) => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--mouse-x", `${x}%`);
    element.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpotlight(x, y);
  };

  const handleLeave = () => setSpotlight(50, 50);

  const titleEl = (
    <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white md:text-xl">
      {title}
    </h3>
  );

  const descriptionEl = (
    <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-white/60">
      {description}
    </p>
  );

  const tagsEl =
    tags && tags.length > 0 ? (
      <ul className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-zinc-100/90 px-2.5 py-1 text-xs font-medium text-zinc-600 backdrop-blur-sm dark:bg-white/[0.06] dark:text-white/70"
          >
            {tag}
          </li>
        ))}
      </ul>
    ) : null;

  const copyBlock = (
    <div className="flex flex-col">
      {titleEl}
      {descriptionEl}
      {tagsEl ? <div className="mt-2.5">{tagsEl}</div> : null}
    </div>
  );

  return (
    <motion.article
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.07, ease: revealEase }}
      whileHover={{ y: -2, transition: { duration: 0.45, ease: revealEase } }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200/60 shadow-[0_1px_2px_rgba(24,24,27,0.04)] backdrop-blur-sm dark:border-white/[0.08] dark:shadow-none",
        "bento-spotlight hover:border-indigo-200/70 hover:shadow-[0_12px_40px_-20px_rgba(99,102,241,0.35)] dark:hover:border-indigo-400/20 dark:hover:shadow-[0_12px_40px_-24px_rgba(99,102,241,0.25)]",
        className,
      )}
    >
      <div className="relative z-10 flex h-full min-h-0 flex-col">
        {isFeatured ? (
          <>
            {visual ? (
              <div className="min-h-[148px] flex-1 overflow-hidden md:min-h-0">
                {visual}
              </div>
            ) : null}
            <div className="mt-auto shrink-0 border-t border-zinc-200/70 bg-white/40 px-4 pb-3.5 pt-3 dark:border-white/[0.06] dark:bg-white/[0.02] md:px-4 md:pb-4 md:pt-3.5">
              {copyBlock}
            </div>
          </>
        ) : (
          <>
            {visual ? (
              <div className="aspect-[2.35/1] w-full max-h-[132px] shrink-0 overflow-hidden md:max-h-[140px]">
                {visual}
              </div>
            ) : null}
            <div className="flex flex-1 flex-col px-4 pb-3.5 pt-2.5 md:px-4 md:pb-4 md:pt-3">
              {copyBlock}
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}
