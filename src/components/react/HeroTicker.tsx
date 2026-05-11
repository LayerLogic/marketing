import { useEffect, useRef } from "react";

function format(elapsedMs: number): string {
  const s = elapsedMs / 1000;
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = (s % 60).toFixed(2).padStart(5, "0");
  return `${mm}:${ss}`;
}

/**
 * Live sensor-reading ticker. Writes to two text nodes directly via refs
 * instead of `setState` — avoids a React reconcile every animation frame
 * for a single character cluster.
 */
export default function HeroTicker() {
  const voltageRef = useRef<HTMLSpanElement | null>(null);
  const timeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const elapsed = now - t0;
      const v = 0.0142 + Math.sin(elapsed / 1700) * 0.0006;
      if (voltageRef.current) {
        voltageRef.current.textContent = `${v >= 0 ? "+" : ""}${v.toFixed(4)} V`;
      }
      if (timeRef.current) {
        timeRef.current.textContent = format(elapsed);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span
      className="font-mono text-[12px] num-tabular hidden sm:inline"
      style={{
        color: "color-mix(in srgb, var(--color-paper) 80%, transparent)",
      }}
    >
      ΔV<sub>g</sub> = <span ref={voltageRef}>+0.0142 V</span> · t ={" "}
      <span ref={timeRef}>00:00.00</span>
    </span>
  );
}
