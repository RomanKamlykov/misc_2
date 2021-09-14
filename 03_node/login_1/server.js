const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json()); // это позволит приложению принимать json

const users = [];

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      password: hashedPassword,
    }
    users.push(user);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name);
  if (user === null) {
    return res.status(400).send('Cannot find a user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success');
    } else {
      res.send('Not Allowed');
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(3001);
