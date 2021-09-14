const express = require('express');
const config = require('./config');
const cors = require('cors');
// const multer = require('multer');
// const fileUpload = require('express-fileupload');
const upload = require('./middleware/multerMiddleware');
const errorsHandler = require('./middleware/multerMiddlewareErrorsHandler');

const app = express();

app.use(express.json());
app.use(cors()); // middleware
// app.use(multer({dest:'./uploads/'}));
// app.use( fileUpload({
//   createParentPath: true,
//   limits: {
//     fileSize: 1 * 1024 * 1024 // 1MB
//   }
// }));

const posts = require('./routes/posts');
const liquids = require('./routes/liquids');
const search = require('./routes/search');
const loadfile = require('./routes/loadfile');

app.use('/api/posts', posts); // все routs по адресу '/api/posts' будут направлены к posts
app.use('/api/liquids', liquids); // все routs по адресу '/api/posts' будут направлены к posts
app.use('/api/search', search); // все routs по адресу '/api/posts' будут направлены к posts
app.use('/api/upload', upload.single('price'), errorsHandler, loadfile); // все routs по адресу '/api/posts' будут направлены к posts

// Handle production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public')); // Static folder
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html')); // Handle SPA
}

app.listen( config.PORT, () => console.log(`Server started on port ${config.PORT}`) );