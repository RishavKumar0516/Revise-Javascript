
// Pracrtice 1

// function statement or function decleartion
foo();
function foo() {
    console.log("foo");  
}
// function statement is hoisted and executed, so it is accessible before declearation


// practice 2

// function expression

// bar();    // TypeError: bar is not a function
// var bar = function () {   
//     console.log("bar");
// }

// Explanation - function expression is a variable which holds a function value, so it is hoisted but not executed, so it is undefined, so we can't access it before declearation
// that's why we get TypeError: bar is not a function


// practice 3
// Arrow function
// baz();
// var baz = ()=> console.log("baz");

// Explanation - Arrow function is a variable which holds a function value, so it is hoisted but not executed, so it is undefined, so we can't access it before declearation
// that's why we get TypeError: baz is not a function

// {
//     console.log(a);  //ReferenceError: Cannot access 'a' before initialization
//     let a = 30;
//     console.log(a);   // 30
// }

// Explanation - Variable a is decleared using let keyword, so it gets hoisted but its in TDZ temporal dead zone, so its won't be accessible till the line a = 30 gets executed

// Practice 4

sayHi();
function sayHi() {
    console.log("Hi")
}

// sayHello();  // TypeError: sayHello is not a function
var sayHello = function () {   
    console.log("Hello")
}
// initially this variable sayHello gets memory allocated in the global execution context, and in code execution phase when It sees sayHello it go and check in the execution context and it found that it stores a undefined value so it throws TypeError: sayHello is not a function
// when var sayHello = function () {   gets executed it overwrites the value of variable sayHello in the current execution context and its value is a function so the value of variable sayHello logs Hello when accessed after declearation 

// sayHey();
let sayHey = () => console.log("Hey")
// here we have assigned function expression to a variable decleared using let, and variable decleared using let gets hoisted but its in TDZ temporal dead zone, so its won't be accessible till the line sayHey = () => console.log("Hey") gets executed, when this line gets executed it overwrites the value of variable sayHey in the current execution context and its value is a function so the value of variable sayHey logs Hey when accessed after declearation


console.log(a);  // undefined
var a = 5;

// console.log(b);  // Reference Error: cannot access b before initialization
let b = 10;


foo();
function foo() {
  console.log("foo");  
}
// answer = foo

// bar();
var bar = function() {
  console.log("bar");
};
// answer = TypeError: bar is not a function


{
//   console.log(x); //Reference Error: cannot access x before initialization
  let x = 10;
}


var x = 1;
function test() {
  console.log(x);  //undefined
  var x = 2;
}

// x defined outside of test has global scope
// x defined inside test has function scope and can be accessed inside the function only not outside
// now when the test() gets executed the function execution context is created and memory is allocated to each variable and function present in it so x gets initialized with value undefined
// now in code execution phase the code start executing line by line and we are trying to access x in console.log so at that time x is undefined so it will log undefined
// after executing line x = 2 the value of x is 2 and it will log 2
test();


function sayHello() {
  console.log("Hello");
}
var sayHello;  

sayHello();

