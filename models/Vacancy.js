const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
  education: String,
  position:String,
  email: String,
  phone: String,
  ageMin: Number,
  ageMax: Number,
  requirements: String,
  workInfo:String,
  companyName: String,
  contactPerson: String,
  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EducationTopic'
  }],
  experience: String,
  salary: String,
  city: String,
  category: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Vacancy = mongoose.model('Vacancy', VacancySchema);
module.exports = Vacancy;
