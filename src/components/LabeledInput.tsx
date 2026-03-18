import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';
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
        <Text style={styles.label}>{label}</Text>
        {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
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
        <Text style={styles.errorText}>{errorText}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
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
    label: {
      color: theme.colors.text,
      fontSize: theme.typography.caption,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    suffix: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.caption,
      fontWeight: '700',
    },
    input: {
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      color: theme.colors.text,
      fontSize: theme.typography.title,
      fontWeight: '700',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    inputError: {
      borderColor: theme.colors.danger,
    },
    helperText: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.caption,
      lineHeight: 18,
    },
    errorText: {
      color: theme.colors.danger,
      fontSize: theme.typography.caption,
      lineHeight: 18,
    },
  });
