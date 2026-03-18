import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Card, MetricCard } from '@components';
import { AppTheme, useAppTheme } from '@theme';
import { BondSummary } from '@domain';
import { formatCurrency, formatPercent } from '@lib';

export function BondSummaryCard({
  summary,
}: {
  readonly summary: BondSummary;
}) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  let tone: 'default' | 'warning' | 'success' = 'default';

  if (summary.premiumDiscountLabel === 'Premium') {
    tone = 'warning';
  } else if (summary.premiumDiscountLabel === 'Discount') {
    tone = 'success';
  }

  return (
    <Card>
      <View style={styles.grid}>
        <MetricCard
          label="Current yield"
          value={formatPercent(summary.currentYieldPercent / 100)}
          tone="accent"
        />
        <MetricCard
          label="YTM"
          value={formatPercent(summary.yieldToMaturityPercent / 100)}
          tone="accent"
        />
        <MetricCard
          label="Total interest"
          value={formatCurrency(summary.totalInterestEarned)}
        />
        <MetricCard
          label={summary.premiumDiscountLabel}
          value={formatCurrency(summary.premiumDiscountAmount)}
          tone={tone}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <AppText variant="label" weight="bold" uppercase tone="muted" style={styles.footerLabel}>
            Annual coupon
          </AppText>
          <AppText variant="subtitle" weight="bold" style={styles.footerValue}>
            {formatCurrency(summary.annualCouponPayment)}
          </AppText>
        </View>
        <View style={styles.footerItem}>
          <AppText variant="label" weight="bold" uppercase tone="muted" style={styles.footerLabel}>
            Each payment
          </AppText>
          <AppText variant="subtitle" weight="bold" style={styles.footerValue}>
            {formatCurrency(summary.periodicCouponPayment)}
          </AppText>
        </View>
      </View>
    </Card>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    footer: {
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
      flexDirection: 'row',
      gap: theme.spacing.md,
      marginTop: theme.spacing.lg,
      paddingTop: theme.spacing.md,
    },
    footerItem: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    footerLabel: {
    },
    footerValue: {
    },
  });
