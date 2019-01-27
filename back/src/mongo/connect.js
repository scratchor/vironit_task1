const mongoose = require('mongoose')

function connect () {
  mongoose.connect('mongodb://vlad:vlad123@ds163694.mlab.com:63694/vironit-atm', { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err + err.stack))
}

module.exports = connect;
