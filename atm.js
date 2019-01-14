
Atm.prototype = Object.create(EventEmitter.prototype);
Atm.prototype.constructor = Atm;

function Atm(name) {
  EventEmitter.call(this); 
  this.name = name;
  this.num = +this.name[3];
  this.served = 0;
  this.isfree = true;
  this.comandToStop = false;
  this.confirmTostop = false;        
};

Atm.prototype.addServedClient = function() {      
  this.served++;                  
};


Atm.prototype.checkStatus = function() {      
    this.isfree ? this.emit('free') : this.emit('busy');                   
};


Atm.prototype.changeStatus = function(time, obj) {
  if(time) {
    setTimeout(function() {
      if(this.isfree) {
        this.isfree = false;
      } else {
        this.isfree = true;
      };
      if(this.comandToStop) {
        this.confirmTostop = true;
        console.log(`Confirm to stop from ${this.name}`)
        return;
      }
      obj.checkStatus();
      console.log(obj === this); 
    }.bind(this), time);
  } else {
    if(this.isfree) {
      this.isfree = false;
    } else {
      this.isfree = true;
    }
    obj.checkStatus(); 
  }                      
};