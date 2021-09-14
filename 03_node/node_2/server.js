const express = require('express');
const { readFile } = require('fs').promises;
const app = express();

app.get('/', async (request, response) => {
  response.send( await readFile('./home.html', 'utf8') );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App available on http://localhost:${PORT}`));
