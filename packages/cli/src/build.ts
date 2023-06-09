import webpack from 'webpack';
import { server } from '@vvee/core';

const { init } = server;

// 构建
export default async function build(type: any) {
  console.log('构建：', type);
  const context = await init();
  const config = require('../config/webpack.prod')(context);
  const compiler = webpack(config);
  compiler.run(() => {});
}