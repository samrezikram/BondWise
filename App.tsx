import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppThemeProvider, useAppTheme } from '@theme';
import { AppNavigator } from '@navigation';

function App() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <AppShell />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

function AppShell() {
  const theme = useAppTheme();

  return (
    <>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <AppNavigator />
    </>
  );
}

export default App;
