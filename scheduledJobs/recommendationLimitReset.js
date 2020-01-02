require("dotenv").config();
const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;

// model
const User = require("../models/User");

const job = new CronJob(
  "00 00 00 * * *",
  async () => {
    try {
      console.log("Starting to reset recommendation count of all users.");

      mongoose
        .connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useFindAndModify: true
        })
        .then(() => {
          console.log("Connected to DataBase");

          // User.updateMany(
          //   {},
          //   {
          //     $set: {
          //       recommendationCount: 3
          //     }
          //   }
          // ).exec();
        });
    } catch (error) {
      console.log(error);
    }
  },
  () => {
    console.log("Completed updating user recommendationCounts");
  }
);

job.start();
