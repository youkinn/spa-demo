import { addEvent } from "../util/index";

class Directive {
    constructor(vm, expression, value, el) {
        this.vm = vm;
        this.el = el;
        this.value = value;
        this.expression = expression;
        this._init();
    }

    _init() {
        var that = this;
        this.vm.$watch(this.expression, function () {
            that.update.call(that, ...arguments);
        });
        this.bind();
        this.update(this.value);
    }

    bind() { }
    inserted() { }
    update() { }
    unbind() { }
}

export class Text extends Directive {
    constructor(vm, expression, value, el) {
        super(vm, expression, value, el);
    }
    bind() {
        this.attr = this.el.nodeType === 3
            ? 'data'
            : 'textContent';
    }

    update(value) {
        this.el[this.attr] = value;
    }
}

export class Model extends Directive {
    constructor(vm, name, expression, el) {
        super(vm, name, expression, el);
    }
    bind() {
        addEvent(this.el, "input", (e) => {
            this.vm[this.expression] = e.target.value;
        });
    }

    update(value) {
        this.el.value = value;
    }
}

