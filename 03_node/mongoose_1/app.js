const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

// -- added mongoose logic ---
const { connect } = require('mongoose');
const { MONGO_ATLAS_USER, MONGO_ATLAS_PW, MONGO_ATLAS_DBNAME } = process.env;
const uri = `mongodb+srv://${MONGO_ATLAS_USER}:${MONGO_ATLAS_PW}@cluster0.mfo8h.gcp.mongodb.net/${MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
connect(uri, options);
// -- added mongoose logic ---

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
