import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { appTheme } from '../design/theme';

export function BondCalculatorScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>BondWise</Text>
        <Text style={styles.title}>Bond Yield Calculator</Text>
        <Text style={styles.description}>
          Design system scaffold ready. Calculation and cash-flow modules land
          next.
        </Text>
      </View>

      <Card>
        <Text style={styles.cardTitle}>Design Toolkit Direction</Text>
        <Text style={styles.cardBody}>
          Warm paper surfaces, strong contrast, compact cards, and reusable
          spacing and type tokens. This gives us a stable visual base for live
          edits during the interview.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: appTheme.spacing.sm,
    paddingTop: appTheme.spacing.sm,
  },
  eyebrow: {
    color: appTheme.colors.accent,
    fontSize: appTheme.typography.caption,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: appTheme.colors.text,
    fontSize: appTheme.typography.hero,
    fontWeight: '800',
  },
  description: {
    color: appTheme.colors.textMuted,
    fontSize: appTheme.typography.body,
    lineHeight: 24,
  },
  cardTitle: {
    color: appTheme.colors.text,
    fontSize: appTheme.typography.subtitle,
    fontWeight: '700',
    marginBottom: appTheme.spacing.xs,
  },
  cardBody: {
    color: appTheme.colors.textMuted,
    fontSize: appTheme.typography.body,
    lineHeight: 24,
  },
});
