import { CouponFrequency } from '@domain';

export const frequencyToggleOptions: ReadonlyArray<
  Readonly<{ label: string; value: CouponFrequency }>
> = [
  { label: 'Annual', value: 'annual' },
  { label: 'Semi-Annual', value: 'semi-annual' },
];
