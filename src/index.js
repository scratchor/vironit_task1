
import './css/style.css'
import AtmComponent from './components/atmComponent.js'
import Person from './components/personComponent.js'
import EventEmitter from './core/eventEmitter.js'
import Queue from './core/queue.js'

const emitter = new EventEmitter()

const queue1 = new Queue()

document.addEventListener('DOMContentLoaded', ready)

function ready () {
  queue1.on('add', () => controller.atms.forEach(e => queue1.checkClient() && e.atm.isfree ? e.atm.checkStatus() : false))
  controller.addOnCreate()
  emitter.emit('createAtm')
  emitter.emit('createAtm')
  controller.addCreateListener()
  controller.addOnInput()
  controller.addInputListener()
  controller.promiseOverload()
  controller.promiseFreeQueue()
  controller.drawPerson()
}

const controller = {
  atms: [],
  overloadNum: 0,
  freeQueue1: true,
  personNum: 1,
  nameNum: 1,
  starTime: 2,
  endTime: 4,

  addAtmsEvents: function (obj) {
    obj.on('free', () => {
      let person = obj.deleteOnService()
      if (person) {
        person.updateParams({ element: null })
      };
    })
    obj.on('free', () => {
      obj.ref.light.updateParams({ backgroundColor: 'green' })
    })
    obj.on('free', () => {
      const person = queue1.getClient()
      if (person) {
        obj.changeStatus(undefined, obj)
        controller.overloadNum <= 0 ? 0 : controller.overloadNum--
        obj.addOnService(person)
        setTimeout(function () {
          person.updateParams({ elClass: 'manInAtm', parent: document.getElementById(`atm${obj.num}`) })
          console.log(`ATM${obj.num}: Очередь уменьшилась на 1 человека`)
          obj.ref.counter.updateParams({ textContent: `${+obj.ref.counter.params.textContent + 1}` })
          obj.addServedClient()
          obj.changeStatus(person.time, obj)
        }, 1000)
      } else {
        controller.freeQueue1 = true
        setTimeout(() => {
          if (controller.freeQueue1 === true) {
            queue1.emit('free')
          }
        }, 4000)
      };
    })
    obj.on('busy', () => setTimeout(function () {
      obj.ref.light.updateParams({ backgroundColor: 'red' })
    }, 1000))
  },

  drawPerson: function () {
    setTimeout(() => {
      let person = new Person(controller.personNum)
      controller.personNum++
      queue1.addClient(person)
      controller.overloadNum++
      controller.freeQueue1 = false
      person.updateParams()
      queue1.emit('add')
      if (controller.overloadNum >= 10) {
        controller.overloadNum = 0
        queue1.emit('overload')
      };
      setTimeout(() => {
        controller.drawPerson()
      }, 500)
    }, (Math.random() * controller.starTime * 1000) + controller.endTime * 1000)
  },

  addOnInput: function () {
    const input1 = document.querySelector('.input1')
    const input2 = document.querySelector('.input2')
    emitter.on('input1', () => {
      controller.starTime = +input1.value
      console.log(controller.starTime)
    })
    emitter.on('input2', () => {
      controller.endTime = +input2.value
      console.log(controller.endTime)
    })
  },

  addInputListener: function () {
    const input1 = document.querySelector('.input1')
    const input2 = document.querySelector('.input2')
    input1.addEventListener('input', () => {
      emitter.emit('input1')
    })
    input2.addEventListener('input', () => {
      emitter.emit('input2')
    })
  },

  addOnCreate: function () {
    emitter.on('createAtm', () => {
      controller.createCashMashine()
    })
  },

  addCreateListener: function () {
    const buttonCreateAtm = document.querySelector('.buttonCreateAtm')
    buttonCreateAtm.addEventListener('click', () => {
      emitter.emit('createAtm')
    })
  },

  createCashMashine: function () {
    const x = controller.nameNum
    controller.nameNum++
    const atmComponent = new AtmComponent(x)
    controller.atms.push(atmComponent)
    controller.addAtmsEvents(atmComponent.atm)
  },

  promiseOverload: function () {
    new Promise((resolve) => {
      queue1.on('overload', () => resolve(emitter.emit('createAtm')))
    })
  },

  promiseFreeQueue: function () {
    new Promise((resolve) => {
      queue1.on('free', () => {
        const atm = controller.atms[controller.atms.length - 1]
        if (atm) {
          resolve(atm.emit('delAtm'))
        }
      })
    })
  }

}

export default controller;
