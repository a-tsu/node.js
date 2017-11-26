const func1 = (val) => {
    return new Promise((resolve, reject) => {
        const timerID = setInterval(() => {
            clearInterval(timerID);
            console.log(`${val} res`);
            return resolve(`${val} return`);
            }, 1000);
    });
}

// promise
const promise1 = () => {
    func1('promise').then((res) => {
        console.log(res);
    });
};


// async/await
const async1 = async () => {
    console.log(await func1('async/await'));
};

promise1();
async1();
