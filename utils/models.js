const User = require("../models/User");
const Task = require("../models/Task");
// RATINGS MODELS
const BookRating = require("../models/Ratings/BookRating");
const MovieRating = require("../models/Ratings/MovieRating");
const CourseRating = require("../models/Ratings/CourseRating");
const PersonRating = require("../models/Ratings/PersonRating");
const MusicRating = require("../models/Ratings/MusicRating");
// CONTENT MODELS
const Book = require("../models/Book");
const Movie = require("../models/Movie");
const Course = require("../models/Course");
const Person = require("../models/Person");
const Music = require("../models/Music");
// EDUCATION MODELS
const EducationCategory = require("../models/Education/EducationCategory");
const EducationSubcategory = require("../models/Education/EducationSubcategory");
const EducationSubtopic = require("../models/Education/EducationSubtopic");
const EducationTopic = require("../models/Education/EducationTopic");
// EDUCATION STATUS MODELS
const EducationCategoryStatus = require("../models/Education/Status/EducationCategoryStatus");
const EducationSubcategoryStatus = require("../models/Education/Status/EducationSubcategoryStatus");
const EducationSubtopicStatus = require("../models/Education/Status/EducationSubtopicStatus");
const EducationTopicStatus = require("../models/Education/Status/EducationTopicStatus");
// RECOMENDATION MODELS
const BookRecommendation = require("../models/Recommendations/BookRecommendation");
const MovieRecommendation = require("../models/Recommendations/MovieRecommendation");
const CourseRecommendation = require("../models/Recommendations/CourseRecommendation");
const PersonRecommendation = require("../models/Recommendations/PersonRecommendation");
const MusicRecommendation = require("../models/Recommendations/MusicRecommendation");
const EducationRecommendation = require("../models/Recommendations/EducationRecommendation");
const VacancyRecommendation = require("../models/Recommendations/VacancyRecommendation");
//Questions Models
const Question = require("../models/Question");
const Questionnaire = require("../models/Questionnaire");
//Vacancy Models
const Vacancy = require("../models/Vacancy");
// Other Models
const AccessGroup = require("../models/AccessGroup");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

module.exports = {
  getModel(name) {
    switch (name) {
      case "user":
      case "users":
        return User;
      case "book":
      case "books":
        return Book;
      case "movie":
      case "movies":
        return Movie;
      case "music":
        return Music;
      case "course":
      case "courses":
        return Course;
      case "person":
      case "people":
        return Person;
      case "category":
      case "categories":
        return EducationCategory;
      case "subcategory":
      case "subcategories":
        return EducationSubcategory;
      case "topic":
      case "topics":
        return EducationTopic;
      case "subtopic":
      case "subtopics":
        return EducationSubtopic;
      case "question":
      case "questions":
        return Question;
      case "questionnaire":
      case "questionnaires":
        return Questionnaire;
      case "vacancy":
      case "vacancies":
        return Vacancy;
      case "accessgroup":
      case "accessgroups":
        return AccessGroup;
      case "task":
      case "tasks":
        return Task;
      case "message":
      case "messages":
        return Message;
      case "notification":
      case "notifications":
        return Message;
      default:
        return null;
    }
  },
  getRatingModel(type) {
    switch (type) {
      case "books":
      case "book":
        return BookRating;
      case "movies":
      case "movie":
        return MovieRating;
      case "music":
        return MusicRating;
      case "courses":
      case "course":
        return CourseRating;
      case "people":
      case "person":
        return PersonRating;
      default:
        return null;
    }
  },
  getRecommendationModel(name) {
    switch (name) {
      case "books":
      case "book":
        return BookRecommendation;
      case "movies":
      case "movie":
        return MovieRecommendation;
      case "courses":
      case "course":
        return CourseRecommendation;
      case "music":
        return MusicRecommendation;
      case "people":
      case "person":
        return PersonRecommendation;
      case "education":
        return EducationRecommendation;
      case "vacancy":
      case "vacancies":
        return VacancyRecommendation;
      default:
        return null;
    }
  },
  getEducationStatusModel(name) {
    switch (name) {
      case "category":
      case "categories":
        return EducationCategoryStatus;
      case "subcategory":
      case "subcategories":
        return EducationSubcategoryStatus;
      case "topic":
      case "topics":
        return EducationTopicStatus;
      case "subtopic":
      case "subtopics":
        return EducationSubtopicStatus;
      default:
        return null;
    }
  }
};
