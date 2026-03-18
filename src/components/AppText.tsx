import React from 'react';
import { Text, TextStyle } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';
import { AppTextProps, AppTextTone, AppTextVariant } from './types';

export function AppText({
  children,
  variant = 'body',
  weight = 'regular',
  tone = 'default',
  family = 'body',
  uppercase = false,
  style,
  ...props
}: AppTextProps) {
  const theme = useAppTheme();
  const variantStyle = getVariantStyle(theme, variant);
  const colorStyle = getToneStyle(theme, tone);

  return (
    <Text
      {...props}
      style={[
        variantStyle,
        colorStyle,
        getBaseStyle(theme, family, weight, uppercase),
        style,
      ]}
    >
      {children}
    </Text>
  );
}

function getVariantStyle(theme: AppTheme, variant: AppTextVariant): TextStyle {
  switch (variant) {
    case 'hero':
      return {
        fontSize: 32,
        lineHeight: 36,
      };
    case 'title':
      return {
        fontSize: theme.typography.title,
        lineHeight: 28,
      };
    case 'subtitle':
      return {
        fontSize: theme.typography.subtitle,
        lineHeight: 24,
      };
    case 'caption':
      return {
        fontSize: theme.typography.caption,
        lineHeight: 18,
      };
    case 'label':
      return {
        fontSize: theme.typography.caption,
        letterSpacing: 0.4,
        lineHeight: 18,
      };
    case 'micro':
      return {
        fontSize: theme.typography.micro,
        lineHeight: 14,
      };
    case 'body':
    default:
      return {
        fontSize: theme.typography.body,
        lineHeight: 22,
      };
  }
}

function getBaseStyle(
  theme: AppTheme,
  family: AppTextProps['family'],
  weight: AppTextProps['weight'],
  uppercase: boolean,
): TextStyle {
  return {
    fontFamily: theme.fontFamilies[family ?? 'body'],
    fontWeight: theme.fontWeights[weight ?? 'regular'],
    textTransform: uppercase ? 'uppercase' : 'none',
  };
}

function getToneStyle(theme: AppTheme, tone: AppTextTone): TextStyle {
  switch (tone) {
    case 'muted':
      return { color: theme.colors.textMuted };
    case 'accent':
      return { color: theme.colors.accent };
    case 'inverse':
      return { color: theme.colors.surface };
    case 'danger':
      return { color: theme.colors.danger };
    case 'success':
      return { color: theme.colors.success };
    case 'warning':
      return { color: theme.colors.warning };
    case 'default':
    default:
      return { color: theme.colors.text };
  }
}
