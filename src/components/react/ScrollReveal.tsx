import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

/**
 * ScrollReveal
 *
 * SSR renders the children visible (no opacity: 0). On mount, we measure the
 * element. If it's already in the viewport (e.g. the hero), we leave it
 * untouched — no animation, no flash. If it's below the fold, we *then* arm
 * the reveal (apply `.reveal` opacity:0 + transform) and watch for
 * intersection to add `.in` and play the fade-up.
 *
 * This avoids the FOUC where above-the-fold content stays invisible until
 * React hydrates.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);

  // Decide on mount: in view → leave alone; below fold → arm.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const aboveFold = rect.top < window.innerHeight - 32;
    if (aboveFold) return;
    setArmed(true);
  }, []);

  // Observe once armed.
  useEffect(() => {
    if (!armed) return;
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (node.style as CSSProperties).transitionDelay = `${delay}ms`;
            node.classList.add("in");
            io.unobserve(node);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [armed, delay]);

  const style: CSSProperties = { ["--reveal-y" as string]: `${y}px` };
  const cls = armed ? `reveal ${className}` : className;

  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  );
}
