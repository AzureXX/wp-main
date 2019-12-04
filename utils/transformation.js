const ObjectId = require("mongoose").Types.ObjectId;

const validator = {
  validateBook: require("../validation/validators/book"),
  validateCourse: require("../validation/validators/course"),
  validateEducationCategory: require("../validation/validators/eduCategory"),
  validateEducationSubcategory: require("../validation/validators/eduSubCategory"),
  validateEducationTopic: require("../validation/validators/eduTopic"),
  validateEducationSubTopic: require("../validation/validators/eduSubTopic"),
  validateMovie: require("../validation/validators/movie"),
  validateMusic: require("../validation/validators/music")
};

module.exports = {
  getOffset(page, size) {
    page = parseInt(page);
    if (isNaN(page)) page = 1;
    const offset = (page - 1) * size;
    return offset;
  },
  getParentName(name) {
    switch (name) {
      case "subcategories":
      case "subcategory":
        return "category";
      case "topics":
      case "topic":
        return "subcategory";
      case "subtopics":
      case "subtopic":
        return "topic";
      default:
        return null;
    }
  },
  getPlural(name) {
    switch (name) {
      case "book":
        return "books";
      case "movie":
        return "movies";
      case "course":
        return "courses";
      case "person":
        return "people";
      case "music":
        return "music";
      case "vacancy":
        return "vacancies";
      case "education":
        return "education";
      default:
        return null;
    }
  },
  getSingular(name) {
    switch (name) {
      case "books":
        return "book";
      case "movies":
        return "movie";
      case "courses":
        return "course";
      case "people":
        return "person";
      case "music":
        return "music";
      default:
        return null;
    }
  },
  mongooseId(id) {
    return new ObjectId(ObjectId.isValid(id) ? id : "000000000000000000000000");
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
    if (item instanceof Array) return item;
    if (!item) return null;
    if (isID) return item.split(",").map(i => this.mongooseId(i.trim()));
    return item.split(",").map(i => i.trim());
  },
  getObject(req, type) {
    switch (type) {
      case "book":
        // done
        return this.getBookObject(req.body);
      case "movie":
        // done
        return this.getMovieObject(req.body);
      case "music":
        // done
        return this.getMusicObject(req.body);
      case "course":
        return this.getCourseObject(req.body);
      case "person":
        return this.getPersonObject(req.body);
      case "category":
        return this.getEducationCategoryObject(req.body);
      case "subcategory":
        return this.getEducationSubcategoryObject(req.body);
      case "topic":
        return this.getEducationTopicObject(req.body);
      case "subtopic":
        return this.getEducationSubtopicObject(req.body);
      case "question":
        return this.getQuestionObject(req.body);
      case "questionnaire":
        return this.getQuestionnaireObject(req.body);
      case "vacancy":
        return this.getVacancyObject(req);
      case "accessgroup":
        return this.getAccessGroupObject(req);
      case "task":
        return this.getTaskObject(req);
      case "message":
        return this.getMessageObject(req.body);
      case "notification":
        return this.getNotificationObject(req.body);
    }
  },
  getBookObject(body) {
    let validBody = validator.validateBook(body);
    return {
      ...this.common(validBody),
      authors: this.strToArr(validBody.authors, true),
      genres: this.strToArr(validBody.genres),
      ISBN: validBody.isbn,
      published: validBody.published,
      publisher: this.strToArr(validBody.publisher, true),
      wikipediaLink: this.multi(validBody.wikipediaLink),
      website: this.multi(validBody.website)
    };
  },
  getMovieObject(body) {
    let validBody = validator.validateMovie(body);
    return {
      ...this.common(validBody),
      actors: this.strToArr(validBody.actors, true),
      genres: this.strToArr(validBody.genres),
      crew: validBody.crew
        ? validBody.crew.map(item => ({
            role: item.role,
            id: this.mongooseId(item.id.trim())
          }))
        : null,
      released: validBody.released
    };
  },
  getMusicObject(body) {
    let validBody = validator.validateMusic(body);
    return {
      name: validBody.name,
      duration: validBody.duration,
      img: validBody.img,
      video: validBody.video,
      audio: validBody.audio,
      tags: validBody.tags,
      singers: this.strToArr(validBody.singers, true),
      genres: this.strToArr(validBody.genres),
      released: validBody.released
    };
  },
  getCourseObject(body) {
    let validBody = validator.validateCourse(body);
    throw new Error("stop");
    return {
      ...this.common(validBody),
      authors: this.strToArr(validBody.authors, true),
      genres: validBody.genres ? validBody.genres.split(",").map(item => item.trim()) : null,
      video: this.multi(validBody.video),
      link: this.multi(validBody.link)
    };
  },
  getPersonObject(body) {
    return {
      ...this.common(body),
      wikipediaLink: this.multi(body.wikipediaLink)
    };
  },
  getEducationCategoryObject(body) {
    let bodyObj = {
      ...this.common(body),
      subcategories: this.strToArr(body.subcategories, true),
      icon: body.icon,
      courses: this.strToArr(body.courses, true)
    };
    validator.validateEducationCategory(bodyObj);

    return bodyObj;
  },
  getEducationSubcategoryObject(body) {
    let bodyObj = {
      ...this.common(body),
      topics: this.strToArr(body.topics, true),
      icon: body.icon,
      courses: this.strToArr(body.courses, true)
    };
    validator.validateEducationSubcategory(bodyObj);

    return bodyObj;
  },
  getEducationTopicObject(body) {
    let bodyObj = {
      ...this.common(body),
      subtopics: this.strToArr(body.subtopics, true),
      icon: body.icon,
      courses: this.strToArr(body.courses, true)
    };
    validator.validateEducationTopic(bodyObj);

    return bodyObj;
  },
  getEducationSubtopicObject(body) {
    let bodyObj = {
      ...this.common(body),
      icon: body.icon,
      courses: this.strToArr(body.courses, true)
    };
    validator.validateEducationSubTopic(bodyObj);

    return bodyObj;
  },
  getVacancyObject(req) {
    const { body } = req;
    return {
      creator: this.mongooseId(req.user._id),
      education: body.education,
      position: body.position,
      email: body.email,
      phone: body.phone,
      ageMin: body.ageMin,
      ageMax: body.ageMax,
      requirements: body.requirements,
      workInfo: body.workInfo,
      companyName: body.companyName,
      contactPerson: body.contactPerson,
      subcategories: body.subcategories.filter(subcategory => subcategory.data.name.us),
      topics: body.topics.filter(topic => topic.data.name.us),
      subtopics: body.subtopics.filter(subtopic => subtopic.data.name.us),
      experience: body.experience,
      salary: body.salary,
      city: body.city,
      category: body.category
    };
  },
  getQuestionObject(body) {
    return {
      multiple: !!body.multiple,
      text: this.multi(body.text),
      answers: body.answers,
      tags: body.tags
    };
  },
  getQuestionnaireObject(body) {
    return {
      questions: this.strToArr(body.questions, true),
      tags: body.tags
    };
  },
  getAccessGroupObject(req) {
    let { body } = req;
    if (!body.users) body.users = [];
    return {
      creator: this.mongooseId(req.user._id),
      name: body.name,
      users: this.strToArr(body.users.join(","), true),
      options: {
        showEmail: !!body.showEmail,
        showPhone: !!body.showPhone,
        showName: !!body.showName,
        showDOB: !!body.showDOB,
        showBookInfo: !!body.showBookInfo,
        showMovieInfo: !!body.showMovieInfo,
        showMusicInfo: !!body.showMusicInfo,
        showCourseInfo: !!body.showCourseInfo,
        showEducationInfo: !!body.showEducationInfo,
        giveTasks: !!body.giveTasks
      }
    };
  },
  getTaskObject(req) {
    const { body } = req;

    return {
      creator: this.mongooseId(req.user._id),
      user: this.mongooseId(body.user),
      type: body.type,
      item: this.mongooseId(body.item),
      level: body.level,
      comment: body.comment,
      deadline: body.deadline,
      status: body.status
    };
  },
  getMessageObject(body) {
    return {
      text: this.multi(body.text),
      to: body.all ? null : this.strToArr(body.to, true),
      date: Date.now(),
      all: !!body.all
    };
  },
  getNotificationObject(body) {
    return {
      text: this.multi(body.text),
      to: this.strToArr(body.to, true),
      date: Date.now()
    };
  },
  calculateItemTags(init, type) {
    let education = false;
    if (type === "subcategory" || type === "topic" || type === "subtopic") education = true;
    const calculated = {};
    init.forEach(item => {
      for (const prop in item[type].tags) {
        const coef = education ? item.status : item.status == 0 ? item.rating - 3 : 0;
        const value = item[type].tags[prop] * coef;
        if (calculated[prop] !== undefined) {
          calculated[prop] += value;
        } else {
          calculated[prop] = value;
        }
      }
    });
    return calculated;
  },
  calculateTotal(...arr) {
    const total = {};
    arr.forEach(obj => {
      for (const prop in obj) {
        if (total[prop]) total[prop] += obj[prop];
        else total[prop] = obj[prop];
      }
    });
    return total;
  },
  calculatePoints(tags, user) {
    let points = 0;
    for (const prop in tags) {
      if (user[prop] === undefined) continue;
      points += user[prop];
    }
    return points;
  },
  convertMoodToTags(mood) {
    switch (mood) {
      case "sad":
        return {
          comedy: 100
        };
      default:
        return {};
    }
  }
};
