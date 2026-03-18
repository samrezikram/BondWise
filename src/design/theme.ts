import React, { createContext, useContext, useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

import {
  AppColors,
  darkColors,
  fontFamilies,
  fontWeights,
  lightColors,
  radii,
  shadows,
  spacing,
  typography,
} from './tokens';

const palettes = {
  light: lightColors,
  dark: darkColors,
} as const;

export type AppTheme = {
  colors: AppColors;
  radii: typeof radii;
  shadows: typeof shadows;
  spacing: typeof spacing;
  typography: typeof typography;
  fontFamilies: typeof fontFamilies;
  fontWeights: typeof fontWeights;
  isDark: boolean;
};

function resolvePalette(colorScheme: ColorSchemeName): AppColors {
  return colorScheme === 'dark' ? palettes.dark : palettes.light;
}

export function createAppTheme(colorScheme: ColorSchemeName): AppTheme {
  return {
    colors: resolvePalette(colorScheme),
    radii,
    shadows,
    spacing,
    typography,
    fontFamilies,
    fontWeights,
    isDark: colorScheme === 'dark',
  };
}

const defaultTheme = createAppTheme('light');

const ThemeContext = createContext<AppTheme>(defaultTheme);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => createAppTheme(colorScheme), [colorScheme]);

  return React.createElement(ThemeContext.Provider, { value: theme }, children);
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
