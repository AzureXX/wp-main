const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
  education: String,
  position: String,
  email: String,
  phone: String,
  ageMin: Number,
  ageMax: Number,
  requirements: String,
  workInfo: String,
  companyName: String,
  contactPerson: String,
  subcategories: [
    {
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubcategories' },
      status: Number
    }
  ],
  topics: [
    {
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationTopic' },
      status: Number
    }
  ],
  subtopics: [
    {
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubtopic' },
      status: Number
    }
  ],
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
