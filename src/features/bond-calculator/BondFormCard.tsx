import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Card, FrequencyToggle, LabeledInput } from '@components';
import { AppTheme, useAppTheme } from '@theme';
import { BondInput } from '@domain';
import { BondFormState } from './types';

interface BondFormCardProps {
  readonly form: BondFormState;
  readonly errors: Partial<Record<keyof BondInput, string>>;
  readonly totalPeriods: number | null;
  readonly onChange: React.Dispatch<React.SetStateAction<BondFormState>>;
}

export function BondFormCard({
  form,
  errors,
  totalPeriods,
  onChange,
}: Readonly<BondFormCardProps>) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <Card>
      <View style={styles.grid}>
        <LabeledInput
          label="Face value"
          value={form.faceValue}
          onChangeText={value =>
            onChange(current => ({ ...current, faceValue: value }))
          }
          suffix="USD"
          errorText={errors.faceValue}
        />
        <LabeledInput
          label="Coupon rate"
          value={form.annualCouponRate}
          onChangeText={value =>
            onChange(current => ({ ...current, annualCouponRate: value }))
          }
          suffix="%"
          errorText={errors.annualCouponRate}
        />
        <LabeledInput
          label="Market price"
          value={form.marketPrice}
          onChangeText={value =>
            onChange(current => ({ ...current, marketPrice: value }))
          }
          suffix="USD"
          errorText={errors.marketPrice}
        />
        <LabeledInput
          label="Years to maturity"
          value={form.yearsToMaturity}
          onChangeText={value =>
            onChange(current => ({ ...current, yearsToMaturity: value }))
          }
          helperText={totalPeriods ? `${totalPeriods} payments` : undefined}
          errorText={errors.yearsToMaturity}
        />
      </View>
      <View style={styles.frequencyBlock}>
        <AppText variant="label" weight="bold" uppercase style={styles.label}>
          Coupon frequency
        </AppText>
        <FrequencyToggle
          value={form.couponFrequency}
          onChange={value =>
            onChange(current => ({ ...current, couponFrequency: value }))
          }
        />
      </View>
    </Card>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    grid: {
      gap: theme.spacing.md,
    },
    frequencyBlock: {
      gap: theme.spacing.sm,
      marginTop: theme.spacing.lg,
    },
    label: {
    },
  });
