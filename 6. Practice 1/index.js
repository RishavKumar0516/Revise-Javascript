// JavaScript Interview Practice – Closures, Promises, Event Loop


// Predict the output:
// Q 1
function outer() {
  let x = 10;
  return function inner() {
    console.log(x++);  // this is post increment, so it will first logs and then increment the value.
  };
}

const fn = outer();
fn();  // 10
fn();  // 11

// Q 2
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  
}
  // 3 3 3

for(var i = 0; i < 3; i++) {
    // create a IIFE function
    ((i)=>{
       setTimeout(() => console.log(i), 0);  // 0 1 2
    })(i);
}


// Q 3 - Promise + Event loop

console.log("start");

Promise.resolve().then(() => console.log("promise"));

setTimeout(() => console.log("timeout"), 0);

console.log("end");

// start
//end
//promise
//timeout

//  Q 4 - Implement the debounce

function debounce(fn, delay) {
     let clearId;

     return function (...args) {
        clearTimeout(clearId);

        // clearId = setTimeout(() => {
        //     fn.apply(this, args);
        // }, delay);
        clearId = setTimeout(() => {
            fn.apply({name: "My name is rishav. "}, args);
        }, delay);
     }
}

const debounceFun = debounce(function (text) {
    console.log(this.name + text);
}, 200)

debounceFun("we");
debounceFun("welcome");
debounceFun("weelcome to");
debounceFun("welcome to my");
debounceFun("welcome to my home");
debounceFun("welcome to my home for");
debounceFun("welcome to my home for further");
debounceFun("welcome to my home for further assistance");


// implement throttle
function throttle(fn, timeDuration) {
    let lastcall = 0;

    return function (...args) {
        
        const now = Date.now();

        if (now - lastcall >= timeDuration) {
            lastcall = now;
            fn.apply(this, args);
        }
    }
}

const throttleFun = throttle((text)=> {
    console.log(text);
}, 1000);

window.addEventListener("scroll", ()=>{
    throttleFun("scrolling the page");
})

// run only one time

function callOnce(fn) {
    let isCalled  = false;
    let result;

    return function (...args) {
        if (!isCalled) {
            isCalled = true;
            result = fn.apply(this, args);
        } else {
            console.log(result);
        }
    }
}

const callOnceFun = callOnce(()=>{
    console.log("Hi I am initiating call");
    return "you can exit the call whevever you want";
})

callOnceFun();
callOnceFun();
callOnceFun();


function multiply(a, b) {
    return a * b;
}

const multiplyFunc = multiply.bind(null, 5);

console.log(multiplyFunc(10, 2));


// pollyfills for binds

Function.prototype.mybind = function(context, ...mainArgs) {
    const fn = this;

    return function (...args) {
        return fn.apply(context, [...mainArgs, ...args]);
    }
}

// normal function
function add(a, b, c) {
  return a + b + c;
}

// currying implemented
function curryAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

const add = curryAdd(1);
const add2 = add(2);
const add3 = add2(3);
console.log(add3());






