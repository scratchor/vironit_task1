import Component from './componentClass.js'

// inherited from Component class Person
Person.prototype = Object.create(Component.prototype)
Person.prototype.constructor = Person

export default function Person (idNum) {
  this.time = Math.random() * 1000 + 3000
  this.params = {
    element: 'div',
    elClass: 'man',
    id: `person${idNum}`,
    parent: document.querySelector('.field')
  }
};
