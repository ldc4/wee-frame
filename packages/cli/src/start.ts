import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { server } from '@vvee/core';

const { init } = server;


// 启动本地服务器
export default async function start(type: any) {
  console.log('启动：', type);
  // 1. 初始化，读取配置信息
  const context = await init();

  // 2. 启动服务器
  const app = express();
  const config = require('../config/webpack.dev')(context);
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  let port = process.env.PORT ? Number(process.env.PORT) : 3210;
  let server = app.listen(port, function () {
    const addressInfo: any = server.address();
    console.log(`监听端口为：${addressInfo.port}!（可通过环境变量'PORT'修改）\n`);
  });

  server.on('error', (e: any) => {
    if (e.code === 'EADDRINUSE') {
      // console.log(`${port}端口已被占用，重试...`);
      server.close();
      port++;
      server.listen(port);
    }
  })
}