import { useEffect, useState } from "react";

const KEY = "layerlogic-theme";

/**
 * Reads the current theme from the DOM, which the no-flash inline script in
 * Base.astro has already applied. Falls back to "dark".
 */
function readDomTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.body.classList.contains("light") ? "light" : "dark";
}

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(readDomTheme() === "light");
  }, []);

  const onToggle = () => {
    const next = !light;
    setLight(next);
    document.body.classList.toggle("light", next);
    try {
      localStorage.setItem(KEY, next ? "light" : "dark");
    } catch {
      // ignore — Safari private mode etc.
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle dark / light theme"
      aria-pressed={light}
      className="lb-toggle"
      onClick={onToggle}
    >
      <span className="lb-toggle-knob" />
      <span className={`lb-toggle-ic ${light ? "" : "is-active"}`}>
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
          <path d="M11.5 8.2A4.6 4.6 0 0 1 5.8 2.5a.4.4 0 0 0-.55-.45 5.4 5.4 0 1 0 6.7 6.7.4.4 0 0 0-.45-.55Z" />
        </svg>
      </span>
      <span className={`lb-toggle-ic ${light ? "is-active" : ""}`}>
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        >
          <circle cx="7" cy="7" r="2.6" />
          <path d="M7 1v1.6M7 11.4V13M1 7h1.6M11.4 7H13M2.6 2.6l1.1 1.1M10.3 10.3l1.1 1.1M2.6 11.4l1.1-1.1M10.3 3.7l1.1-1.1" />
        </svg>
      </span>
    </button>
  );
}
