class Animal {
  constructor(name, color) {
    this.id = Math.random();
    this.name = name;
    this.color = color;
  }

  update(name, color) {
    this.name = name;
    this.color = color;
  }
}

let animalsArray = [];

module.exports = { Animal, animalsArray };
