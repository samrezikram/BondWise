/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('../src/components/Screen', () => ({
  Screen: ({ children }: { children: React.ReactNode }) => {
    const ReactModule = require('react');
    const ReactNative = require('react-native');
    return ReactModule.createElement(ReactNative.View, null, children);
  },
}));

jest.mock('../src/design/theme', () => {
  const actual = jest.requireActual('../src/design/theme');
  return {
    ...actual,
    useAppTheme: () => actual.createAppTheme('light'),
  };
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
