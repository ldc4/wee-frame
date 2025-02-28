import path from 'path';
import * as generate from '../generate';
import _ from 'lodash';

// 获取初始化上下文
const getAppContext = (): AppContext => {
  return {
    config: {
      appPath: process.cwd(),
      runtimePath: '.wee',
      configPath: '.weerc.ts',
    },
  };
};

// 加载应用配置
const loadAppConfig = (config: Config): Partial<AppConfig> => {
  const { appPath, configPath } = config;
  try {
    require('ts-node/register');
    const userConfig = require(path.join(appPath, configPath)).default;
    return _.pick<AppConfig>(userConfig, [
      'layouts',
      'routes',
    ]);
  } catch (e) {
    console.warn('没有配置文件.weerc.ts，采用默认配置');
  }
  return {};
};

// 解析配置
const parseConfig = (defaultConfig: Config, appConfig: Partial<AppConfig>): Config => {
  return {
    ...defaultConfig,
    ...appConfig,
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
const init = async (): Promise<AppContext> => {
  const appContext = getAppContext();
  const appConfig = await loadAppConfig(appContext.config);
  appContext.config = parseConfig(appContext.config, appConfig);
  await initAppProject(appContext);
  return appContext;
};

export {
  init,
};
