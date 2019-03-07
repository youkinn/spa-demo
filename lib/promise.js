var Promise = (function () {
    var PENDING = 'PENDING';
    var FULFILLED = 'FULFILLED';
    var REJECTED = 'REJECTED';

    var fulfilledCallbacks = [];
    var rejectedCallbacks = [];

    var P = function (fn) {
        if (!isFunction(fn)) {
            throw new TypeError('fn 必须是一个函数');
        }
        this.status = PENDING;
        fn(this.resolve.bind(this), this.reject.bind(this));
    }
    P.prototype = {
        resolve: function (value) {
            this.status = FULFILLED;
            this.value = value;
            setTimeout(function () {
                fulfilledCallbacks.forEach(function (callback) {
                    callback(value);
                });
            }, 0);
        },
        reject: function (value) {
            this.status = REJECTED;
            this.value = value;
            setTimeout(function () {
                rejectedCallbacks.forEach(function (callback) {
                    callback(value);
                });
            }, 0);
        },
        then: function (onFulfilled, onRejected) {
            var status = this.status;
            var value = this.value;
            return new P(function (resolve, reject) {
                switch (status) {
                    case PENDING:
                        if (isFunction(onFulfilled)) {
                            fulfilledCallbacks.push(onFulfilled);
                        }
                        if (isFunction(onRejected)) {
                            rejectedCallbacks.push(onRejected);
                        }
                        break;
                    case FULFILLED:
                        var result = onFulfilled(value);
                        resolve(result);
                        break;
                    case REJECTED:
                        var result = onRejected(value);
                        reject(result);
                        break;
                    default: ;
                }
            });
        }
    }
    function isFunction(fn) {
        return typeof fn === 'function';
    }
    return P;
})();
