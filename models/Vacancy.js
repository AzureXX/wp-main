const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
  minAge: Number,
  maxAge: Number,
  creator: mongoose.Schema.Types.ObjectId
})

const Vacancy = mongoose.model("Vacancy", VacancySchema)
module.exports = Vacancy;