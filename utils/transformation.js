const ObjectId = require('mongoose').Types.ObjectId;

// RATINGS MODELS
const BookRating = require('../models/Ratings/BookRating');
const MovieRating = require('../models/Ratings/MovieRating');
const CourseRating = require('../models/Ratings/CourseRating');
const PersonRating = require('../models/Ratings/PersonRating');

// CONTENT MODELS
const Book = require('../models/Book');
const Movie = require('../models/Movie');
const Course = require('../models/Course');
const Person = require('../models/Person');

// EDUCATION MODELS
const EducationCategory = require('../models/Education/EducationCategory');
const EducationSubcategory = require('../models/Education/EducationSubcategory');
const EducationSubtopic = require('../models/Education/EducationSubtopic');
const EducationTopic = require('../models/Education/EducationTopic');

// RECOMENDATION MODELS
const BookRecommendation = require('../models/Recommendations/BookRecommendation');
const MovieRecommendation = require('../models/Recommendations/MovieRecommendation');
const CourseRecommendation = require('../models/Recommendations/CourseRecommendation');
const PersonRecommendation = require('../models/Recommendations/PersonRecommendation');

//Questions Models
const Question = require('../models/Question');
const Questionnaire = require('../models/Questionnaire');

//Vacancy Models
const Vacancy = require('../models/Vacancy');
module.exports = {
  mongooseId(id) {
    return new ObjectId(ObjectId.isValid(id) ? id : '000000000000000000000000');
  },
  multi(item) {
    return {
      us: item ? item.us : null,
      ru: item ? item.ru : null,
      az: item ? item.az : null
    };
  },
  common({ name, description, img, tags }) {
    return {
      name: this.multi(name),
      description: this.multi(description),
      img: this.multi(img),
      tags: tags
    };
  },
  strToArr(item, isID) {
    if (isID)
      return item
        ? item.split(',').map(i => {
            return this.mongooseId(i.trim());
          })
        : null;
    return item ? item.split(',').map(i => i.trim()) : null;
  },

  getObject(req, type) {
    switch (type) {
      case 'book':
        return this.getBookObject(req.body);
      case 'movie':
        return this.getMovieObject(req.body);
      case 'course':
        return this.getCourseObject(req.body);
      case 'person':
        return this.getPersonObject(req.body);
      case 'educationCategory':
        return this.getEducationCategoryObject(req.body);
      case 'educationSubcategory':
        return this.getEducationSubcategoryObject(req.body);
      case 'educationTopic':
        return this.getEducationTopicObject(req.body);
      case 'educationSubtopic':
        return this.getEducationSubtopicObject(req.body);
      case 'question':
        return this.getQuestionObject(req.body);
      case 'questionnaire':
        return this.getQuestionnaireObject(req.body);
      case 'vacancy':
        return this.getVacancyObject(req);
    }
  },
  getBookObject(body) {
    const {
      authors,
      genres,
      isbn,
      published,
      publisher,
      wikipediaLink,
      website
    } = body;

    return {
      ...this.common(body),
      authors: this.strToArr(authors, true),
      genres: this.strToArr(genres),
      ISBN: isbn,
      published: published,
      publisher: this.strToArr(publisher, true),
      wikipediaLink: this.multi(wikipediaLink),
      website: this.multi(website)
    };
  },
  getMovieObject(body) {
    const { actors, genres, crew, released } = body;
    return {
      ...this.common(body),
      actors: this.strToArr(actors, true),
      genres: this.strToArr(genres),
      crew: crew
        ? crew.map(item => ({
            role: item.role,
            id: this.mongooseId(item.id.trim())
          }))
        : null,
      released: released
    };
  },
  getCourseObject(body) {
    const {
      authors,
      genres,
      published,
      publisher,
      website,
      video,
      link
    } = body;
    return {
      ...this.common(body),
      authors: this.strToArr(authors, true),
      genres: genres ? genres.split(',').map(item => item.trim()) : null,
      published: published,
      publisher: this.strToArr(publisher, true),
      website: this.multi(website),
      video: this.multi(video),
      link: this.multi(link)
    };
  },
  getPersonObject(body) {
    const { wikipediaLink } = body;
    return {
      ...this.common(body),
      wikipediaLink: this.multi(wikipediaLink)
    };
  },
  getEducationCategoryObject(body) {
    const { subcategories, icon, courses } = body;
    return {
      ...this.common(body),
      subcategories: this.strToArr(subcategories, true),
      icon,
      courses: this.strToArr(courses, true)
    };
  },
  getEducationSubcategoryObject(body) {
    const { categories, topics, icon, courses } = body;
    return {
      ...this.common(body),
      categories: this.strToArr(categories, true),
      topics: this.strToArr(topics, true),
      icon,
      courses: this.strToArr(courses, true)
    };
  },
  getEducationTopicObject(body) {
    const { subcategories, subtopics, icon, courses } = body;
    return {
      ...this.common(body),
      subcategories: this.strToArr(subcategories, true),
      subtopics: this.strToArr(subtopics, true),
      icon,
      courses: this.strToArr(courses, true)
    };
  },
  getEducationSubtopicObject(body) {
    const { topics, icon, courses } = body;
    return {
      ...this.common(body),
      topics: this.strToArr(topics, true),
      icon,
      courses: this.strToArr(courses, true)
    };
  },
  getVacancyObject(req) {
    const {
      education,
      position,
      email,
      phone,
      ageMin,
      ageMax,
      requirements,
      workInfo,
      companyName,
      contactPerson,
      topics,
      experience,
      salary,
      city,
      category
    } = req.body;
    return {
      creator: this.mongooseId(req.user._id),
      education: education,
      position: position,
      email: email,
      phone: phone,
      ageMin: ageMin,
      ageMax: ageMax,
      requirements: requirements,
      workInfo: workInfo,
      companyName: companyName,
      contactPerson: contactPerson,
      topics: topics,
      experience: experience,
      salary: salary,
      city: city,
      category: category
    };
  },
  getQuestionObject(body) {
    const { multiple, text, answers, tags } = body;
    return {
      multiple,
      text: this.multi(text),
      answers,
      tags
    };
  },
  getQuestionnaireObject(body) {
    const { questions, tags } = body;
    return {
      questions: this.strToArr(questions, true),
      tags
    };
  },
  getOffset(page, size) {
    page = parseInt(page);
    if (isNaN(page)) page = 1;
    const offset = (page - 1) * size;
    return offset;
  },
  getModel(name) {
    switch (name) {
      case 'book':
      case 'books':
        return Book;
      case 'movie':
      case 'movies':
        return Movie;
      case 'course':
      case 'courses':
        return Course;
      case 'person':
      case 'people':
        return Person;
      case 'category':
      case 'categories':
        return EducationCategory;
      case 'subcategory':
      case 'subcategories':
        return EducationSubcategory;
      case 'topic':
      case 'topics':
        return EducationTopic;
      case 'subtopic':
      case 'subtopics':
        return EducationSubtopic;
      case 'question':
      case 'questions':
        return Question;
      case 'questionnaire':
      case 'questionnaires':
        return Questionnaire;
      case 'vacancy':
      case 'vacancies':
        return Vacancy;
      default:
        return null;
    }
  },
  getRatingModel(type) {
    switch (type) {
      case 'books':
      case 'book':
        return BookRating;
      case 'movies':
      case 'movie':
        return MovieRating;
      case 'courses':
      case 'course':
        return CourseRating;
      case 'people':
      case 'person':
        return PersonRating;
      default:
        return null;
    }
  },
  getRecommendationModel(name) {
    switch (name) {
      case 'books':
      case 'book':
        return BookRecommendation;
      case 'movies':
      case 'movie':
        return MovieRecommendation;
      case 'courses':
      case 'course':
        return CourseRecommendation;
      case 'people':
      case 'person':
        return PersonRecommendation;
      default:
        return null;
    }
  },
  getPlural(name) {
    switch (name) {
      case 'book':
        return 'books';
      case 'movie':
        return 'movies';
      case 'course':
        return 'courses';
      case 'person':
        return 'people';
      default:
        return null;
    }
  }
};
