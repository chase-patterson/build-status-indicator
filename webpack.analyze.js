const merge = require('webpack-merge');
const production = require('./webpack.prod.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(production, {
  entry: './src/index.js',
  plugins: [
    new BundleAnalyzerPlugin()
  ]
});