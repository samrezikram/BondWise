import { BondFormState } from '../features/bond-calculator/types';

export const defaultBondFormState: BondFormState = {
  faceValue: '1000',
  annualCouponRate: '5',
  marketPrice: '950',
  yearsToMaturity: '7',
  couponFrequency: 'semi-annual',
};
