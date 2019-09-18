const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationRecommendationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [
    {
      _id: false,
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      points: Number
    }
  ],
  subcategories: [
    {
      _id: false,
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
      points: Number
    }
  ],
  topics: [
    {
      _id: false,
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
      points: Number
    }
  ],
  subbtopics: [
    {
      _id: false,
      data: { type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic' },
      points: Number
    }
  ]
});

const EducationRecommendation = mongoose.model(
  'EducationRecommendation',
  EducationRecommendationSchema
);
module.exports = EducationRecommendation;
