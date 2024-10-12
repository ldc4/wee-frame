import webpack from 'webpack';
import vite from 'vite';
import vvee from '@vvee/core';


// 构建
export default async function build(type: any) {
  console.log('构建：', type);
  if (type === 'app') {
    const context = await vvee.server.app.init();
    const config = require('../config/app/webpack.prod')(context);
    const compiler = webpack(config);
    compiler.run(() => {});
  } else if (type === 'lib') {
    console.log('lib');
    const context = await vvee.server.lib.init();
    const config = require('../config/lib/vite.config')(context);
    await vite.build(config);
    await vvee.server.lib.end(context);
  }
}