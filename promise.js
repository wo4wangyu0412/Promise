(function () {
    // promise的是三个状态
    const PENDING = 'pending';
    const FULFILLEN = 'fulfillen';
    const REJECTED = 'rejected';

    const statusProvider = (promise, status) => data => {
        if (promise.status !== PENDING) return false;

        promise.status = status; // 
        promise.retult = data;

        switch (promise.status) {
            case FULFILLEN: {
                promise.successListener.forEach((fn) => {
                    promise.retult = fn(promise.retult);
                });
                break;
            }
            case REJECTED: {
                promise.falseListener.forEach((fn) => {
                    promise.retult = fn(promise.retult)
                });
                break;
            }
        }
    }

    //promise 构造函数
    class MyPromise {
        constructor(executor) {
            this.status = PENDING; // 刚初始化的状态总为PENDING
            this.result; // 预先定义下一个状态
            this.successListener = [];
            this.falseListener = [];

            executor(statusProvider(this, FULFILLEN), statusProvider(this, REJECTED));
        }

        then(...args) {
            const child = new this.constructor(noop);

            const handler = fn => data => {
                if (typeof fn === 'function') {
                    const result = fn(data)
                    if (isPromise(result)) {
                        Object.assign(child, result)
                    } else {
                        statusProvider(child, FULFILLED)(result)
                    }
                } else if (!fn) {
                    statusProvider(child, this.status)(data)
                }
            };

            switch (this.status) {
                case PENDING: {
                    this.successListener.push(args[0]);
                    this.falseListener.push(args[1]);
                    break;
                }
                case FULFILLEN: {
                    args[0](this.result);
                    break;
                }
                case REJECTED: {
                    args[1](this.result);
                    break;
                }
            }

            return child;
        }

        catch(arg) {
            return this.then(undefined, arg);
        }
    }

    MyPromise.race = function (promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach((promise, index) => {
                promise.then(resolve, reject);
            });
        });
    }

    MyPromise.all = function (promises) {
        return new MyPromise((resolve, reject) => {
            let done = gen(promises.length, resolve);

            promises.forEach((promise, index) => {
                promise.then((value) => {
                    done(index, value)
                }, reject)
            });
        });
    }

    window.MyPromise = MyPromise;
})()