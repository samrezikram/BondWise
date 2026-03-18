import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppTheme, useAppTheme } from '@theme';
import { AppText } from './AppText';
import { frequencyToggleOptions } from './constants';
import { FrequencyToggleProps } from './types';

export function FrequencyToggle({
  value,
  onChange,
}: Readonly<FrequencyToggleProps>) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.wrapper}>
      {frequencyToggleOptions.map(option => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, isSelected && styles.optionSelected]}
          >
            <AppText
              variant="label"
              weight="bold"
              tone={isSelected ? 'inverse' : 'muted'}
              style={[
                styles.optionLabel,
                isSelected && styles.optionLabelSelected,
              ]}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: theme.radii.pill,
      flexDirection: 'row',
      padding: 4,
    },
    option: {
      borderRadius: theme.radii.pill,
      flex: 1,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    optionSelected: {
      backgroundColor: theme.colors.accent,
    },
    optionLabel: {
      textAlign: 'center',
    },
    optionLabelSelected: {
    },
  });
