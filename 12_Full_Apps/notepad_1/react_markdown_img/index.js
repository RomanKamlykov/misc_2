const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const dir = path.join(__dirname, 'img');

app.use(cors());
app.use(express.static(dir));

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000/');
});
