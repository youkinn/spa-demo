import Router from "../lib/router";
import _ from "lodash";

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

var router = new Router({
  routes: [
    {
      name: 'home',
      path: '/home',
      callback: function () {
        require.ensure([], () => {
          const render = _.template(require('./pages/page1.html'));
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
          const render = _.template(require('./pages/page2.html'));
          const data = require('./js/page2.js');
          const html = render(data);
          document.getElementById('app').innerHTML = html;
        });
      }
    }
  ]
});
