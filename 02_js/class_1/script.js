class Hero {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
  state = '123'
  greet() {
    return `${this.name} says hello.`;
  }
}

class Mage extends Hero {
  constructor(name, level, spell) {
    super(name, level);
    this.spell = spell;
  }
}

class Third extends Hero {
  constructor(name, level, spell) {
    super();
    this.name = name;
    this.level = level;
    this.spell = spell;
  }
}

let hero1 = new Hero('heroName', 'heroLvl');
let mage1 = new Mage('mageName', 'mageLvl', 'mageSpell');
let third1 = new Third('thirdName', 'thirdLvl', 'thirdSpell');