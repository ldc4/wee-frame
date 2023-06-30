const merge = require('webpack-merge').default;
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (context) => {
  context.mode = 'production';
  return merge(common(context), {
    plugins: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        // `terserOptions` options will be passed to `uglify-js`
        // Link to options - https://github.com/mishoo/UglifyJS#minify-options
        terserOptions: {},
      })
    ]
  });
};