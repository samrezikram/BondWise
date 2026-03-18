import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';
import { AppText } from './AppText';
import { PrimaryButtonProps } from './types';

export function PrimaryButton({
  label,
  disabled = false,
  onPress,
}: PrimaryButtonProps) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled ? styles.buttonDisabled : null,
        pressed && !disabled ? styles.buttonPressed : null,
      ]}
    >
      <AppText
        variant="body"
        weight="bold"
        tone={disabled ? 'muted' : 'inverse'}
        style={styles.label}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: theme.colors.accent,
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    buttonDisabled: {
      backgroundColor: theme.colors.surfaceMuted,
    },
    buttonPressed: {
      opacity: 0.9,
    },
    label: {
    },
  });
