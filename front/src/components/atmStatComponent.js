import Component from './componentClass.js'
import Counter from './counterComponent.js'
import Light from './lightConponent.js'

// inherited from Component class AtmComponent
AtmStatComponent.prototype = Object.create(Component.prototype)
AtmStatComponent.prototype.constructor = AtmStatComponent

export default function AtmStatComponent (idNum, counterNum, state) {
  this.params = {
    element: 'div',
    elClass: 'cash_mashine',
    id: `atm${idNum}`,
    parent: document.querySelector(`.atm_wrapper`)
  };

  Component.call(this);

  this.element.addEventListener('click', this.openMainRoute.bind(this))
  this.atm = undefined
  this.atmParent = this
  this.counter = new Counter(idNum, counterNum)
  this.light = new Light(idNum, state)

  this.on('openMainRoute', () => {
    window.location.hash = ''
  })
  this.store.replaceAtmComponent(this)
};

AtmStatComponent.prototype.openMainRoute = function () {
  this.emit('openMainRoute')
}

AtmStatComponent.prototype.greenCard = function () {
  this.counter.greenCard ? this.counter.greenCard = false : this.counter.greenCard = true
  this.light.greenCard ? this.light.greenCard = false : this.light.greenCard = true
}
