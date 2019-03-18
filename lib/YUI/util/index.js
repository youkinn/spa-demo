export * from "./enum";

/**
 * 
 * @param {string} path a.b.c
 */
export function parsePath(path) {
  const segments = path.split(".");
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}

// 是否指令
export function isDirective (attrName) {
  return /^v-[\w]([\w\d_]*)$/.test(attrName);
};

// 事件注册
export function addEvent (element, type, handle) {
  element.addEventListener(type, handle);
}