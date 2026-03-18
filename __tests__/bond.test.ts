import {
  BondInput,
  calculateBondSummary,
  validateBondInput,
} from '../src/domain/bond';

describe('bond domain logic', () => {
  it('calculates current yield, ytm, and cash flows for an annual coupon bond', () => {
    const input: BondInput = {
      faceValue: 1000,
      annualCouponRate: 5,
      marketPrice: 950,
      yearsToMaturity: 3,
      couponFrequency: 'annual',
    };

    const summary = calculateBondSummary(input, new Date('2026-01-01T00:00:00.000Z'));

    expect(summary.currentYieldPercent).toBeCloseTo(5.2632, 4);
    expect(summary.yieldToMaturityPercent).toBeCloseTo(6.9018, 4);
    expect(summary.totalInterestEarned).toBe(150);
    expect(summary.premiumDiscountLabel).toBe('Discount');
    expect(summary.cashFlows).toEqual([
      {
        period: 1,
        paymentDate: 'Jan 1, 2027',
        couponPayment: 50,
        cumulativeInterest: 50,
        remainingPrincipal: 1000,
      },
      {
        period: 2,
        paymentDate: 'Jan 1, 2028',
        couponPayment: 50,
        cumulativeInterest: 100,
        remainingPrincipal: 1000,
      },
      {
        period: 3,
        paymentDate: 'Jan 1, 2029',
        couponPayment: 50,
        cumulativeInterest: 150,
        remainingPrincipal: 0,
      },
    ]);
  });

  it('supports semi-annual periods and zero coupon bonds', () => {
    const input: BondInput = {
      faceValue: 1000,
      annualCouponRate: 0,
      marketPrice: 800,
      yearsToMaturity: 2,
      couponFrequency: 'semi-annual',
    };

    const summary = calculateBondSummary(input, new Date('2026-01-01T00:00:00.000Z'));

    expect(summary.currentYieldPercent).toBe(0);
    expect(summary.yieldToMaturityPercent).toBeCloseTo(11.4743, 4);
    expect(summary.totalInterestEarned).toBe(0);
    expect(summary.cashFlows).toHaveLength(4);
    expect(summary.cashFlows[0]?.paymentDate).toBe('Jul 1, 2026');
    expect(summary.cashFlows[3]?.remainingPrincipal).toBe(0);
  });

  it('validates invalid input fields', () => {
    const errors = validateBondInput({
      faceValue: 0,
      annualCouponRate: -1,
      marketPrice: 0,
      yearsToMaturity: 0,
      couponFrequency: 'annual',
    });

    expect(errors).toEqual([
      { field: 'faceValue', message: 'Face value must be greater than 0.' },
      {
        field: 'annualCouponRate',
        message: 'Coupon rate cannot be negative.',
      },
      {
        field: 'marketPrice',
        message: 'Market price must be greater than 0.',
      },
      {
        field: 'yearsToMaturity',
        message: 'Years to maturity must be greater than 0.',
      },
    ]);
  });
});
