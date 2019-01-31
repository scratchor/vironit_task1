import Component from './componentClass.js'

// inherited from Component class Person
PersonUp.prototype = Object.create(Component.prototype)
PersonUp.prototype.constructor = PersonUp

export default function PersonUp (time, params) {
  this.time = time
  this.params = params

  this.params.parent = document.querySelector('.field')

  Component.call(this)
}
