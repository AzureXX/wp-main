const mongoose = require("mongoose");
const AchievementSchema = new mongoose.Schema({
  order: Number,
  title: {
    us: String,
    ru: String,
    az: String
  },
  description: {
    us: String,
    ru: String,
    az: String
  },
  img: String
});

const Achievement = mongoose.model("Achievement", AchievementSchema);
module.exports = Achievement;
