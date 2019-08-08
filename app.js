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
const musicRoute = require("./routes/api/music");
const courseRoute = require("./routes/api/course");
const movieRoute = require("./routes/api/movie");
const personRoute = require("./routes/api/person");
const vacancyRoute = require("./routes/api/vacancy");
const questionRoute = require("./routes/api/question");
const questionnaireRoute = require("./routes/api/questionnaire");
const taskRoute = require("./routes/api/task");

const accessGroupRoute = require("./routes/api/accessgroup");

const educationCategoryRoute = require("./routes/api/education/category");
const educationSubcategoryRoute = require("./routes/api/education/subcategory");
const educationTopicRoute = require("./routes/api/education/topic");
const educationSubtopicRoute = require("./routes/api/education/subtopic");

const recommendationsBookRoute = require("./routes/api/recommendations/book");
const recommendationsMovieRoute = require("./routes/api/recommendations/movie");
const recommendationsCourseRoute = require("./routes/api/recommendations/course");
const recommendationsPersonRoute = require("./routes/api/recommendations/person");

const collectRoute = require('./routes/api/collect')
const searchRoute = require("./routes/api/search");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);
app.use("/api/music", musicRoute);
app.use("/api/course", courseRoute);
app.use("/api/movie", movieRoute);
app.use("/api/person", personRoute);
app.use("/api/vacancy", vacancyRoute);
app.use("/api/question", questionRoute);
app.use("/api/questionnaire", questionnaireRoute);
app.use("/api/task", taskRoute);
app.use("/api/accessgroup", accessGroupRoute);

app.use("/api/education/category", educationCategoryRoute);
app.use("/api/education/subcategory", educationSubcategoryRoute);
app.use("/api/education/topic", educationTopicRoute);
app.use("/api/education/subtopic", educationSubtopicRoute);

app.use("/api/recommendations/book", recommendationsBookRoute);
app.use("/api/recommendations/movie", recommendationsMovieRoute);
app.use("/api/recommendations/course", recommendationsCourseRoute);
app.use("/api/recommendations/person", recommendationsPersonRoute);


app.use("/api/collect", collectRoute);


app.use("/api/search", searchRoute);

app.use("/api/files", require("./routes/api/files"));
app.use((err, req, res, next) => {
    res.status(500);
    res.json({ message: err.message });
});

module.exports = app;