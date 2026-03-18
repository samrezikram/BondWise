export const colors = {
  background: '#F3EBDD',
  surface: '#FFFDF8',
  surfaceMuted: '#E8DCC8',
  border: '#D5C1A7',
  text: '#2B2118',
  textMuted: '#746352',
  accent: '#1E5C4A',
  accentStrong: '#124537',
  danger: '#A1472D',
  dangerSoft: '#F7D9CF',
  success: '#1A6A52',
  successSoft: '#DCEEE8',
  warning: '#8A5A12',
  warningSoft: '#F5E5C8',
  inputBackground: '#FFF9EF',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  hero: 30,
  title: 22,
  subtitle: 18,
  body: 16,
  caption: 13,
  micro: 11,
} as const;

export const shadows = {
  card: {
    shadowColor: '#2B2118',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
} as const;
