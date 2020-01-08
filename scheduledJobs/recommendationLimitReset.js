require("dotenv").config();
const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;
// model
const Limit = require("../models/Limit");

const job = new CronJob("00 00 00 * * *", async () => {
  try {
    console.log("Starting to reset recommendation count of all users.");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: true
    });
    await Limit.updateMany(
      {},
      {
        $set: {
          recommendations: {
            book: 3,
            movie: 3,
            music: 3,
            course: 3,
            career: 3,
            education: 3
          }
        }
      }
    );
    console.log("Completed reseting user recommendation limits.");
  } catch (error) {
    console.log(error);
  }
});
job.start();
