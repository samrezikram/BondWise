import { BondInput } from '@domain';

export type BondFormState = Readonly<{
  faceValue: string;
  annualCouponRate: string;
  marketPrice: string;
  yearsToMaturity: string;
  couponFrequency: BondInput['couponFrequency'];
}>;
