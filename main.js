const atm1 = new Atm('atm1');
const atm2 = new Atm('atm2');

console.log(atm1);
console.log(atm2);

const queue1 = new Queue();
console.log(queue1);

document.addEventListener("DOMContentLoaded", ready);

function ready() {  
/*   atm1.on('free', () => render.atm1.switchLightGreen());
  atm1.on('free', () => render.person.removePerson(1));
  atm1.on('free', () => setTimeout(render.person.movePerson(1), 1000));
  atm1.on('free', () => console.log('ATM1: Очередь уменьшилась на 1 человека')); */
  atm1.on('free', () => {
      setTimeout(function() {
      render.person.movePerson(1);
      const person = queue1.getClient();      
      if(person){
        console.log('ATM1: Очередь уменьшилась на 1 человека');
        person.makePayment(atm1, 1);
        render.atm1.addClient();
        atm1.isfree = false; // лучше бы метод по изменению состояния, в котором эмитить соответствующее событие
      }
    }, 500);
  });
  atm2.on('free', () => {
    setTimeout(function() {
    render.person.movePerson(2);
    const person = queue1.getClient();      
    if(person){
      console.log('ATM2: Очередь уменьшилась на 1 человека');
      person.makePayment(atm2, 2);
      render.atm2.addClient();
      atm2.isfree = false;
    }
  }, 500);
});
  atm1.on('busy', () => render.atm1.switchLightRed()); 
  atm2.on('busy', () => render.atm2.switchLightRed());  
  controller.drawPerson();
  setInterval(atm1.checkStatus.bind(atm1), 1000);
  setInterval(atm2.checkStatus.bind(atm2), 1000);  
}

//atm1.on и atm2.on делают практически тоже самое, почему бы коллбек не вынести в отдельную функцию с параметрами?

const controller = {

  inetrvalId: undefined,

  drawPerson: function() {
    this.inetrvalId = setInterval(function () {
    let person = new Person();
    queue1.addClient(person);
    render.person.makePerson();
  }, Math.random() * 2000 + 3000);
},
/*   drawPerson: function() {
    this.inetrvalId = setInterval(() => {
      setTimeout(() => {
        let person = new Person();
        queue1.addClient(person);
        render.person.makePerson();      
        setInterval(() => {          
          controller.drawPerson();
        }, Math.random() *2000 + 3000);
      }, Math.random() *2000 + 3000);
      clearInterval(this.inetrvalId); 
    }, Math.random() *2000 + 3000);
  }, */




}