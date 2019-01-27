const express = require('express');
const app = express();
const connect = require('./mongo/connect')
const bodyParser = require('body-parser')
const router = require('./router')
var cors = require('cors')

connect()

app.use(cors())

app.use(bodyParser.json())
// app.use(express.static('src/dist'));

app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    console.error(err.message)
    console.error(err.stack)
    res.status(404).send(err.message)
  } else {
    console.error(err.stack);
    res.status(500).send('Ooooops Something broke!');
  }
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
