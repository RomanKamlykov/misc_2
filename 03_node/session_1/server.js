const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.get('/', (req, res) => {
  req.session.viewCount += 1;
  res.send(`You've visited the page ${req.session.viewCount} times`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`http://localhost:${PORT}`));
