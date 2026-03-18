import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { AppHeader, Card, PrimaryButton, Screen } from '@components';
import { AppTheme, useAppTheme } from '@theme';
import { BondSummaryCard } from '../features/bond-calculator/BondSummaryCard';
import { BondSummaryScreenProps } from './types';

export function BondSummaryScreen({
  summary,
  onBack,
  onOpenSchedule,
}: BondSummaryScreenProps) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <Screen>
      <AppHeader
        title="Summary"
        subtitle="Review the yield metrics."
        backLabel="Inputs"
        onBack={onBack}
      />
      {summary ? (
        <>
          <BondSummaryCard summary={summary} />
          <PrimaryButton label="View Cash Flow" onPress={onOpenSchedule} />
        </>
      ) : (
        <Card>
          <Text style={styles.emptyText}>Return to inputs and complete the bond details.</Text>
        </Card>
      )}
    </Screen>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    emptyText: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.body,
      lineHeight: 22,
    },
  });
