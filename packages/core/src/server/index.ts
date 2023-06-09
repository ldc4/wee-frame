import path from 'path';
import * as generate from '../generate';
import _ from 'lodash';

// 获取初始化上下文
const getInitContext = (): Context => {
  return {
    config: {
      appPath: process.cwd(),
      framePath: path.resolve(__dirname, '..'),
    },
    _frame: {
      config: {},
    },
    _app: {
      config: {},
    },
  };
};

// 加载应用配置
const loadAppConfig = (configFileName: string): Config => {
  let config;
  try {
    require('ts-node/register');
    config = require(path.join(process.cwd(), configFileName)).default;
    return config;
  } catch (e) {
    console.warn('没有配置文件app.json，采用默认配置');
  }
  return config;
};

// 解析配置
const parseConfig = (context: Context): Config => {
  return {
    ...context.config,
    ...context._frame.config,
    ...context._app.config
  }
};

// 初始化应用项目
const initAppProject = async (context: Context) => {
  // 生成临时文件夹.wee
  await generate.genWeeDir(context);
  // 处理TSConfig配置
  await generate.genTsConfig(context);
  // 处理路由配置
  await generate.genRouteConfig(context);
};

// 初始化，构造上下文
const init = async (): Promise<Context> => {

  console.log('初始化上下文...');

  const context = getInitContext();

  console.log('加载应用配置...');
  
  const configFileName = '.weerc.ts';
  context._app.config = loadAppConfig(configFileName);

  console.log('解析配置中...');

  context.config = parseConfig(context);

  console.log('初始化应用项目...');

  await initAppProject(context);

  return context;
};

export {
  init,
};
