// @flow

// VARIABLES
let name: string = 'John Doe';
let age: number = 40;
let something: any = [1,2,3];
let users: string[] = ['John', 'Sara'];
let ids: number[] = [1,2,3];
let isTrue: boolean = true;
// name = 40;

// INTERFACES
let person: Person;

person = {
    name: 'John',
    age: 30,
    isTrue: false
}

// person = {
//     name: 'John',
//     age: 30
// }

interface Person {
    name: string;
    age: number;
    isTrue: boolean;
    disc?: any
}

// FUNCTIONS
function greeting(name: string): string {
    return 'Hello ' + name;
}

greeting('John');
// greeting(123);

function someFunction(value: string | number) {
    return 'Hello';
}

someFunction(1);
// someFunction(true);

// UTILITY TIPES - самодельные типы
type Suit = "Diamonds" | "Clubs" | "Spades";

const clubs: Suit = "Clubs";
// const hearts: Suit = "Hearts";