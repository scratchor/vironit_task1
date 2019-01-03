document.addEventListener("DOMContentLoaded", ready);

const queue = [];

function ready() {
  circumstance.makeMan();
  circumstance.getReady();
}

const circumstance = {
  'men in queue': 0,
  inetrvalId: false,
  man: undefined,

  makeMan: function () { 
    this.inetrvalId = setInterval(function () {
      const div = document.createElement('div');
      const field = document.querySelector('.field');
      div.classList.add('man');
      field.appendChild(div);
      var man = new Man(div);
      queue.push(man);
      this['men in queue']++;
      }, Math.random() * 7000);
  },
  stopMakeMan: function () {
    if (inetrvalId) {
      clearInterval(this.inetrvalId);
    }
  }, 
  getReady: function () {
    setInterval(function () {
      if(queue[0] && this.man !== queue[0]) {
        this.man = queue[0];
        queue[0].getReady();        
      }      
    }, 1);
  },
}


function Man(div) {
  this.time = Math.random() * 10000;
  this.div = div;
  this.interval = undefined;
  this.makePayment = function(atm) {
    queue.shift();
    clearTimeout(this.interval);
    setTimeout( function() {
      const field = document.querySelector('.field');
      field.removeChild(div);
      atm.switchLight();
      atm.addClient();
    }, this.time);    
  };
  this.getReady = function () {
    this.interval = setInterval(function() {
      if(atm1.greenlight) {
        div.classList.add('manInAtm1');
        atm1.switchLight();
        queue[0].makePayment(atm1);
      } else if(atm2.greenlight) {
        div.classList.add('manInAtm2');
        atm2.switchLight();
        queue[0].makePayment(atm2);
      };    
    }, 1);    
  };
}


const atm1 = {
  greenlight: true,
  switchLight: function() {
    const light1 = document.querySelector('.light1');
    if (this.greenlight) {
      light1.style.backgroundColor = 'red';
      this.greenlight = false;
    } else {
      light1.style.backgroundColor = 'green';
      this.greenlight = true;
    }
  },
  addClient: function() {
    const div = document.getElementById('counter1');    
    div.textContent = `${+div.textContent + 1}`;    
  },
}
 

const atm2 = {
  greenlight: true,
  switchLight: function() {
    const light1 = document.querySelector('.light2');
    if (this.greenlight) {
      light1.style.backgroundColor = 'red';
      this.greenlight = false;
    } else {
      light1.style.backgroundColor = 'green';
      this.greenlight = true;
    }
  },
  addClient: function() {
    const div = document.getElementById('counter2');    
    div.textContent = `${+div.textContent + 1}`;    
  },
}

