require('dotenv').config();
const { createConnection } = require('mongoose');
const { userSchema } = require('./mongodb/models/User');
const { connUri, connOptions } = require('./mongodb/mongodbConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let conn = null;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  // set a connection
  if (conn == null) {
    conn = await createConnection(connUri, connOptions);
    conn.model('User', userSchema); // define a model
  }
  
  try {
    // retrieve a model
    const User = conn.model('User');
    const reqBody = JSON.parse(event.body);

    // check if the user is in the database
    const user = await User.findOne(
      { name: reqBody.name },
    );
    if (!user) throw "The user isn't in the database!";

    // check if the password is valid
    const validPassword = await bcrypt.compare(reqBody.password, user.password);
    if (!validPassword) throw "The password is invalid!";

    // create and assign a token
    const payload = { id: user.id, name: user.name };
    const secret = process.env.TOKEN_SECRET;
    const options = { expiresIn: '4h' };
    const token = jwt.sign(payload, secret, options);

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
    }
  } finally {
    if (process.env.DEV) conn.close(() => console.log("Connection closed."));
  }
}