export default function EventEmitter () {
  this.eventTable = {}
}

EventEmitter.prototype.on = function (event, func) {
  !this.eventTable[event] ? this.eventTable[event] = [] : true
  this.eventTable[event].push(func)
}

EventEmitter.prototype.unsubscribe = function (event) {
  this.eventTable = Object.keys(this.eventTable).filter(e => e !== event)
}

EventEmitter.prototype.emit = function (event, ...rest) {
  let res
  if (this.eventTable[event]) {
    this.eventTable[event].forEach(func => {
      const result = func.call(null, ...rest)
      if (result) {
        res = result
      }
    })
  }
  return res
}
