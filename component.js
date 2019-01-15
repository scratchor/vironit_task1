
//class Component
function Component(elClass, id, parentId, textContent, backColor) {

  this.params = {
    element: 'div',
    elClass: elClass,
    previousClass: this.params.elClass,
    id: id,
    parent: document.getElementById(`${parentId}`),
    textContent: textContent,
    backgroundColor: backColor,    
  };

}

Component.prototype.updateParams = function(newParams) {
  Object.assign(this.params, newParams);
  this.makeElem();  
};


Component.prototype.makeElem = function() {
  let elem = document.getElementById(`${this.params.id}`);
  if(!this.params.element){
    elem.outerHTML = "";
    delete elem;
    return;
  };
  if(elem) {
    elem.outerHTML = "";
    delete elem;
  }  
  elem = document.createElement(this.params.element);
  if(this.params.elClass) {
    if(Array.isArray(this.params.elClass)) {
      this.params.elClass.forEach(e => elem.classList.add(e));
    } else {
    elem.classList.add(this.params.elClass);
    }
  }
  if(this.params.id) {
    elem.setAttribute('id', `${this.params.id}`);
  }
  if(this.params.textContent) {
  elem.textContent = `${this.params.textContent}`;
  }
  if(this.params.backgroundColor) {
    elem.style.backgroundColor = `${this.params.backgroundColor}`;
  }
  this.render(elem);
};


Component.prototype.render = function(elem) {
  const parent = this.params.parent;
  parent.appendChild(elem);
};



// inherited from Component class AtmComponent
AtmComponent.prototype = Object.create(Component.prototype);
AtmComponent.prototype.constructor = AtmComponent;

function AtmComponent(idNum) {

  this.params = {
    element: 'div',
    elClass: 'cash_mashine',
    id: `atm${idNum}`,
    parent: document.querySelector(`.atm_wrapper`),      
  };

};


// inherited from Component class Counter
Counter.prototype = Object.create(Component.prototype);
Counter.prototype.constructor = Counter;

function Counter(idNum) {

  this.params = {
    element: 'div',
    elClass: 'counter',
    id: `counter${idNum}`,
    parent: document.getElementById(`atm${idNum}`),    
    textContent: '0', 
  };

};



// inherited from Component class Light
Light.prototype = Object.create(Component.prototype);
Light.prototype.constructor = Light;

function Light(idNum) {

  this.params = {
    element: 'div',
    elClass: 'light',
    id: `light${idNum}`,
    parent: document.getElementById(`atm${idNum}`),    
    backgroundColor: 'green',  
  };

};



// inherited from Component class DeleteButton
DelButComponent.prototype = Object.create(Component.prototype);
DelButComponent.prototype.constructor = DelButComponent;

function DelButComponent(idNum) {

  this.params = {
    element: 'i',
    elClass: ['fas', 'fa-times', 'fa-2x'],
    id: `delBut${idNum}`,
    parent: document.getElementById(`atm${idNum}`),          
  };
  
};



// inherited from Component class Person
Person.prototype = Object.create(Component.prototype);
Person.prototype.constructor = Person;

function Person(idNum) {
  
  this.time = Math.random() * 1000 + 3000;
  this.params = {
    element: 'div',
    elClass: 'man',
    id: `person${idNum}`,
    parent: document.querySelector('.field'),   
  };    
};




