import pathToRegexp from 'path-to-regexp';
import EventEmitter from "../eventEmitter";

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
    static install(YUI) {
        if (this.installed) return;
        this.installed = true;
        const that = this;
        /**
         * $router用于页面跳转
         * $route用于访问当前路由
         * 这里访问不到实例，暂时先返回空对象 待修改。
         */
        Object.defineProperty(YUI.prototype, '$router', {
            get() { return {}; }
        })
        Object.defineProperty(YUI.prototype, '$route', {
            get() { return {}; }
        })
    };
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
                        this.current = matched[0];
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

if (window.YUI) {
    YUI.use(Router);
}

export default Router;
