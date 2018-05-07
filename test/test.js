
new MyPromise((resolve, reject) => {setTimeout(() => resolve(5), 2000)})
    .then(data => {
        alert(data);
        return 7;
    })
    .then(data => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                alert(data);
                resolve(2);
            }, 1000);
        });
    });