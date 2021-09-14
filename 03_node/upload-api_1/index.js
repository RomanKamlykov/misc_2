const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { dest, fileFilter, limits } = require('./multerOptions.js');
const errorHandler = require('./errorHandler.js');
const cors = require('cors');

const app = express();
// app.use('/static', express.static(path.join(__dirname, 'static'))); // это только для того, чтобы обработанные изображения могли быть получены клиентом
// http://localhost:5000/static/3yqxlo.jpg - ссылка на изображение

app.use(cors());

const upload = multer({
  dest,
  fileFilter,
  limits
})

const upload2 = multer({
  dest: './uploads'
})

// routes
app.post('/test', (req, res) => {
  // res.sendStatus(200);
  res.json({ file: "req.file" });
});

app.post('/upload', upload.single('file'), errorHandler, (req, res) => { // 'file' - имя файла, который ожидаем получить от клиента
  res.json({ file: req.file });
});

// route с обработкой изображений
app.post('/file_processing', upload.single('file'), async (req, res) => {
  try {
    await sharp(req.file.path)
      .resize(300)
      //.background('white') - уже не пашет
      //.embed() - уже не пашет
      .toFile(`./static/${req.file.originalname}`);
      // .resize(300) width, height will be set proportionally

    fs.unlink(req.file.path, () => {
      res.json({ file: `./static/${req.file.originalname}` });
    });
  } catch (error) {
    res.status(422).json({ error });
  }
});

// не прорабатывал
app.post('/multiple', upload.array('files'), (req, res) => {
  res.json({ file: req.files });
});

// не прорабатывал
const pureUpload = multer({ dast: "/uploads" })
app.post('/dropzone', pureUpload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

// middleware для перехвата ошибок, которые будет отправлять multer middleware
// необходимо прописать после "app.post('/upload', upload.single('file'), ...", иначе не происходит перехват
// или вынести в отдельную функцию errorHandler
// "app.post('/upload', upload.single('file'), errorHandler, ..."
// app.use((err, req, res, next) => {
//   if(err.code === "LIMIT_FILE_TYPES") {
//     res.status(422).json({ error: "Only images are allowed" });
//     return;
//   }
//   if (err.code === "LIMIT_FILE_SIZE") {
//     res.status(422).json({ error: `Too large. Max size is ${limits.fileSize/1024}kb` });
//     return;
//   }
// });

app.listen(5000, ()=>console.log("Server is running on localhost:5000"));