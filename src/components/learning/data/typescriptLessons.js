export const typescriptLessons = [
  {
    id: 1,
    title: 'TypeScript Basics',
    content: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
    code: `// Basic Types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];

// Type Annotations
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Interfaces
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
}

let user: User = {
  name: "John",
  age: 30
};`,
    quiz: {
      question: 'What is the main benefit of TypeScript?',
      options: [
        'Static type checking',
        'Faster runtime performance',
        'Smaller bundle size',
        'Built-in state management'
      ],
      answer: 'Static type checking'
    }
  },
  {
    id: 2,
    title: 'Advanced Types',
    content: 'TypeScript includes advanced type features like unions, intersections, and type aliases for more precise type definitions.',
    code: `// Union Types
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42; // Also valid

// Intersection Types
interface HasName {
  name: string;
}
interface HasAge {
  age: number;
}
type Person = HasName & HasAge;

// Type Aliases
type Point = {
  x: number;
  y: number;
};

// Literal Types
type Direction = "north" | "south" | "east" | "west";
let currentDirection: Direction = "north";

// Nullable Types
type Maybe<T> = T | null | undefined;
let maybeString: Maybe<string> = "hello";
maybeString = null; // Valid
maybeString = undefined; // Valid`,
    quiz: {
      question: 'What symbol is used for union types in TypeScript?',
      options: ['|', '&', '+', '/'],
      answer: '|'
    }
  },
  {
    id: 3,
    title: 'Generics',
    content: 'Generics allow you to write flexible, reusable code that works with multiple types while maintaining type safety.',
    code: `// Generic Function
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");

// Generic Interface
interface Container<T> {
  value: T;
  getValue(): T;
}

// Generic Class
class Queue<T> {
  private data: T[] = [];
  
  push(item: T) {
    this.data.push(item);
  }
  
  pop(): T | undefined {
    return this.data.shift();
  }
}

// Generic Constraints
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}`,
    quiz: {
      question: 'What character is used to define a generic type parameter?',
      options: ['<T>', '{T}', '[T]', '(T)'],
      answer: '<T>'
    }
  },
  {
    id: 4,
    title: 'Classes and Interfaces',
    content: 'TypeScript adds object-oriented features like classes and interfaces with full type support.',
    code: `// Interface Definition
interface Vehicle {
  brand: string;
  model: string;
  year: number;
  start(): void;
}

// Class Implementation
class Car implements Vehicle {
  constructor(
    public brand: string,
    public model: string,
    public year: number,
    private engine: string
  ) {}

  start(): void {
    console.log(\`Starting \${this.engine} engine\`);
  }

  // Getter
  get age(): number {
    return new Date().getFullYear() - this.year;
  }
}

// Abstract Class
abstract class Animal {
  abstract makeSound(): void;
  
  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}`,
    quiz: {
      question: 'What keyword is used to implement an interface in TypeScript?',
      options: ['implements', 'extends', 'interface', 'type'],
      answer: 'implements'
    }
  },
  {
    id: 5,
    title: 'Decorators and Modules',
    content: 'TypeScript supports decorators for adding metadata and behavior to classes and their members, and provides a module system for organizing code.',
    code: `// Class Decorator
function logger(target: any) {
  console.log(\`Class name: \${target.name}\`);
}

@logger
class Example {
  constructor() {
    console.log("Creating instance");
  }
}

// Property Decorator
function required(target: any, propertyKey: string) {
  let value: string;
  
  const getter = () => value;
  const setter = (newVal: string) => {
    if (!newVal) {
      throw new Error("Value required");
    }
    value = newVal;
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter
  });
}

// Module Export/Import
// math.ts
export function add(x: number, y: number): number {
  return x + y;
}

// main.ts
import { add } from './math';
const result = add(1, 2);`,
    quiz: {
      question: 'What symbol is used before a decorator in TypeScript?',
      options: ['@', '#', '$', '&'],
      answer: '@'
    }
  }
]; 