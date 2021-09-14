
function logging(message) {
  console.log(message);
}

const message_1 = 'Hello world';

logging(message_1);

// Types
let count_1 = 5; // type by inference is number
// count_1 = 'a'; // error

// explicit types
let a: number;
let b: boolean;
let c: string;
let d: any;
let e: Array<number>

// Enums
const ColorRed = 0;
const ColorGreen = 1;
const ColorBlue = 2;

// элементы enum неявно получают индексы 0,1,2, все сложно...
enum Color { Red, Green, Blue }
let backgroundColor = Color.Blue;

// Type Assertions
let str;
str = 'abc';
let endsEithC_1 = str.endsWith('c');
// в этой ситуации тип переменной any и мы не получаем автодополнение/IntelliSense
// используем type assertion для уточнения типа
// 1 вариант
let endsEithC_2 = (<string>str).endsWith('c');
// 2 вариант
let endsEithC_3 = (str as string).endsWith('c');

// пример со значением возвращаемого типа
const myCanvas_1 = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas_2 = <HTMLCanvasElement>document.getElementById("main_canvas");

// Interfaces
interface Point {
  x: number;
  y: number;
}

let drawPoint = (point: Point) => {
  // ...
}

let getDistance = (pointA: Point, pointB: Point) => {
  // ...
}

// Cohesion - концепция в ООП, связанные вещи должны быть частью одного целого.
// интерфейс Point и функции drawPoint и getDistance нарушают принцип Cohesion
// необходимо объединить их в один класс
// interface используются только для определения типов и не могут содержать имплементацию
interface Point2 {
  x: number;
  y: number;
  draw: () => void;
}
// создадим класс
// содержит fields and methods
class Point3 {
  x: number;
  y: number;
  draw() {
    // ...
  }
  getDistance() {
    // ...
  }
}

let point3 = new Point3();
point3.x = 1;
point3.y = 2;
point3.draw();

// Constructors
// можем сделать параметр опциональным
// можем сделать поле "приватным", для этого используем access modifier
// в ts доступны access modifier: public (default), private, protected
class Point4 {
  private x: number;
  y: number;

  constructor(x: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    console.log('x: ' + this.x + ', y: ' + this.y);
  }
}

let point4 = new Point4(1, 2);

// в ts можем описать класс по другому
class Point5 {
  constructor(private x: number, public y?: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    console.log('x: ' + this.x + ', y: ' + this.y);
  }
}

class Point6 {
  constructor(private x: number, public y?: number) {
    // происходит неявное присвоение this.x = x;
  }

  draw() {
    console.log('x: ' + this.x + ', y: ' + this.y);
  }
}

// Геттеры и Сеттеры
class Point7 {
  constructor(private x: number, public y?: number) { }
  get X() {
    return this.x;
  }
  set X(value) {
    this.x = value;
  }
  draw() {
    console.log('x: ' + this.x + ', y: ' + this.y);
  }
}

let point7 = new Point7(1, 2);
point7.X = 10;
