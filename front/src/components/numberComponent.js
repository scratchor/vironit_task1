import Component from './componentClass.js'

NumberComponent.prototype = Object.create(Component.prototype)
NumberComponent.prototype.constructor = NumberComponent

export default function NumberComponent () {
  this.params = {
    element: 'p',
    elClass: 'p_info',
    id: null,
    parent: document.querySelector('.buttons'),
    textContent: 'Цифра 1 соотвествует 1 секунде'
  }

  Component.call(this)
}
