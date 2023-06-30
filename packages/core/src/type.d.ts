// 上下文
interface Context {
  config: Config,
  _frame: Frame,
  _app: App,
}

// 配置
interface Config {
  appPath: string,
  routes?: Array<Route>,
  layouts?: Object<string, any>,
}

// 框架
interface Frame {
  config: Partial<Config>,
}

// 应用
interface App {
  config: Partial<Config>,
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