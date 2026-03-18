import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';
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
      <Text style={[styles.label, disabled ? styles.labelDisabled : null]}>
        {label}
      </Text>
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
      color: theme.colors.surface,
      fontSize: theme.typography.body,
      fontWeight: '700',
    },
    labelDisabled: {
      color: theme.colors.textMuted,
    },
  });
