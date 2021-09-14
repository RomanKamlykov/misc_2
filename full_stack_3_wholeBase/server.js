require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { uri, options } = require('./mongodbConnection');
// const config = require('./config');
const { dest, fileFilter, limits } = require('./middleware/multerOptions');
const errorsHandler = require('./middleware/errorsHandler');

// connect to db
mongoose.connect(uri, options);

// ----- init express -----
const app = express();

// ----- middleware -----
app.use(express.json());
app.use(cors());
const upload = multer({
  dest,
  fileFilter,
  limits,
});

// ----- routes -----
const searchRoute = require('./routes/search');
const uploadRoute = require('./routes/upload');

app.use(express.static(path.join(__dirname, 'public_vue_3')));
app.use('/api/search', searchRoute);
app.use('/api/upload', upload.single('price'), errorsHandler, uploadRoute);

// ----- handle production -----
// if (config.NODE_ENV === 'production') {
//   app.use(express.static(`${__dirname}/public`)); // static folder
//   app.get('*', (req, res) => { // handle SPA
//     res.sendFile(`${__dirname}/public/index.html`);
//   });
// }

app.listen(5000);
