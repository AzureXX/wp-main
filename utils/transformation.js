const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  getOffset(page, size) {
    page = parseInt(page);
    if (isNaN(page)) page = 1;
    const offset = (page - 1) * size;
    return offset;
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
      case 'vacancy':
        return 'vacancies';
      case 'education':
        return 'education';
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
    console.log(tags);
    return {
      name: this.multi(name),
      description: this.multi(description),
      img: this.multi(img),
      tags: tags
    };
  },
  strToArr(item, isID) {
    if (!item) return null;
    if (isID) return item.split(',').map(i => this.mongooseId(i.trim()));
    return item.split(',').map(i => i.trim());
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
    return {
      ...this.common(body),
      authors: this.strToArr(body.authors, true),
      genres: this.strToArr(body.genres),
      ISBN: body.isbn,
      published: body.published,
      publisher: this.strToArr(body.publisher, true),
      wikipediaLink: this.multi(body.wikipediaLink),
      website: this.multi(body.website)
    };
  },
  getMovieObject(body) {
    return {
      ...this.common(body),
      actors: this.strToArr(body.actors, true),
      genres: this.strToArr(body.genres),
      crew: body.crew
        ? body.crew.map(item => ({
            role: item.role,
            id: this.mongooseId(item.id.trim())
          }))
        : null,
      released: body.released
    };
  },
  getMusicObject(body) {
    return {
      name: body.name,
      duration: body.duration,
      img: body.img,
      video: body.video,
      audio: body.audio,
      tags: body.tags,
      singers: this.strToArr(body.singers, true),
      genres: this.strToArr(body.genres),
      released: body.released
    };
  },
  getCourseObject(body) {
    return {
      ...this.common(body),
      authors: this.strToArr(body.authors, true),
      genres: body.genres
        ? body.genres.split(',').map(item => item.trim())
        : null,
      published: body.published,
      publisher: this.strToArr(body.publisher, true),
      website: this.multi(body.website),
      video: this.multi(body.video),
      link: this.multi(body.link)
    };
  },
  getPersonObject(body) {
    return {
      ...this.common(body),
      wikipediaLink: this.multi(body.wikipediaLink)
    };
  },
  getEducationCategoryObject(body) {
    return {
      ...this.common(body),
      subcategories: this.strToArr(body.subcategories, true),
      icon: body.icon,
      courses: this.strToArr(body.courses, true)
    };
  },
  getEducationSubcategoryObject(body) {
    return {
      ...this.common(body),
      categories: this.strToArr(body.categories, true),
      topics: this.strToArr(body.topics, true),
      icon: body.icon,
      courses: this.strToArr(body.courses, true)
    };
  },
  getEducationTopicObject(body) {
    return {
      ...this.common(body),
      subcategories: this.strToArr(body.subcategories, true),
      subtopics: this.strToArr(body.subtopics, true),
      icon: body.icon,
      courses: this.strToArr(body.courses, true)
    };
  },
  getEducationSubtopicObject(body) {
    return {
      ...this.common(body),
      topics: this.strToArr(body.topics, true),
      icon: body.icon,
      courses: this.strToArr(body.courses, true)
    };
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
      topics: body.topics,
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
      users: this.strToArr(body.users.join(','), true),
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
    if (type === 'subcategory' || type === 'topic' || type === 'subtopic')
      education = true;
    const calculated = {};
    init.forEach(item => {
      for (const prop in item[type].tags) {
        const coef = education ? item.status : (item.status == 0 ? (item.rating - 3) : 0);
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
  }
};
