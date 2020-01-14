const express = require("express");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const logger = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const app = express();
const compression = require("compression");

app.use(cors());

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use((req, res, next) => {
  res.io = io;
  next();
});

io.on('connection',  (socket) => {
  require("./services/socket-io")(socket, io)
});

app.use(compression());
app.use(helmet());
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


//Actions route
const actionsRoute = require("./routes/api/actions");
//Require routes
const authRoute = require("./routes/api/auth");
const emailVerificationRoute = require("./routes/api/verifyEmail");
const userRoute = require("./routes/api/user");
const achievementRoute = require("./routes/api/achievement");
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
const recommendationsMusicRoute = require("./routes/api/recommendations/music");

const recommendationsCourseRoute = require("./routes/api/recommendations/course");
const recommendationsPersonRoute = require("./routes/api/recommendations/person");
const recommendationsEducationRoute = require("./routes/api/recommendations/education");
const recommendationsVacancyRoute = require("./routes/api/recommendations/vacancy");

const collectRoute = require("./routes/api/collect");
const searchRoute = require("./routes/api/search");

const messageRoute = require("./routes/api/message");
const notificationRoute = require("./routes/api/notification");
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use("/api/auth", authRoute);
app.use("/api/verify", emailVerificationRoute);
app.use("/api/user", userRoute);
app.use("/api/actions", actionsRoute);
app.use("/api/achievements", achievementRoute);
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
app.use("/api/recommendations/music", recommendationsMusicRoute);

app.use("/api/recommendations/course", recommendationsCourseRoute);
app.use("/api/recommendations/person", recommendationsPersonRoute);
app.use("/api/recommendations/education", recommendationsEducationRoute);
app.use("/api/recommendations/vacancy", recommendationsVacancyRoute);

app.use("/api/collect", collectRoute);

app.use("/api/search", searchRoute);
app.use("/api/message", messageRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/files", require("./routes/api/files"));

app.use((err, req, res, next) => {
  res.status(500);
  return res.json({
    message: err.message
  });
});

module.exports = {app: app, server: server};
