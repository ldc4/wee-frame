# wee-frame（完善中）

做一个WEB框架(例如：React)的上层封装，统一开发体验，降低开发门槛，提升研发效率。

意义在于，在一个生态圈里面统一了开发框架后，可以方便做更定制化的周边（包括但不限于：UI组件、脚手架市场、IDE等）来降低开发门槛。

适用范围还是更偏向于研发效率工具类网站（比如：XX云，运营系统），毕竟统一标准肯定要牺牲一部分灵活性。

## 思路

封装webpack，对应用开发者屏蔽掉工程化

封装应用页面入口，路由，提供配置项，便于平台统一管理页面

提供内置UI组件，公共能力（鉴权，导航，应用加载）

封装UI布局，数据流向，提供语法和约定，分离业务逻辑

提供插件，中间件的能力

## 内部细节

1. 上下文结构  
  todo
2. 应用开发模式  
  todo
3. 用户配置  
  todo

## 遇到的问题

1. wee start时loader在应用目录加载不到  
https://github.com/webpack/webpack/issues/1083  
https://webpack.js.org/configuration/resolve/#resolveloader  
```
resolveLoader: {
  modules: [
    'node_modules',
    path.resolve(__dirname, '..', 'node_modules') // 使用框架中的loader
  ]
},
```

2. vscode提示找不到xxx模块，是因为没有安装对应的@types/xxx

3. webpack-dev-middleware的问题：
   - 动态端口启动（错误监听，重试）  
   - 热模块加载（可以通过webpack-hot-middleware）  
