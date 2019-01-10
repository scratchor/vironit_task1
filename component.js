
//class Component
function Component(html, elClass, id, name, textContent) {
  this.html = html;
  this.class = elClass;
  this.id = id;
  this.name = name;
  this.textContent = textContent;
}

Component.prototype.createElem = function() {
  const elem = document.createElement(this.html);
  if(this.class) {
    if(typeof(this.class) === 'object') {
      this.class.forEach(e => elem.classList.add(e));
    } else {
    elem.classList.add(this.class);
    }
  }
  if(this.id) {
    elem.setAttribute('id', `${this.id}`);
  }
  if(this.textContent) {
  elem.textContent = this.textContent;
  }
  return elem;
};  



// inherited from Component class AtmComponent
AtmComponent.prototype = Object.create(Component.prototype);
AtmComponent.prototype.constructor = AtmComponent;

function AtmComponent(html, elClass, id, name) {
  Component.apply(this, arguments);
  this.num = +this.name[3];
}

// inherited from Component class Light
Light.prototype = Object.create(Component.prototype);
Light.prototype.constructor = Light;

function Light(html, elClass, id, name) {
  Component.apply(this, arguments);
  this.num = +this.name[5];
};

Light.prototype.switchLightRed = function(x) {
  const light = document.getElementById(`light${x}`);
  light.style.backgroundColor = 'red';      
};

Light.prototype.switchLightGreen = function(x) {
  const light = document.getElementById(`light${x}`);
  light.style.backgroundColor = 'green';      
};



// inherited from Component class Counter
Counter.prototype = Object.create(Component.prototype);
Counter.prototype.constructor = Counter;

function Counter(html, elClass, id, name) {
  Component.apply(this, arguments);
  this.num = this.name[7];
}

Counter.prototype.addClient = function(x) {
  const div = document.getElementById(`counter${x}`);    
  div.textContent = `${+div.textContent + 1}`;    
};



// inherited from Component class Person
Person.prototype = Object.create(Component.prototype);
Person.prototype.constructor = Person;

function Person() {
  Component.apply(this, arguments);
  this.time = Math.random() * 1000 + 3000;    
};

Person.prototype.makePerson = function() {
  const div = document.createElement('div');
  const field = document.querySelector('.field');
  div.classList.add('man');
  field.appendChild(div);           
};

Person.prototype.movePerson = function(x) {
  const div = document.querySelector('.man');
  const field = document.querySelector('.field');
  const cashMashine = document.getElementById(`${x}`);
  if(div){
  field.removeChild(div);
  cashMashine.appendChild(div);      
  div.classList.add(`manInAtm`);
  div.classList.remove('man');
  }      
};

Person.prototype.removePerson = function(x) {
  const cashMashine = document.getElementById(`${x}`);
  const div = cashMashine.querySelector(`.manInAtm`);
  if(div) {      
    cashMashine.removeChild(div);
  }      
};


// inherited from Component class DeleteButton
DelButComponent.prototype = Object.create(Component.prototype);
DelButComponent.prototype.constructor = DelButComponent;

function DelButComponent() {
  Component.apply(this, arguments);
  this.num = this.name[15];   
}