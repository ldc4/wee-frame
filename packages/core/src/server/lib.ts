import path from 'path';
import * as generate from '../generate';
import _ from 'lodash';

// 获取初始化上下文
const getLibContext = (): LibContext => {
  return {
    config: {
      appPath: process.cwd(),
      runtimePath: '.wee',
      configPath: '.weerc.ts',
      entry: 'src',
      output: 'lib',
      name: 'index',
    },
  };
};


// 加载库配置
const loadLibConfig = async (config: Config): Promise<Partial<LibConfig>> => {
  const { appPath, configPath } = config;
  try {
    const module = await import(path.join(appPath, configPath));
    const userConfig = module.default || module;
    return _.pick<AppConfig>(userConfig, [
      'entry',
      'output',
      'name',
    ]);
  } catch (e) {
    console.warn('没有配置文件.weerc.ts，采用默认配置');
  }
  return {};
};

// 解析配置
const parseConfig = (defaultConfig: Config, libConfig: Partial<LibConfig>): Config => {
  return {
    ...defaultConfig,
    ...libConfig,
  }
};

// 初始化
const initLibProject = async (context: Context) => {
  // 生成临时文件夹.wee
  await generate.genWeeDir(context);
  // 处理TSConfig配置
  await generate.genTsConfig(context);
};

// 收尾
const endLibProject = async (context: Context) => {
  await generate.genPackageJsonConfig(context);
}

const init = async (): Promise<LibContext> => {
  const libContext = getLibContext();
  const libConfig = await loadLibConfig(libContext.config);
  libContext.config = parseConfig(libContext.config, libConfig);
  await initLibProject(libContext);
  return libContext;
}

const end = async (context: LibContext): Promise<void> => {
  await endLibProject(context);
}

export {
  init,
  end
};
