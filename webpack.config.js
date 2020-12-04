var path = require('path')
module.exports = {
  mode: "production",

  optimization: {
    minimize: false
  },

  entry: {
    'react-simple-range': './src/components/Slider.js',
  },

  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  },

  output: {
    filename: 'index.js',
    chunkFilename: '[id].chunk.js',
    path: path.join(__dirname, 'lib'),
    publicPath: '/',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.(css|scss|pcss)$/,
        use: ['style-loader', 'css-loader?modules'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
