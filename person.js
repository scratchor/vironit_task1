function Person() {
  this.time = Math.random() * 1000 + 3000;
  this.interval = undefined;
}

// А если у нас будут не только банкоматы? а еще и колбасу будут где-то продавать?)))
// Лучше, чтобы в описании класса Person не было привязки к АТМ
// Логику по изменению АТМ лучше вынести
// А время которое требуется челу, передавать параметром в функцию изменения состояния АТМа
  Person.prototype.makePayment = function(atm, x) {
    setTimeout(function() {
      this.endPayment(atm, x);
    }.bind(this), this.time)
  };

  Person.prototype.endPayment = function(atm, x) {
    render.person.removePerson(x);    
    setTimeout(function() {
      atm.isfree = true;
      render[`atm${x}`].switchLightGreen();
    }, 500);
  };

 

  