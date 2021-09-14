console.log('Hello from ts!');

// ----  string
let myString: string;
myString = 'Hello World!'
// myString = 1; // error
console.log(myString);

// ---- number
let myNum: number;
myNum = 2;
// myNum = '2'; // error
console.log(myNum);

// ---- boolean
let myBool: boolean;
myBool = true;
// myBool = 1; // error
console.log(myBool);

// ---- any
let myVar: any;
myVar = 5;
myVar = 'hello';
myVar = false;

// ---- array
let strArr: string[];
strArr = ['a', 'b', 'c'];
// strArr = ['a', 2, 'c']; // error
let numArr: Array<number>;
numArr = [1, 2, 3];
// numArr = ['a', 2, 3]; // error

// ---- tuple
let myTuple: [string, number];
myTuple = ['a', 2];
// myTuple = ['a', 2, 3]; // error
// myTuple = [1, 'b']; // error

// ---- void, null, undefined
let myVoid: void;
myVoid = undefined; // ok
myVoid = null; // ok
// myVoid = 1; // error

let myNull: null;
let myUndefined: undefined;
myNull = undefined; // ok
myUndefined = null; // ok
