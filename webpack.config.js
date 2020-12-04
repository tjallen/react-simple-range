const path = require('path');
const HtmlWebpackPlugin = require( 'html-webpack-plugin');

// cleaner paths
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  examples: path.join(__dirname, 'examples'),
};

module.exports = {
  entry: {
    src: PATHS.examples,
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    path: PATHS.dev,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new HtmlWebpackPlugin({
      template: 'examples/example.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
