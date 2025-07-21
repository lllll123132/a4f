/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config, { isServer }) => {
    // Enable WebAssembly support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    config.output.webassemblyModuleFilename = (isServer ? '../' : '') + 'static/wasm/[modulehash].wasm';

    // Add webpack-bundle-analyzer if ANALYZE environment variable is set
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8891 : 8890,
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;