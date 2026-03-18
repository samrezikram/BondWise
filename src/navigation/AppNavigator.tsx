import React, { useMemo, useState } from 'react';

import {
  BondInput,
  BondSummary,
  BondValidationError,
  calculateBondSummary,
  sanitizeNumberInput,
  validateBondInput,
} from '@domain';
import { BondFormState } from '@features/bond-calculator/types';
import {
  BondFormScreen,
  BondScheduleScreen,
  BondSummaryScreen,
} from '@screens';

type RouteName = 'form' | 'summary' | 'schedule';

const defaultForm: BondFormState = {
  faceValue: '1000',
  annualCouponRate: '5',
  marketPrice: '950',
  yearsToMaturity: '7',
  couponFrequency: 'semi-annual',
};

function buildErrorMap(errors: ReadonlyArray<BondValidationError>) {
  return errors.reduce<Partial<Record<keyof BondInput, string>>>((acc, error) => {
    acc[error.field] = error.message;
    return acc;
  }, {});
}

function toBondInput(form: BondFormState): BondInput {
  return {
    faceValue: sanitizeNumberInput(form.faceValue),
    annualCouponRate: sanitizeNumberInput(form.annualCouponRate),
    marketPrice: sanitizeNumberInput(form.marketPrice),
    yearsToMaturity: sanitizeNumberInput(form.yearsToMaturity),
    couponFrequency: form.couponFrequency,
  };
}

export function AppNavigator() {
  const [route, setRoute] = useState<RouteName>('form');
  const [form, setForm] = useState<BondFormState>(defaultForm);

  const input = useMemo(() => toBondInput(form), [form]);
  const errors = useMemo(() => validateBondInput(input), [input]);
  const errorMap = useMemo(() => buildErrorMap(errors), [errors]);
  const summary: BondSummary | null = useMemo(
    () => (errors.length === 0 ? calculateBondSummary(input) : null),
    [errors, input],
  );

  if (route === 'summary') {
    return (
      <BondSummaryScreen
        summary={summary}
        onBack={() => setRoute('form')}
        onOpenSchedule={() => setRoute('schedule')}
      />
    );
  }

  if (route === 'schedule') {
    return (
      <BondScheduleScreen
        summary={summary}
        onBack={() => setRoute('summary')}
      />
    );
  }

  return (
    <BondFormScreen
      form={form}
      errors={errorMap}
      totalPeriods={summary?.totalPeriods ?? null}
      onChange={setForm}
      onContinue={() => setRoute('summary')}
      canContinue={summary !== null}
    />
  );
}
