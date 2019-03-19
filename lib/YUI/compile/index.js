import { Text, Model } from '../directives/index';
import { DIRECTIVE_TYPES, NODE_TYPES, isDirective, parseText } from "../util/index";

export class Compiler {
  constructor(el, vm) {
    this.vm = vm;
    this.$el = vm.$el = document.querySelector(el);
    if (!vm.$el) {
      console.log("el 不存在");
      return;
    }
    this.$fragment = this.transfrom(this.$el); // app的一份copy，减少dom操作
    this.init(); // 这里会进行命令的解析以及替换，全部完成后反应到页面
    this.$el.appendChild(this.$fragment);
  }

  // 返回app的copy
  transfrom(app) {
    var fragment = document.createDocumentFragment();
    var childNodes = app.childNodes;
    while (childNodes.length) {
      fragment.appendChild(childNodes[0]);
    }
    return fragment;
  }

  init() {
    this.compileElement(this.$fragment);
  }

  // 遍历元素节点
  compileElement(root) {
    var type = 0;
    var el = {};
    for (var i = 0, j = root.childNodes.length; i < j; i++) {
      el = root.childNodes[i];
      type = el.nodeType;
      switch (type) {
        case NODE_TYPES.ELEMENT:
          // 递归遍历子节点
          if (el.childNodes.length) {
            this.compileElement(el);
          }
          // 遍历属性节点
          if (el.attributes.length) {
            this.compileAttr(el);
          }
          break;
        case NODE_TYPES.TEXT:
          this.complieTemplate(el);
          break;
        default:
          break;
      }
    }
  }

  // 遍历属性节点
  compileAttr(element) {
    var attr = "";
    for (var i = 0, j = element.attributes.length; i < j; i++) {
      attr = element.attributes[i];
      if (!isDirective(attr.name)) {
        continue;
      }
      var that = this;
      switch (attr.name) {
        case DIRECTIVE_TYPES.MODEL:
          new Model(this.vm, attr.value, that.vm[attr.value], element);
          break;
        default: ;
      }
    }
  }

  // 编译模板里边的{{}}
  complieTemplate(el) {
    var tokens = parseText(el.wholeText)
    if (!tokens) {
      return null
    }
    var item = null;

    for (var i = 0, j = tokens.length; i < j; i++) {
      item = tokens[i];
      if (item.tag) {
        new Text(this.vm, item.value, this.vm[item.value], el);
      }
    }
  }
}
