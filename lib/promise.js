const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

let fulfilledCallbacks = [];
let rejectedCallbacks = [];
class P {
  constructor(fn = () => { }) {
    debugger
    if (!_.isFunction(fn)) {
      throw new TypeError("fn 必须是一个函数");
    }
    this.status = PENDING;
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(value = "") {
    this.status = FULFILLED;
    this.value = value;
    setTimeout(function () {
      fulfilledCallbacks.forEach(function (callback) {
        callback(value);
      });
    }, 0);
  }
  reject(value = "") {
    this.status = REJECTED;
    this.value = value;
    setTimeout(function () {
      rejectedCallbacks.forEach(function (callback) {
        callback(value);
      });
    }, 0);
  }
  then(onFulfilled, onRejected) {
    const status = this.status;
    const value = this.value;
    return new P(function (resolve, reject) {
      let result;
      switch (status) {
        case PENDING:
          if (_.isFunction(onFulfilled)) {
            fulfilledCallbacks.push(onFulfilled);
          }
          if (_.isFunction(onRejected)) {
            rejectedCallbacks.push(onRejected);
          }
          break;
        case FULFILLED:
          result = onFulfilled(value);
          resolve(result);
          break;
        case REJECTED:
          result = onRejected(value);
          reject(result);
          break;
        default:
      }
    });
  }
}

module.exports = P;
