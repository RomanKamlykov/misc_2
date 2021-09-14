// ---- -----
// ---- class
// ---- -----
class User {
  // a list of an object keys
  name: string;
  email: string;
  private age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;

    console.log('User created: '+ this.name);
  }

  register() {
    console.log(this.name + ' is now registered');
  }

  payInvoice() {
    console.log(this.name + ' paid invoice');
  }
}

let john = new User('John Doe', 'jdoe@gmail.com', 20);
// console.log(john.age); // error
john.register();

// ---- -------
// ---- extends
// ---- -------
class Member extends User {
  id: number;

  constructor(name: string, email: string, age: number, id: number) {
    super(name, email, age);
    this.id = id;
  }

  payInvoice() {
    super.payInvoice();
  }
}
let mike = new Member('Mike Smith', 'mike@gmail.com', 23, 4445);
mike.payInvoice();

// ---- ---------
// ---- interface
// ---- ---------
// нельзя добавить private ?!
interface UserInterface {
  name: string;
  email: string;
  age: number;
  register();
  payInvoice;
}
class User2 implements UserInterface {
  name: string;
  email: string;
  age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;

    console.log('User created: '+ this.name);
  }

  register() {
    console.log(this.name + ' is now registered');
  }

  payInvoice() {
    console.log(this.name + ' paid invoice');
  }
}
