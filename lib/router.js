import pathToRegexp from 'path-to-regexp';
import EventEmitter from "./eventEmitter";

class Router extends EventEmitter {
    constructor({ routes = [], mode = "hash" }) {
        super();
        routes.forEach((route) => {
            route.regexp = pathToRegexp(route.path);
        });
        this.routes = routes;
        this.mode = mode;
        this.init();
    }
    init() {
        this.routes.forEach((route) => {
            const eventName = 'route:' + (route.name ? route.name : route.path);
            this.on(eventName, route.callback);
        });
        this.run();
    }
    run() {
        if (this.mode === 'hash') {
            // url变化监听器
            if (('onhashchange' in window)
                && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
                window.onhashchange = () => {
                    const matched = this.routes.filter((route) => {
                        return route.regexp.test(location.hash.slice(1));
                    });

                    // 需要考虑匹配到多条路由的情况
                    if (matched.length > 0) {
                        this.emit(`route:${matched[0].name}`);
                    }
                };
                return;
            }
        }
    }
    push() { }
    go() { }
}

// 给app起个名字，然后注入当前路由信息到原型，方便页面里边访问

export default Router;
