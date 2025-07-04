import React, { createContext, useState, useEffect } from "react";

// PUBLIC_INTERFACE
export const ThemeContext = createContext();

/**
 * Enhanced ThemeProvider with:
 * - Remembers theme in localStorage across reloads
 * - Honors system dark preference as default
 * - Animates theme transitions for delight
 */
// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  // Check initial preference: use saved theme, otherwise system
  const getPreferredTheme = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
      if (window.matchMedia) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
      }
    }
    return "light";
  };
  const [theme, setTheme] = useState(getPreferredTheme);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(theme => {
      const next = (theme === "light" ? "dark" : "light");
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", next);
      }
      return next;
    });
  };

  // Apply data-theme and smooth transitions
  useEffect(() => {
    const root = document.documentElement;
    // Animate bg/text transition for visual delight
    root.style.transition = "background 0.55s cubic-bezier(0.55,0.17,0.68,0.69), color 0.45s cubic-bezier(0.49,0.13,0.66,0.87)";
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // System preference listener: react to user's system changes (optional, keep strict manual mode)
  /* useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const systemChange = e => {
      setTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", systemChange);
    return () => mql.removeEventListener("change", systemChange);
  }, []); */

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
