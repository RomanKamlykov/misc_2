const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js', // app entry point
  // multiple entry point - code splitting variant entry: { foo:'foo.js', bar: 'bar.js' },
  output: {
    filename: 'awensome.js', // default is main.js
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  }
}
