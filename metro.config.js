const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const projectRoot = __dirname;

const config = {
  resolver: {
    extraNodeModules: {
      '@components': path.resolve(projectRoot, 'src/components'),
      '@designsystem': path.resolve(projectRoot, 'src/design'),
      '@designsytem': path.resolve(projectRoot, 'src/design'),
      '@theme': path.resolve(projectRoot, 'src/design'),
      '@domain': path.resolve(projectRoot, 'src/domain'),
      '@features': path.resolve(projectRoot, 'src/features'),
      '@lib': path.resolve(projectRoot, 'src/lib'),
      '@navigation': path.resolve(projectRoot, 'src/navigation'),
      '@screens': path.resolve(projectRoot, 'src/screens'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
