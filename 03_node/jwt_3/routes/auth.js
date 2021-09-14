const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  // Check if the email is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email is already in the database');

  // Create a new user
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.status(201).send({ user: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  // Check if the email is in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is wrong');
  // Check if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Password is wrong');
  // Create and assign a token
  const payload = { _id: user.id }
  const secret = 'process.env.TOKEN_SECRET';
  const token = jwt.sign(payload, secret);
  res.header('auth-token', token).send();
});

module.exports = router;
