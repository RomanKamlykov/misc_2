const { readFileSync, writeFileSync } = require('fs');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const count = readFileSync('./count.txt');
  const newCount = parseInt(count) + 1;
  writeFileSync('./count.txt', newCount);

  res.send(`

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>RPi Hosted Website</title>
    </head>
    <body>
      <h1>Welcome to my Website!</h1>
      <p>This page has been viewed ${newCount} times!</p>
    </body>
    </html>

  `)
});

app.listen(5002, () => console.log('http://localhost:5002/'));
