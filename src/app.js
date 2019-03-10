import YUI from "../lib/yui";
import Router from "../lib/router/index";

YUI.use(Router);

/**
 * 待处理事项
 * 1.callback里边的东西都是重复的，考虑提出一起处理 ok
 * 2.渲染函数已经有了，接着只要监视下data对象应该就可以实现数据绑定
 * 3.每个页面类似于一个组件，有自己的data对象
 */
let router = new Router({
  routes: [
    {
      name: 'home',
      path: '/home',
      template: () => require.ensure([], () => require('./pages/page1.html'), 'home.tpl'),
      controller: () => require.ensure([], () => require('./js/page1.js'), 'home.js')
    },
    {
      name: 'about',
      path: '/about',
      template: () => require.ensure([], () => require('./pages/page2.html'), 'about.tpl'),
      controller: () => require.ensure([], () => require('./js/page2.js'), 'about.js')
    }
  ]
});


// 还只是个摆设，接下来考虑如果实现数据绑定
export default new YUI({
  el: "#app",
  router: router
});