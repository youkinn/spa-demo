// 类定义
function EventEmitter() {
    this.eventMap = {};
}

EventEmitter.prototype = {
    // 为指定事件添加一个监听器到监听器数组的尾部。
    addListener: function (eventName, listener) {
        if (!this.eventMap[eventName]) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(listener);
        return this;
    },

    // 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
    on: function (eventName, listener) {
        return this.addListener(eventName, listener);
    },

    // 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
    once(eventName, listener) {
        return this.on(eventName, function () {
            this.off(eventName, listener);
            listener.call(this, ...Array.prototype.slice.call(arguments));
        });
    },

    // 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称。
    removeListener: function (eventName, listener) {
        if (!this.eventMap[eventName]) {
            return this;
        }
        if (listener) {
            const index = this.eventMap[eventName].indexOf(listener);
            this.eventMap[eventName].splice(index, 1);
        }
        return this;
    },

    // 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。[event]
    removeAllListeners(eventName) {
        if (eventName) {
            this.eventMap[eventName] = [];
            return this;
        }
        for (p in this.eventMap) {
            if (this.eventMap.hasOwnProperty(p)) {
                this.eventMap[p] = [];
            }
        }
        return this;
    },

    off: function (eventName, listener) {
        return this.off(eventName, listener);
    },

    // 返回指定事件的监听器数组。
    listeners: function (eventName) {
        return this.eventMap[eventName] ? this.eventMap[eventName] : [];
    },

    // 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。
    emit: function (eventName) {
        const params = arguments;
        this.eventMap[eventName].forEach((listener) => {
            if (typeof listener === 'function') {
                listener.apply(this, Array.prototype.slice.call(params, 1));
            }
        });
        return this;
    }
};

module.exports = EventEmitter;