// JavaScript Interview Practice – Closures, Promises, Event Loop


// Predict the output:
// Q 1
// function outer() {
//   let x = 10;
//   return function inner() {
//     console.log(x++);  // this is post increment, so it will first logs and then increment the value.
//   };
// }

// const fn = outer();
// fn();  // 10
// fn();  // 11

// // Q 2
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 0);  
// }
//   // 3 3 3

// for(var i = 0; i < 3; i++) {
//     // create a IIFE function
//     ((i)=>{
//        setTimeout(() => console.log(i), 0);  // 0 1 2
//     })(i);
// }


// // Q 3 - Promise + Event loop

// console.log("start");

// Promise.resolve().then(() => console.log("promise"));

// setTimeout(() => console.log("timeout"), 0);

// console.log("end");

// // start
// //end
// //promise
// //timeout

// //  Q 4 - Implement the debounce

// function debounce(fn, delay) {
//      let clearId;

//      return function (...args) {
//         clearTimeout(clearId);

//         // clearId = setTimeout(() => {
//         //     fn.apply(this, args);
//         // }, delay);
//         clearId = setTimeout(() => {
//             fn.apply({name: "My name is rishav. "}, args);
//         }, delay);
//      }
// }

// const debounceFun = debounce(function (text) {
//     console.log(this.name + text);
// }, 200)

// debounceFun("we");
// debounceFun("welcome");
// debounceFun("weelcome to");
// debounceFun("welcome to my");
// debounceFun("welcome to my home");
// debounceFun("welcome to my home for");
// debounceFun("welcome to my home for further");
// debounceFun("welcome to my home for further assistance");


// // implement throttle
// function throttle(fn, timeDuration) {
//     let lastcall = 0;

//     return function (...args) {
        
//         const now = Date.now();

//         if (now - lastcall >= timeDuration) {
//             lastcall = now;
//             fn.apply(this, args);
//         }
//     }
// }

// const throttleFun = throttle((text)=> {
//     console.log(text);
// }, 1000);

// window.addEventListener("scroll", ()=>{
//     throttleFun("scrolling the page");
// })

// // run only one time

// function callOnce(fn) {
//     let isCalled  = false;
//     let result;

//     return function (...args) {
//         if (!isCalled) {
//             isCalled = true;
//             result = fn.apply(this, args);
//         } else {
//             console.log(result);
//         }
//     }
// }

// const callOnceFun = callOnce(()=>{
//     console.log("Hi I am initiating call");
//     return "you can exit the call whevever you want";
// })

// callOnceFun();
// callOnceFun();
// callOnceFun();


// function multiply(a, b) {
//     return a * b;
// }

// const multiplyFunc = multiply.bind(null, 5);

// console.log(multiplyFunc(10, 2));


// // pollyfills for binds

// Function.prototype.mybind = function(context, ...mainArgs) {
//     const fn = this;

//     return function (...args) {
//         return fn.apply(context, [...mainArgs, ...args]);
//     }
// }

// // normal function
// function add(a, b, c) {
//   return a + b + c;
// }

// // currying implemented
// function curryAdd(a) {
//   return function (b) {
//     return function (c) {
//       return a + b + c;
//     };
//   };
// }

// const add = curryAdd(1);
// const add2 = add(2);
// const add3 = add2(3);
// console.log(add3());


// practice memozoation

// create a memoize addition function that memoizes the results

// 1. jis function ke result ko hume memoize kerna hai, usko as a arguament pass kere
// 2. memoize function ke andar se ek new function return kare jo ki arguments to user se lega
// 3. check kare with given argument, result stored ha ya nahi, hai to return kare, nahi tou, calculate kare
// 4. calculate kerne ke lia, memoize function mai jo function as an argument lia tha, us function ko given argument se call kare.

function memoizeAdd(fn) {

    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log("Fetching from cache for arguments: ", args);
            return cache[key];
        } else {
            // cache[key] = fn(...args);
            // return cache[key];

            // or
            console.log("calculating the result of arguments: ", args);

            cache[key] = fn.apply(this, args);
            return cache[key];
        }
    }
}

const memoizedAdd = memoizeAdd((a, b)=> {
    return a + b;
})

console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd(1, 2)); // 3 (cached result)
console.log(memoizedAdd(2, 3)); // 5
console.log(memoizedAdd(2, 3)); // 5 (cached result)



function fib(n) {
    if (n<=1) return n;
    return fib(n-1) + fib(n-2)
}

function memoizeFib (fn) {

    const cacheMap = new Map();

    return function (...args) {
        const key = JSON.stringify(args)
        if (cacheMap.has(key)) {
            console.log("return from old result")
            return cacheMap.get(key);
        } else {
            console.log("find value and store in cache");
            const result = fn.apply(this, args)
            cacheMap.set(key, result);
            return result;
        }
    }
}

const memoizedFib = memoizeFib(fib);

console.log(memoizedFib(2));
console.log(memoizedFib(2));

// memoize with multiple arguments

function memoizeMultiply(fn) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log("returning from the cache result");
            return cache[key];
        } else {
            const result = fn.apply(this, args);
            cache[key] = result;
            console.log("finding the result and storing in cache");
            return result;
        }
    }
}

const memoizedMultiply = memoizeMultiply((a, b, c)=>{
     return a * b * c;
})

console.log(memoizedMultiply(1,2,3));
console.log(memoizedMultiply(1,2,3));

// limit to store only last 10 results

function fibnacci(n) {
   if (n <= 1) return n;
   return fibnacci(n-1) + fibnacci(n-2);
}

function memoizeFibnacci(fn) {
    const cacheMap = new Map();
    const limit = 10;

    return function (...args) {
        const key = args.toString();

        if (cacheMap.has(key)) {
            console.log("memoizeFibnacci return from cache")
            return cacheMap.get(key);
        } else {
            console.log("memoizeFibnacci calculating")
            const result = fn.apply(this, args);
            cacheMap.set(key, result);

            if (cacheMap.size > limit) {
                console.log("cahcemap", cacheMap)
                // preserve the last n result and remove all.
                const keysToDelete = Array.from(cacheMap.keys())

                const excess = cacheMap.size - limit;

                for(let i = 0; i < excess; i++) {

                    cacheMap.delete(key[i]);
                }
            }

            return result;
        }
    }
}

const memoizedFibnacci = memoizeFibnacci(fibnacci);
memoizedFibnacci(1);
memoizedFibnacci(2);
memoizedFibnacci(3);
memoizedFibnacci(4);
memoizedFibnacci(5);
memoizedFibnacci(6);
memoizedFibnacci(7);
memoizedFibnacci(8);
memoizedFibnacci(12);
memoizedFibnacci(11);
memoizedFibnacci(13);
memoizedFibnacci(5);
memoizedFibnacci(7);
memoizedFibnacci(1);

// create your own map function

function newMap(arr, fun) {

    let newArr = [];
    for(let i = 0; i < arr.length; i++) {
       newArr.push(fun(arr[i]));
    }
    
    console.log("final result", newArr);
    return newArr;
}

console.log(newMap([1, 2, 3, 4], (n) => n*n));


// create your own filter method

function newFilter(arr,  fun) {
   const newArr = [];

   for(let i = 0; i < arr.length; i++) {
       let isTrue = fun(arr[i]);

       if (isTrue) {
          newArr.push(arr[i]);
       }
   }

   return newArr;
}

// filter out all even number
console.log(newFilter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) => n%2==0))

// filter out all the number which is divisible by 3
console.log(newFilter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) => n%3==0))


// create once function, which will be called only once

function onlyOnce(fn) {
    let calledOnce = false;

    return (...args) => {
        if (!calledOnce) {
            fn.apply(this, args);
            calledOnce = true;
        } else {
            console.log("this function already executed");
        }
    }
}

const calledOnlyOnce = onlyOnce(function(name) {
   console.log(`Hi ${name}, welcome you in 2026`);
});

calledOnlyOnce('Rishav');

calledOnlyOnce('Rishav');


// create a function that return a promise and this promise will be resolved after 4sec


async function getUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.7
                ? resolve({ name: "Rishav", age: 25 })
                : reject("Random failure");
        }, 1000);
    });
}


// retry function

function retryFunction(fn, duration, retries) {
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

    return async (...args) => {
        let attempt = 0;

        while (attempt <= retries) {
            try {
                const data = await fn(...args);
                return data; // ✅ success
            } catch (err) {
                if (attempt === retries) {
                    throw err; // ❌ no retries left
                }
                await delay(duration);
                attempt++;
            }
        }
    };
}

const retriesFunction = retryFunction(getUserData, 1000, 5);

console.log(retriesFunction('rishav'));











