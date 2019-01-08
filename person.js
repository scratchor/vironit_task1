function Person() {
  this.time = Math.random() * 1000 + 3000;
  this.interval = undefined;
}

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

 

  