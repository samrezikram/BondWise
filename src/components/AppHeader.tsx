import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';
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
            <Text style={styles.backLabel}>{backLabel ?? 'Back'}</Text>
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}
        <Text style={styles.brand}>BondWise</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
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
      color: theme.colors.accent,
      fontSize: theme.typography.caption,
      fontWeight: '700',
    },
    brand: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.caption,
      fontWeight: '700',
      letterSpacing: 0.6,
      textTransform: 'uppercase',
    },
    title: {
      color: theme.colors.text,
      fontSize: 32,
      lineHeight: 36,
      fontWeight: '700',
      fontFamily: 'Georgia',
    },
    subtitle: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.body,
      lineHeight: 22,
      maxWidth: 320,
    },
  });
