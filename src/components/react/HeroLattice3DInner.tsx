import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  NormalBlending,
  type Group,
} from "three";

interface LatticeProps {
  rows?: number;
  cols?: number;
  side?: number;
  dark: boolean;
}

function HexLattice({
  rows = 32,
  cols = 48,
  side = 0.34,
  dark,
}: LatticeProps) {
  const ref = useRef<Group | null>(null);
  const { pointer, viewport } = useThree();

  const w = Math.sqrt(3) * side;
  const h = 1.5 * side;
  const period = 2 * h;

  const geometry = useMemo(() => {
    const positions: number[] = [];

    const hexCorners = (cx: number, cy: number) => {
      const pts: [number, number][] = [];
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        pts.push([cx + side * Math.cos(a), cy + side * Math.sin(a)]);
      }
      return pts;
    };

    for (let r = -Math.floor(rows / 2); r < Math.ceil(rows / 2); r++) {
      for (let c = -Math.floor(cols / 2); c < Math.ceil(cols / 2); c++) {
        const cx = c * w + (((r % 2) + 2) % 2 === 0 ? 0 : w / 2);
        const cy = r * h;
        const corners = hexCorners(cx, cy);
        for (let i = 0; i < 6; i++) {
          const [x1, y1] = corners[i]!;
          const [x2, y2] = corners[(i + 1) % 6]!;
          positions.push(x1, y1, 0, x2, y2, 0);
        }
      }
    }

    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return g;
  }, [rows, cols, side]);

  // Release GPU-side buffers on unmount / re-create.
  useEffect(() => () => geometry.dispose(), [geometry]);

  const lineColor = useMemo(
    () => new Color(dark ? "#c497fb" : "#7c19f6"),
    [dark],
  );

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;

    g.position.y -= delta * 0.08;
    if (g.position.y <= -period) g.position.y += period;

    const targetY = (pointer.x * viewport.width) / 90;
    const targetX = (-pointer.y * viewport.height) / 90;
    g.rotation.y += (targetY - g.rotation.y) * 0.04;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
  });

  return (
    <group ref={ref}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.05}
          blending={NormalBlending}
        />
      </lineSegments>
    </group>
  );
}

export interface HeroLattice3DProps {
  className?: string;
}

export default function HeroLattice3DInner({ className }: HeroLattice3DProps) {
  // prefers-reduced-motion read post-hydration via state + listener, so the
  // frameloop is correctly set for users who toggle the OS setting too.
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Watch theme — re-tint lattice when body.dark toggles.
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const read = () => setDark(document.body.classList.contains("dark"));
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  // Tell CSS the canvas is alive (hides the SVG fallback).
  useEffect(() => {
    document.documentElement.classList.add("lattice-3d-active");
    return () => {
      document.documentElement.classList.remove("lattice-3d-active");
    };
  }, []);

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={reduce ? "demand" : "always"}
        style={{ pointerEvents: "none", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <HexLattice rows={48} cols={72} side={0.22} dark={dark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
