// this is a special keyword in JavaScript that refers to the execution context (the object that is currently calling the function).

// Its value depends not on where it is defined, but how it is called.

// The this keyword refers to the context where a piece of code, such as a function's body, is supposed to run. Most typically, it is used in object methods, where this refers to the object that the method is attached to, thus allowing the same method to be reused on different objects.


// 1. In Global execution context

// with non strict mode
console.log(this);  // window object

// with strict mode
// 'use strict';
console.log(this);  // window object
// when this is used inside the global space then this will points to the global window object in both (strict and non-strict mode).
// This is because strict mode only changes behavior inside functions, not the script’s top-level scope in browsers.

// 2. In Function execution context

// in non strict mode if function is fucntion statement
function func() {
    console.log("this inside the function", this);  // window object
}
func();

// var functionExpression = function() {
//     console.log("this inside the function expression", this);  // window object
// }
// functionExpression();

// var arrowFunction = () => console.log("this inside the arrow function", this);  // window object
// arrowFunction();

// in strict mode
// 'use strict';
function func1() {
    'use strict';
    console.log("this inside the function1", this);  // undefined
}
func1();

var functionExpression = function() {
    'use strict';
    console.log("this inside the function expression", this);  // undefined
}
functionExpression();

var arrowFunction = () => {
    'use strict';
    console.log("this inside the arrow function", this);  // window object
} 
arrowFunction();

// Explaination:-

// This 'functionExpression' is a normal function.

// In strict mode, when you call a normal function without any object (i.e., functionExpression()), this is set to undefined instead of falling back to the global object.

// Arrow functions don’t have their own this.
// Instead, they capture this from the surrounding lexical scope at the time they are defined.
// In your case, the arrow function is defined in the global (script) scope.

// 4. Objects methods
// If a function is called as a method of an object → this = that object.

// For a regular function (not an arrow function, bound function, etc.), the value of this is the object that the function is accessed on. In other words, if the function call is in the form obj.f(), then this refers to obj. For example:

const obj = {
    name: "Rishav",
    sayName: function() {
        console.log("name", this.name);
    }
}
obj.sayName(); //Rishav

// But if you extract the method and call it on its own without a reference to the object, this will be undefined:
const extractedSayName = obj.sayName;
extractedSayName(); // undefined

// with arrow function

// Arrow functions do not have their own this.

// They capture this from the surrounding lexical scope.
// sayName is defined inside the object literal, but that does not mean its this = obj.

// Instead, the arrow function looks one scope up → the scope where obj was created.

// If you’re running this in:

// A browser script → top-level scope this = window.

// If "use strict" or modules → top-level scope this = undefined.

// So, inside the arrow function:

// this.name // either undefined.name (error) OR window.name (usually empty string)


// That’s why nothing shows up.

var obj1 = {
    name: "Rishav deleta",
    sayName: () => {
        console.log("name from arrow", this.name);  //undefined
    }
}

obj1.sayName();

// fixing

var obj2 = {
    name: "Rishav deleta",
    sayName: function() {
        const inner = () => {
            console.log("name from arrow1", this.name);
        }
        inner();
    }
}

obj2.sayName();

// 4. When arrow is useful

// Arrows are useful when you want to preserve this from an outer function:

const obj4 = {
  name: "Rishav",
  sayName: function() {
    const inner = () => {
      console.log(this.name);
    };
    inner();
  }
};
obj4.sayName(); // "Rishav"


// Here, the arrow inherits this from the normal method (obj).

// ✅ Rule of thumb:

// Use normal functions for object methods (when you need this to be the object).

// Use arrow functions for inner callbacks (when you want this from the outer function).


// 5 Event listeners
// In browser event handlers, this refers to the DOM element that received the event when using normal functions.
const rootEle = document.getElementById("btn");
// rootEle.addEventListener("click", function () {
//   console.log(this);   // HTML button element
// });

// With arrow functions, this will not point to the element: it will point to the global window object.
const rootEle1 = document.getElementById("btn");
rootEle1.addEventListener("click", () => {
  console.log(this);  // window
});


// 6. With call function

// const name = {
//     firstName: "Sachin",
//     lastName: "Tendulkar",
//     // printFullName: function() {
//     //     console.log(this.firstName + " " + this.lastName);
//     // }
// }

// name.printFullName();  // Rishav Kumar

// const name2 = {
//     firstName: "Rahul",
//     lastName: "Dravid",
//     // printFullName: function() {
//     //     console.log(this.firstName + " " + this.lastName);
//     // }
// }

// in object name there is a method printFullName, so to call that function we need call the name.printFullName()
// here is second object too and if we want to print the fullName of that object, then we need to again create the printFullName function in that object name2,  that is against DRY principle

// so rather then re creating the printFullName function in name2, we can borrow the function from name object, this is called function binding/borrowing

// first name the object that you want to call
// each and every function is js has access to call method
// call method takes first argument as the object that you want to call the function on or in normal term, the object that that we want this used inside the printFullName function should points too
// or in simple word "where this needs to be pointed to"

// so in our case we want this shoud points to the name2 object so we pass first argument as name2 object
// name.printFullName.call(name2);

// but in above example we have defined method inside the first name object, but we can define the method seperately as well


const name = {
    firstName: "Sachin",
    lastName: "Tendulkar",
}

const name2 = {
    firstName: "Rahul",
    lastName: "Dravid",
}

function printFullName(district, state) {
    console.log(this.firstName + " " + this.lastName + " from " + district + ", " + state);
}

// printFullName.call(name);
// printFullName.call(name2);

// you can even pass multiple arguments to the function using comma separated
// but the first argument should always be the reference to the 'this'

printFullName.call(name, "khagaria", "bihar");   //Sachin Tendulkar from khagaria, biha
printFullName.call(name2, "begusaria", "bihar");  //Rahul Dravid from begusaria, bihar

// apply method - same as call method the only difference is how we pass the arguments. apply method takes arguments as an array
printFullName.apply(name2, ["munger", "bihar"]); // Rahul Dravid from begusaria, bihar


// binds method
// it binds the method with the object and gives you the copy of that method


// it binds the printFullName method with the name2 object and returns a copy of "printFullName" method
// the doesn't call the method directly as in case of call and apply method, rather it returns the copy of the method and use it later
// const printFullName2 = printFullName.bind(name2);
// printFullName2("Bhagalpur", "bihar");

// or

const printFullName2 = printFullName.bind(name2, "Bhagalpur", "bihar");
printFullName2("Bhagalpur", "bihar");



// function greet(city) {
//     console.log(`Hello ${this.name} from ${city}`);  // this will points to the object that is passed as reference
// }

// const person = {name:"Abhishek Sharma"};

// greet.call(person, "Punjab"); // Hello Rishav from DPunjab
// greet.apply(person, ["Delhi"]); /// Hello Rishav from Delhi

// const greetPerson = greet.bind(person, "Bihar");
// greetPerson();



// practice

// 🔹 Q1: Basic object method
// const person = {
//   name: "Rishav",
//   greet: function() {
//     console.log(this.name);   // Rishav
//   }
// };
// person.greet();
// As 'this' inside this object method is pointing to the person object, so it will print the name of the person



const person = {
  name: "Rishav",
  greet: function() {
    console.log(this.name); // undefined
  }
};

const greetFn = person.greet;
greetFn();

// The function is called standalone, so in strict mode this = undefined, otherwise in non-strict mode it becomes the global object (window), which doesn’t have name.


// 🔹 Q3: Arrow inside object
const obj3 = {
  name: "Rishav",
  sayName: () => {
    console.log(this.name);  //undefined
  }
};
obj3.sayName();
// the arrow function does not have its own this, it captures this from the outer function. In this case the this will points to the window object and there is no name inside the window object


// 🔹 Q5: setTimeout with method
const obj5 = {
  value: 42,
  log: function() {
     console.log("this value inside first log", this);  //42
    setTimeout(function() {
      console.log("this value inside second log", this);  //42
    }, 1000);
  }
};
obj5.log();