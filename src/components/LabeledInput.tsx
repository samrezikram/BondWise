import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';
import { AppText } from './AppText';
import { LabeledInputProps } from './types';

export function LabeledInput({
  label,
  value,
  onChangeText,
  keyboardType = 'decimal-pad',
  suffix,
  helperText,
  errorText,
}: Readonly<LabeledInputProps>) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <AppText variant="label" weight="bold" uppercase style={styles.label}>
          {label}
        </AppText>
        {suffix ? (
          <AppText
            variant="caption"
            weight="bold"
            tone="muted"
            style={styles.suffix}
          >
            {suffix}
          </AppText>
        ) : null}
      </View>
      <TextInput
        style={[styles.input, errorText ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder="0"
        placeholderTextColor={theme.colors.textMuted}
      />
      {errorText ? (
        <AppText variant="caption" tone="danger" style={styles.errorText}>
          {errorText}
        </AppText>
      ) : helperText ? (
        <AppText variant="caption" tone="muted" style={styles.helperText}>
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.xs,
    },
    headerRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {},
    suffix: {},
    input: {
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      color: theme.colors.text,
      fontFamily: theme.fontFamilies.body,
      fontSize: theme.typography.title,
      fontWeight: theme.fontWeights.bold,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    inputError: {
      borderColor: theme.colors.danger,
    },
    helperText: {},
    errorText: {},
  });
