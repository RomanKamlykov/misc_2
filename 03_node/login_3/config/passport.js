const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email }, async (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'The email is not registered'}); }
        const result = await bcrypt.compare(password, user.password);
        // if (!user.verifyPassword(password)) { return done(null, false, { messege: 'The password is incorrect'}); }
        if (!result) { return done(null, false, { message: 'The password is incorrect'}); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => { done(err, user); });
  });
}
