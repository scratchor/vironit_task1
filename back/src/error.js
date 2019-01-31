const util = require('util')

// error constructor
function ValidationError (message) {
  this.message = message;
  Error.captureStackTrace(this, ValidationError);
}

util.inherits(ValidationError, Error);
ValidationError.prototype.name = 'ValidationError';

module.exports = ValidationError;
