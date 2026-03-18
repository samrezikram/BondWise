import React from 'react';

import { AppHeader, AppText, Card, PrimaryButton, Screen } from '@components';
import { BondSummaryCard } from '../features/bond-calculator/BondSummaryCard';
import { BondSummaryScreenProps } from './types';

export function BondSummaryScreen({
  summary,
  onBack,
  onOpenSchedule,
}: BondSummaryScreenProps) {
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
          <AppText variant="body" tone="muted">
            Return to inputs and complete the bond details.
          </AppText>
        </Card>
      )}
    </Screen>
  );
}
