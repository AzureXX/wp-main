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
        useCreateIndex: true,
        useFindAndModify: false
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
const personRoute = require("./routes/api/person");
const vacanciesRoute = require("./routes/api/vacancies");

const educationCategoryRoute = require("./routes/api/education/category");
const educationSubcategoryRoute = require("./routes/api/education/subcategory");
const educationTopicRoute = require("./routes/api/education/topic");
const educationSubtopicRoute = require("./routes/api/education/subtopic");

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
app.use("/api/person", personRoute);
app.use("/api/vacancies", vacanciesRoute);

app.use("/api/education/category", educationCategoryRoute);
app.use("/api/education/subcategory", educationSubcategoryRoute);
app.use("/api/education/topic", educationTopicRoute);
app.use("/api/education/subtopic", educationSubtopicRoute);


app.use("/api/files", require("./routes/api/files"));
app.use((err, req, res, next) => {
    res.status(500);
    res.json({ message: err.message });
});

module.exports = app;