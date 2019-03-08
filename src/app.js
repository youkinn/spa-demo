import Router from "../lib/router";
import _ from "lodash";

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

var router = new Router({
  routes: [
    {
      name: 'home',
      path: '/home',
      template: './pages/page1.html',
      callback: function () {
        require.ensure([], function (a, b, c) {
          var compiled = _.template(require('./pages/page1.html'));
          var html = compiled({ 'title': '成功啦' });
          document.getElementById('app').innerHTML = html;
        })
      }
    },
    {
      name: 'about',
      path: '/about',
      callback: function () {
        require.ensure([], function (a, b, c) {
          var compiled = _.template(require('./pages/page1.html'));
          var html = compiled({ 'title': '成功啦2' });
          document.getElementById('app').innerHTML = html;
        })
      }
    }
  ]
});

router.emit('route:home');
setTimeout(() => {
  router.emit('route:about');
}, 2000);

