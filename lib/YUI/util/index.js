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

export function parseText(str) {
  let reg = /\{\{(.+?)\}\}/ig;
  let matchs = str.match(reg), match, tokens = [], index, lastIndex = 0;

  while (match = reg.exec(str)) {
    index = match.index
    if (index > lastIndex) {
      tokens.push({
        value: str.slice(lastIndex, index)
      })
    }
    tokens.push({
      value: match[1],
      html: match[0],
      tag: true
    })
    lastIndex = index + match[0].length
  }

  return tokens;
}

// 是否指令
export function isDirective (attrName) {
  return /^v-[\w]([\w\d_]*)$/.test(attrName);
};

// 事件注册
export function addEvent (element, type, handle) {
  element.addEventListener(type, handle);
}