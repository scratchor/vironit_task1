const render = {
  atm1: {
    addClient: function() {
      const div = document.getElementById('counter1');    
      div.textContent = `${+div.textContent + 1}`;    
    },
    switchLightRed: function(x) {
      const light = document.getElementById(`light${x}`);
      light.style.backgroundColor = 'red';      
    },
    switchLightGreen: function(x) {
      const light = document.getElementById(`light${x}`);
      light.style.backgroundColor = 'green';      
    },    
  },
  atm2: {
    switchLightRed: function(x) {
      const light = document.getElementById(`light${x}`);
      light.style.backgroundColor = 'red';        
    },
    switchLightGreen: function(x) {
      const light = document.getElementById(`light${x}`);
      light.style.backgroundColor = 'green';        
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
      const field = document.querySelector('.field');
      const cashMashine = document.getElementById(`${x}`);
      if(div){
      field.removeChild(div);
      cashMashine.appendChild(div);      
      div.classList.add(`manInAtm`);
      div.classList.remove('man');
      }      
    },
    removePerson: function(x){
      const cashMashine = document.getElementById(`${x}`);
      const div = cashMashine.querySelector(`.manInAtm`);
      if(div) {      
        cashMashine.removeChild(div);
      }      
    }
  },

}
