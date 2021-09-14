const router = require('express').Router();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ----- register -----
router.get('/register', (req, res) => {
  try {
    res.render('register.ejs');
  } catch (error) {
    res.render('error.ejs');
  }
});
router.post('/register', async (req, res) => {
  // check if the user is already in the database
  const name = req.body.name.toLowerCase();
  const email = req.body.email.toLowerCase();

  // check
  const userExist = await User.findOne({ name, email });
  if (userExist) return res.status(400).redirect('/register');

  // create a new user
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword
  });
  try {
    await user.save();
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).redirect('/register');
  }
});

// ----- login -----
router.get('/login', (req, res) => {
  try {
    res.render('login.ejs');
  } catch (error) {
    res.render('error.ejs');
  }
});
router.post('/login', async (req, res) => {
  const name = req.body.name.toLowerCase();

  // check if the user is in the database
  const user = await User.findOne({ name });
  if (!user) return res.status(400).render('login.ejs', { error: 'Wrong name!'});

  // check if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).render('login.ejs', { error: 'Wrong password!'});

  // create and assign a token
  const payload = { id: user.id, name: user.name }
  const secret = process.env.TOKEN_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: '4h' });
  res.cookie('auth-token', token).redirect('/');
});

module.exports = router;
