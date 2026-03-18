import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { CouponFrequency } from '@domain';

export type AppHeaderProps = Readonly<{
  title: string;
  subtitle?: string;
  backLabel?: string;
  onBack?: () => void;
}>;

export type AppTextVariant =
  | 'hero'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'label'
  | 'micro';

export type AppTextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type AppTextTone =
  | 'default'
  | 'muted'
  | 'accent'
  | 'inverse'
  | 'danger'
  | 'success'
  | 'warning';

export type AppTextProps = Readonly<
  TextProps & {
    children?: React.ReactNode;
    variant?: AppTextVariant;
    weight?: AppTextWeight;
    tone?: AppTextTone;
    family?: 'body' | 'display' | 'mono';
    uppercase?: boolean;
    style?: StyleProp<TextStyle>;
  }
>;

export type CardProps = Readonly<{
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}>;

export type FrequencyToggleProps = Readonly<{
  value: CouponFrequency;
  onChange: (value: CouponFrequency) => void;
}>;

export type LabeledInputProps = Readonly<{
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  suffix?: string;
  helperText?: string;
  errorText?: string;
}>;

export type MetricCardProps = Readonly<{
  label: string;
  value: string;
  tone?: 'default' | 'accent' | 'warning' | 'success';
}>;

export type PrimaryButtonProps = Readonly<{
  label: string;
  disabled?: boolean;
  onPress: () => void;
}>;

export type ScreenProps = Readonly<{
  children: React.ReactNode;
}>;
