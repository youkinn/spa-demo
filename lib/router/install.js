export let _YUI;

export function install(YUI) {
    if (this.installed) return;
    this.installed = true;

    _YUI = YUI;
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
