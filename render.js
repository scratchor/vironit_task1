const render = {
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
  person: {
    makePerson: function() {
      const div = document.createElement('div');
      const field = document.querySelector('.field');
      div.classList.add('man');
      field.appendChild(div);           
    },
    movePerson: function(x) {
      const div = document.querySelector('.man');
      if(div){      
      div.classList.add(`manInAtm${x}`);
      div.classList.remove('man');
      }      
    },
    removePerson: function(x){
      const div = document.querySelector(`.manInAtm${x}`);
      if(div) {      
        const field = document.querySelector('.field');
        field.removeChild(div);
      }      
    }
  },

}
