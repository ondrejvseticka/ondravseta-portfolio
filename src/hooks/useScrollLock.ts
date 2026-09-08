"use client";

import { useEffect } from "react";

import { getLenis } from "@/lib/lenis-store";

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const lenis = getLenis();
    lenis?.stop();

    const scrollY = window.scrollY;
    const { style } = document.body;
    const html = document.documentElement;

    const previous = {
      bodyPosition: style.position,
      bodyTop: style.top,
      bodyWidth: style.width,
      bodyOverflow: style.overflow,
      bodyTouchAction: style.touchAction,
      htmlOverflow: html.style.overflow,
    };

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";
    style.overflow = "hidden";
    style.touchAction = "none";
    html.style.overflow = "hidden";

    return () => {
      style.position = previous.bodyPosition;
      style.top = previous.bodyTop;
      style.width = previous.bodyWidth;
      style.overflow = previous.bodyOverflow;
      style.touchAction = previous.bodyTouchAction;
      html.style.overflow = previous.htmlOverflow;

      window.scrollTo(0, scrollY);
      lenis?.start();
    };
  }, [locked]);
}
