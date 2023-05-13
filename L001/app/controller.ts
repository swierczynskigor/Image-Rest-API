const { animalsArray, Animal } = require("./model");

module.exports = {
  add: (name, color) => {
    // utwórz obiekt klasy Animal
    // dodaj do animalsArray
    animalsArray.push(new Animal(name, color));
  },
  delete: (id) => {
    // usuwanie po id z animalsArray
  },
  update: (id) => {
    // update po id elementu animalsArray
  },
  getall: () => {
    return animalsArray;
  },
};
