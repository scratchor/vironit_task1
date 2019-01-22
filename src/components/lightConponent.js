import Component from './componentClass.js'

// inherited from Component class Light
Light.prototype = Object.create(Component.prototype)
Light.prototype.constructor = Light

export default function Light (idNum) {
  this.params = {
    element: 'div',
    elClass: 'light',
    id: `light${idNum}`,
    parent: document.getElementById(`atm${idNum}`),
    backgroundColor: 'green'
  }
};
