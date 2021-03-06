import Component from './componentClass.js'

// inherited from Component class DeleteButton
DelButComponent.prototype = Object.create(Component.prototype)
DelButComponent.prototype.constructor = DelButComponent

export default function DelButComponent (idNum) {
  this.params = {
    element: 'i',
    elClass: ['fas', 'fa-times', 'fa-2x'],
    id: `delBut${idNum}`,
    parent: document.getElementById(`atm${idNum}`)
  }

  Component.call(this);
  this.element.addEventListener('click', this.handleClick.bind(this));
  this.click = false
};

DelButComponent.prototype.handleClick = function () {
  if (!this.click) {
    this.click = true
    this.emit('delAtm')
  }
};
