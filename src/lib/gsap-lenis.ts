import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getLenis } from "@/lib/lenis-store";

let registered = false;

export function initGsapLenis() {
  if (registered || typeof window === "undefined") return;
  const lenis = getLenis();
  if (!lenis) return;

  gsap.registerPlugin(ScrollTrigger);
  registered = true;

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.addEventListener("refresh", () => {
    lenis.resize();
  });

  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
