import { install } from "./install";
import { HashHistory } from "./hash";

class Router {
    constructor({ routes = [], mode = "hash", base = "" }) {
        this.mode = mode;
        this.routes = routes;
        switch (mode) {
            case 'history':
                this.history = new HTML5History(this, base, routes)
                break;
            case 'hash':
                this.history = new HashHistory(this, base, routes)
                break;
            default: ;
        }
        this.init();
    }
    init() {
        this.routes.forEach((route) => {
            const eventName = 'route:' + (route.name ? route.name : route.path);
            this.history.on(eventName, route.callback);
        });
        this.history.setupListeners();
    }
    push(location) {
        this.history.push(location)
    }
    replace(location) {
        this.history.replace(location)
    }
    go(n) {
        this.history.go(n)
    }
    back() {
        this.go(-1)
    }
    forward() {
        this.go(1)
    }
}

Router.install = install;
const inBrowser = typeof window !== 'undefined';
if (inBrowser && window.YUI) {
    YUI.use(Router);
}

export default Router;
