import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { customTheme } from './customTheme';

const themes = { light: lightTheme, dark: darkTheme, custom: customTheme };

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  const systemTheme = colorScheme ?? 'light';

  const [themeName, setThemeName] = useState(null); // null → seguir sistema

  const activeThemeName = themeName || systemTheme;

  // ⚠️ Esto asegura que el cambio de sistema se refleje si themeName está en null
  useEffect(() => {
    if (themeName === null) {
      // Aquí se puede hacer algo si quieres, como guardar en log o sincronizar
    }
  }, [colorScheme]);

  const theme = useMemo(() => themes[activeThemeName] ?? lightTheme, [activeThemeName]);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
