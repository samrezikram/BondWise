import { colors, radii, shadows, spacing, typography } from './tokens';

export const appTheme = {
  colors,
  radii,
  shadows,
  spacing,
  typography,
} as const;

export type AppTheme = typeof appTheme;
