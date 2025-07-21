const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const nextConfig = require('./next.config.js');

module.exports = {
  ...nextConfig,
  webpack: (config, { isServer }) => {
    // Add webpack-bundle-analyzer
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }

    // Your existing WebAssembly configuration
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    config.output.webassemblyModuleFilename = (isServer ? '../' : '') + 'static/wasm/[modulehash].wasm';

    return config;
  },
};