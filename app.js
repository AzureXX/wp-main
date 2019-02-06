const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");



const app = express();
const indexRoute = require("./routes/api")
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/", indexRoute);


app.use((err,req,res,next) => {
  res.status(500);
  res.json({ error: err.message });
})

module.exports = app;


