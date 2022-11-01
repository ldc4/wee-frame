const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware')
const init = require('./init');

// 启动本地服务器
module.exports = function start(type) {
  const context = init();
  const app = express();
  const config = require('../config/webpack.dev')(context);
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler, { publicPath: config.output.publicPath }));

  let port = process.env.PORT || 3210;
  let server = app.listen(port, function () {
    console.log(`监听端口为：${server.address().port}!（可通过环境变量'PORT'修改）\n`);
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      // console.log(`${port}端口已被占用，重试...`);
      server.close();
      port++;
      server.listen(port);
    }
  })
}