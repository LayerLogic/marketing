import { useEffect, useRef } from "react";
import { gsap } from "~/lib/gsap-setup";

/**
 * SciencePin
 *
 * Wraps the static §04 Science section with a GSAP ScrollTrigger that:
 *   1. Pins the gFET diagram while the four numbered prose blocks scroll.
 *   2. Highlights each prose block as it enters the viewport.
 *   3. Updates a tiny progress bar on the diagram caption so the reader
 *      knows where they are in the sequence.
 *
 * The fallback when JS / GSAP isn't ready is fine — everything is laid out
 * statically by the surrounding Astro markup, this just elevates it.
 */
export default function SciencePin() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const section = document.getElementById("science");
      if (!section) return;
      const figure = section.querySelector<HTMLElement>("[data-science-figure]");
      const blocks =
        section.querySelectorAll<HTMLElement>("[data-science-block]");
      const progress = section.querySelector<HTMLElement>(
        "[data-science-progress]",
      );
      if (!figure || blocks.length === 0) return;

      // Only pin on lg+
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top+=72",
            end: () => `+=${blocks.length * 280}`,
            scrub: 0.6,
            pin: figure,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        blocks.forEach((b, i) => {
          tl.fromTo(
            b,
            { opacity: 0.4, x: 12 },
            { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
            i,
          );
          if (progress) {
            tl.to(
              progress,
              {
                width: `${((i + 1) / blocks.length) * 100}%`,
                duration: 1,
                ease: "none",
              },
              i,
            );
          }
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root} aria-hidden="true" style={{ display: "contents" }} />;
}
