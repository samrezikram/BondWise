import {
  BondInput,
  calculateBondSummary,
  sanitizeNumberInput,
  validateBondInput,
} from '@domain';

const sampleInputs: BondInput = {
  faceValue: 1000,
  annualCouponRate: 5,
  marketPrice: 950,
  yearsToMaturity: 7,
  couponFrequency: 'semi-annual',
};

describe('bondCalculator', () => {
  it('calculates summary fields used by the mobile UI', () => {
    const result = calculateBondSummary(sampleInputs, new Date('2026-03-18'));

    expect(result.currentYieldPercent).toBeCloseTo(5.2631, 3);
    expect(result.yieldToMaturityPercent).toBeCloseTo(5.8817, 4);
    expect(result.totalInterestEarned).toBe(350);
    expect(result.annualCouponPayment).toBe(50);
    expect(result.periodicCouponPayment).toBe(25);
    expect(result.premiumDiscountAmount).toBe(50);
    expect(result.totalPeriods).toBe(14);
  });

  it('builds a cash flow schedule with projected payment dates', () => {
    const rows = calculateBondSummary(
      sampleInputs,
      new Date('2026-03-18'),
    ).cashFlows;

    expect(rows[0]).toEqual({
      period: 1,
      paymentDate: 'Sep 18, 2026',
      couponPayment: 25,
      cumulativeInterest: 25,
      remainingPrincipal: 1000,
    });
    expect(rows[13]?.remainingPrincipal).toBe(0);
  });

  it('validates incomplete or invalid input', () => {
    expect(
      validateBondInput({
        faceValue: 0,
        annualCouponRate: -1,
        marketPrice: 0,
        yearsToMaturity: 0,
        couponFrequency: 'annual',
      }),
    ).toHaveLength(4);
  });

  it('sanitizes transient text input without crashing calculation setup', () => {
    expect(sanitizeNumberInput('')).toBe(0);
    expect(sanitizeNumberInput('$1,250.50')).toBe(1250.5);
  });
});
