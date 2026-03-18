import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { TextInput } from 'react-native';

import { PrimaryButton } from '@components';
import { AppNavigator } from '@navigation';
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

describe('AppNavigator', () => {
  it('disables continue when a required input becomes invalid', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<AppNavigator />);
    });

    const inputs = renderer!.root.findAllByType(TextInput);

    await ReactTestRenderer.act(() => {
      inputs[0]!.props.onChangeText('');
    });

    const reviewButton = renderer!.root.findByType(PrimaryButton);

    expect(reviewButton.props.disabled).toBe(true);
  });

  it('navigates from inputs to summary and cash flow', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<AppNavigator />);
    });

    let reviewButton = renderer!.root.findByType(PrimaryButton);

    await ReactTestRenderer.act(() => {
      reviewButton.props.onPress();
    });

    expect(renderer!.root.findAllByType(BondSummaryScreen)).toHaveLength(1);

    reviewButton = renderer!.root.findByType(PrimaryButton);

    await ReactTestRenderer.act(() => {
      reviewButton.props.onPress();
    });

    expect(renderer!.root.findAllByType(BondScheduleScreen)).toHaveLength(1);
  });
});
