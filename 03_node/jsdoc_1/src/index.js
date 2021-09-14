// @ts-check
const calculator = require('./module');

/**
 * Student name
 * @type {string}
 */
const person = 'John Doe';

/**
 * Array of grades
 * @type {number[]}
 */
const grades = [1,2,3,true];

/**
 * Todo object
 * @type {{id: number, text: string | number}}
 */
const todo = {
  id: 1,
  text: 'hello',
  test: 'test'
}

/**
 * Calc function
 * @param {number} a - First argument
 * @param {number} b - Secont argument
 * @returns {void | number} - Sum
 */
function calc(a, b) {
  return a + b;
}

calc(1, 2);

// Custom types
/**
 * A student
 * @typedef {Object} Student
 * @property {number} id - Student ID
 * @property {string} name - Student name
 * @property {number | number} [age] - Student age (optianl)
 * @property {boolean} isActive - Student is active
 */

 /**  
  * @type {Student}
  */
 const student = {
   id: 1,
   name: 'John Doe',
   age: 20,
   isActive: true
 }

/**
 * Class to create a person object
 */
class Person {
  /**
   * @param {{name: string, age: number}} personInfo Information about the person
   */
  constructor(personInfo) {
    /**
     * @property {string} name Persons name
     */
    this.name = personInfo.name;
    /**
     * @property {number} age Persons age
     */
    this.age = personInfo.age;
  }
  /**
   * @property {Function} greet A greeting with the name and age
   * @returns {void}
   */
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age}`);
  }
}

/**
 * See {@link Person}
 */
const mike = new Person({ name: 'Mike', age: '30'});

console.log(calculator.add(1, '2'));
