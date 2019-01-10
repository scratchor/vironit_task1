function EventEmitter() {
  
  this.eventTable = {};
  
};

EventEmitter.prototype.on  = function(event, func) {
    !this.eventTable[event] ? this.eventTable[event] = [] : true; // тернарник лучше использовать для получения значений... в этом случае более читабельно будет if then else
    this.eventTable[event].push(func);
  };

  EventEmitter.prototype.unsubscribe = function(event) {
    this.eventTable = Object.keys(this.eventTable).filter(event => event !== event);
  };

  EventEmitter.prototype.emit = function(event, data) {
    if(this.eventTable[event]) {
      this.eventTable[event].forEach(func => func.call(null, data));
    }
  };


  Atm.prototype = Object.create(EventEmitter.prototype);
  Atm.prototype.constructor = Atm;

  function Atm(name) {
    EventEmitter.call(this);
    this.name = name;
    this.served = 0;
    this.isfree = true;
        
  };

   Atm.prototype.checkStatus = function() {      
      this.isfree ? this.emit('free') : this.emit('busy');                   
  };




