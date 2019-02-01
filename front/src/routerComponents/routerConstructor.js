import Component from '../components/componentClass'
import InputComponent from '../components/inputComponent.js'
import ButtonsWrapper from '../components/butWrapperComponent'
import NumberComponent from '../components/numberComponent'
import AtmWrapper from '../components/atmWrapperComponent'
import store from '../index'

// inherited from Component class RouterConstructor - class designed for creating Routers
RouterConstructor.prototype = Object.create(Component.prototype)
RouterConstructor.prototype.constructor = RouterConstructor

export default function RouterConstructor () {
  this.params = {
    element: 'div',
    elClass: 'field',
    id: null,
    parent: document.body
  }

  Component.call(this)
  store.add(this)

  this.buttonsWrap = new ButtonsWrapper()
  this.number = new NumberComponent()
  this.input1 = new InputComponent(1)
  this.input2 = new InputComponent(2)
  this.atmWrap = new AtmWrapper()
}
