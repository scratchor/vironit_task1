import EventEmitter from './eventEmitter.js'

Queue.prototype = Object.create(EventEmitter.prototype)
Queue.prototype.constructor = Queue

export default function Queue () {
  EventEmitter.call(this)
  this.queue = []

  this.on('getClient', () => {
    const person = this.getClient()
    return person
  })
}

Queue.prototype.addClient = function (data) {
  this.queue.push(data)
}

Queue.prototype.getQueueSize = function () {
  return this.queue.length
}

Queue.prototype.getClient = function () {
  return this.queue.shift()
}

Queue.prototype.checkClient = function () {
  return this.queue[0]
}

Queue.prototype.promiseOverload = function (store) {
  new Promise((resolve) => {
    this.on('overload', () => resolve(store.emit('createAtm')))
  })
}

Queue.prototype.promiseFreeQueue = function (store) {
  new Promise((resolve) => {
    this.on('free', () => {
      const atmComponent = store.observerList.AtmComponent[store.observerList.AtmComponent.length - 1]
      if (atmComponent) {
        resolve(store.emit('delAtm', atmComponent.atm.num))
      }
    })
  })
}
