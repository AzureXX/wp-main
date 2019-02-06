const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport.js")(passport);

//Require routes
const authRoute = require("./routes/api/auth");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  res.status(500);
  res.json({ error: err.message });
});

module.exports = app;
