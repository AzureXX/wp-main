const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../models/User');
const Task = require('../models/Task');
// RATINGS MODELS
const BookRating = require('../models/Ratings/BookRating');
const MovieRating = require('../models/Ratings/MovieRating');
const CourseRating = require('../models/Ratings/CourseRating');
const PersonRating = require('../models/Ratings/PersonRating');
const MusicRating = require('../models/Ratings/MusicRating');

// CONTENT MODELS
const Book = require('../models/Book');
const Movie = require('../models/Movie');
const Course = require('../models/Course');
const Person = require('../models/Person');
const Music = require('../models/Music');
// EDUCATION MODELS
const EducationCategory = require('../models/Education/EducationCategory');
const EducationSubcategory = require('../models/Education/EducationSubcategory');
const EducationSubtopic = require('../models/Education/EducationSubtopic');
const EducationTopic = require('../models/Education/EducationTopic');

// EDUCATION STATUS MODELS
const EducationCategoryStatus = require('../models/Education/Status/EducationCategoryStatus');
const EducationSubcategoryStatus = require('../models/Education/Status/EducationSubcategoryStatus');
const EducationSubtopicStatus = require('../models/Education/Status/EducationSubtopicStatus');
const EducationTopicStatus = require('../models/Education/Status/EducationTopicStatus');

// RECOMENDATION MODELS
const BookRecommendation = require('../models/Recommendations/BookRecommendation');
const MovieRecommendation = require('../models/Recommendations/MovieRecommendation');
const CourseRecommendation = require('../models/Recommendations/CourseRecommendation');
const PersonRecommendation = require('../models/Recommendations/PersonRecommendation');
const MusicRecommendation = require('../models/Recommendations/MusicRecommendation');

//Questions Models
const Question = require('../models/Question');
const Questionnaire = require('../models/Questionnaire');

//Vacancy Models
const Vacancy = require('../models/Vacancy');

const AccessGroup = require('../models/AccessGroup');
const Message = require("../models/Message");
const Notification = require("../models/Notification");
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
      case 'music':
        return this.getMusicObject(req.body);
      case 'course':
        return this.getCourseObject(req.body);
      case 'person':
        return this.getPersonObject(req.body);
      case 'category':
        return this.getEducationCategoryObject(req.body);
      case 'subcategory':
        return this.getEducationSubcategoryObject(req.body);
      case 'topic':
        return this.getEducationTopicObject(req.body);
      case 'subtopic':
        return this.getEducationSubtopicObject(req.body);
      case 'question':
        return this.getQuestionObject(req.body);
      case 'questionnaire':
        return this.getQuestionnaireObject(req.body);
      case 'vacancy':
        return this.getVacancyObject(req);
      case 'accessgroup':
        return this.getAccessGroupObject(req);
      case 'task':
        return this.getTaskObject(req);
      case 'message':
        return this.getMessageObject(req.body);
      case 'notification':
        return this.getNotificationObject(req.body);     
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
  getMusicObject(body) {
    const {
      singers,
      genres,
      released,
      duration,
      name,
      img,
      video,
      audio,
      tags
    } = body;
    return {
      name: name,
      duration: duration,
      img: img,
      video: video,
      audio: audio,
      tags: tags,
      singers: this.strToArr(singers, true),
      genres: this.strToArr(genres),
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
      multiple: !!multiple,
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
  getAccessGroupObject(req) {
    let { name, users, showEmail, showPhone, showName, showDOB } = req.body;
    if (!users) users = [];
    return {
      creator: this.mongooseId(req.user._id),
      name: name,
      users: this.strToArr(users.join(','), true),
      options: {
        showEmail: !!showEmail,
        showPhone: !!showPhone,
        showName: !!showName,
        showDOB: !!showDOB,
        showBookStatus: !!req.body.showBookStatus,
        showBookRating: !!req.body.showBookRating,
        showMovieStatus: !!req.body.showMovieStatus,
        showMovieRating: !!req.body.showMovieRating,
        showCourseStatus: !!req.body.showCourseStatus,
        showCourseRating: !!req.body.showCourseRating,
        showEducationStatus: !!req.body.showEducationStatus,
        giveTasks: !!req.body.giveTasks
      }
    };
  },
  getTaskObject(req) {
    const { user, type, item, level, comment, deadline, status } = req.body;

    return {
      creator: this.mongooseId(req.user._id),
      user: this.mongooseId(user),
      type: type,
      item: this.mongooseId(item),
      level: level,
      comment: comment,
      deadline: deadline,
      status: status
    };
  },
  getMessageObject(body) {
    const { to, text, all } = body;
    return {
      text: this.multi(text),
      to: all ? null : this.strToArr(to, true),
      date: Date.now(),
      all: !!all
    };
  },
  getNotificationObject(body) {
    const { to, text } = body;
    return {
      text: this.multi(text),
      to: this.strToArr(to, true),
      date: Date.now()
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
      case 'user':
      case 'users':
        return User;
      case 'book':
      case 'books':
        return Book;
      case 'movie':
      case 'movies':
        return Movie;
      case 'music':
        return Music;
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
      case 'accessgroup':
      case 'accessgroups':
        return AccessGroup;
      case 'task':
      case 'tasks':
        return Task;
      case 'message':
      case 'messages':
        return Message;
      case 'notification':
      case 'notifications':
        return Message;      
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
      case 'music':
        return MusicRating;
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
      case 'music':
        return MusicRecommendation;
      case 'people':
      case 'person':
        return PersonRecommendation;
      default:
        return null;
    }
  },
  getEducationStatusModel(name) {
    switch (name) {
      case 'category':
      case 'categories':
        return EducationCategoryStatus;
      case 'subcategory':
      case 'subcategories':
        return EducationSubcategoryStatus;
      case 'topic':
      case 'topics':
        return EducationTopicStatus;
      case 'subtopic':
      case 'subtopics':
        return EducationSubtopicStatus;
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
      case 'music':
        return 'music';
      default:
        return null;
    }
  },
  getSingular(name) {
    switch (name) {
      case 'books':
        return 'book';
      case 'movies':
        return 'movie';
      case 'courses':
        return 'course';
      case 'people':
        return 'person';
      case 'music':
        return 'music';
      default:
        return null;
    }
  },
  async getAccessOptions(user, viewer) {
    const { generalAccessOptions } = await User.findById(
      user,
      'generalAccessOptions'
    );
  }
};
