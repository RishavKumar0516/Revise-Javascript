
// Question 1

console.log(a);   // undefined -  accessing the variable before it is deccleared as variable is hoisted so its value is undefined
var a = 10;

function foo() {
  console.log(a);   //undefined
  var a = 20;
  console.log(a);   //20
}
foo();
// as function is invoked a new execution context is created and memory is allocated for variable a and its value is undefined as variable is hoisted
// so the value is undefined for variable a accessing it before it is deccleared inside the function
// once var a = 20 gets executed it overwrites the value of variable a in the current execution context and its value is 20
// so the value of variable a logs 20 when accessed after declearation


// this will print 10 as variable a is a global variable and its value is 10
console.log(a);     //10


// Question 2
{
  //console.log(x);  // ReferenceError: Cannot access 'x' before initialization - x is decleared is block scope with let keyword, so variable decleared using let gets hoisted but its in TDZ temporal dead zone, so its won't be accessible till its initialized with a value.
  let x = 10;
}

// Question 3
function test() {
  console.log(a);   //undefined  - variable a is initialized using var keyword, so it gets hoisted and initialized with undefined
  if (true) {
    var a = 5;  // here we have defined variable a using var inside the block, but var has functional scope so it can be accessed anywhere inside the function    
  }
  console.log(a); //5
}
test();
// as soon as function is invoked a new functional execution context is created and memory is allocated to each variable and function present in it

// Question 4

function outer() {
  let a = 10;
  function inner() {
    console.log(a);
  }
  return inner;
}
const fn = outer();
fn();


// Question 5

// when you decleare a variable using var keyword, you can redeclare it but it will refrence to the same memory location
// EX - var b = 50;
//      var b = 100;

// both of them refrence to the same memory location, so rather then creating a new variable it will overwrite the value of variable b

// var is function-scoped, not block-scoped.

// That means the same single variable i is shared across all loop iterations.

// By the time the setTimeout callbacks actually run (after ~1000ms), the loop has already finished.
// At that point:

// i = 3 (loop exited).

// All 3 callbacks reference the same i, which is now 3.
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 1000);  // logs var: 3 3 3
}

// let is block-scoped.

// Each iteration of the loop creates a new lexical environment with its own copy of j.

// So each setTimeout callback closes over a different j.

// After 1000ms, the callbacks log the values they captured at each iteration: 0, 1, 2
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 1000);
}


LINK - https://chatgpt.com/share/68c0830b-2d00-8011-8b70-708a9f622b7c

