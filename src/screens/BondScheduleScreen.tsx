import React from 'react';

import { AppHeader, AppText, Card, Screen } from '@components';
import { CashFlowTableCard } from '../features/bond-calculator/CashFlowTableCard';
import { BondScheduleScreenProps } from './types';

export function BondScheduleScreen({
  summary,
  onBack,
}: BondScheduleScreenProps) {
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
            <AppText variant="body" tone="muted">
              {summary.totalPeriods} payments · {summary.premiumDiscountLabel}
            </AppText>
          </Card>
          <CashFlowTableCard summary={summary} />
        </>
      ) : (
        <Card>
          <AppText variant="body" tone="muted">
            Return to the summary screen after entering valid inputs.
          </AppText>
        </Card>
      )}
    </Screen>
  );
}
