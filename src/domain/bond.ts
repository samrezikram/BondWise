export type CouponFrequency = 'annual' | 'semi-annual';

export type BondInput = {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: CouponFrequency;
};

export type BondValidationError = {
  field: keyof BondInput;
  message: string;
};

export type CashFlowRow = {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
};

export type BondSummary = {
  currentYieldPercent: number;
  yieldToMaturityPercent: number;
  totalInterestEarned: number;
  premiumDiscountLabel: 'Premium' | 'Discount' | 'At Par';
  cashFlows: CashFlowRow[];
};

const YTM_TOLERANCE = 0.0000001;
const YTM_MAX_ITERATIONS = 200;

export function validateBondInput(input: BondInput): BondValidationError[] {
  const errors: BondValidationError[] = [];

  if (input.faceValue <= 0) {
    errors.push({ field: 'faceValue', message: 'Face value must be greater than 0.' });
  }

  if (input.annualCouponRate < 0) {
    errors.push({
      field: 'annualCouponRate',
      message: 'Coupon rate cannot be negative.',
    });
  }

  if (input.marketPrice <= 0) {
    errors.push({
      field: 'marketPrice',
      message: 'Market price must be greater than 0.',
    });
  }

  if (input.yearsToMaturity <= 0) {
    errors.push({
      field: 'yearsToMaturity',
      message: 'Years to maturity must be greater than 0.',
    });
  }

  return errors;
}

export function calculateBondSummary(
  input: BondInput,
  settlementDate: Date = new Date(),
): BondSummary {
  const errors = validateBondInput(input);

  if (errors.length > 0) {
    throw new Error(errors.map(error => error.message).join(' '));
  }

  const periodsPerYear = getPeriodsPerYear(input.couponFrequency);
  const totalPeriods = Math.max(1, Math.round(input.yearsToMaturity * periodsPerYear));
  const couponPayment =
    (input.faceValue * (input.annualCouponRate / 100)) / periodsPerYear;
  const annualCouponIncome = couponPayment * periodsPerYear;

  return {
    currentYieldPercent: (annualCouponIncome / input.marketPrice) * 100,
    yieldToMaturityPercent: solveYieldToMaturity(input, totalPeriods) * 100,
    totalInterestEarned: couponPayment * totalPeriods,
    premiumDiscountLabel: getPremiumDiscountLabel(input.marketPrice, input.faceValue),
    cashFlows: buildCashFlowSchedule(
      input,
      totalPeriods,
      couponPayment,
      settlementDate,
    ),
  };
}

export function getPeriodsPerYear(frequency: CouponFrequency): number {
  return frequency === 'semi-annual' ? 2 : 1;
}

function solveYieldToMaturity(input: BondInput, totalPeriods: number): number {
  const periodsPerYear = getPeriodsPerYear(input.couponFrequency);
  const couponPayment =
    (input.faceValue * (input.annualCouponRate / 100)) / periodsPerYear;

  let lowerBound = 0;
  let upperBound = 1;

  while (
    priceBond(input.faceValue, couponPayment, totalPeriods, upperBound, periodsPerYear) >
    input.marketPrice
  ) {
    upperBound *= 2;

    if (upperBound > 1_000) {
      break;
    }
  }

  for (let iteration = 0; iteration < YTM_MAX_ITERATIONS; iteration += 1) {
    const midpoint = (lowerBound + upperBound) / 2;
    const price = priceBond(
      input.faceValue,
      couponPayment,
      totalPeriods,
      midpoint,
      periodsPerYear,
    );

    if (Math.abs(price - input.marketPrice) < YTM_TOLERANCE) {
      return midpoint;
    }

    if (price > input.marketPrice) {
      lowerBound = midpoint;
    } else {
      upperBound = midpoint;
    }
  }

  return (lowerBound + upperBound) / 2;
}

function priceBond(
  faceValue: number,
  couponPayment: number,
  totalPeriods: number,
  annualYieldRate: number,
  periodsPerYear: number,
): number {
  const periodYield = annualYieldRate / periodsPerYear;
  let price = 0;

  for (let period = 1; period <= totalPeriods; period += 1) {
    price += couponPayment / (1 + periodYield) ** period;
  }

  return price + faceValue / (1 + periodYield) ** totalPeriods;
}

function buildCashFlowSchedule(
  input: BondInput,
  totalPeriods: number,
  couponPayment: number,
  settlementDate: Date,
): CashFlowRow[] {
  const monthsPerPeriod = input.couponFrequency === 'semi-annual' ? 6 : 12;
  let cumulativeInterest = 0;

  return Array.from({ length: totalPeriods }, (_, index) => {
    const period = index + 1;
    cumulativeInterest += couponPayment;

    return {
      period,
      paymentDate: formatDate(addMonths(settlementDate, monthsPerPeriod * period)),
      couponPayment,
      cumulativeInterest,
      remainingPrincipal: period === totalPeriods ? 0 : input.faceValue,
    };
  });
}

function getPremiumDiscountLabel(
  marketPrice: number,
  faceValue: number,
): BondSummary['premiumDiscountLabel'] {
  if (marketPrice > faceValue) {
    return 'Premium';
  }

  if (marketPrice < faceValue) {
    return 'Discount';
  }

  return 'At Par';
}

function addMonths(date: Date, monthsToAdd: number): Date {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + monthsToAdd);
  return nextDate;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
