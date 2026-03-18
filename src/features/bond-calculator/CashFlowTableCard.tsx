import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText, Card } from '@components';
import { AppTheme, useAppTheme } from '@theme';
import { BondSummary } from '@domain';
import { formatCurrency } from '@lib';

type CashFlowTableCardProps = Readonly<{
  summary: BondSummary;
}>;

type CellProps = Readonly<{
  text: string;
  width: number;
  header?: boolean;
  styles: ReturnType<typeof getStyles>;
}>;

export function CashFlowTableCard({ summary }: CashFlowTableCardProps) {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <Card style={styles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={[styles.row, styles.headerRow]}>
            <Cell text="Period" width={74} header styles={styles} />
            <Cell text="Date" width={130} header styles={styles} />
            <Cell text="Coupon" width={120} header styles={styles} />
            <Cell text="Interest" width={120} header styles={styles} />
            <Cell text="Principal" width={120} header styles={styles} />
          </View>
          {summary.cashFlows.map((row, index) => (
            <View
              key={`${row.period}-${row.paymentDate}`}
              style={[styles.row, index % 2 === 0 ? styles.altRow : null]}
            >
              <Cell text={String(row.period)} width={74} styles={styles} />
              <Cell text={row.paymentDate} width={130} styles={styles} />
              <Cell text={formatCurrency(row.couponPayment)} width={120} styles={styles} />
              <Cell
                text={formatCurrency(row.cumulativeInterest)}
                width={120}
                styles={styles}
              />
              <Cell
                text={formatCurrency(row.remainingPrincipal)}
                width={120}
                styles={styles}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </Card>
  );
}

function Cell({
  text,
  width,
  header = false,
  styles,
}: CellProps) {
  return (
    <View style={[styles.cell, { width }]}>
      <AppText
        variant="caption"
        weight={header ? 'bold' : 'medium'}
        family={header ? 'body' : 'mono'}
        style={header ? styles.headerText : styles.cellText}
      >
        {text}
      </AppText>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      padding: 0,
    },
    row: {
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
      flexDirection: 'row',
    },
    headerRow: {
      backgroundColor: theme.colors.surfaceMuted,
      borderTopWidth: 0,
    },
    altRow: {
      backgroundColor: theme.colors.rowAlt,
    },
    cell: {
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    headerText: {
      letterSpacing: 0.4,
    },
    cellText: {
    },
  });
