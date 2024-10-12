import { writeFile, readFile } from 'node:fs/promises';
import { mkdir, rm, cp } from 'node:fs/promises';
import path from 'path';

import * as ast from '../utils/ast';
import * as utils from '../utils';
import * as config from '../config';

const { parse, traverse, generate, t } = ast;

// 生成临时文件夹.wee
const genWeeDir = async (context: Context) => {
  try {
    const { appPath, runtimePath } = context.config;
    await rm(path.resolve(appPath, runtimePath), { recursive: true, force: true });
    await mkdir(path.resolve(appPath, runtimePath));
    // 将模版拷入.wee目录下
    await cp(path.resolve(__dirname, '..', '..', 'template'), path.resolve(appPath, runtimePath), { recursive: true });
  } catch (e: any) {
    console.error(e);
  }
}

// 遍历路由信息，生成ast对象
const traverseRouteInfo2Ast = (routeInfo: Route[]): ast.t.ObjectExpression[] => {
  const arr: ast.t.ObjectExpression[] = [];
  routeInfo.forEach((item) => {
    const jsx = parse(`const jsx = <LazyImportComponent lazyChildren={React.lazy(() => (import('${item.component}')))} />`)
    traverse(jsx, {
      JSXElement(path) {
        const astObjExpArr = [
          t.objectProperty(t.identifier('path'), t.stringLiteral(item.path)),
          t.objectProperty(t.identifier('element'), path.node),
        ]
        let children: ast.t.ObjectExpression[] = [];
        if (item.children) {
          children = traverseRouteInfo2Ast(item.children);
          astObjExpArr.push(t.objectProperty(t.identifier('children'), t.arrayExpression(children)));
        }
        const astObj = t.objectExpression(astObjExpArr);
        arr.push(astObj);
      }
    });
  });
  return arr;
}

// 将路由信息通过ast写进route.tsx文件
const writeRouteInfo2File = async (routeInfo: Route[], routePath: string) => {
  const routeCode = await readFile(routePath, 'utf8'); 
  const astTree = parse(routeCode);
  traverse(astTree, {
    VariableDeclarator(path) {
      if ((path.node.id as ast.t.Identifier).name === 'appRouter') {
        path.traverse({
          ArrayExpression(subPath) {
            const arr: ast.t.ObjectExpression[] = traverseRouteInfo2Ast(routeInfo);
            const astArr = t.arrayExpression(arr);
            subPath.replaceWith(astArr);
            subPath.skip();
          }
        });
      }
    }
  });
  const newCode = generate(astTree);
  await writeFile(routePath, newCode, 'utf-8');
};

// 生成TSConfig配置
const genTsConfig = async (context: Context) => {
  const { appPath } = context.config;
  const tsConfig = {
    compilerOptions: {
      declaration: true,
      target: 'esnext',
      module: 'esnext',
      moduleResolution: 'node',
      importHelpers: true,
      jsx: 'react-jsx',
      esModuleInterop: true,
      sourceMap: true,
      strict: true,
      resolveJsonModule: true,
      allowSyntheticDefaultImports: true,
      noImplicitAny: false,
      paths: {
        "@app/*": [path.resolve(appPath, '*')],
        "@pages/*": [path.resolve(appPath, 'src', 'pages', '*')],
        "@layouts/*": [path.resolve(appPath, 'src', 'layouts', '*')],
      }
    },
    include: [
      appPath,
    ],
  };
  const fileName = path.resolve(appPath, '.wee', 'tsconfig.json');
  await writeFile(fileName, `${JSON.stringify(tsConfig, null, 2)}\n`);
  return tsConfig;
};

// 生成路由配置
const genRouteConfig = async (context: AppContext) => {
  const {
    appPath,
    layouts: layoutsConfigData,
    routes: routesConfigData,
  } = context.config;

  // 1. 解析用户路由配置
  let appPageRouteInfo: Route[] = [];
  if (routesConfigData && routesConfigData.length > 0) {
    appPageRouteInfo = config.routes.parseRoutesConfig(routesConfigData);
  }

  // 2. 解析应用目录，生成页面路由
  const pageDirInfo = await utils.file.getDirInfo(path.resolve(appPath, 'src', 'pages'));
  const autoPageRouteInfo = config.routes.dirInfo2routeInfo(pageDirInfo, '@pages');
  const totalPageRouteInfo = config.routes.mergeRouteInfo(autoPageRouteInfo, appPageRouteInfo);

  // 3. 解析应用目录，生成布局路由
  const layoutDirInfo = await utils.file.getDirInfo(path.resolve(appPath, 'src', 'layouts'));
  const autoLayoutRouteInfo = config.routes.dirInfo2routeInfo(layoutDirInfo, '@layouts');
  const totalRouteInfo = config.layouts.parseLayoutsConfig(autoLayoutRouteInfo, totalPageRouteInfo, layoutsConfigData);
  
  const routePath = path.resolve(appPath, '.wee', 'router.tsx');
  await writeRouteInfo2File(totalRouteInfo, routePath);
};

// 生成Package.json配置项
const genPackageJsonConfig = async (context: LibContext) => {
  const { output, name, appPath } = context.config;
  const packageJson = require(path.resolve(appPath, 'package.json'));
  packageJson.main = `./${output}/${name}.umd.js`;
  packageJson.module = `./${output}/${name}.mjs`;
  packageJson.types = `./${output}/types/${name}.d.ts`;
  await writeFile('./package.json', `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
};

export {
  genWeeDir,
  genTsConfig,
  genRouteConfig,
  genPackageJsonConfig,
};
