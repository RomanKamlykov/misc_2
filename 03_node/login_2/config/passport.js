const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = (passport, getUserByEmail, getUserById) => {
  passport.use(new LocalStrategy(
    { usernameField: 'email' }, 
    async (email, password, done) => {
      const user = getUserByEmail(email);
      if (!user) { return done(null, false, { message: 'No user with that email' }); }
      try {
        if (await bcrypt.compare(password, user.password)) { return done(null, user); }
        else { return done(null, false, { message: 'Password incorrect' }); }
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.serializeUser( (user, done) => done(null, user.id) );
  passport.deserializeUser( (id, done) => done(null, getUserById(id)) );
}
