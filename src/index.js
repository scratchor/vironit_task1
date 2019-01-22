
import './css/style.css'
import AtmComponent from './components/atmComponent.js'
import Counter from './components/counterComponent.js'
import DelButComponent from './components/delButComponent.js'
import Light from './components/lightConponent.js'
import Person from './components/personComponent.js'
import EventEmitter from './core/eventEmitter.js'
import Atm from './core/atm.js'
import Queue from './core/queue.js'

const emitter = new EventEmitter()

const queue1 = new Queue()

document.addEventListener('DOMContentLoaded', ready)

function ready () {
  queue1.on('add', () => controller.atms.forEach(e => queue1.checkClient() && e.isfree ? e.checkStatus() : false))
  controller.addOnCreate()
  emitter.emit('createAtm')
  emitter.emit('createAtm')
  controller.addCreateListener()
  controller.addOnDelete()
  controller.addOnInput()
  controller.addInputListener()
  controller.promiseOverload()
  controller.promiseFreeQueue()
  controller.drawPerson()
}

const controller = {

  atms: [],
  atmComponents: [
    [],
    [],
    [],
    []
  ],
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
      let light = controller.atmComponents[3].find(e => e.params.id === `light${obj.num}`)
      light.updateParams({ backgroundColor: 'green' })
    })
    obj.on('free', () => {
      const person = queue1.getClient()
      if (person) {
        controller.overloadNum--
        obj.addOnService(person)
        obj.changeStatus(undefined, obj)
        setTimeout(function () {
          person.updateParams({ elClass: 'manInAtm', parent: document.getElementById(`atm${obj.num}`) })
          console.log(`ATM${obj.num}: Очередь уменьшилась на 1 человека`)
          let counter = controller.atmComponents[2].find(e => e.params.id === `counter${obj.num}`)
          counter.updateParams({ textContent: `${+counter.params.textContent + 1}` })
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
      let light = controller.atmComponents[3].find(e => e.params.id === `light${obj.num}`)
      light.updateParams({ backgroundColor: 'red' })
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

  addOnDelete: function () {
    emitter.on('delAtm', (x) => {
      if (!x) {
        var idNum = controller.atms[controller.atms.length - 1].num
        console.log(`Delete ATM${idNum}`)
      } else {
        const event = x
        idNum = +event.currentTarget.id.split('').slice(3, event.currentTarget.id.length).join('')
        console.log(`Delete ATM${x}`)
      }
      let cashMasine = document.getElementById(`atm${idNum}`)
      cashMasine.removeEventListener('click', controller.deleteListenerHandler)
      const atm = controller.atms.filter(e => e.name === `atm${idNum}`)[0]
      if (atm.isfree) {
        console.log(`ATM${idNum} was free and quickly deleted`)
        controller.deleteCashMashineFromDom(idNum)
        controller.deleteCashMashineFromLogic(idNum)
      } else {
        console.log('Обработчик дал команду на удаление')
        atm.comandToStop = true
        const timerId = setInterval(() => {
          if (atm.confirmTostop) {
            controller.deleteCashMashineFromDom(idNum)
            controller.deleteCashMashineFromLogic(idNum)
            clearInterval(timerId)
            console.log('обработчик удалён')
          };
        }, 10)
      };
    })
  },

  addDeleteListener: function (x) {
    let cashMasine = document.getElementById(`atm${x}`)
    cashMasine.addEventListener('click', controller.deleteListenerHandler)
  },

  deleteListenerHandler: function (x) {
    emitter.emit('delAtm', x)
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
    const atm = new Atm(`atm${x}`)
    const atmComponent = new AtmComponent(x)
    atmComponent.updateParams()
    const counterComponent = new Counter(x)
    const lightComponent = new Light(x)
    const delButComponent = new DelButComponent(x)
    controller.atmComponents[0].push(atmComponent)
    controller.atmComponents[1].push(delButComponent)
    controller.atmComponents[2].push(counterComponent)
    controller.atmComponents[3].push(lightComponent)
    delButComponent.updateParams()
    counterComponent.updateParams()
    lightComponent.updateParams()
    controller.atms.push(atm)
    controller.addAtmsEvents(atm)
    controller.addDeleteListener(x)
  },

  deleteCashMashineFromDom: function (idNum) {
    const atmComponent = controller.atmComponents[0].find(e => e.params.id === `atm${idNum}`)
    atmComponent.updateParams({ element: null })
  },

  deleteCashMashineFromLogic: function (idNum) {
    const atm = controller.atms.filter(e => e.name === `atm${idNum}`)[0]
    const i = controller.atms.indexOf(atm)
    controller.atms = controller.atms.filter(e => e !== atm)
    controller.atmComponents[0].splice(i, 1)
    controller.atmComponents[1].splice(i, 1)
    controller.atmComponents[2].splice(i, 1)
    controller.atmComponents[3].splice(i, 1)
  },

  promiseOverload: function () {
    new Promise((resolve) => {
      queue1.on('overload', () => resolve(emitter.emit('createAtm')))
    })
  },

  promiseFreeQueue: function () {
    new Promise((resolve) => {
      queue1.on('free', () => resolve(emitter.emit('delAtm', null)))
    })
  }

}
