const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const redis = require('redis');

const client = redis.createClient();
client.on('connect', () => {
  console.log('Connected to Redis');
});

const app = express();
app.engine('hbs', exphbs({ defaultLayout:'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('searchusers');
});

app.get('/users/search', (req, res) => {
  // const id = req.body.id;
  const { id } = req.query;
  client.hgetall(id, (err, obj) => {
    if(!obj) return res.render('searchusers', { error: "User doesn't exist" });
    obj.id = id;
    res.render('details', { user: obj });
  });
});

app.get('/user/add', (req, res) => {
  res.render('adduser');
});

app.post('/user/add', (req, res) => {
  const { id, first_name, last_name, email, phone } = req.body;
  client.hmset(id, { first_name, last_name, email, phone }, (err, reply) => {
    if (err) console.log(err);
    console.log(reply);
    res.redirect('/');
  });
});

app.delete('/user/delete/:id', (req, res) => {
  const { id } = req.params;
  client.del(id, (err, reply) => {
    if (err) console.log(err);
    console.log(reply);
    res.redirect('/');
  });
});

app.listen(3000);
