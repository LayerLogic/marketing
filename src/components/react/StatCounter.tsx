import { useEffect, useRef, useState } from "react";

interface Props {
  target: number;
  durationMs?: number;
}

export default function StatCounter({ target, durationMs = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setN(target);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        const t0 = performance.now();
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / durationMs);
          const eased = 1 - Math.pow(1 - k, 3);
          setN(Math.round(eased * target));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.unobserve(el);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);

  return <span ref={ref}>{n}</span>;
}
