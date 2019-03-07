var _ = require('underscore');

function Route(config) {
    this.name = config.name;
    this.path = config.path || '';
    this.params = config.params || {};
    this.query = config.query || {};
}

function Router() { }
Router.prototype = {
    routeMap: {},
    when: function (path, options) {
        this.routeMap[options.name] = new Route(_.extend({ path: path }, options));
        return this;
    },
    others: function (options) {
        this.routeMap['others'] = new Route(options);
        return this;
    }
};

module.exports = Router;


var router = new Router();
router.when('/showList', {
    name: 'showList',
    template: '',
    callback: function () { }
}).when('/show/:id', {
    name: 'show-id'
}).when('/seek', {
    name: 'seek',
    query: { type: 1 }
}).when('/', {
    name: 'home'
}).others({
    name: 'err404'
});

console.log(router.routeMap);

debugger