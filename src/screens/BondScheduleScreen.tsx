import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { AppHeader, Card, Screen } from '@components';
import { AppTheme, useAppTheme } from '@theme';
import { CashFlowTableCard } from '../features/bond-calculator/CashFlowTableCard';
import { BondScheduleScreenProps } from './types';

export function BondScheduleScreen({
  summary,
  onBack,
}: BondScheduleScreenProps) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <Screen>
      <AppHeader
        title="Cash Flow"
        subtitle="Projected coupon payments and remaining principal."
        backLabel="Summary"
        onBack={onBack}
      />
      {summary ? (
        <>
          <Card>
            <Text style={styles.meta}>
              {summary.totalPeriods} payments · {summary.premiumDiscountLabel}
            </Text>
          </Card>
          <CashFlowTableCard summary={summary} />
        </>
      ) : (
        <Card>
          <Text style={styles.meta}>Return to the summary screen after entering valid inputs.</Text>
        </Card>
      )}
    </Screen>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    meta: {
      color: theme.colors.textMuted,
      fontSize: theme.typography.body,
      lineHeight: 22,
    },
  });
