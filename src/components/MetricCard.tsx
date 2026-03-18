import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';
import { AppText } from './AppText';
import { MetricCardProps } from './types';

export function MetricCard({
  label,
  value,
  tone = 'default',
}: Readonly<MetricCardProps>) {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const toneStyles = getToneStyles(theme);

  return (
    <View style={[styles.card, toneStyles[tone].card]}>
      <AppText
        variant="label"
        weight="bold"
        uppercase
        style={[styles.label, toneStyles[tone].label]}
      >
        {label}
      </AppText>
      <AppText
        variant="title"
        weight="bold"
        style={[styles.value, toneStyles[tone].value]}
      >
        {value}
      </AppText>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      flex: 1,
      minWidth: '48%',
      borderRadius: theme.radii.md,
      borderWidth: 1,
      padding: theme.spacing.md,
      gap: theme.spacing.xs,
    },
    label: {
    },
    value: {
    },
  });

const getToneStyles = (theme: AppTheme) => ({
  default: StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.border,
    },
    label: {
      color: theme.colors.textMuted,
    },
    value: {
      color: theme.colors.text,
    },
  }),
  accent: StyleSheet.create({
    card: {
      backgroundColor: theme.colors.successSoft,
      borderColor: theme.colors.accent,
    },
    label: {
      color: theme.colors.accent,
    },
    value: {
      color: theme.colors.text,
    },
  }),
  warning: StyleSheet.create({
    card: {
      backgroundColor: theme.colors.warningSoft,
      borderColor: theme.colors.warning,
    },
    label: {
      color: theme.colors.warning,
    },
    value: {
      color: theme.colors.text,
    },
  }),
  success: StyleSheet.create({
    card: {
      backgroundColor: theme.colors.successSoft,
      borderColor: theme.colors.success,
    },
    label: {
      color: theme.colors.success,
    },
    value: {
      color: theme.colors.text,
    },
  }),
});
