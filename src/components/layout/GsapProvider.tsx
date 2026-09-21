"use client";

import { useEffect } from "react";

import { initGsapLenis } from "@/lib/gsap-lenis";
import { getLenis } from "@/lib/lenis-store";

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const tryInit = () => {
      if (getLenis()) {
        initGsapLenis();
        return true;
      }
      return false;
    };

    if (tryInit()) return;

    const interval = window.setInterval(() => {
      if (tryInit()) window.clearInterval(interval);
    }, 50);

    return () => window.clearInterval(interval);
  }, []);

  return <>{children}</>;
}
