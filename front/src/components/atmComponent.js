import Component from './componentClass.js'
import Counter from './counterComponent.js'
import DelButComponent from './delButComponent.js'
import Light from './lightConponent.js'
import Atm from '../core/atm.js'
import controller from '../index.js'

// inherited from Component class AtmComponent
AtmComponent.prototype = Object.create(Component.prototype)
AtmComponent.prototype.constructor = AtmComponent

export default function AtmComponent (idNum, counterNum) {
  this.params = {
    element: 'div',
    elClass: 'cash_mashine',
    id: `atm${idNum}`,
    parent: document.querySelector(`.atm_wrapper`)
  };

  Component.call(this);

  this.atmParent = this;
  this.atm = new Atm(`atm${idNum}`, this.atmParent, counterNum)

  this.delBut = new DelButComponent(idNum);
  this.counter = new Counter(idNum, counterNum);
  this.light = new Light(idNum);

  this.delBut.on('delAtm', () => this.emit('delAtm'));

  this.on('delAtm', () => {
    console.log(`Delete ATM${idNum}`)
    this.delBut.element.removeEventListener('click', this.delBut.handleClick)
    if (this.atm.isfree) {
      console.log(`ATM${idNum} was free and quickly deleted`)
      this.updateParams({ element: null })
      this.deleteCashMashineFromLogic()
    } else {
      console.log('Обработчик дал команду на удаление')
      this.atm.comandToStop = true
      const timerId = setInterval(() => {
        if (this.atm.confirmTostop) {
          this.updateParams({ element: null })
          this.deleteCashMashineFromLogic()
          clearInterval(timerId)
          console.log(`ATM${idNum} was deleted`)
        };
      }, 10)
    };
  })
};

AtmComponent.prototype.deleteCashMashineFromLogic = function () {
  const atm = controller.atms.find(e => e.params.id === this.params.id);
  const i = controller.atms.indexOf(atm)
  controller.atms.splice(i, 1)
  controller.dataTransfer('delete', this.params.id, 'Failed to delete atm in database')
};
