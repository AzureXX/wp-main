const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const app = express();


app.use(helmet())
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport.js")(passport);

//Require routes
const authRoute = require("./routes/api/auth");
const userRoute = require("./routes/api/user");
const bookRoute = require("./routes/api/book");
const courseRoute = require("./routes/api/course");
const movieRoute = require("./routes/api/movie");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);
app.use("/api/course", courseRoute);
app.use("/api/movie", movieRoute);

app.use((err, req, res, next) => {
  res.status(500);
  res.json({ message: err.message });
});

module.exports = app;
