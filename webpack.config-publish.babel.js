import webpack from 'webpack';

const isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
  const plugins = [];
  // expose node_env to webpack
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: process.env.NODE_ENV,
    },
  }));
  // conditionally add production uglify
  if (isProd) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
    );
  }
  return plugins;
}

module.exports = {

  entry: {
    'react-simple-range': './src/components/Slider.js',
  },

  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  },

  output: {
    filename: isProd ? 'index-min.js' : 'index.js',
    chunkFilename: '[id].chunk.js',
    path: 'lib',
    publicPath: '/',
    libraryTarget: 'umd',
  },

  plugins: getPlugins(),

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
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },

};
