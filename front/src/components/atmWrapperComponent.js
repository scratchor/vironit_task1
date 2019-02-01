import Component from './componentClass.js'

// inherited from Component class Counter
AtmWrapper.prototype = Object.create(Component.prototype)
AtmWrapper.prototype.constructor = AtmWrapper

export default function AtmWrapper () {
  this.params = {
    element: 'div',
    elClass: 'atm_wrapper',
    id: null,
    parent: document.querySelector('.field')
  }

  Component.call(this)
}
