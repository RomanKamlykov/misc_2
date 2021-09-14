// #1 - округление в нижнюю сторону
let n1 = 445.67;
console.log(Math.floor(n1));
console.log(~~n1);

// #2 - возведение числа в степень
let n2 = 3;
console.log(Math.pow(n2, 3));
console.log(n2**3);

// #3 - перевод из строки в число, записи не равнозначны
let n3 = '3';
console.log(parseInt(n3));
console.log(+n3);

// #4 - сокращенная запись выражения if
let n4 = true;
if (n4 === true) { console.log('#4'); }
n4 && console.log('#4');

// #5 - перевод числа в строку
let n5 = 3;
console.log(n5.toString());
console.log(`${n5}`);
// доп
console.log(String(n5));
console.log(n5 + "");

// #6 - вызов функции по условию
function f6_1() { console.log('#6_1'); }
function f6_2() { console.log('#6_2'); }

let n6 = 6;
if (n6 === 7) {
  f6_1();
} else {
  f6_2();
}

(n6 === 7 ? f6_1 : f6_2)();

// #7 - проверка наличия аргумента
function f7_1(param) {
  if(param === undefined) {
    throw new Error('problem');
  }
  return param;
}

// f7_1();
console.log(f7_1(7));

// делает отдельную функцию на весь код
function checkParam() { throw new Error('problem'); }
function f7_2(param = checkParam()) {
  return param;
}

f7_2(7);

// #8 - получение символа строки
let n8 = 'sample string';
console.log(n8.charAt(3));
console.log(n8[3]);

// #9 - запись строки в несколько строк
let n9 = `Hello
world
!`;
console.log(n9);

// #10 - default value для переменных
let n10 = 34;
let result = n10 || false;
console.log(result);