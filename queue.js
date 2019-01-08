function Queue() {
  this.queue = [];  
}

Queue.prototype.addClient = function(data) {
  this.queue.push(data);
};


Queue.prototype.getQueueSize = function() {
  return this.queue.length;
};

Queue.prototype.getClient = function() {
  return this.queue.shift();
};

Queue.prototype.checkClient = function() {
  return this.queue[0];
}    







/*   Man.prototype.makePayment = function(atm) {
    model.queue.shift();
    clearTimeout(this.interval);
    setTimeout( function() {
      const field = document.querySelector('.field');
      field.removeChild(div);
      controller[`switchLightAtm${atm}`]();
      view[`atm${atm}`].addClient();
    }, this.time);    
  };

  this.getReady = function () {
    this.interval = setInterval(function() {
      if(model.atm1Greenlight) {
        div.classList.add('manInAtm1');
        controller.switchLightAtm1();
        model.queue[0].makePayment('1');
      } else if(model.atm2Greenlight) {
        div.classList.add('manInAtm2');
        controller.switchLightAtm2();
        model.queue[0].makePayment('2');
      };    
    }, 1);    
  };
} */