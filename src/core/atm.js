import EventEmitter from './eventEmitter.js'

Atm.prototype = Object.create(EventEmitter.prototype)
Atm.prototype.constructor = Atm

export default function Atm (name, ref) {
  EventEmitter.call(this)
  this.name = name
  // Лучше передавать num отвельно
  this.num = +this.name.split('').slice(3, this.name.length).join('')
  this.served = 0
  this.isfree = true
  this.comandToStop = false
  this.confirmTostop = false
  this.OnService = []
  this.ref = ref
};

Atm.prototype.addOnService = function (data) {
  this.OnService.push(data)
}

Atm.prototype.deleteOnService = function () {
  return this.OnService.shift()
}

Atm.prototype.addServedClient = function () {
  this.served++
}

Atm.prototype.checkStatus = function () {
  // Лучше использовать if, неочевидное название функции
  this.isfree ? this.emit('free') : this.emit('busy')
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
