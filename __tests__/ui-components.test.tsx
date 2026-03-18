import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text, TextInput } from 'react-native';

import {
  AppHeader,
  FrequencyToggle,
  LabeledInput,
  MetricCard,
  PrimaryButton,
} from '@components';
import { BondSummary } from '@domain';
import { BondFormCard } from '@features/bond-calculator/BondFormCard';
import { BondSummaryCard } from '@features/bond-calculator/BondSummaryCard';
import { CashFlowTableCard } from '@features/bond-calculator/CashFlowTableCard';
import { BondScheduleScreen, BondSummaryScreen } from '@screens';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@theme', () => {
  const actual = jest.requireActual('../src/design/theme');
  return {
    ...actual,
    useAppTheme: () => actual.createAppTheme('light'),
  };
});

const baseSummary: BondSummary = {
  currentYieldPercent: 5.26,
  yieldToMaturityPercent: 5.88,
  totalInterestEarned: 350,
  premiumDiscountLabel: 'Discount',
  premiumDiscountAmount: 50,
  annualCouponPayment: 50,
  periodicCouponPayment: 25,
  totalPeriods: 14,
  cashFlows: [
    {
      period: 1,
      paymentDate: 'Sep 18, 2026',
      couponPayment: 25,
      cumulativeInterest: 25,
      remainingPrincipal: 1000,
    },
  ],
};

describe('UI components', () => {
  function findPressables(renderer: ReactTestRenderer.ReactTestRenderer) {
    return renderer.root.findAll(node => typeof node.props.onPress === 'function');
  }

  function getAllText(renderer: ReactTestRenderer.ReactTestRenderer) {
    return renderer.root
      .findAllByType(Text)
      .map(node => node.props.children)
      .flat(Infinity)
      .filter(
        (value): value is string | number =>
          typeof value === 'string' || typeof value === 'number',
      )
      .map(String);
  }

  function findStyleNodes(renderer: ReactTestRenderer.ReactTestRenderer) {
    return renderer.root.findAll(node => typeof node.props.style === 'function');
  }

  it('renders AppHeader with and without back controls', async () => {
    const onBack = jest.fn();

    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <AppHeader
          title="Summary"
          subtitle="Review the yield metrics."
          backLabel="Inputs"
          onBack={onBack}
        />,
      );
    });

    const pressable = findPressables(renderer!)[0];
    await ReactTestRenderer.act(() => {
      pressable!.props.onPress();
    });
    expect(onBack).toHaveBeenCalledTimes(1);

    await ReactTestRenderer.act(() => {
      renderer!.update(<AppHeader title="Inputs" />);
    });

    expect(findPressables(renderer!)).toHaveLength(0);

    await ReactTestRenderer.act(() => {
      renderer!.update(<AppHeader title="Inputs" onBack={onBack} />);
    });

    expect(getAllText(renderer!)).toContain('Back');
  });

  it('renders all MetricCard tones', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <>
          <MetricCard label="A" value="1" tone="default" />
          <MetricCard label="B" value="2" tone="accent" />
          <MetricCard label="C" value="3" tone="warning" />
          <MetricCard label="D" value="4" tone="success" />
        </>,
      );
    });

    expect(renderer!.root.findAllByType(Text)).toHaveLength(8);
  });

  it('handles PrimaryButton enabled and disabled states', async () => {
    const onPress = jest.fn();
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <PrimaryButton label="Continue" onPress={onPress} />,
      );
    });

    const enabledButton = findPressables(renderer!)[0];
    await ReactTestRenderer.act(() => {
      enabledButton!.props.onPress();
    });

    expect(onPress).toHaveBeenCalledTimes(1);
    findStyleNodes(renderer!)[0]!.props.style({ pressed: true });

    await ReactTestRenderer.act(() => {
      renderer!.update(
        <PrimaryButton label="Continue" onPress={onPress} disabled />,
      );
    });

    const disabledButton = findPressables(renderer!)[0];
    expect(disabledButton!.props.disabled).toBe(true);
    findStyleNodes(renderer!)[0]!.props.style({ pressed: false });
  });

  it('handles FrequencyToggle selections', async () => {
    const onChange = jest.fn();
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <FrequencyToggle value="annual" onChange={onChange} />,
      );
    });

    const buttons = findPressables(renderer!);
    await ReactTestRenderer.act(() => {
      buttons[1]!.props.onPress();
    });

    expect(onChange).toHaveBeenCalledWith('semi-annual');
  });

  it('renders helper and error states for LabeledInput', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <LabeledInput
          label="Face value"
          value="1000"
          onChangeText={jest.fn()}
          helperText="14 payments"
        />,
      );
    });

    expect(renderer!.root.findAllByType(Text).map(node => node.props.children)).toContain(
      '14 payments',
    );

    await ReactTestRenderer.act(() => {
      renderer!.update(
        <LabeledInput
          label="Face value"
          value=""
          onChangeText={jest.fn()}
          errorText="Face value must be greater than 0."
        />,
      );
    });

    const input = renderer!.root.findByType(TextInput);
    expect(input.props.value).toBe('');
  });

  it('covers BondFormCard field updates and frequency changes', async () => {
    const setForm = jest.fn();
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <BondFormCard
          form={{
            faceValue: '1000',
            annualCouponRate: '5',
            marketPrice: '950',
            yearsToMaturity: '7',
            couponFrequency: 'annual',
          }}
          errors={{}}
          totalPeriods={14}
          onChange={setForm}
        />,
      );
    });

    const inputs = renderer!.root.findAllByType(TextInput);
    inputs.forEach((input, index) => {
      input.props.onChangeText(String(index));
    });

    const initialForm = {
      faceValue: '1000',
      annualCouponRate: '5',
      marketPrice: '950',
      yearsToMaturity: '7',
      couponFrequency: 'annual' as const,
    };

    setForm.mock.calls.slice(0, 4).forEach(call => {
      const updater = call[0] as (current: typeof initialForm) => typeof initialForm;
      updater(initialForm);
    });

    const toggles = findPressables(renderer!);
    await ReactTestRenderer.act(() => {
      toggles[1]!.props.onPress();
    });

    const toggleUpdater = setForm.mock.calls[4]?.[0] as
      | ((current: typeof initialForm) => typeof initialForm)
      | undefined;
    toggleUpdater?.(initialForm);

    expect(setForm).toHaveBeenCalled();

    await ReactTestRenderer.act(() => {
      renderer!.update(
        <BondFormCard
          form={{
            faceValue: '1000',
            annualCouponRate: '5',
            marketPrice: '950',
            yearsToMaturity: '7',
            couponFrequency: 'annual',
          }}
          errors={{ faceValue: 'Face value must be greater than 0.' }}
          totalPeriods={null}
          onChange={setForm}
        />,
      );
    });

    const nextInputs = renderer!.root.findAllByType(TextInput);
    nextInputs[0]!.props.onChangeText('2000');

    const lastUpdater = setForm.mock.calls[setForm.mock.calls.length - 1]?.[0] as
      | ((current: typeof initialForm) => typeof initialForm)
      | undefined;
    lastUpdater?.(initialForm);
  });

  it('covers BondSummaryCard tones and values', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(
        <>
          <BondSummaryCard summary={{ ...baseSummary, premiumDiscountLabel: 'Premium' }} />
          <BondSummaryCard summary={{ ...baseSummary, premiumDiscountLabel: 'Discount' }} />
          <BondSummaryCard summary={{ ...baseSummary, premiumDiscountLabel: 'At Par' }} />
        </>,
      );
    });
  });

  it('renders CashFlowTableCard rows', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <CashFlowTableCard summary={baseSummary} />,
      );
    });

    expect(renderer!.root.findAllByType(Text).length).toBeGreaterThan(5);
  });

  it('covers empty and populated summary screen states', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <BondSummaryScreen
          summary={null}
          onBack={jest.fn()}
          onOpenSchedule={jest.fn()}
        />,
      );
    });

    expect(
      renderer!.root.findAllByProps({
        children: 'Return to inputs and complete the bond details.',
      }).length,
    ).toBeGreaterThan(0);

    await ReactTestRenderer.act(() => {
      renderer!.update(
        <BondSummaryScreen
          summary={baseSummary}
          onBack={jest.fn()}
          onOpenSchedule={jest.fn()}
        />,
      );
    });

    expect(getAllText(renderer!)).toContain('View Cash Flow');
  });

  it('covers empty and populated schedule screen states', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <BondScheduleScreen summary={null} onBack={jest.fn()} />,
      );
    });

    expect(
      renderer!.root.findAllByProps({
        children: 'Return to the summary screen after entering valid inputs.',
      }).length,
    ).toBeGreaterThan(0);

    await ReactTestRenderer.act(() => {
      renderer!.update(
        <BondScheduleScreen summary={baseSummary} onBack={jest.fn()} />,
      );
    });

    expect(getAllText(renderer!)).toEqual(
      expect.arrayContaining([
        String(baseSummary.totalPeriods),
        ' payments · ',
        baseSummary.premiumDiscountLabel,
      ]),
    );
  });
});
