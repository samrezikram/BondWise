import React from 'react';

import { BondSummary, BondInput } from '@domain';
import { BondFormState } from '../features/bond-calculator/types';

export type BondFormScreenProps = Readonly<{
  form: BondFormState;
  errors: Partial<Record<keyof BondInput, string>>;
  totalPeriods: number | null;
  onChange: React.Dispatch<React.SetStateAction<BondFormState>>;
  onContinue: () => void;
  canContinue: boolean;
}>;

export type BondSummaryScreenProps = Readonly<{
  summary: BondSummary | null;
  onBack: () => void;
  onOpenSchedule: () => void;
}>;

export type BondScheduleScreenProps = Readonly<{
  summary: BondSummary | null;
  onBack: () => void;
}>;
