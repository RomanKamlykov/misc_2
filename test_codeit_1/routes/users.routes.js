const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { or } = require('sequelize').Op;
const { User, Country } = require('../mysql/db');
const { JWT_SECRET } = require('../config').server;
const { validateParams } = require('./_helpers');

router.get('/register', async (req, res) => {
  try {
    const countries = await Country.findAll({});
    res.json({ countries });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/register', async (req, res) => {
  const params = req.body;
  const errors = Object.entries(params).map((el) => validateParams(el)).filter((el) => Boolean(el)).join('\n');

  if (errors.length) {
    return res.status(400).json({ message: errors });
  }

  try {
    // check if the user is already registered
    const user = await User.findOne({
      where: {
        [or]: {
          email: params.email.toLowerCase(),
          login: params.login.toLowerCase(),
        },
      },
    });

    if (user) {
      return res.status(409).json({ message: 'The user is already registered' });
    }

    // register the user
    const hashedPassword = await bcrypt.hash(params.password, 10);
    const newUser = await User.create({
      email: params.email.toLowerCase(),
      login: params.login.toLowerCase(),
      real_name: params.real_name,
      password: hashedPassword,
      birth_date: params.birth_date,
      country: params.country,
      is_agree: params.is_agree,
      registeredAt: Date.now(),
    });

    // create and assign a token
    const payload = { id: newUser.id, login: newUser.login };
    const options = { expiresIn: '4h' };
    const token = jwt.sign(payload, JWT_SECRET, options);
    return res.status(201).json({ email: newUser.email, name: newUser.real_name, token });
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    // find the user in the database
    const user = await User.findOne({
      where: {
        [or]: {
          email: login.toLowerCase(),
          login: login.toLowerCase(),
        },
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Wrong login or password!' });
    }

    // check the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Wrong login or password!' });
    }

    // create and assign a token
    const payload = { id: user.id, login: user.login };
    const options = { expiresIn: '4h' };
    const token = jwt.sign(payload, JWT_SECRET, options);
    return res.json({ email: user.email, name: user.real_name, token });
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = router;
