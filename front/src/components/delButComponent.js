import Component from './componentClass.js'
import controller from '../index.js'

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
  this.idNum = idNum

  Component.call(this)
  if (this.store.observerList.update) {
    this.element.addEventListener('click', this.handleClick.bind(this));
  }
  this.click = false
}

DelButComponent.prototype.handleClick = function (e) {
  if (!this.click) {
    this.click = true
    e.stopPropagation()
    this.store.emit('delAtm', this.idNum)
  }
}
