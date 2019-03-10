class YUI {
    constructor(options = { data: {}, el: "" }) {
        var vm = this;
        vm.$data = options.data;
        vm.$el = options.el;
        vm.$options = options;
        return vm;
    }
    static use(plugin) {
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        if (installedPlugins.indexOf(plugin) > -1) {
            return this;
        }
        const args = Array.prototype.slice.call(arguments, 1);
        args.unshift(this);
        if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args);
        } else if (typeof plugin === 'function') {
            plugin.apply(null, args);
        }
        installedPlugins.push(plugin);
        return this
    }
}

// 挂载工具函数
YUI.util = window._;
YUI.util.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
window._ = undefined;

export default YUI;
