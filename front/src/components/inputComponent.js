import Component from './componentClass.js'

InputComponent.prototype = Object.create(Component.prototype)
InputComponent.prototype.constructor = InputComponent

export default function InputComponent (num) {
  this.params = {
    element: 'input',
    elClass: `input${num}`,
    id: null,
    type: 'text',
    parent: document.querySelector(`.buttons`)
  };

  Component.call(this);

  if (this.store.observerList.update) {
    this.element.addEventListener('input', this.handleClick.bind(this));
  }
}

InputComponent.prototype.handleClick = function () {
  this.store.emit('input', this)
}
