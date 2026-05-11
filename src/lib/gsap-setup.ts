import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single, idempotent GSAP plugin registration. Importing this module
 * registers ScrollTrigger exactly once across all consumers — `gsap` itself
 * deduplicates internally, but a shared entry point keeps HMR predictable
 * and avoids per-component module-level guard flags going out of sync.
 */
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
