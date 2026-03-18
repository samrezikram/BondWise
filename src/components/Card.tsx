import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';

type CardProps = {
  readonly children: React.ReactNode;
  readonly style?: StyleProp<ViewStyle>;
};

export function Card({ children, style }: Readonly<CardProps>) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.shadow}>
      <View style={[styles.card, style]}>{children}</View>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    shadow: {
      borderRadius: theme.radii.lg,
      ...theme.shadows.card,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      padding: theme.spacing.lg,
    },
  });
