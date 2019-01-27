const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AtmSchema = new Schema({
  atmID: {
    type: String,
    required: [true, 'Id field is required']
  },
  counter: {
    type: Number,
    required: [true, 'Counter field is required']
  }
});

const Atm = mongoose.model('atm', AtmSchema);

module.exports = Atm;
