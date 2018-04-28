(function () {
    // promise的是三个状态
    const PENDING = 'pending';
    const FULFILLEN = 'fulfillen';
    const REJECTED = 'rejected';

    //promise 构造函数
    function MyPromise(excutor) {

    }

    MyPromise.prototype.then = function (onFulfilled, onRejected) {

    }

    Mypromise.prototype.catch = function (onRejected) {

    }

    Mypromise.race = function(promises) {

    }

    MyPromise.all = function (promises) {

    }

    window.MyPromise = MyPromise;
})()