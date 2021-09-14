if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const app = express();

// Passport config
// вызов функции с тремя аргументами
require('./config/passport')(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id),
);

// сохраняем пользователей в переменной
const users = [];

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // для работы с формами, данные из формы будут доступны в req
app.use(flash()); // для сохранения сообщений в сессии
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
  // данные о пользователе передаются в объекте req.user
});

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect('/login');
  } catch (error) {
    res.redirect('/register');
  }
  console.log(users);
});

// app.post('/login', (req, res) => {
//   res.render('register.ejs');
// });

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// middleware
// свойство req.isAuthenticated добавляет Passport.js
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/');
  next();
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`http://localhost:${PORT}`));
