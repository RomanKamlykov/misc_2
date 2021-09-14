require('dotenv').config()
const express = require('express')
const config = require('./config')
const cors = require('cors')
const multer = require('multer')
const { dest, fileFilter, limits } = require('./middleware/multerOptions')
const errorsHandler = require('./middleware/errorsHandler')

// ----- init express -----
const app = express()

// ----- middleware -----
app.use(express.json())
app.use(cors())
const upload = multer({
  dest,
  fileFilter,
  limits
})

// ----- routes -----
const searchRoute = require('./routes/search')
const uploadRoute = require('./routes/upload')

app.use('/api/search', searchRoute)
app.use('/api/upload', upload.single('price'), errorsHandler, uploadRoute)

// ----- handle production -----
if(config.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public')) // static folder
  app.get('*', (req, res) => { // handle SPA
    res.sendFile(__dirname + '/public/index.html')
  })
}

app.listen( config.PORT, () => console.log(`Server started on port ${config.PORT}`) )