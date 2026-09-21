"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
};

const revealEase = [0.22, 1, 0.36, 1] as const;

export function SectionHeader({
  label,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: revealEase }}
      className={cn("mb-8 md:mb-10", className)}
    >
      <p className="mb-3 text-sm font-medium text-accent">{label}</p>
      <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08] tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </motion.header>
  );
}
