export class Dep {
  constructor() {
    this.subs = []; // 订阅者数组
  }
  addDepend() {
    Dep.target.addDep(this);
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    for (let sub of this.subs) {
      sub.update();
    }
  }
}

export const pushTarget = target => {
  if (target) {
    Dep.target = target;
  }
};

export const popTarget = () => {
  Dep.target = null;
};
