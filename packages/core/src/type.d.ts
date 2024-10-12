// 上下文
interface Context {
  config: Config,
}

// 配置
interface Config {
  appPath: string,      // 当前应用路径
  configPath: string,   // 配置文件路径
  runtimePath: string,  // 运行时文件夹路径
}

// 应用配置
interface AppConfig extends Config {
  routes?: Array<Route>,
  layouts?: Object<string, any>,
}

// 库配置
interface LibConfig extends Config {
  entry?: string,
  output?: string,
  name?: string,
}

// 应用上下文
interface AppContext extends Context {
  config: AppConfig,
}

// 库上下文
interface LibContext extends Context {
  config: LibConfig,
}

// 路由
interface Route {
  path: string,
  component: string,
  children?: Array<Route>,
}

// 文件
interface File {
  name: string,
  basename: string,
  extname: string,
}

// 目录
interface Diretory {
  name: string,
  children: Array<File | Diretory>
}

// 路径
interface Path {
  name: string,
  type: 'file' | 'dir',
  basename?: string, // type为file才有
  extname?: string,  // type为file才有
  children?: Array<Path>,
}