const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VacancyRecommendationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vacancies: [
    {
      _id: false,
      data: { type: mongoose.Schema.Types.ObjectId, ref: "Vacancy" },
      points: Number
    }
  ]
});

const VacancyRecommendation = mongoose.model("VacancyRecommendation", VacancyRecommendationSchema);
module.exports = VacancyRecommendation;
