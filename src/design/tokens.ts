export const lightColors = {
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
  heroSubtle: '#9FE3DA',
  heroText: '#D7DEE8',
  rowAlt: '#FCF8F1',
} as const;

export const darkColors = {
  background: '#11151C',
  surface: '#1A212B',
  surfaceMuted: '#27303A',
  border: '#39424D',
  text: '#F4EBDD',
  textMuted: '#B1BAC5',
  accent: '#5BC0B4',
  accentStrong: '#0B3B37',
  danger: '#F08B73',
  dangerSoft: '#46241E',
  success: '#78C6A3',
  successSoft: '#1C352B',
  warning: '#E4B86A',
  warningSoft: '#47371B',
  inputBackground: '#202934',
  heroSubtle: '#97E1D8',
  heroText: '#DAE5EF',
  rowAlt: '#161D26',
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

export type AppColors = typeof lightColors | typeof darkColors;
