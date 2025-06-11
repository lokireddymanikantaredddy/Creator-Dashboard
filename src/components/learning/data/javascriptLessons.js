export const javascriptLessons = [
  {
    id: 1,
    title: 'JavaScript Introduction',
    content: 'JavaScript is a dynamic programming language primarily used for web development. It allows you to add interactivity and dynamic behavior to web pages.',
    code: `// Basic JavaScript syntax
let greeting = 'Hello, World!';
console.log(greeting);

// Variables and data types
let number = 42;
const PI = 3.14159;
let isActive = true;
let colors = ['red', 'green', 'blue'];
let user = {
    name: 'John',
    age: 25
};`,
    quiz: {
      question: 'Which keyword is used to declare a constant in JavaScript?',
      options: ['let', 'var', 'const', 'def'],
      answer: 'const'
    }
  },
  {
    id: 2,
    title: 'Functions and Scope',
    content: 'Functions are blocks of reusable code. JavaScript has several ways to define functions, each with its own characteristics and use cases.',
    code: `// Function declaration
function greet(name) {
    return 'Hello, ' + name + '!';
}

// Arrow function
const add = (a, b) => a + b;

// Function with scope example
let globalVar = 'I am global';
function testScope() {
    let localVar = 'I am local';
    console.log(globalVar); // Accessible
    console.log(localVar);  // Accessible
}`,
    quiz: {
      question: 'What is the correct syntax for an arrow function?',
      options: [
        '(a, b) => { return a + b }',
        'function(a, b) => a + b',
        'a, b => a + b',
        'function => (a, b) { a + b }'
      ],
      answer: '(a, b) => { return a + b }'
    }
  },
  {
    id: 3,
    title: 'Arrays and Objects',
    content: 'Arrays and objects are fundamental data structures in JavaScript. Arrays are ordered lists, while objects are collections of key-value pairs.',
    code: `// Array methods
const fruits = ['apple', 'banana', 'orange'];
fruits.push('mango');
fruits.map(fruit => fruit.toUpperCase());
fruits.filter(fruit => fruit.length > 5);

// Object manipulation
const person = {
    name: 'Alice',
    age: 30,
    hobbies: ['reading', 'music']
};
person.location = 'New York';
const { name, age } = person; // Destructuring`,
    quiz: {
      question: 'Which method is used to add an element to the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      answer: 'push()'
    }
  },
  {
    id: 4,
    title: 'Promises and Async/Await',
    content: 'Promises and async/await are used for handling asynchronous operations in JavaScript, making it easier to work with tasks like API calls and file operations.',
    code: `// Promise example
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data received');
        }, 2000);
    });
};

// Async/Await
async function getData() {
    try {
        const result = await fetchData();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}`,
    quiz: {
      question: 'What keyword is used to handle asynchronous operations in a synchronous-looking way?',
      options: ['async', 'await', 'then', 'promise'],
      answer: 'await'
    }
  },
  {
    id: 5,
    title: 'DOM Manipulation',
    content: 'The Document Object Model (DOM) represents the web page structure. JavaScript can be used to dynamically modify the DOM, adding, removing, or changing elements.',
    code: `// Selecting elements
const element = document.getElementById('myId');
const elements = document.querySelectorAll('.myClass');

// Modifying elements
element.innerHTML = 'New content';
element.classList.add('active');
element.style.color = 'blue';

// Creating elements
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello!';
document.body.appendChild(newDiv);

// Event handling
element.addEventListener('click', (event) => {
    console.log('Element clicked!');
});`,
    quiz: {
      question: 'Which method is used to select an element by its ID?',
      options: [
        'document.getElementById()',
        'document.querySelector()',
        'document.getElementsByClass()',
        'document.getElement()'
      ],
      answer: 'document.getElementById()'
    }
  }
]; 