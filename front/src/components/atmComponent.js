import Component from './componentClass.js'
import Counter from './counterComponent.js'
import DelButComponent from './delButComponent.js'
import Light from './lightConponent.js'
import Atm from '../core/atm.js'
import store from '../index'

// inherited from Component class AtmComponent
AtmComponent.prototype = Object.create(Component.prototype)
AtmComponent.prototype.constructor = AtmComponent

export default function AtmComponent (idNum, counterNum) {
  this.params = {
    element: 'div',
    elClass: 'cash_mashine',
    id: `atm${idNum}`,
    parent: document.querySelector(`.atm_wrapper`)
  }
  Component.call(this)
  store.add(this)

  if (this.store.observerList.update) {
    this.element.addEventListener('click', this.openAtm.bind(this))
  }
  this.atmParent = this
  this.atm = new Atm(`atm${idNum}`, this.atmParent, counterNum)

  this.delBut = new DelButComponent(idNum);
  this.counter = new Counter(idNum, counterNum);
  this.light = new Light(idNum);

  this.on('delAtm', (i) => {
    console.log(`Delete ATM${idNum}`)
    this.delBut.element.removeEventListener('click', this.delBut.handleClick)
    if (this.atm.isfree) {
      console.log(`ATM${idNum} was free and quickly deleted`)
      this.updateParams({ element: null })
      this.store.emit('deleteLogicAtm', this, i)
    } else {
      console.log('Обработчик дал команду на удаление')
      this.atm.comandToStop = true
      const timerId = setInterval(() => {
        if (this.atm.confirmTostop) {
          this.updateParams({ element: null })
          this.store.emit('deleteLogicAtm', this, i)
          clearInterval(timerId)
          console.log(`ATM${idNum} was deleted`)
        };
      }, 10)
    };
  })

  this.on('openAtm', (id) => {
    window.location.hash = `#statRoute/${id}`
  })
};

AtmComponent.prototype.openAtm = function () {
  this.emit('openAtm', this.element.id)
}
