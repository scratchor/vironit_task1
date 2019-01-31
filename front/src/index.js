import axios from 'axios'
import './css/style.css'
import Person from './components/personComponent.js'
import EventEmitter from './core/eventEmitter.js'
import Queue from './core/queue.js'
import MainRouter from './routerComponents/mainRouter'

import Store from './core/store'

const emitter = new EventEmitter()

const queue1 = new Queue()

const store = new Store(emitter, queue1)

queue1.promiseOverload(store)
queue1.promiseFreeQueue(store)

window.addEventListener('hashchange', () => { store.emit('chooseRoute') })
document.addEventListener('DOMContentLoaded', load)

function load () {
  new MainRouter()
  loadAtms()
}

function loadAtms () {
  axios.get('http://localhost:3000/atm')
    .then((atms) => {
      console.log(atms.data)
      ready(atms.data)
    })
    .catch((err) => console.log(err))
}

function ready (data) {
  queue1.on('add', () => store.observerList.AtmComponent.forEach(e => queue1.checkClient() && e.atm.isfree ? e.atm.checkStatus() : false))
  if (data.length > 0) {
    store.observerList.loadAtmsId = data.map(e => {
      const i = +e.atmID.split('').slice(3, e.atmID.length).join('')
      return i
    })
    store.observerList.loadAtmsCounter = data.map(e => e.counter)
    console.log(store.observerList.loadAtmsCounter)
    console.log(store.observerList.loadAtmsId)
    data.forEach((e, i) => store.emit('createLoadAtm', i))
  } else {
    let i = 0
    while (i < 2) {
      store.emit('createAtm')
      i++
    }
  }
  drawPerson()
}

function drawPerson () {
  setTimeout(() => {
    const person = new Person(store.observerList.personNum)
    store.observerList.personNum++
    queue1.addClient(person)
    store.observerList.overloadNum++
    store.observerList.freeQueue1 = false
    person.updateParams()
    queue1.emit('add')
    if (store.observerList.overloadNum >= 10) {
      store.observerList.overloadNum = 0
      queue1.emit('overload')
    };
    setTimeout(() => {
      drawPerson()
    }, 500)
  }, (Math.random() * store.observerList.starTime * 1000) + store.observerList.endTime * 1000)
}

export default store
