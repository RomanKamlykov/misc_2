const express = require('express');
const path = require('path');

// Init express
const app = express();

// Create your endpoints/route handlers
app.get('/', function(req, res) {
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));