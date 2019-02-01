const express = require('express')
const router = express.Router()
const ValidationError = require('./error')
const Atm = require('./mongo/atmSchema')

// options for res.senfile
/* const options = {
  root: path.join(__dirname, 'dist')
};

router.get('/', (req, res, next) => {
  var options = {
    root: path.join(__dirname, 'dist')
  };

  res.sendFile('index.html', options, (err) => {
    const fileName = 'index.html';
    console.log(options);
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  })
});

router.get('/main.css', (req, res, next) => {
  res.sendFile('main.css', options, (err) => {
    const fileName = 'main.css';
    console.log(options);
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  })
});

router.get('/main.js', (req, res, next) => {
  res.sendFile('main.js', options, (err) => {
    const fileName = 'main.js';
    console.log(options);
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  })
}); */

router.get('/atm', (req, res, next) => {
  Atm.find({}, null, { sort: 'atmID' })
    .then((atms) => {
      if (atms) {
        console.log(atms)
        res.send(atms)
      } else {
        throw new ValidationError('Sorry, no atm found!')
      }
    })
    .catch(next)
})

router.post('/atm', (req, res, next) => {
  console.log(req.body)
  Atm.create(req.body)
    .then((atm) => {
      if (atm) {
        res.send(atm)
      } else {
        throw new ValidationError('Validation error, no atm created')
      }
    })
    .catch(next)
})

router.put('/atm', (req, res, next) => {
  console.log(req.body)
  Atm.findOneAndUpdate({ atmID: req.body.atmID }, { counter: req.body.counter }, { new: true })
    .then((atm) => {
      if (atm) {
        res.send(atm)
      } else {
        throw new ValidationError('No atm match such conditions found')
      }
    })
    .catch(next)
})

router.delete('/atm', (req, res, next) => {
  console.log(req.query)
  Atm.findOneAndDelete({ atmID: req.query.atmID })
    .then(atm => {
      if (atm) {
        res.send(atm)
      } else {
        throw new ValidationError('No atm match such conditions found')
      }
    })
    .catch(next)
})

module.exports = router
