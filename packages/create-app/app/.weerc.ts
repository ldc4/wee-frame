export default {
  layouts: {
    // 采用glob匹配路径
    'main-layout': ['demo/**'],
    'other/first-layout': ['demo/**'],
    'main-layout>other/first-layout': ['demo/**'],
    'main-layout>other/second-layout': ['demo/**'],
    'other/first-layout>main-layout': ['demo/**'],
    'other/second-layout>main-layout': ['demo/**'],
  },
  wrappers: {
    'auth-wrapper': ['demo'],
  },
  routes: [
    // 自动生成，也可以手动配置，覆盖自动生成的路由
    // component对应组件的路径，支持alias: @layouts,@pages
    {
      path: '/main-layout',
      component: 'demo/index',
      children: [
        {
          path: 'page1',
          component: 'demo/page3',
        },
      ]
    },
  ],
  plugins: [
    
  ],
};