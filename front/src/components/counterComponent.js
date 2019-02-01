import Component from './componentClass.js'

// inherited from Component class Counter
Counter.prototype = Object.create(Component.prototype)
Counter.prototype.constructor = Counter

export default function Counter (idNum, counterNum) {
  this.params = {
    element: 'div',
    elClass: 'counter',
    id: `counter${idNum}`,
    parent: document.getElementById(`atm${idNum}`),
    textContent: `${counterNum || 0}`
  }
  this.greenCard = false
  Component.call(this)
};
