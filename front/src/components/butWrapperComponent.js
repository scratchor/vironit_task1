import Component from './componentClass.js'

// inherited from Component class Counter
ButtonsWrapper.prototype = Object.create(Component.prototype)
ButtonsWrapper.prototype.constructor = ButtonsWrapper

export default function ButtonsWrapper () {
  this.params = {
    element: 'div',
    elClass: 'buttons',
    id: null,
    parent: document.querySelector('.field')
  }

  Component.call(this)
}
