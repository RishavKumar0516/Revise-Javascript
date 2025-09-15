// 1. Function declearation / Function statement

// function created using function keyword and has a name called function statement. Function statement gets hoisted and you call invoke them before declearation.

console.log(add(2, 4));
function add(a, b) {
  return a + b;
}


// 2. Function expression
// using function as a value
// Function created using function keyword and it can either be anonymus or have a name, and used as a value called function expression. so we assign this function as a value to a variable and we can invoke them after declearation.

// as we are storing this inside the variable so that variable can only have this function as a value once that line gets executed so that's why we get TypeError: foo is not a function it is a variable.


// subtract(5, 2);  // ReferenceError: Cannot access 'subtract' before initialization - function is assigned in to the constant variable and constant variable are hoisted but its in tdZ so its not accessible before declearation
const subtract = function(a, b) {
  return a - b;
};
console.log(subtract(5, 2));


// 3. IIFE - Immediately Invoked Function Expression
// The function which is executed/invoked immediately after it is created is called IIFE
// to create IIFE we use parenthesis around the function expression and then invoke it

(function () {
    console.log("I am a immediately invoked function expression");
})();


// 4. Clousers
// A closure is when a function "remembers" variables from its lexical scope, even when executed outside that scope
// or when a function returns a another function from inside of outer function and then this inner functin calls somewhere else in the program then it stills have access to the outer function's variables and functions. so it still remember and has the reference to outer function's variables and functions. this inner function is called clouser because it is a clouser of outer function

// function bundled together with its lexical scope is called clouser

// EX:-

function outer() {
    let counter = 0;

    function inner() {
        counter += 1;
        console.log(counter);
    }

    return inner;
}

// const increment = outer();

// increment();
// increment();
// increment();

// implement counter with clousers

// function counter() {
//     let count = 0;

//     function increment() {
//         count += 1;
//         console.log(count);
//     } 

//     function  decrement() {
//         count -= 1;
//         console.log(count);
//     }

//     function reset() {
//         count = 0;
//         console.log(count);
//     }

//     return {
//         increment,
//         decrement,
//         reset
//     }
// }

// const { increment, decrement, reset } = counter();

// increment();
// increment();
// increment();
// decrement();
// reset();

function counter () {
    let count = 0;

    return {
        increment() {
            count += 1;
            return count;
        },
        decrement() {
            count -= 1;
            return count;
        },
        reset() {
            count = 0;
            return count;
        }

    }
}

const counterNum = counter();
console.log(counterNum.increment());
console.log(counterNum.increment());
console.log(counterNum.increment());
console.log(counterNum.decrement());
console.log(counterNum.reset());

// Implement the function that execute only once then catches the result

function once(callback) {
    let isCalled = false;
    let result;

    return function (...args) {
        if(!isCalled) {
            result = callback.apply(this, args);
            isCalled = true;
            return result;
        } else {
            return result;
        }
    }   
}

const onceFunc = once(function (a, b) {
    console.log("a", a, "b", b);
    return a + b;
})

console.log(onceFunc(4, 5));
console.log(onceFunc(7, 5));
console.log(onceFunc(8, 5));
