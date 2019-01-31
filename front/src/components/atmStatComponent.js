import Component from './componentClass.js'
import Counter from './counterComponent.js'
import Light from './lightConponent.js'
import Atm from '../core/atm.js'
import controller from '../index.js'

// inherited from Component class AtmComponent
AtmStatComponent.prototype = Object.create(Component.prototype)
AtmStatComponent.prototype.constructor = AtmStatComponent

export default function AtmStatComponent (idNum, counterNum) {
  this.params = {
    element: 'div',
    elClass: 'cash_mashine',
    id: `atm${idNum}`,
    parent: document.querySelector(`.atm_wrapper`)
  };

  Component.call(this);

  this.element.addEventListener('click', this.openMainRoute.bind(this))

  this.atmParent = this
  this.counter = new Counter(idNum, counterNum);
  this.light = new Light(idNum)

  this.on('openMainRoute', () => {
    location.hash = ''
  })
};

AtmStatComponent.prototype.openMainRoute = function () {
  this.emit('openMainRoute')
}
