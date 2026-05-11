import { Suspense, lazy } from "react";

/**
 * Thin wrapper around the WebGL lattice. The heavy R3F / Three.js bundle
 * (≈ 800 KB raw) lives in `./HeroLattice3DInner` and is loaded via a dynamic
 * import so it never sits on the critical path. The wrapper itself stays
 * tiny so `client:visible` hydration finishes fast — the canvas mounts a
 * moment later once the chunk arrives.
 */
const Inner = lazy(() => import("./HeroLattice3DInner"));

export interface HeroLattice3DProps {
  className?: string;
}

export default function HeroLattice3D(props: HeroLattice3DProps) {
  return (
    <Suspense fallback={null}>
      <Inner {...props} />
    </Suspense>
  );
}
