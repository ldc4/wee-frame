// 遍历dir信息，生成拍平的路由
const traverseDirInfo = (
  dirInfo: Record<string, any>[],
  prefix = '',
  parentPath = '',
  level = 0,
): Route[] => {
  const flatResult: Route[] = [];
  const allowExt = ['.tsx', '.jsx', '.md'];
  dirInfo.forEach((item) => {
    if (item.type !== 'dir' && allowExt.indexOf(item.extname) !== -1) {
      const isIndex = item.basename === 'index';
      const newItem = {
        path: `${parentPath}${!isIndex || !parentPath ? '/' : ''}${!isIndex ? item.basename : ''}`,
        component: `${prefix}${parentPath}/${item.basename}`
      }
      flatResult.push(newItem);
    }
    if (item.children) {
      const childFlatResult = traverseDirInfo(item.children, prefix, parentPath + `/${item.basename}`, level++,);
      flatResult.push(...childFlatResult);
    }
  });
  return flatResult;
};

// 目录信息映射为路由信息
const dirInfo2routeInfo = (dirInfo: Record<string, any>[], prefix: string): Route[] => {
  return traverseDirInfo(dirInfo, prefix);
};

// 拍平路由信息
const flatRouteInfo = (routeInfo: Route[], parentPath = ''): Route[] => {
  const flatResult: Route[] = [];
  routeInfo.forEach((item) => {
    const newItem = {
      path: `${parentPath}${parentPath ? '/' : ''}${item.path}`,
      component: item.component,
    };
    flatResult.push(newItem);
    if (item.children) {
      const childFlatResult = flatRouteInfo(item.children, newItem.path);
      flatResult.push(...childFlatResult);
    }
  });
  return flatResult;
};

// 合并路由信息
const mergeRouteInfo = (autoRouteInfo: Route[], appRouteInfo: Route[]): Route[] => {
  const appFlatRouteInfo = flatRouteInfo(appRouteInfo);
  const appRouteMap: Record<string, boolean> = {};
  appFlatRouteInfo.forEach((item) => {
    appRouteMap[item.path] = true;
  });
  const filterAutoRouteInfo = autoRouteInfo.filter((item) => {
    return !appRouteMap[item.path];
  });
  return appRouteInfo.concat(filterAutoRouteInfo);
};

// 遍历路由配置，生成路由信息
const traverseRoutesConfig = (routes: Record<string, any>[]): Route[] => {
  const result: Route[] = [];
  routes.forEach((item) => {
    const routeItem: Route = {
      path: item.path,
      component: item.component.indexOf('@pages') !== -1 ? item.component : `@pages/${item.component}`,
    }
    if (item.children) {
      routeItem.children = traverseRoutesConfig(item.children);
    }
    result.push(routeItem);
  });
  return result;
};

// 将配置解析为路由信息
const parseRoutesConfig = (routes: Record<string, any>[]): Route[] => {
  return traverseRoutesConfig(routes);
}

export {
  dirInfo2routeInfo,
  mergeRouteInfo,
  parseRoutesConfig,
};
