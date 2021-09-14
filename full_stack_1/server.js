const express = require('express');

const app = express();

// обход ошибки CORS...
// https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/customers', (request, response) => {
  const customers = [ // irl from database
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Steve', lastName: 'Smith' },
    { id: 3, firstName: 'Mary', lastName: 'Swanson' }
  ];

  response.json(customers);
});

const port = 5000;

app.listen( port, () => console.log(`Server started on port ${port}`) );