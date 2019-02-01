import EventEmitter from './eventEmitter'
import axios from 'axios'
import AtmComponent from '../components/atmComponent'
import PersonUp from '../components/personUpComponent'
import MainRouter from '../routerComponents/mainRouter'
import StatRoute from '../routerComponents/statRouter'

// store is global storage
Store.prototype = Object.create(EventEmitter.prototype)
Store.prototype.constructor = Store

function Store (emitter, queue) {
  EventEmitter.call(this)
  this.observerList = {
    AtmComponent: [],
    router: undefined,
    overloadNum: 0,
    freeQueue1: true,
    personNum: 1,
    nameNum: 1,
    starTime: 2,
    endTime: 4,
    update: true,
    loadAtmsId: [],
    loadAtmsCounter: [],
    greenCardAtm: undefined
  }

  this.emitter = emitter
  this.queue = queue

  // store subscription
  this.on('delAtm', (idNum) => {
    const сomponent = this.observerList.AtmComponent.find(e => e.atm.num === idNum)
    const i = this.observerList.AtmComponent.indexOf(сomponent)
    сomponent.emit('delAtm', i)
  })
  this.on('deleteLogicAtm', (obj, i) => {
    this.observerList.AtmComponent.splice(i, 1)
    this.emit('dataTransfer', 'delete', obj.params.id, 'Failed to delete atm in database')
  })
  this.on('dataTransfer', (req, id, msg, counter = 0) => {
    axios[`${req}`](`${req !== 'delete' ? 'http://localhost:3000/atm' : `http://localhost:3000/atm?atmID=${id}`}`, {
      atmID: `${id}`,
      counter: `${counter}`
    })
      .catch((err) => console.log(`${msg} \n` + err.stack))
  })
  this.on('drawExistingAtm', () => {
    const length = this.observerList.AtmComponent.length
    this.observerList.AtmComponent.forEach((e) => {
      const atmComponent = new AtmComponent(e.atm.num, e.atm.served)
      atmComponent.atm = e.atm
      atmComponent.atm.ref = atmComponent.atmParent
      if (!e.atm.isfree && e.atm.manInAtm) {
        const person1 = e.atm.deleteOnService()
        const person = new PersonUp(person1.time, person1.params)
        atmComponent.light.updateParams({ backgroundColor: 'red' })
        person.updateParams({ elClass: 'manInAtm', parent: document.getElementById(`atm${e.atm.num}`) })
        atmComponent.atm.addOnService(person)
      }
    })
    this.observerList.AtmComponent.splice(0, length)
    this.queue.queue.forEach(e => {
      new PersonUp(e.time, e.params)
    })
  })
  this.on('createAtm', () => {
    if (this.observerList.loadAtmsId.length > 0) {
      while (this.observerList.loadAtmsId.some(e => e === this.observerList.nameNum)) {
        this.observerList.nameNum++
      }
    }
    const id = this.observerList.nameNum
    this.observerList.nameNum++
    new AtmComponent(id)
    this.emit('dataTransfer', 'post', `atm${id}`, 'Failed to create new atm in database')
  })
  this.on('createLoadAtm', (i) => {
    const id = this.observerList.loadAtmsId[i]
    const counter = this.observerList.loadAtmsCounter[i]
    new AtmComponent(id, counter)
  })
  this.on('input', (obj) => {
    const inputNum = obj.params.elClass.match(/\d+/g)[0]
    inputNum === '1' ? this.observerList.starTime = obj.element.value : this.observerList.endTime = obj.element.value
  })
  this.on('getClient', () => {
    const person = this.queue.emit('getClient')
    return person
  })
  this.on('free', () => {
    this.queue.emit('free')
  })
  this.on('chooseRoute', () => {
    this.changeUpdateToTrue()
    this.observerList.router.updateParams({ element: null })
    if (window.location.hash === '') {
      new MainRouter()
      this.emit('drawExistingAtm')
      console.log(this.observerList.router)
    } else {
      const idNum = +window.location.hash.match(/\d+/g)[0]
      let atmComponent = this.observerList.AtmComponent.find(e => e.atm.num === idNum)
      const counterNum = atmComponent.atm.served
      const state = atmComponent.atm.isfree
      new StatRoute(idNum, counterNum, state)
      atmComponent = this.observerList.AtmComponent.find(e => e.atm.num === idNum)
      atmComponent.greenCard()
      console.log(this.observerList.router)
      this.changeUpdateToFalse()
    }
  })
}

// store methods
Store.prototype.add = function (data, val) {
  if (data instanceof Object) {
    if (data.constructor.name === 'AtmComponent') {
      this.observerList.AtmComponent.push(data)
    } else {
      this.observerList.router = data
    }
  } else {
    this.observerList[data] = val
  }
}

Store.prototype.replaceAtmComponent = function (obj) {
  const atmComponent = this.observerList.AtmComponent.find(e => e.element.id === obj.element.id)
  const i = this.observerList.AtmComponent.indexOf(atmComponent)
  obj.atm = atmComponent.atm
  obj.atm.ref = obj.atmParent
  this.observerList.AtmComponent.splice(i, 1, obj)
}

Store.prototype.count = function (obj) {
  return this.observerList[obj].length
}

Store.prototype.changeUpdateToTrue = function () {
  this.observerList.update = true
}

Store.prototype.changeUpdateToFalse = function () {
  this.observerList.update = false
}

export default Store
