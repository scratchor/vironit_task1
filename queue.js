Queue.prototype = Object.create(EventEmitter.prototype);
Queue.prototype.constructor = Queue;

function Queue() {
  EventEmitter.call(this);
  this.queue = [];  
}

Queue.prototype.addClient = function(data) {
  this.queue.push(data);
};


Queue.prototype.getQueueSize = function() {
  return this.queue.length;
};

Queue.prototype.getClient = function() {
  return this.queue.shift();
};

Queue.prototype.checkClient = function() {
  return this.queue[0];
}    
