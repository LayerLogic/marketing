import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "~/lib/gsap-setup";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const onRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onRaf);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return null;
}
