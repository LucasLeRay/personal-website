import React, { useState, useEffect } from 'react'

import COLORS from '../../static/colors.json'

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
  const [
    colorMode,
    rawSetColorMode
  ] = useState(undefined);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue =
      root.style.getPropertyValue('--initial-color-mode');
    rawSetColorMode(initialColorValue);
  }, []);

  const setColorMode = (value) => {
    const root = window.document.documentElement;
    rawSetColorMode(value);
    localStorage.setItem('color-mode', value);

    Object.entries(COLORS[value]).forEach(([name, colorByTheme]) => {
      const cssVarName = `--color-${name}`;
      root.style.setProperty(cssVarName, colorByTheme);
    });
  }

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
