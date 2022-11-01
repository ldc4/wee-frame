const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = (context) => {
  context.mode = 'development';
  return merge(common(context), {
    devtool: 'inline-source-map',
    optimization: {
      moduleIds: 'named',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
};