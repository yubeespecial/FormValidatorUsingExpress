const express = require('express');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')



const app = express();

// Set Template engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))

// const urlencodedParser = bodyParser.urlendcoded({ extended: false })

//Navigation
app.get('', (req, res) =>{
res.render('index')
});

app.get('/register', (req, res) =>{
  res.render('register')
});



app.post('/register', [
  check('username', 'The username must be 3+ character long')
  .exists()
  .isLength({ min: 3 }),
  check('email is not valid')
  .isEmail()
  .normalizeEmail()
], (req, res) =>{
  
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    // return res.status(422).json(errors.array())
    const alert = errors.array()
    res.render('register', {
      alert
    })
  }


});

const PORT = process.env.PORT|| 8080

app.listen(PORT, console.log(`Server is balling on ${PORT}`));