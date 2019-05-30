const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
  education: String,
  possition:String,
  email: String,
  phone: String,
  ageMin: Number,
  ageMax: Number,
  requirements:[mongoose.Schema.Types.ObjectId],
  workInfo:String,
  companyName: String,
  contactPerson: String,
  experience: String,
  salary: Number,
  city: String,
  category: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Vacancy = mongoose.model('Vacancy', VacancySchema);
module.exports = Vacancy;
