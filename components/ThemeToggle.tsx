"use client";

import { useEffect, useState } from "react";

const storageKey = "pm-field-log-theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    syncTheme();
    window.addEventListener("pm-theme-change", syncTheme);
    return () => window.removeEventListener("pm-theme-change", syncTheme);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem(storageKey, nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
    window.dispatchEvent(new Event("pm-theme-change"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="w-full flex items-center justify-between rounded border border-line px-3 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 hover:border-forest hover:text-forest transition-colors"
    >
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
      <span aria-hidden="true">{isDark ? "☼" : "●"}</span>
    </button>
  );
}
