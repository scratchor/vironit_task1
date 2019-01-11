const atm1 = new Atm('atm1');
const atm2 = new Atm('atm2');

const emitter = new EventEmitter();

const queue1 = new Queue();


document.addEventListener("DOMContentLoaded", ready);

function ready() {
  queue1.on('add', () => controller.atms.forEach(e => queue1.checkClient() && e.isfree ? e.checkStatus() : false));  
  emitter.on('drawCahsMasine', (x) => controller.drawCashMashine(x));  
  controller.createCashMashine();
  controller.createCashMashine();
  controller.atms.forEach(e => controller.addAtmsEvents(e));
  controller.addOnCreate();
  controller.addCreateListener();
  controller.addOnDelete();
  controller.addDeleteListener();
  controller.addOnInput();
  controller.addInputListener();
  controller.drawPerson();  
}

const controller = {

  atms: [],
  atmComponents: [
    [],
    [],
    [],
    [],
  ],
  nameNum: 1,
  inetrvalId: undefined,
  starTime: 2000,
  endTime:  4000,

  addAtmsEvents: function (obj) {
    // а какой смысл было тогда создавать Person, Light и Count как классы, если ты используешь их без контекста?
    obj.on('free', () => Person.prototype.removePerson(obj.name));
    obj.on('free', () => Light.prototype.switchLightGreen(obj.num));
    obj.on('free', () => {
        const person = queue1.getClient();
        if(person) {
          obj.changeStatus(undefined, obj);  
          setTimeout(function() {       
          Person.prototype.movePerson(obj.name);
          console.log(`ATM${obj.num}: Очередь уменьшилась на 1 человека`);
          Counter.prototype.addClient(obj.num);
          obj.addServedClient();          
          obj.changeStatus(person.time, obj);
          console.log(person.time);
        }, 1000);              
        };    
    });
    obj.on('busy', () => setTimeout(function() {
      Light.prototype.switchLightRed(obj.num);
    }, 1000)); 
  },

  drawPerson: function() {
    setTimeout(() => {
      let person = new Person();
      queue1.addClient(person);
      Person.prototype.makePerson();
      queue1.emit('add');
      setTimeout(() => {
        controller.drawPerson();
      }, 500); // а почему нужна еще дополнительная задержка в полсекунды?
      // Math.random() * 1 ? это что делает?)
    }, (Math.random() *1 + controller.starTime) + controller.endTime);
  },
  
  addOnInput: function() {
    const input1 = document.querySelector('.input1');
    const input2 = document.querySelector('.input2');
      emitter.on('input1', () => {
        controller.starTime = +input1.value;
        console.log(controller.starTime); 
      });    
      emitter.on('input2', () => {
        controller.endTime = +input2.value;
        console.log(controller.endTime);
      });   
    },

    addInputListener: function() {
      const input1 = document.querySelector('.input1');
      const input2 = document.querySelector('.input2');
      input1.addEventListener('input', () => {
        emitter.emit('input1');
      });
      input2.addEventListener('input', () => {
        emitter.emit('input2');
      });
    },

    addOnDelete: function() {
      emitter.on('delAtm', (idNum) => {
        controller.deleteCashMashineFromDom(idNum);
        controller.deleteCashMashineFromLogic(idNum);
      });
    },
    
    addDeleteListener: function() {
      let cashMasines = document.querySelectorAll('.cash_mashine');
      cashMasines = [].slice.call(cashMasines);
      cashMasines.forEach(e => e.addEventListener('click', () => {
        emitter.emit('delAtm', e.id[3]);
      }));
    },

    addOnCreate: function() {
      emitter.on('createAtm', () => {
        controller.createCashMashine();
      });
    },

    addCreateListener: function() {
      const buttonCreateAtm = document.querySelector('.buttonCreateAtm');
      buttonCreateAtm.addEventListener('click', () => {
        emitter.emit('createAtm');
      })
    },

    createCashMashine: function () {
      const x = controller.nameNum;
      controller.nameNum++;
      const atm = new Atm(`atm${x}`);
      const atmComponent = new AtmComponent('div', 'cash_mashine', `atm${x}`, `atm${x}Component`);
      const counterComponent = new Counter('div', 'counter', `counter${x}`, `counter${x}Component`, '0');
      const lightComponent = new Light('div', 'light', `light${x}`, `light${x}Component`);
      const delButComponent = new DelButComponent('i', ['fas', 'fa-times', 'fa-2x'], `delBut${x}`, `DelBut${x}Component`);
      // в принципе твоему контроллеру достаточно было бы создать просто atmComponent.
      // а внутри atmComponent уже создавать вложенные компоненты для него
      controller.atmComponents[0].push(atmComponent);
      controller.atmComponents[1].push(counterComponent);
      controller.atmComponents[2].push(lightComponent);
      controller.atmComponents[3].push(delButComponent);
      controller.atms.push(atm);
      controller.addAtmsEvents(atm);      
      emitter.emit('drawCahsMasine', x);      
    },
    

    drawCashMashine: function (i) {
      const atmWrapper = document.querySelector('.atm_wrapper');      
        const cashMasine = controller.atmComponents[0][i-1].createElem();
        const counter = controller.atmComponents[1][i-1].createElem();
        const light = controller.atmComponents[2][i-1].createElem();
        const delbut = controller.atmComponents[3][i-1].createElem();
        cashMasine.appendChild(delbut);
        cashMasine.appendChild(counter);
        cashMasine.appendChild(light);        
        atmWrapper.appendChild(cashMasine);
        cashMasine.addEventListener('click', () => {
          emitter.emit('delAtm', cashMasine.id[3]);
      });
    },  

    deleteCashMashineFromDom: function(idNum) {
      const atmWrapper = document.querySelector('.atm_wrapper');
      const cashMasine = document.getElementById(`atm${idNum}`);
      atmWrapper.removeChild(cashMasine);
    },

    deleteCashMashineFromLogic: function(idNum) {
      const atm = controller.atms.filter(e => e.name === `atm${idNum}`)[0];
      controller.atms = controller.atms.filter(e => e !== atm);
    },

}