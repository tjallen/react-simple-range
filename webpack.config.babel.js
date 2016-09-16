/* eslint-disable global-require, no-unused-vars */

import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

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
    path: PATHS.dist,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new HtmlWebpackPlugin({
      template: 'examples/example.html',
    }),
    new CleanWebpackPlugin([
      PATHS.dist,
    ], {
      verbose: true,
      dry: false,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.(css|scss|pcss)$/,
        loader: 'style-loader!css-loader?modules',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
};