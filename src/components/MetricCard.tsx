import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';

type MetricCardProps = {
  readonly label: string;
  readonly value: string;
  readonly tone?: 'default' | 'accent' | 'warning' | 'success';
};

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
      <Text style={[styles.label, toneStyles[tone].label]}>{label}</Text>
      <Text style={[styles.value, toneStyles[tone].value]}>{value}</Text>
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
      fontSize: theme.typography.caption,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    value: {
      fontSize: theme.typography.title,
      fontWeight: '700',
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
