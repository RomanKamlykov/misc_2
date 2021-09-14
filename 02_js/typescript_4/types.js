console.log('Hello from ts!');
// ----  string
var myString;
myString = 'Hello World!';
// myString = 1; // error
console.log(myString);
// ---- number
var myNum;
myNum = 2;
// myNum = '2'; // error
console.log(myNum);
// ---- boolean
var myBool;
myBool = true;
// myBool = 1; // error
console.log(myBool);
// ---- any
var myVar;
myVar = 5;
myVar = 'hello';
myVar = false;
// ---- array
var strArr;
strArr = ['a', 'b', 'c'];
// strArr = ['a', 2, 'c']; // error
var numArr;
numArr = [1, 2, 3];
// numArr = ['a', 2, 3]; // error
// ---- tuple
var myTuple;
myTuple = ['a', 2];
// myTuple = ['a', 2, 3]; // error
// myTuple = [1, 'b']; // error
// ---- void, null, undefined
var myVoid;
myVoid = undefined; // ok
myVoid = null; // ok
// myVoid = 1; // error
var myNull;
var myUndefined;
myNull = undefined; // ok
myUndefined = null; // ok
