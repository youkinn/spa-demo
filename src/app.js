import YUI from "../lib/yui";
import Router from "../lib/router/index";

/**
 * 待处理事项
 * 1.callback里边的东西都是重复的，考虑提出一起处理
 * 2.渲染函数已经有了，接着只要监视下data对象应该就可以实现数据绑定
 * 3.每个页面类似于一个组件，有自己的data对象
 */
let router = new Router({
  routes: [
    {
      name: 'home',
      path: '/home',
      callback: function () {
        require.ensure([], () => {
          const render = YUI.util.template(require('./pages/page1.html'));
          const data = require('./js/page1.js');
          const html = render(data);
          document.getElementById('app').innerHTML = html;
        });
      }
    },
    {
      name: 'about',
      path: '/about',
      callback: function () {
        require.ensure([], () => {
          const render = YUI.util.template(require('./pages/page2.html'));
          const data = require('./js/page2.js');
          const html = render(data);
          document.getElementById('app').innerHTML = html;
        });
      }
    }
  ]
});

export default new YUI({
  el: "#app",
  router: router
});