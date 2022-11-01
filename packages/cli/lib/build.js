const webpack = require('webpack');
const init = require('./init');

// 构建
module.exports = function build(type) {
  const context = init();
  const config = require('../config/webpack.prod')(context);
  const compiler = webpack(config);
  compiler.run();
}