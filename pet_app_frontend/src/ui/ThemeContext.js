import React, { createContext, useState } from "react";

// PUBLIC_INTERFACE
export const ThemeContext = createContext();

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () =>
    setTheme(theme => (theme === "light" ? "dark" : "light"));
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
