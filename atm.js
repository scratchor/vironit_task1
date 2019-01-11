
Atm.prototype = Object.create(EventEmitter.prototype);
Atm.prototype.constructor = Atm;

function Atm(name) {
  EventEmitter.call(this); 
  this.name = name;
  this.num = +this.name[3];
  this.served = 0;
  this.isfree = true;        
};

Atm.prototype.addServedClient = function() {      
  this.served++;                  
};



Atm.prototype.checkStatus = function() {      
    this.isfree ? this.emit('free') : this.emit('busy');                   
};

// зачем obj? почему не использовать this
// тут либо до setTimeout сохранить в замыкании, например var self = this
// либо .bind(this) вместо obj
Atm.prototype.changeStatus = function(time, obj) {
  if(time) {
    setTimeout(function() {
      if(this.isfree) {
        this.isfree = false;
      } else {
        this.isfree = true;
      };
      // выше используешь this, а тут obj :). зачем тогда bind делал?
      obj.checkStatus(); 
    }.bind(obj), time);
  } else {
    if(this.isfree) {
      this.isfree = false;
    } else {
      this.isfree = true;
    }
    obj.checkStatus(); 
  }                      
};