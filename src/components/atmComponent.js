import Component from './componentClass.js'

// inherited from Component class AtmComponent
AtmComponent.prototype = Object.create(Component.prototype)
AtmComponent.prototype.constructor = AtmComponent

export default function AtmComponent (idNum) {
  this.params = {
    element: 'div',
    elClass: 'cash_mashine',
    id: `atm${idNum}`,
    parent: document.querySelector(`.atm_wrapper`)
  }
};
