import { useEffect, useState } from "react";

const KEY = "layerlogic-theme";

/**
 * Light brand is the default; dark mode is opt-in via `body.dark`.
 * The no-flash inline script in Base.astro applies the stored choice
 * before React hydrates — we just mirror DOM state here.
 */
function readDomTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.body.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(readDomTheme() === "dark");
  }, []);

  const onToggle = () => {
    const next = !dark;
    setDark(next);
    document.body.classList.toggle("dark", next);
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      // ignore — Safari private mode etc.
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle dark / light theme"
      aria-pressed={dark}
      className="lb-toggle"
      onClick={onToggle}
    >
      <span className="lb-toggle-knob" />
      <span className={`lb-toggle-ic ${dark ? "" : "is-active"}`}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="7" cy="7" r="2.6" />
          <path d="M7 1v1.6M7 11.4V13M1 7h1.6M11.4 7H13M2.6 2.6l1.1 1.1M10.3 10.3l1.1 1.1M2.6 11.4l1.1-1.1M10.3 3.7l1.1-1.1" />
        </svg>
      </span>
      <span className={`lb-toggle-ic ${dark ? "is-active" : ""}`}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Visually-centered crescent: outer arc r=4.6 around (7,7),
              cutout arc r=3.8 dipping in from the upper-right. */}
          <path d="M11.6 7 A4.6 4.6 0 1 1 7 2.4 A3.8 3.8 0 0 0 11.6 7 Z" />
        </svg>
      </span>
    </button>
  );
}
