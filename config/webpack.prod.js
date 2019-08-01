const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (context) => {
  context.mode = 'production';
  return merge(common(context), {
    plugins: [
      new UglifyJSPlugin()
    ]
  });
};