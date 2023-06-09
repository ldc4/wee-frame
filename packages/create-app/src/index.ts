import path from 'path';
import { writeFile, cp } from 'node:fs/promises';
import spawn from 'cross-spawn';


// 运行
const run = async () => {
  // 将app目录拷贝至当前执行目录
  const appPath = process.cwd();
  const scriptPath = path.resolve(__dirname);
  await cp(path.resolve(scriptPath, '..', 'app'), path.resolve(appPath), { recursive: true });

  // 修改package.json文件中的版本信息
  const appPackagePath = path.resolve(appPath, 'package.json');
  const appPackageJson = require(appPackagePath);
  appPackageJson.dependencies['@vvee/cli'] = 'latest';
  await writeFile(appPackagePath, `${JSON.stringify(appPackageJson, null, 2)}\n`);

  console.log('生成模版完成...');

  // 执行npm install命令
  await spawn.sync('npm', ['install'], { stdio: 'inherit' });

  console.log('依赖包安装完成...');
};

export {
  run,
};
