

console.log("Hii");


var a = 20;

function increment() {
    a++;
    console.log(a);

    let name = 'rishav';
    return function sayHi() {
        console.log(`Hi ${name}`);
    }
}

let hiFUn = increment();
hiFUn();

Array.prototype.calc = function (fn) {
    let newArr = [];

    let currArr = this;
    for(let i = 0; i <  currArr.length; i++) {
        newArr.push(fn(currArr[i]));
    }

    return newArr;
}

console.log([1, 2, 3, 4, 5].calc((x)=> x*2))

// implementing debouncing

const arr = ['Rohan', "sharma", 'ratan', 'puja', 'sohail'];

function searchFun (str) {
    return new Promise((resolve, reject)=> {
       setTimeout(()=>{
           let regexExp = new RegExp(str, 'i');
          resolve(arr.filter(a => a.match(regexExp)))
        }, 200)
    })
}

function debounce(fn) {
    let timerId;

    return function (args) {
        if (timerId) clearTimeout(timerId);

        timerId = setTimeout(async ()=>{
            let result = await fn.call(null, args);
            console.log("result is", result);
        }, 500)
    }
}

const debounceSearch = debounce(searchFun);
debounceSearch('r');
debounceSearch('i');
debounceSearch('s');
debounceSearch('k');
debounceSearch('l');
debounceSearch('so');



// implement throttle
function throttle(fn, duration) {
    let lastCall = 0;

    return function (...args) {
        let currentTime = Date.now();

        if (currentTime - lastCall >= duration) {
            fn.apply(null, args);
            lastCall = currentTime;
        }
    }
}

// 👉 Write a function retry(fn, retries, delay) such that:


function getUserData() {
    return new Promise((resolve, reject)=>{
       setTimeout(()=>{
          let randomNum = Math.floor(Math.random() * 10);

          if (randomNum < 5) {
            resolve({name: 'rishav', age: 24})
          } else {
             reject("Data not found");
          }
       }, 200)
    })
}

async function retry(fn, retries, delay) {
    let attempt = 0;

    let addDelay = (time) => new Promise((resolve)=> setTimeout(resolve, time));

    while (attempt < retries) {
        console.log("attempt", attempt);
        try {
            let result = await fn.call();

            if (result) {
                console.log("result", result);
                return result;
            }
        } catch (error) {
            if (attempt == retries) throw error;

            await addDelay(delay);
            attempt++;
        }
    }

    if (attempt >= retries) {
        throw new Error("result not found");
    }
}

 retry(getUserData, 5, 3000)
