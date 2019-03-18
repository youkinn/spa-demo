import { Dep } from "./dep";

export class Observer {
  constructor(value) {
    this.walk(value);
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      if (typeof key === "object") {
        this.walk(obj[key]);
      }
      defineReactive(obj, key, obj[key]);
    });
  }
}

export function observe(value) {
  if (!value || typeof value !== "object") {
    return;
  }
  return new Observer(value);
}

const defineReactive = (obj, key, value) => {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.addDepend();
      }
      return value;
    },
    set(newVal) {
      if (newVal === value) {
        return;
      }
      value = newVal;
      observe(newVal);
      dep.notify(newVal);
    }
  });
};
