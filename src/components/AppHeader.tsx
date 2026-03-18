import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';
import { AppText } from './AppText';
import { AppHeaderProps } from './types';

export function AppHeader({
  title,
  subtitle,
  backLabel,
  onBack,
}: AppHeaderProps) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.backButton}>
            <AppText variant="caption" weight="bold" tone="accent" style={styles.backLabel}>
              {backLabel ?? 'Back'}
            </AppText>
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}
        <AppText
          variant="label"
          weight="bold"
          tone="muted"
          uppercase
          style={styles.brand}
        >
          BondWise
        </AppText>
      </View>
      <AppText variant="hero" weight="bold" family="display" style={styles.title}>
        {title}
      </AppText>
      {subtitle ? (
        <AppText variant="body" tone="muted" style={styles.subtitle}>
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      gap: theme.spacing.xs,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 28,
    },
    backButton: {
      paddingVertical: 2,
      paddingRight: theme.spacing.sm,
    },
    backSpacer: {
      width: 48,
    },
    backLabel: {
    },
    brand: {
      letterSpacing: 0.6,
    },
    title: {
    },
    subtitle: {
      maxWidth: 320,
    },
  });
