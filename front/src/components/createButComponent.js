import Component from './componentClass.js'

ButtonComponent.prototype = Object.create(Component.prototype)
ButtonComponent.prototype.constructor = ButtonComponent

export default function ButtonComponent () {
  this.params = {
    element: 'button',
    elClass: 'buttonCreateAtm',
    id: null,
    textContent: 'Create ATM',
    parent: document.querySelector(`.buttons`)
  };

  Component.call(this);

  if (this.store.observerList.update) {
    this.element.addEventListener('click', this.handleClick.bind(this));
  }
}

ButtonComponent.prototype.handleClick = function () {
  this.store.emit('createAtm')
}
