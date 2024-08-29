import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, settheme] = useState(() => {
    // Initialize cart items from localStorage if available
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const themeOptions = {
    backgroundColor: theme ? "#333533" : "#f8f8f8",
    borderColor: theme ? "#dddddd28" : "#9696962d",
    color: theme ? "#fffcf2" : "#333",
    transform: theme ? "translateX(100%)" : "translateX(0%)",
    toggleBtnBgColor: theme ? "#fffcf2" : "#333",
    toggleBtnBorderColor: theme ? "#fffcf2" : "#333",

    sidebarBgColor: theme ? "#383a38" : "#f9feff",
    sidebarTabBgColor: theme ? "#f8f8f8" : "#333533",

    tabBgColor: theme ? "#e6e6e683" : "#919191af",

    graphBorderColor: theme ? "#dddddd28" : "#9696962d",
    graphTextColor: theme ? "#fffcf2" : "333",
    graphMainColor: theme ? "#ffdd00" : "#02cecb",
    graphMAvgColor: theme ? "#bf211e" : "#bf211e",
    graphOtherBgColor: theme ? "#333534" : "#eeeeee",
  };

  const toggleTheme = () => {
    settheme(!theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeOptions }}>
      {children}
    </ThemeContext.Provider>
  );
};
