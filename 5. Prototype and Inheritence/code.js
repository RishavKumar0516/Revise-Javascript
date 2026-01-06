// object

// 1. creating object using object literals

const person = {
    name:"rishav",
    age:21, 
    introduce() {  //this is same as writing as introduce: function(){
        console.log(`My name is ${this.name} and I am ${this.age} years old`);
    },
}

// accesssing using dot notation
console.log("name", person.name);
console.log("age", person.age);
person.introduce();

// accessing using bracket notation
console.log("name", person["name"]);
console.log("age", person["age"]);
person["introduce"]();

// when the property is stored in some variable then in that case we cannot access the property using dot notation, there we need to use bracket notation

const key = "name";
console.log("name", person[key]);

// adding new property in the object
person.gender = "male";
console.log("gender", person.gender);

person['nickname'] = "mohan";
console.log("nickname", person.nickname);

person['getNickName'] = function() {
    console.log("My nickname is", this.nickname);
}
person['getNickName']();


// NOTE: if we need to create a single object then string literals are fine, but if we need to create multiple objects, and after creating multiple objects then we want to update/add new property to the object then we need to go through each object. so we can also create object using fucntion

function createObject(name, age) {
    return {
        name, age, 
        // writing name:name is same as name
        introduce() {
            console.log(`my name is ${this.name} and my age is ${this.age}`);
        }
    }

    // or
    //   const obj = {};
    //   obj.name = name;
    //   obj.age = age;
    //   obj.introduce = function() {
    //       console.log(`my name is ${this.name} and my age is ${this.age}`);
    //   }

    //   return obj;
}

const person1 = createObject("Rishav", 21);
person1.introduce();

const person2 = createObject("Rahul", 28);
person2.introduce();

// 2. Creating Object using new kwyword

const person3 = new Object({
    name: "Rishav",
    age: 21
})
console.log("person3", person3);

// creating object using object.create where Object is a constructor
const person4  = Object.create({
    name: "Rahul", 
    age: 28,
    introduce() {
        console.log(`My name is ${this.name} and I am ${this.age} years old`);
    }
})

console.log("person4`s name", person4.name);
person4.introduce();

// create object using fromEnteries
// The fromEntries() method creates an object from iterable key / value pairs.

const enteries = [
    ["name", "Rishav"],
    ["age", 21],
    ["gender", "male"],
    ["nickname", "mohan"],
    ["info", function() {
        console.log(`My name is ${this.name} and I am ${this.age} years old. My nickname is ${this.nickname} and my gender is ${this.gender}`);
    }]
];

const person5 = Object.fromEntries(enteries);
console.log("person5", person5);

person5.info();
console.log("object.keys(person5)", Object.keys(person5));
console.log("object.values(person5)", Object.values(person5));
console.log("object.entries(person5)", Object.entries(person5));





// 2. creating object using constructor function

// constructor are called using new keyword followed by the function name, where the name of the function always starts with the capital letter.

function Animal(name, type, breed) {
    this.name = name;
    this.type = type;
    this.breed = breed;

    this.info = function() {
        console.log(`I am a animal with name ${this.name} with family of ${this.type} and breed of ${this.breed}`);
    }
}

const dog = new Animal("Rover", "Dog", "Golden Retriever");
dog.info();

// lets create one more constructor
function Festival(name, date) {
    this.name = name;
    this.date = date;

    this.info = function () {
        console.log(`${this.name} will be held on ${this.date}`);
    }
}

const diwali = new Festival("Diwali", "10th october");
diwali.info();

// Creating Object using function or constructor you define the structure of an object and reuse them multiple times. this is required when we need to create multiple objects with same structure


// 3. Prototype

// Prototypes are the mechanism by which JavaScript objects inherit features from one another

// Every object in JavaScript has a built-in property, which is called its prototype. The prototype is itself an object contains properties and methods, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype.

let arr = [1, 2, 4];
console.log("arr", arr);

// links - https://www.geeksforgeeks.org/javascript/js-prototype/

// In JavaScript, the prototype is a container for methods and properties. When methods or properties are added to the prototype of a function, array, or string, they become shared by all instances of that particular object type.

// When a method or property is added to the prototype, it becomes shared by all instances of the object type. This is called prototype inheritance.
// here object type means if we add some property to the prototype of an array then all the array instance will get that property too


// in Javascript every things are object even the array, function, string, number, boolean etc.
// Each and Every thing in JavaScript is converted into an Object at run time, that's why as soon as I added the method to the Object's prototype it became accessible to all the other hierarchical children to the Object which are function's, Array's and String's.


Object.prototype.printInfo = function() {
    console.log("I am an object");
}
let k = "Hello World";
k.printInfo();

let m = [1, 2, 4, 6];
m.printInfo();

let newFunction = function () {
    console.log("I am a function");
}
newFunction.printInfo();

// If you add to Object.prototype, all objects (arrays, functions, user-defined objects, and string wrappers) get it.

// If you add to String.prototype, then only strings (and string wrappers) get it.

// If you add to Array.prototype, only arrays get it.

// When you access a property on a primitive (like "Hello World".length), JS temporarily wraps it in an object (new String("Hello World")) so you can use methods.
// same goes for slice, splice and other methods


// adding method to constructor function
function Users (name, id, role) {
    this.role = role;
    this.id = id;
    this.name = name;
}

// adding the function to the constructor so all instances of the constructor will get the function
Users.prototype.printInfo = function() {
    console.log(`My name is ${this.name} and my id is ${this.id} and my role is ${this.role}`);
}

const user1 = new Users("Rishav", 1, "Admin");
user1.printInfo();

const user2 = new Users("Rahul", 2, "User");
user2.printInfo();

// but this will not work if we create the object using object literals or object.create etc because we have added this printinfo function to the prototype of the constructor only not to the object
// in console type the user2 and inside the protptype you will see the contrutor object inise that you will find the printInfo function there but not in case of user3


const user3 = {
    name: "sonu",
    id: 1,
    role: "Admin"
}
user3.printInfo();

// adding the function to the string prototype
String.prototype.printStringInfo = function() {
    console.log(`My string is ${this}`);
}
const str = "Hello World";
str.printStringInfo();


// adding the function to the array prototype
Array.prototype.printArrayInfo = function() {
    console.log(`My array is ${this}`);
}
const myNewArray = [1, 2, 3, 4];
arr.printArrayInfo();
Array.prototype.sum = function() {
    return this.reduce((acc, curr)=> acc + curr, 0);
}

console.log(myNewArray.sum());

// Prototype Inheritance
// This code demonstrates prototype inheritance where the child constructor inherits from the parent constructor, allowing instances of child to access methods defined in parent's prototype. It also adds a custom caste method in the child prototype.

function LivingCreature(name, type) {
    this.name = name;
    this.type = type;
}

LivingCreature.prototype.introduceCreature = function() {
    console.log(`My name is ${this.name} and I am a ${this.type}`);
}

function Human(name, type, age) {
    LivingCreature.call(this, name, type);
    this.age = age;
}

Human.prototype = Object.create(LivingCreature.prototype);
Human.prototype.constructor = Human;

Human.prototype.introduceCreature = function() {
    console.log(`My name is ${this.name} and I am a ${this.type} and I am ${this.age} years old`);
}

const dog1 = new LivingCreature("Rover", "Dog");
dog1.introduceCreature();

const human1 = new Human("Rishav", "Human", 21);
human1.introduceCreature();






// Notes:- 

// Primitives vs Objects in JavaScript

// JavaScript has two broad categories of values:

// Primitives

// string, number, boolean, null, undefined, symbol, bigint

// Example:

// let str = "Hello";   // primitive string
// let num = 42;        // primitive number


// These are not objects and normally don’t have methods or properties.

// Objects

// Arrays, functions, plain objects, dates, etc.

// Example:

// let arr = [1, 2, 3]; // object
// let obj = { a: 1 };  // object

// 🔹 The “Wrapper Objects”

// JavaScript wants us to write things like:

// "Hello".length;        // 5
// "Hello".toUpperCase(); // "HELLO"


// But "Hello" is a primitive, not an object.
// How can it have .length or .toUpperCase()?

// 👉 Here’s what happens internally:

// When you access a property on a primitive ("Hello".length),
// JavaScript temporarily wraps it in a corresponding wrapper object:

// Primitive string → wrapped in new String("Hello")

// Primitive number → wrapped in new Number(42)

// Primitive boolean → wrapped in new Boolean(true)

// The wrapper object gives you access to all the methods on its prototype (String.prototype, Number.prototype, etc.).

// After the property/method is used, the wrapper object is immediately discarded.

// Example:

// let str = "Hello";
// console.log(str.length);   // internally -> new String("Hello").length -> 5
// console.log(str.toUpperCase()); // internally -> new String("Hello").toUpperCase()


// ⚠️ Important:
// The primitive str is still a string, not an object:

// console.log(typeof str);           // "string"
// console.log(str instanceof String); // false

// 🔹 Why this matters for Object.prototype

// If you add a method to Object.prototype:

// Object.prototype.printInfo = function() {
//   console.log("From Object prototype:", this);
// };


// Then:

// let arr = [1, 2, 3];
// arr.printInfo(); // works (array is an object)

// "Hello".printInfo(); 
// // also works, because JS does: new String("Hello").printInfo()


// But note: the String wrapper is temporary.
// You don’t actually change the primitive "Hello", you just borrowed an object.





// Explain the difference between this 

// Human.prototype = Object.create(LivingCreature.prototype);
// Human.prototype.constructor = Human;

// and
// Human.prototype = LivingCreature.prototype; 
// ChatGPT said:

// Nice question 🔥 This is a fundamental difference in JavaScript inheritance. Let’s break it down properly so you can note it.

// Case 1:
// Human.prototype = Object.create(LivingCreature.prototype);
// Human.prototype.constructor = Human;

// ✅ What happens:

// Object.create(LivingCreature.prototype) creates a new object whose prototype is LivingCreature.prototype.

// That new object becomes Human.prototype.

// Then we reset the constructor property back to Human.

// So now:

// Human.prototype → (new object) → LivingCreature.prototype


// This means:

// Human inherits from LivingCreature.

// But Human.prototype is independent — you can safely add/modify methods on Human.prototype without affecting LivingCreature.prototype.

// Case 2:
// Human.prototype = LivingCreature.prototype;

// ❌ What happens:

// Here Human.prototype and LivingCreature.prototype both point to the exact same object in memory.

// No new object is created.

// So now:

// Human.prototype === LivingCreature.prototype


// This means:

// Any change you make to Human.prototype also changes LivingCreature.prototype (because they are the same object).

// You are not creating an inheritance chain — you’re making them share one prototype.

// Example:

// function LivingCreature() {}
// LivingCreature.prototype.breathe = function() {
//   console.log("Breathing...");
// };

// function Human() {}
// Human.prototype = LivingCreature.prototype;

// Human.prototype.speak = function() {
//   console.log("Speaking...");
// };

// let animal = new LivingCreature();
// animal.speak(); // 😱 Works, even though animals shouldn't speak!


// Because adding speak to Human.prototype also added it to LivingCreature.prototype.

// ✅ Key Differences
// Case	Prototype Relationship	Safe to extend Human without affecting LivingCreature?
// Object.create	Human.prototype → LivingCreature.prototype → Object.prototype	✅ Yes
// Direct assignment	Human.prototype === LivingCreature.prototype	❌ No
// ✅ Best Practice

// Always use:

// Human.prototype = Object.create(LivingCreature.prototype);
// Human.prototype.constructor = Human;


// This sets up a proper inheritance chain.