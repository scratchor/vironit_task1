document.addEventListener("DOMContentLoaded", ready);

function ready() {  
  controller.drawMan();
  controller.runGetReady();  
}


function Man(div) {
  this.time = Math.random() * 10000;
  this.div = div;
  this.interval = undefined;
  this.makePayment = function(atm) {
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
}

    
const controller = {
  inetrvalId: undefined,

  drawMan: function() {
    this.inetrvalId = setInterval(function () {
    view.circumstance.makeMan();
  }, Math.random() * 5000);
},

  makeMan: function(div) {
    var man = new Man(div);
    model.addMan(man);
    model.increaseQueue();
  },

  switchLightAtm1: function() {
    if(model.atm1Greenlight) {
        view.atm1.switchLightRed();
        this.atm1OffGreen();
    } else {
      view.atm1.switchLightGreen();
      this.atm1TurnGreen();
    }
  },
  switchLightAtm2: function() {
    if(model.atm2Greenlight) {
        view.atm2.switchLightRed();
        this.atm2OffGreen();
    } else {
      view.atm2.switchLightGreen();
      this.atm2TurnGreen();
    }
  },

  atm1TurnGreen: function() {
    model.atm1Greenlight = true;
  },
  atm1OffGreen: function() {
    model.atm1Greenlight = false;
  },
  atm2TurnGreen: function() {
    model.atm2Greenlight = true;
  },
  atm2OffGreen: function() {
    model.atm2Greenlight = false;
  },

  runGetReady: function() {
    setInterval(function() {
      model.getReady();
    }, 1);
},

}


const model = {
  queue: [],
  atm1Greenlight: true,
  atm2Greenlight: true,
  'men in queue': 0,
  inetrvalId: false,
  man: undefined,
  
  addMan: function(man) {
    this.queue.push(man);
  },
  increaseQueue: function() {
    this['men in queue']++;
  },
  atm1TurnGreen: function() {
    this.atm1Greenlight = true;
  },
  atm1OffGreen: function() {
    this.atm1Greenlight = false;
  },
  atm2TurnGreen: function() {
    this.atm2Greenlight = true;
  },
  atm2OffGreen: function() {
    this.atm2Greenlight = false;
  },
  getReady: function () {
      if(this.queue[0] && this.man !== this.queue[0]) {
        this.man = this.queue[0];
        this.queue[0].getReady();        
      }    
  },

}




const view = {
  atm1: {
    addClient: function() {
      const div = document.getElementById('counter1');    
      div.textContent = `${+div.textContent + 1}`;    
    },
    switchLightRed: function() {
      const light1 = document.querySelector('.light1');
      light1.style.backgroundColor = 'red';      
    },
    switchLightGreen: function() {
      const light1 = document.querySelector('.light1');
      light1.style.backgroundColor = 'green';      
    },    
  },
  atm2: {
    switchLightRed: function() {
      const light2 = document.querySelector('.light2');
      light2.style.backgroundColor = 'red';        
    },
    switchLightGreen: function() {
      const light2 = document.querySelector('.light2');
      light2.style.backgroundColor = 'green';        
    },
    addClient: function() {
      const div = document.getElementById('counter2');    
      div.textContent = `${+div.textContent + 1}`;    
    },
  },
  circumstance: {
    makeMan: function () {
      const div = document.createElement('div');
      const field = document.querySelector('.field');
      div.classList.add('man');
      field.appendChild(div);
      controller.makeMan(div);
    },   
  },

}


