import { pushTarget, popTarget } from "./dep";
import { parsePath } from "../util/index";

let uid = 0;

export class Watcher {
  constructor(vm, expOrFn, cb) {
    this.id = uid++;
    this.vm = vm;
    this.cb = cb;
    this.exp = expOrFn;
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }
    this.value = this.get();
  }
  get() {
    pushTarget(this);
    let vm = this.vm;
    let value;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {}
    popTarget();
    return value;
  }
  addDep(dep) {
    dep.addSub(this);
  }
  update() {
    debugger;
    let vm = this.vm;
    let value;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {}
    this.cb.call(vm, value, this.value);
  }
}
