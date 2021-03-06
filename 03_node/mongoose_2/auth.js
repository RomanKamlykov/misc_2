const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// const User = require('./models/User'); // получаем ошибку
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get User by email
      const user = await User.findOne({ email });
      
      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) =>{
        if(err) throw err;
        if (isMatch) {
          resolve(user);
        } else {
          // Password didn't match
          reject('Authentication failed');
        }
      });
    } catch (error) {
      // Email not found
      reject('Authentication failed');
    }
  });
}