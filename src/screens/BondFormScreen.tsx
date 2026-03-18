import React from 'react';
import { StyleSheet } from 'react-native';

import { AppHeader, AppText, PrimaryButton, Screen } from '@components';
import { AppTheme, useAppTheme } from '@theme';
import { BondFormCard } from '../features/bond-calculator/BondFormCard';
import { BondFormScreenProps } from './types';

export function BondFormScreen({
  form,
  errors,
  totalPeriods,
  onChange,
  onContinue,
  canContinue,
}: BondFormScreenProps) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <Screen>
      <AppHeader
        title="Bond Yield Calculator"
        subtitle="Enter the bond details."
      />
      <BondFormCard
        form={form}
        errors={errors}
        totalPeriods={totalPeriods}
        onChange={onChange}
      />
      {!canContinue ? (
        <AppText variant="caption" tone="muted" style={styles.helper}>
          Fill all fields with valid values to continue.
        </AppText>
      ) : null}
      <PrimaryButton
        label="Review Results"
        onPress={onContinue}
        disabled={!canContinue}
      />
    </Screen>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    helper: {
      marginTop: -theme.spacing.sm,
    },
  });
