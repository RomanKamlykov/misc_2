const express = require('express')
const path = require('path')
const cors = require("cors")
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
    res.cookie('date', Date.now())
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/cookies', (req, res) => {
    const date = req.cookies['date']
    res.json({ cookies: date })
})

app.listen(3000)