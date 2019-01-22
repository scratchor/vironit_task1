import Component from './componentClass.js'

// inherited from Component class Counter
Counter.prototype = Object.create(Component.prototype)
Counter.prototype.constructor = Counter

export default function Counter (idNum) {
  this.params = {
    element: 'div',
    elClass: 'counter',
    id: `counter${idNum}`,
    parent: document.getElementById(`atm${idNum}`),
    textContent: '0'
  }

  Component.call(this);
};
