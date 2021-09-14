const router = require('express').Router();

router.get('/', (req, res) => {
  // res.send('Hello From Express');
  // res.send(req.header('host'));
  // res.send(req.header('user-agent'));
  // res.send(req.rawHeaders);
  res.json({ name: "Brad"});
});

router.post('/contact', (req, res) => {
  // res.send(req.body);
  // res.send(req.header('Content-Type'));
  if(!req.body.name) {
    return res.status(400).send('Name is required');
  }
  // Database stuff
  res.status(201).send(`Thank you ${req.body.name}`);
});

router.post('/login', (req, res) => {
  // No Token
  if(!req.header('x-auth-token')) {
    return res.status(400).send('No Token');
  }
  // Validation
  if(req.header('x-auth-token') !== '123456') {
    return res.status(401).send('Not authorized');
  }
  res.send('Logged in');
});

router.put('/post/:id', (req, res) => {
  // Database stuff
  res.json({ 
    id: req.params.id,
    title: req.body.title
  });
});

module.exports = router;
