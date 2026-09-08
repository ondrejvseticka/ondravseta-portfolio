"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const { resolvedTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.5 });
  const trailX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.8 });
  const trailY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setVisible(true);

    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", show);
    window.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", show);
      window.removeEventListener("mouseleave", hide);
    };
  }, [cursorX, cursorY]);

  if (!visible || !mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className={
            isDark
              ? "h-8 w-8 rounded-full border border-indigo-400/25 bg-indigo-500/10 blur-[1px]"
              : "h-8 w-8 rounded-full border border-indigo-300/50 bg-indigo-100/40 blur-[1px]"
          }
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden md:block"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className={
            isDark
              ? "h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.9)]"
              : "h-2 w-2 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.45)]"
          }
        />
      </motion.div>
    </>
  );
}
