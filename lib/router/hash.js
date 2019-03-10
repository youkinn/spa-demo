import { History } from "./base";

export class HashHistory extends History {
    constructor(route, base, routes) {
        super(route, base, routes);
    }
    setupListeners() {

        // url监听
        if (('onhashchange' in window)
            && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
            window.addEventListener('hashchange', () => {
                // 需要考虑匹配到多条路由的情况
                const matched = this.routes.filter((route) => {
                    return route.regexp.test(location.hash.slice(1));
                });
                if (matched.length > 0) {
                    this.current = matched[0];
                    this.emit(`route:${matched[0].name}`);
                }
            })
        }
    }
    push(location) {

    }
    replace(location) {

    }
    go(n) {
        window.history.go(n)
    }
    back() {
        this.go(-1);
    }
    forward() {
        this.go(1);
    }
};