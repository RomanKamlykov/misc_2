const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors()); // middleware

const posts = require('./routes/api/posts');
app.use('/api/posts', posts); // все routs по адресу '/api/posts' будут направлены к posts

// Handle prodaction
if(process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public'));
  
  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000; // heroku || development

app.listen( port, () => console.log(`Server started on port ${port}`) );