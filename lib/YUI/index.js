import { observe, Observer } from "./observer/index";
import { Compiler } from "./compile/index";
import {Watcher } from "./observer/watcher";

class YUI {
  constructor(options = { data: {}, el: "" }) {
    var vm = this;
    vm.$el = options.el;
    vm.$options = options;
    vm._data = vm.$options.data || {};

    this._init();
    return vm;
  }
  _init () {
    let vm = this;
    observe(vm._data);
    for (let key in vm._data) {
      proxy(vm, "_data", key);
    }
    debugger;
    vm.$watch(function () {
      new Compiler(vm.$el, vm);
    }, function () {});
  }
  $watch (expOrFn, fn, ) {
    const vm = this;
    const watcher = new Watcher(vm, expOrFn, fn);
  }
  static use(plugin) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    const args = Array.prototype.slice.call(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === "function") {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  }
}

const proxy = (target, sourceKey, key) => {
  Object.defineProperty(target, key, {
    get() {
      return target[sourceKey][key];
    },
    set(newVal) {
      target[sourceKey][key] = newVal;
    }
  });
};

// 挂载工具函数
YUI.util = window._;
YUI.util.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
window._ = undefined;

export default YUI;
