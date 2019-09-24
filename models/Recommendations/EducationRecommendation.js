const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationRecommendationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [
    {
      _id: false,
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationCategory' },
      points: Number
    }
  ],
  subcategories: [
    {
      _id: false,
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubcategory' },
      points: Number
    }
  ],
  topics: [
    {
      _id: false,
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationTopic' },
      points: Number
    }
  ],
  subtopics: [
    {
      _id: false,
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubtopic' },
      points: Number
    }
  ]
});

const EducationRecommendation = mongoose.model(
  'EducationRecommendation',
  EducationRecommendationSchema
);
module.exports = EducationRecommendation;
