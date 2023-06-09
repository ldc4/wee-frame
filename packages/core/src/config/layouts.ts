import { formatListToMap } from '../utils/base';
import { minimatch } from 'minimatch';
import _ from 'lodash';

// 遍历布局配置，结合已有路由信息，生成新的路由信息
const parseLayoutsConfig = (
  layoutRouteInfo: Route[],
  pageRouteInfo: Route[],
  layoutsConfigData: Record<string, any>,
): Route[] => {
  // 转换为map，便于获取数据
  const layoutRouteMap = formatListToMap(layoutRouteInfo, 'component', undefined, true);

  // 用“>”表示嵌套关系
  let totalRouteInfo: Route[] = [];
  Object.keys(layoutsConfigData).forEach((key) => {
    const layouts = key.split('>');
    const pathGlobArr = layoutsConfigData[key];

    // 先组装嵌套布局
    const routeInfo: Route[] = [];
    let latestRouteInfo: Route = { path: '', component: '' };
    layouts.forEach((layout) => {
      const layoutRoute = layoutRouteMap[`@layouts/${layout}`];
      const copyLayoutRoute = _.cloneDeep(layoutRoute);
      if (copyLayoutRoute) {
        if (routeInfo.length === 0) {
          routeInfo.push(copyLayoutRoute);
        } else {
          if (!routeInfo[0].children) {
            routeInfo[0].children = [];
          }
          copyLayoutRoute.path = copyLayoutRoute.path.substring(1);
          routeInfo[0].children.push(copyLayoutRoute);
        }
        latestRouteInfo = copyLayoutRoute;
      }
    });

    // 再组装页面路由
    const filterPageRouteInfo: Route[] = [];
    pageRouteInfo.forEach((item) => {
      const copyItem = _.cloneDeep(item);
      const { component } = copyItem;
      _.forEach(pathGlobArr, (pathGlob) => {
        if (minimatch(component.replace('@pages/', ''), pathGlob)) {
          // 处理Path为相对路径
          copyItem.path = copyItem.path.substring(1);
          filterPageRouteInfo.push(copyItem);
          return false;
        }
      });
    });
    latestRouteInfo.children = filterPageRouteInfo;

    totalRouteInfo.push(...routeInfo);
  });

  return totalRouteInfo.concat(pageRouteInfo);
};

export {
  parseLayoutsConfig,
}
