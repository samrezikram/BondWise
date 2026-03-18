/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { BondCalculatorScreen } from '../src/screens/BondCalculatorScreen';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<BondCalculatorScreen />);
  });
});
