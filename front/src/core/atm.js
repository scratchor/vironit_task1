import EventEmitter from './eventEmitter.js'

Atm.prototype = Object.create(EventEmitter.prototype)
Atm.prototype.constructor = Atm

export default function Atm (name, ref, served, num) {
  EventEmitter.call(this)
  this.name = name
  this.num = num
  this.served = served || 0
  this.isfree = true
  this.comandToStop = false
  this.confirmTostop = false
  this.OnService = []
  this.ref = ref
  this.manInAtm = false

  // atm subscription
  this.addAtmsEvents()
};

Atm.prototype.addOnService = function (data) {
  this.OnService.push(data)
}

Atm.prototype.changeManInAtm = function () {
  if (this.manInAtm) {
    this.manInAtm = false
  } else {
    this.manInAtm = true
  }
}

Atm.prototype.getOnService = function () {
  return this.OnService[0]
}

Atm.prototype.deleteOnService = function () {
  return this.OnService.shift()
}

Atm.prototype.addServedClient = function () {
  this.served++
}

Atm.prototype.getServedClient = function () {
  return this.served
}

Atm.prototype.checkStatus = function () {
  if (this.isfree) {
    this.emit('free')
  } else {
    this.emit('busy')
  }
}

Atm.prototype.changeStatus = function (time, obj) {
  if (time) {
    setTimeout(function () {
      if (this.isfree) {
        this.isfree = false
      } else {
        this.isfree = true
      };
      if (this.comandToStop) {
        this.confirmTostop = true
        console.log(`Confirm to stop from ${this.name}`)
        return
      };
      obj.checkStatus()
    }.bind(this), time)
  } else {
    if (this.isfree) {
      this.isfree = false
    } else {
      this.isfree = true
    }
    obj.checkStatus()
  }
}

// atm main logic
Atm.prototype.addAtmsEvents = function () {
  this.on('free', () => {
    const person = this.deleteOnService()
    if (person) {
      person.updateParams({ element: null })
      this.changeManInAtm()
    };
  })
  this.on('free', () => {
    this.ref.light.updateParams({ backgroundColor: 'green' })
  })
  this.on('free', () => {
    const person = this.ref.store.emit('getClient')
    if (person) {
      this.changeStatus(null, this)
      if (this.ref.store.observerList.overloadNum <= 0) {
        this.ref.store.observerList.overloadNum = 0
      } else {
        this.ref.store.observerList.overloadNum--
      }
      this.addOnService(person)
      setTimeout(function () {
        person.updateParams({ elClass: 'manInAtm', parent: document.getElementById(`atm${this.num}`) })
        this.changeManInAtm()
        console.log(`ATM${this.num}: Очередь уменьшилась на 1 человека`)
        this.ref.counter.updateParams({ textContent: `${+this.ref.counter.params.textContent + 1}` })
        this.addServedClient()
        this.ref.store.emit('dataTransfer', 'put', `atm${this.num}`, 'Failed to update atm counter in database counter', this.getServedClient())
        this.changeStatus(person.time, this)
      }.bind(this), 1000)
    } else {
      this.ref.store.observerList.freeQueue1 = true
      setTimeout(() => {
        if (this.ref.store.observerList.freeQueue1 === true) {
          this.ref.store.emit('free')
        }
      }, 4000)
    };
  })
  this.on('busy', () => setTimeout(function () {
    this.ref.light.updateParams({ backgroundColor: 'red' })
  }.bind(this), 1000))
}
